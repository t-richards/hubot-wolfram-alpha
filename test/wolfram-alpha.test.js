"use strict";

const { Robot, TextMessage } = require("hubot");
const nock = require("nock");

const readFixture = require("./helper/readFixture");
const wolframAlpha = require("../src/wolfram-alpha");

describe('require("wolfram-alpha")', () => {
  it("exports a function", () => {
    expect(require("../index")).toBeInstanceOf(Function);
  });
});

describe("wolfram-alpha hubot script", () => {
  let robot, user;

  beforeEach(() => {
    robot = new Robot(null, "mock-adapter", false, "hubot");
    wolframAlpha(robot);
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

  it.skip("responds to wolfram", (done) => {
    robot.adapter.on("send", function (_envelope, strings) {
      const answer = strings[0];

      expect(answer).toEqual("answering foo");
      done();
    });

    robot.adapter.receive(new TextMessage(user, "hubot wolfram foo"));
  });

  it.skip("responds to wfa", (done) => {
    robot.adapter.on("send", function (_envelope, strings) {
      const answer = strings[0];

      expect(answer).toEqual("answering bar");
      done();
    });

    robot.adapter.receive(new TextMessage(user, "hubot wfa bar"));
  });

  describe("with a valid API response", () => {
    const scope = nock("https://api.wolframalpha.com/")
      .get("/v2/query")
      .query({
        format: "image,plaintext",
        output: "JSON",
        input: "earth",
        appid: "test",
      })
      .reply(200, readFixture("earth"));

    it("calls the Wolfram Alpha API", (done) => {
      robot.adapter.on("send", function (_envelope, strings) {
        const answer = strings[0];

        expect(answer).toBeInstanceOf(Object);
        expect(answer.attachments).toBeInstanceOf(Array);
        expect(scope.isDone()).toBe(true);
        done();
      });

      robot.adapter.receive(new TextMessage(user, "hubot wfa earth"));
    });
  });
});
