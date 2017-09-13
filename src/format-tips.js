'use strict'

module.exports = function (data) {
  if (!data.hasOwnProperty('tips')) {
    return ''
  }

  return `No results!\nTips:\n  - ${data.tips.text}\n`
}
