import { Schema, model, Document } from 'mongoose'; // Importing tools from Mongoose to define schemas and create models
import { IReaction, ReactionSchema } from './Reaction'; // Importing the Reaction interface and schema for nested reactions
import { customDateFormat } from '../utils/dateFormat'; // Importing a custom function to format dates

// Define an interface for the Thought model to specify the structure of a thought document
interface IThought extends Document {
thoughtText: string; // The content of the thought
createdAt: Date; // The date and time when the thought was created
username: string; // The username of the person who created the thought
reactions: IReaction[]; // An array of reactions associated with the thought
}

// Create a schema for the Thought model
const ThoughtSchema = new Schema<IThought>(
{
  // Define the fields for the schema

  thoughtText: {
    type: String, // The type is a string
    required: true, // This field is required
    minlength: 1, // The minimum length of the string is 1 character
    maxlength: 280, // The maximum length of the string is 280 characters
  },
  createdAt: {
    type: Schema.Types.Date, // The type is a date
    default: Date.now, // Automatically set the current date and time if not provided
    get: (timestamp: Date) => customDateFormat(timestamp), // Use a custom function to format the date
  },
  username: {
    type: String, // The type is a string
    required: true, // This field is required
  },
  reactions: [ReactionSchema], // An array of reactions, using the Reaction schema
},
{
  // Additional options for the schema

  toJSON: {
    virtuals: true, // Include virtual fields (e.g., computed properties) in the JSON output
    getters: true, // Enable the use of getter functions (e.g., for formatting dates)
  },
  id: false, // Do not include a virtual `id` field in the output
}
);

// Create the Thought model using the schema
const Thought = model<IThought>('Thought', ThoughtSchema); // Define the Thought model based on the schema

export default Thought; // Export the Thought model so it can be used in other parts of the application