import { deleteProduct } from "../../functions/products/deleteProduct";
import { getProductIdFromSku } from "../../functions/products/getProductIdFromSku";

async function deleteBySKU() {
  try {
    const data = [
      { SKU: "DAH10-Rect" },
      { SKU: "CH20PLATINUM" },
      { SKU: "TRANS01" },
      { SKU: "FIJI01" },
    ];
    let toDelete: number[] = [];
    const configModule = require("../../config/config");
    configModule.config("ch");
    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const { SKU } = data[i];
      try {
        const id = await getProductIdFromSku(SKU);
        if (id) toDelete.push(id);
      } catch {
        continue;
      }
    }
    toDelete = Array.from(new Set(toDelete));
    for (const d of toDelete) {
      await deleteProduct(d);
    }
    console.log(`all deleted`);
  } catch (err) {
    console.log(err);
  }
}
deleteBySKU();
