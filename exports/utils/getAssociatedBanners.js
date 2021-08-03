// returns an array of banners associated with a brand
const getAssociatedBrandBanners = (banners, brandId) => {
  return banners.filter((banner) => parseInt(banner.item_id) === brandId);
};
const getLiveAssociatedBrandBanners = (banners, brandId) => {
  return getAssociatedBrandBanners(banners, brandId).filter(
    (banner) => banner.visible === "1"
  );
};
exports.getAssociatedBrandBanners = getAssociatedBrandBanners;
exports.getLiveAssociatedBrandBanners = getLiveAssociatedBrandBanners;
