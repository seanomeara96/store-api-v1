require("../../config/config").config("bf");
const { getAllProducts } = require("../../functions/products/getAllProducts");

const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");
const {
  removeCategoryFromProductsInCategory,
} = require("../../functions/products/removeCategoryFromProductsInCategory");

(async function () {
  const shopByOffer = 668;
  const save50 = 660;
  const save40 = 661;
  const save30 = 662;

  console.log("empty cats");
  for (const id of [shopByOffer, save50, save40, save30]) {
    await removeCategoryFromProductsInCategory(id).catch(console.log);
  }

  const products = await getAllProducts().catch(console.log);

  function currentDiscount(product) {
    return Math.round(
      ((product.price - product.sale_price) / product.price) * 100
    );
  }

  function productIds(products) {
    return products.map((product) => ({ id: product.id }));
  }

  const save50Products = productIds(
    products.filter((product) => currentDiscount(product) >= 50)
  );
  console.log(`${save50Products.length} with > 50% off`);

  const save40Products = productIds(
    products.filter(
      (product) =>
        40 <= currentDiscount(product) && currentDiscount(product) < 50
    )
  );
  console.log(`${save40Products.length} with > 40% off`);

  const save30Products = productIds(
    products.filter(
      (product) =>
        30 <= currentDiscount(product) && currentDiscount(product) < 40
    )
  );
  console.log(`${save30Products.length} with > 30% off`);

  const allOffers = [...save50Products, ...save40Products, ...save30Products];

  await addCategoryToSpecificProducts(allOffers, shopByOffer).catch(
    console.log
  );
  console.log("all offers updated");
  await addCategoryToSpecificProducts(save50Products, save50).catch(
    console.log
  );
  console.log("50% offers updated");
  await addCategoryToSpecificProducts(save40Products, save40).catch(
    console.log
  );
  console.log("40% offers updated");
  await addCategoryToSpecificProducts(save30Products, save30).catch(
    console.log
  );
  console.log("30% offers updated");

  console.log("done");
})();
