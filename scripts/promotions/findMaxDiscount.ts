import { getBrandByName } from "../../functions/brands/getBrandByName";
import { Product } from "../../functions/products/Product";
import { getAllProducts } from "../../functions/products/getAllProducts";

require("../../config/config").config("bf");

const relative = true;

const christmasCategory = 276;
const blackFridayCategory = 1057;

async function maxDiscount() {
  try {
    // const brand = await getBrandByName("Kérastase");
    //if (!brand) return console.log("no brand");
    const products = (
      await getAllProducts({
        "categories:in": [1215].join(","),
        //brand_id: brand.id,
      })
    ).filter(
      (p) => p.inventory_level > 0 && !p.name.toLowerCase().includes("gwp"),
    );
    let max: { discount: number; product: Product | undefined } = {
      discount: 0,
      product: undefined,
    };
    for (const product of products) {
      if (product.sale_price && product.price >= product.sale_price) {
        if (relative) {
          const discount = (product.price - product.sale_price) / product.price;
          if (discount > max.discount) {
            max.discount = discount;
            max.product = product;
          }
        } else {
          const discount = product.price - product.sale_price;
          if (discount > max.discount) {
            max.discount = discount;
            max.product = product;
          }
        }
      }
    }

    console.log(max.discount, relative ? "%" : "€");
    console.log(max.product!.id);
    console.log(max.product!.name);
  } catch (err) {
    console.log(err);
  }
}

maxDiscount();
