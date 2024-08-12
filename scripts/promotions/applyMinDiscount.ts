import { getBrandByName } from "../../functions/brands/getBrandByName";
import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductVariants } from "../../functions/products/getProductVariants";
import { Product } from "../../functions/products/Product";
import { updateProduct } from "../../functions/products/updateProduct";
import { addCategory, arraysAreEqual } from "../utils/productCategoryUtils";

const store:string = "ah";
const excludeFromDiscounts = false;
require("../../config/config").config(store);

async function applyDiscountToBrand() {
  try {

    const products = await getAllProducts();

    if (!products) {
      return;
    }

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const ref = [...product.categories];
      const variants = await getProductVariants(product.id);

      for (let ii = 0; ii < variants.length; ii++) {
        const v = variants[ii];
        // retail price possibly null

        if(!v.price) v.price = product.price

        v.retail_price = v.price;
        if (!v.sale_price) v.sale_price = v.price

        if (currentDiscount(v.price, v.sale_price) > .20){
          continue
        }

        let discountPrice = v.price! * (1 - 0.20);
        // Convert to cents
        discountPrice = discountPrice * 100;

        // Calculate 5-cent increments
        discountPrice = discountPrice / 5;

        // Round to the nearest whole number
        discountPrice = Math.round(discountPrice);

        // Convert back to cents
        discountPrice = discountPrice * 5;

        // Convert back to euro
        discountPrice = discountPrice / 100;

        //if (discountPrice < v.sale_price!) {
          
        //}
        await updateProductVariant(product.id, v.id, {
          price: v.price!,
          sale_price: discountPrice,
          retail_price: v.retail_price!,
        });
      }

      if (excludeFromDiscounts) {
            
        let excludeFromDiscountCategoryID;
        if (store === "bf") {
          excludeFromDiscountCategoryID = 640;
        }

        if (!excludeFromDiscountCategoryID) {
          throw new Error(`No category id configured ${store}`);
        }

        addCategory(product, excludeFromDiscountCategoryID);
        if (!arraysAreEqual(ref, product.categories)) {
          await updateProduct(product.id, { categories: product.categories });
        }
      }

    }
  } catch (err) {
    console.log(err);
  }
}

applyDiscountToBrand();


function currentDiscount(price: number, sale_price: number |undefined):number {
  if (!sale_price) {
    return 0;
  }
  return (price - sale_price) / price;
}