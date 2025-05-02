import mongoose from 'mongoose'; // Importing Mongoose to interact with the MongoDB database

// Function to connect to the MongoDB database
export const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/socialDB', {
    });

    // Log a success message with the host and database name
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
  } catch (err: unknown) {
    // Handle errors during the connection attempt
    if (err instanceof Error) {
      console.error(`❌ Database connection error: ${err.message}`);
    } else {
      console.error('❌ Unknown error occurred during database connection');
    }

    // Exit the process with a failure code (1) to indicate that the connection failed
    process.exit(1);
  }
};
