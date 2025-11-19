export const createRedirect = async function (fromUrl: string, toUrl: string) {
  try {
    const res = await require("../../config/config").store.put(
      `/storefront/redirects`,
      [
        {
          from_path: fromUrl,
          site_id: 1000,
          to: {
            type: "url",
            entity_id: null,
            url: toUrl,
          },
        },
      ],
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
