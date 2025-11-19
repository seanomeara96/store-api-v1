import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { getProductVariants } from "../../functions/products/getProductVariants";
import { Product } from "../../functions/products/Product";
import { updateProduct } from "../../functions/products/updateProduct";
import { allhairCategoryRules } from "./allHairCategoryRules";

async function mapping() {
  try {
    const src = "bf";
    const dest = "ah";

    require("../../config/config").config(dest);
    // get the destination products
    const destProducts = await getAllProducts();
    destProducts.reverse();
    for (let i = 0; i < destProducts.length; i++) {
      require("../../config/config").config(dest);
      console.log(i, destProducts.length);
      const destProduct = destProducts[i];

      // we need a sku so we can reference it on the src store
      const variants = await getProductVariants(destProduct.id);
      const sku = variants[0].sku;
      require("../../config/config").config(src);
      // get the src product for comparison
      const srcProduct = await getProductBySku(sku);
      if (!srcProduct) {
        console.log(`no product for ${sku}`);
        continue;
      }

      let categories = destProduct.categories;
      if (src === "bf" && dest === "ah") {
        categories = bfToAhMapping(destProduct, srcProduct)
      } else {
        throw "no mapping logic implemented for these stores"
      }

      require("../../config/config").config(dest);
      // check if any changes have been made to the categories
      // avoid unnecessary api calls
      if (destProduct.categories.length !== categories.length) {
        await updateProduct(destProduct.id, {
          categories,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

mapping();

interface categoryMap {
  [key: number]: number;
}

function bfToAhMapping(
  destProduct: Product,
  srcProduct: Product
): number[] {
  // make an copy of categories for modification
  // we can check against the original to only update if changes are made
  const categories = allhairCategoryRules(destProduct, [...destProduct.categories]);

  const mappingTable: categoryMap = {
    12: 235,
    35: 236,
    36: 237,
    37: 239,
    38: 241,
    39: 173,
    296: 178,
    410: 142,
    413: 215,
    414: 214,
    419: 131,
    663: 193,
    723: 225,
    982: 193,
  };

  // loop through the src product categories and if there is a mapping we
  // apply it to the destination product
  for (const cat of srcProduct.categories) {
    const mappedCat: number | undefined = mappingTable[cat];
    // if there is a mapped category we only want to push it
    // if it does not already exist
    if (mappedCat && !categories.includes(mappedCat)) {
      categories.push(mappedCat);
    }
  }

  return categories;
}

function pbihMappingTable(): categoryMap {
  return {
    970: 130,
    975: 189,
    983: 205,
    1031: 186,
    1045: 193,
    1048: 209,
    1085: 194,
    1113: 190,
    1118: 217,
    1120: 210,
    1131: 195,
    1142: 211,
    1159: 196,
    1168: 212,
    1170: 197,
    1195: 213,
    1208: 202,
    1214: 218,
    1216: 203,
    1241: 198,
    1256: 219,
    1289: 206,
    1300: 214,
    1310: 199,
    1312: 215,
    1333: 204,
    1369: 200,
    1405: 191,
    1441: 207,
    1442: 216,
    1443: 192,
    1444: 201,
    1445: 208,
  };
}
