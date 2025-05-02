import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Thought from '../models/Thought';
import User from '../models/User';

// Utility function for error handling
const handleError = (res: Response, error: any, message: string): void => {
  console.error(message, error);
  res.status(500).json({ success: false, message });
};

// Utility function to validate ObjectId
const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

// GET all thoughts with pagination
export const getThoughts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10' } = req.query as { page?: string; limit?: string };
    const thoughts = await Thought.find()
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    if (!thoughts || thoughts.length === 0) {
      res.status(404).json({ success: false, message: 'No thoughts found' });
      return;
    }

    res.status(200).json({ success: true, data: thoughts });
  } catch (error) {
    handleError(res, error, 'Failed to fetch thoughts');
  }
};

// GET a single thought by ID
export const getSingleThought = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isValidObjectId(req.params.thoughtId)) {
      res.status(400).json({ success: false, message: 'Invalid thought ID' });
      return;
    }

    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      res.status(404).json({ success: false, message: 'Thought not found' });
      return;
    }

    res.status(200).json({ success: true, data: thought });
  } catch (error) {
    handleError(res, error, 'Failed to fetch thought');
  }
};

// POST create a new thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const { thoughtText, username, userId } = req.body;

    if (!thoughtText || !username || !userId || !isValidObjectId(userId)) {
      res.status(400).json({ success: false, message: 'Invalid input' });
      return;
    }

    const thought = await Thought.create({ thoughtText, username });
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
  } catch (error) {
    handleError(res, error, 'Failed to create thought');
  }
};

// PUT update a thought by ID
export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isValidObjectId(req.params.thoughtId)) {
      res.status(400).json({ success: false, message: 'Invalid thought ID' });
      return;
    }

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
  } catch (error) {
    handleError(res, error, 'Failed to update thought');
  }
};

// DELETE remove a thought by ID
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isValidObjectId(req.params.thoughtId)) {
      res.status(400).json({ success: false, message: 'Invalid thought ID' });
      return;
    }

    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!thought) {
      res.status(404).json({ success: false, message: 'Thought not found' });
      return;
    }

    res.status(200).json({ success: true, data: thought });
  } catch (error) {
    handleError(res, error, 'Failed to delete thought');
  }
};

// POST add a reaction to a thought
export const addReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isValidObjectId(req.params.thoughtId)) {
      res.status(400).json({ success: false, message: 'Invalid thought ID' });
      return;
    }

    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!thought) {
      res.status(404).json({ success: false, message: 'Thought not found' });
      return;
    }

    res.status(200).json({ success: true, data: thought });
  } catch (error) {
    handleError(res, error, 'Failed to add reaction');
  }
};

// DELETE remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isValidObjectId(req.params.thoughtId)) {
      res.status(400).json({ success: false, message: 'Invalid thought ID' });
      return;
    }

    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      res.status(404).json({ success: false, message: 'Thought not found' });
      return;
    }

    res.status(200).json({ success: true, data: thought });
  } catch (error) {
    handleError(res, error, 'Failed to remove reaction');
  }
}
