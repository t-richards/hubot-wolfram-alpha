'use strict'

/* global describe, beforeEach, afterEach, it */

const chai = require('chai')
const expect = chai.expect
const readFixture = require('./helper/readFixture')

const parseResult = require('../src/parse-result')
const generateAttachments = require('../src/generate-attachments')

describe('generating slack attachments', () => {
  it('does something', () => {
    let fixture = readFixture('earth')
    let data = parseResult(fixture)
    let attachments = generateAttachments(data)

    console.log(attachments)
  })
})
