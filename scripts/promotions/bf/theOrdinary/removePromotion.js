require("../../../../config/config").config("bf");
const { removePromotionFromBrandProducts } = require("../../../../functions/content/removePromotionFromBrandProducts");
const brandName = "The Ordinary"
const lineToRemove = `<!-- start promotion --><div
style="
  padding: 12px 18px;
  margin-bottom: 12px;
  background-color: #ecdbec;
  border-radius: 4px;
  display: flex;
  align-items: center;
"
>
<div style="padding-right: 12px">
  <img
    src="https://cdn11.bigcommerce.com/s-63354/product_images/uploaded_images/gift-icon.png?t=1620198387&amp;_ga=2.1541873.1322443927.1620197854-9852056.1620197612"
    alt="gift icon"
  />
</div>
<div>
  <p style="margin-bottom: 0">
    Free Shipping
    when you spend &euro;25 or more on The Ordinary
  </p>
</div>
</div><!-- end promotion -->`;
removePromotionFromBrandProducts(brandName)
  .then((res) => console.log(res))
  .catch("something went wrong");
