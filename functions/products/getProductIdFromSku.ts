export async function getProductIdFromSku(
  sku: string,
): Promise<number | undefined> {
  try {
    const res = await require("../../config/config").store.get(
      "/catalog/variants",
      {
        params: { sku },
      },
    );
    if (!res.data.data.length) {
      return undefined;
    }
    return res.data.data[0].product_id;
  } catch (err) {
    throw err;
  }
}
