import { deleteProduct } from "../../functions/products/deleteProduct";
import { getProductIdFromSku } from "../../functions/products/getProductIdFromSku";

async function deleteBySKU() {
  try {
    const data = [
      { SKU: "9004A" },
      { SKU: "9005A" },
      { SKU: "9006A" },
      { SKU: "9007A" },
      { SKU: "9003A" },
      { SKU: "9002A" },
      { SKU: "9008A" },
      { SKU: "VA1002A" },
      { SKU: "VA1003A" },
      { SKU: "VA1000A" },
      { SKU: "VA1001A" },
      { SKU: "VA1004A" },
      { SKU: "VA1005A" },
      { SKU: "VA1006A" },
      { SKU: "VA1007A" },
      { SKU: "1000205A" },
      { SKU: "1000206A" },
      { SKU: "1000204A" },
      { SKU: "1000207A" },
      { SKU: "1000208A" },
      { SKU: "1000203A" },
      { SKU: "1000209A" },
      { SKU: "1000200A" },
      { SKU: "1000201A" },
      { SKU: "1000202A" },
      { SKU: "1237-DI" },
      { SKU: "1237-DI-1" },
      { SKU: "1237-DI-1-1" },
      { SKU: "1237-DI-1-1-1" },
      { SKU: "1237-DI-1-1-1-1" },
      { SKU: "PRL04A" },
      { SKU: "PRL05A" },
      { SKU: "PRL01A" },
      { SKU: "PRL02A" },
      { SKU: "PRL03A" },
      { SKU: "PRL06A" },
      { SKU: "VV37A" },
      { SKU: "338-DI" },
      { SKU: "VV34A" },
      { SKU: "VV36A" },
      { SKU: "VA1008A" },
      { SKU: "VA1009A" },
      { SKU: "VA1010A" },
      { SKU: "VA1011A" },
      { SKU: "WN02A" },
      { SKU: "WN01A" },
      { SKU: "WN04A" },
      { SKU: "WN03A" },
      { SKU: "WN07A" },
      { SKU: "WN05A" },
      { SKU: "WN06A" },
      { SKU: "WN08A" },
      { SKU: "WN09A" },
      { SKU: "TMP081030" },
      { SKU: "DAH10-Round" },
      { SKU: "DAH10-Rect" },
      { SKU: "CH20PLATINUM" },
      { SKU: "TRANS01" },
      { SKU: "FIJI01" },
    ];
    let toDelete:number[]  = []
    require("../../config/config").config("ch");
    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const {SKU} = data[i]
      try {
        const id = await  getProductIdFromSku(SKU)
        if(id ) toDelete.push(id)
      } catch {
        continue
      }
    }
    toDelete = Array.from(new Set(toDelete))
    for(const d of toDelete){
        await deleteProduct(d)
    }
    console.log(`all deleted`)
  } catch (err) {
    console.log(err);
  }
}
deleteBySKU();
