'use strict'

// Description:
//   Allows hubot to display Wolfram Alpha results.
//
// Commands:
//   hubot wolfram <query> - Displays Wolfram Alpha results for <query>
//   hubot wfa <query> - Displays Wolfram Alpha results for <query>
//
// Configuration:
//   WOLFRAM_ALPHA_APPID - The API key for your Wolfram Alpha application
//   CAMO_KEY - (Optional) The shared secret key for a Camo proxy
//   CAMO_HOST - (Optional) The hostname for a Camo proxy
//
// Author:
//   Tom Richards <tom@tomrichards.net>
//

const fetchWolframResults = require('./fetch-wolfram-results')

// module
module.exports = (robot) => {
  return robot.respond(/(wolfram|wfa) (.*)/i, res => fetchWolframResults(robot, res))
}
