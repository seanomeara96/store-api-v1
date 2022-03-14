const { productIsVisible } = require("./productIsVisible");
const setVisibilityOfMany = (productIds, is_visible) =>
  new Promise((resolve, reject) =>
    Promise.allSettled(
      productIds.map((i) => productIsVisible(Object.values(i)[0], is_visible))
    )
      .then(resolve)
      .catch(reject)
  );
exports.setVisibilityOfMany = setVisibilityOfMany;
