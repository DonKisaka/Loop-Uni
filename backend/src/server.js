import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to database only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Daystar Marketplace API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

