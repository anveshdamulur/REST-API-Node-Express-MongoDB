const fs = require('fs');
const dotenv = require('dotenv');

const mongoose = require('mongoose');
const Tour = require('../model/tourModel');

//env setup
dotenv.config({ path: '../config.env' });
//db connection

const db = process.env.DB_CON.replace('<PASSWORD>', process.env.DB_PASS);

mongoose
  .connect(db)
  .then(() => console.log('connected to database'))
  .catch((err) => err);

// getting data from outside
const importedData = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(importedData);
    console.log('data has been imported');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data has been deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
// Check according to the cmd
if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deleteData();
}
