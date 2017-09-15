'use strict'

const generateAttachments = require('./generate-attachments')
const parseResult = require('./parse-result')

module.exports = (robot, res) => {
  // Rich slack-formatted response object
  let response = {
    attachments: [],
    username: robot.name
  }

  // HTTP query options
  let options = {
    query: {
      format: 'image,plaintext',
      output: 'JSON',
      input: res.match[2],
      appid: process.env.WOLFRAM_ALPHA_APPID
    }
  }

  if (process.env.NODE_ENV === 'test') {
    res.send(`answering ${res.match[2]}`)
    return
  }

  return robot
    .http('https://api.wolframalpha.com/v2/query', options)
    .get()(function (err, _response, body) {
      if (err) {
        res.send(`An error occurred: ${err}`)
        return
      }

      let data = parseResult(body)
      if (data === null) {
        res.send('Response data was not valid.')
        return
      }

      if (data.hasOwnProperty('error')) {
        res.send(`Error code ${data.error.code}: ${data.error.msg}`)
        return
      }

      if (data.hasOwnProperty('tips')) {
        res.send(`No results!\nTips:\n  - ${data.tips.text}\n`)
        return
      }

      // Send all results
      response.attachments = generateAttachments(data)
      res.send(response)
    })
}
