const catchAsyncError = require("../middleware/catchAsyncError");
const HeadModel = require("../mongoSchema/chekItemModel");
const ApiFeatureHead = require("../util/apiFeatureHead");
const ErrorHandler = require("../util/errorHandling");

exports.getHeadCheckList = catchAsyncError(async (req, res, next) => {
  // const { token } = req.cookies;
  // console.log("cookie form getHeadChecklist");
  // console.log("token :", token);
  // console.log( req.query, "group query 1")
  const headObject = new ApiFeatureHead(HeadModel, req.query)
    .search()
    .filter()
    .pagination(1);
  const headCheckList = await headObject.query;

  if (headCheckList.length === 0) {
    return next(new ErrorHandler("could not find check list", 404));
  }

  const totalCount = await HeadModel.countDocuments(headObject.newQueryStr);

  // return results
  res.status(201).json({ success: true, headCheckList, totalCount });
});

// TO display all card
exports.getHeadMachineList = catchAsyncError(async (req, res, next) => {
  // console.log("cookie form getHeadMachinelist ");
  // const { token } = req.cookies;
  // console.log(req.cookies);
  // console.log("token :", token);

  req.query = { ...req.query };
  // console.log( req.query, "group query 2")
  const headObject = new ApiFeatureHead(HeadModel, req.query).match();
  const headCheckList = await headObject.query;

  if (headCheckList.length === 0) {
    return next(new ErrorHandler("could not find check list", 404));
  }

  let queryStrClient = await headObject.newQueryStr;

  const totalCount = await HeadModel.countDocuments({ ...queryStrClient });

  const totalCountBlock = await HeadModel.countDocuments({
    ...queryStrClient,
    line: "Block",
  });

  const totalCountCrank = await HeadModel.countDocuments({
    ...queryStrClient,
    line: "Crank",
  });

  const totalCountHead = await HeadModel.countDocuments({
    ...queryStrClient,
    line: "Head",
  });

  // unique machne
  let processNosUnique = [];
  let machineData = [];
  // let processCount=[]

  headCheckList.forEach((item) => {
    let line = item._id.line;

    const counts = {};
    item.processList.forEach((el) => {
      counts[el] = counts[el] ? (counts[el] += 1) : 1;
    });

    item.processList.forEach((e) => {
      let ind = processNosUnique.indexOf(e);
      if (ind === -1) {
        processNosUnique.push(e);
      }
    });

    machineData = [
      ...machineData,
      { line, processNos: processNosUnique, counts },
    ];
    processNosUnique = [];
  });

  //Sorting with respect to line
  machineData.sort((a, b) => {
    let x = a.line;
    let y = b.line;
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });

  // return results
  res.status(200).json({
    success: true,
    machineData,
    totalCount: { totalCountBlock, totalCountCrank, totalCountHead },
  });
});

exports.getAllMachineList = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  console.log("cookie form getAllMachinelist");
  console.log(token);
  req.query = { ...req.query };

  const headCheckList = await HeadModel.aggregate([
    { $match: req.query },
    {
      $group: {
        _id: { line: "$line", processNo: "$processNo" },
        processList: {
          $push: {
            id: "$_id",
            checkItem: "$checkItem",
            pS: "$pS",
          },
        },
      },
    },
    {
      $group: {
        _id: "$_id.line",
        processList: {
          $push: {
            processNo: "$_id.processNo",
            processData: "$processList",
          },
        },
      },
    },
  ]);

  if (headCheckList.length === 0) {
    return next(new ErrorHandler("could not find check list", 404));
  }

  let machineData = [];
  // let processCount=[]

  headCheckList.forEach((item) => {
    let line = item._id;

    const counts = {};
    item.processList.forEach((el) => {
      counts[el.processNo] = el.processData.length;
    });

    let processList = item.processList;
    processList.sort((a, b) => {
      let x = a.processNo;
      let y = b.processNo;
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    machineData = [...machineData, { line, processList, counts }];
  });

  //Sorting with respect to line
  machineData.sort((a, b) => {
    let x = a.line;
    let y = b.line;
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });

  // return results
  res.status(200).json({
    success: true,
    machineData,
  });
});

exports.getHeadMachineById = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const machine = await HeadModel.findById(id);

  if (!machine) {
    return next(new ErrorHandler("could not find Machine", 404));
  }

  res.status(200).json({
    success: true,
    data: machine,
  });
});

exports.saveData = catchAsyncError(async (req, res, next) => {
  const {
    action,
    cardNo,
    criterion,
    cycle,
    d,
    images,
    line,
    model,
    processNo,
    tool,
    workDetail,
    workOnePoint,
    categoryCtrl,
    commonItem,
    // createdAt,
    entryDate,
    holidayOperation,
    m,
    methodWssNo,
    pS,
    prepManHr,
    qualityOnePoint,
    rS,
    reason,
    remark,
    safetyOnePoint,
    w,
    wHr,
    workManpower,
    workTime,
    y,
    _id,
    group
  } = req.body;

  console.log("group is: ", group)
  //conver to int
  function converToInt(y) {
    const splitY = y.split(",");
    const intY = splitY.map((item) => parseInt(item));
    return intY;
  }

  const intD = converToInt(d);
  const intW = converToInt(w);
  const intM = converToInt(m);
  const intY = converToInt(y);

  // save in mongo db
  const doc = await HeadModel.findById(_id);

  if (!doc) {
    return next(new ErrorHandler("could not find Item", 404));
  }

  HeadModel.findByIdAndUpdate(
    _id,
    {
      action,
      cardNo,
      criterion,
      cycle,
      d: intD,
      images,
      line,
      model,
      processNo,
      tool,
      workDetail,
      workOnePoint,
      categoryCtrl,
      commonItem,
      // createdAt,
      entryDate,
      holidayOperation,
      m: intM,
      methodWssNo,
      pS,
      prepManHr,
      qualityOnePoint,
      rS,
      reason,
      remark,
      safetyOnePoint,
      w: intW,
      wHr,
      workManpower,
      workTime,
      y: intY,
      group

      // images: [req.file.filename],
    },
    (err, doc) => {
      if (err) {
        console.log("Could not save data", err);
        res.status(400).json({
          success: false,
          message: `Failed to upload Data, ${err.message} `,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Data uploaded successfully !",
        });
      }
    }
  );
});

exports.uploadImage = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body;
  console.log("Id is :", _id);
  // save in mongo db

  HeadModel.findByIdAndUpdate(
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

exports.insertData = catchAsyncError(async (req, res, next) => {
  console.log(req.body);

  const {
    action,
    cardNo,
    criterion,
    cycle,
    d,
    images,
    line,
    model,
    processNo,
    tool,
    workDetail,
    workOnePoint,
    categoryCtrl,
    commonItem,
    // createdAt,
    entryDate,
    holidayOperation,
    m,
    methodWssNo,
    pS,
    prepManHr,
    qualityOnePoint,
    rS,
    reason,
    remark,
    safetyOnePoint,
    w,
    wHr,
    workManpower,
    workTime,
    y,
    group
  } = req.body;

  //conver to int
  function converToInt(y) {
    const splitY = y.split(",");
    const intY = splitY.map((item) => parseInt(item));
    return intY;
  }

  const intD = converToInt(d);
  const intW = converToInt(w);
  const intM = converToInt(m);
  const intY = converToInt(y);

  // save in mongo db

  HeadModel.create(
    {
      action,
      cardNo,
      criterion,
      cycle,
      d: intD,
      images,
      line,
      model,
      processNo,
      tool,
      workDetail,
      workOnePoint,
      categoryCtrl,
      commonItem,
      // createdAt,
      entryDate,
      holidayOperation,
      m: intM,
      methodWssNo,
      pS,
      prepManHr,
      qualityOnePoint,
      rS,
      reason,
      remark,
      safetyOnePoint,
      w: intW,
      wHr,
      workManpower,
      workTime,
      y: intY,
      group
      // images: [req.file.filename],
    },
    (err, doc) => {
      if (err) {
        console.log("Could not save data", err);
        res.status(400).json({
          success: false,
          message: `Failed to insert Data, ${err.message} `,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Data inserted successfully !",
        });
      }
    }
  );
});

exports.deleteCheckItem = catchAsyncError(async (req, res, next) => {
  console.log("enterd");
  const id = req.params.id;
  console.log("Id :", id);
  const checkItem = await HeadModel.findById(id);
  console.log("checkItem  :", checkItem);
  if (!checkItem) {
    return next(new ErrorHandler("check item not found", 404));
  }
  await checkItem.remove();
  res
    .status(201)
    .json({ success: true, message: "Delete checkItem successfully" });
});
