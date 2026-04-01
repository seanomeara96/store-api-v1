import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { getProductVariants } from "../../functions/products/getProductVariants";
import { Product } from "../../functions/products/Product";
import { updateProduct } from "../../functions/products/updateProduct";
import { allhairCategoryRules } from "./allHairCategoryRules";

async function mapping() {
  try {
    const src: string = "bf";
    const dest: string = "ah";

    require("../../config/config").config(dest);
    // get the destination products
    const destProducts = await getAllProducts();
    destProducts.reverse();
    for (let i = 0; i < destProducts.length; i++) {
      // NOTE: Re-configuring inside the loop suggests global/shared config state.
      // If this script is ever parallelized, these repeated config flips could
      // cause cross-request contamination (src vs dest credentials).
      require("../../config/config").config(dest);
      console.log(i, destProducts.length);
      const destProduct = destProducts[i];

      // we need a sku so we can reference it on the src store
      const variants = await getProductVariants(destProduct.id);

      if (variants.length === 0) {
        console.log(
          `WARNING could not find variants for product: ${destProduct.id}`,
        );
        continue;
      }

      const sku = variants[0].sku;

      require("../../config/config").config(src);
      // get the src product for comparison
      const srcProduct = await getProductBySku(sku);
      if (!srcProduct) {
        console.log(`no product for ${sku}`);
        continue;
      }

      let categories = [...destProduct.categories];
      if (src === "bf" && dest === "ah") {
        categories = bfToAhMapping(destProduct, srcProduct);
      } else if (src === "bf" && dest === "kbsk") {
        categories = updateCategories(
          srcProduct.categories,
          categories,
          bfToKbskMappingTable(),
        );
      } else {
        throw "no mapping logic implemented for these stores";
      }

      require("../../config/config").config(dest);
      // check if any changes have been made to the categories
      // avoid unnecessary api calls
      // NOTE: Only comparing lengths can miss changes where category IDs differ
      // but count stays the same. Consider comparing sets/arrays for equality.
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

function bfToKbskMappingTable(): categoryMap {
  return {
    // Best of K-Beauty
    1159: 25, // Best of K-Beauty
    1160: 26, // COSRX
    1161: 27, // Beauty of Joseon
    1162: 28, // Skin1004
    1163: 29, // LANEIGE
    1164: 30, // VT Cosmetics
    1165: 31, // Some By Mi
    1166: 32, // Medicube

    // Trending Now
    1176: 33, // Trending Now
    1177: 34, // Seoulista
    1178: 35, // Oh K!
    1179: 36, // Biodance
    1180: 37, // Anua
    1181: 38, // Mixsoon
    1182: 39, // Round Lab
    1183: 40, // Axis-Y
    1184: 41, // Haruharu Wonder
    1185: 42, // Dr. Althea

    // Global Favourites
    1186: 43, // Global Favourites
    1187: 44, // Allies of Skin
    1188: 45, // Erborian
    1189: 46, // K-Beauty Bundles
    1190: 47, // KSecret Seoul 1988
    1198: 48, // TirTir
    1199: 49, // Numbuzin

    // K-Beauty Essentials
    1191: 50, // K-Beauty Essentials
    1192: 51, // Moisturisers
    1193: 52, // Cleansers & Makeup Removers
    1194: 53, // Toners & Exfoliators
    1195: 54, // Serums & Boosters
    1196: 55, // Suncare
    1197: 56, // Masks and Peels
  };
}

function bfToAhMapping(destProduct: Product, srcProduct: Product): number[] {
  // make an copy of categories for modification
  // we can check against the original to only update if changes are made
  const categories = allhairCategoryRules(destProduct, [
    ...destProduct.categories,
  ]);

  // NOTE: categories above is currently not used in the return call below.
  // If the intention is to apply allhairCategoryRules before mapping, pass
  // `categories` into updateCategories instead of `destProduct.categories`.
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

  return updateCategories(
    srcProduct.categories,
    destProduct.categories,
    mappingTable,
  );
}

function updateCategories(
  srcCategories: number[],
  destCategories: number[],
  mappingTable: categoryMap,
): number[] {
  // loop through the src product categories and if there is a mapping we
  // apply it to the destination product
  for (const cat of srcCategories) {
    const mappedCat: number | undefined = mappingTable[cat];
    // if there is a mapped category we only want to push it
    // if it does not already exist
    // NOTE: If a mapped category ID could ever be 0, this truthy check would skip it.
    // Using `mappedCat !== undefined` would be safer, but only matters if 0 is valid.
    if (mappedCat && !destCategories.includes(mappedCat)) {
      destCategories.push(mappedCat);
    }
  }
  return destCategories;
}

function pbihMappingTable(): categoryMap {
  // NOTE: This mapping table is currently unused in this file. If it is intended
  // for another (src,dest) pair, ensure there is routing logic in `mapping()`.
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
