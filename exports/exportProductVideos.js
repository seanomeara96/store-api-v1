const store = "bf";
require("../config/config").config(store);
const {
  getAllProductVideosOfAllProducts,
} = require("../videos/getAllProductVideosOfAllProducts");
const { getSiteUrl } = require("../utils/getSiteUrl");
const output = require("./utils/output");
const exportProductVideos = async () => {
  try {
    const siteUrl = getSiteUrl(store);
    const productVideos = await getAllProductVideosOfAllProducts();
    productVideos.forEach((item) => {
      item.videos = item.videos.length;
      item.url = siteUrl + item.url;
    });
    output("videos", productVideos);
  } catch (err) {
    console.log(err);
  }
};
exportProductVideos();
