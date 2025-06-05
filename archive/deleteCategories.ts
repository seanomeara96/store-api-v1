
import { Category } from "./functions/categories/createCategory";
import { deleteCategory } from "./functions/categories/deleteCategory";
import { getAllCategories } from "./functions/categories/getAllCategories";


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


function buildTree(cat: Category, categories: Category[]){
  const rootNode: node = {
      parent: undefined,
      data: cat,
      children: undefined,
    };
    getChildren(rootNode, categories);
    return rootNode
}


async function deleteChildren(node: node){
  if(node.children) {
    for(const child of node.children){
      await deleteChildren(child)
    }
  }
  console.log(`deleting category ${node.data.name}`)
  await new Promise(res => setTimeout(res, 3000))
  await deleteCategory(node.data.id)
}


async function test() {
  try {
    require("./config/config").config("px");

    const categories = await getAllCategories();
    const rootCat = categories.find((cat) => cat.id === 384);
    if(!rootCat) {
      throw `no root cat`
    }
    const tree = buildTree(rootCat, categories)

    await deleteChildren(tree)
    
  } catch (err: any) {
    console.log(err.response.data ?? err.response ?? err);
  }
}

test();
