import { Router } from 'express';
import { dashboard } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/dashboard', dashboard, (req, res) => {
  res.send(`Welcome, ${req.session.user}`);
});

export default router;
