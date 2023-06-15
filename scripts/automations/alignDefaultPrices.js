require("../../config/config").config("pb");
const { getAllProducts } = require("../../functions/products/getAllProducts");
const { updateProduct } = require("../../functions/products/updateProduct");

async function main() {
  try {
    const products = await getAllProducts();
    for (const p of products) {
      try {
        await updateProduct(p.id, { price: p.retail_price });
        console.log("updated", p.id)
      } catch (err) {
        console.log(err.response.data);
        continue;
      }
    }
  } catch (err) {
    console.log(err.response.data);
  }
}
main()