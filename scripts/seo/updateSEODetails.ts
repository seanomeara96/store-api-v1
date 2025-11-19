import { updateBrand } from "../../functions/brands/updateBrand";
import { updateCategory } from "../../functions/categories/updateCategory";

const updates = [
  {
    id: 408,
    store: "bf",
    type: "brand",
    page_title: "L.A. Girl: Affordable, Quality Makeup Used By Makeup Artists",
    meta_description:
      "Shop affordable, high quality makeup loved by both beginners and makeup artists! Enjoy free next day delivery nationwide when you order before 2pm!",
  },
];

async function processUpdates() {
  try {
    for (let i = 0; i < updates.length; i++) {
      console.log(i, updates.length);
      const update = updates[i];
      require("../../config/config").config(update.store);

      if (update.type === "category") {
        await updateCategory(update.id, {
          page_title: update.page_title,
          meta_description: update.meta_description,
        });
      }

      if (update.type === "brand") {
        await updateBrand(update.id, {
          page_title: update.page_title,
          meta_description: update.meta_description,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

processUpdates();
