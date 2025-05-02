import { Request, Response } from 'express';
import User from '../models/User'; // Import the User model to interact with the database

// Controller to GET all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      res.status(404).json({ success: false, message: 'No users found' });
      return;
    }

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};