import express from 'express';
import morgan from 'morgan';
import AppError from './utils/appError.js';
import { globalErrorHandler } from './handlers/handleError.js';

import tourRoutes from './routes/tourRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}
// Middlewares
app.use(express.json());
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
  //using error middleware
  const err = new AppError(`You entered wrong url ${req.originalUrl}`, 404);
  next(err);
});

// Adding handling error middleware
app.use(globalErrorHandler);

export default app;
