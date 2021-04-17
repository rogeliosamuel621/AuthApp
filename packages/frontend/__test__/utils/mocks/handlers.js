import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => {
  return res.status(400).send();
});

export default router;
