const { getAllProducts } = require("../../functions/products/getAllProducts");
const { getProductVideos } = require("../../functions/products/getProductVideos");
const {output} = require("../utils/output");
require("../../config/config").config("bsk")
const exportAllProductsVideos = async () => {
  try {
    const promises = [];
    const products = await getAllProducts();
    products.forEach((product) => {
      promises.push(getProductVideos(product.id));
    });
    const responses = await Promise.allSettled(promises);
    let outputDoc = responses
      .filter(({status}) => status === "fulfilled")
      .map(({ value }) => {
        let { id, name, sku } = products.find(
          (product) => product.id === value.product_id
        );
        let { videos } = value;
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
