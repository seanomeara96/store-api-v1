/**
 * updates a filter
 * @param {number} product_id
 * @param {number} custom_field_id
 * @param {string} name
 * @param {string} value
 * @returns
 */
export function updateCustomField(
  product_id: number,
  custom_field_id: number,
  name: string,
  value: string
) {
  return new Promise(function (resolve, reject) {
    require("../../config/config")
      .store.put(
        `/catalog/products/${product_id}/custom-fields/${custom_field_id}`,
        { name, value }
      )
      .then(resolve)
      .catch(reject);
  });
}
