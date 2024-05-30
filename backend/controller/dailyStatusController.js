const catchAsyncError = require("../middleware/catchAsyncError");
const DailyStatusModel = require("../mongoSchema/dailyStatusModel");
const PendingTask = require("../mongoSchema/pendingTaskModel");
const ErrorHandler = require("../util/errorHandling");
const ApiFeatureDailyStatus = require("../util/apiFeatureDailyStatus");
const { ObjectId } = require("../util/getObjectType");
const ApiFeatureHead = require("../util/apiFeatureHead");
const HeadModel = require("../mongoSchema/chekItemModel");
const DailyGraphModel = require("../mongoSchema/dailyGraphModel");

exports.createDailyStatus = catchAsyncError(async (req, res, next) => {
  const { checkItem, result, value, user, entryFor, pS, line, remarks, checkedBy } =
    req.body;
  console.log(req.body);

  const dailystatusAvailable = await DailyStatusModel.findOne({
    checkItem,
    entryFor,
  });

  if (dailystatusAvailable) {
    dailystatusAvailable.result = result;
    dailystatusAvailable.value = value;
    dailystatusAvailable.remarks = remarks;
    dailystatusAvailable.checkedBy = checkedBy;
    const dailyStatus = await dailystatusAvailable.save({
      validateBeforeSave: false,
    });

    res.status(200).json({ success: true, dailyStatus });
  } else {
    const dailyStatus = await DailyStatusModel.create({
      checkItem,
      result,
      value,
      user,
      entryFor,
      pS,
      remarks,
      checkedBy,
    });

    const pendingTask = await PendingTask.findOne({ checkItem: checkItem });

    if (pendingTask) {
      pendingTask.result = result;
      await pendingTask.save();
      const graph = await DailyGraphModel.findOne({
        pS: pS,
        line: line,
        entryFor: entryFor
      });

      if (graph) {
        graph.totalPending = graph.totalPending - 1;
        if (result == "OK") {
          graph.totalOK = graph.totalOK + 1;
        } else {
          graph.totalNG = graph.totalNG + 1;
        }
        await graph.save()
      }

    }

    res.status(200).json({ success: true, dailyStatus });
  }
});


exports.removeDailyStatus = async (req, res, next) => {
  const id = req.params.id;
  const { checkItem, result, value, user, entryFor, pS, remarks, checkedBy } =
    req.body;

  let dailyStatus = await DailyStatusModel.findById(id);
  if (!dailyStatus) {
    return next(new ErrorHandler("No such daily status check ", 404));
  }

  dailyStatus.checkItem = checkItem;
  dailyStatus.result = result;
  dailyStatus.value = value;
  dailyStatus.user = user;
  dailyStatus.entryFor = entryFor;
  dailyStatus.pS = pS;
  dailyStatus.remarks = remarks;
  dailyStatus.checkedBy = checkedBy;
  await dailyStatus.save({ validateBeforeSave: false });

  res.status(201).json({ success: true, message: "Updated Successfully" });
}

exports.updateDailyStatus = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const { checkItem, result, value, user, entryFor, pS, remarks, checkedBy } =
    req.body;

  let dailyStatus = await DailyStatusModel.findById(id);
  if (!dailyStatus) {
    return next(new ErrorHandler("No such daily status check ", 404));
  }

  dailyStatus.checkItem = checkItem;
  dailyStatus.result = result;
  dailyStatus.value = value;
  dailyStatus.user = user;
  dailyStatus.entryFor = entryFor;
  dailyStatus.pS = pS;
  dailyStatus.remarks = remarks;
  dailyStatus.checkedBy = checkedBy;
  await dailyStatus.save({ validateBeforeSave: false });

  res.status(201).json({ success: true, message: "Updated Successfully" });
});

exports.deleteDailyStatus = catchAsyncError(async (req, res, next) => {
  const { checkItem, entryFor } = req.body;

  console.log(checkItem, entryFor);

  const dailyStatus = await DailyStatusModel.findOne({
    checkItem: checkItem,
    entryFor: entryFor,
  });

  console.log(dailyStatus);
  if (!dailyStatus) {
    return next(new ErrorHandler("No such daily status check ", 404));
  }
  console.log(dailyStatus);
  await dailyStatus.remove();
  res.status(201).json({ success: true, message: "Deleted Successfully" });
});

exports.getDailyStatus = catchAsyncError(async (req, res, next) => {
  const { idCheckItem, entryFor } = req.params;

  let dailyStatus = await DailyStatusModel.findOne({
    checkItem: idCheckItem,
    entryFor,
  });
  if (!dailyStatus) {
    // return next(new ErrorHandler("No such daily status check ", 404));
    res
      .status(201)
      .json({ success: true, dailyStatus: { result: "decisionPending" } });
  }

  res.status(201).json({ success: true, dailyStatus });
});

const sortData = (data) => {
  let dataList = [];

  data.forEach((item) => {
    //data
    let { line, processNo } = item.checkItem;
    let { result, _id } = item;

    //initial reference
    let lineAvailable = false;
    let lineIndex = null;
    let processAvailable = false;
    let processIndex = null;

    // check line & process availability
    dataList.forEach((item, ind) => {
      if (item.line === line) {
        lineAvailable = true;
        lineIndex = ind;
        dataList[lineIndex].processes.forEach((process, processInd) => {
          if (process.processNo === processNo) {
            processAvailable = true;
            processIndex = processInd;
          }
        });
      }
    });

    //check process availability

    // data filling
    if (!lineAvailable && result === "OK") {
      dataList.push({
        line,
        processes: [{ processNo, result: { OK: 1, NG: 0 } }],
      });
    }

    if (!lineAvailable && result === "NG") {
      dataList.push({
        line,
        processes: [{ processNo, result: { OK: 0, NG: 1 } }],
      });
    }

    if (lineAvailable && !processAvailable && result === "OK") {
      dataList[lineIndex].processes.push({
        processNo,
        result: { OK: 1, NG: 0 },
      });
    }

    if (lineAvailable && !processAvailable && result === "NG") {
      dataList[lineIndex].processes.push({
        processNo,
        result: { OK: 0, NG: 1 },
      });
    }

    if (lineAvailable && processAvailable && result === "OK") {
      dataList[lineIndex].processes[processIndex].result.OK =
        dataList[lineIndex].processes[processIndex].result.OK + 1;
    }
    if (lineAvailable && processAvailable && result === "NG") {
      dataList[lineIndex].processes[processIndex].result.NG =
        dataList[lineIndex].processes[processIndex].result.NG + 1;
    }
  });
  return dataList;
};

exports.getDailyStatusAll = catchAsyncError(async (req, res, next) => {
  req.query = { ...req.query };

  const dailyStatusAll = await DailyStatusModel.find(req.query)
    .populate("checkItem", "line method processNo pS")
    .populate("user", "name");
  if (!dailyStatusAll) {
    return next(new ErrorHandler("No such Daily status check", 404));
  }

  const sortedDailyStatus = sortData(dailyStatusAll);

  const totalDailyStatus = dailyStatusAll.length;
  res.status(201).json({
    success: true,
    totalDailyStatus,
    sortedDailyStatus,
  });
  // res.status(201).json({
  //   success: true,
  //    totalDailyStatus,
  //   dailyStatusAll,
  // });
});

exports.getDailyStatusByCheckItem = catchAsyncError(async (req, res, next) => {
  const query = {}
  console.log("here");

  console.log(req?.query?.byData==="yes");
  const dailyStatusAll = await DailyStatusModel.find(
    req?.query?.byData==="yes" ?{
      ...req?.query?.query
    }:{
      checkItem: ObjectId(req.query.checkItem)
    }
  );

  console.log(dailyStatusAll);

  if (!dailyStatusAll) {
    res.status(201).json({
      success: false,
      dailyStatusAll: []
    });
  }

  res.status(201).json({
    success: true,
    dailyStatusAll: dailyStatusAll
  });
});

// Aggregare method not used yet
exports.getDailyStatusAggregated = catchAsyncError(async (req, res, next) => {
  req.query = { ...req.query };
  const dailyStatusAggregated = new ApiFeatureDailyStatus(
    DailyStatusModel,
    req.query
  ).match();
  const dailyStatusAggregatedList = await dailyStatusAggregated.query;

  if (dailyStatusAggregatedList.length === 0) {
    return next(new ErrorHandler("could not find check list", 404));
  }

  // // unique machne
  // let processNosUnique = [];
  // let machineData = [];

  // headCheckList.forEach((item) => {
  //   let line = item._id.line;

  //   item.processList.forEach((e) => {
  //     let ind = processNosUnique.indexOf(e);
  //     if (ind === -1) {
  //       processNosUnique.push(e);
  //     }
  //   });

  //   machineData = [...machineData, { line, processNos: processNosUnique }];
  //   processNosUnique = [];
  // });

  // return results
  res.status(201).json({ success: true, dailyStatusAggregatedList });
});

exports.getTrendDailyStatus = catchAsyncError(async (req, res, next) => {
  const { idCheckItem, fromDate, toDate } = req.params;
  // console.log(req.params);
  // console.log(`checkedAt:{$gte:${fromDate}, $lt:${toDate}}`)
  let dailyStatus = await DailyStatusModel.find(
    {
      checkItem: idCheckItem,
      checkedAt: { $gte: fromDate, $lt: toDate },
    },
    { value: 1, entryFor: 1 }
  );

  if (!dailyStatus) {
    return next(new ErrorHandler("could not find data / list is empty", 404));
  }

  res
    .status(201)
    .json({ success: true, total: dailyStatus.length, dailyStatus });
});


function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    var cdate = new Date(date).toLocaleDateString()
    var fdate = cdate.split("/")
    fdate = fdate[1] + "-" + fdate[0] + "-" + fdate[2]
    dates.push(fdate);
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

exports.changeVerified = catchAsyncError(async (req, res, next) => {
  console.log(req.query);
  const dailyStatus = await DailyStatusModel.findOneAndUpdate({
    _id: ObjectId(req.query.id),
  }, {
    [req.query.role]: req.query.status == "false" ? false : true
  });

  if (!dailyStatus) {
    res.status(201).json({
      success: false,
    });
  }

  res.status(201).json({
    success: true,
    dailyStatus: dailyStatus
  });
})

exports.getGraphData = catchAsyncError(async (req, res, next) => {

  const { startDate, endDate, pS, line } = req.body;
  var start = startDate.split("/")
  start = start[2] + "-" + start[1] + "-" + start[0]
  var end = endDate.split("/")
  end = end[2] + "-" + end[1] + "-" + end[0]
  const d1 = new Date(start);
  const d2 = new Date(end);

  var dates = getDatesInRange(d1, d2)

  const dailyGraphData = await DailyGraphModel.find({
    pS: pS,
    line: line,
    dateString: {
      $in: dates
    }
  })

  var totalData = {}

  console.log(dates);

  dailyGraphData.map(data => {
    const dd = new Date(data.graphFor)
    totalData[dd.getTime()] = {
      date: data.dateString,
      total: data.total,
      totalOK: data.totalOK,
      totalNG: data.totalNG,
      totalPending: data.totalPending
    }
  })

  console.log(totalData);

  res.json({
    totalData: totalData
  })
})

exports.generateDailyGraph = async (req, res, next) => {
  const { pS,reqDate } = req.query;
  if (!pS) {
    return next(new ErrorHandler("pS not found", 400));
  }

  var dateType = new Date();
  if(reqDate){
    var rdateType = new Date(reqDate)
    if(rdateType.getTime() < dateType.getTime() && rdateType.getTime() > 946665000000){
        dateType = rdateType
    }
    else{
       return next(new ErrorHandler("Enter valid reqDate format (yyyy/MM/dd) ", 500));
    }
  }
  else{
    dateType.setDate(dateType.getDate()-1)
  }

  const headVal = {
    "d": dateType.getDate(),
    "w": Math.floor(dateType.getDate() / 7.1) + 1,
    "m": dateType.getMonth() + 1,
    "y": dateType.getFullYear(),
    "pS": pS
  }

  var cdate = dateType.toLocaleDateString()
  var fdate = cdate.split("/")
  fdate = fdate[2] + "-" + fdate[0] + "-" + fdate[1]
  var dbDateString = fdate.split("-").reverse().join("-")

  console.log(dbDateString);

  const deleted = await DailyGraphModel.deleteMany({
    dateString: dbDateString,
    pS: pS
  });

  const headObject = new ApiFeatureHead(HeadModel, headVal).match();
  const headCheckList = await headObject.query;

  if (headCheckList.length === 0) {
    return next(new ErrorHandler("could not find check list", 404));
  }

  // unique machne
  let processNosUnique = [];
  let machineData = [];

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

  var totalGraphData = {};

  machineData.map((machine) => {
    var total = 0
    Object.values(machine?.counts).map(val => {
      if (val) {
        total += val
      }
    });
    totalGraphData[machine.line] = {
      total: total,
      totalOK: 0,
      totalNG: 0,
      totalPending: total
    }
  })

  var statusVal = {
    "entryFor": fdate,
    "pS": pS
  }

  const dailyStatusAll = await DailyStatusModel.find(statusVal)
    .populate("checkItem", "line method processNo pS")
    .populate("user", "name");
  if (!dailyStatusAll) {
    return next(new ErrorHandler("No such Daily status check", 404));
  }

  const sortedDailyStatus = sortData(dailyStatusAll);

  sortedDailyStatus.map(dailystat => {
    var totalOK = 0, totalNG = 0;
    dailystat?.processes.map(process => {
      if (process?.result?.OK) {
        totalOK += process.result.OK
      }
      if (process?.result?.NG) {
        totalNG += process.result.NG
      }
    })
    var total = totalGraphData[dailystat.line].total
    totalGraphData[dailystat.line] = {
      total: total,
      totalOK: totalOK,
      totalNG: totalNG,
      totalPending: total - (totalOK + totalNG)
    }
  })

  var dailyGraphData = []
  Object.keys(totalGraphData).map((key) => {
    const data = {
      pS: pS,
      dateString: dbDateString,
      graphFor: dateType,
      line: key,
      ...totalGraphData[key]
    }
    dailyGraphData.push(data)
  })

  const dailyGraph = await DailyGraphModel.insertMany(dailyGraphData);

  if (dailyGraph) {
    res.json({
      dailyGraph: dailyGraph
    })
  }
  else {
    return next(new ErrorHandler("Daily graph not generated ", 500));
  }
}



//unused
// exports.getGraphData = catchAsyncError(async (req, res, next) => {

//   console.log(req.body.startDate);
//   var start = req.body.startDate.split("/")
//   start = start[2] + "-" + start[1] + "-" + start[0]
//   var end = req.body.endDate.split("/")
//   end = end[2] + "-" + end[1] + "-" + end[0]
//   const d1 = new Date(start);
//   const d2 = new Date(end);

//   var dates = getDatesInRange(d1, d2)

//   var totalData = {}

//   dates.map(async (date, i) => {

//     const dateType = new Date(date[1]);

//     const headVal = {
//       "d": dateType.getDate(),
//       "w": Math.floor(dateType.getDate() / 7.1) + 1,
//       "m": dateType.getMonth() + 1,
//       "y": dateType.getFullYear(),
//       "pS": req.body.pS
//     }

//     const headObject = new ApiFeatureHead(HeadModel, headVal).match();
//     const headCheckList = await headObject.query;

//     if (headCheckList.length === 0) {
//       return next(new ErrorHandler("could not find check list", 404));
//     }

//     // unique machne
//     let processNosUnique = [];
//     let machineData = [];
//     // let processCount=[]

//     headCheckList.forEach((item) => {
//       let line = item._id.line;

//       const counts = {};
//       item.processList.forEach((el) => {
//         counts[el] = counts[el] ? (counts[el] += 1) : 1;
//       });

//       item.processList.forEach((e) => {
//         let ind = processNosUnique.indexOf(e);
//         if (ind === -1) {
//           processNosUnique.push(e);
//         }
//       });

//       machineData = [
//         ...machineData,
//         { line, processNos: processNosUnique, counts },
//       ];
//       processNosUnique = [];
//     });

//     //done here
//     var total = 0;
//     machineData = machineData.filter(data => data.line == req.body.line)

//     Object.values(machineData[0]?.counts).forEach(val => {
//       if (val) {
//         total += val
//       }
//     });

//     var statusVal = {
//       "entryFor": date[0],
//       "pS": req.body.pS
//     }

//     const dailyStatusAll = await DailyStatusModel.find(statusVal)
//       .populate("checkItem", "line method processNo pS")
//       .populate("user", "name");
//     if (!dailyStatusAll) {
//       return next(new ErrorHandler("No such Daily status check", 404));
//     }

//     const sortedDailyStatus = sortData(dailyStatusAll);

//     const filteresSortedDailyStatus = sortedDailyStatus.filter(data => data.line == req.body.line)

//     const totalDailyStatus = dailyStatusAll.length;

//     var totalOK = 0;
//     var totalNG = 0;
//     filteresSortedDailyStatus.length && filteresSortedDailyStatus[0]?.processes.map((process) => {
//       if (process?.result?.OK) {
//         totalOK += process.result.OK
//       }
//       if (process?.result?.NG) {
//         totalNG += process.result.NG
//       }
//     })

//     totalData[dateType.getTime()] = {
//       date: date[0],
//       total,
//       totalOK,
//       totalNG,
//     }

//     if (Object.keys(totalData).length == dates.length) {
//       console.log(totalData);

//       res.status(201).json({
//         success: true,
//         totalData: totalData
//       });
//     }

//   })
// })