import { getAllBlogs } from "../../functions/blogs/getAllBlogs";
import { output } from "../utils/output";
import path from "path";




async function main() {
  try {
   for(const store of ["ha", "ch"]){
    require("../../config/config").config(store, 2);
    output(
      path.resolve(__dirname, `../../${store}-blogs.csv`),
      (await getAllBlogs()).map(
        ({ id, title, url, published_date_iso8601, meta_description }) => ({
          id,
          title,
          url,
          published_date_iso8601,
          meta_description,
        })
      ),
      true
    );
   }
  } catch (err) {
    console.log(err);
  }
}

main();
