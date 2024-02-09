import { Category } from "./functions/categories/createCategory";
import { getAllCategories } from "./functions/categories/getAllCategories";
import { Product } from "./functions/products/Product";
import { addCatToProduct } from "./functions/products/addCatToProduct";
import { getAllProducts } from "./functions/products/getAllProducts";
import { updateProduct } from "./functions/products/updateProduct";

require("./config/config").config("ch");

async function test() {
  try {
    const products = (await getAllProducts()) as UpdateProducts[];

    interface UpdateProducts extends Product {
      updatedCategories: number[];
    }

    for (const product of products) {
      product.updatedCategories = [...product.categories];
    }

    const categories = await getAllCategories();

    function findCat(id: number) {
      return categories.find((c) => c.id === id);
    }

    const parentCategoryIds: number[] = [
      ...new Set(categories.map((c) => c.parent_id).filter((i) => i !== 0)),
    ];

    const bottomCategoriesIDs = categories
      .filter((c) => !parentCategoryIds.includes(c.id))
      .map((c) => c.id);

    function getLayers(layer: number[], upperlayer: number[]): number[] {
      if (!upperlayer.length) {
        return layer;
      }

      let parents: number[] = [];
      for (const l of upperlayer) {
        const cat = findCat(l);
        if (cat && cat.parent_id !== 0) {
          layer.push(cat.id);
          parents.push(cat.parent_id);
        }
      }

      layer = [...new Set(layer)];
      parents = [...new Set(parents)];

      return getLayers(layer, parents);
    }

    const orderedsubcategories = getLayers([], bottomCategoriesIDs);

    console.log("orderedsubcategories", orderedsubcategories.length);

    for (let i = 0; i < orderedsubcategories.length; i++) {
      const c = findCat(orderedsubcategories[i]);

      if (!c) {
        throw new Error("could not find category for id");
      }

      console.log(
        `addressing ${i + 1} of ${orderedsubcategories.length} categories id (${
          c.id
        }) name ${c.name} => child of ${findCat(c.parent_id)?.name}`
      );

      const items = products.filter((p) => p.updatedCategories.includes(c.id));
      console.log(`${items.length} products to move`);
      for (let ii = 0; ii < items.length; ii++) {
        const item = items[ii];
        if (!item.updatedCategories.includes(c.parent_id)) {
          item.updatedCategories.push(c.parent_id);
        }
      }
    }

    let productsToUpdate = [];

    for (let iii = 0; iii < products.length; iii++) {
      const product = products[iii];
      const asc = (a: number, b: number) => a - b;
      product.categories = [...new Set(product.categories)].sort(asc);
      product.updatedCategories = [...new Set(product.updatedCategories)].sort(
        asc
      );
      if (product.categories !== product.updatedCategories) {
        productsToUpdate.push(product);
      }
    }

    console.log("productsToUpdate.length", productsToUpdate.length)
    
    
    for (let iv = 0; iv < productsToUpdate.length; iv++) {
      console.log(`updating ${iv + 1} of ${productsToUpdate.length} products`);
      const product = productsToUpdate[iv];
      await updateProduct(product.id, {
        categories: product.updatedCategories,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

test();
