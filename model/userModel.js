import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Please tell us your name'],
      maxlength: [15, 'A user must be 15 charecters'],
      minlength: [8, 'A user must be 8 charecters'],
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
      maxlength: [15, 'A user must be 15 charecters'],
      minlength: [8, 'A user must be 8 charecters'],
      select: false,
    },
    confirm_password: {
      type: String,
      required: true,
      maxlength: [15, 'A user must be 15 charecters'],
      minlength: [8, 'A user must be 8 charecters'],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'confirm_password must be same as the password',
      },
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'share-holder'],
      default: 'user',
    },
    email: {
      type: String,
      required: [true, 'Please tell us your email id'],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, 'Please provide valid email'],
    },
    photo: String,
  },
  { timestamps: { createdAt: 'created_at' } }
);

UserSchema.pre('save', async function (next) {
  // Only run this func if pass was modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete the password confirm field
  this.confirm_password = undefined;
  next();
});
UserSchema.methods.isCorrectPassword = async function (userPassword, hash) {
  let comparePass = await bcrypt.compare(userPassword, hash);
  return comparePass;
};

UserSchema.methods.isPasswordChanged = async function (JWTTime) {
  if (this.created_at) {
    return JWTTime < parseInt(this.created_at.getTime() / 1000, 10);
  }
  return false;
};

const User = mongoose.model('user', UserSchema);

export default User;
