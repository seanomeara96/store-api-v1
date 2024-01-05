const store = "bf";
require("../../config/config").config(store);
import { output } from "../utils/output";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getCustomFields } from "../../functions/custom-fields/getCustomFields";
import { getBrandById } from "../../functions/brands/getBrandById";
async function main() {
  const products = await getAllProducts().catch(console.log);

  if (!products) {
    return;
  }

const essentialDetails = []
  for(const product of products){
    const customFields = await getCustomFields(product.id)
    const brand = await getBrandById(product.brand_id)
    essentialDetails.push({
      id: product.id,
      sku: product.sku,
      name: product.name,
      brand: brand.name,
      filters: customFields,
    })
  }

  console.log(essentialDetails);

  //await output(`${store}-product-filters`, filterDocs).catch(console.log);
}
main();
