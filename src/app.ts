import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({ hello: 'World' });
});
app.use(express.json());
app.disable('x-powered-by');

export default app;
