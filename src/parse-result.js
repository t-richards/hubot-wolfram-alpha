"use strict";

module.exports = (rawData) => {
  try {
    return JSON.parse(rawData).queryresult;
  } catch (e) {
    return null;
  }
};
