const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({path:__dirname + '/.env'});

axios
  .get(`http://${process.env.host}:${process.env.port}/pendingTasks/generate`)
  .then(() => {
    console.log("pending card generated");
  })
  .catch((err) => {
    console.log(err);
  });

//to generate dailystatus graph data for yesterday for production
axios
  .get(`http://${process.env.host}:${process.env.port}/dailyStatus/generateDailyGraph??pS=S`)
  .then(() => {
    console.log("production dailystatus graph generated");
  })
  .catch((err) => {
    console.log(err);
  });

//to generate dailystatus graph data for yesterday for maintenance
axios
  .get(`http://${process.env.host}:${process.env.port}/dailyStatus/generateDailyGraph??pS=P`)
  .then(() => {
    console.log("maintenance dailystatus graph generated");
  })
  .catch((err) => {
    console.log(err);
  });