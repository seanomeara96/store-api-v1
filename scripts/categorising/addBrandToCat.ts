import { getBrandByName } from "../../functions/brands/getBrandByName";
import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getAllProducts } from "../../functions/products/getAllProducts";

require("../../config/config").config("bf");

async function addBrandToCat(brandName: string, catId: number) {
  const brand = await getBrandByName(brandName);
  if (!brand) return console.log(`no brand ${brandName}`);
  let products = await getAllProducts({ brand_id: brand.id });
  for (const product of products) {
    // skip if already applied
    if (product.categories.includes(catId)) continue;

    await addCatToProduct(product.id, catId);
  }
  console.log("done");
}

async function main() {
  const catId = 1057;

  for(const brandName of [
    "L'Oréal Professionnel",
]){
    await addBrandToCat(brandName, catId);
  }
}

main()
