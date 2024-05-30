const express = require("express");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const {
  createAbnormality,
  updateAbnormality,
  deleteAbnormality,
  getAbnormality,
  getAbnormalityAll,
  uploadAbnormalityImage,
  getAbnormalityByIdAndDate,
} = require("../controller/abnormalityController");

const abnormalityRouter = express.Router();

// multer for file handling
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(path.join(__dirname, "../public/abnormalityImage")));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
  onError: function (err, next) {
    console.log("error", err);
    next();
  },
});
const upload = multer({ storage: storage });

abnormalityRouter.route("/create").post(createAbnormality);
abnormalityRouter
  .route("/update/:id")
  .put(updateAbnormality)
  .delete(deleteAbnormality);

abnormalityRouter.route("/find/:id").get(getAbnormality);
abnormalityRouter.route("/findByIdAndDate").get(getAbnormalityByIdAndDate);
abnormalityRouter.route("/find/fromDate/:fromDate/toDate/:toDate").get(getAbnormalityAll);
abnormalityRouter.route("/uploadImage").post(upload.single("image"), uploadAbnormalityImage);

module.exports = abnormalityRouter;
