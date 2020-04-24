"use strict";

const { describe, it } = require("mocha");
const { expect } = require("chai");
const readFixture = require("./helper/readFixture");

const parseResult = require("../src/parse-result");
const generateAttachments = require("../src/generate-attachments");

describe("producing slack-formatted attachments", () => {
  it("generates a list of attachments", () => {
    let fixture = readFixture("codices-replace-scrolls");
    let data = parseResult(fixture);
    let attachments = generateAttachments(data);
    let expected = [
      {
        color: "#FF8700",
        title: "Input interpretation",
        fallback: "codices replace scrolls",
        image_url:
          "http://www4b.wolframalpha.com/Calculate/MSP/MSP103081aee4c1gcic6a0df00000idifhi1g6gh1b42?MSPStoreType=image/gif&s=12",
      },
      {
        color: "#FF8700",
        title: "Basic information",
        fallback: "date | ~~ 340 AD\ncountry involved | Roman Empire",
        image_url:
          "http://www4b.wolframalpha.com/Calculate/MSP/MSP103091aee4c1gcic6a0df0000650fbefe4621i1hc?MSPStoreType=image/gif&s=12",
      },
      {
        color: "#FF8700",
        title: "Timeline",
        fallback: "",
        image_url:
          "http://www4b.wolframalpha.com/Calculate/MSP/MSP103101aee4c1gcic6a0df00005fh7aefci394e3he?MSPStoreType=image/gif&s=12",
      },
    ];

    expect(attachments).to.deep.eql(expected);
  });

  it("generates attachments with multiple subpods", () => {
    let fixture = readFixture("earth");
    let data = parseResult(fixture);
    let attachments = generateAttachments(data);
    let expected = [
      {
        color: "#FF8700",
        fallback: "Earth  (planet)",
        image_url:
          "https://www5b.wolframalpha.com/Calculate/MSP/MSP10681he70c78c3186ic200001e1ai4eh5275h226?MSPStoreType=image/gif&s=14",
        title: "Input interpretation",
      },
      {
        color: "#FF8700",
        fallback:
          "current distance from Sun | 1.006 au\n8.369 light minutes\nlargest distance from orbit center | 94.50913 million mi\n1.01671033 au\nnearest distance from orbit center | 91.402505 million mi\n0.98328989 au\norbital period | 365.25636 days",
        image_url:
          "https://www5b.wolframalpha.com/Calculate/MSP/MSP10691he70c78c3186ic2000041h6ee59h94a1750?MSPStoreType=image/gif&s=14",
        title: "Orbital properties",
      },
      {
        color: "#FF8700",
        fallback:
          "equatorial radius | 3963.2 mi\nmass | 5.9721986×10^24 kg\nrotation period | 23.934472 h  (sidereal)\nnumber of moons | 1\nage | 4.54 billion yr",
        image_url:
          "https://www5b.wolframalpha.com/Calculate/MSP/MSP10711he70c78c3186ic2000047h9b99dfi9bdh42?MSPStoreType=image/gif&s=14",
        title: "Physical properties",
      },
      {
        color: "#FF8700",
        fallback: "(+)",
        image_url:
          "https://www5b.wolframalpha.com/Calculate/MSP/MSP10731he70c78c3186ic2000067e89f9iebd80hc3?MSPStoreType=image/gif&s=14",
        title: "Symbol",
      },
      {
        color: "#FF8700",
        fallback:
          "atmospheric pressure | 1.01325 bars  (at surface)\nminimum temperature | -128 °F  (at surface)\naverage temperature | 57.2 °F  (at surface)\nmaximum temperature | 136 °F  (at surface)",
        image_url:
          "https://www5b.wolframalpha.com/Calculate/MSP/MSP10741he70c78c3186ic200001adf699b2d8h9ca5?MSPStoreType=image/gif&s=14",
        title: "Atmosphere",
      },
      {
        color: "#FF8700",
        fallback:
          "nitrogen  (N_2) | 78.084%\noxygen  (O_2) | 20.948%\nwater  (H_2O) | 1%",
        image_url:
          "https://www5b.wolframalpha.com/Calculate/MSP/MSP10751he70c78c3186ic200001g811171f7hdd3f7?MSPStoreType=image/gif&s=14",
        title: "Atmosphere | Major constituents",
      },
      {
        color: "#FF8700",
        fallback:
          "(components may not add up to 100% due to uncertainty, variability, and round-off)",
        image_url:
          "https://www5b.wolframalpha.com/Calculate/MSP/MSP10761he70c78c3186ic200002397ffgd475eda69?MSPStoreType=image/gif&s=14",
        title: "Atmosphere",
      },
      {
        color: "#FF8700",
        fallback: "",
        image_url:
          "https://www5b.wolframalpha.com/Calculate/MSP/MSP10771he70c78c3186ic2000062ded4dg39bha4ag?MSPStoreType=image/gif&s=14",
        title: "Current solar system configuration",
      },
      {
        color: "#FF8700",
        fallback: "",
        image_url:
          "https://www5b.wolframalpha.com/Calculate/MSP/MSP10781he70c78c3186ic200004gfaf8c0hef1426i?MSPStoreType=image/gif&s=14",
        title: "Image",
      },
    ];

    expect(attachments).to.deep.eql(expected);
  });
});
