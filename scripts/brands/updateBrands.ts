require("../../config/config").config("ha");
import { updateBrand } from "../../functions/brands/updateBrand";
const data = [
  {
    id: 35,
    storeName: "HireAll",
    type: "brand",
    name: "Sagaform",
    page_title: "Hire High-Quality Sagaform for Your Event in Ireland",
    meta_description:
      "Add a Scandinavian touch to your event with our Sagaform hire in Ireland. Choose from a variety of homeware products to elevate your table setting.",
    url: "https://www.hireall.ie/brands/sagaform/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/35/edit",
  },
];
async function main() {
  for (const page of data) {
    try {
      console.log(`updating brand: ${page.name}`);
      await updateBrand(page.id, {
        page_title: page.page_title,
        meta_description: page.meta_description,
      });
      console.log("updated");
    } catch (err) {
      console.log(err);
      break;
    }
  }
}
main();
