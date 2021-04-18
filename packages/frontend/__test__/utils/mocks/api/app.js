import express from 'express';
import cors from 'cors';
import handlers from './handlers';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', handlers);

export default app;
