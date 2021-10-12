require("../../config/config").config("ah");
const {
  getAllCategories,
} = require("../../functions/categories/getAllCategories");
const { output } = require("../utils/output");
async function exportCategoryDetails() {
  const categories = await getAllCategories();
  await output("category-details", categories);
}
exportCategoryDetails();
