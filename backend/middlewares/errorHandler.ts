import { Request, Response, NextFunction } from 'express'; // Importing tools to handle HTTP requests, responses, and middleware

// Define a custom error interface to include an optional statusCode property
interface CustomError extends Error {
  statusCode?: number; // This allows errors to optionally include a specific HTTP status code
}

// Middleware function to handle errors
export const errorHandler = (
  err: CustomError, // The error object that was thrown
  req: Request, // The incoming HTTP request
  res: Response, // The outgoing HTTP response
  next: NextFunction // The next middleware function in the chain
): void => {
  // Log the error to the console for debugging purposes
  console.error('Error:', err);

  // Use the statusCode from the error if it exists; otherwise, default to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  // Send a JSON response back to the client with the error details
  res.status(statusCode).json({
    success: false, // Indicate that the operation failed
    message: err.message || 'Internal Server Error', // Use the error message if available, otherwise use a default message
  });
};
