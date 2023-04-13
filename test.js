const { getAllCategories } = require("./functions/categories/getAllCategories");
const { updateCategory } = require("./functions/categories/updateCategory");
require("./config/config").config("ff");
async function main() {
  const categories = await getAllCategories();

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    console.log(`${i + 1}/${categories.length}`, category.id, category.name);

    const update = category.custom_url.url.replace("-1", "")

    console.log(category.custom_url.url)

    const res = await updateCategory(category.id, {
      custom_url: {
        is_customized: true,
        url: update
      }
    }).catch(console.log)
    
    console.log(res.custom_url.url)
    
  }
}
main();
