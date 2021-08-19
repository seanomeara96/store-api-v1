const productIDs = [
  { "Product ID": 177 },
  { "Product ID": 178 },
  { "Product ID": 179 },
  { "Product ID": 180 },
  { "Product ID": 181 },
];

const removeFilterFromMany = (productIds, name, value) =>
  new Promise((resolve, reject) => {
    let promises = [];
    productIds.forEach((product) => {
      let idKey = Object.keys(product)[0];
      promises.push(removeFilter(product[idKey], name, value));
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });

exports.removeFilterFromMany = removeFilterFromMany;
