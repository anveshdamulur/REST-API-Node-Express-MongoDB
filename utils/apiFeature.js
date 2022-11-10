class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  //Filter method

  filter() {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = { ...this.queryString };
    const excludedAt = ['sort', 'page', 'limit', 'fields'];
    excludedAt.forEach((el) => delete queryObj[el]);
    this.query = this.query.find({ queryObj });
    return this;
  }

  // //Sort
  sort() {
    //2.filter by sort
    const inputSortQuery = this.queryString.sort;
    if (inputSortQuery) {
      const queryBy = inputSortQuery.split(',').join(' ');
      this.query = this.query.sort(queryBy);
    } else {
      this.query = this.query.sort('createdAt');
    }
    return this;
  }

  // //3.filter by fields
  fields() {
    const inputFields = this.queryString.fields;
    if (inputFields) {
      const filterBy = inputFields.split(',').join(' ');
      this.query = this.query.select(filterBy);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  // // 4. Pagination
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
export default ApiFeatures;
