export function updateProductVariant(
  product_id: number,
  variant_id: number,
  updateParams: UpdateVriantParams
) {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.put(
        `/catalog/products/${product_id}/variants/${variant_id}`,
        updateParams
      );
      resolve(res.data.data)
    } catch (err) {
      reject(err);
    }
  });
}


interface UpdateVriantParams {
  cost_price?: number;
  price?: number;
  sale_price?: number;
  retail_price?: number;
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  is_free_shipping?: boolean;
  fixed_cost_shipping_price?: number;
  purchasing_disabled?: boolean;
  purchasing_disabled_message?: string;
  upc?: string;
  inventory_level?: number;
  inventory_warning_level?: number;
  bin_picking_number?: string;
  mpn?: string;
  gtin?: string;
  product_id?: number;
  sku?: string;
}
