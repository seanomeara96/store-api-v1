import { getProductIdByName } from "../products/getProductIdByName";
import { applyCustomField } from "./applyCustomField";
type applyBoolean = "" | "x";
interface specificFilters {
  [key: string]: string | applyBoolean;
}
/**
 * applies specific filters by name marked x e.g. key = "field" value = "filter" name1 ="x" name2 = ""
 * @param {array} data
 * @returns promise
 */
export function applySpecificFilters(data: specificFilters[]) {
  return new Promise(async function (resolve, reject) {
    try {
      for (const item of data) {
        if (!item["Key"]) {
          throw "No Key Heading";
        }
        if (!item["Value"]) {
          throw "No Value heading";
        }
        const key = item["Key"];
        const value = item["Value"];
        // generate array of product names by removing fields key and value
        let productNames = Object.keys(item).filter(
          (key) => key !== "Key" && key !== "Value"
        );
        for (var name in productNames) {
          if (item[productNames[name]].toUpperCase() === "X") {
            const id = await getProductIdByName(productNames[name]);
            await applyCustomField(id as number, key, value);
          }
        }
      }
      resolve(undefined);
    } catch (err) {
      reject(err);
    }
  });
}
