import { getBrandByName } from "../../functions/brands/getBrandByName";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { updateProduct } from "../../functions/products/updateProduct";

async function cap() {
  try {
    for (const brandName of [
      "L'Oréal Professionnel",
      "Pureology",
      "Redken",
      "Matrix",
      "Biolage",
    ]) {
      require("../../config/config").config("ah");

      const brand = await getBrandByName(brandName);
      if (!brand) {
        throw `no brand match ${brandName}`;
      }

      const products = await getAllProducts({ brand_id: brand.id });
      for (const product of products) {
        if (product.order_quantity_maximum !== 5)
          await updateProduct(product.id, { order_quantity_maximum: 5 });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
cap();
