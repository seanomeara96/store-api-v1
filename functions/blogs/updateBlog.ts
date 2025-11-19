import { BlogPost, BlogPostUpdateParams } from "./BlogPost";
export async function updateBlog(
  blogID: number,
  params: BlogPostUpdateParams,
): Promise<BlogPost> {
  if (params.published_date && typeof params.published_date !== "string") {
    params.published_date = params.published_date.toUTCString();
  }
  try {
    const res = await require("../../config/config").store.put(
      `/blog/posts/${blogID}`,
      params,
    );
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
