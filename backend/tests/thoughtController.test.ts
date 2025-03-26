import request from 'supertest'; // Importing Supertest to make HTTP requests to the API during testing
import mongoose from 'mongoose'; // Importing Mongoose to interact with the database
import { app } from '../server'; // Ensure your Express app is exported from server.ts without calling app.listen()
import Thought from '../models/Thought'; // Importing the Thought model to interact with the Thought collection
import User from '../models/User'; // Importing the User model to interact with the User collection
import { describe, beforeAll, afterAll, expect, it } from '@jest/globals'; // Importing Jest functions for testing

// Grouping all tests related to the Thought API endpoints
describe('Thought API Endpoints', () => {
  let testUserId: string; // Variable to store the ID of a test user
  let testThoughtId: string; // Variable to store the ID of a test thought

  // Connect to the database and create a test user before running tests
  beforeAll(async () => {
    // Create a test user in the database
    const user = await User.create({ username: 'testuser', email: 'test@example.com' });
    // Cast _id to mongoose.Types.ObjectId to access toString()
    testUserId = (user._id as mongoose.Types.ObjectId).toString(); // Save the test user's ID as a string
  });

  // Clean up test data and close the database connection after tests run
  afterAll(async () => {
    await Thought.deleteMany({}); // Delete all thoughts from the database
    await User.deleteMany({}); // Delete all users from the database
    await mongoose.connection.close(); // Close the database connection
  });

  // Test GET /api/thoughts - retrieve all thoughts
  it('should get all thoughts', async () => {
    const res = await request(app).get('/api/thoughts'); // Send a GET request to the /api/thoughts endpoint
    expect(res.statusCode).toBe(200); // Expect the response status code to be 200 (OK)
    expect(res.body).toHaveProperty('data'); // Expect the response body to have a "data" property
    expect(Array.isArray(res.body.data)).toBeTruthy(); // Expect the "data" property to be an array
  });

  // Test POST /api/thoughts - create a new thought
  it('should create a new thought', async () => {
    const newThought = { 
      thoughtText: 'This is a test thought', // The text of the thought
      username: 'testuser', // The username of the user creating the thought
      userId: testUserId // The ID of the user creating the thought
    };
    const res = await request(app)
      .post('/api/thoughts') // Send a POST request to the /api/thoughts endpoint
      .send(newThought); // Include the new thought data in the request body
      
    expect(res.statusCode).toBe(201); // Expect the response status code to be 201 (Created)
    expect(res.body).toHaveProperty('data'); // Expect the response body to have a "data" property
    expect(res.body.data).toHaveProperty('_id'); // Expect the "data" property to have an "_id" field
    
    // Save the created thought's ID for later tests
    testThoughtId = res.body.data._id; // Store the ID of the newly created thought
  });

  // Test GET /api/thoughts/:thoughtId - retrieve a single thought by ID
  it('should get a single thought by ID', async () => {
    const res = await request(app).get(`/api/thoughts/${testThoughtId}`); // Send a GET request to retrieve the thought by its ID
    expect(res.statusCode).toBe(200); // Expect the response status code to be 200 (OK)
    expect(res.body).toHaveProperty('data'); // Expect the response body to have a "data" property
    expect(res.body.data._id).toBe(testThoughtId); // Expect the retrieved thought's ID to match the test thought's ID
  });

  // Test PUT /api/thoughts/:thoughtId - update an existing thought
  it('should update a thought', async () => {
    const updatedText = { thoughtText: 'This thought has been updated' }; // Define the updated text for the thought
    const res = await request(app)
      .put(`/api/thoughts/${testThoughtId}`) // Send a PUT request to update the thought by its ID
      .send(updatedText); // Include the updated text in the request body
      
    expect(res.statusCode).toBe(200); // Expect the response status code to be 200 (OK)
    expect(res.body).toHaveProperty('data'); // Expect the response body to have a "data" property
    expect(res.body.data.thoughtText).toBe(updatedText.thoughtText); // Expect the thought's text to be updated
  });

  // Test DELETE /api/thoughts/:thoughtId - delete a thought
  it('should delete a thought', async () => {
    const res = await request(app).delete(`/api/thoughts/${testThoughtId}`); // Send a DELETE request to delete the thought by its ID
    expect(res.statusCode).toBe(200); // Expect the response status code to be 200 (OK)
    expect(res.body).toHaveProperty('data'); // Expect the response body to have a "data" property
  });
});
