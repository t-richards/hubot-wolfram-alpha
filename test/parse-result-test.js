"use strict";

const { describe, it } = require("mocha");
const { expect } = require("chai");
const readFixture = require("./helper/readFixture");

const parseResult = require("../src/parse-result");

describe("determining query success", () => {
  it("handles unsuccessful queries", () => {
    let fixture = readFixture("slkdjfsd");
    let data = parseResult(fixture);

    expect(data).to.have.property("success").that.is.a("boolean");
    expect(data.success).to.eql(false);
  });

  it("handles successful queries", () => {
    let fixture = readFixture("earth");
    let data = parseResult(fixture);

    expect(data).to.have.property("success").that.is.a("boolean");
    expect(data.success).to.eql(true);
  });
});
