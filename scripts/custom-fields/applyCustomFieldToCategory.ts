import { getCategoryByName } from "../../functions/categories/getCategoryByName";
import { applyCustomField } from "../../functions/custom-fields/applyCustomField";
import { getAllProducts } from "../../functions/products/getAllProducts";

async function foo() {
  try {
    require("./config/config").config("ha");

    const category = await getCategoryByName("Glassware Hire")
    if(!category) throw "computer says no. nice try"

    const products = await getAllProducts({
      "categories:in": [category.id].join(","),
    });
    for (let i = 0; i < products.length; i++) {
      console.log(i, products.length)
      const p = products[i]
      try {
        await applyCustomField(p.id, "Dishwasher Safe", "Yes");
        await new Promise((res) => setTimeout(res, 1500));
      } catch (err) {
        continue
      }

      
    }
  } catch (err) {
    console.log(err);
  }
}

foo();
