import { Request, Response } from 'express'; // Importing tools to handle HTTP requests and responses
import Thought from '../models/Thought'; // Importing the Thought model to interact with the database
import User from '../models/User'; // Importing the User model to interact with the database

// GET all thoughts
export const getThoughts = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all thoughts from the database
    const thoughts = await Thought.find();
    // Send the list of thoughts back to the client with a success message
    res.status(200).json({ success: true, data: thoughts });
  } catch (error: unknown) {
    // If something goes wrong, send an error message back to the client
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ success: false, message: 'Failed to get thoughts', error: errorMessage });
  }
};

// GET a single thought by ID
export const getSingleThought = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find a specific thought in the database using the ID provided in the request
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      // If the thought doesn't exist, send a "not found" message
      res.status(404).json({ success: false, message: 'Thought not found' });
      return;
    }
    // If the thought is found, send it back to the client
    res.status(200).json({ success: true, data: thought });
  } catch (error: unknown) {
    // If something goes wrong, send an error message back to the client
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ success: false, message: 'Failed to get thought', error: errorMessage });
  }
};

// POST create a new thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the thought text, username, and user ID from the request body
    const { thoughtText, username, userId } = req.body;
    // Create a new thought in the database
    const thought = await Thought.create({ thoughtText, username });
    
    // Add the new thought's ID to the user's list of thoughts
    const user = await User.findByIdAndUpdate(
      userId, // Find the user by their ID
      { $push: { thoughts: thought._id } }, // Add the thought ID to the user's "thoughts" array
      { new: true } // Return the updated user document
    );
    if (!user) {
      // If the user doesn't exist, send a "not found" message
      res.status(404).json({ success: false, message: 'User not found, thought created but not associated' });
      return;
    }
    // If everything is successful, send the new thought back to the client
    res.status(201).json({ success: true, data: thought });
  } catch (error: unknown) {
    // If something goes wrong, send an error message back to the client
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ success: false, message: 'Failed to create thought', error: errorMessage });
  }
};

// PUT update a thought by ID
export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find a thought by its ID and update it with the data provided in the request body
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId, // The ID of the thought to update
      req.body, // The new data for the thought
      { new: true, runValidators: true } // Return the updated thought and validate the data
    );
    if (!thought) {
      // If the thought doesn't exist, send a "not found" message
      res.status(404).json({ success: false, message: 'Thought not found' });
      return;
    }
    // If the update is successful, send the updated thought back to the client
    res.status(200).json({ success: true, data: thought });
  } catch (error: unknown) {
    // If something goes wrong, send an error message back to the client
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ success: false, message: 'Failed to update thought', error: errorMessage });
  }
};

// DELETE remove a thought by ID
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find a thought by its ID and delete it from the database
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      // If the thought doesn't exist, send a "not found" message
      res.status(404).json({ success: false, message: 'Thought not found' });
      return;
    }
    // If the deletion is successful, send the deleted thought back to the client
    res.status(200).json({ success: true, data: thought });
  } catch (error: unknown) {
    // If something goes wrong, send an error message back to the client
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ success: false, message: 'Failed to delete thought', error: errorMessage });
  }
};
