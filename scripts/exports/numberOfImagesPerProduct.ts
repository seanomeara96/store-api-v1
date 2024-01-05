require("../config/config").config("bf");
import { getNumberOfImages } from "../../functions/images/getNumberOfImages";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { output } from "../utils/output";
async function numberOfImagesPerProduct() {
  try {
    const data: any[] = []
    const products = await getAllProducts();
    for(const {id, name, sku} of products){
      const imageCount = await getNumberOfImages(id)
      data.push({
        id,
        name,
        sku,
        "#images": imageCount,
      })
    }

    output("imagesPerProduct", data, true);
  } catch {
    console.log("somehting went wrong");
  }
}
numberOfImagesPerProduct();
