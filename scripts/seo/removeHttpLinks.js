const api = require("../../config/config");
const { getAll } = require("../../functions/utils/getAll");

api.config("ch", 2);
const instance = api.store;
const getAllBlogPosts = getAll("/blog/posts");

(async () => {
  try {
    const posts = await getAllBlogPosts();

    let postsContainingHttp = posts.filter(
      (post) => (post.body.match(/http:\/\//gi) || []).length > 0
    );
    if (!postsContainingHttp.length) {
      throw "there are no unsafe links";
    }
    console.log(`${postsContainingHttp.length} posts need updating`);

    let promises = [];
    postsContainingHttp.forEach((post) => {
      console.log(post.title, post.id);
      const oldContent = post.body;
      const updatedContent = oldContent.replace(/http:\/\//gi, "https://");
      promises.push(updateBlogPost(post.id, updatedContent));
    });

    const statuses = await Promise.allSettled(promises);
    console.log(`${statuses.length} posts were updated`);

    const secondCheck = await getAllBlogPosts();
    const results = secondCheck
      .map((post) => (post.body.match(/http:\/\//gi) || []).length)
      .reduce((a, b) => a + b);
    console.log(`${results} blog posts have unsafe links`);

    function updateBlogPost(blogPostId, updatedContent) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await instance.put(`/blog/posts/${blogPostId}`, {
            body: updatedContent,
          });
          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
    }
  } catch (err) {
    console.log(err)
  }
})();
