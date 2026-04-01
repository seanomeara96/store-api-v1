import { getAllCategories } from "../../functions/categories/getAllCategories";

async function exportCategories(store: string, srcRootCategories: number[]) {
  try {
    require("../../config/config").config(store);
    let categories = await getAllCategories();

    const exportdata = [];
    for (let i = 0; i < categories.length; i++) {
      let c = categories[i];
      let name = c.name;
      let parent = categories.find(function (p) {
        return p.id == c.parent_id;
      });
      while (parent) {
        name = parent.name + " => " + name;
        parent = categories.find(function (p) {
          return p.id == parent!.parent_id;
        });
      }

      exportdata.push({
        id: c.id,
        // parent_id: c.parent_id,
        name: name,
        //sort_order: c.sort_order,
        //page_title: c.page_title,
        //meta_description: c.meta_description,
        //        url: c.custom_url.url,
      });
    }

    // await output(
    //   path.resolve(__dirname, store + "-category-export.csv"),
    //   exportdata,
    //   true,
    // );

    const isDescendantOfAnyRoot = (cat: any) => {
      if (!srcRootCategories || srcRootCategories.length === 0) return true;

      let current = cat;
      while (current && current.parent_id != null) {
        if (srcRootCategories.includes(current.parent_id)) return true;
        current = categories.find((p) => p.id == current.parent_id);
      }
      return false;
    };

    console.log(`====== Category Ids For ${store} ======`);
    for (const row of exportdata) {
      const cat = categories.find((c) => c.id == row.id);
      if (!cat) continue;

      if (isDescendantOfAnyRoot(cat)) {
        console.log(`id: ${row.id}, name: ${row.name}`);
      }
    }
    console.log();
  } catch (err) {
    console.log("Failure to launch", err);
  }
}

async function main() {
  await exportCategories("bf", [1135]);
  await exportCategories("kbsk", []);
}
main();
