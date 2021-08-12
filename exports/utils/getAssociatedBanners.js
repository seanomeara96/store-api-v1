/**
 *
 * @param {string} entityType e.g. catgeory_page or brand_page
 * @param {*} onlyLiveBanners true if you only want banners visible on site
 * @returns
 */
const getAssociatedBanners =
  (entityType, onlyLiveBanners = false) =>
  (banners, entityId) => {
    console.log("getAssociatedBanners called", banners.length, entityId);
    let res = banners.filter(
      (banner) =>
        parseInt(banner.item_id) === entityId && banner.page === entityType
    );
    return onlyLiveBanners
      ? res.filter((banner) => banner.visible === "1")
      : res;
  };
/**
 * gets you all brand page banners
 */
const getAssociatedBrandBanners = getAssociatedBanners("brand_page");
/**
 * gets you all category page banners
 */
const getAssociatedCategoryBanners = getAssociatedBanners("category_page");
/**
 * gets you live brand page banners
 */
const getLiveAssociatedBrandBanners = getAssociatedBanners("brand_page", true);
/**
 * gets you all live category page banners
 */
const getLiveAssociatedCategoryBanners = getAssociatedBanners(
  "category_page",
  true
);

// export relevant functions

exports.getAssociatedCategoryBanners = getAssociatedCategoryBanners;
exports.getAssociatedBrandBanners = getAssociatedBrandBanners;
exports.getLiveAssociatedBrandBanners = getLiveAssociatedBrandBanners;
exports.getLiveAssociatedCategoryBanners = getLiveAssociatedCategoryBanners;
