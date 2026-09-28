import mongoose from 'mongoose';
import dns from 'dns';

// Fix DNS SRV lookup issues on Windows Node.js for MongoDB Atlas
try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (dnsErr) {
  console.log('[DNS Config]: Using system default DNS');
}

let connectionPromise = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('[MongoDB Error]: MONGODB_URI environment variable is not defined.');
    throw new Error('MONGODB_URI is not set in environment variables');
  }

  connectionPromise = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
  }).then((conn) => {
    console.log(`[MongoDB Connected]: ${conn.connection.host} | Database: ${conn.connection.name}`);
    return conn.connection;
  }).catch((err) => {
    connectionPromise = null;
    console.error(`[MongoDB Connection Error]: ${err.message}`);
    throw err;
  });

  return connectionPromise;
};

export default connectDB;
