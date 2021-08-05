const getAssociatedBanners =
  (entityType, onlyLiveBanners = false) =>
  (banners, entityId) => {
    let res = banners.filter(
      (banner) =>
        parseInt(banner.item_id) === entityId && banner.page === entityType
    );
    return onlyLiveBanners
      ? res
      : (res = res.filter((banner) => banner.visible === "1"));
  };

const getAssociatedBrandBanners = getAssociatedBanners("brand_page");
const getAssociatedCategoryBanners = getAssociatedBanners("category_page");
const getLiveAssociatedBrandBanners = getAssociatedBanners("brand_page", true);
const getLiveAssociatedCategoryBanners = getAssociatedBanners(
  "category_page",
  true
);
exports.getAssociatedCategoryBanners = getAssociatedCategoryBanners;
exports.getAssociatedBrandBanners = getAssociatedBrandBanners;
exports.getLiveAssociatedBrandBanners = getLiveAssociatedBrandBanners;
exports.getLiveAssociatedCategoryBanners = getLiveAssociatedCategoryBanners;
