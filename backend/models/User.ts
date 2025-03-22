import { Schema, model, Types, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
    }

const userSchema = new Schema<IUser>(
    {
username: {
    type: String,
    required: true, 
    trim: true,
    unique: true,  
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},

{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);
