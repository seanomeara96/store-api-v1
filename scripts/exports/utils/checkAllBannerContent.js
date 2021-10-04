const { checkBannerContent } = require("./checkBannerContent");
const { booleanString } = require("./booleanString");
/**
 *
 * @param {object[]} outputDoc
 * @param {object[]} banners
 * @param {string[]} redirectPaths
 * @param {string} siteUrl
 * @returns
 */
const checkAllBannerContent = (
  outputDoc,
  banners,
  redirectPaths,
  siteUrl,
  fetchAssociatedBannersMethod
) => {
  return new Promise((resolve, reject) => {
    /**
     * checkBannerContent Promises
     */
    let promises = [];
    outputDoc.forEach((outputDocItem) => {
      promises.push(
        checkBannerContent(
          outputDocItem,
          banners,
          redirectPaths,
          siteUrl,
          fetchAssociatedBannersMethod
        )
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
                ? redirs
                    .map((i) => i["301 URLs"].length)
                    .reduce((a, b) => a + b)
                : redirs[0]["301 URLs"].length;
            /**
             * sum total of brokenUrls in all banners
             */
            const noOfBrokeUrls =
              broken.length > 1
                ? broken
                    .map((i) => i["404 URLs"].length)
                    .reduce((a, b) => a + b)
                : broken[0]["404 URLs"].length;

            let outputDocItemToUpdate = outputDoc.find(
              ({ ID }) => ID === response.value.ID
            );
            outputDocItemToUpdate["301 URLs"] = redirs;
            outputDocItemToUpdate["404 URLs"] = broken;
            outputDocItemToUpdate["No. of Redirected URLs"] = noOfRedirs;
            outputDocItemToUpdate["No. of Broken URLs"] = noOfBrokeUrls;
            outputDocItemToUpdate["Contains Redirects"] =
              booleanString(noOfRedirs);
            outputDocItemToUpdate["Contains Broken Links"] =
              booleanString(noOfBrokeUrls);
          });
        resolve(outputDoc);
      })
      .catch(reject);
  });
};

exports.checkAllBannerContent = checkAllBannerContent;
