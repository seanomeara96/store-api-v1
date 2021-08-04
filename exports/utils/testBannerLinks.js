const { testBannerLink } = require("./testBannerLink");
/**
 *
 * @param {string[]} linksArray
 * @param {*} bannerId
 * @returns
 */
const testBannerLinks = (linksArray, bannerId, redirectPaths) => {
  return new Promise((resolve, reject) => {
    if (!linksArray.length) return reject("no links");
    let promiseArray = linksArray.map(
      (link) => () => testBannerLink(link, redirectPaths)
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
            if (response.status === 301) {
              testedBannerLinks["301 URLs"].push(response.link);
            } else if (response.status === 404) {
              testedBannerLinks["404 URLs"].push(response.link);
            } else {
              return;
            }
          });
          resolve(testedBannerLinks);
        }
      });
    }, Promise.resolve());
  });
};

exports.testedBannerLinks = testBannerLinks;
