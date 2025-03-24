import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server'; // Ensure your Express app is exported from server.ts without calling app.listen()
import Thought from '../models/Thought';
import User from '../models/User';
import { describe, beforeAll, afterAll, expect, it } from '@jest/globals';

describe('Thought API Endpoints', () => {
  let testUserId: string;
  let testThoughtId: string;

  // Connect to the database and create a test user before running tests
  beforeAll(async () => {
    const user = await User.create({ username: 'testuser', email: 'test@example.com' });
    // Cast _id to mongoose.Types.ObjectId to access toString()
    testUserId = (user._id as mongoose.Types.ObjectId).toString();
  });

  // Clean up test data and close the database connection after tests run
  afterAll(async () => {
    await Thought.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  // Test GET /api/thoughts - retrieve all thoughts
  it('should get all thoughts', async () => {
    const res = await request(app).get('/api/thoughts');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });

  // Test POST /api/thoughts - create a new thought
  it('should create a new thought', async () => {
    const newThought = { 
      thoughtText: 'This is a test thought', 
      username: 'testuser', 
      userId: testUserId 
    };
    const res = await request(app)
      .post('/api/thoughts')
      .send(newThought);
      
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('_id');
    
    // Save the created thought's ID for later tests
    testThoughtId = res.body.data._id;
  });

  // Test GET /api/thoughts/:thoughtId - retrieve a single thought by ID
  it('should get a single thought by ID', async () => {
    const res = await request(app).get(`/api/thoughts/${testThoughtId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data._id).toBe(testThoughtId);
  });

  // Test PUT /api/thoughts/:thoughtId - update an existing thought
  it('should update a thought', async () => {
    const updatedText = { thoughtText: 'This thought has been updated' };
    const res = await request(app)
      .put(`/api/thoughts/${testThoughtId}`)
      .send(updatedText);
      
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.thoughtText).toBe(updatedText.thoughtText);
  });

  // Test DELETE /api/thoughts/:thoughtId - delete a thought
  it('should delete a thought', async () => {
    const res = await request(app).delete(`/api/thoughts/${testThoughtId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
  });
});
