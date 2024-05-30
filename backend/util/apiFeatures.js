class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.Line
      ? { Line: {
            $regex: this.queryStr.Line,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });


    // this.queryStr = this.queryStr.Line
    //   ? {
    //       ...this.queryStr,
    //       Line: {
    //         $regex: this.queryStr.Line,
    //         $options: "i",
    //       },
    //     }
    //   : this.queryStr;

    // this.query = this.query.find({ ...this.queryStr });

    return this;
  }
  filter() {
    const newQueryStr = { ...this.queryStr };
    const removeItems = ["Line", "page", "limit"];
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
}

module.exports = ApiFeatures;
