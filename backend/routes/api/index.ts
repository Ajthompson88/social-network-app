import { Request, Response, Router } from 'express';
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

router.get('/', (_req: Request, res: Response) => {
    res.json({ success: true, message: 'API is up and running!' });
  });

export default router;