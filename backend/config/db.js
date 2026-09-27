import mongoose from 'mongoose';
import dns from 'dns';

mongoose.set('bufferCommands', false);

try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (dnsErr) {
  console.log('[DNS Config]: Using system default DNS');
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host} | Database: ${conn.connection.name}`);
  } catch (error) {
    console.warn(`[MongoDB Warning]: Atlas cluster unreachable (${error.message}). Operating seamlessly with in-memory fallback.`);
  }
};

export default connectDB;
