const { google } = require("googleapis");
const content = google.content("v2.1");
/**
 * Lists all products for a given merchant
 * @param {string} merchantId
 * @returns [Products]
 */
const getAllProducts = (merchantId) => {
  const products = [];
  return new Promise((resolve, reject) => {
    function fetchProducts(nextPageToken) {
      content.products
        .list({
          // The maximum number of products to return in the response, used for paging.
          maxResults: 250,
          // The ID of the account that contains the products. This account cannot be a multi-client account.
          merchantId,
          // The token returned by the previous request.
          pageToken: nextPageToken ? nextPageToken : undefined,
        })
        .then((res) => {
          products.push(...res.data.resources);
          if (res.data.resources.length === 250) {
            fetchProducts(res.data.nextPageToken);
          } else {
            resolve(products);
          }
        })
        .catch(reject);
    }
    fetchProducts();
  });
};

exports.getAllProducts = getAllProducts;
