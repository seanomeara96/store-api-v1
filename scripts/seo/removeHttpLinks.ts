import { getAllBlogs } from "../../functions/blogs/getAllBlogs";
import { updateBlog } from "../../functions/blogs/updateBlog";

const api = require("../../config/config");

//api.config("ch", 2);
const instance = api.store;

(async function main() {
  try {
    const posts = await getAllBlogs();

    let postsContainingHttp = posts.filter(function (post) {
      return (post.body.match(/http:\/\//gi) || []).length > 0;
    });

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
      .map(function (post) {
        return (post.body.match(/http:\/\//gi) || []).length;
      })
      .reduce(function (a, b) {
        return a + b;
      });

    console.log(`${results} blog posts have unsafe links`);

    async function updateBlogPost(blogPostId: number, updatedContent: string) {
      try {
        const res = await updateBlog(blogPostId, { body: updatedContent });
        return res;
      } catch (err) {
        throw err;
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
