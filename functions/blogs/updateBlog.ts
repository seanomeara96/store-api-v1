import { BlogPost, BlogPostUpdateParams } from "./BlogPost";

export function updateBlog(
  blogID: number,
  params: BlogPostUpdateParams
): Promise<BlogPost> {
  if (params.published_date && typeof params.published_date !== "string") {
    params.published_date = params.published_date.toUTCString();
  }
  return new Promise(async function (resolve, reject) {
    try {
      const res = await require("../../config/config").store.put(
        `/blog/posts/${blogID}`,
        params
      );
      resolve(res.data.data);
    } catch (err) {
      reject(err);
    }
  });
}
