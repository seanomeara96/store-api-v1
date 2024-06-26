import { getAllProducts } from "../../functions/products/getAllProducts";
import { Product } from "../../functions/products/Product";
import { updateProduct } from "../../functions/products/updateProduct";

async function test() {
  try {
    require("./config/config").config("bf");

    const cats = [
      { src: null, dest: 276 },
      { src: 12, dest: 656 },
      { src: 11, dest: 657 },
      { src: 598, dest: 658 },
      { src: 13, dest: 659 },
    ];

    const saleCats = cats.map((c) => c.dest);

    const products = await getAllProducts();

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(i, products.length);

      const isOnSale = checkIsOnSale(product);
      if (!isOnSale) {
        const updatedCats = product.categories.filter(
          (c) => !saleCats.includes(c)
        );
        if (product.categories.length !== updatedCats.length) {
          await updateProduct(product.id, { categories: updatedCats });
          console.log(
            `removed sale cats from ${product.id}: ${product.categories} => ${updatedCats}`
          );
        }
        continue;
      }

      const updatedCats = [...product.categories];
      for (const c of cats) {
        if (!c.src || updatedCats.includes(c.src)) {
          if (!updatedCats.includes(c.dest)) updatedCats.push(c.dest);
        }
      }

      if (product.categories.length !== updatedCats.length) {
        await updateProduct(product.id, { categories: updatedCats });
        console.log(
          `added sale categories to ${product.id}: ${product.categories} => ${updatedCats}`
        );
      }
    }
  } catch (err: any) {
    console.log(
      err.response ? (err.response.data ? err.response.data : err) : err
    );
  }
}
test();

function checkIsOnSale(p: Product): boolean {
  if (!p.sale_price) return false;
  return (p.retail_price || p.price) > p.sale_price;
}
