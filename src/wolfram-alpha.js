"use strict";

// Description:
//   Allows hubot to display Wolfram Alpha results.
//
// Commands:
//   hubot wolfram <query> - Displays Wolfram Alpha results for <query>
//   hubot wfa <query> - Displays Wolfram Alpha results for <query>
//
// Configuration:
//   WOLFRAM_ALPHA_APPID - The API key for your Wolfram Alpha application
//
// Author:
//   Tom Richards <tom@tomrichards.net>
//

const fetchWolframResults = require("./fetch-wolfram-results");

// module
module.exports = (robot) => {
  return robot.respond(/(wolfram|wfa) (.*)/i, (res) =>
    fetchWolframResults(robot, res)
  );
};
