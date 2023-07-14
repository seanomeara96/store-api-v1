require("../../config/config").config("bf");

import { addCategoryToSpecificProducts } from "../../functions/products/addCategoryToSpecificProducts";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { removeCategoryFromProductsInCategory } from "../../functions/products/removeCategoryFromProductsInCategory";

(async () => {
  const newInCatId = 679;
  console.log(`removing all products from cat id: `, 679);
  const productCount = await removeCategoryFromProductsInCategory(newInCatId);
  console.log(`products removed`, productCount);

  const minDate = new Date();
  const last60Days = minDate.getDate() - 60;
  minDate.setDate(last60Days);

  const year = minDate.getFullYear();
  const month = minDate.getMonth() + 1;
  const day = minDate.getDate();
  const formattedMinDate = `${year}-${month}-${day}`;
  console.log(formattedMinDate);
  console.log(`fetching products added in the last 60 days`);
  const products = await getAllProducts()
  const today = new Date().getTime();
  const productsToUpdate = products
    .map((p) => ({
      id: p.id,
      date_created: p.date_created,
    }))
    .filter((p) => {
      const date_created = new Date(p.date_created).getTime();

      const difference = today - date_created;

      const totalDays = Math.ceil(difference / (1000 * 3600 * 24));

      if (totalDays < 60) {
        return true;
      }
      return false;
    });

  const productIds = productsToUpdate.map(({ id }) => ({ id }));

  await addCategoryToSpecificProducts(productIds, newInCatId).catch((err) => {
    throw new Error("could not add category to products");
  });

  console.log("New In category Updated");
})();
