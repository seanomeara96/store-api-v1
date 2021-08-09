const updateProductDescription = (productId, updatedProductDescription) => {
  return new Promise((resolve, reject) => {
    require("../config/config")
      .store.put(`/catalog/products/${productId}`, {
        description: updatedProductDescription,
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

exports.updateProductDescription = updateProductDescription;
