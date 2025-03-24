import { Schema, Types, Document } from 'mongoose';
import { customDateFormat } from '../utils/dateFormat';

export interface IReaction extends Document {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

export const ReactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => new Date(customDateFormat(timestamp)),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

export default ReactionSchema;
