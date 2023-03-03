import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDB from './database/connection.js';
import log from './logger.js';

const port = process.env.PORT ?? 3000;
const mongoUrl = process.env.MONGO_DB ?? '';

app.listen(port, async () => {
  await connectDB(mongoUrl);
  log.info(`Server has started in port ${port}`);
});
