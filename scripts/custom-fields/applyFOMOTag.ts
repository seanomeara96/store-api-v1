import { applyCustomField } from "../../functions/custom-fields/applyCustomField";
import { getCustomFields } from "../../functions/custom-fields/getCustomFields";
import { updateCustomField } from "../../functions/custom-fields/updateCustomField";
import { getProductBySku } from "../../functions/products/getProductBySKU";

const data = [
  { sku: "20649" },
  { sku: "13253" },
  { sku: "20646" },
  { sku: "20647" },
  { sku: "20616" },
  { sku: "22229" },
  { sku: "20615" },
  { sku: "20648" },
  { sku: "20613" },
  { sku: "20838" },
  { sku: "20614" },
  { sku: "20839" },
  { sku: "22227" },
  { sku: "22408" },
  { sku: "22403" },
  { sku: "22404" },
  { sku: "22451" },
  { sku: "22307" },
  { sku: "22411" },
  { sku: "21935" },
  { sku: "22405" },
  { sku: "22447" },
  { sku: "20491" },
  { sku: "20611" },
  { sku: "22410" },
  { sku: "22300" },
  { sku: "22392" },
  { sku: "22393" },
  { sku: "22409" },
  { sku: "22228" },
  { sku: "11355" },
  { sku: "20484" },
  { sku: "20608" },
  { sku: "21826" },
  { sku: "21832" },
  { sku: "22298" },
  { sku: "22354" },
  { sku: "22448" },
  { sku: "22449" },
  { sku: "22452" },
  { sku: "20840" },
  { sku: "20841" },
  { sku: "21750" },
  { sku: "21752" },
  { sku: "21831" },
  { sku: "21936" },
  { sku: "21937" },
  { sku: "21940" },
  { sku: "22394" },
  { sku: "10590" },
  { sku: "20461" },
  { sku: "20475" },
  { sku: "20477" },
  { sku: "20483" },
  { sku: "20612" },
  { sku: "21685" },
  { sku: "21830" },
  { sku: "22301" },
  { sku: "22309" },
  { sku: "22352" },
  { sku: "22353" },
  { sku: "22396" },
  { sku: "22401" },
  { sku: "22407" },
  { sku: "22412" },
  { sku: "22450" },
];
async function applyFOMOTag() {
  require("../../config/config").config("bf");
  const newTagValue = "limited stock";
  try {
    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const row = data[i];
      const product = await getProductBySku(row.sku);
      if (!product) {
        console.log(`no product for ${row.sku}`);
        continue;
      }
      const customFields = await getCustomFields(product.id);
      const tag = customFields.find((cf) => cf.name === "tag");
      if (!tag) {
        // add new tag
        await applyCustomField(product.id, "tag", newTagValue);
        continue;
      }
      // update existing tag
      await updateCustomField(product.id, tag.id, tag.name, newTagValue);
    }
  } catch (err) {
    console.log(err);
  }
}

applyFOMOTag();
