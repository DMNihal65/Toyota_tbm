class ApiFeatureDailyStatus {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    this.newQueryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.dept
      ? {
          pS: {
            $regex: this.queryStr.dept,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }
  filter() {
    let newQueryStr = { ...this.queryStr };
    const removeItems = ["dept", "page", "limit"];
    removeItems.forEach((item) => delete newQueryStr[item]);

    this.query = this.query.find(newQueryStr);

    return this;
  }
  pagination(docPerPage) {
    let page = this.queryStr.page || 1;
    const skip = docPerPage * (page - 1);
    this.query = this.query.find().skip(skip).limit(docPerPage);
    return this;
  }

  match() {
    let newQueryStr = { ...this.queryStr };
    const removeItems = ["dept", "page", "limit"];
    removeItems.forEach((item) => delete newQueryStr[item]);

    this.query = this.query.aggregate([
      { $match: newQueryStr },
      { $project : { _id : 1, checkItem : 1, result : 1}}
      
    ]);
    return this;
  }
}

module.exports = ApiFeatureDailyStatus;
