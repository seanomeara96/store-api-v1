import { BlogPost, BlogPostCreationParams } from "./BlogPost";

export function createBlog(params: BlogPostCreationParams): Promise<BlogPost> {
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.post(
        "/blog/posts",
        params
      );
      resolve(res.data.data);
    } catch (err) {
      reject(err);
    }
  });
}
