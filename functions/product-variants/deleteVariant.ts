export async function deleteProductVariant(
  product_id: number,
  variant_id: number,
): Promise<undefined> {
  try {
    await require("../../config/config").store.delete(
      `/catalog/products/${product_id}/variants/${variant_id}`,
    );
    return undefined;
  } catch (err) {
    throw err;
  }
}
