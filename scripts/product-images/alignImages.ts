import { alignImages } from "../../functions/images/alignImages";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";

async function main() {
  try {
    const src = "ch";
    const dest = "ha";

    /* silver rim, gold rim, jasper conran, meditaranian */
    const skus = [
      { sku: "333A" },
      { sku: "1000999" },
      { sku: "1000536" },
      { sku: "FB07" },
      { sku: "FB06" },
      { sku: "PADBLUE01" },
      { sku: "IL08" },
      { sku: "1000565" },
      { sku: "BTWOOD" },
      { sku: "AURORAWH" },
      { sku: "SL1008" },
      { sku: "1000546" },
      { sku: "1000937" },
      { sku: "FB08" },
      { sku: "F018" },
      { sku: "1000691" },
      { sku: "PADRED01" },
      { sku: "CH01" },
      { sku: "CHST" },
      { sku: "1000550" },
      { sku: "OH02" },
      { sku: "1000150" },
      { sku: "1000567" },
      { sku: "1000797" },
      { sku: "SL1010" },
      { sku: "1000583" },
      { sku: "1000547" },
      { sku: "IL10" },
      { sku: "IL07" },
      { sku: "SL1011" },
      { sku: "SL1009" },
      { sku: "F001" },
      { sku: "11181W" },
      { sku: "1000569" },
      { sku: "1000572" },
      { sku: "1000564" },
      { sku: "SL1014" },
      { sku: "BS1001" },
      { sku: "1000546A" },
      { sku: "CRY01" },
      { sku: "F002" },
      { sku: "SL1013" },
      { sku: "BS1000" },
      { sku: "FB09" },
      { sku: "SL1012" },
      { sku: "FB03" },
      { sku: "1000584" },
      { sku: "R003" },
      { sku: "269" },
      { sku: "1084D" },
      { sku: "1000552" },
      { sku: "371" },
      { sku: "370" },
      { sku: "ALICE0017" },
      { sku: "ALICE0026" },
      { sku: "ALICE0027" },
      { sku: "ALICE0024" },
      { sku: "1083B" },
      { sku: "1083C" },
      { sku: "1083D" },
      { sku: "1083E" },
      { sku: "FLOW15" },
      { sku: "FLOW16" },
      { sku: "FLOW08" },
      { sku: "1000690" },
      { sku: "1000692" },
      { sku: "AURBL" },
      { sku: "BARWOOD" },
      { sku: "F016" },
      { sku: "F015" },
      { sku: "F017" },
      { sku: "F019" },
      { sku: "F025" },
      { sku: "F018A" },
      { sku: "ST001" },
      { sku: "PALMCOF" },
      { sku: "BS1003" },
      { sku: "VOLTW" },
      { sku: "VOLTBCH" },
      { sku: "BS1004" },
      { sku: "210224" },
      { sku: "230224" },
      { sku: "1083" },
      { sku: "LECARM" },
      { sku: "HAMP01" },
      { sku: "CRB001" },
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
