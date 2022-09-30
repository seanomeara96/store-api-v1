require("./config/config").config("ha");
const { output } = require("./scripts/utils/output");
const { getAllCategories } = require("./functions/categories/getAllCategories");

(async () => {
  const categories = await getAllCategories().catch(console.log);

  const duplicates = [];

  for (const cat of categories) {
    const nameCount = categories.reduce((a, c) => {
      // console.log(c.name, cat.name)
      return c.name === cat.name ? a + 1 : a;
    }, 0);
    if (nameCount > 1) {
      duplicates.push(cat);
    }
  }

  const data = [];

  for (const d of duplicates) {
    const excludes = duplicates.filter((i) => i.id !== d.id);
    const match = excludes.find((ii) => ii.name === d.name);
    const doc = {
      old: undefined,
      new: undefined,
      old_edit: undefined,
      new_edit: undefined,
    };
    const editPage = (id) =>
      `https://store-o8co022yz5.mybigcommerce.com/manage/products/categories/${id}/edit`;
    doc.old = d.parent_id === 24 ? d.custom_url.url : match.custom_url.url;
    doc.new = d.parent_id !== 24 ? d.custom_url.url : match.custom_url.url;
    doc.old_edit = d.parent_id === 24 ? editPage(d.id) : editPage(match.id);
    doc.new_edit = d.parent_id !== 24 ? editPage(d.id) : editPage(match.id);
    data.push(doc);
  }

  await output("hireall-duplicates", data);
})();
