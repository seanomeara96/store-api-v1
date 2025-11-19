/**
 * applies a field (name) and value to a product by id
 * @param {number} productId
 * @param {string} name
 * @param {string} value
 * @returns
 */
export async function applyCustomField(
  productId: number,
  name: string,
  value: string,
) {
  const data = {
    name,
    value,
  };
  try {
    const { status } = await require("../../config/config").store.post(
      `/catalog/products/${productId}/custom-fields`,
      data,
    );
    return status;
  } catch (err) {
    throw err;
  }
}
