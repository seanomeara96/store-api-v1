const axios = require("axios");
/**
 *
 * @param {string} link
 * @returns status of link + link
 */
const testBannerLink = (link, redirectPaths, siteUrl) => {
  return new Promise((resolve, reject) => {
    if (typeof link !== "string") return reject("link must be a string");
    if (
      link.startsWith(siteUrl) &&
      redirectPaths.includes(link.replace(siteUrl, ""))
    ) {
      console.log(301, link, "on redirect file");
      resolve({ status: 301, link: link });
    } else {
      axios
        .get(link)
        .then((response) => {
          if (response.request._redirectable._redirectCount > 0) {
            console.log(301, link, "not on redirect file");
            resolve({ status: 301, link: link });
          } else {
            resolve({ status: 200, link: link });
            console.log(200, link, "link okay");
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            console.log(404, link, "error");
            resolve({ status: 404, link: link });
          } else {
            console.log(err);
            reject({
              status: err.response.status,
              errMessage: "something went wrong while testing a link",
            });
          }
        });
    }
  });
};
exports.testBannerLink = testBannerLink;
