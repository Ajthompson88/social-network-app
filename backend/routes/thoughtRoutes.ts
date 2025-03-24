import { Router } from 'express';

const router = Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('Thought route');
});

export default router;