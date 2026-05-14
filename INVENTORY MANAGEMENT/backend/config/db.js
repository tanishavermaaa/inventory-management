const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri && process.env.NODE_ENV === 'production') {
    console.error('MONGODB_URI is required in production. Set it in backend/.env or environment variables.');
    process.exit(1);
  }

  try {
    if (uri) {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return conn;
    }

    console.warn('No MONGODB_URI configured. Falling back to in-memory MongoDB for local development.');
    mongoServer = await MongoMemoryServer.create();
    const memoryUri = mongoServer.getUri();
    const conn = await mongoose.connect(memoryUri);
    console.log(`MongoMemoryServer started: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Failed to connect to configured MongoDB, falling back to in-memory MongoDB:', error.message);
      if (mongoServer) {
        await mongoose.disconnect();
      }
      mongoServer = await MongoMemoryServer.create();
      const memoryUri = mongoServer.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`MongoMemoryServer started: ${conn.connection.host}`);
      return conn;
    }

    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
