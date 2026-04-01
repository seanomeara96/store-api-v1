import { deleteCustomField } from "../../functions/custom-fields/deleteCustomField";
import { getCustomField } from "../../functions/custom-fields/getCustomField";
import { CustomField } from "../../functions/custom-fields/getCustomFields";
import { updateCustomField } from "../../functions/custom-fields/updateCustomField";

require("../../config/config").config("ch");

let data: {
  product_id: number;
  product_name: string;
  custom_field_id: number;
  custom_field_name: string;
  custom_field_value: string;
  action: string;
  duplicate?: string;
}[] = [
  {
    product_id: 127,
    product_name: "Art Deco Comic Strip Locker Table",
    custom_field_id: 1096,
    custom_field_name: "Case Size:",
    custom_field_value: "1 Per Case",
    action: "DELETE",
  },
  {
    product_id: 186,
    product_name: "Table Rectangular 6ft x 36in",
    custom_field_id: 1089,
    custom_field_name: "Case Size:",
    custom_field_value: "1 Per Case",
    action: "DELETE",
  },
  {
    product_id: 479,
    product_name: "Art Deco Comic Strip Table",
    custom_field_id: 1097,
    custom_field_name: "Case Size:",
    custom_field_value: "1 Per Case",
    action: "DELETE",
  },
  {
    product_id: 501,
    product_name: "Table Half Round 5ft (Folding)",
    custom_field_id: 1092,
    custom_field_name: "Case Size:",
    custom_field_value: "1 Per Case",
    action: "DELETE",
  },
  {
    product_id: 740,
    product_name: "Table Rectangular 4ft x 24in",
    custom_field_id: 1091,
    custom_field_name: "Case Size:",
    custom_field_value: "1 Per Case",
    action: "DELETE",
  },
  {
    product_id: 907,
    product_name: "Table Rectangular 4ft x 30in",
    custom_field_id: 1093,
    custom_field_name: "Case Size:",
    custom_field_value: "1 Per Case",
    action: "DELETE",
  },
  {
    product_id: 992,
    product_name: "Table Rectangular 8ft x 30in",
    custom_field_id: 1095,
    custom_field_name: "Case Size:",
    custom_field_value: "1 Per Case",
    action: "DELETE",
  },
  {
    product_id: 1091,
    product_name: "Table Rectangular 8ft x 24in",
    custom_field_id: 1094,
    custom_field_name: "Case Size:",
    custom_field_value: "1 Per Case",
    action: "DELETE",
  },
  {
    product_id: 1164,
    product_name: "Alaska Square Coffee Table - White",
    custom_field_id: 1075,
    custom_field_name: "Case Size:",
    custom_field_value: "1 Per Case",
    action: "DELETE",
  },
  {
    product_id: 1168,
    product_name: "Table Rectangular 8ft x 18in",
    custom_field_id: 1085,
    custom_field_name: "Case Size:",
    custom_field_value: "1 Per Case",
    action: "DELETE",
  },
  {
    product_id: 1472,
    product_name: "Alice Bar Stool Rose Gold",
    custom_field_id: 798,
    custom_field_name: "Pack size",
    custom_field_value: "1",
    action: "DELETE",
  },
];
// handle deletions first because they can conflict with custom field name canges
data.sort((a) => (a.action.toLowerCase() === "delete" ? -1 : 1));

async function test() {
  try {
    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const row = data[i];
      let cf: CustomField;
      try {
        cf = await getCustomField(row.product_id, row.custom_field_id);
      } catch (err: any) {
        if (err.status === 404) {
          continue;
        } else {
          throw err;
        }
      }

      if (
        row.action.toLowerCase() == "update" &&
        (row.custom_field_name !== cf.name ||
          row.custom_field_value !== cf.value)
      ) {
        console.log(
          `updating custom field for ${row.product_id}
              name: ${cf.name} => ${row.custom_field_name}
              value: ${cf.value} => ${row.custom_field_value}`,
        );
        await new Promise((res) => setTimeout(res, 3000));
        try {
          await updateCustomField(
            row.product_id,
            row.custom_field_id,
            row.custom_field_name,
            row.custom_field_value,
          );
        } catch (err: any) {
          if (err.response.data.title.includes("already exists")) {
            row.action = "delete";
            i--;
            continue;
          }
          throw err;
        }
      } else if (row.action.toLowerCase() === "delete") {
        console.log(
          `deleting custom field name:${cf.name}; value:${cf.value};`,
        );
        try {
          await new Promise((res) => setTimeout(res, 3000));
          await deleteCustomField(row.product_id, row.custom_field_id);
          continue;
        } catch (err: any) {
          if (err.status === 404 || err.response?.data?.status === 404) {
            continue;
          } else {
            throw err;
          }
        }
      }
    }
  } catch (err: any) {
    if (err.response) {
      if (err.response.data) {
        console.log(err.response.data);
      } else {
        console.log(err.response);
      }
    } else {
      console.log(err);
    }
  }
}
test();
