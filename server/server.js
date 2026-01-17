import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); 
app.use(helmet()); 
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'E-commerce API is running...' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});