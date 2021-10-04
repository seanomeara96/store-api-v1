/**
 * @param {string} brandName
 * @param {string} link link to gwp pae
 * @param {string} linkText name of the free gift
 * @param {number} threshold how much you have to spend
 * @returns promo banner for product content
 */
 exports.ihGwpTemplate = (brandName, link, nameOfFreeGift, threshold) => `<div
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
     Free <a href="${link.replace(
         /[a-z\s]+:\/\/[w]{0,3}.?inhealth.ie/gi,
         "%%GLOBAL_ShopPathSSL%%"
       )}">${nameOfFreeGift}</a> when you spend &euro;${threshold.toString()} or
     more on ${brandName}
   </p>
 </div>
 </div>
 `;
