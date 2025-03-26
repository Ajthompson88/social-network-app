import express, { Application } from 'express'; // Importing Express to create the server and Application type for type safety
import mongoose from 'mongoose'; // Importing Mongoose to interact with the MongoDB database
import dotenv from 'dotenv'; // Importing dotenv to load environment variables from a .env file
import userRoutes from './routes/userRoutes'; // Importing user-related routes
import thoughtRoutes from './routes/thoughtRoutes'; // Importing thought-related routes
import { connectDB } from './config/db'; // Importing a function to connect to the database

dotenv.config(); // Load environment variables from the .env file

export const app: Application = express(); // Create an Express application instance
const PORT = process.env.PORT || 3000; // Define the port number from environment variables or use 3000 as a default

// Middleware
app.use(express.json()); // Middleware to parse incoming JSON requests

// Connect to DB
connectDB(); // Call the function to connect to the MongoDB database

// Define routes
app.use('/api/users', userRoutes); // Use the user-related routes for requests starting with /api/users
app.use('/api/thoughts', thoughtRoutes); // Use the thought-related routes for requests starting with /api/thoughts

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); // Start the server and log the URL
