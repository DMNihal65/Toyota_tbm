const express = require("express");

const {
  getHeadCheckList,
  getHeadMachineList,
  uploadImage,
  getAllMachineList,
  getUploadImage,
  saveData,
  insertData,
  deleteCheckItem,
  getHeadMachineById,
} = require("../controller/headCheckListController");
const headRouter = express.Router();

// multer for file handling
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(path.join(__dirname, "../public/images")));
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

//routes
headRouter.route("/headCheckList").get(getHeadCheckList);
headRouter.route("/headMachineList").get(getHeadMachineList);
headRouter.route("/allMachineList").get(getAllMachineList);
headRouter.route("/machine/:id").get(getHeadMachineById);
headRouter.route("/uploadImage").post(upload.single("image"), uploadImage);
headRouter.route("/saveData").post(upload.none(), saveData);
headRouter.route("/insertData").post(upload.none(), insertData);
headRouter.route("/delete/:id").delete(deleteCheckItem)

module.exports = headRouter;
