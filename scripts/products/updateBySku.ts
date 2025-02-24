
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { updateProduct } from "../../functions/products/updateProduct";

const data = [
  { sku: "1040", name: "Wedgwood Butter Dish 7cm (Pack Size 1)" },
  { sku: "1025", name: "Wedgwood Dinner Plate 27cm (Pack Size 10)" },
  { sku: "1026", name: "Wedgwood Dinner Plate 31cm (Pack size 10)" },
  { sku: "1020", name: "Wedgwood Espresso Cup 8cl (Pack Size 10)" },
  { sku: "1021", name: "Wedgwood Espresso Cup Saucer 12cm (Pack Size 10)" },
  {
    sku: "JASP2",
    name: "Wedgwood Jasper Conran Dinner Plate  27cm (Pack Size 10)",
  },
  {
    sku: "JASP1",
    name: "Wedgwood Jasper Conran Dinner Plate 33cm (Pack Size 10)",
  },
  {
    sku: "JASP3",
    name: "Wedgwood Jasper Conran Side Plate 18cm (Pack Size 10)",
  },
  { sku: "1039", name: "Wedgwood Milk Jug 27cl (Pack Size 1)" },
  { sku: "1027L", name: "Wedgwood Pasta Plate 28cm (Pack Size 10)" },
  { sku: "1030", name: "Wedgwood Salt & Pepper Set 5cm (Pack Size 1)" },
  { sku: "1029", name: "Wedgwood Sauce Boat 36cl (Pack size 1)" },
  { sku: "1024", name: "Wedgwood Side Plate 15cm (Pack Size 10)" },
  { sku: "1027", name: "Wedgwood Soup Plate 23cm (Pack size 10)" },
  { sku: "W011", name: "Wedgwood Starter/Dessert Plate 22cm (Pack Size 10)" },
  { sku: "1038", name: "Wedgwood Sugar Bowl 10cm (Pack Size 1)" },
  { sku: "1022", name: "Wedgwood Tea Cup 20cl (Pack Size 10)" },
  { sku: "1023", name: "Wedgwood Tea Cup Saucer 14cm (Pack size 10)" },
];

async function exec(storeInitials: string) {
  require("../../config/config").config(storeInitials);
  for (let i = 0; i < data.length; i++) {
    try {
      console.log(i + 1, data.length);
      const row = data[i];
      const vars = await getAllProductVariants({ sku: row.sku });
      const expect = 1;
      if (vars.length !== expect) {
        throw `Incorrect number of variants for sku ${row.sku}. Expected ${expect}, received ${vars.length}.`;
      }
      await updateProduct(vars[0].product_id, { name: row.name });
    } catch (err) {
      console.log(err);
    }
  }
}

async function main() {
  for (const store of ["ha"]) {
    await exec(store);
  }
}

main();
