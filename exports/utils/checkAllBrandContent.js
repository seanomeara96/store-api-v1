const { checkBrandContent } = require("./checkBrandContent");
const { booleanString } = require("./booleanString");
/**
 *
 * @param {object[]} outputDoc
 * @param {object[]} banners
 * @param {string[]} redirectPaths
 * @param {string} siteUrl
 * @returns
 */
const checkAllBrandContent = (outputDoc, banners, redirectPaths, siteUrl) => {
  return new Promise((resolve, reject) => {
    /**
     * checkBrandContent Promises
     */
    let promises = [];
    outputDoc.forEach((brandItem) => {
      promises.push(
        checkBrandContent(brandItem, banners, redirectPaths, siteUrl)
      );
    });
    Promise.allSettled(promises)
      .then((responses) => {
        responses
          .filter(({ status }) => status === "fulfilled")
          .forEach((response) => {
            let { value } = response;
            let { linkData } = value;
            /**
             * banner ids and associated redirect urls
             */
            let redirs = [];
            linkData.forEach((banner) =>
              redirs.push({
                "Banner Id": banner["Banner Id"],
                "301 URLs": banner["301 URLs"],
              })
            );
            /**
             * banner ids and associated broken links
             */
            let broken = [];
            linkData.forEach((banner) =>
              broken.push({
                "Banner Id": banner["Banner Id"],
                "404 URLs": banner["404 URLs"],
              })
            );
            /**
             * sum the total number of redirects in all banners
             */
            const noOfRedirs =
              redirs.length > 1
                ? redirs.reduce(
                    (a, b) => a["301 URLs"].length + b["301 URLs"].length
                  )
                : redirs[0]["301 URLs"].length;
            /**
             * sum total of brokenUrls in all banners
             */
            const noOfBrokeUrls =
              broken.length > 1
                ? broken.reduce(
                    (a, b) => a["404 URLs"].length + b["404 URLs"].length
                  )
                : broken[0]["404 URLs"].length;

            let brandToUpdate = outputDoc.find(
              (brand) => brand.ID === response.value.brandId
            );
            brandToUpdate["301 URLs"] = redirs;
            brandToUpdate["404 URLs"] = broken;
            brandToUpdate["No. of Redirected URLs"] = noOfRedirs;
            brandToUpdate["No. of Broken URLs"] = noOfBrokeUrls;
            brandToUpdate["Contains Redirects"] = booleanString(noOfRedirs);
            brandToUpdate["Contains Broken Links"] =
              booleanString(noOfBrokeUrls);
          });
        resolve(outputDoc);
      })
      .catch(reject);
  });
};

exports.checkAllBrandContent = checkAllBrandContent;
