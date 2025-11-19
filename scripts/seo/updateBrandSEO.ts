import { updateBrand } from "../../functions/brands/updateBrand";

require("../../config/config").config("pb");

type BrandData = {
  id: string;
  name: string;
  "Page Title ": string;
  "Meta Description": string;
};

const data: BrandData[] = [];

function validateFields(obj: BrandData) {
  ["Page Title ", "Meta Description"].forEach(function (i) {
    if (!obj.hasOwnProperty(i)) {
      throw new Error(`Missing Property ${i}`);
    }
  });
}

data.forEach(validateFields);

async function updateBrands() {
  for (const x of data) {
    console.log(`Updating ${x.name}...`);
    try {
      await updateBrand(x.id, {
        page_title: x["Page Title "],
        meta_description: x["Meta Description"],
      });
      console.log("success");
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred.");
      }
    }
  }
}

updateBrands();
