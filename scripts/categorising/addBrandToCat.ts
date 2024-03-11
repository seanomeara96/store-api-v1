require("../../config/config").config("bf");
import { getBrandByName } from "../../functions/brands/getBrandByName";
import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getAllProducts } from "../../functions/products/getAllProducts";

async function addBrandToCat(brandName: string, catId: number) {
  const brand = await getBrandByName(brandName)
  if (!brand) return
  let products = await getAllProducts({brand_id: brand.id})
  for(const product of products){
    await addCatToProduct(product.id, catId);
  }
  console.log("done");
}

const brandName = "Alfaparf";
const catId = 640;

addBrandToCat(brandName, catId);
