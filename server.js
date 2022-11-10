import dotenv from 'dotenv';
import mongoose from 'mongoose';

//env setup
dotenv.config({ path: './config.env' });
import server from './index.js';

//db connection
const db = process.env.DB_CON.replace('<PASSWORD>', process.env.DB_PASS);
mongoose
  .connect(db)
  .then(() => console.log('connected to database'))
  .catch((err) => err);

//Connecting to server
server.listen(process.env.PORT, async () => {
  try {
    console.log('listing to port');
    console.log(`server running in ${process.env.NODE_ENV}`);
  } catch (error) {
    console.log(error);
  }
});
