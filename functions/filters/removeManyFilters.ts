import { removeFilter } from "./removeFilter";
const filters = [
  { name: "Proceive", value: "Women" },
  { name: "Proceive", value: "Men & Women" },
];

export const removeManyFilters = (
  productId: number,
  filters: { name: string; value: string }[]
) =>
  new Promise((resolve, reject) => {
    let promises = filters.map(({ name, value }) =>
      removeFilter(productId, name, value)
    );
    Promise.allSettled(promises).then(resolve).catch(reject);
  });
