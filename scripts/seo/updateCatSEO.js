require("../../config/config").config("stie");

const data = [
  {
    id: 25,
    name: "Shop",
    "Page Title": "Shop Award Winning SleepyTot Comforters!",
    pt_length: 40,
    "Meta Description":
      "Shop Award Winning Sleep Comforters from Leading Brand Sleepytot at affordable prices! Approved by the Millpond Sleep Clinic!",
    md_length: 125,
    Keywords: "Sleepytot Comforter ",
    product_count: 11,
    oos_products: 2,
    empty: "FALSE",
    view: "https://www.sleepytot.ie/shop/",
    edit: "https://store-su70uzfhmn.mybigcommerce.com/manage/products/categories/25/edit",
    store: "https://www.sleepytot.ie",
  },
];

function validateFields(obj) {
  ["Page Title", "Meta Description"].forEach((i) => {
    if (!obj.hasOwnProperty(i)) {
      throw `Missing Property ${i}`;
    }
  });
}

data.forEach(validateFields);

const { updateCategory } = require("../../functions/categories/updateCategory");

(async () => {
  for (const x of data) {
    console.log(`Updating ${x.name}...`);

    const res = await updateCategory(x.id, {
      page_title: x["Page Title"],
      meta_description: x["Meta Description"],
    }).catch((err) => {
      throw new Error(err);
    });

    console.log("success");
  }
})();
