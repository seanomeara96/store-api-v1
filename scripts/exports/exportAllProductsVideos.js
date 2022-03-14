const { getAllProducts } = require("../../functions/products/getAllProducts");
const {
  getProductVideos,
} = require("../../functions/products/getProductVideos");
const { output } = require("../utils/output");
require("../../config/config").config("bsk");

function mapResolvedValues(responses) {
  return responses.filter(({ status }) => status === "fulfilled").map((i) => i.value);
}
const exportAllProductsVideos = async () => {
  try {
    const products = await getAllProducts();
    const responses = await Promise.allSettled(
      products.map((product) => getProductVideos(product.id))
    );
    const outputDoc = mapResolvedValues(responses).map((value) => {
      const { id, name, sku } = products.find(
        (product) => product.id === value.product_id
      );
      const { videos } = value;
      return {
        id,
        name,
        sku,
        "#videos": videos.length,
      };
    });
    output("all-videos", outputDoc);
  } catch (err) {
    console.log(err);
  }
};
exportAllProductsVideos();
