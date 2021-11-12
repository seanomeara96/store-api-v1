const { getAllProducts } = require("./getAllProducts");

const getProductsByCategory = (category_id) =>
  new Promise((resolve, reject) => {
    const filterCategoryProducts = (products) =>
      products.filter(({ categories }) => categories.includes(category_id));
    getAllProducts().then(filterCategoryProducts).catch(reject).then(resolve);
  });

exports.getProductsByCategory = getProductsByCategory;
