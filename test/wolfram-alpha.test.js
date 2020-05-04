"use strict";

const path = require("path");

const Hubot = require("hubot");

const Robot = Hubot.Robot;
const TextMessage = Hubot.TextMessage;

describe('require("wolfram-alpha")', () => {
  it("exports a function", () => {
    expect(require("../index")).toBeInstanceOf(Function);
  });
});

describe("wolfram-alpha hubot script", () => {
  let robot, user;

  beforeEach(() => {
    robot = new Robot(null, "mock-adapter", false, "hubot");
    robot.loadFile(path.resolve("src/"), "wolfram-alpha.js");
    robot.adapter.on("connected", () => {
      robot.brain.userForId("1", {
        name: "john",
        real_name: "John Doe",
        room: "#test",
      });
    });
    robot.run();
    user = robot.brain.userForName("john");
  });

  afterEach(() => {
    robot.shutdown();
  });

  it("responds to wolfram", () => {
    robot.adapter.on("send", function (_envelope, strings) {
      const answer = strings[0];

      expect(answer).to.eql("answering foo");
    });

    robot.adapter.receive(new TextMessage(user, "hubot wolfram foo"));
  });

  it("responds to wfa", () => {
    robot.adapter.on("send", function (_envelope, strings) {
      const answer = strings[0];

      expect(answer).to.eql("answering bar");
    });

    robot.adapter.receive(new TextMessage(user, "hubot wfa bar"));
  });
});
