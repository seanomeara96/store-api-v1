import { getAllBrands } from "../../functions/brands/getAllBrands";
import fs from "fs";

async function main() {
  require("../../config/config").config("bf");
  try {
    const brands = await getAllBrands();
    const brandNames = brands
      .map(function (brand) {
        return brand.name;
      })
      .join(`\n`);
    fs.writeFileSync("brands.txt", brandNames, { encoding: "utf-8" });
  } catch (err) {
    console.log(err);
  }
}

main();
