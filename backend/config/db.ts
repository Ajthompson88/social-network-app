import mongoose from 'mongoose';

// Function to connect to the MongoDB database
export const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the connection string from environment variables
    // If the environment variable is not set, it defaults to 'mongodb://127.0.0.1:27017/socialDB'
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/socialDB');
    
    // Log a success message with the host of the connected database
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // If an error occurs during the connection attempt, log the error message
    console.error(`❌ Error: ${(err as Error).message}`);
    
    // Exit the process with a failure code (1) to indicate that the connection failed
    process.exit(1);
  }
};
