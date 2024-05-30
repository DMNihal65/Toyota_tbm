class ApiFeatureAbnormality {
  constructor(query, queryStr, createdAt, checkItemArray) {
    this.query = query;
    this.queryStr = queryStr;
    this.newQueryStr = {};
    this.createdAt = createdAt;
    this.checkItemArray = checkItemArray
  }

  filter() {
    let newQueryStr = { ...this.queryStr };

    // deleteing keys for which regex is not required
    const deleteObj = ["entryDate", "target", "item"];
    deleteObj.forEach((item) => delete newQueryStr[item]);

    if(this.checkItemArray.length>0 && this.checkItemArray[0]!=""){
      this.newQueryStr.checkItem = {
        $in:this.checkItemArray
      }
    }
    // add keys with regex in this.newQueryStr
    for (let key in newQueryStr) {
      this.newQueryStr[key] = { $regex: newQueryStr[key], $options: "i" };
    }
    // console.log({ ...this.newQueryStr, createdAt: { ...this.createdAt } });
    this.query = this.query
      .find({ ...this.newQueryStr, createdAt: { ...this.createdAt }})
      .populate("user", "name")
      .populate("checkItem", "workDetail")
      .sort({ createdAt: -1 });

    // after populate query
    if (this.queryStr.item) { 

      // this.query = this.query.aggregate([
      //   {
      //     $lookup: {
      //       from: "checkitems",
      //       localField: "checkItem",
      //       foreignField: "_id",
      //       as: "workDetail"
      //     }
      //   }
      // ])



      // this.query = this.query.find({ 
      //   "checkItem.workDetail":{
      //       $regex: this.queryStr.item,
      //       $options: "i",
      //     },  });
    }
    return this;
  }
}

// const ApiFeatureAbnormality ="test1"

module.exports = ApiFeatureAbnormality;
