import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Thought from '../models/Thought';

dotenv.config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/socialDB';

/**
 * Sample Data
 */
const users = [
  { username: 'alice', email: 'alice@example.com' },
  { username: 'bob', email: 'bob@example.com' },
  { username: 'charlie', email: 'charlie@example.com' },
];

const thoughts = [
  { thoughtText: 'This is Alice’s first thought!', username: 'alice' },
  { thoughtText: 'Bob shares his opinion!', username: 'bob' },
  { thoughtText: 'Charlie has an interesting idea!', username: 'charlie' },
];

/**
 * Seed Database
 */
const seedDatabase = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log('🔄 Resetting database...');
    await User.deleteMany({});
    await Thought.deleteMany({});

    console.log('👥 Inserting users...');
    const insertedUsers = await User.insertMany(users);

    console.log('💭 Inserting thoughts...');
    const userMap = insertedUsers.reduce((acc, user) => {
      acc[user.username] = user._id;
      return acc;
    }, {} as Record<string, mongoose.Types.ObjectId>);

    const thoughtsWithUsers = thoughts.map((thought) => ({
      ...thought,
      userId: userMap[thought.username],
    }));

    const insertedThoughts = await Thought.insertMany(thoughtsWithUsers);

    console.log('💬 Adding reactions...');
    await Thought.updateOne(
      { _id: insertedThoughts[0]._id },
      { $push: { reactions: { reactionBody: 'Nice thought!', username: 'bob' } } }
    );

    console.log('✅ Seeding complete!');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
