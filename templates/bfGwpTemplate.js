/**
 * @param {string} brandName
 * @param {string} link link to gwp pae
 * @param {string} linkText name of the free gift
 * @param {number} threshold how much you have to spend
 * @returns promo banner for product content
 */
exports.bfGwpTemplate = (brandName, link, nameOfFreeGift, threshold) => `<div
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
      Free
      <a href="${link.replace(
        /[a-z\s]+:\/\/[w]{0,3}.?beautyfeatures.ie/gi,
        "%%GLOBAL_ShopPathSSL%%"
      )}"
        >${nameOfFreeGift}</a
      >
      when you spend &euro;${threshold.toString()} or more on ${brandName}
    </p>
  </div>
</div>
`;
