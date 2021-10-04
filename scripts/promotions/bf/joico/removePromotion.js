require("../../../config/config").config("bf");
const {
  removeLineFromBrandProducts,
} = require("../../../content/modules/update");
const brandName = "Joico";
const lineToRemove = `<div style="padding: 12px 18px; margin-bottom: 12px; background-color: #ecdbec; border-radius: 4px; display: flex; align-items: center;">
<div style="padding-right: 12px;"><img src="https://cdn11.bigcommerce.com/s-63354/product_images/uploaded_images/gift-icon.png?t=1620198387&amp;_ga=2.1541873.1322443927.1620197854-9852056.1620197612" alt="gift icon" /></div>
<div>
<p style="margin-bottom: 0;">Free <a href="%%GLOBAL_ShopPathSSL%%/free-joico-gift-with-purchase/">Re-Shaping Spray 300ml</a> when you spend &euro;40 or more on Joico</p>
</div>
</div>`;
removeLineFromBrandProducts(brandName, lineToRemove)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));