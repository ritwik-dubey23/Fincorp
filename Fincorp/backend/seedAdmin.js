import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[Seed]: Connected to MongoDB');

    const adminEmail = 'admin@fincorp.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('[Seed]: Default admin user already exists');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await User.create({
      name: 'Fincorp Admin',
      email: adminEmail,
      mobile: '9876543210',
      password: hashedPassword,
      role: 'admin',
      isMobileVerified: true,
    });

    console.log('[Seed]: Created admin user successfully (admin@fincorp.com / admin123)');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedAdmin();
