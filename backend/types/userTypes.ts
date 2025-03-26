// Define the shape of a User object
export interface IUser {
    _id: string; // You can also use Mongoose's Types.ObjectId if preferred
    username: string; // The username of the user
    email: string; // The email address of the user
    thoughts: string[]; // Array of Thought IDs as strings, representing the user's associated thoughts
    friends: string[];  // Array of User IDs as strings, representing the user's friends
    friendCount?: number; // Optional computed property to store the total number of friends
}
  
// Define the payload expected when creating/updating a user
export interface IUserPayload {
    username: string; // The username of the user being created or updated
    email: string; // The email address of the user being created or updated
}
