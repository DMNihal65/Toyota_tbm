class ApiFeatureHead {
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
    this.newQueryStr = { ...keyword };

    return this;
  }
  filter() {
    let newQueryStr = { ...this.queryStr };
    const removeItems = ["dept", "page", "limit"];
    removeItems.forEach((item) => delete newQueryStr[item]);

    newQueryStr = newQueryStr.d
      ? { ...newQueryStr, d: { $in: [9999, Number(newQueryStr.d)] } }
      : { ...newQueryStr };

    newQueryStr = newQueryStr.w
      ? { ...newQueryStr, w: { $in: [9999, Number(newQueryStr.w)] } }
      : { ...newQueryStr };

    newQueryStr = newQueryStr.m
      ? { ...newQueryStr, m: { $in: [9999, Number(newQueryStr.m)] } }
      : { ...newQueryStr };

    newQueryStr = newQueryStr.y
      ? { ...newQueryStr, y: { $in: [9999, Number(newQueryStr.y)] } }
      : { ...newQueryStr };

    this.query = this.query.find(newQueryStr);
    this.newQueryStr = { ...newQueryStr };
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

    newQueryStr = newQueryStr.d
      ? { ...newQueryStr, d: { $in: [9999, Number(newQueryStr.d)] } }
      : { ...newQueryStr };

    newQueryStr = newQueryStr.w
      ? { ...newQueryStr, w: { $in: [9999, Number(newQueryStr.w)] } }
      : { ...newQueryStr };

    newQueryStr = newQueryStr.m
      ? { ...newQueryStr, m: { $in: [9999, Number(newQueryStr.m)] } }
      : { ...newQueryStr };

    newQueryStr = newQueryStr.y
      ? { ...newQueryStr, y: { $in: [9999, Number(newQueryStr.y)] } }
      : { ...newQueryStr };

    this.newQueryStr = { ...newQueryStr };

    this.query = this.query.aggregate([
      { $match: newQueryStr },
      {
        $group: {
          _id: { line: "$line" },
          processList: { $push: "$processNo" },
          // itemCount: { $sum: 1 },
        },
      },
    ]);
    return this;
  }
}

module.exports = ApiFeatureHead;
