/**
 * replaces bigcommerce global_shoppathssl with a provided site url
 * @param {string} content
 * @param {string} siteUrl
 * @returns
 */
const replaceUrlVarsWithSiteUrl = (content, siteUrl) =>
  content.replace(/%%GLOBAL_ShopPathSSL%%/gi, siteUrl);
exports.replaceUrlVarsWithSiteUrl = replaceUrlVarsWithSiteUrl;
