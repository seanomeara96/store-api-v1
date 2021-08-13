const { testBannerLinks } = require("./testBannerLinks");
/**
 *
 * @param {*} bannersArray
 * @param {*} redirectPaths
 * @param {*} siteUrl
 * @returns
 */
const testBanners = (bannersArray, redirectPaths, siteUrl) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    bannersArray.forEach((banner) => {
      promises.push(
        testBannerLinks(banner.links, banner.id, redirectPaths, siteUrl)
      );
    });
    Promise.allSettled(promises)
      .then((responses) => {
        let liveLinks = [];
        responses.forEach((response) => {
          if (response.status === "fulfilled") {
            liveLinks.push(response.value);
          }
        });
        resolve(liveLinks);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.testBanners = testBanners;
