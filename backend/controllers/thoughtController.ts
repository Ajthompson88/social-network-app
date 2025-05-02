// controllers/thoughtController.ts
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Thought from '../models/Thought.js';

const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const getAllThoughts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json({ success: true, data: thoughts });
  } catch (err) {
    next(err);
  }
};

export const createThought = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // ← Actually save the new thought
    const newThought = await Thought.create({
      thoughtText: req.body.thoughtText,
      username:    req.body.username,
      // any other required fields…
    });
    res.status(201).json({ success: true, data: newThought });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e: any) => e.message);
      res.status(400).json({ success: false, errors });
      return;
    }
    next(err);
  }
};

export const deleteThought = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  if (!isValidId(id)) {
    res.status(400).json({ success: false, error: 'Invalid thought ID' });
    return;
  }
  try {
    const deleted = await Thought.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Thought not found' });
      return;
    }
    res.json({ success: true, message: 'Thought deleted', data: deleted });
  } catch (err) {
    next(err);
  }
};

export const getThoughtById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  if (!isValidId(id)) {
    res.status(400).json({ success: false, error: 'Invalid thought ID' });
    return;
  }
  try {
    const thought = await Thought.findById(id);
    if (!thought) {
      res.status(404).json({ success: false, error: 'Thought not found' });
      return;
    }
    res.status(200).json({ success: true, data: thought });
  } catch (err) {
    next(err);
  }
};
