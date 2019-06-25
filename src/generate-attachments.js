"use strict";

// exports
module.exports = result => {
  let attachments = [];

  for (let pod of result.pods) {
    for (let subpod of pod.subpods) {
      let attachment = {
        color: "#FF8700",
        title: pod.title
      };
      attachment.fallback = subpod.plaintext;
      attachment.image_url = subpod.img.src;
      attachments.push(attachment);
    }
  }

  return attachments;
};
