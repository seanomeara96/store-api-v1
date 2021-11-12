function addWarningToOffers() {
  require("./config/config").config("bf");
  const {
    addLineToCategoryProducts,
  } = require("./functions/content/addLineToCategoryProducts");
  const line = `<!--startWarning--><div style="padding: 12px 18px; margin-bottom: 12px; background-color: #ecdbec; border-radius: 4px; display: flex; align-items: center;"><strong>*Black Tag Event Product: Coupon Codes Excluded</strong></div><!--endWarning-->`;
  addLineToCategoryProducts(566, line, "before")
    .then(console.log)
    .catch(console.log);
}
addWarningToOffers();
