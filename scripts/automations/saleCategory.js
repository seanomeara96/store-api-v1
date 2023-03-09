require("../../config/config").config("bf");
const { getAllProducts } = require("../../functions/products/getAllProducts");

const {
  addCategoryToSpecificProducts,
} = require("../../functions/products/addCategoryToSpecificProducts");
const {
  removeCategoryFromProductsInCategory,
} = require("../../functions/products/removeCategoryFromProductsInCategory");

function currentDiscount(product) {
  return Math.round(
    ((product.price - product.sale_price) / product.price) * 100
  );
}

function productIds(products) {
  return products.map((product) => ({ id: product.id }));
}

(async function () {
  const shopByOffer = 668;
  const save50 = 660;
  const save40 = 661;
  const save30 = 662;
  const save20 = 705;
  const save10 = 706;
  const products = await getAllProducts().catch(console.log);
  if (!products) return console.log("No products");

  console.log("empty cats");
  for (const id of [shopByOffer, save50, save40, save30, save20, save10]) {
    try {
      console.log(`removing products from category with id of ${id}...`);
      await removeCategoryFromProductsInCategory(id).catch(console.log);
      console.log(`removed products from category with id of ${id}`);
    } catch (err) {
      console.log(err);
      return;
    }
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

  const save20Products = productIds(
    products.filter(
      (product) =>
        20 <= currentDiscount(product) && currentDiscount(product) < 30
    )
  );
  console.log(`${save30Products.length} with > 20% off`);

  const save10Products = productIds(
    products.filter(
      (product) =>
        10 <= currentDiscount(product) && currentDiscount(product) < 20
    )
  );
  console.log(`${save30Products.length} with > 10% off`);

  const allOffers = [
    save50Products,
    save40Products,
    save30Products,
    save20Products,
    save10Products,
  ].flat()

  if (!allOffers.length) return console.log("no offers");

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

  await addCategoryToSpecificProducts(save20Products, save20).catch(
    console.log
  );
  console.log("20% offers updated");

  await addCategoryToSpecificProducts(save10Products, save10).catch(
    console.log
  );
  console.log("10% offers updated");

  console.log("done");
})();
