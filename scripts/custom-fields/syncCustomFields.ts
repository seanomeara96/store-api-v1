import { applyCustomField } from "../../functions/custom-fields/applyCustomField";
import { getCustomFields } from "../../functions/custom-fields/getCustomFields";
import { getProductBySku } from "../../functions/products/getProductBySKU";

const rows = `LO72A
1084E
BARSTR
VV30
1000537B
1000537BACK
904UB
673
675
677
672LG
673LG
674L
675LG
676L
677L
409GAS
2008
885
737
1000750
1000575B
10007868A
1000660
SP002
1000182
PICKET1
PICKET2
SSFS0010A
1000905S
924B
1000809
3607
245A
415BL
465A
237
1000474A
886
KILNER001
464
KILNER005
172
AFT2
409GAS12
409GAS20
NOTB
LO72B
WHB001
ALASKA1A
704
1000016A
910C
1000116A
206S
210
669
121WH
1000356
953
984IN
950
1000324
F028
F020
300
1000365
3031B
ALICE0025
LOCK04
FB0001
547
550
575A
K02
POD12`.split("\n");

async function syncCustomFields() {
  try {
    for (let i = 26; i < rows.length; i++) {
      await new Promise((res) => setTimeout(res, 2000));
      require("../../config/config").config("ch");
      console.log(i, rows.length);
      const sku = rows[i].trim();
      console.log(sku);
      const srcProduct = await getProductBySku(sku);
      if (!srcProduct) {
        console.log(`no product for ${sku} on caterhire`);
        continue;
      }
      const customFields = await getCustomFields(srcProduct.id);
      require("../../config/config").config("ha");
      const destProduct = await getProductBySku(sku);
      if (!destProduct) {
        console.log(`no product for ${sku} on hireall`);
        continue;
      }
      for (const field of customFields) {
        try {
          await applyCustomField(destProduct.id, field.name, field.value);
        } catch (err: any) {
          if (err?.response?.data?.title?.includes("already exists")) continue;
          throw err;
        }
      }
    }
  } catch (err: any) {
    console.log(err.response ? err.response.data : err);
  }
}
syncCustomFields();
