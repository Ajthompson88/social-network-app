// First, define a Reaction type (if not already defined elsewhere)
export interface IReaction {
    reactionId: string; // You can also use Types.ObjectId if you import it from Mongoose
    reactionBody: string;
    username: string;
    createdAt: Date | string; // Date when stored; string when formatted via a getter
  }
  
  // Define the shape of a Thought object
  export interface IThought {
    _id: string; // Or Types.ObjectId for Mongoose
    thoughtText: string;
    createdAt: Date | string; // Raw Date in the DB or formatted string when using a getter
    username: string;
    reactions: IReaction[];
    reactionCount?: number; // Optional computed property
  }
  
  // Define the payload expected when creating/updating a thought
  export interface IThoughtPayload {
    thoughtText: string;
    username: string;
  }
  