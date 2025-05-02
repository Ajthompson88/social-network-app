import request from 'supertest'; // Importing Supertest to make HTTP requests to the API during testing
import express from 'express'; // Importing Express to create a temporary app for testing
import router from '../routes/thoughtRoutes'; // Importing the router for "thoughts" routes (adjust the path if necessary)
import { describe, expect, it, jest, afterAll } from '@jest/globals'; // Importing Jest functions for testing, including jest and afterAll
import mongoose from 'mongoose';
import { server } from '../server'; // Adjust the path to your server file

// Create a temporary Express app for testing
const app = express(); // Initialize a new Express application
app.use('/api/thoughts', router); // Mount the "thoughts" router on the '/api/thoughts' path

// Grouping all tests related to the "thoughts" routes
describe('Thoughts Routes', () => {
    // Test the GET /api/thoughts route
    it('GET /api/thoughts should return "Thought route"', async () => {
        jest.setTimeout(10000); // Set timeout to 10 seconds
        // Send a GET request to the /api/thoughts endpoint
        const res = await request(app).get('/api/thoughts');
        
        // Expect the response status code to be 200 (OK)
        expect(res.statusCode).toBe(200);
    });

    afterAll(async () => {
        await mongoose.connection.close(); // Close the database connection
        server.close(); // Stop the server
    });
});
