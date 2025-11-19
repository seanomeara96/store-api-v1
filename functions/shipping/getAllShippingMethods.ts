export async function getAllShippingMethods(zone_id: number) {
  try {
    const res = await require("../../config/config").store.get(
      `/shipping/zones/${zone_id}/methods`,
    );
    return res.data;
  } catch (err) {
    throw err;
  }
}
