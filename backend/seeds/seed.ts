import mongoose from 'mongoose'; // Importing Mongoose to interact with the MongoDB database
import dotenv from 'dotenv'; // Importing dotenv to load environment variables
import User from '../models/User'; // Importing the User model to interact with the User collection
import Thought from '../models/Thought'; // Importing the Thought model to interact with the Thought collection

dotenv.config(); // Load environment variables from the .env file

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/socialDB'; // Define the MongoDB connection URI, defaulting to a local database if not provided

/**
 * Sample Data
 */
const users = [
  { username: 'alice', email: 'alice@example.com' }, // Sample user: Alice
  { username: 'bob', email: 'bob@example.com' }, // Sample user: Bob
  { username: 'charlie', email: 'charlie@example.com' }, // Sample user: Charlie
];

const thoughts = [
  { thoughtText: 'This is Alice’s first thought!', username: 'alice' }, // Sample thought by Alice
  { thoughtText: 'Bob shares his opinion!', username: 'bob' }, // Sample thought by Bob
  { thoughtText: 'Charlie has an interesting idea!', username: 'charlie' }, // Sample thought by Charlie
];

/**
 * Seed Database
 */
const seedDatabase = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    // Connect to the MongoDB database using the connection URI
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true, // Use the new URL parser for MongoDB connections
      useUnifiedTopology: true, // Use the new server discovery and monitoring engine
    } as mongoose.ConnectOptions);

    console.log('🔄 Resetting database...');
    // Clear all existing data in the User and Thought collections
    await User.deleteMany({});
    await Thought.deleteMany({});

    console.log('👥 Inserting users...');
    // Insert the sample users into the User collection
    const insertedUsers = await User.insertMany(users);

    console.log('💭 Inserting thoughts...');
    // Map the inserted users to their IDs for associating thoughts with users
    const userMap = insertedUsers.reduce((acc, user) => {
      acc[user.username] = user._id as mongoose.Types.ObjectId; // ✅ FIXED: Explicitly cast _id
      return acc;
    }, {} as Record<string, mongoose.Types.ObjectId>);

    // Add the user IDs to the thoughts to associate them with the correct users
    const thoughtsWithUsers = thoughts.map((thought) => ({
      ...thought,
      userId: userMap[thought.username], // Associate the thought with the user's ID
    }));

    // Insert the sample thoughts into the Thought collection
    const insertedThoughts = await Thought.insertMany(thoughtsWithUsers);

    console.log('💬 Adding reactions...');
    // Add a reaction to the first thought in the Thought collection
    await Thought.updateOne(
      { _id: insertedThoughts[0]._id }, // Find the first thought by its ID
      { $push: { reactions: { reactionBody: 'Nice thought!', username: 'bob' } } } // Add a reaction by Bob
    );

    console.log('✅ Seeding complete!');
    // Close the database connection after seeding is complete
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error); // Log any errors that occur during the seeding process
    mongoose.connection.close(); // Ensure the database connection is closed even if an error occurs
  }
};

// Run the seed function to populate the database with sample data
seedDatabase();

/*
  In the seed.ts file, we have defined sample data for users and thoughts. We are using the insertMany method to insert users and thoughts into the database. 
  We have also added a reaction to the first thought using the updateOne method. 
  Run the Seed Script 
  To run the seed script, execute the following command: 
  ts-node backend/seeds/seed.ts 
  This will connect to the MongoDB database, insert the sample data, and close the connection. 
  Verify the Data 
  You can verify the data in the MongoDB database using the mongo shell: 
  > use socialDB
*/