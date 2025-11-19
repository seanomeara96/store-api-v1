import { AxiosError } from "axios";
import { CustomField } from "./getCustomFields";

export async function getCustomField(
  product_id: number,
  field_id: number,
): Promise<CustomField> {
  try {
    const response = await require("../../config/config").store.get(
      `/catalog/products/${product_id}/custom-fields/${field_id}`,
    );
    return response.data.data;
  } catch (err: any) {
    throw err.response.data ?? err.response ?? err;
  }
}
