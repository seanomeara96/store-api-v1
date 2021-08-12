const { replaceUrlVarsWithSiteUrl } = require("./replaceUrlVarsWithSiteUrl");
const { getLinksArray } = require("./getLinksArray");
const { testBanners } = require("./testBanners");

/**
 *
 * @param {object} outputDocItem
 * @param {object[]} banners
 * @param {string[]} redirectPaths
 * @param {string} siteUrl
 * @param {string} type
 * @returns
 */
const checkBannerContent = (
  outputDocItem,
  banners,
  redirectPaths,
  siteUrl,
  type,
  fetchAssociatedBannersMethod
) => {
  return new Promise(async (resolve, reject) => {
    if (!type) reject("must provide a type");
    /**
     * live associated banners for current brand/ category
     */
    const liveBanners = fetchAssociatedBannersMethod(banners, outputDocItem.ID);

    if (!liveBanners.length) {
      reject("No Associated Live Banners");
    }

    // replace store url var with siteUrl
    liveBanners.forEach(
      (liveBanner) =>
        (liveBanner.content = replaceUrlVarsWithSiteUrl(
          liveBanner.content,
          siteUrl
        ))
    );

    // create an array of links on each banner doc
    liveBanners.forEach(
      (liveBanner) => (liveBanner.links = getLinksArray(liveBanner.content))
    );

    let linkData = null;

    if (liveBanners.length) {
      try {
        linkData = await testBanners(liveBanners, redirectPaths, siteUrl);
        if (linkData.length) {
          resolve({ outputDocItemId: ID, linkData });
        } else {
          reject("no link data");
        }
      } catch (err) {
        console.log("there was an error in check Content", err);
        reject("there was an error in check Content");
      }
    } else {
      reject("no live banners");
    }
  });
};

exports.checkBannerContent = checkBannerContent;
