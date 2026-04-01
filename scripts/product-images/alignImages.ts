import { alignImages } from "../../functions/images/alignImages";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";

async function main() {
  try {
    const src = "bf";
    const dest = "ih";

    const skus = [
      "100114",
      "100107",
      "100103",
      "100101",
      "100136",
      "100117",
      "100100",
      "100119",
      "100106",
      "100102",
      "100115",
      "9963",
      "10570",
      "10571",
      "10572",
      "10573",
    ].map((sku) => ({ sku: sku.trim() }));

    const seen: number[] = [];
    for (let i = 0; i < skus.length; i++) {
      await delay(1000);
      console.log(i, skus.length);
      const { sku } = skus[i];
      let [srcProductID, destProductID] = [0, 0];
      await delay(1000);
      try {
        [srcProductID, destProductID] = await getProductIds(sku, src, dest);
      } catch (err) {
        console.log(err);
        continue;
      }
      if (!srcProductID || !destProductID) {
        throw new Error("Expected an id for both src and dest product");
      }
      await delay(1000);
      if (seen.includes(destProductID)) continue;
      await alignImages(src, dest, srcProductID, destProductID);
      seen.push(destProductID);
      await delay(1000);
    }
  } catch (err: any) {
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
