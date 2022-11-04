require("../../config/config")
const { getAllProducts } = require("../../functions/products/getAllProducts");
//const { getProductById } = require("../../functions/products/getProductById");
const { getSiteUrl } = require("../../functions/utils/getSiteUrl");
const { sendMail } = require("../../scripts/utils/sendMail");

const filterProductsWithOptionSets = (products) => {
  return products.filter(({ option_set_id }) => option_set_id);
};
const filterInventoryTrackingNotVariant = (products) => {
  return products.filter(
    ({ inventory_tracking }) => inventory_tracking !== "variant"
  );
};
const formatProductHTMLBlocks = (products, store) => {
  return products.map(
    (product) =>
      `<p><a href="${getSiteUrl(store) + product.custom_url.url}">${
        product.name
      }</a> <a href="https://store-${
        process.env[`${store.toUpperCase()}_STORE_HASH`]
      }.mybigcommerce.com/manage/products/${product.id}/edit">Edit</a></p>`
  );
};
const formatEmail = (htmlBlocks) => {
  return [
    `<p><strong>Found ${htmlBlocks.length} configs where inventory tracking is not set at variant level</strong></p>`,
    ...htmlBlocks,
  ].join("\n");
};

(async () => {
  const htmlBlocks = [];
  async function report(store) {
    require("../../config/config").config(store);
    await getAllProducts()
      .then(filterProductsWithOptionSets)
      .then(filterInventoryTrackingNotVariant)
      .then((data) => htmlBlocks.push(...formatProductHTMLBlocks(data, store)));
  }

  for (const store of ["bf", "ih", "bsk", "bs", "pb", "hie"]) {
    await report(store);
  }

  sendMail("Config Inventory Tracking", formatEmail(htmlBlocks), [
    "sean@beautyfeatures.ie",
    // "brendan@beautyfeatures.ie",
  ])
})();
