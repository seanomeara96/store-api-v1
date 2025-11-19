import { removeFilter } from "./removeCustomFields";
const filters = [
  { name: "Proceive", value: "Women" },
  { name: "Proceive", value: "Men & Women" },
];

export async function removeManyFilters(
  productId: number,
  filters: { name: string; value: string }[],
) {
  try {
    const promises = filters.map(({ name, value }) =>
      removeFilter(productId, name, value),
    );
    return await Promise.allSettled(promises);
  } catch (error) {
    throw error;
  }
}
