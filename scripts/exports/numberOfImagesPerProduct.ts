import { getNumberOfImages } from "../../functions/images/getNumberOfImages";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { output } from "../utils/output";
import path from "path";

async function numberOfImagesPerProduct() {
  require("../../config/config").config("ih");

  try {
    const data: any[] = [];
    const products = await getAllProducts();
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const imageCount = await getNumberOfImages(product.id);
      data.push({
        id: product.id,
        name: product.name,
        sku: product.sku,
        "#images": imageCount["#images"],
      });
    }

    output(path.resolve(__dirname, "imagesPerProduct.csv"), data, true);
  } catch {
    console.log("somehting went wrong");
  }
}
numberOfImagesPerProduct();
