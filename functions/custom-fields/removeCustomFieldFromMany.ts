import { removeFilter } from "./removeCustomFields";
const productIDs = [
  { "Product ID": 177 },
  { "Product ID": 178 },
  { "Product ID": 179 },
  { "Product ID": 180 },
  { "Product ID": 181 },
];

export async function removeFilterFromMany(
  productIds: { [key: string]: number }[],
  name: string,
  value: string,
) {
  try {
    const promises = productIds.map((product: { [key: string]: number }) => {
      const idNumber = Object.values(product)[0];
      return removeFilter(idNumber, name, value);
    });
    return await Promise.allSettled(promises);
  } catch (error) {
    throw error;
  }
}
