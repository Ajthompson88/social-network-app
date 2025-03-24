// Define the shape of a User object
export interface IUser {
    _id: string; // You can also use Mongoose's Types.ObjectId if preferred
    username: string;
    email: string;
    thoughts: string[]; // Array of Thought IDs as strings
    friends: string[];  // Array of User IDs as strings
    friendCount?: number; // Optional computed property
  }
  
  // Define the payload expected when creating/updating a user
  export interface IUserPayload {
    username: string;
    email: string;
  }
  