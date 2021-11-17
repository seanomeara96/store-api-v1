const createRedirect = (fromUrl, toUrl) =>
  new Promise((resolve, reject) => {
    require("../../config/config")
      .store.put(`/storefront/redirects`, [{
        from_path: fromUrl,
        site_id: 1000,
        to: {
          type: "url",
          entity_id: null,
          url: toUrl,
        },
      }])
      .then(({data}) => resolve(data.data))
      .catch(reject);
  });

exports.createRedirect = createRedirect;
