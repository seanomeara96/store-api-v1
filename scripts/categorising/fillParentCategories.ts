import { Category } from "./functions/categories/createCategory";
import { getAllCategories } from "./functions/categories/getAllCategories";
import { addCatToProduct } from "./functions/products/addCatToProduct";
import { getAllProducts } from "./functions/products/getAllProducts";
import { Product } from "./functions/products/Product";
import fs from "fs";
import path from "path";

type node = {
  parent: node | undefined;
  data: Category;
  children: node[] | undefined;
};

function getChildren(parentNode: node, categories: Category[]) {
  for (let j = 0; j < categories.length; j++) {
    if (categories[j].parent_id === parentNode.data.id) {
      if (!parentNode.children) {
        parentNode.children = [];
      }
      const node = {
        parent: parentNode,
        data: categories[j],
        children: undefined,
      };
      getChildren(node, categories);
      parentNode.children.push(node);
    }
  }
}

function buildTree(cat: Category, categories: Category[]) {
  const rootNode: node = {
    parent: undefined,
    data: cat,
    children: undefined,
  };
  getChildren(rootNode, categories);
  return rootNode;
}

async function recursivelyPopulate(node: node) {
  if (node.children) {
    for (const childNode of node.children) {
      await recursivelyPopulate(childNode);
    }
  }
  const parent = node.parent?.data;
  if (parent) {
    const products = await getAllProducts({
      "categories:in": [node.data.id].join(","),
    });
    for (const product of products) {
      if (!product.categories.includes(parent.id)) {
        console.log("============");
        console.log(`product: ${product.name}`);
        console.log(`current cat: ${node.data.name}`);
        console.log(`missing from: ${parent.name}`);
        console.log("============");
        console.log();
        await addCatToProduct(product.id, parent.id);
      }
    }
  }
}

async function backupProducts() {
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[:.]/g, "-") // Replace colons and periods with dashes
    .replace("T", "_") // Replace 'T' with underscore
    .split("Z")[0]; // Remove the trailing 'Z'
  const products = await getAllProducts();
  fs.writeFileSync(
    path.resolve(__dirname, `product-backup-${timestamp}.json`),
    JSON.stringify(products),
    { encoding: "utf-8" }
  );
  console.log("products backed up");
}

async function testMain() {
  try {
    // identify all products where free shipping applies
    require("./config/config").config("bf");
    //await backupProducts();
    const categories = await getAllCategories();
    for (const cat of categories) {
      if (!cat.parent_id) {
        if ([548, 1057].includes(cat.id)) continue;
        const tree = buildTree(cat, categories);
        await recursivelyPopulate(tree);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
testMain();
