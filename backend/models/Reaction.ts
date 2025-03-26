import { Schema, Types, Document } from 'mongoose'; // Importing tools from Mongoose to define schemas and handle MongoDB data
import { customDateFormat } from '../utils/dateFormat'; // Importing a custom function to format dates

// Define an interface for the Reaction model to specify the structure of a reaction document
export interface IReaction extends Document {
  reactionId: Types.ObjectId; // A unique identifier for the reaction
  reactionBody: string; // The content of the reaction
  username: string; // The username of the person who created the reaction
  createdAt: Date; // The date and time when the reaction was created
}

// Create a schema for the Reaction model
export const ReactionSchema = new Schema<IReaction>(
  {
    // Define the fields for the schema

    reactionId: {
      type: Schema.Types.ObjectId, // The type is an ObjectId (unique identifier)
      default: () => new Types.ObjectId(), // Automatically generate a new ObjectId if not provided
    },
    reactionBody: {
      type: String, // The type is a string
      required: true, // This field is required
      maxlength: 280, // The maximum length of the string is 280 characters
    },
    username: {
      type: String, // The type is a string
      required: true, // This field is required
    },
    createdAt: {
      type: Date, // The type is a date
      default: Date.now, // Automatically set the current date and time if not provided
      get: (timestamp: Date) => new Date(customDateFormat(timestamp)), // Use a custom function to format the date
    },
  },
  {
    // Additional options for the schema

    toJSON: {
      getters: true, // Enable the use of getter functions (e.g., for formatting dates)
    },
    id: false, // Do not include a virtual `id` field in the output
  }
);

// Export the Reaction schema so it can be used in other parts of the application
export default ReactionSchema;
