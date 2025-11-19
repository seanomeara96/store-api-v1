import { getAllBlogs } from "../../functions/blogs/getAllBlogs";
import { output } from "../utils/output";
import path from "path";

async function main() {
  try {
    for (const store of ["ha", "ch"]) {
      require("../../config/config").config(store, 2);

      const blogs = await getAllBlogs();
      const formattedBlogs = blogs.map(function (blog) {
        return {
          id: blog.id,
          title: blog.title,
          url: blog.url,
          published_date_iso8601: blog.published_date_iso8601,
          meta_description: blog.meta_description,
        };
      });

      output(
        path.resolve(__dirname, `../../${store}-blogs.csv`),
        formattedBlogs,
        true,
      );
    }
  } catch (err) {
    console.log(err);
  }
}

main();
