import { updateSortOrder } from "./updateSortOrder";
function fulfilledStatus(a: PromiseSettledResult<any>) {
  return a.status === "fulfilled";
}
export function applySortOrderToMany(
  productIds: { [key: string]: number }[],
  sortOrderNumber: number,
) {
  return new Promise(async function (resolve, reject) {
    const promises = productIds.map(function (doc) {
      const id = Object.values(doc)[0];
      if (typeof id !== "number") return;
      return updateSortOrder(id, sortOrderNumber);
    });
    try {
      const res = await Promise.allSettled(promises);
      const total = res.length;
      const fulfilled = res.filter(fulfilledStatus).length;
      resolve(`${fulfilled}/${total} sorted without issues`);
    } catch (error) {
      reject(error);
    }
  });
}
