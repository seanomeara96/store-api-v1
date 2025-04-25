import { getNumberOfImages } from "../../functions/images/getNumberOfImages";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { output } from "../utils/output";
import path from "path"

async function numberOfImagesPerProduct() {
  require("../../config/config").config("ih");

  try {
    const data: any[] = []
    const products = await getAllProducts();
    for(const {id, name, sku} of products){
      const imageCount = await getNumberOfImages(id)
      data.push({
        id,
        name,
        sku,
        "#images": imageCount['#images'],
      })
    }

    output(path.resolve(__dirname, "imagesPerProduct.csv"), data, true);
  } catch {
    console.log("somehting went wrong");
  }
}
numberOfImagesPerProduct();
