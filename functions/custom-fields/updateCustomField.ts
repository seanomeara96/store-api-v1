/**
 * updates a filter
 * @param {number} product_id
 * @param {number} custom_field_id
 * @param {string} name
 * @param {string} value
 * @returns
 */
export async function updateCustomField(
  product_id: number,
  custom_field_id: number,
  name: string,
  value: string,
) {
  try {
    await require("../../config/config").store.put(
      `/catalog/products/${product_id}/custom-fields/${custom_field_id}`,
      { name, value },
    );
  } catch (error) {
    throw error;
  }
}
