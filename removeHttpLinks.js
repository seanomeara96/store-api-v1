const api = require("./config/config")
api.config("fs",2)
const instance = api.store

const getAll =
  (URL) =>
  (params = {}) =>
    new Promise((resolve, reject) => {
      let pageNumber = 1;
      let aggregatedData = [];
      async function getData() {
        try {
          const { data } = await instance.get(URL, {
            params: {
              limit: 250,
              page: pageNumber,
              ...params,
            },
          });
          let dataArray = data;
          if (dataArray.length) {
            aggregatedData.push(...dataArray);
            pageNumber++;
            getData();
          } else {
            resolve(aggregatedData);
          }
        } catch (err) {
          reject(err);
        }
      }
      getData();
    });

const getAllBlogPosts = getAll("/blog/posts");

getAllBlogPosts().then((posts) => {
  let postsContainingHttp = posts.filter(
    (post) => (post.body.match(/http:\/\//gi) || []).length > 0
  );
  if (!postsContainingHttp.length) {
    console.log("there are no unsafe links");
    return;
  }
  console.log(`${postsContainingHttp.length} posts need updating`);
  let promises = [];
  postsContainingHttp.forEach((post) => {
    console.log(post.title, post.id);
    const oldContent = post.body;
    const updatedContent = oldContent.replace(/http:\/\//gi, "https://");
    promises.push(updateBlogPost(post.id, updatedContent));
  });
  Promise.allSettled(promises)
    .then((statuses) => {
      console.log(`${statuses.length} posts were updated`);
      getAllBlogPosts()
        .then((blogPosts) => {
          const results = blogPosts
            .map(({ body }) => (body.match(/http:\/\//gi) || []).length)
            .reduce((a, b) => a + b);
          console.log(`${results} blog posts have unsafe links`);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

function updateBlogPost(blogPostId, updatedContent) {
  return new Promise((resolve, reject) => {
    instance
      .put(`/blog/posts/${blogPostId}`, { body: updatedContent })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}