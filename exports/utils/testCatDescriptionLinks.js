const { testLink } = require("./testLink");
/**
 * tests a banner's links and reolves with an object containing cat id, 301 array & 404 array
 * @param {string[]} linksArray
 * @param {number} catId
 * @param {string[]} redirectpaths
 * @param {string} siteUrl
 * @returns
 */
const testCatDescriptionLinks = (linksArray, catId, redirectPaths, siteUrl) => {
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
          let testedLinks = {
            catId,
            "301 URLs": [],
            "404 URLs": [],
          };
          responses.forEach((response) => {
            if (response.status === 301) {
              testedLinks["301 URLs"].push(response.link);
            } else if (response.status === 404) {
              testedLinks["404 URLs"].push(response.link);
            } else {
              return;
            }
          });
          resolve(testedLinks);
        }
      });
    }, Promise.resolve());
  });
};

exports.testCatDescriptionLinks = testCatDescriptionLinks;
