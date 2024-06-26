export async function deleteCustomField(
  productId: number,
  filterToDeleteId: number
) {
  try {
    await require("../../config/config").store.delete(
      `/catalog/products/${productId}/custom-fields/${filterToDeleteId}`
    );
  } catch (err) {
    throw err;
  }
}
