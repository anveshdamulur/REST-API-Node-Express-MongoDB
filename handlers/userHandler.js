import User from '../model/userModel.js';
import AppError from '../utils/appError.js';
// import { validationErr } from './handleError.js';

export const getUsers = async (req, res, next) => {
  try {
    const user = await User?.find().select('-password');
    if (!user == 'undefined' && user.length > 0) {
      return res.status(400).json({
        status: 'failed',
        message: new AppError('invalid data found', 400),
      });
    }
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

export const createUser = async (req, res, next) => {
  try {
    const inputData = req.body;
    const newUser = await User.create(inputData);
    if (!newUser) {
      return next(new AppError('Invalid input data. Please provide data', 404));
    }

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findOneAndDelete({ _id: id });
    if (!deletedUser) {
      return next(new AppError('Invalid id', 404));
    }

    res.status(201).json({
      status: 'success',
      data: deletedUser,
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};
