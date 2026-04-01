import { applyCustomField } from "../../functions/custom-fields/applyCustomField";
import { getProductBySku } from "../../functions/products/getProductBySKU";

require("../../config/config").config("ah");

async function applyCustomFieldBySKU() {
  try {
    const data = [
      { sku: "MOR_MO0041", tag: "Selling Fast" },
      { sku: "5011", tag: "tiktok trending" },
      { sku: "5023", tag: "tiktok trending" },
      { sku: "5055", tag: "tiktok trending" },
      { sku: "5183", tag: "tiktok trending" },
      { sku: "6282", tag: "tiktok trending" },
      { sku: "6283", tag: "tiktok trending" },
      { sku: "7180", tag: "tiktok trending" },
      { sku: "7494", tag: "tiktok trending" },
      { sku: "7655", tag: "Selling Fast" },
      { sku: "7810", tag: "Selling Fast" },
      { sku: "8874", tag: "tiktok trending" },
      { sku: "9631", tag: "Selling Fast" },
      { sku: "9717", tag: "tiktok trending" },
      { sku: "11499", tag: "Selling Fast" },
      { sku: "11693", tag: "tiktok trending" },
      { sku: "12089", tag: "best price all year" },
      { sku: "12675", tag: "Selling Fast" },
      { sku: "12676", tag: "tiktok trending" },
      { sku: "12704", tag: "tiktok trending" },
      { sku: "12750", tag: "tiktok trending" },
      { sku: "13140", tag: "tiktok trending" },
      { sku: "6347A", tag: "tiktok trending" },
      { sku: "14136", tag: "Selling Fast" },
      { sku: "14464", tag: "Selling Fast" },
      { sku: "20475", tag: "best price all year" },
      { sku: "20477", tag: "limited stock" },
      { sku: "20479", tag: "best price all year" },
      { sku: "20485", tag: "best price all year" },
      { sku: "20483", tag: "limited stock" },
      { sku: "20484", tag: "limited stock" },
      { sku: "20468", tag: "best price all year" },
      { sku: "20520", tag: "Selling Fast" },
      { sku: "20608", tag: "limited stock" },
      { sku: "20649", tag: "limited stock" },
      { sku: "20646", tag: "tiktok trending" },
      { sku: "20647", tag: "tiktok trending" },
      { sku: "20648", tag: "best price all year" },
      { sku: "20650", tag: "tiktok trending" },
      { sku: "20713", tag: "Selling Fast" },
      { sku: "20725", tag: "Selling Fast" },
      { sku: "20348", tag: "tiktok trending" },
      { sku: "20841", tag: "limited stock" },
      { sku: "20838", tag: "limited stock" },
      { sku: "20839", tag: "limited stock" },
      { sku: "20840", tag: "limited stock" },
      { sku: "20843", tag: "tiktok trending" },
      { sku: "20989", tag: "tiktok trending" },
      { sku: "21114", tag: "Selling Fast" },
      { sku: "21481", tag: "Selling Fast" },
      { sku: "21569", tag: "Selling Fast" },
      { sku: "21801", tag: "Selling Fast" },
      { sku: "21831", tag: "best price all year" },
      { sku: "21865", tag: "tiktok trending" },
      { sku: "21942", tag: "best price all year" },
      { sku: "21941", tag: "best price all year" },
      { sku: "21940", tag: "best price all year" },
      { sku: "21939", tag: "best price all year" },
      { sku: "21938", tag: "best price all year" },
      { sku: "21937", tag: "best price all year" },
      { sku: "21936", tag: "best price all year" },
      { sku: "21935", tag: "limited stock" },
      { sku: "21925", tag: "tiktok trending" },
      { sku: "22309", tag: "best price all year" },
      { sku: "22306", tag: "best price all year" },
      { sku: "22304", tag: "best price all year" },
      { sku: "22303", tag: "best price all year" },
      { sku: "22302", tag: "best price all year" },
      { sku: "22301", tag: "best price all year" },
      { sku: "22300", tag: "best price all year" },
      { sku: "22299", tag: "best price all year" },
      { sku: "22298", tag: "best price all year" },
      { sku: "22225", tag: "best price all year" },
      { sku: "22408", tag: "limited stock" },
      { sku: "22407", tag: "best price all year" },
      { sku: "22403", tag: "limited stock" },
      { sku: "22402", tag: "tiktok trending" },
      { sku: "22401", tag: "best price all year" },
      { sku: "22399", tag: "best price all year" },
      { sku: "22398", tag: "best price all year" },
      { sku: "22396", tag: "best price all year" },
      { sku: "22395", tag: "best price all year" },
      { sku: "22394", tag: "best price all year" },
      { sku: "22393", tag: "best price all year" },
      { sku: "22392", tag: "best price all year" },
      { sku: "22356", tag: "best price all year" },
      { sku: "22355", tag: "best price all year" },
      { sku: "22354", tag: "best price all year" },
      { sku: "22353", tag: "best price all year" },
      { sku: "22352", tag: "best price all year" },
      { sku: "22447", tag: "limited stock" },
      { sku: "22449", tag: "limited stock" },
      { sku: "22713", tag: "best price all year" },
      { sku: "22712", tag: "best price all year" },
    ];

    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const row = data[i];
      const product = await getProductBySku(row.sku);
      if (!product) {
        console.log(`no product found for ${row.sku}`);
        continue;
      }
      await applyCustomField(product.id, "tag", row.tag);
    }
  } catch (err) {
    console.log(err);
  }
}
applyCustomFieldBySKU();
