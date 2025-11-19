import { deleteCustomField } from "../../functions/custom-fields/deleteCustomField";
import { getCustomField } from "../../functions/custom-fields/getCustomField";
import { CustomField } from "../../functions/custom-fields/getCustomFields";
import { updateCustomField } from "../../functions/custom-fields/updateCustomField";

require("../../config/config").config("ha");

let data: {
  product_id: number;
  product_name: string;
  custom_field_id: number;
  custom_field_name: string;
  custom_field_value: string;
  action: string;
}[] = [
  {
    product_id: 459,
    product_name: "MY Drap Cocktail Napkin Emerald Green",
    custom_field_id: 200,
    custom_field_name: "Pack size",
    custom_field_value: "25",
    action: "UPDATE",
  },
  {
    product_id: 586,
    product_name: "MY Drap Cocktail Napkin Sea Blue",
    custom_field_id: 271,
    custom_field_name: "Pack size",
    custom_field_value: "25",
    action: "UPDATE",
  },
  {
    product_id: 643,
    product_name: "MY Drap Cocktail Napkin Black",
    custom_field_id: 305,
    custom_field_name: "Pack size",
    custom_field_value: "150",
    action: "UPDATE",
  },
  {
    product_id: 674,
    product_name: "MYdrap Napkin Fuchsia Pink 8in x 8in",
    custom_field_id: 323,
    custom_field_name: "Pack size",
    custom_field_value: "25",
    action: "UPDATE",
  },
  {
    product_id: 915,
    product_name: "MY Drap Canape Napkin Cream",
    custom_field_id: 460,
    custom_field_name: "Pack size",
    custom_field_value: "100",
    action: "UPDATE",
  },
  {
    product_id: 943,
    product_name: "MY Drap Canape Napkin Black Roll",
    custom_field_id: 476,
    custom_field_name: "Pack size",
    custom_field_value: "100",
    action: "UPDATE",
  },
  {
    product_id: 460,
    product_name: "MY Drap Cocktail Napkin Red Gingham",
    custom_field_id: 201,
    custom_field_name: "Pack size",
    custom_field_value: "25",
    action: "UPDATE",
  },
  {
    product_id: 508,
    product_name: "MY Drap Cocktail Napkin Pistachio",
    custom_field_id: 228,
    custom_field_name: "Pack size",
    custom_field_value: "25",
    action: "UPDATE",
  },
  {
    product_id: 459,
    product_name: "MY Drap Cocktail Napkin Emerald Green",
    custom_field_id: 9779,
    custom_field_name: "Pack size",
    custom_field_value: "1",
    action: "DELETE",
  },
  {
    product_id: 460,
    product_name: "MY Drap Cocktail Napkin Red Gingham",
    custom_field_id: 9780,
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
              value: ${cf.value} => ${row.custom_field_value}`
        );
        await new Promise((res) => setTimeout(res, 3000));
        try {
          await updateCustomField(
            row.product_id,
            row.custom_field_id,
            row.custom_field_name,
            row.custom_field_value
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
          `deleting custom field name:${cf.name}; value:${cf.value};`
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
