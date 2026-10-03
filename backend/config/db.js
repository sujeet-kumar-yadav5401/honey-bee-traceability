import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/honey_bee_traceability';

  try {
    // Attempt standard connection to specified URI (Local or Atlas)
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
    });
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️ Primary MongoDB Connection to "${uri}" failed: ${error.message}`);
    console.log(`ℹ️ Attempting in-memory MongoDB fallback for instant local demonstration...`);

    try {
      // Dynamic import to prevent hard dependency in production
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      const memConn = await mongoose.connect(memoryUri);
      console.log(`✅ In-Memory MongoDB Connected Successfully: ${memConn.connection.host}`);
      console.log(`💡 Tip: To persist data across restarts, set a valid MONGODB_URI (e.g. MongoDB Atlas) in backend/.env`);
      return memConn;
    } catch (memError) {
      console.error(`❌ MongoDB Connection Error: Both external URI and in-memory server could not connect.`);
      console.error(`📌 Instructions to connect MongoDB:`);
      console.error(`   1. Local: Start MongoDB Community Server ('net start MongoDB' or 'mongod')`);
      console.error(`   2. Cloud: Create a free cluster at https://cloud.mongodb.com and set MONGODB_URI in backend/.env`);
      throw error;
    }
  }
};

export default connectDB;
