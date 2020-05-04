"use strict";

const path = require("path");
const fs = require("fs");

module.exports = (fixtureName) => {
  let fixturePath = `../fixture/${fixtureName}.json`;
  let resolvedPath = path.resolve(__dirname, fixturePath);
  return fs.readFileSync(resolvedPath);
};
