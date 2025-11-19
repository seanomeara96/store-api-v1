import { getBrandById } from "../brands/getBrandById";
import { createRedirect } from "../redirects/createRedirect";
import { getProductById } from "./getProductById";

async function createRelevantRedirect(
  product: any,
  custom_redirect?: string | undefined,
): Promise<true> {
  if (!product) {
    throw "creating redirect requires product object";
  }

  if (custom_redirect) {
    await createRedirect(product.custom_url.url, custom_redirect);
    return true;
  }

  if (product.brand_id) {
    const brand = await getBrandById(product.brand_id);
    await createRedirect(product.custom_url.url, brand.custom_url.url);
    return true;
  }
  await createRedirect(product.custom_url.url, "/");
  return true;
}

export async function deleteProduct(
  id: number,
  redirect?: boolean | undefined,
  url?: string | undefined,
): Promise<string> {
  if (typeof redirect === "undefined") {
    redirect = true;
  }

  try {
    const product = await getProductById(id);

    if (redirect) {
      await createRelevantRedirect(product, url);
    }

    await require("../../config/config").store.delete(
      `/catalog/products/${id}`,
    );

    return `Successfully deleted ${product.name}`;
  } catch (err: any) {
    throw err.data ? err.data : err;
  }
}
