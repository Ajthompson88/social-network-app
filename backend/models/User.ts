import { Schema, model, Types, Document } from 'mongoose'; // Importing tools from Mongoose to define schemas and create models

// Define an interface for the User model to specify the structure of a user document
export interface IUser extends Document {
  username: string; // The username of the user
  email: string; // The email address of the user
  thoughts: Types.ObjectId[]; // An array of IDs referencing the user's thoughts
  friends: Types.ObjectId[]; // An array of IDs referencing the user's friends
}

// Create a schema for the User model
const userSchema = new Schema<IUser>(
  {
    // Define the fields for the schema

    username: {
      type: String, // The type is a string
      required: true, // This field is required
      trim: true, // Remove any extra spaces from the beginning or end of the string
      unique: true, // Ensure that each username is unique
    },
    email: {
      type: String, // The type is a string
      required: true, // This field is required
      unique: true, // Ensure that each email is unique
      match: [/.+@.+\..+/, 'Please enter a valid email address'], // Validate the email format
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId, // Each thought is referenced by its unique ObjectId
        ref: 'Thought', // Reference the Thought model
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId, // Each friend is referenced by their unique ObjectId
        ref: 'User', // Reference the User model
      },
    ],
  },
  {
    // Additional options for the schema

    toJSON: {
      virtuals: true, // Include virtual fields (e.g., computed properties) in the JSON output
    },
    id: false, // Do not include a virtual `id` field in the output
  }
);

// Virtual to get the friend count
userSchema.virtual('friendCount').get(function () {
  // Calculate the number of friends by checking the length of the friends array
  return this.friends.length;
});

// Create the User model using the schema
const User = model<IUser>('User', userSchema); // Define the User model based on the schema

export default User; // Export the User model so it can be used in other parts of the application
