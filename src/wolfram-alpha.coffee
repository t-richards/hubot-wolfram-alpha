# Description:
#   Allows hubot to display Wolfram Alpha results.
#
# Commands:
#   hubot wolfram <query> - Displays Wolfram Alpha results for <query>
#   hubot wfa <query> - Displays Wolfram Alpha results for <query>
#
# Configuration:
#   WOLFRAM_ALPHA_APPID - The API key for your Wolfram Alpha application
#
# Author:
#   Tom Richards <tom@tomrichards.net>
#

# libs
xml2js = require('xml2js')

# helpers
format_attachments = (result) ->
  attachments = []

  for pod in result.queryresult.pod
    attachment =
      color: '#FF8700'
      title: pod.$.title
    for subpod, index in pod.subpod
      if index > 1
        delete attachment.title
      attachment.fallback = subpod.plaintext[0]
      attachment.image_url = subpod.img[0].$.src

    attachments.push(attachment)

  attachments

fetch_wolfram_results = (robot, res) ->
  # Rich slack-formatted response object
  response =
    attachments: []

  # HTTP query options
  options =
    query:
      input: res.match[2]
      appid: process.env.WOLFRAM_ALPHA_APPID
  robot.http('https://api.wolframalpha.com/v2/query', options)
    .get() (err, _res, body) ->
      parser = new (xml2js.Parser)
      parser.parseString body, (err, result) ->
        response.attachments = format_attachments(result)
        res.send response

# module
module.exports = (robot) ->
  robot.respond /(wolfram|wfa) (.*)/i, (res) ->
    fetch_wolfram_results(robot, res)
