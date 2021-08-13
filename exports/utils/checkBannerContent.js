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
  fetchAssociatedBannersMethod
) => {
  return new Promise(async (resolve, reject) => {
    if (!fetchAssociatedBannersMethod)
      return reject("must prrovide a mehtod to checkBannerContent");
    /**
     * live associated banners for current brand/ category
     */
    const liveBanners = fetchAssociatedBannersMethod(banners, outputDocItem.ID);

    if (!liveBanners.length) return reject("No Associated Live Banners");

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

    try {
      linkData = await testBanners(liveBanners, redirectPaths, siteUrl);
      if (linkData.length) {
        resolve({ ID: outputDocItem.ID, linkData });
      } else {
        reject("no link data");
      }
    } catch (err) {
      reject("there was an error in check Content");
    }
  });
};

exports.checkBannerContent = checkBannerContent;
