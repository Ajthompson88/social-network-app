// First, define a Reaction type (if not already defined elsewhere)
export interface IReaction {
    reactionId: string; // A unique identifier for the reaction (can also use Types.ObjectId if working with Mongoose)
    reactionBody: string; // The content of the reaction
    username: string; // The username of the person who created the reaction
    createdAt: Date | string; // The date and time when the reaction was created (stored as a Date or formatted as a string)
}

// Define the shape of a Thought object
export interface IThought {
    _id: string; // The unique identifier for the thought (can also use Types.ObjectId for Mongoose)
    thoughtText: string; // The content of the thought
    createdAt: Date | string; // The date and time when the thought was created (stored as a Date or formatted as a string)
    username: string; // The username of the person who created the thought
    reactions: IReaction[]; // An array of reactions associated with the thought
    reactionCount?: number; // An optional property to store the total number of reactions (computed property)
}

// Define the payload expected when creating/updating a thought
export interface IThoughtPayload {
    thoughtText: string; // The content of the thought
    username: string; // The username of the person creating or updating the thought
}
