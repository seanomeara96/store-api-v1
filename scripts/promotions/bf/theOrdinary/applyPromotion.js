require("../../../../config/config").config("bf");
const { addLineToMany } = require("../../../../functions/content/addLineToMany");
const brandName = "The Ordinary";
const lineToAdd = `<!--startPromotion--><div
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
    Get 25% Off Selected The Ordinary Products with code <strong>25OFF</strong>
  </p>
</div>
</div><!--endPromotion-->`;
const products  = [{"Product ID":2541},
{"Product ID":2542},
{"Product ID":2543},
{"Product ID":2545},
{"Product ID":2546},
{"Product ID":2547},
{"Product ID":2596},
{"Product ID":2598},
{"Product ID":2600},
{"Product ID":2601},
{"Product ID":2602},
{"Product ID":2691},
{"Product ID":2697},
{"Product ID":2698},
{"Product ID":2699},
{"Product ID":2700},
{"Product ID":2701},
{"Product ID":2816},
{"Product ID":2817},
{"Product ID":2832},
{"Product ID":2833},
{"Product ID":2834},
{"Product ID":2835},
{"Product ID":3007},
{"Product ID":3008},
{"Product ID":3103},
{"Product ID":3104},
{"Product ID":3128},
{"Product ID":3344},
{"Product ID":3345},
{"Product ID":3346},
{"Product ID":3347},
{"Product ID":3348},
{"Product ID":3350},
{"Product ID":3735}]


addLineToMany(products, lineToAdd).then(console.log).catch(console.log)