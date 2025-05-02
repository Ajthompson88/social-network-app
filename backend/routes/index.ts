import { NextFunction, Request, Response, Router } from 'express';
import apiRoutes from './api/index.js'; // Import the API routes

const router = Router();

router.use('/api', apiRoutes); 

  router.use((_req: Request, res: Response) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });
  
  // ─── 4) GLOBAL ERROR HANDLER ─────────────────────────────────────────────────
  router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: err.message });
  });
  

export default router;