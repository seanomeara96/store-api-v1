import { getAllBlogs } from "../../functions/blogs/getAllBlogs";
import { output } from "../utils/output";
import path from "path";

async function main() {
  try {
    for (const store of ["ha", "ch"]) {
      require("../../config/config").config(store, 2);

      const blogs = await getAllBlogs();

      let baseURL: string | undefined = undefined;
      if (store === "ch") baseURL = "https://caterhire.ie";
      if (store === "ha") baseURL = "https://hireall.ie";
      if (!baseURL || baseURL == "") throw new Error("must supply a base URL");

      const formattedBlogs = blogs
        .filter((b) => b.is_published)
        .map(function (blog) {
          return {
            id: blog.id,
            title: blog.title,
            url: blog.url,
            published_date: blog.published_date_iso8601,
            //meta_description: blog.meta_description,
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
