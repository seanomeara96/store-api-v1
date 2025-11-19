export async function getShippingMethod(zone_id: number, method_id: number) {
  try {
    const config = require("../../config/config");
    const response: any = await config.store(
      `/shipping/zones/${zone_id}/methods/${method_id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
