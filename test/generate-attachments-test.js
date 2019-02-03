"use strict";

/* global describe, beforeEach, afterEach, it */

const chai = require("chai");
const expect = chai.expect;
const readFixture = require("./helper/readFixture");

const parseResult = require("../src/parse-result");
const generateAttachments = require("../src/generate-attachments");

describe("producing slack-formatted attachments", () => {
  it("generates a proper list of attachments", () => {
    let fixture = readFixture("codices-replace-scrolls");
    let data = parseResult(fixture);
    let attachments = generateAttachments(data);
    let expected = [
      {
        color: "#FF8700",
        title: "Input interpretation",
        fallback: "codices replace scrolls",
        image_url:
          "http://www4b.wolframalpha.com/Calculate/MSP/MSP103081aee4c1gcic6a0df00000idifhi1g6gh1b42?MSPStoreType=image/gif&s=12"
      },
      {
        color: "#FF8700",
        title: "Basic information",
        fallback: "date | ~~ 340 AD\ncountry involved | Roman Empire",
        image_url:
          "http://www4b.wolframalpha.com/Calculate/MSP/MSP103091aee4c1gcic6a0df0000650fbefe4621i1hc?MSPStoreType=image/gif&s=12"
      },
      {
        color: "#FF8700",
        title: "Timeline",
        fallback: "",
        image_url:
          "http://www4b.wolframalpha.com/Calculate/MSP/MSP103101aee4c1gcic6a0df00005fh7aefci394e3he?MSPStoreType=image/gif&s=12"
      }
    ];

    expect(attachments).to.deep.eql(expected);
  });
});
