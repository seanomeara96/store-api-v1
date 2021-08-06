const { replaceUrlVarsWithSiteUrl } = require("./replaceUrlVarsWithSiteUrl");
const { getLinksArray } = require("./getLinksArray");
const { testCatDescription } = require("./testCatDescription");
/**
 *
 * @param {object[]} outputDoc
 * @param {string[]} redirectPaths
 * @param {string} siteUrl
 * @returns output doc with relevant fields populated
 */
const checkAllCatDescriptions = (outputDoc, redirectPaths, siteUrl) => {
  return new Promise(async (resolve, reject) => {
    /**
     * check Cat Description Promises
     */
    let checkCatDescriptionLinksPromises = [];
    outputDoc.forEach((cat) => {
      cat.description = replaceUrlVarsWithSiteUrl(cat.description, siteUrl);
      cat.description_links = getLinksArray(cat.description);
      checkCatDescriptionLinksPromises.push(
        testCatDescription(cat, redirectPaths, siteUrl)
      );
      delete cat.description
      delete cat.description_links
    });
    Promise.allSettled(checkCatDescriptionLinksPromises).then(res => {
      const descriptionLinkData = res.filter(({ status }) => status === "fulfilled").map(({value})=>value)
      descriptionLinkData.forEach(cat => {
        let catToUpdate= outputDoc.find(category => category.ID)
      }
        )
    })
  });
};
exports.checkAllCatDescriptions = checkAllCatDescriptions;
