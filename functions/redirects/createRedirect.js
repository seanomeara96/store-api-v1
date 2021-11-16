const createRedirect = (fromUrl, toUrl) =>
  new Promise((resolve, reject) => {
    require("../../config/config")
      .store.put(`/storefront/redirects`, {
        from_path: fromUrl,
        site_id: 0,
        to: {
          type: "url",
          entity_id: 0,
          url: toUrl,
        },
      })
      .then(resolve)
      .catch(reject);
  });

exports.createRedirect = createRedirect;
