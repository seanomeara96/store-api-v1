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
        let liveBrandLinks = [];
        responses.forEach((response) => {
          if (response.status === "fulfilled") {
            
            liveBrandLinks.push(response.value);
          }
        });
        resolve(liveBrandLinks);
      })
      .catch((err) => {
        console.log("error in test banners", err);
        reject(err);
      });
  });
};

exports.testBanners = testBanners;
