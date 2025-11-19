export async function removeFilter(
  productId: number,
  name: string,
  value: string,
) {
  if (name === "" || value === "")
    throw new Error("please provide a key & a value");
  try {
    const filters = await require("./getFilters")(productId);
    const filterToDelete = filters.find(function (filter: {
      name: string;
      value: string;
    }) {
      return filter.name === name && filter.value === value;
    });
    try {
      await require("../config/config").store.delete(
        `/catalog/products/${productId}/custom-fields/${filterToDelete.id}`,
      );
    } catch (err) {
      console.log(err);
      throw new Error("something went wrong while deleting this filter");
    }
  } catch (err) {
    console.log(err);
    throw new Error("error fetching this products filters");
  }
}
