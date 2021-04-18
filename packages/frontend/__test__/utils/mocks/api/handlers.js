import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => {
  if (req.body.email === 'sameEmail@gmail.com') {
    return res.status(401).send();
  }
  return res.status(400).send();
});

export default router;
