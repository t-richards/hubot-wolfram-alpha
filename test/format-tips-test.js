'use strict'

/* global describe, beforeEach, afterEach, it */

const chai = require('chai')
const expect = chai.expect
const readFixture = require('./helper/readFixture')

const parseResult = require('../src/parse-result')
const formatTips = require('../src/format-tips')

describe('formatting tips', () => {
  it('prepends the tip text with a helpful message', () => {
    let fixture = readFixture('slkdjfsd')
    let data = parseResult(fixture)
    let tips = formatTips(data)
    let expected = 'No results!\nTips:\n  - Check your spelling, and use English\n'

    expect(tips).to.eql(expected)
  })
})
