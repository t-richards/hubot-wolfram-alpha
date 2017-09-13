'use strict'

// helpers
const camoUrl = require('camo-url')
const formatImage = (url, camoHost = null, camoKey = null) => {
  if (camoHost === null && camoKey === null) {
    return url
  }

  let opts = {
    host: camoHost,
    key: camoKey,
    type: 'path'
  }
  return camoUrl(opts)(url)
}

// exports
module.exports = (result) => {
  let attachments = []

  for (let pod of result.pods) {
    let attachment = {
      color: '#FF8700',
      title: pod.title
    }
    for (let subpod of pod.subpods) {
      attachment.fallback = subpod.plaintext
      attachment.image_url = formatImage(
        subpod.img.src,
        process.env.CAMO_HOST,
        process.env.CAMO_KEY
      )
    }

    attachments.push(attachment)
  }

  return attachments
}
