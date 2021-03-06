const axios = require("axios");
/**
 * tests links and
 * resolves with 301 if on redirect file
 * or if axios responds 301
 * and 404 if axios responds 404
 * or 200 if okay
 * @param {string} link
 * @param {string[]} redirectPaths
 * @param {string} siteUrl
 * @returns status of link + link
 */
const testLink = (link, redirectPaths, siteUrl) => {
  return new Promise((resolve, reject) => {
    if (typeof link !== "string") return reject("link must be a string");
    if (
      link.startsWith(siteUrl) &&
      redirectPaths.includes(link.replace(siteUrl, ""))
    ) {
      resolve({ status: 301, link: link });
    } else {
      axios
        .get(link)
        .then((response) => {
          if (response.request._redirectable._redirectCount > 0) {
            resolve({ status: 301, link: link });
          } else {
            resolve({ status: 200, link: link });
          }
        })
        .catch((err) => {
          if(!err.response) return resolve({status: "funky", link}) // sometimes there are weird responses
          if (err.response.status === 404) {
            resolve({ status: 404, link: link });
          } else {
            resolve({
              status: err.response.status,
              link: link,
            });
          }
    
        });
    }
  });
};
exports.testLink = testLink;
