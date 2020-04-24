"use strict";

const formatTitle = (pod_title, subpod_title) => {
  if (subpod_title !== "") {
    return `${pod_title} | ${subpod_title}`;
  }

  return pod_title;
};

module.exports = (result) => {
  let attachments = [];

  for (let pod of result.pods) {
    for (let subpod of pod.subpods) {
      attachments.push({
        color: "#FF8700",
        title: formatTitle(pod.title, subpod.title),
        fallback: subpod.plaintext,
        image_url: subpod.img.src,
      });
    }
  }

  return attachments;
};
