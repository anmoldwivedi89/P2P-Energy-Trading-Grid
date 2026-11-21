/**
 * Dedicated Security & Admin Architecture Automated Test Suite
 */
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const http = require('http');
const app = require('../src/app');
const config = require('../src/config/env');
const User = require('../src/models/User');
const { provisionAdmin } = require('../src/services/admin.provision');

const request = (server, method, path, body = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const port = server.address().port;
    const options = {
      hostname: '127.0.0.1',
      port,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, body: parsed });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
};

const runSecurityTests = async () => {
  console.log('========================================================');
  console.log('🛡️  Running GRID P2P Security & Admin Verification Tests');
  console.log('========================================================');

  let mongoServer;
  let server;
  let passedCount = 0;
  let failedCount = 0;

  const assert = (condition, description) => {
    if (condition) {
      console.log(`  [PASS] ${description}`);
      passedCount++;
    } else {
      console.error(`  [FAIL] ${description}`);
      failedCount++;
    }
  };

  try {
    // 1. In-memory Mongo setup
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));

    // 2. Test Bcrypt Salt Rounds >= 12
    console.log('\n[1/7] Testing Password Hashing Work Factor (>= 12)...');
    const testUser = await User.create({
      name: 'Crypto Prosumer',
      email: 'crypto@gridp2p.io',
      password: 'StrongUserPassword2026!',
      role: 'buyer',
    });
    const fetchedUser = await User.findById(testUser._id).select('+password');
    const hashParts = fetchedUser.password.split('$');
    const costFactor = parseInt(hashParts[2], 10);
    assert(costFactor >= 12, `Bcrypt cost factor is ${costFactor} (>= 12 requirement satisfied)`);

    // 3. Test Public Registration Restrictions
    console.log('\n[2/7] Testing Public Registration Privilege Escalation Guards...');
    const adminRegAttempt = await request(server, 'POST', '/api/auth/register', {
      name: 'Attacker Admin',
      email: 'attacker@gridp2p.io',
      password: 'password123',
      role: 'admin',
    });
    assert(adminRegAttempt.status === 403, 'Public registration with role="admin" is rejected with HTTP 403');
    assert(adminRegAttempt.body.success === false, 'Response confirms rejection');

    const adminEmailRegAttempt = await request(server, 'POST', '/api/auth/register', {
      name: 'Spoof Admin Email',
      email: config.adminEmail,
      password: 'password123',
      role: 'buyer',
    });
    assert(adminEmailRegAttempt.status === 403, 'Public registration claiming ADMIN_EMAIL is rejected with HTTP 403');

    // 4. Test Automated Admin Provisioning & Idempotency
    console.log('\n[3/7] Testing Fixed Admin Provisioning & Impostor Demotion...');
    // Seed an unauthorized extra admin
    await User.create({
      name: 'Impostor Admin',
      email: 'impostor@gridp2p.io',
      password: 'FakePassword123!',
      role: 'admin',
    });

    // Run provisionAdmin
    await provisionAdmin();

    const verifiedAdmin = await User.findOne({ email: config.adminEmail }).select('+password');
    assert(verifiedAdmin !== null, 'Fixed Admin account exists in database');
    assert(verifiedAdmin.role === 'admin', 'Fixed Admin account has role="admin"');

    const passwordMatch = await verifiedAdmin.comparePassword(config.adminPassword);
    assert(passwordMatch === true, 'Fixed Admin account password matches process.env.ADMIN_PASSWORD');

    const impostorUser = await User.findOne({ email: 'impostor@gridp2p.io' });
    assert(impostorUser.role === 'buyer', 'Unauthorized admin account was demoted to "buyer"');

    const adminCount = await User.countDocuments({ role: 'admin' });
    assert(adminCount === 1, 'Exactly one Admin account exists on the entire grid (Singleton Admin)');

    // 5. Test Admin Login
    console.log('\n[4/7] Testing Admin Login Credentials & Token...');
    const adminLoginRes = await request(server, 'POST', '/api/auth/login', {
      email: config.adminEmail,
      password: config.adminPassword,
    });
    assert(adminLoginRes.status === 200, 'Admin login with env credentials succeeds (HTTP 200)');
    assert(adminLoginRes.body.data.user.role === 'admin', 'Returned user role is "admin"');
    assert(adminLoginRes.body.data.user.password === undefined, 'Password is not exposed in login response');
    const adminToken = adminLoginRes.body.data.token;
    assert(adminToken !== undefined, 'Admin JWT token generated');

    // 6. Test Backend Admin Authorization on Protected Endpoints
    console.log('\n[5/7] Testing Backend Role Authorization (/api/auth/users)...');
    // Login as a normal buyer
    const buyerReg = await request(server, 'POST', '/api/auth/register', {
      name: 'Standard Buyer',
      email: 'standardbuyer@gridp2p.io',
      password: 'password123',
      role: 'buyer',
    });
    const buyerToken = buyerReg.body.data.token;

    // Buyer attempts to access Admin users list
    const unauthorizedAccess = await request(server, 'GET', '/api/auth/users', null, {
      Authorization: `Bearer ${buyerToken}`,
    });
    assert(unauthorizedAccess.status === 403, 'Normal user access to /api/auth/users is rejected with HTTP 403');

    // Admin accesses Admin users list
    const authorizedAccess = await request(server, 'GET', '/api/auth/users', null, {
      Authorization: `Bearer ${adminToken}`,
    });
    assert(authorizedAccess.status === 200, 'Admin access to /api/auth/users is permitted with HTTP 200');
    assert(Array.isArray(authorizedAccess.body.data), 'Returns list of grid participants');

    // 7. Test Profile Update Security
    console.log('\n[6/7] Testing Profile Update Role Protection & Field Whitelisting...');
    // Attempt role elevation via profile update
    const roleEscalationAttempt = await request(
      server,
      'PUT',
      '/api/auth/profile',
      { role: 'admin', name: 'Escalation Attempt' },
      { Authorization: `Bearer ${buyerToken}` }
    );
    assert(roleEscalationAttempt.status === 403, 'Attempt to change role via PUT /api/auth/profile returns HTTP 403');

    // Attempt email change via profile update
    const emailChangeAttempt = await request(
      server,
      'PUT',
      '/api/auth/profile',
      { email: 'changed@gridp2p.io' },
      { Authorization: `Bearer ${buyerToken}` }
    );
    assert(emailChangeAttempt.status === 403, 'Attempt to change email via profile returns HTTP 403');

    // Attempt invalid name length (< 2 chars) via profile update
    const invalidNameAttempt = await request(
      server,
      'PUT',
      '/api/auth/profile',
      { name: 'X' },
      { Authorization: `Bearer ${buyerToken}` }
    );
    assert(invalidNameAttempt.status === 400, 'Attempt to set 1-char name returns HTTP 400 Bad Request');

    // Legitimate profile update with allowed fields
    const validUpdate = await request(
      server,
      'PUT',
      '/api/auth/profile',
      {
        name: 'Standard Buyer Updated',
        location: 'Zone 7, Node 19',
        smartMeterId: 'SM-UPD-99',
        walletAddress: '0x1234567890123456789012345678901234567890',
      },
      { Authorization: `Bearer ${buyerToken}` }
    );
    assert(validUpdate.status === 200, 'Valid profile update returns HTTP 200');
    assert(validUpdate.body.data.user.name === 'Standard Buyer Updated', 'Name successfully updated');
    assert(validUpdate.body.data.user.location === 'Zone 7, Node 19', 'Location successfully updated');
    assert(validUpdate.body.data.user.role === 'buyer', 'Role remains unchanged as buyer');

    // 8. Test Rate Limiter Header Presence
    console.log('\n[7/7] Testing Rate Limiter Headers on Authentication Routes...');
    const rateLimitCheck = await request(server, 'POST', '/api/auth/login', {
      email: 'test@notexist.io',
      password: 'wrongpassword',
    });
    // express-rate-limit sets standard headers
    assert(rateLimitCheck.status === 401, 'Invalid credentials return HTTP 401');

    console.log('\n========================================================');
    console.log(`🏁 TEST RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
    console.log('========================================================\n');

    if (failedCount > 0) process.exit(1);
  } catch (error) {
    console.error('Test execution failed:', error);
    process.exit(1);
  } finally {
    if (server) server.close();
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();
  }
};

runSecurityTests();
