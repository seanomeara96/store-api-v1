const
const filters = [
  { name: "Proceive", value: "Women" },
  { name: "Proceive", value: "Men & Women" },
];

const removeManyFilters = (productId, filters) =>
  new Promise((resolve, reject) => {
    let promises = [];
    filters.forEach(({ name, value }) => {
      promises.push(removeFilter(productId, name, value));
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });

  exports.removeManyFilters = removeManyFilters