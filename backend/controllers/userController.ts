import { Request, Response } from 'express';
import User from '../models/User';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');

    // If no users exist, you might choose to handle it as a "not found" case
    if (!users || users.length === 0) {
      res.status(404).json({ success: false, message: 'No users found' });
      return;
    }

    res.status(200).json({ success: true, data: users });
  } catch (error: unknown) {
    console.error('Error fetching users:', error);

    // Narrowing the error type
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching users',
      error: errorMessage,
    });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    // If user is found, send a success response with the user data.
    res.status(200).json({ success: true, data: user });
  } catch (error: unknown) {
    console.error('Error fetching user by ID:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching user by ID',
      error: errorMessage,
    });
  }
};