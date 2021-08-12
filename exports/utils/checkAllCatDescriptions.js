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
    if (typeof siteUrl !== "string") reject("expected string as SiteUrl");
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
      cat.Description = replaceUrlVarsWithSiteUrl(cat.Description, siteUrl);
      cat.Description_links = getLinksArray(cat.Description);
      checkCatDescriptionLinksPromises.push(
        testCatDescription(cat, redirectPaths, siteUrl)
      );
      //delete cat.description;
     // delete cat.description_links;
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
      /**
       * for each response, update the appropriate
       * outputDoc Categor and resolve
       * with the finished result
       */
      descriptionLinkData.forEach((catLinkDataObject) => {
        /**
         * find catToUpdate
         */
         
        let catToUpdate = outputDoc.find(
          (category) => category.ID === catLinkDataObject.catId
        );
        console.log("catToUpdate", catToUpdate)
        // updateCat
        catToUpdate["Description 301s"] = catLinkDataObject["301 URLs"];
        catToUpdate["Description 404s"] = catLinkDataObject["404 URLs"];
        /**
         * I was wondering why thus find and replace method wasnt working for me when I was using an array of numbers
         * but i found this and it was all cleared up
         *
         * "it will only work on non primitives values. Javascript returns non primitives like objects and arrays by reference"
         */
      });
      resolve(outputDoc);
    });
  });
};
exports.checkAllCatDescriptions = checkAllCatDescriptions;
