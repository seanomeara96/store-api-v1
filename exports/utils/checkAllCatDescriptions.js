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
    if (!Array.isArray(outputDoc) || !Array.isArray(redirectPaths))
      reject("outputDoc / redirectPaths must be an array");
    if (typeof siteUrl !== "string") reject("expected straing as SiteUrl");
    /**
     * check Cat Description Promises
     */
    let checkCatDescriptionLinksPromises = [];
    // response.value will be...
    /**
     * {
     * cat id
     * 301 URLS[]
     * 404 URLS[]
     * }
     */
    outputDoc.forEach((cat) => {
      cat.description = replaceUrlVarsWithSiteUrl(cat.description, siteUrl);
      cat.description_links = getLinksArray(cat.description);
      checkCatDescriptionLinksPromises.push(
        testCatDescription(cat, redirectPaths, siteUrl)
      );
      delete cat.description;
      delete cat.description_links;
    });
    /**
     * await all category descriptions to be tested
     * then loop through fulfilled responses
     * find cat in outputDoc that matches cat.id
     */
    Promise.allSettled(checkCatDescriptionLinksPromises).then((res) => {
      const descriptionLinkData = res
        .filter(({ status }) => status === "fulfilled")
        .map(({ value }) => value);
      descriptionLinkData.forEach((catLinkDataObject) => {
        /**
         * find catToUpdate
         */
        let catToUpdate = outputDoc.find(
          (category) => category.ID === catLinkDataObject.ID
        );
        // updateCat
        catToUpdate["Description 301s"] = catLinkDataObject["301 URLs"];
        catToUpdate["Description 404s"] = catLinkDataObject["404 URLs"];
      });
      resolve(outputDoc);
    });
  });
};
exports.checkAllCatDescriptions = checkAllCatDescriptions;
