import request from 'supertest'; // Importing Supertest to make HTTP requests to the API during testing
import mongoose from 'mongoose'; // Importing Mongoose to interact with the database
import { app, server } from '../server'; // Ensure your Express app is exported from server.ts without calling app.listen()
import Thought from '../models/Thought'; // Importing the Thought model to interact with the Thought collection
import User from '../models/User'; // Importing the User model to interact with the User collection
import { describe, beforeAll, afterAll, expect, it } from '@jest/globals'; // Importing Jest functions for testing
import { Request, Response } from 'express';
import { getThoughts } from '../controllers/thoughtController';
import { jest } from '@jest/globals';

describe('Thought API Endpoints', () => {
  let testUserId: string; // Variable to store the ID of a test user
  let testThoughtId: string; // Variable to store the ID of a test thought

  // Connect to the database and create a test user before running tests
  beforeAll(async () => {
    const user = await User.create({ username: 'testuser', email: 'test@example.com' });
    testUserId = (user._id as mongoose.Types.ObjectId).toString(); // Save the test user's ID as a string
  });

  // Clean up test data and close the database connection after tests run
  afterAll(async () => {
    await Thought.deleteMany({}); // Delete all thoughts from the database
    await User.deleteMany({}); // Delete all users from the database
    await mongoose.connection.close(); // Close the database connection
    server.close(); // Stop the server
  });

  // Test GET /api/thoughts - retrieve all thoughts
  it('should get all thoughts', async () => {
    jest.spyOn(Thought, 'find').mockReturnValueOnce({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValueOnce([{ _id: '1', thoughtText: 'Test Thought' }] as any),
    } as any);

    const res = await request(app).get('/api/thoughts'); // Send a GET request to the /api/thoughts endpoint
    expect(res.statusCode).toBe(200); // Expect the response status code to be 200 (OK)
    expect(res.body).toHaveProperty('data'); // Expect the response body to have a "data" property
    expect(Array.isArray(res.body.data)).toBeTruthy(); // Expect the "data" property to be an array
  });

  // Test POST /api/thoughts - create a new thought
  it('should create a new thought', async () => {
    jest.spyOn(Thought, 'create').mockResolvedValueOnce({ _id: '1', thoughtText: 'Test Thought' } as any);

    const newThought = {
      thoughtText: 'This is a test thought',
      username: 'testuser',
      userId: testUserId,
    };
    const res = await request(app).post('/api/thoughts').send(newThought); // Send a POST request to create a new thought

    expect(res.statusCode).toBe(201); // Expect the response status code to be 201 (Created)
    expect(res.body).toHaveProperty('data'); // Expect the response body to have a "data" property
    expect(res.body.data).toHaveProperty('_id'); // Expect the "data" property to have an "_id" field
    testThoughtId = res.body.data._id; // Store the ID of the newly created thought
  });

  // Test GET /api/thoughts/:thoughtId - retrieve a single thought by ID
  it('should get a single thought by ID', async () => {
    jest.spyOn(Thought, 'findById').mockResolvedValueOnce({ _id: '1', thoughtText: 'Test Thought' } as any);

    const res = await request(app).get(`/api/thoughts/${testThoughtId}`); // Send a GET request to retrieve the thought by its ID
    expect(res.statusCode).toBe(200); // Expect the response status code to be 200 (OK)
    expect(res.body).toHaveProperty('data'); // Expect the response body to have a "data" property
    expect(res.body.data._id).toBe(testThoughtId); // Expect the retrieved thought's ID to match the test thought's ID
  });

  // Test PUT /api/thoughts/:thoughtId - update an existing thought
  it('should update a thought', async () => {
    jest.spyOn(Thought, 'findByIdAndUpdate').mockResolvedValueOnce({ _id: '1', thoughtText: 'Updated Thought' } as any);

    const updatedText = { thoughtText: 'This thought has been updated' };
    const res = await request(app).put(`/api/thoughts/${testThoughtId}`).send(updatedText); // Send a PUT request to update the thought

    expect(res.statusCode).toBe(200); // Expect the response status code to be 200 (OK)
    expect(res.body).toHaveProperty('data'); // Expect the response body to have a "data" property
    expect(res.body.data.thoughtText).toBe(updatedText.thoughtText); // Expect the thought's text to be updated
  });

  // Test DELETE /api/thoughts/:thoughtId - delete a thought
  it('should delete a thought', async () => {
    jest.spyOn(Thought, 'findByIdAndDelete').mockResolvedValueOnce({ _id: '1', thoughtText: 'Deleted Thought' } as any);

    const res = await request(app).delete(`/api/thoughts/${testThoughtId}`); // Send a DELETE request to delete the thought
    expect(res.statusCode).toBe(200); // Expect the response status code to be 200 (OK)
    expect(res.body).toHaveProperty('data'); // Expect the response body to have a "data" property
  });
});

describe('Thought Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock<any>;
  let jsonMock: jest.Mock<any>;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      status: statusMock,
      json: jsonMock,
    } as unknown as Response;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getThoughts', () => {
    it('should return 200 and list of thoughts', async () => {
      const mockThoughts = [{ _id: '1', thoughtText: 'Test Thought' }];
      jest.spyOn(Thought, 'find').mockReturnValueOnce({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValueOnce(mockThoughts),
      } as any);

      if (!mockThoughts || mockThoughts.length === 0) {
        res.status(404).json({ success: false, message: 'No thoughts found' });
        return;
      }

      await getThoughts(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ success: true, data: mockThoughts });
    });

    it('should return 404 if no thoughts found', async () => {
      jest.spyOn(Thought, 'find').mockReturnValueOnce({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValueOnce([]),
      } as any);

      await getThoughts(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ success: false, message: 'No thoughts found' });
    });
  });
});

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
