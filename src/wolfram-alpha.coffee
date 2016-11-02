# Description:
#   Allows hubot to display Wolfram Alpha results.
#
# Commands:
#   hubot wolfram <query> - Displays Wolfram Alpha results for <query>
#   hubot wfa <query> - Displays Wolfram Alpha results for <query>
#
# Configuration:
#   WOLFRAM_ALPHA_APPID - The API key for your Wolfram Alpha application
#   CAMO_KEY - (Optional) The shared secret key for a Camo proxy
#   CAMO_HOST - (Optional) The hostname for a Camo proxy
#
# Author:
#   Tom Richards <tom@tomrichards.net>
#

# libs
xml2js = require('xml2js')

# helpers
format_image = (url) ->
  return url unless process.env.CAMO_KEY

  camoUrl = require('camo-url')({
    host: process.env.CAMO_HOST,
    key: process.env.CAMO_KEY,
    type: 'path'
  })
  camoUrl(url)

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
      attachment.image_url = format_image(subpod.img[0].$.src)

    attachments.push(attachment)

  attachments

format_tips = (result) ->
  return '' unless result.queryresult?.tips?
  tip_count = parseInt(result.queryresult.tips[0].$.count, 10)
  if isNaN(tip_count) || tip_count < 1
    return ''

  "\nTips:\n" + (" - #{item.tip[0].$.text}" for item in result.queryresult.tips)

fetch_wolfram_results = (robot, res) ->
  # Rich slack-formatted response object
  response =
    attachments: [],
    username: robot.name

  # HTTP query options
  options =
    query:
      input: res.match[2]
      appid: process.env.WOLFRAM_ALPHA_APPID
  robot.http('https://api.wolframalpha.com/v2/query', options)
    .get() (err, _res, body) ->
      parser = new xml2js.Parser
      parser.parseString body, (err, result) ->
        # No results?
        if result.queryresult.$.success == 'false'
          resp = 'No results!'
          resp += format_tips(result)
          return res.send(resp)

        # Send all results
        response.attachments = format_attachments(result)
        res.send response

# module
module.exports = (robot) ->
  robot.respond /(wolfram|wfa) (.*)/i, (res) ->
    fetch_wolfram_results(robot, res)
