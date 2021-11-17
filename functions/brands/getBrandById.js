const getBrandById = (brand_id) =>
  new Promise((resolve, reject) =>
    require("../../config/config")
      .store.get(`/catalog/brands/${brand_id}`)
      .then(({ data }) => resolve(data.data))
      .catch(reject)
  );
exports.getBrandById = getBrandById