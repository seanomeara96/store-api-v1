import { createRedirect } from "../redirects/createRedirect";
import { Brand } from "./Brand";
import { getBrandById } from "./getBrandById";

async function createRelevantRedirect(brand: Brand, url?: string) {
  return await createRedirect(brand.custom_url.url, url ? url : "/brands/");
}

/** moved to client */
export async function deleteBrand(
  id: number,
  redirect: boolean = true,
  url?: string,
) {
  // Reasons to use try-catch here:
  // - This is a top-level operation and should catch any unhandled errors from inner processes.
  // - Allows for logging or cleanup if an error occurs.
  try {
    const brand = await getBrandById(id);
    if (redirect) await createRelevantRedirect(brand, url);
    await require("../../config/config").store.delete(
      `/catalog/brands/${brand.id}`,
    );
    return `Successfully deleted ${brand.name}`;
  } catch (err) {
    // Keep in mind:
    // - Be specific with what errors you're handling here.
    // - General catch blocks should be used with caution to avoid swallowing errors.
    throw err;
  }
}
