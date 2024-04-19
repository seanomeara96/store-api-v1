import path from "path";
import { updateProductVariant } from "./functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "./functions/products/getAllProductVariants";
import { getProductById } from "./functions/products/getProductById";
import { getProductBySku } from "./functions/products/getProductBySKU";
import { updateProduct } from "./functions/products/updateProduct";
import { deleteRedirect } from "./functions/redirects/deleteRedirect";
import { getAllRedirects } from "./functions/redirects/getAllRedirects";
import { output } from "./scripts/utils/output";
require("./config/config").config("ch");
let data = [
  { p_id: 889, sku: "1010" },
  { p_id: 889, sku: "1006" },
  { p_id: 889, sku: "1004" },
  { p_id: 889, sku: "1005" },
  { p_id: 889, sku: "1007" },
  { p_id: 889, sku: "1012" },
  { p_id: 889, sku: "1009" },
  { p_id: 889, sku: "1015" },
  { p_id: 889, sku: "1000" },
  { p_id: 889, sku: "1002" },
  { p_id: 889, sku: "1011" },
  { p_id: 889, sku: "1001" },
  { p_id: 889, sku: "1003" },
  { p_id: 889, sku: "1008" },
  { p_id: 889, sku: "1013" },
  { p_id: 971, sku: "APSC02" },
  { p_id: 971, sku: "APSC01" },
  { p_id: 1225, sku: "VA1001" },
  { p_id: 1225, sku: "VA1000" },
  { p_id: 1227, sku: "VA1002" },
  { p_id: 1227, sku: "VA1003" },
  { p_id: 1229, sku: "VA1004" },
  { p_id: 1229, sku: "VA1005" },
  { p_id: 1229, sku: "VA1007" },
  { p_id: 1229, sku: "VA1006" },
  { p_id: 1233, sku: "VA1009" },
  { p_id: 1233, sku: "VA1008" },
  { p_id: 1235, sku: "VA1011" },
  { p_id: 1235, sku: "VA1010" },
  { p_id: 1237, sku: "VA1015" },
  { p_id: 1237, sku: "VA1016" },
  { p_id: 1237, sku: "VA1017" },
  { p_id: 1237, sku: "VA1018" },
  { p_id: 1237, sku: "VA1019" },
  { p_id: 1245, sku: "GOA0003-1" },
  { p_id: 1245, sku: "GOA0001" },
  { p_id: 1245, sku: "GOA0002" },
  { p_id: 1245, sku: "GOA0004" },
  { p_id: 1245, sku: "GOA0005" },
  { p_id: 1245, sku: "GOA0006" },
  { p_id: 1245, sku: "GOA0007" },
  { p_id: 1252, sku: "GOA0010" },
  { p_id: 1252, sku: "GOA0008" },
  { p_id: 1252, sku: "GOA0009" },
  { p_id: 1252, sku: "GOA0011" },
  { p_id: 1252, sku: "GOA0012" },
  { p_id: 1252, sku: "GOA0013" },
  { p_id: 1252, sku: "GOA0014" },
  { p_id: 1301, sku: "VA1013" },
  { p_id: 1301, sku: "VA1012" },
  { p_id: 1301, sku: "VA1014" },
  { p_id: 1318, sku: "GOA0017" },
  { p_id: 1318, sku: "GOA0015" },
  { p_id: 1318, sku: "GOA0016" },
  { p_id: 1318, sku: "GOA0018" },
  { p_id: 1318, sku: "GOA0019" },
  { p_id: 1318, sku: "GOA0020" },
  { p_id: 1318, sku: "GOA0021" },
  { p_id: 1325, sku: "PRL06" },
  { p_id: 1325, sku: "PRL02" },
  { p_id: 1325, sku: "PRL01" },
  { p_id: 1325, sku: "PRL03" },
  { p_id: 1325, sku: "PRL05" },
  { p_id: 1325, sku: "PRL04" },
  { p_id: 1331, sku: "AQ06" },
  { p_id: 1331, sku: "AQ02" },
  { p_id: 1331, sku: "AQ01" },
  { p_id: 1331, sku: "AQ03" },
  { p_id: 1331, sku: "AQ05" },
  { p_id: 1331, sku: "AQ04" },
  { p_id: 1340, sku: "VV05" },
  { p_id: 1340, sku: "VV20" },
  { p_id: 1340, sku: "3029BLDEEP" },
  { p_id: 1340, sku: "VV06" },
  { p_id: 1340, sku: "3029BLACK" },
  { p_id: 1340, sku: "VV09" },
  { p_id: 1340, sku: "VV21" },
  { p_id: 116, sku: "1000439" },
  { p_id: 116, sku: "1000438" },
  { p_id: 116, sku: "1000446" },
  { p_id: 116, sku: "1000440" },
  { p_id: 116, sku: "1000442" },
  { p_id: 116, sku: "1000443" },
  { p_id: 116, sku: "1000431" },
  { p_id: 116, sku: "1000432" },
  { p_id: 116, sku: "1000434" },
  { p_id: 116, sku: "1000435" },
  { p_id: 116, sku: "1000436" },
  { p_id: 116, sku: "1000441" },
  { p_id: 116, sku: "1000430" },
  { p_id: 144, sku: "1000200" },
  { p_id: 144, sku: "1000208" },
  { p_id: 144, sku: "1000206" },
  { p_id: 144, sku: "1000205" },
  { p_id: 144, sku: "1000202" },
  { p_id: 144, sku: "1000201" },
  { p_id: 144, sku: "1000203" },
  { p_id: 144, sku: "1000207" },
  { p_id: 144, sku: "1000204" },
  { p_id: 144, sku: "1000209" },
  { p_id: 155, sku: "9002" },
  { p_id: 155, sku: "9005" },
  { p_id: 155, sku: "9004" },
  { p_id: 155, sku: "9003" },
  { p_id: 155, sku: "9007" },
  { p_id: 155, sku: "9006" },
  { p_id: 155, sku: "9008" },
  { p_id: 216, sku: "1040" },
  { p_id: 216, sku: "1025" },
  { p_id: 216, sku: "1026" },
  { p_id: 216, sku: "1020" },
  { p_id: 216, sku: "1039" },
  { p_id: 216, sku: "1027L" },
  { p_id: 216, sku: "1030" },
  { p_id: 216, sku: "1029" },
  { p_id: 216, sku: "1021" },
  { p_id: 216, sku: "1023" },
  { p_id: 216, sku: "1024" },
  { p_id: 216, sku: "1027" },
  { p_id: 216, sku: "W011" },
  { p_id: 216, sku: "1038" },
  { p_id: 216, sku: "1022" },
  { p_id: 250, sku: "2009" },
  { p_id: 250, sku: "2002" },
  { p_id: 250, sku: "2005" },
  { p_id: 250, sku: "2004" },
  { p_id: 250, sku: "2012" },
  { p_id: 250, sku: "2013" },
  { p_id: 250, sku: "2003" },
  { p_id: 250, sku: "2007" },
  { p_id: 250, sku: "2006" },
  { p_id: 287, sku: "VGC05" },
  { p_id: 287, sku: "VGC06" },
  { p_id: 287, sku: "VGC04" },
  { p_id: 287, sku: "VGC03" },
  { p_id: 287, sku: "VGC08" },
  { p_id: 287, sku: "VGC01" },
  { p_id: 287, sku: "VGC02" },
  { p_id: 287, sku: "VGC07" },
  { p_id: 302, sku: "1000382" },
  { p_id: 302, sku: "1000390" },
  { p_id: 302, sku: "1000392" },
  { p_id: 302, sku: "1000385" },
  { p_id: 302, sku: "1000388" },
  { p_id: 302, sku: "1000386" },
  { p_id: 302, sku: "1000384" },
  { p_id: 302, sku: "1000340" },
  { p_id: 302, sku: "1000190" },
  { p_id: 302, sku: "1000381" },
  { p_id: 302, sku: "1000383" },
  { p_id: 302, sku: "1000379" },
  { p_id: 302, sku: "1000341" },
  { p_id: 302, sku: "1000389" },
  { p_id: 302, sku: "1000387" },
  { p_id: 302, sku: "1000394" },
  { p_id: 302, sku: "1000393" },
  { p_id: 332, sku: "WN05" },
  { p_id: 332, sku: "WN02" },
  { p_id: 332, sku: "WN01" },
  { p_id: 332, sku: "WN09" },
  { p_id: 332, sku: "WN08" },
  { p_id: 332, sku: "WN07" },
  { p_id: 332, sku: "WN04" },
  { p_id: 332, sku: "WN03" },
  { p_id: 332, sku: "WN06" },
  { p_id: 338, sku: "VV37" },
  { p_id: 338, sku: "VV34" },
  { p_id: 338, sku: "VV36" },
  { p_id: 365, sku: "30" },
  { p_id: 365, sku: "36" },
  { p_id: 365, sku: "29" },
  { p_id: 365, sku: "24" },
  { p_id: 365, sku: "24A" },
  { p_id: 365, sku: "31" },
  { p_id: 365, sku: "24B" },
  { p_id: 365, sku: "34" },
  { p_id: 365, sku: "33" },
  { p_id: 365, sku: "22" },
  { p_id: 365, sku: "27" },
  { p_id: 365, sku: "26" },
  { p_id: 365, sku: "23" },
  { p_id: 365, sku: "28" },
  { p_id: 365, sku: "20" },
  { p_id: 365, sku: "21" },
  { p_id: 365, sku: "35" },
  { p_id: 752, sku: "1031" },
  { p_id: 752, sku: "1036" },
  { p_id: 752, sku: "1033" },
  { p_id: 752, sku: "1034" },
  { p_id: 752, sku: "1035" },
  { p_id: 752, sku: "1037" },
];
async function test() {
  try {
    let collectionIds = [...new Set(data.map((d) => d.p_id))];
    for (const id of collectionIds) {
      await updateProduct(id, { is_visible: false });
    }
  } catch (err: any) {
    console.log(
      err.response ? (err.response.data ? err.response.data : err) : err
    );
  }
}
test();

/**async function test() {
  try {
    const data = [];
    const products = await getAllProducts();
    for (const p of products) {
      try {
        const productVariants = await getProductVariants(p.id);
        if (productVariants.length > 1) {
          for (const v of productVariants) {
            data.push({
              p_id: p.id,
              name: p.name,
              sku: v.sku,
              display_name: v.option_values[0].label,
            });
          }
        }
      } catch (err: any) {
        if (err.status === 404) continue;
        throw err;
      }
    }

    output(path.resolve(__dirname, "ch-vars.csv"), data, true);
  } catch (err) {
    console.log(err);
  }
}

test(); */
