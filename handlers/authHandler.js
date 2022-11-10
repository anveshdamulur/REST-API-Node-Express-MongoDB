import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';
// import { validationErr } from './handleError.js';
import AppError from '../utils/appError.js';
import { promisify } from 'util';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
export const signUp = async (req, res, next) => {
  try {
    //1. get the body of inputs
    const { userName, email, password, confirm_password } = req.body;
    const newUser = await User.create({
      userName,
      email,
      password,
      confirm_password,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let token = '';
  //1. check body exits

  if (!email || !password) {
    return next(new AppError('Please providfe email and pass', 400));
  }

  //2. check if the user exits and pass correct
  const user = await User.findOne({ email }).select('+password');
  let checkPass = await user.isCorrectPassword(password, user.password);
  //3. Passing error if both are not true
  if (!user || !checkPass) {
    return next(new AppError('Incorrect password or email', 401));
  }
  // 4. Creating the token
  token = signToken(user._id);

  console.log(token);
  //3.All ok then send token to client
  res.status(200).json({
    status: 'success',
    token,
  });
};

export const verifyValidation = async (req, res, next) => {
  // 1. check there is any key token in headers
  let { authorization } = req.headers;
  let valid;
  let authToken;
  // 2. if not validate error
  if (!authorization) next(new AppError('Invalid token!!!!', 401));
  if (!authorization.startsWith('Bearer'))
    next(new AppError('Please provide the bearer key.', 401));
  // 4. get the authorization key
  authToken = authorization.split(' ')[1];
  //5. check with jwt verify
  try {
    valid = await promisify(jwt.verify)(authToken, process.env.JWT_SECRET);
  } catch (error) {
    next(new AppError(error));
  }
  //3. Check the usere still exited with valid id
  const checkUserExited = await User?.findById(valid.id);
  //4. if user is deleted from the db but token exited
  if (!checkUserExited) {
    next(
      new AppError(
        'User has been deleted after token genrated. Please create user again!!',
        404
      )
    );
  }
  //5. if user is available and check password has been chaged when user login in

  const frechUserAfterChangePassword = await checkUserExited.isPasswordChanged(
    valid.iat
  );
  // return error if changed password is true
  if (frechUserAfterChangePassword)
    return next(new AppError('user has changed his password', 401));

  // Grant access to protected routes
  req.newUser = checkUserExited;
  next();
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.newUser.role)) {
      return next(
        new AppError('You dont have permission to delete the tour', 404)
      );
    }
    next();
  };
};
