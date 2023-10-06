import { Brand } from "./Brand";
export interface BrandCreationParams {
  // The name of the brand. Must be unique. Required in POST.
  name: string; // Required
  // >= 1 characters <= 255 characters

  // The title shown in the browser while viewing the brand.
  page_title?: string; // Optional
  // >= 0 characters <= 255 characters

  // Comma-separated list of meta keywords to include in the HTML.
  meta_keywords?: string[]; // Optional

  // A meta description to include.
  meta_description?: string; // Optional
  // >= 0 characters <= 65535 characters

  // A comma-separated list of keywords that can be used to locate this brand.
  search_keywords?: string; // Optional
  // >= 0 characters <= 65535 characters

  // Image URL used for this category on the storefront.
  // Images can be uploaded via form file post to /brands/{brandId}/image,
  // or by providing a publicly accessible URL in this field.
  image_url?: string; // Optional
  // Example: https://cdn8.bigcommerce.com/s-12345/product_images/k/your-image-name.png

  // The custom URL for the brand on the storefront.
  custom_url?: {
    // Brand URL on the storefront.
    url: string;
    // Example: /shoes
    is_customized: boolean;
    // Returns true if the URL has been changed from its default state
    // (the auto-assigned URL that BigCommerce provides).
  };
}
export function createBrand(params: BrandCreationParams): Promise<Brand> {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.post(
        `/catalog/brands`,
        params
      );
      resolve(res.data.data);
    } catch (err) {
      reject(err);
    }
  });
}
