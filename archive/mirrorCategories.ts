import { addCatToProduct } from "../functions/products/addCatToProduct";
import { getAllProducts } from "../functions/products/getAllProducts";
import { getProductBySku } from "../functions/products/getProductBySKU";
import { getProductIdFromSku } from "../functions/products/getProductIdFromSku";
import { getProductVariants } from "../functions/products/getProductVariants";
import { Product } from "../functions/products/Product";
/**
 * needed to get products from a category on beautyskincare and map them to an equivalent category on pixieloves
 */

const src = "bf";
const dest = "kbsk";

async function main() {
  try {
    const data: { [key: number]: number } = {
      "1135": 24,
      "1159": 25,
      "1160": 26,
      "1161": 27,
      "1162": 28,
      "1163": 29,
      "1164": 30,
      "1165": 31,
      "1166": 32,
      "1176": 33,
      "1177": 34,
      "1178": 35,
      "1179": 36,
      "1180": 37,
      "1181": 38,
      "1182": 39,
      "1183": 40,
      "1184": 41,
      "1185": 42,
      "1186": 43,
      "1187": 44,
      "1188": 45,
      "1189": 46,
      "1190": 47,
      "1191": 50,
      "1192": 51,
      "1193": 52,
      "1194": 53,
      "1195": 54,
      "1196": 55,
      "1197": 56,
      "1198": 48,
      "1199": 49,
    };

    for (const src_id_key in data) {
      require("../config/config").config(src);
      const srcSKUs = [];

      const products = await getAllProducts({
        "categories:in": src_id_key,
      });

      for (let i = 0; i < products.length; i++) {
        const product = products[i];

        console.log(`getting variants for ${i}/${products.length}`);

        const variants = (await getProductVariants(product.id)) as any[];
        for (let ii = 0; ii < variants.length; ii++) {
          const variant = variants[ii];
          srcSKUs.push(variant.sku);
        }
      }

      const uniqueSrcSKUs = [...new Set(srcSKUs)];

      require("../config/config").config(dest);

      for (let iii = 0; iii < uniqueSrcSKUs.length; iii++) {
        const sku = uniqueSrcSKUs[iii];

        let product: Product | undefined;

        try {
          product = await getProductBySku(sku);
        } catch (err) {
          continue;
        }

        if (!product) continue;

        console.log(`adding category to product ${product.name}`);

        const dest_id = data[src_id_key];
        try {
          await addCatToProduct(product.id, dest_id);
        } catch (err) {
          console.log(`error adding cat id ${dest_id} to ${product.name}`);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}
main();
