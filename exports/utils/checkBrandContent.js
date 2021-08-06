const { replaceUrlVarsWithSiteUrl } = require("./replaceUrlVarsWithSiteUrl");
const { getLinksArray } = require("./getLinksArray");
const { testBanners } = require("./testBanners");
const { getLiveAssociatedBrandBanners } = require("./getAssociatedBanners");

/**
 *
 * @param {object} brand
 * @param {object[]} banners
 * @param {string[]} redirectPaths
 * @param {string} siteUrl
 * @returns
 */
const checkBrandContent = (brand, banners, redirectPaths, siteUrl) => {
  return new Promise(async (resolve, reject) => {
    /**
     * live associated banners for current brand
     */
    const liveBanners = getLiveAssociatedBrandBanners(banners, brand.ID);

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
          resolve({ brandId: brand.ID, linkData });
        } else {
          reject();
        }
      } catch (err) {
        console.log(err);
        reject();
      }
    }
  });
};

exports.checkBrandContent = checkBrandContent;
