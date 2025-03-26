import { Request, Response } from 'express'; // Importing tools to handle HTTP requests and responses
import User from '../models/User'; // Importing the User model to interact with the database

// GET all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all users from the database
    // Also include their associated "thoughts" and "friends" data
    const users = await User.find().populate('thoughts').populate('friends');

    // Check if no users were found
    if (!users || users.length === 0) {
      // If no users exist, send a "not found" message
      res.status(404).json({ success: false, message: 'No users found' });
      return;
    }

    // If users are found, send them back to the client with a success message
    res.status(200).json({ success: true, data: users });
  } catch (error: unknown) {
    // Log the error to the console for debugging
    console.error('Error fetching users:', error);

    // Check if the error is an instance of the Error class
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    // Send an error response back to the client
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching users',
      error: errorMessage,
    });
  }
};

// GET a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find a specific user in the database using the ID provided in the request
    // Also include their associated "thoughts" and "friends" data
    const user = await User.findById(req.params.userId)
      .populate('thoughts') // Include the user's thoughts
      .populate('friends'); // Include the user's friends

    // Check if the user was not found
    if (!user) {
      // If the user doesn't exist, send a "not found" message
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    // If the user is found, send their data back to the client with a success message
    res.status(200).json({ success: true, data: user });
  } catch (error: unknown) {
    // Log the error to the console for debugging
    console.error('Error fetching user by ID:', error);

    // Check if the error is an instance of the Error class
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    // Send an error response back to the client
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching user by ID',
      error: errorMessage,
    });
  }
};