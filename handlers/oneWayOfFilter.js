//1.filter by gte, lte, gt, lt
// eslint-disable-next-line node/no-unsupported-features/es-syntax
// const queryObj = { ...req.query };
// const excludedAt = ['sort', 'page', 'limit', 'fields'];
// excludedAt.forEach((el) => delete queryObj[el]);
// let query = Tour.find({ queryObj });

// //2.filter by sort
// try {
//   const inputSortQuery = req.query.sort;
//   if (inputSortQuery) {
//     const queryBy = inputSortQuery.split(',').join(' ');
//     query = query.sort(queryBy);
//   }
// } catch (error) {
//   throw new Error({
//     message: 'ordered sorting failed',
//   });

//3.filter by fields
// try {
//   const inputFields = req.query.fields;
//   if (inputFields) {
//     const filterBy = inputFields.split(',').join(' ');
//     query = query.select(filterBy);
//   }
// } catch (error) {
//   throw Error({
//     message: 'ordered sorting failed',
//   });
// }
// 4. Pagination
// try {
//   const page = req.query.page * 1 || 1;
//   const limit = req.query.limit * 1 || 100;
//   const skip = (page - 1) * limit;
//   query = query.skip(skip).limit(limit);
//   if (req.query.page) {
//     const tourLength = await Tour.countDocuments();
//     if (skip >= tourLength) {
//       throw Error('Your limit exceeded the data size ');
//     }
//   }
// } catch (error) {
//   throw Error(error);
// }
