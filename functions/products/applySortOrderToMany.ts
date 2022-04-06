import { updateSortOrder } from "./updateSortOrder";
const fulfilledStatus = (a: PromiseSettledResult<any>) =>
  a.status === "fulfilled";
export const applySortOrderToMany = (
  productIds: { [key: string]: number }[],
  sortOrderNumber: number
) =>
  new Promise(async (resolve, reject) => {
    const promises = productIds.map((doc) => {
      const id = Object.values(doc)[0];
      if (typeof id !== "number") return;
      return updateSortOrder(id, sortOrderNumber);
    });
    const res = await Promise.allSettled(promises).catch(reject);
    const total = res!.length;
    const fulfilled = res!.filter(fulfilledStatus).length;
    resolve(`${fulfilled}/${total} sorted without issues`);
  });

