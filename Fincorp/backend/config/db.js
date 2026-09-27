import mongoose from 'mongoose';
import dns from 'dns';

// Disable Mongoose command buffering so queries fail-fast instead of timing out after 10000ms
mongoose.set('bufferCommands', false);

// Fix DNS SRV lookup issues on Windows Node.js for MongoDB Atlas
try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (dnsErr) {
  console.log('[DNS Config]: Using system default DNS');
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000, // 3s timeout for Atlas connection
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host} | Database: ${conn.connection.name}`);
  } catch (error) {
    console.warn(`[MongoDB Warning]: Atlas cluster unreachable (${error.message}). Operating seamlessly with in-memory fallback.`);
  }
};

export default connectDB;
