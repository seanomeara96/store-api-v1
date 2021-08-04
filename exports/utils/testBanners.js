const { testBannerLinks } = require("./testBannerLinks");
/**
 *
 * @param {string} bannersArray
 * @returns
 */
const testBanners = (bannersArray) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    bannersArray.forEach((banner) => {
      promises.push(testBannerLinks(banner.links, banner.id));
    });
    Promise.allSettled(promises)
      .then((responses) => {
        let liveBrandLinks = [];
        responses.forEach((response) => {
          if (response.status === "fulfilled") {
            console.log("test banner links finished", response.value);
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
