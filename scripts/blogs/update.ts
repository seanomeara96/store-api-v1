require("../../config/config").config("px", 2);
import { getAllBlogs } from "../../functions/blogs/getAllBlogs";
import { updateBlog } from "../../functions/blogs/updateBlog";

(async function () {
  const blogs = await getAllBlogs();
  for (let i = 0; i < blogs.length; i++) {
    console.log(`${i + 1} of ${blogs.length}`);
    const blog = blogs[i];
    const newDate = new Date(
      (new Date(blog.published_date.date) as any) - i * 24 * 3600 * 1000
    );
    console.log(newDate);
    try {
      await updateBlog(blog.id, {
        published_date: newDate,
        is_published: true
      });
    } catch (err: any) {
      console.log(err.response.data);
    }
  }
})();
