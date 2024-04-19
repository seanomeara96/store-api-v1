import {
  CategoryCreationParams,
  createCategory,
} from "../../functions/categories/createCategory";

require("../../config/config").config("bf");

const data = [
  "Alfaparf",
  "Kerastase",
  "Moroccanoil",
  "Redken",
  "Color Wow",
  "Joico",
  "L'Oreal Professionnel",
  "Pureology",
  "Nioxin",
  "Olaplex",
];
async function main() {
  try {
    for (const name of data) {
      const params: CategoryCreationParams = {
        parent_id: 963,
        name,
      };
      await createCategory(params);
    }
  } catch (err) {
    console.log(err);
  }
}

main();
