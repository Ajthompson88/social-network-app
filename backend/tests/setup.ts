// tests/setup.ts
import mongoose from 'mongoose'; // Importing Mongoose to interact with MongoDB
import { MongoMemoryServer } from 'mongodb-memory-server'; // Importing MongoMemoryServer to create an in-memory MongoDB instance for testing

let mongoServer: MongoMemoryServer; // Declaring a variable to hold the in-memory MongoDB server instance

/**
 * Connect to the in-memory MongoDB instance.
 */
export const connectDatabase = async (): Promise<void> => {
  // Create a new in-memory MongoDB server instance
  mongoServer = await MongoMemoryServer.create();
  
  // Get the connection URI for the in-memory MongoDB instance
  const uri = mongoServer.getUri();
  
  // Connect Mongoose to the in-memory MongoDB instance using the URI
  await mongoose.connect(uri, {
    useNewUrlParser: true, // Use the new URL parser for MongoDB connections
    useUnifiedTopology: true, // Use the new server discovery and monitoring engine
  } as mongoose.ConnectOptions); // Specify connection options for Mongoose
  
  // Log a message to indicate successful connection
  console.log(`Connected to in-memory MongoDB at ${uri}`);
};

/**
 * Clear all data from the database.
 */
export const clearDatabase = async (): Promise<void> => {
  // Get all collections (tables) in the current MongoDB database
  const collections = mongoose.connection.collections;
  
  // Loop through each collection and delete all documents (data) in it
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({}); // Clear all data from the collection
  }
};

/**
 * Disconnect and stop the in-memory MongoDB instance.
 */
export const disconnectDatabase = async (): Promise<void> => {
  // Drop the current database (delete all data)
  await mongoose.connection.dropDatabase();
  
  // Close the connection to the database
  await mongoose.connection.close();
  
  // Stop the in-memory MongoDB server if it exists
  if (mongoServer) {
    await mongoServer.stop();
  }
};