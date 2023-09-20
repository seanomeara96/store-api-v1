
import { getBrandByName } from "../../functions/brands/getBrandByName";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { updateProduct } from "../../functions/products/updateProduct";
import { getPrices, percentageDiscount } from "./utils";


require("../../config/config").config("fs");

(async () => {
  const brand = await getBrandByName("Zita West")

  const products = await getAllProducts({ brand_id: brand.id }).catch(
    console.log
  );

  if(!products){
    return
  }

  console.log(products.length)


  const prices = products.map((el) => getPrices(el, percentageDiscount, 0.10));

  console.log(prices)

  
   const promises = prices.map((price: any) =>
     updateProduct(price.id, { sale_price: price.promo_price })
   );

  const responses = await Promise.allSettled(promises);

   console.log(responses.map(r => r.status));
})();