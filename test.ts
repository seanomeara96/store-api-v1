
import { getCustomField } from "./functions/custom-fields/getCustomField";
import { updateCustomField } from "./functions/custom-fields/updateCustomField";


const data = [
  { product_id: 332, fieldID: 7757, fieldValue: "White" },
  { product_id: 1096, fieldID: 7760, fieldValue: "10 per case" },
  { product_id: 1096, fieldID: 7761, fieldValue: "White" },
  { product_id: 1097, fieldID: 7767, fieldValue: "White" },
  { product_id: 1098, fieldID: 7773, fieldValue: "White" },
  { product_id: 1099, fieldID: 7779, fieldValue: "10 per case" },
  { product_id: 1099, fieldID: 7780, fieldValue: "White" },
  { product_id: 1100, fieldID: 7787, fieldValue: "10 per case" },
  { product_id: 1100, fieldID: 7788, fieldValue: "White" },
  { product_id: 1273, fieldID: 7794, fieldValue: "1 per case" },
  { product_id: 1273, fieldID: 7795, fieldValue: "White" },
  { product_id: 1274, fieldID: 7799, fieldValue: "10 per case" },
  { product_id: 1274, fieldID: 7800, fieldValue: "White" },
  { product_id: 1275, fieldID: 7805, fieldValue: "10 per case" },
  { product_id: 1275, fieldID: 7806, fieldValue: "White" },
  { product_id: 1276, fieldID: 7812, fieldValue: "10 per case" },
  { product_id: 1276, fieldID: 7813, fieldValue: "White" },
  { product_id: 1277, fieldID: 7819, fieldValue: "10 per case" },
  { product_id: 1277, fieldID: 7820, fieldValue: "White" },
  { product_id: 1278, fieldID: 7825, fieldValue: "10 per case" },
  { product_id: 1278, fieldID: 7826, fieldValue: "White" },
  { product_id: 1279, fieldID: 7831, fieldValue: "10 per case" },
  { product_id: 1279, fieldID: 7832, fieldValue: "White" },
  { product_id: 1280, fieldID: 7837, fieldValue: "10 per case" },
  { product_id: 1280, fieldID: 7838, fieldValue: "White" },
  { product_id: 1281, fieldID: 7843, fieldValue: "10 per pack" },
  { product_id: 1281, fieldID: 7844, fieldValue: "White" },
  { product_id: 1282, fieldID: 7849, fieldValue: "10 per case" },
  { product_id: 1282, fieldID: 7850, fieldValue: "White" },
  { product_id: 1283, fieldID: 7855, fieldValue: "10 per case" },
  { product_id: 1283, fieldID: 7856, fieldValue: "White" },
  { product_id: 1284, fieldID: 7860, fieldValue: "10 per case" },
  { product_id: 1284, fieldID: 7861, fieldValue: "White" },
  { product_id: 1285, fieldID: 7866, fieldValue: "10 per case" },
  { product_id: 1285, fieldID: 7867, fieldValue: "White" },
  { product_id: 1286, fieldID: 7872, fieldValue: "10 per case" },
  { product_id: 1286, fieldID: 7873, fieldValue: "White" },
  { product_id: 1287, fieldID: 7878, fieldValue: "1 per case" },
  { product_id: 1287, fieldID: 7879, fieldValue: "White" },
  { product_id: 1288, fieldID: 7883, fieldValue: "1 pair per case" },
  { product_id: 1288, fieldID: 7884, fieldValue: "White" },
  { product_id: 1289, fieldID: 7888, fieldValue: "10 per case" },
  { product_id: 1289, fieldID: 7889, fieldValue: "White" },
  { product_id: 1290, fieldID: 7893, fieldValue: "10 per case" },
  { product_id: 1290, fieldID: 7894, fieldValue: "White" },
  { product_id: 1291, fieldID: 7899, fieldValue: "1 per case" },
  { product_id: 1291, fieldID: 7900, fieldValue: "White" },
  { product_id: 1292, fieldID: 7905, fieldValue: "1 per case" },
  { product_id: 1292, fieldID: 7906, fieldValue: "White" },
  { product_id: 1293, fieldID: 7911, fieldValue: "1 per case" },
  { product_id: 1293, fieldID: 7912, fieldValue: "White" },
  { product_id: 1294, fieldID: 7916, fieldValue: "1 per case" },
  { product_id: 1294, fieldID: 7917, fieldValue: "White" },
];

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
