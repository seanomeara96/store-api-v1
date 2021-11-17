const { getBrandById } = require("../brands/getBrandById");
const { createRedirect } = require("../redirects/createRedirect");
const { getProductById } = require("./getProductById");

const createRelevantRedirect = (product) =>
  new Promise(async (resolve, reject) => {
    if (!product) return reject("creating redirect requires product object");
    if (product.brand_id) {
      const brand = await getBrandById(product.brand_id).catch(reject);
      const res = await createRedirect(
        product.custom_url.url,
        brand.custom_url.url
      ).catch(reject);
      return resolve(res);
    }
    const res = await createRedirect(product.custom_url.url, "/").catch(reject);
    return resolve(res);
  });

const deleteProduct = (id) =>
  new Promise(async (resolve, reject) => {
    getProductById(id).then((product) => {
      require("../../config/config")
        .store.delete(`/catalog/products/${id}`)
        .then(() => {
          createRelevantRedirect(product).then(() =>
            resolve(`Successfully deleted ${product.name}`)
          ).catch(reject)
        }).catch(reject)
    }).catch(reject)
  });

exports.deleteProduct = deleteProduct;
