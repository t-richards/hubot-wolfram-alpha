"use strict";

// exports
module.exports = result => {
  let attachments = [];

  for (let pod of result.pods) {
    let attachment = {
      color: "#FF8700",
      title: pod.title
    };
    for (let subpod of pod.subpods) {
      attachment.fallback = subpod.plaintext;
      attachment.image_url = subpod.img.src;
    }

    attachments.push(attachment);
  }

  return attachments;
};
