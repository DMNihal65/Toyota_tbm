const catchAsyncError = require("../middleware/catchAsyncError");
const CardRaisedModel = require("../mongoSchema/cardRaisedModel");
const ApiFeatureCard = require("../util/apiFeatureCard");
const ErrorHandler = require("../util/errorHandling");
const HeadModel = require("../mongoSchema/chekItemModel");

exports.createCard = catchAsyncError(async (req, res, next) => {
  const {
    cardType,
    abnormality,
    checkItem,
    user,
    line,
    processNo,
    status,
    image,
    pS,
  } = req.body;
  const card = await CardRaisedModel.create({
    cardType,
    abnormality,
    checkItem,
    user,
    line,
    processNo,
    status,
    image,
    pS,
  });
  res.status(200).json({ success: true, card });
});

exports.updateCard = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const card = await CardRaisedModel.findById(id);
  if (!card) {
    return next(new ErrorHandler("cannot find this card", 404));
  }

  const {
    cardType,
    abnormality,
    status,
    checkItem,
    user,
    line,
    processNo,
    image,
  } = req.body;
  card.cardType = cardType;
  (card.abnormality = abnormality), (card.status = status);
  card.user = user;
  card.checkItem = checkItem;
  card.line = line;
  card.processNo = processNo;
  card.image = image;

  await card.save({ validateBeforeSave: false });
  res.status(201).json({ success: true, card });
});

exports.deleteCard = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const card = await CardRaisedModel.findById(id);
  if (!card) {
    return next(new ErrorHandler("cannot find this card", 404));
  }

  await card.remove();
  res.status(201).json({ success: true, message: "deleted Card successfully" });
});

exports.getCardAll = catchAsyncError(async (req, res, next) => {
  const fromDate = req.params.fromDate;
  var toDate = req.params.toDate;

  var queryStr = req.query;
  var createdAt = { $gte: fromDate, $lt: toDate };

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

  const cardFeature = new ApiFeatureCard(
    CardRaisedModel.find(),
    queryStr,
    createdAt,
    checkItemArray
  ).filter();

  //test comp
  const cards = await cardFeature.query.find({});

  if (cards.length === 0) {
    return next(new ErrorHandler("Cards not found", 404));
  }
  const totalCards = cards.length;
  res.status(201).json({ success: true, totalCards, cards });
});

exports.getCard = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const card = await CardRaisedModel.findById(id)
    .populate("checkItem", "line workDetail processNo")
    .populate("user", "name");

  if (!card) {
    return next(new ErrorHandler("cannot find this card", 404));
  }

  res.status(201).json({ success: true, card });
});
