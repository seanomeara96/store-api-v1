export async function deleteRedirect(id: number) {
  try {
    const config = require("../../config/config");
    const response = await config.store.delete(`/storefront/redirects`, {
      params: {
        "id:in": id,
        site_id: 1000,
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw error.response.data;
  }
}
