export function getShippingMethod(zone_id: number, method_id: number) {
  return new Promise((resolve, reject) => {
    require("../../config/config")
      .store(`/shipping/zones/${zone_id}/methods/${method_id}`)
      .then((response: any) => resolve(response.data))
      .catch(reject);
  });
}
