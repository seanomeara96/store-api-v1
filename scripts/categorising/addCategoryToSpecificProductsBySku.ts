import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getProductBySku } from "../../functions/products/getProductBySKU";
require("../../config/config").config("bf");

const SKUs = [
  { sku: "20617", name: "Isoclean Luxury Trio Collection" },
  {
    sku: "20611",
    name: "Isoclean Paradise Scented Brush Cleaner Gift Set 275ml",
  },
  {
    sku: "20612",
    name: "Isoclean Cosmic Scented Brush Cleaner Gift Set 275ml",
  },
  { sku: "20613", name: "Isoclean Professional Brush Cleaner Gift Set 275ml" },
  { sku: "20613", name: "Isoclean Professional Brush Cleaner Gift Set 275ml" },
  { sku: "20613", name: "Isoclean Professional Brush Cleaner Gift Set 275ml" },
  {
    sku: "20614",
    name: "Isoclean Paradise Scented Brush Cleaner Gift Set 525ml",
  },
  {
    sku: "20614",
    name: "Isoclean Paradise Scented Brush Cleaner Gift Set 525ml",
  },
  {
    sku: "20615",
    name: "Isoclean Cosmic Scented Brush Cleaner Gift Set 525ml",
  },
  {
    sku: "20615",
    name: "Isoclean Cosmic Scented Brush Cleaner Gift Set 525ml",
  },
  {
    sku: "20611",
    name: "Isoclean Paradise Scented Brush Cleaner Gift Set 275ml",
  },
  {
    sku: "20615",
    name: "Isoclean Cosmic Scented Brush Cleaner Gift Set 525ml",
  },
  { sku: "20616", name: "Isoclean Professional Brush Cleaner Gift Set 525ml" },
].map((r) => r.sku);

async function updateProducts() {
  try {
    for (let i = 0; i < SKUs.length; i++) {
      const sku = SKUs[i];
      try {
        const product = await getProductBySku(sku);
        if (!product) throw "no product";
        await addCatToProduct(product.id, 1271);
        console.log(`updated ${i + 1} of ${SKUs.length}`);
      } catch (err: any) {
        if (err.status === 429) {
          console.log("too many requests");
          await new Promise((resolve) => setTimeout(resolve, 5000));
          i--;
          continue;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

updateProducts();
