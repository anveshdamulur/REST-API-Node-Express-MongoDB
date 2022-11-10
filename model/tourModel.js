import mongoose from 'mongoose';

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'],
    unique: true,
    maxlength: [40, 'A tour must be 40 charecters'],
    minlength: [10, 'A tour must be 10 charecters'],
  },
  // firstName: {
  //   type: String,
  //   required: true,
  // },
  // lastName: {
  //   type: String,
  //   validate: function (val) {
  //     return val !== this.firstName;
  //   },
  // },
  price: {
    type: Number,
    required: [true, 'A tour must have price'],
  },
  priceDiscount: {
    type: Number,
    // validator works only when we create a new post req not for update. cause this keyword works only this document not for the updated value
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: 'price discount should not be greater than price',
    },
  },
  maxGroupSize: {
    type: Number,
    required: true,
  },
  ratingsAverage: {
    type: Number,
    required: true,
  },
  ratingsQuantity: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    enum: {
      values: ['easy', 'hard', 'medium'],
      message: 'This should contain only easy, difficult, hard',
    },
  },
  duration: {
    type: Number,
    default: 1,
    required: [true, 'A tour must have duration'],
  },
  summary: {
    type: String,
    required: [true, 'A tour must have summary'],
  },
  description: {
    type: String,
    required: [true, 'A tour must have description'],
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

//virtuals

const Tour = mongoose.model('tour', TourSchema);

export default Tour;
