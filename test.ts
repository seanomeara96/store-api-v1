import { Category } from "./functions/categories/createCategory";
import { getAllCategories } from "./functions/categories/getAllCategories";
import { output } from "./scripts/utils/output";
import fs from "fs"
import path from "path"

const store = "ah"

async function main() {
  try {
    require("./config/config").config(store);
    const categories = await getAllCategories();
    const data: {
      name: string;
      id: number;
    }[] = [];
    for (const category of categories) {
      const id = category.id;
      let name = category.name;

      let parent = findParent(category.parent_id, categories);
      while (parent) {
        name = parent.name + " => " + name;
        parent = findParent(parent.parent_id, categories);
      }

      data.push({ name, id });
    }

    output(path.resolve(__dirname, store+"-categories.csv"), data, true)

  } catch (err) {
    console.log(err);
  }
}

main();

function findParent(
  parentID: number,
  categories: Category[]
): Category | undefined {
  if (parentID === 0) {
    return undefined;
  }
  for (const c of categories) {
    if (c.id === parentID) {
      return c;
    }
  }
  return undefined;
}
