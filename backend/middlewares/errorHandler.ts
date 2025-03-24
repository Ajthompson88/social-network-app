import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error for debugging purposes
  console.error('Error:', err);

  // Use the statusCode from the error if available; otherwise default to 500
  const statusCode = err.statusCode || 500;

  // Send a JSON response with the error message
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
