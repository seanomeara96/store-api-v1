const updateAProductVariant = (product_id, variant_id, fieldToUpdate) => {
  return new Promise((resolve, reject) => {
    require("../config/config")
      .store.put(`/catalog/products/${product_id}/variants/${variant_id}`, {
        ...fieldToUpdate,
      })
      .then(resolve)
      .catch(reject);
  });
};
exports.updateAProductVariant = updateAProductVariant;
