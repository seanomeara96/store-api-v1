require("../../config/config").config("bsk");
const { addLineToBrandProducts } = require("../../content/modules/update");
const brand = "Dermalogica";
const lineToAdd = `<div
style="
  padding: 12px 18px;
  margin-bottom: 12px;
  background-color: #d3f7f7;
  border-radius: 4px;
  display: flex;
  align-items: center;
"
>
<div style="padding-right: 12px">
  <img
    src="https://cdn11.bigcommerce.com/s-1jn0h8pjbp/product_images/uploaded_images/gift-icon-2-.png?t=1621431266&amp;_ga=2.186276649.1213338328.1621407170-9852056.1620197612"
    alt="gift icon"
  />
</div>
<div>
  <p style="margin-bottom: 0; color: #223f8e">
    Free <a href="https://www.beautyskincare.ie/free-voucher-for-30-minute-skin-health-treatment/">Voucher for 30 Minute Skin Health Treatment</a> worth €56 with every order!
  </p>
</div>
</div>`;

addLineToBrandProducts(brand, lineToAdd)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
