import { removeFilter } from "./removeCustomFields";
const productIDs = [
  { "Product ID": 177 },
  { "Product ID": 178 },
  { "Product ID": 179 },
  { "Product ID": 180 },
  { "Product ID": 181 },
];

export const removeFilterFromMany = (
  productIds: { [key: string]: number }[],
  name: string,
  value: string
) =>
  new Promise((resolve, reject) => {
    let promises = productIds.map((product: { [key: string]: number }) => {
      let idNumber = Object.values(product)[0];
      return removeFilter(idNumber, name, value);
    });
    Promise.allSettled(promises).then(resolve).catch(reject);
  });
