export const createRedirect = (fromUrl: string, toUrl: string) =>
  new Promise((resolve, reject) => {
    require("../../config/config")
      .store.put(`/storefront/redirects`, [
        {
          from_path: fromUrl,
          site_id: 1000,
          to: {
            type: "url",
            entity_id: null,
            url: toUrl,
          },
        },
      ])
      .then((res: any) => resolve(res.data.data))
      .catch(reject);
  });
