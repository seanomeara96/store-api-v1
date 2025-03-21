import { getAllProducts } from "../../functions/products/getAllProducts";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { getProductVariants } from "../../functions/products/getProductVariants";
import { updateProduct } from "../../functions/products/updateProduct";

async function mapCategories() {
  try {
    const mappingTable = [
      {
        "bf ID": 12,
        "bf Category Name": "Hair",
        "ah ID": 235,
        "ah Category Name": "Hair Products",
      },
      {
        "bf ID": 35,
        "bf Category Name": "Hair => Hair Products => Shampoo",
        "ah ID": 236,
        "ah Category Name": "Hair Products => Shampoo",
      },
      {
        "bf ID": 36,
        "bf Category Name": "Hair => Hair Products => Conditioner",
        "ah ID": 237,
        "ah Category Name": "Hair Products => Conditioner",
      },
      {
        "bf ID": 37,
        "bf Category Name": "Hair => Hair Products => Treatments",
        "ah ID": 239,
        "ah Category Name": "Hair Products => Hair Masks",
      },
      {
        "bf ID": 38,
        "bf Category Name": "Hair => Hair Products => Oils",
        "ah ID": 241,
        "ah Category Name": "Hair Products => Hair Oil",
      },
      {
        "bf ID": 39,
        "bf Category Name": "Hair => Hair Products => Styling",
        "ah ID": 173,
        "ah Category Name": "Hair Products => Styling",
      },
      {
        "bf ID": 296,
        "bf Category Name": "Hair => Hair Health => Hair Loss & Thinning",
        "ah ID": 178,
        "ah Category Name": "Hair Type & Treatments => Hair Loss or Thinning",
      },
      {
        "bf ID": 410,
        "bf Category Name": "Brands => Professional Brands => Moroccanoil",
        "ah ID": 142,
        "ah Category Name": "Brands => Moroccanoil",
      },
      {
        "bf ID": 413,
        "bf Category Name": "Brands => Professional Brands => Kérastase",
        "ah ID": 215,
        "ah Category Name": "Brands => Kerastase",
      },
      {
        "bf ID": 414,
        "bf Category Name": "Brands => Professional Brands => Redken",
        "ah ID": 214,
        "ah Category Name": "Brands => Redken",
      },
      {
        "bf ID": 419,
        "bf Category Name": "Brands => Shop All Brands => Pureology",
        "ah ID": 131,
        "ah Category Name": "Brands => Pureology",
      },
      {
        "bf ID": 663,
        "bf Category Name": "New & Trending => Routines & Bundles",
        "ah ID": 193,
        "ah Category Name": "Special Offers",
      },
      {
        "bf ID": 723,
        "bf Category Name": "Hair => Special Offers => Haircare Gift Sets",
        "ah ID": 225,
        "ah Category Name": "Winter Sale => All Gift Sets",
      },
      {
        "bf ID": 982,
        "bf Category Name": "Hair => Special Offers => Haircare Bundles",
        "ah ID": 193,
        "ah Category Name": "Special Offers",
      },
    ];
    require("../../config/config").config("ah");
    const ahProducts = (await getAllProducts({ "categories:in": 190 })).filter(
      (p) =>
        !p.categories.includes(213) &&
        !p.name.toLowerCase().includes("gwp") &&
        !p.name.toLowerCase().includes("gloss absolu") &&
        !p.name.toLowerCase().includes("color spectrum") &&
        !p.name.toLowerCase().includes("24/7") &&
        p.categories.length == 1
    );
    for (let i = 0; i < ahProducts.length; i++) {
      console.log(i, ahProducts.length);
      const product = ahProducts[i];
      const variants = await getProductVariants(product.id);
      const sku = variants[0].sku;
      require("../../config/config").config("bf");
      const bfProduct = await getProductBySku(sku);
      if (!bfProduct) {
        console.log(`no product for ${sku}`);
        continue;
      }
      for (const cat of bfProduct.categories) {
        const mappedCat = mappingTable.find((row) => row["bf ID"] === cat);
        if (mappedCat) {
          product.categories.push(mappedCat["ah ID"]);
        }
      }
      require("../../config/config").config("ah");
      await updateProduct(product.id, {
        categories: product.categories,
        is_visible: true,
      });
      console.log(
        `https://store-d5068dtk11.mybigcommerce.com/manage/products/${product.id}/edit`
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export const pbihMappingTable: { [key: number]: number } = {
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

async function mapIHPB() {
  try {
    require("../../config/config").config("pb");
    const destProducts = await getAllProducts();
    for (let i = 0; i < destProducts.length; i++) {
      require("../../config/config").config("pb");
      console.log(i, destProducts.length);
      const destProduct = destProducts[i];
      const categories = [...destProduct.categories]
      const variants = await getProductVariants(destProduct.id);
      const sku = variants[0].sku;
      require("../../config/config").config("ih");
      const srcProduct = await getProductBySku(sku);
      if (!srcProduct) {
        console.log(`no product for ${sku}`);
        continue;
      }
      for (const cat of srcProduct.categories) {
        const mappedCat: number | undefined = pbihMappingTable[cat];
        if (mappedCat) {
          categories.push(mappedCat);
        }
      }
      require("../../config/config").config("pb");
      if(destProduct.categories.length !== categories.length){
        await updateProduct(destProduct.id, {
          categories: categories,
          is_visible: true,
        });
      }
      console.log(
        `https://store-5rdxj17.mybigcommerce.com/manage/products/${destProduct.id}/edit`
      );
    }
  } catch (err) {
    console.log(err);
  }
}

mapIHPB();
