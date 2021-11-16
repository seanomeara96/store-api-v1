const { createRedirect } = require("../redirects/createRedirect");

const createRelevantRedirect = (product) =>
  new Promise(async (resolve, reject) => {
    if (product.brand_id) {
      const brand = await getBrandById(product.brand_id).catch(reject);
      const res = await createRedirect(
        product.custom_url.url,
        brand.custom_url.url
      ).catch(reject);
      resolve(res);
    }
  });

const deleteProduct = (id) =>
  new Promise(async (resolve, reject) => {
    let product;
    try {
      product = await getProductById(id);
    } catch (err) {
      return reject(err);
    }
    try {
      await require("../../config/config").store.delete(
        `/catalog/products/${id}`
      );
    } catch (err) {
      return reject(err);
    }
    try {
      await createRelevantRedirect(product);
    } catch (err) {
      return reject(err);
    }
    resolve(`Successfully deleted ${product.name}`);
  });

exports.deleteProduct = deleteProduct;
