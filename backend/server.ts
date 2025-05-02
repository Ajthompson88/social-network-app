import express, { Application, Request, Response, NextFunction } from 'express'; // Importing Express to create the server and Application type for type safety
import dotenv from 'dotenv'; // Importing dotenv to load environment variables from a .env file
import userRoutes from './routes/userRoutes'; // Importing user-related routes
import thoughtRoutes from './routes/thoughtRoutes'; // Importing thought-related routes
import { connectDB } from './config/db'; // Importing a function to connect to the database

dotenv.config(); // Load environment variables from the .env file

export const app: Application = express(); // Create an Express application instance
const PORT = process.env.PORT || 4000; // Define the port number from environment variables or use 4000 as a default

// Middleware
app.use(express.json()); // Middleware to parse incoming JSON requests

// Connect to DB
connectDB(); // Call the function to connect to the MongoDB database

// Define routes
app.use('/api/users', userRoutes); // Use the user-related routes for requests starting with /api/users
app.use('/api/thoughts', thoughtRoutes); // Use the thought-related routes for requests starting with /api/thoughts

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start the server
const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); // Start the server and log the URL

// Export the server for testing purposes
export { server };
