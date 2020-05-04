"use strict";

const readFixture = require("./helper/readFixture");

const parseResult = require("../src/parse-result");

describe("parseResult", () => {
  it("handles unsuccessful queries", () => {
    let fixture = readFixture("slkdjfsd");

    let result = parseResult(fixture);

    expect(result).toBeInstanceOf(Object);
    expect(result.success).toBe(false);
  });

  it("handles successful queries", () => {
    let fixture = readFixture("earth");

    let result = parseResult(fixture);

    expect(result).toBeInstanceOf(Object);
    expect(result.success).toBe(true);
  });

  it("handles json parsing errors", () => {
    let fixture = "\x00";

    let result = parseResult(fixture);

    expect(result).toBe(null);
  });
});
