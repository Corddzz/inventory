import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import inventoryRoute from './routes/inventoryRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:3000',
    // credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization'],
    // methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
);

// Routes
app.use('/api', inventoryRoute);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
