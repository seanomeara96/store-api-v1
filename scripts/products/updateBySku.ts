import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { updateProduct } from "../../functions/products/updateProduct";

const data = [
  {
    name: "Alfaparf Semi Di Lino Density Christmas Gift Set 2024",
    sku: "20648",
    price: 44.9,
    sale_price: 32.9,
  },
  {
    name: "Alfaparf Semi Di Lino Diamond  Bundle - SAVE 17 Euro",
    sku: "20231",
    price: 49.99,
    sale_price: 32.99,
  },
  {
    name: "Alfaparf Semi Di Lino Diamond Gift Set",
    sku: "13248",
    price: 49.99,
    sale_price: 32.99,
  },
  {
    name: "Alfaparf Semi Di Lino Diamond  Bundle",
    sku: "8760",
    price: 44.9,
    sale_price: 32.9,
  },
  {
    name: "Alfaparf Semi Di Lino Diamond Christmas Gift Set 2024",
    sku: "20647",
    price: 44.9,
    sale_price: 32.9,
  },
  {
    name: "Alfaparf Semi Di Lino Moisture Bundle - SAVE 15 Euro",
    sku: "20230",
    price: 49.99,
    sale_price: 34.99,
  },
  {
    name: "Alfaparf Semi Di Lino Moisture Gift Set",
    sku: "13249",
    price: 48.35,
    sale_price: 34.99,
  },
  {
    name: "Alfaparf Semi Di Lino Moisture  Bundle",
    sku: "8759",
    price: 44.9,
    sale_price: 32.9,
  },
  {
    name: "Alfaparf Semi Di Lino Moisture Christmas Gift Set 2024",
    sku: "20646",
    price: 44.9,
    sale_price: 32.9,
  },
  {
    name: "Alfaparf Semi Di Lino Smooth Gift Set - SAVE 30 Euro",
    sku: "13253",
    price: 63.5,
    sale_price: 33.5,
  },
  {
    name: "Alfaparf Semi Di Lino Reconstruction Christmas Gift Set 2024",
    sku: "20649",
    price: 49.99,
    sale_price: 34.99,
  },
  {
    name: "Alfaparf Semi Di Lino Reconstruction Bundle",
    sku: "8758",
    price: 49.99,
    sale_price: 34.99,
  },
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
  for (const store of ["px"]) {
    await exec(store);
  }
}

main();
