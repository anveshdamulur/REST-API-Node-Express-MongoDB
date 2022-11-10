import Tour from '../model/tourModel.js';
import ApiFeatures from '../utils/apiFeature.js';
import AppError from '../utils/appError.js';
import { globalErrorHandler } from './handleError.js';
// middleware
export const topController = async (req, res, next) => {
  req.query.sort = '-price,ratingsAverage';
  req.query.fields = 'name,price,duration,summary';
  req.query.page = '2';
  req.query.limit = '5';
  next();
};

export const getTours = async (req, res, next) => {
  try {
    const apiFeature = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .fields()
      .pagination();

    const tour = await apiFeature.query;

    res.status(200).json({
      message: 'success',
      results: tour.length,
      data: tour,
    });
  } catch (error) {
    next(globalErrorHandler(error));
  }
};
export const postTours = async (req, res) => {
  try {
    const inputData = req.body;
    const postData = await Tour.create(inputData);
    res.status(200).json({
      status: 'success',
      data: postData,
    });
  } catch (error) {
    res.status(404).json({
      message: 'failed',
      status: error,
    });
  }
};

export const updateTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inputData = req.body;
    const updateTour = await Tour.findByIdAndUpdate(id, inputData, {
      runValidators: true,
      new: true,
    });
    if (!updateTour) {
      return next(new AppError('No tour found with that id ', 404));
    }
    res.status(200).json({
      status: 'success',
      data: updateTour,
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

export const getTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findTour = await Tour.findById({ _id: id });
    console.log(findTour);
    if (!findTour) {
      return next(new AppError('No tour found with that id ', 404));
    }
    res.status(200).json({
      status: 'success',
      data: findTour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};

export const matchByDiff = async (req, res) => {
  try {
    const stat = await Tour.aggregate([
      {
        $match: { difficulty: 'easy' },
      },

      {
        $group: {
          _id: '$name',
          difficultyBy: '$difficulty',
          totalDuration: { $sum: '$duration' },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: stat,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};

export const deleteTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteTour = await Tour.findByIdAndRemove(id);
    if (!deleteTour) {
      return next(new AppError('No tour found with that id ', 404));
    }
    res.status(200).json({
      status: 'success',
      data: deleteTour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};
