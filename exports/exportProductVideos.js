require("../config/config").config("ih")
const {
  getProductVideosOfMany,
} = require("../products/getProductVideosOfMany");
const output = require("./utils/output");
const productIds = [];
const exportProductVideos = async (product_ids) => {
  try {
    const productVideos = await getProductVideosOfMany(product_ids);
    productVideos.forEach((item) => {
      item.videos = item.videos.length;
    });
    output("videos", productVideos);
  } catch (err) {
    console.log(err);
  }
};
exportProductVideos(productIds);
