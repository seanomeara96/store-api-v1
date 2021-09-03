const { getAllProducts } = require("../products/getAllProducts");
const { getAllProductVideos } = require("./getAllProductVideos");
const getAllProductVideosOfAllProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await getAllProducts();
      let promises = [];
      products.forEach(({ id }) => promises.push(getAllProductVideos(id)));
      let responses = await Promise.allSettled(promises);
      // only fulfilled responses
      responses = responses.filter(({ status }) => status == "fulfilled");
      // only values
      responses = responses.map(({ value }) => value);
      // add name and sku
      responses.forEach((response) => {
        let productDetails = products.find(({id}) => id === response.product_id);
        response.name = productDetails.name;
        response.sku = productDetails.sku;
        response.url = productDetails.custom_url.url;
      });
      resolve(responses);
    } catch (err) {
      reject(err);
    }
  });
};

exports.getAllProductVideosOfAllProducts = getAllProductVideosOfAllProducts;
