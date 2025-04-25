import { AxiosError } from "axios";
import { CustomField } from "./getCustomFields";

export function getCustomField(
  product_id: number,
  field_id: number
): Promise<CustomField> {
  return new Promise(async function (resolve, reject) {
    try {
      const response = await require("../../config/config").store.get(
        `/catalog/products/${product_id}/custom-fields/${field_id}`
      );
      resolve(response.data.data);
    } catch (err: any) {
      reject(err.response.data ?? err.response ?? err);
    }
  });
}
