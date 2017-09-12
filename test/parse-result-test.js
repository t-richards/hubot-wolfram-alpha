'use strict'

/* global describe, beforeEach, afterEach, it */

const chai = require('chai')
const expect = chai.expect
const readFixture = require('./helper/readFixture')

const parseResult = require('../src/parse-result')
const generateAttachments = require('../src/generate-attachments')

describe('determining query success', () => {
  it('handles unsuccessful queries', () => {
    let fixture = readFixture('slkdjfsd')
    let data = parseResult(fixture)

    expect(data).to.have.property('success').that.is.a('boolean')
    expect(data.success).to.eql(false)
  })

  it('handles successful queries', () => {
    let fixture = readFixture('earth')
    let data = parseResult(fixture)

    expect(data).to.have.property('success').that.is.a('boolean')
    expect(data.success).to.eql(true)
  })
})
