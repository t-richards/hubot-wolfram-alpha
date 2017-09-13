'use strict'

module.exports = function (data) {
  if (!data.hasOwnProperty('tips')) {
    return ''
  }

  let formattedTips = 'No results!\nTips:\n'

  for (let tip of data.tips) {
    formattedTips += ` - ${tip.text}\n`
  }

  return formattedTips
}
