import { Schema, model, Document } from 'mongoose';
import { IReaction, ReactionSchema } from './Reaction';
import { customDateFormat } from '../utils/dateFormat';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
}

const ThoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Schema.Types.Date,
      default: Date.now,
      get: (timestamp: Date) => customDateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create the Thought model using the schema
const Thought = model<IThought>('Thought', ThoughtSchema);

export default Thought;