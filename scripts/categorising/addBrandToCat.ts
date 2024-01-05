require("../../config/config").config("bf");
import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getProductsByBrand } from "../../functions/products/getProductsByBrand";

async function addBrandToCat(brandName: string, catId: number) {
  let products = await getProductsByBrand(brandName);
  for(const product of products){
    await addCatToProduct(product.id, catId);
  }
  console.log("done");
}

const brandName = "L'Oreal";
const catId = 640;

addBrandToCat(brandName, catId);
