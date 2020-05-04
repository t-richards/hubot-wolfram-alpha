const nock = require("nock");
nock.disableNetConnect();

const process = require("process");

module.exports = async () => {
  // Environment
  process.env.WOLFRAM_ALPHA_APPID = "test";
};
