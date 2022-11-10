// import AppError from '../utils/appError.js';

// const handleCastErrDb = (err) => {
//   let message = `Invalid id at ${err.value._id} in a given url`;
//   return new AppError(message, 400);
// };

const sendErrAtDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    stack: err.stack,
    error: err,
    message: err.message,
  });
};
const sendErrAtProd = (err, res) => {
  // if operational errors, trusted error: send msg to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //1. log error
    console.log('Error :🔥', err);
    //2. send generic error
    res.status(500).json({
      status: 'error',
      message: 'something went very wrong',
    });
  }
};

export const globalErrorHandler = (err, _req, res, next) => {
  // Adding handling error middleware
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'production') {
    sendErrAtProd(err, res);
  } else if (process.env.NODE_ENV === 'development') {
    sendErrAtDev(err, res);
  }
};

// export const validationErr = (err) => {
//   if (err.name == 'ValidationError') {
//     return err.message.split(',');
//   }
//   return err;
// };
