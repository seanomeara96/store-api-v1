const { testLink } = require("./testLink");
/**
 * tests a banner's links and reolves with an object containing banner id, 301 array & 404 array
 * @param {string[]} linksArray
 * @param {*} bannerId
 * @returns
 */
const testBannerLinks = (linksArray, bannerId, redirectPaths, siteUrl) => {
  return new Promise((resolve, reject) => {
    if (!linksArray.length) return reject("no links");
    let promiseArray = linksArray.map(
      (link) => () => testLink(link, redirectPaths, siteUrl)
    );
    let responses = [];
    promiseArray.reduce((acc, cur, i) => {
      return acc.then(cur).then((res) => {
        responses.push(res);
        if (i === promiseArray.length - 1) {
          let testedBannerLinks = {
            "Banner Id": bannerId,
            "301 URLs": [],
            "404 URLs": [],
          };
          responses.forEach((response) => {
            console.log(response.status);
            if (response.status === 301) {
              testedBannerLinks["301 URLs"].push(response.link);
            } else if (response.status === 404) {
              testedBannerLinks["404 URLs"].push(response.link);
            } else {
              if (response.status !== 200) {
                console.log(
                  `banner id ${bannerId} has other error (${response.status}) link: ${response.link}`
                );
              }
            }
          });
          resolve(testedBannerLinks);
        }
      });
    }, Promise.resolve());
  });
};

exports.testBannerLinks = testBannerLinks;
