import path from "path";
import fs from "fs";
import { getAllCategories } from "./functions/categories/getAllCategories";
import {
  Category,
  CategoryCreationParams,
  createCategory,
} from "./functions/categories/createCategory";
const { config } = require("./config/config");

// Type definitions
type CategoryMap = Record<number, number | undefined>;
interface CategoryWithChildren extends Category {
  children: CategoryWithChildren[];
}

// Configuration constants
const MAPPING_FILE = path.resolve(__dirname, "ih-pb-mapping.json");
const SOURCE_CONFIG = "ih";
const TARGET_CONFIG = "pb";
const ROOT_CATEGORY_ID = 970;

// Initial category ID mapping
const INITIAL_MAP: CategoryMap = {
  970: 130,
  975: 189,
  983: 205,
  1031: 186,
  1045: 193,
  1048: 209,
  1085: 194,
  1113: 190,
  1118: 217,
  1120: 210,
  1131: 195,
  1142: 211,
  1159: 196,
  1168: 212,
  1170: 197,
  1195: 213,
  1208: 202,
  1214: 218,
  1216: 203,
  1241: 198,
  1256: 219,
  1289: 206,
  1300: 214,
  1310: 199,
  1312: 215,
  1333: 204,
  1369: 200,
  1405: 191,
  1441: 207,
  1442: 216,
  1443: 192,
  1444: 201,
  1445: 208,
};

async function loadCategoryMap(): Promise<CategoryMap> {
  try {
    const existingMap = fs.readFileSync(MAPPING_FILE, "utf-8");
    return { ...INITIAL_MAP, ...JSON.parse(existingMap) };
  } catch (error) {
    return { ...INITIAL_MAP };
  }
}

function buildCategoryTree(categories: Category[], rootId: number): Category[] {
  const rootCategory = categories.find((c) => c.id === rootId);
  if (!rootCategory) throw new Error(`Root category ${rootId} not found`);

  const tree: Category[] = [rootCategory];

  function addChildren(parentId: number) {
    const children = categories.filter((c) => c.parent_id === parentId);
    for (const child of children) {
      tree.push(child);
      addChildren(child.id);
    }
  }

  addChildren(rootId);
  return tree;
}

async function processCategories(
  sourceCategories: Category[],
  categoryMap: CategoryMap
): Promise<void> {
  let queue = [...sourceCategories];

  while (queue.length > 0) {
    const currentCategory = queue.shift();
    if (!currentCategory) continue;

    console.log(`Processing: ${currentCategory.name}`);

    if (categoryMap[currentCategory.id]) {
      continue; // Already mapped
    }

    const parentMappedId = categoryMap[currentCategory.parent_id];
    if (parentMappedId === undefined) {
      queue.push(currentCategory); // Parent not processed yet, requeue
      continue;
    }

    // Create new category in target system
    const creationParams: CategoryCreationParams = {
      name: currentCategory.name,
      parent_id: parentMappedId,
    };

    console.log(`Creating category: ${currentCategory.name}`);
    const newCategory = await createCategory(creationParams);

    // Update mapping and save to file
    categoryMap[currentCategory.id] = newCategory.id;
    fs.writeFileSync(MAPPING_FILE, JSON.stringify(categoryMap), "utf-8");
  }
}

async function main() {
  try {
    // Load source categories
    config(SOURCE_CONFIG);
    const allSourceCategories = await getAllCategories();
    const sourceTree = buildCategoryTree(allSourceCategories, ROOT_CATEGORY_ID);

    // Load existing mappings
    const categoryMap = await loadCategoryMap();

    // Process categories in target system
    config(TARGET_CONFIG);
    await processCategories(sourceTree, categoryMap);

    console.log("Category migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

main();
