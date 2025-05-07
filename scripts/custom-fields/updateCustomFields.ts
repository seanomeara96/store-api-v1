
import { getCustomField } from "../../functions/custom-fields/getCustomField";
import { updateCustomField } from "../../functions/custom-fields/updateCustomField";


const data = [];

async function test() {
  try {
    require("./config/config").config("ha");
    for(let i = 0; i < data.length; i++){
      const row = data[i]
      const cf = await getCustomField(row.product_id, row.fieldID)
      await updateCustomField(row.product_id, row.fieldID, cf.name, row.fieldValue)
    }
  } catch (err: any) {
    console.log(err.response.data ?? err.response ?? err);
  }
}
test();