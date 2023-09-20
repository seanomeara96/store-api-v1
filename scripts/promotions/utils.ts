import { Product } from "../../functions/products/Product";

/**
 * e.g. .15 = 15%
 * @param {*} priceToReduce 
 * @param {*} percentageAsDecimal 
 * @returns 
 */
export function percentageDiscount(priceToReduce: number, percentageAsDecimal: number) {
  return Math.round(priceToReduce * (1 - percentageAsDecimal) * 100) / 100;
}



/**
 * 
 * @param {*} el 
 * @param {*} discountFn add a function to minipulate the default price
 * @param {*} discount 
 * @returns 
 */
export function getPrices(el:Product, discountFn: (a: number, b: number) => number, discount: number) {
  return {
    default_price: el.price,
    id: el.id,
    retail_price: el.retail_price,
    sale_price: el.sale_price,
    promo_price: discountFn(el.price, discount),
  };
}


