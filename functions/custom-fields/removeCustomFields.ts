export const removeFilter = (productId: number, name: string, value: string) =>
  new Promise(async (resolve, reject) => {
    if (name == "" || value == "")
      return reject("please provide a key & a value");
    try {
      const filters = await require("./getFilters")(productId);
      const filterToDelete = filters.find(
        (filter: { name: string; value: string }) =>
          filter.name === name && filter.value === value
      );
      require("../config/config")
        .store.delete(
          `/catalog/products/${productId}/custom-fields/${filterToDelete.id}`
        )
        .then(resolve)
        .catch((err:any) => {
          console.log(err);
          return reject("something went wrong while deleting this filter");
        });
    } catch (err) {
      console.log(err);
      return reject("error fetching this products filters");
    }
  });
