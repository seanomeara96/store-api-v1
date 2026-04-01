import { deleteProduct } from "../../functions/products/deleteProduct";
import { getProductIdFromSku } from "../../functions/products/getProductIdFromSku";
import { getProductVariants } from "../../functions/products/getProductVariants";
require("../../config/config").config("ah");
async function deleteBySKU() {
  try {
    const data = [
      "6342",
      "MOR_MO0079",
      "6194",
      "6746",
      "6481",
      "6965",
      "6962",
      "6966",
      "6967",
      "6963",
      "6968",
      "6995",
      "6973",
      "6972",
      "6974",
      "6862",
      "6866",
      "6863",
      "7498",
      "7541",
      "7605",
      "7606",
      "7607",
      "7490",
      "7178",
      "7544",
      "7218",
      "7540",
      "7790",
      "7670",
      "7691",
      "7816",
      "7819",
      "7870",
      "7871",
      "7872",
      "7873",
      "KER_4402316",
      "MOR_MO0044",
      "KER_E1053700",
      "KER_E1100401",
      "5015",
      "5689",
      "6140",
      "KER_4402206",
      "7859",
      "7867",
      "KER_E1054100",
      "9695",
      "10240",
      "10241",
      "10242",
      "10247",
      "10249",
      "10250",
      "10252",
      "10415",
      "10413",
      "10418",
      "10574",
      "11046",
      "11518",
      "11528",
      "11529",
      "11530",
      "11531",
      "11202",
      "11203",
      "13248",
      "13253",
      "11171a",
      "11262",
      "11822",
      "11827",
      "13291",
      "13490",
      "13540",
      "13553",
      "13856",
      "13962",
      "13963",
      "13964",
      "13965",
      "13966",
      "14228",
      "14474",
      "14475",
      "14766",
      "20243",
      "20244",
      "20245",
      "20246",
      "20247",
      "20248",
      "20249",
      "20250",
      "20251",
      "20252",
      "20253",
      "20256",
      "20257",
      "20258",
      "20259",
      "20260",
      "20261",
      "20262",
      "20263",
      "20264",
      "20265",
      "20266",
      "20491",
      "20481",
      "20472",
      "20595",
      "20551",
      "20606",
      "20607",
      "20463",
      "100125",
      "20799",
      "20801",
      "20800",
      "21446",
      "21452",
      "21606",
      "21608",
      "21743",
      "22308",
      "22307",
      "22305",
      "22412",
      "22411",
      "22410",
      "22409",
      "22405",
      "22404",
      "22400",
      "22397",
      "22448",
      "22450",
      "22451",
      "22452",
    ];
    let toDelete: number[] = [];

    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const SKU = data[i];
      try {
        const id = await getProductIdFromSku(SKU);
        if (id) {
          let okToDelete = true;
          const variants = await getProductVariants(id);
          for (const variant of variants) {
            if (variant.inventory_level) okToDelete = false;
          }
          if (okToDelete) toDelete.push(id);
        }
      } catch {
        continue;
      }
    }
    toDelete = Array.from(new Set(toDelete));
    for (const d of toDelete) {
      await new Promise((res) => setTimeout(res, 1500));
      await deleteProduct(d);
    }
    console.log(`all deleted`);
  } catch (err) {
    console.log(err);
  }
}
deleteBySKU();
