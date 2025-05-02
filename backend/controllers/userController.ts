import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const isValidId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  if (!isValidId(id)) {
    res.status(400).json({ error: 'Bad user ID' });
    return;
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e: any) => e.message);
      res.status(400).json({ errors });
      return;
    }
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  if (!isValidId(id)) {
    res.status(400).json({ error: 'Bad user ID' });
    return;
  }
  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted', deleted });
  } catch (err) {
    next(err);
  }
};
