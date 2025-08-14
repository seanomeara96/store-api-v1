import { alignImages } from "../../functions/images/alignImages";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";

async function main() {
  try {
    const src = "ch";
    const dest = "ha";

    /* silver rim, gold rim, jasper conran, meditaranian */
    const skus = [
      {
        sku: "W011",
      },
      {
        sku: "JASP1",
      },
      {
        sku: "JASP2",
      },
      {
        sku: "JASP3",
      },
      {
        sku: "VA1011",
      },
      {
        sku: "VA1011",
      },
    ];
    for (let i = 0; i < skus.length; i++) {
      console.log(i, skus.length);
      const { sku } = skus[i];
      let [srcProductID, destProductID] = [0, 0];
      try {
        [srcProductID, destProductID] = await getProductIds(sku, src, dest);
      } catch (err) {
        console.log(err);
        continue;
      }
      if (!srcProductID || !destProductID) {
        throw new Error("Expected an id for both src and dest product");
      }
      await alignImages(src, dest, srcProductID, destProductID);
      await new Promise((res) => setTimeout(res, 3000));
    }
  } catch (err) {
    console.log(err);
  }
}
main();

async function getProductIdForSKU(sku: string) {
  try {
    const vars = await getAllProductVariants({ sku: sku });
    if (!vars.length) {
      throw new Error(`Expected sku ${sku} to return variants`);
    }

    return vars[0].product_id;
  } catch (err) {
    throw err;
  }
}

async function getProductIds(sku: string, src: string, dest: string) {
  require("../../config/config").config(src);
  const srcProductID = await getProductIdForSKU(sku);

  require("../../config/config").config(dest);
  const destProductID = await getProductIdForSKU(sku);

  return [srcProductID, destProductID];
}
