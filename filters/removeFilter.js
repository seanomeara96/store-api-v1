
const removeFilter = (productId, name, value) =>
new Promise(async (resolve, reject) => {
  if (name == "" || value == "")
    return reject("please provide a key & a value");
  try {
    const filters = await getFilters(productId);
    const filterToDelete = filters.find(
      (filter) => filter.name === name && filter.value === value
    );
    require("../config/config").store
      .delete(
        `/catalog/products/${productId}/custom-fields/${filterToDelete.id}`
      )
      .then(resolve)
      .catch((err) =>
        reject("something went wrong while deleting this filter", err)
      );
  } catch (err) {
    reject("error fetching this products filters", err);
  }
});

exports.removeFilter = removeFilter