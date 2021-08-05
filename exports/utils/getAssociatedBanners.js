const getAssociatedBanners = (entityType) => {
  return (banners, entityId) => {
    return banners.filter(
      (banner) =>
        parseInt(banner.item_id) === entityId && banner.page === entityType
    );
  };
};
const getAssociatedBrandBanners = getAssociatedBanners("brand_page");
const getAssociatedCategoryBanners = getAssociatedBanners("category_page");
const getLiveAssociatedBanners = (getEntitybannersMethod, banners, entityId) => {
  return 
}



const getLiveAssociatedBrandBanners = (banners, brandId) => {
  return getAssociatedBrandBanners(banners, brandId).filter(
    (banner) => banner.visible === "1"
  );
};
exports.getAssociatedCategoryBanners = getAssociatedCategoryBanners;
exports.getAssociatedBrandBanners = getAssociatedBrandBanners;
exports.getLiveAssociatedBrandBanners = getLiveAssociatedBrandBanners;
