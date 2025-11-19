import { AxiosError } from "axios";
import { ProductVariant } from "../../newclient/products/variants";

type Variants = ProductVariant[];
export async function getProductVariants(
  product_id: number,
): Promise<Variants> {
  try {
    const res = await require("../../config/config").store.get(
      `/catalog/products/${product_id}/variants`,
    );
    return res.data.data as ProductVariant[];
  } catch (err: any) {
    throw err.response ? err.response.data : err;
  }
}
