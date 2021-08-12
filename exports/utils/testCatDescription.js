const { testCatDescriptionLinks } = require("./testCatDescriptionLinks");
/**
 *
 * @param {*} cat
 * @param {*} redirectPaths
 * @param {*} siteUrl
 */
const testCatDescription = (cat, redirectPaths, siteUrl) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    promises.push(
      testCatDescriptionLinks(
        cat.Description_links,
        cat.ID,
        redirectPaths,
        siteUrl
      )
    );
    Promise.allSettled(promises)
      .then((responses) => {
        let liveCatLinks = [];
        responses.forEach((response) => {
          if (response.status === "fulfilled") {
            liveCatLinks.push(response.value);
          }
        });
        resolve(liveCatLinks);
        /**
         * {
         * cat id
         * 301 URLS[]
         * 404 URLS[]
         * }
         */
      })
      .catch((err) => {
        console.log("error in test testCatDescription", err);
        reject(err);
      });
  });
};

exports.testCatDescription = testCatDescription;
