export function getAllShippingMethods(zone_id: number) {
  return new Promise((resolve, reject) => {
    require("../../config/config")
      .store.get(`/shipping/zones/${zone_id}/methods`)
      .then((res: any) => resolve(res.data))
      .catch((err: any) => reject(err));
  });
}
