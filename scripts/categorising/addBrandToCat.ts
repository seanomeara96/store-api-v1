require("../../config/config").config("bf");
import { getBrandByName } from "../../functions/brands/getBrandByName";
import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getAllProducts } from "../../functions/products/getAllProducts";

async function addBrandToCat(brandName: string, catId: number) {
  const brand = await getBrandByName(brandName);
  if (!brand) return console.log(`no brand ${brandName}`);
  let products = await getAllProducts({ brand_id: brand.id });
  for (const product of products) {
    if (product.categories.includes(catId)) continue;
    await addCatToProduct(product.id, catId);
  }
  console.log("done");
}

const brandName = "FitFlop";
const catId = 457;

addBrandToCat(brandName, catId);
