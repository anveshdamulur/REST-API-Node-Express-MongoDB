import express from 'express';
import { verifyValidation, restrictTo } from '../handlers/authHandler.js';
// import handler
import {
  getTours,
  postTours,
  deleteTour,
  updateTour,
  topController,
  matchByDiff,
  getTour,
} from '../handlers/tourHandler.js';

const router = express.Router();

// Tour routes
router.route('/top-5-cheap').get(verifyValidation, topController, getTours);
router.route('/match-by-diff').get(matchByDiff);
router
  .route('/')
  .get(verifyValidation, getTours)
  .post(verifyValidation, postTours);
router
  .route('/:id')
  .get(verifyValidation, getTour)
  .patch(verifyValidation, updateTour)
  .delete(verifyValidation, restrictTo('admin', 'share-holder'), deleteTour);

export default router;
