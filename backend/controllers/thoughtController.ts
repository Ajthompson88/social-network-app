import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

// GET all thoughts
export const getThoughts = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json({ success: true, data: thoughts });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ success: false, message: 'Failed to get thoughts', error: errorMessage });
  }
};

// GET a single thought by ID
export const getSingleThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ success: false, message: 'Thought not found' });
      return;
    }
    res.status(200).json({ success: true, data: thought });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ success: false, message: 'Failed to get thought', error: errorMessage });
  }
};

// POST create a new thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    // Expecting thoughtText, username, and userId in the request body
    const { thoughtText, username, userId } = req.body;
    const thought = await Thought.create({ thoughtText, username });
    
    // Push the created thought's _id to the associated user's thoughts array
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found, thought created but not associated' });
      return;
    }
    res.status(201).json({ success: true, data: thought });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ success: false, message: 'Failed to create thought', error: errorMessage });
  }
};

// PUT update a thought by ID
export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!thought) {
      res.status(404).json({ success: false, message: 'Thought not found' });
      return;
    }
    res.status(200).json({ success: true, data: thought });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ success: false, message: 'Failed to update thought', error: errorMessage });
  }
};

// DELETE remove a thought by ID
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
            res.status(404).json({ success: false, message: 'Thought not found' });
            return;
          }
          res.status(200).json({ success: true, data: thought });
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          res.status(500).json({ success: false, message: 'Failed to delete thought', error: errorMessage });
        }
      };
