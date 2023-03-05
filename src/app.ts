import cors from 'cors';
import express from 'express';
import authRouter from './api/auth/auth-router.js';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({ hello: 'World' });
});
app.use(express.json());
app.disable('x-powered-by');

app.use('/auth', authRouter);

export default app;
