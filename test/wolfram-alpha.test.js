"use strict";

const path = require("path");
const nock = require("nock");
const { Robot, TextMessage } = require("hubot");

const readFixture = require("./helper/readFixture");

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
    nock.cleanAll();
  });

  it("responds to wolfram", (done) => {
    robot.adapter.on("send", function (_envelope, strings) {
      const answer = strings[0];

      expect(answer).to.eql("answering foo");
      done();
    });

    robot.adapter.receive(new TextMessage(user, "hubot wolfram foo"));
  });

  it("responds to wfa", (done) => {
    robot.adapter.on("send", function (_envelope, strings) {
      const answer = strings[0];

      expect(answer).to.eql("answering bar");
      done();
    });

    robot.adapter.receive(new TextMessage(user, "hubot wfa bar"));
  });

  describe("with a valid API response", () => {
    const scope = nock("https://api.wolframalpha.com/")
      .get("/v2/query")
      .query({
        input: "earth",
      })
      .reply(200, readFixture("earth"));

    it("calls the API", (done) => {
      robot.adapter.on("send", function (_envelope, strings) {
        const answer = strings[0];

        expect(answer).to.eql("answering earth");
        expect(scope.isDone()).toBe(true);
        done();
      });

      robot.adapter.receive(new TextMessage(user, "hubot wfa earth"));
    });
  });
});
