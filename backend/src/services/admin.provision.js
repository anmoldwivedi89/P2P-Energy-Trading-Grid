const User = require('../models/User');
const config = require('../config/env');
const bcrypt = require('bcryptjs');

/**
 * MongoDB mein fixed Administrator account initialize aur sync karne ka function.
 * Sirf process.env.ADMIN_EMAIL ko hi admin privileges milte hain.
 */
const provisionAdmin = async () => {
  try {
    // Admin email ko lowercase aur trim karke normalize kar rahe hain
    const adminEmail = (config.adminEmail || '').toLowerCase().trim();
    const adminPassword = config.adminPassword;

    if (!adminEmail) {
      console.warn('[Admin Security] ADMIN_EMAIL define nahi hai. Admin provisioning skip ho gayi.');
      return;
    }

    if (!adminPassword) {
      console.warn('[Admin Security] ADMIN_PASSWORD environment mein missing hai. Admin provisioning skip ho gayi.');
      return;
    }

    // Database mein check kar rahe hain ki kya admin account pehle se exist karta hai
    let adminUser = await User.findOne({ email: adminEmail }).select('+password');

    if (!adminUser) {
      // Agar account nahi mila toh naya Admin account create karte hain (bcrypt cost factor 12 ke sath hash hoga)
      adminUser = await User.create({
        name: 'Grid Administrator',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        location: 'Master Control Center, Node 01',
      });
      console.log(`[Admin Security] Fixed administrator account safely create ho gaya: ${adminEmail}`);
    } else {
      // Agar account pehle se exist karta hai toh verify karte hain ki password aur role sahi hain ya nahi
      const isPasswordMatch = await adminUser.comparePassword(adminPassword);
      let needsSave = false;

      if (!isPasswordMatch) {
        // Agar password match nahi hua toh environment variable wale ADMIN_PASSWORD se update karte hain
        adminUser.password = adminPassword;
        needsSave = true;
      }

      if (adminUser.role !== 'admin') {
        // Agar user ka role admin nahi hai toh use admin banate hain
        adminUser.role = 'admin';
        needsSave = true;
      }

      if (needsSave) {
        await adminUser.save();
        console.log(`[Admin Security] Admin account credentials aur role successfully synchronize ho gaye: ${adminEmail}`);
      } else {
        console.log(`[Admin Security] Fixed admin account verified aur active hai: ${adminEmail}`);
      }
    }

    // Grid par sirf 1 admin allow karne ke liye baki kisi unauthorized account ko demote kar rahe hain
    const demotionResult = await User.updateMany(
      { role: 'admin', email: { $ne: adminEmail } },
      { $set: { role: 'buyer' } }
    );

    if (demotionResult.modifiedCount > 0) {
      console.warn(
        `[Admin Security] Single Admin policy enforce hui: ${demotionResult.modifiedCount} unauthorized account(s) ko buyer mein convert kar diya.`
      );
    }
  } catch (error) {
    // Security safety: passwords ya sensitive variables ko kabhi console mein log nahi karna
    console.error(`[Admin Security Error] Provisioning fail hui: ${error.message}`);
  }
};

module.exports = { provisionAdmin };
