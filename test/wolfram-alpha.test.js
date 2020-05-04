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
  });

  // TODO(tom): Move these "respond to" tests
  it("responds to wolfram", (done) => {
    const scope = nock("https://api.wolframalpha.com/")
      .get("/v2/query")
      .query(true)
      .reply(200);

    robot.adapter.on("send", function (_envelope, _strings) {
      expect(scope.isDone()).toBe(true);
      done();
    });

    robot.adapter.receive(new TextMessage(user, "hubot wolfram foo"));
  });

  it("responds to wfa", (done) => {
    const scope = nock("https://api.wolframalpha.com/")
      .get("/v2/query")
      .query(true)
      .reply(200);

    robot.adapter.on("send", function (_envelope, _strings) {
      expect(scope.isDone()).toBe(true);
      done();
    });

    robot.adapter.receive(new TextMessage(user, "hubot wfa bar"));
  });

  describe("with a valid API response", () => {
    it("responds with a list of attachments", (done) => {
      const scope = nock("https://api.wolframalpha.com/")
        .get("/v2/query")
        .query({
          format: "image,plaintext",
          output: "JSON",
          input: "earth",
          appid: "test",
        })
        .reply(200, readFixture("earth"));

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

  describe("with an error response from the API", () => {
    it("responds with a list of attachments", (done) => {
      const scope = nock("https://api.wolframalpha.com/")
        .get("/v2/query")
        .query({
          format: "image,plaintext",
          output: "JSON",
          input: "earth",
          appid: "test",
        })
        .reply(500, {
          queryresult: {
            success: false,
            error: { code: 123, msg: "some error" },
          },
        });

      robot.adapter.on("send", function (_envelope, strings) {
        const answer = strings[0];

        expect(answer).toEqual("Error code 123: some error");
        expect(scope.isDone()).toBe(true);
        done();
      });

      robot.adapter.receive(new TextMessage(user, "hubot wfa earth"));
    });
  });

  describe("with an invalid API response", () => {
    it("informs the user of the problem", (done) => {
      const scope = nock("https://api.wolframalpha.com/")
        .get("/v2/query")
        .query({
          format: "image,plaintext",
          output: "JSON",
          input: "earth",
          appid: "test",
        })
        .reply(200, "\x00");

      robot.adapter.on("send", function (_envelope, strings) {
        const answer = strings[0];

        expect(answer).toMatch(/was not valid/);
        expect(scope.isDone()).toBe(true);
        done();
      });

      robot.adapter.receive(new TextMessage(user, "hubot wfa earth"));
    });
  });

  describe("when the HTTP client returns an error", () => {
    it("informs the user of the problem", (done) => {
      const scope = nock("https://api.wolframalpha.com/")
        .get("/v2/query")
        .query({
          format: "image,plaintext",
          output: "JSON",
          input: "earth",
          appid: "test",
        })
        .replyWithError("node http client error");

      robot.adapter.on("send", function (_envelope, strings) {
        const answer = strings[0];

        expect(answer).toMatch(/node http client error/);
        expect(scope.isDone()).toBe(true);
        done();
      });

      robot.adapter.receive(new TextMessage(user, "hubot wfa earth"));
    });
  });

  describe("when there are no results", () => {
    it("informs the user that the query returned no results", (done) => {
      const scope = nock("https://api.wolframalpha.com/")
        .get("/v2/query")
        .query({
          format: "image,plaintext",
          output: "JSON",
          input: "slkdjfsd",
          appid: "test",
        })
        .reply(200, readFixture("slkdjfsd"));

      robot.adapter.on("send", function (_envelope, strings) {
        const answer = strings[0];

        expect(answer).toMatch(/^No results/);
        expect(scope.isDone()).toBe(true);
        done();
      });

      robot.adapter.receive(new TextMessage(user, "hubot wfa slkdjfsd"));
    });
  });
});
