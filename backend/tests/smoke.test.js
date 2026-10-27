/**
 * Automated Smoke and Unit Integration Test Suite for GRID P2P Backend
 */
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const http = require('http');
const app = require('../src/app');

// Mini HTTP client helper to test endpoints directly
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

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

const runSmokeTest = async () => {
  console.log('========================================================');
  console.log('🧪 Starting GRID P2P Backend Automated Test Suite');
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
    // 1. Initialize In-Memory MongoDB
    console.log('\n[1/6] Spinning up MongoMemoryServer...');
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log(`  [Connected] In-Memory Mongo URI: ${uri}`);

    // 2. Start Test HTTP Server
    server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const testPort = server.address().port;
    console.log(`  [Listening] Test HTTP Server running on ephemeral port: ${testPort}`);

    // 3. Test Health Check
    console.log('\n[2/6] Testing Health Check Endpoints...');
    const healthRes = await request(server, 'GET', '/api/health');
    assert(healthRes.status === 200, 'GET /api/health returns HTTP 200');
    assert(healthRes.body.status === 'healthy', 'Health check status is "healthy"');

    // 4. Test Authentication Flow
    console.log('\n[3/6] Testing User Registration & Authentication...');
    const sellerPayload = {
      name: 'Alice Solar Farm',
      email: 'alice@gridp2p.io',
      password: 'password123',
      role: 'seller',
      location: 'Zone 4, Node 08',
      smartMeterId: 'SM-ALICE-01',
    };

    const regRes = await request(server, 'POST', '/api/auth/register', sellerPayload);
    assert(regRes.status === 201, 'POST /api/auth/register returns HTTP 201 Created');
    assert(regRes.body.data.user.email === 'alice@gridp2p.io', 'User email correctly persisted');
    assert(regRes.body.data.token, 'Registration returns signed JWT token');

    const sellerToken = regRes.body.data.token;

    // Login test
    const loginRes = await request(server, 'POST', '/api/auth/login', {
      email: 'alice@gridp2p.io',
      password: 'password123',
    });
    assert(loginRes.status === 200, 'POST /api/auth/login returns HTTP 200');
    assert(loginRes.body.data.token, 'Login returns valid token');

    // Profile test with Bearer Auth
    const profileRes = await request(server, 'GET', '/api/auth/me', null, {
      Authorization: `Bearer ${sellerToken}`,
    });
    assert(profileRes.status === 200, 'GET /api/auth/me returns HTTP 200');
    assert(profileRes.body.data.user.name === 'Alice Solar Farm', 'Authenticated user profile matches');

    // 5. Test Listing CRUD
    console.log('\n[4/6] Testing Energy Listing CRUD...');
    const listingPayload = {
      energyType: 'Solar',
      amount: 100.0,
      pricePerKwh: 0.12,
      location: 'Zone 4, Node 08',
      durationHours: 24,
    };

    const createListingRes = await request(
      server,
      'POST',
      '/api/listings',
      listingPayload,
      { Authorization: `Bearer ${sellerToken}` }
    );
    assert(createListingRes.status === 201, 'POST /api/listings returns HTTP 201');
    assert(createListingRes.body.data.amount === 100.0, 'Listing initial amount is 100 kWh');

    const listingId = createListingRes.body.data._id || createListingRes.body.data.id;

    // Public marketplace get
    const getListingsRes = await request(server, 'GET', '/api/listings?energyType=Solar');
    assert(getListingsRes.status === 200, 'GET /api/listings returns HTTP 200');
    assert(getListingsRes.body.data.length === 1, 'Marketplace shows 1 active solar listing');

    // Seller's own listings
    const myListingsRes = await request(
      server,
      'GET',
      '/api/listings/seller/my-listings',
      null,
      { Authorization: `Bearer ${sellerToken}` }
    );
    assert(myListingsRes.status === 200, 'GET /api/listings/seller/my-listings returns HTTP 200');
    assert(myListingsRes.body.data.length === 1, 'Seller sees their own listing');

    // 6. Test Orders & Overselling Concurrency Guard
    console.log('\n[5/6] Testing P2P Orders & Atomic Overselling Protection...');
    // Register a buyer
    const buyerRes = await request(server, 'POST', '/api/auth/register', {
      name: 'Bob Consumer',
      email: 'bob@gridp2p.io',
      password: 'password123',
      role: 'buyer',
      location: 'Zone 4, Node 14',
    });
    const buyerToken = buyerRes.body.data.token;

    // Buyer purchases 40 kWh out of 100 kWh
    const orderRes = await request(
      server,
      'POST',
      '/api/orders',
      { listingId, amountKwh: 40.0 },
      { Authorization: `Bearer ${buyerToken}` }
    );
    assert(orderRes.status === 201, 'POST /api/orders for 40 kWh returns HTTP 201');
    assert(orderRes.body.data.amountKwh === 40.0, 'Order quantity matches 40 kWh');
    assert(orderRes.body.data.totalPrice > 0, 'Total settlement calculated with platform fee');

    // Verify listing available quantity decremented to 60 kWh
    const checkListing = await request(server, 'GET', `/api/listings/${listingId}`);
    assert(checkListing.body.data.amount === 60.0, 'Listing stock atomically decremented from 100 to 60 kWh');

    // Overselling Guard: Try to buy 70 kWh (only 60 remains!)
    const overbuyRes = await request(
      server,
      'POST',
      '/api/orders',
      { listingId, amountKwh: 70.0 },
      { Authorization: `Bearer ${buyerToken}` }
    );
    assert(overbuyRes.status === 400, 'Overbuy attempt (>60 kWh) is REJECTED with HTTP 400 Bad Request');
    assert(overbuyRes.body.success === false, 'Oversell attempt response success is false');

    // Self-buying Guard: Seller tries to purchase their own energy
    const selfBuyRes = await request(
      server,
      'POST',
      '/api/orders',
      { listingId, amountKwh: 10.0 },
      { Authorization: `Bearer ${sellerToken}` }
    );
    assert(selfBuyRes.status === 400, 'Prosumer self-purchase is REJECTED with HTTP 400');

    // 7. Test AI Price Recommendation Bridge
    console.log('\n[6/6] Testing AI Service Integration Bridge...');
    const aiRes = await request(server, 'GET', '/api/ai/price-recommendation?energyType=Solar');
    assert(aiRes.status === 200, 'GET /api/ai/price-recommendation returns HTTP 200');
    assert(
      aiRes.body.data.recommendedPricePerKwh !== undefined,
      `AI recommended rate returned: ₹${aiRes.body.data.recommendedPricePerKwh}/kWh (Status: ${aiRes.body.data.status})`
    );

    console.log('\n========================================================');
    console.log(`🏁 TEST RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
    console.log('========================================================\n');

    if (failedCount > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('\n❌ Unhandled test error:', err);
    process.exit(1);
  } finally {
    if (server) server.close();
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();
  }
};

runSmokeTest();
