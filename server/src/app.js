import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import inventoryRoute from './routes/inventoryRoute.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// Routes
app.use('/', inventoryRoute);

export default app;
