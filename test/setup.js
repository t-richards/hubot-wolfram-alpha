const nock = require("nock");
const process = require("process");

module.exports = () => {
  process.env.WOLFRAM_ALPHA_APPID = "test";
  nock.disableNetConnect();
};
