import { getAllBlogs } from "../../functions/blogs/getAllBlogs";
import { updateBlog } from "../../functions/blogs/updateBlog";

const api = require("../../config/config");

//api.config("ch", 2);
const instance = api.store;

(async () => {
  try {
    const posts = await getAllBlogs();

    let postsContainingHttp = posts.filter(
      (post) => (post.body.match(/http:\/\//gi) || []).length > 0
    );
    if (!postsContainingHttp.length) {
      throw "there are no unsafe links";
    }
    console.log(`${postsContainingHttp.length} posts need updating`);

    for (const post of postsContainingHttp) {
      const oldContent = post.body;
      const updatedContent = oldContent.replace(/http:\/\//gi, "https://");
      await updateBlogPost(post.id, updatedContent);
    }

    const secondCheck = await getAllBlogs();
    const results = secondCheck
      .map((post) => (post.body.match(/http:\/\//gi) || []).length)
      .reduce((a, b) => a + b);

    console.log(`${results} blog posts have unsafe links`);

    function updateBlogPost(blogPostId: number, updatedContent: string) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await updateBlog(blogPostId, {body: updatedContent})
          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
})();
