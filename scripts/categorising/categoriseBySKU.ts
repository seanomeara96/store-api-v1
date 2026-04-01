import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { removeCatFromProduct } from "../../functions/products/removeCatFromProduct";

const data = [
  { sku: "MOR_MO0041", sale_price: 39.99, exclude: "TRUE" },
  { sku: "5011", sale_price: 21.1, exclude: "TRUE" },
  { sku: "5023", sale_price: 16.5, exclude: "TRUE" },
  { sku: "5183", sale_price: 22.7, exclude: "TRUE" },
  { sku: "5668", sale_price: 6.95, exclude: "TRUE" },
  { sku: "5669", sale_price: 9, exclude: "TRUE" },
  { sku: "6283", sale_price: 13.1, exclude: "TRUE" },
  { sku: "8759", sale_price: 32, exclude: "TRUE" },
  { sku: "8760", sale_price: 32, exclude: "TRUE" },
  { sku: "7179", sale_price: 24.65, exclude: "TRUE" },
  { sku: "7180", sale_price: 24.65, exclude: "TRUE" },
  { sku: "7494", sale_price: 23.85, exclude: "TRUE" },
  { sku: "7657", sale_price: 23.85, exclude: "TRUE" },
  { sku: "110700", sale_price: 58.5, exclude: "TRUE" },
  { sku: "111598", sale_price: 64.99, exclude: "TRUE" },
  { sku: "9414", sale_price: 4.25, exclude: "TRUE" },
  { sku: "9517", sale_price: 9.25, exclude: "TRUE" },
  { sku: "9500", sale_price: 16.95, exclude: "TRUE" },
  { sku: "9566", sale_price: 20.4, exclude: "TRUE" },
  { sku: "9717", sale_price: 46.7, exclude: "TRUE" },
  { sku: "11356", sale_price: 41.4, exclude: "TRUE" },
  { sku: "11355", sale_price: 41.4, exclude: "TRUE" },
  { sku: "11561", sale_price: 13.45, exclude: "TRUE" },
  { sku: "12087", sale_price: 14.65, exclude: "TRUE" },
  { sku: "12949", sale_price: 6.8, exclude: "TRUE" },
  { sku: "11553B", sale_price: 30, exclude: "TRUE" },
  { sku: "14078", sale_price: 3.05, exclude: "TRUE" },
  { sku: "14081", sale_price: 0.55, exclude: "TRUE" },
  { sku: "14330", sale_price: 21.35, exclude: "TRUE" },
  { sku: "14403", sale_price: 17.95, exclude: "TRUE" },
  { sku: "20270", sale_price: 23.1, exclude: "TRUE" },
  { sku: "20280", sale_price: 34.99, exclude: "TRUE" },
  { sku: "20498", sale_price: 12.85, exclude: "TRUE" },
  { sku: "11417A", sale_price: 31.55, exclude: "TRUE" },
  { sku: "20505", sale_price: 39.25, exclude: "TRUE" },
  { sku: "20601", sale_price: 23.1, exclude: "TRUE" },
  { sku: "20528", sale_price: 41.99, exclude: "TRUE" },
  { sku: "20617", sale_price: 12.99, exclude: "TRUE" },
  { sku: "20656", sale_price: 31.99, exclude: "TRUE" },
  { sku: "20666", sale_price: 44.99, exclude: "TRUE" },
  { sku: "10688A", sale_price: 40.8, exclude: "TRUE" },
  { sku: "20789", sale_price: 13.1, exclude: "TRUE" },
  { sku: "20979", sale_price: 53.25, exclude: "TRUE" },
  { sku: "21010", sale_price: 50.05, exclude: "TRUE" },
  { sku: "21581", sale_price: 15.35, exclude: "TRUE" },
  { sku: "21580", sale_price: 13.45, exclude: "TRUE" },
  { sku: "21676", sale_price: 16.95, exclude: "TRUE" },
  { sku: "21652", sale_price: 14.2, exclude: "TRUE" },
  { sku: "21658", sale_price: 2.3, exclude: "TRUE" },
  { sku: "21677", sale_price: 17.95, exclude: "TRUE" },
  { sku: "21671", sale_price: 28.99, exclude: "TRUE" },
  { sku: "21672", sale_price: 16.9, exclude: "TRUE" },
  { sku: "21681", sale_price: 17.99, exclude: "TRUE" },
  { sku: "21818", sale_price: 22.95, exclude: "TRUE" },
  { sku: "21839", sale_price: 25.35, exclude: "TRUE" },
  { sku: "21890", sale_price: 19.99, exclude: "TRUE" },
  { sku: "21940", sale_price: 58, exclude: "TRUE" },
  { sku: "21925", sale_price: 9.99, exclude: "TRUE" },
  { sku: "22027", sale_price: 16.99, exclude: "TRUE" },
  { sku: "22084", sale_price: 18.99, exclude: "TRUE" },
  { sku: "22469", sale_price: 29.25, exclude: "TRUE" },
  { sku: "22546", sale_price: 43, exclude: "TRUE" },
  { sku: "22544", sale_price: 39.8, exclude: "TRUE" },
].map(({ sku }) => sku);

async function main() {
  try {
    require("../../config/config").config("bf");
    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const sku = data[i];
      const vars = await getAllProductVariants({ sku: sku });
      const expect = 1;
      if (vars.length !== expect) {
        throw `Incorrect number of variants for sku ${sku}. Expected ${expect}, received ${vars.length}.`;
      }
      await addCatToProduct(vars[0].product_id, 1268);
      //await removeCatFromProduct(vars[0].product_id, 1268);
    }
  } catch (err) {
    console.log(err);
  }
}
main();
