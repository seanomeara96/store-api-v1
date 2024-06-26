import { Product } from "../../functions/products/Product";
export function copyCats(arr: number[]) {
  let res: number[] = [];
  for (const i of arr) {
    res.push(i);
  }
  return res;
}

export function arraysAreEqual(arr1: number[], arr2: number[]): boolean {
  arr1.sort();
  arr2.sort();
  // Check if the arrays are of the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Iterate over each element and compare
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  // If all elements are equal, return true
  return true;
}

export function addCategory(p: Product, id: number) {
  if (!p.categories.includes(id)) p.categories.push(id);
}

export function removeCategory(p: Product, categoryToRemoveID: number) {
  let updatedCats = [];
  for (const category of p.categories) {
    if (category === categoryToRemoveID) continue;
    updatedCats.push(category);
  }
  p.categories = updatedCats;
}
