"use strict";

const { describe, it } = require("mocha");
const { expect } = require("chai");
const readFixture = require("./helper/readFixture");

const parseResult = require("../src/parse-result");

describe('parseResult', () => {
  it("handles unsuccessful queries", () => {
    let fixture = readFixture("slkdjfsd");

    let result = parseResult(fixture);

    expect(result).to.have.property("success").that.is.a("boolean");
    expect(result.success).to.eql(false);
  });

  it("handles successful queries", () => {
    let fixture = readFixture("earth");

    let result = parseResult(fixture);

    expect(result).to.have.property("success").that.is.a("boolean");
    expect(result.success).to.eql(true);
  });

  it("handles json parsing errors", () => {
    let fixture = "\x00";

    let result = parseResult(fixture);

    expect(result).to.eql(null);
  })
});
