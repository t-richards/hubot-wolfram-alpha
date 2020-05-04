const nock = require("nock");

module.exports = () => {
  nock.disableNetConnect();
};
