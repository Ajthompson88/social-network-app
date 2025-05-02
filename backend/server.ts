// server.ts
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes';
import thoughtRoutes from './routes/thoughtRoutes';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;


// ─── 1) JSON BODY PARSER ─────────────────────────────────────────────────────
app.use(express.json());  // ← this must come before any `app.use('/api/...')`

// ─── 2) MOUNT YOUR ROUTERS ────────────────────────────────────────────────────
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// ─── 3) HEALTH CHECK & FALLBACKS ──────────────────────────────────────────────
app.get('/api', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'API is up and running!' });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── 4) GLOBAL ERROR HANDLER ─────────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});

// ─── 5) START SERVER ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

connectDB()
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));
  async function connectDB(): Promise<void> {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(process.env.MONGO_URI, {
    });
  }
