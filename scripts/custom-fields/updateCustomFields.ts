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
    product_id: 199,
    product_name:
      "Diva Burgundy Glass 84cl  - Extra Large Glass (Case Size 16)",
    custom_field_id: 4647,
    custom_field_name: "Case size",
    custom_field_value: "16",
    action: "DELETE",
  },
  {
    product_id: 199,
    product_name:
      "Diva Burgundy Glass 84cl  - Extra Large Glass (Case Size 16)",
    custom_field_id: 8561,
    custom_field_name: "Case size",
    custom_field_value: "4-piece glassware series",
    action: "UPDATE",
  },
  {
    product_id: 309,
    product_name: "Black Salto Glass 33cl (Case Size 16)",
    custom_field_id: 8962,
    custom_field_name: "Capacity",
    custom_field_value: "32.5cl/11oz",
    action: "UPDATE",
  },
  {
    product_id: 368,
    product_name: "Pichet Water Jug 1 Litre (Case Size 1)",
    custom_field_id: 8576,
    custom_field_name: "Dishwasher Safe",
    custom_field_value: "Yes",
    action: "DELETE",
  },
  {
    product_id: 368,
    product_name: "Pichet Water Jug 1 Litre (Case Size 1)",
    custom_field_id: 9150,
    custom_field_name: "Dishwasher Safe",
    custom_field_value: "Yes",
    action: "DELETE",
  },
  {
    product_id: 372,
    product_name: "Plain Water Jug 1 Litre (Case Size 1)",
    custom_field_id: 4623,
    custom_field_name: "Case size",
    custom_field_value: "1",
    action: "DELETE",
  },
  {
    product_id: 372,
    product_name: "Plain Water Jug 1 Litre (Case Size 1)",
    custom_field_id: 8578,
    custom_field_name: "Case size",
    custom_field_value: "1",
    action: "UPDATE",
  },
  {
    product_id: 1586,
    product_name: "Chrome Water Jug 1L (Case Size 1)",
    custom_field_id: 7198,
    custom_field_name: "Case size",
    custom_field_value: "1",
    action: "UPDATE",
  },
  {
    product_id: 1586,
    product_name: "Chrome Water Jug 1L (Case Size 1)",
    custom_field_id: 9107,
    custom_field_name: "Case Size",
    custom_field_value: "1",
    action: "DELETE",
  },
  {
    product_id: 1614,
    product_name: "Diamond Clear Water Tumbler 28cl (Case Size 1)",
    custom_field_id: 7226,
    custom_field_name: "Case size",
    custom_field_value: "1",
    action: "UPDATE",
  },
  {
    product_id: 1614,
    product_name: "Diamond Clear Water Tumbler 28cl (Case Size 1)",
    custom_field_id: 9111,
    custom_field_name: "Case Size",
    custom_field_value: "1 per case",
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
