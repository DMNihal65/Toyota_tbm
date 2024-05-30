const ErrorHandler = require("../util/errorHandling");

module.exports = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;


  //cast error handler
  if (err.name === "CastError") {
    const message = `resource not found , invalid path: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  
  if (err.name === "ReferenceError") {    
      console.log(`Error : ${err.message}`);     
       };
  




  res.status(err.statusCode).json({ success: false, message: err.message });
};
