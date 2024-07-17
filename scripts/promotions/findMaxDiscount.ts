import { getBrandByName } from "../../functions/brands/getBrandByName";
import { Product } from "../../functions/products/Product";
import { getAllProducts } from "../../functions/products/getAllProducts";

require("../../config/config").config("bf");

async function maxDiscount() {
  try {
    const brand = await getBrandByName("Joico");
    if (!brand) return console.log("no brand");
    const products = (await getAllProducts({
      'categories:in': 663
    })).filter(
      (p) => p.inventory_level > 0
    );
    let max: { discount: number; product: Product | undefined } = {
      discount: 0,
      product: undefined,
    };
    for (const product of products) {
      if (product.sale_price) {
        const discount = (product.price - product.sale_price) / product.price;
        if (discount > max.discount) {
          max.discount = discount;
          max.product = product;
        }
      }
    }
    console.log(max.discount);
    console.log(max.product!.id);
    console.log(max.product!.name);
  } catch (err) {
    console.log(err);
  }
}

maxDiscount();
