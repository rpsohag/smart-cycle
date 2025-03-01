import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler';
import connectToDatabase from './db';

dotenv.config();
const app = express();
const port = process.env.APP_PORT || 5050;
const whiteList = ["http://localhost:5173"];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
    res.send('Smart Cycle API is running');
});


// Routes
app.use('/api/auth', authRoutes);


app.use(notFoundHandler);
app.use(errorHandler);



app.listen(port, () => {
    connectToDatabase();
    console.log(`Server is running on port ${port}`);
});
