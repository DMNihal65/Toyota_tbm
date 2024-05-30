const catchAsyncError = require("../middleware/catchAsyncError");
const AbnormalityModel = require("../mongoSchema/abnormalityModel");
const HeadModel = require("../mongoSchema/chekItemModel");
const ApiFeatureAbnormality = require("../util/apiFeatureAbnormality");
const ErrorHandler = require("../util/errorHandling");
const { getStartDate, getEndDate } = require("../util/getISODate");
const { ObjectId } = require("../util/getObjectType");

exports.createAbnormality = catchAsyncError(async (req, res, next) => {
  const {
    checkItem,
    abnormality,
    countermeasure,
    targetDate,
    pic,
    line,
    processNo,
    spare,
    status,
    user,
    image,
    pS,
  } = req.body;
  const abnormalityItem = await AbnormalityModel.create({
    checkItem,
    abnormality,
    countermeasure,
    targetDate,
    pic,
    // user: req.user._id,
    user,
    line,
    processNo,
    spare,
    status,
    image,
    pS,
  });
  res.status(200).json({ success: true, abnormalityItem });
});

exports.uploadAbnormalityImage = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body;

  // save in mongo db

  AbnormalityModel.findByIdAndUpdate(
    _id,
    {
      images: [req.file.filename],
    },
    (err, doc) => {
      if (err) {
        console.log("err ", err);
        res.status(400).json({
          success: false,
          message: "image upload Failed",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "image uploaded successfully",
          file: req.file,
        });
      }
    }
  );
});

exports.updateAbnormality = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const abnormalityItem = await AbnormalityModel.findById(id);
  if (!abnormalityItem) {
    return next(new ErrorHandler("cannot find this Abnormality item", 404));
  }

  const {
    abnormality,
    countermeasure,
    targetDate,
    spare,
    pic,
    status,
    checkItem,
    user,
    image,
  } = req.body;

  abnormalityItem.abnormality = abnormality;
  abnormalityItem.countermeasure = countermeasure;
  abnormalityItem.spare = spare;
  abnormalityItem.targetDate = targetDate;
  abnormalityItem.pic = pic;
  abnormalityItem.status = status;
  abnormalityItem.user = user;
  abnormalityItem.checkItem = checkItem;
  abnormalityItem.image = image;

  await abnormalityItem.save({ validateBeforeSave: false });
  res.status(201).json({ success: true, abnormalityItem });
});

exports.deleteAbnormality = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const abnormalityItem = await AbnormalityModel.findById(id);
  if (!abnormalityItem) {
    return next(new ErrorHandler("cannot find this abnormalityItem", 404));
  }

  await abnormalityItem.remove();
  res
    .status(201)
    .json({ success: true, message: "deleted Abnormality Item successfully" });
});

exports.getAbnormalityAll = catchAsyncError(async (req, res, next) => {
  //test

  const fromDate = req.params.fromDate;
  var toDate = req.params.toDate;
  var queryStr = req.query;
  var createdAt = { $gte: fromDate, $lt: toDate }
  let checkItemArray = [""]
  if (queryStr?.item){
    checkItemArray = []
    let checkItems = await HeadModel.find({
      workDetail: {
        $regex: queryStr.item,
        $options: "i"
      }
    })
    checkItems.map(item=>{
      checkItemArray.push(item._id.toString())
    })
  }

  if(queryStr.item  && !checkItemArray.length){
    return []
  }
    
  const abnormailityFeature = new ApiFeatureAbnormality(AbnormalityModel.find(), queryStr, createdAt, checkItemArray).filter()

  //test comp
  const abnormalities = await abnormailityFeature.query.find({


  })

  if (abnormalities.length === 0) {
    return next(new ErrorHandler("Abnormalities list not found", 404));
  }
  const totalAbnormalities = abnormalities.length;
  // console.log(abnormalities)
  res.status(201).json({ success: true, totalAbnormalities, abnormalities });
});

exports.getAbnormality = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const abnormalityItem = await AbnormalityModel.findById(id)
    .populate("checkItem", "line method processNo")
    .populate("user", "name");
  if (!abnormalityItem) {
    return next(new ErrorHandler("cannot find this abnormalityItem", 404));
  }

  res.status(201).json({ success: true, abnormalityItem });
});

exports.getAbnormalityByIdAndDate = catchAsyncError(async (req, res, next) => {
  const id = req.query.id;
  const date = req.query.date;
  console.log(date);
  var newQueryStr = {}

  if (id != "" && date != "") {
    newQueryStr["createdAt"] = {
      $lte:new Date(getEndDate(date)),
      $gte:new Date(getStartDate(date)),
    }
  }

  newQueryStr['checkItem']=ObjectId(id)

  console.log(newQueryStr);
  const abnormalityItem = await AbnormalityModel.findOne(newQueryStr)
  
  if (abnormalityItem==null) {
    res.status(201).json({ success: false });
  }

  res.status(201).json({ success: true, abnormalityItem });
});