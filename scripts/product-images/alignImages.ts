import { alignImages } from "../../functions/images/alignImages";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";

async function main() {
  try {
    const src = "ch";
    const dest = "ha";

    /* silver rim, gold rim, jasper conran, meditaranian */
    const skus = [
      { sku: "1227" },
      { sku: "HAMP01" },
      { sku: "CRB001-1000665" },
      { sku: "AS0005" },
      { sku: "BR0005" },
      { sku: "MK0001" },
    ];

    const seen: number[] = [];
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
      if (seen.includes(destProductID)) continue;
      await alignImages(src, dest, srcProductID, destProductID);
      seen.push(destProductID);
      await delay(3000);
    }
  } catch (err) {
    console.log(err);
  }
}
main();

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

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
