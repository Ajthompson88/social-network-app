import request from 'supertest';
import express from 'express';
import router from '../routes/thoughtRoutes'; // Adjust path as necessary
import { describe, expect, it } from '@jest/globals';

// Create a temporary Express app for testing
const app = express();
app.use('/api/thoughts', router);

describe('Thoughts Routes', () => {
    it('GET /api/thoughts should return "Thought route"', async () => {
        const res = await request(app).get('/api/thoughts');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Thought route');
    });
});
