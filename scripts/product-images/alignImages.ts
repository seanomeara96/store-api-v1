import { alignImages } from "../../functions/images/alignImages";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";

async function main() {
  try {
    const src = "ch";
    const dest = "ha";

    /* silver rim, gold rim, jasper conran, meditaranian */
    const skus = [
      { sku: "1227" },
      { sku: "Chest04" },
      { sku: "LO66" },
      { sku: "Chest02" },
      { sku: "PADBLUE01" },
      { sku: "1000565-1000664" },
      { sku: "BTWOOD-1000664" },
      { sku: "1000546-1000664" },
      { sku: "F018" },
      { sku: "PADRED01" },
      { sku: "LO64" },
      { sku: "OH02" },
      { sku: "1000567-1000664" },
      { sku: "IL21" },
      { sku: "BA03" },
      { sku: "1000547" },
      { sku: "F001-F014" },
      { sku: "1216" },
      { sku: "LO65" },
      { sku: "1239" },
      { sku: "1203" },
      { sku: "1000564-1000664" },
      { sku: "1000546A-1000664" },
      { sku: "CRY01" },
      { sku: "F002-F004A" },
      { sku: "1235" },
      { sku: "BA02" },
      { sku: "BA01" },
      { sku: "1205" },
      { sku: "R003" },
      { sku: "F016" },
      { sku: "F015" },
      { sku: "F017" },
      { sku: "F019" },
      { sku: "F025" },
      { sku: "F018A" },
      { sku: "ALASKA2" },
      { sku: "FURN0162" },
      { sku: "FURN0180" },
      { sku: "FURN0195" },
      { sku: "ST001" },
      { sku: "VOLTBCH" },
      { sku: "CAPARNV" },
      { sku: "CAPARGR" },
      { sku: "CAPARMS" },
      { sku: "CAPARMK" },
      { sku: "230224 & RONDA01" },
      { sku: "1075" },
      { sku: "1099CW" },
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
