import { getProductByName } from "../products/getProductByName";
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
export async function applySpecificFilters(data: specificFilters[]) {
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
        (key) => key !== "Key" && key !== "Value",
      );
      for (const name of productNames) {
        if (item[name].toUpperCase() === "X") {
          const { id } = await getProductByName(name);
          await applyCustomField(id as number, key, value);
        }
      }
    }
  } catch (err) {
    throw err;
  }
}
