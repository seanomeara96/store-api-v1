import { config } from "../../config/config";
import { updateCategory } from "../../functions/categories/updateCategory";

config("stie");

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

function validateFields(obj: { [key: string]: any }) {
  for (let i of ["Page Title", "Meta Description"]) {
    if (!obj.hasOwnProperty(i)) {
      throw `Missing Property ${i}`;
    }
  }
}

function validateAllData(data: Array<{ [key: string]: any }>) {
  for (let item of data) {
    validateFields(item);
  }
}

async function updateData() {
  for (const x of data) {
    console.log(`Updating ${x.name}...`);

    try {
      await updateCategory(x.id, {
        page_title: x["Page Title"],
        meta_description: x["Meta Description"],
      });
    } catch (err) {
      throw new Error(String(err));
    }

    console.log("success");
  }
}

validateAllData(data);
updateData();
