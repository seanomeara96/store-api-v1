import { BlogPost, BlogPostCreationParams } from "./BlogPost";

export async function createBlog(
  params: BlogPostCreationParams,
): Promise<BlogPost> {
  if (params.published_date && typeof params.published_date !== "string") {
    params.published_date = params.published_date.toUTCString();
  }
  try {
    const res = await require("../../config/config").store.post(
      "/blog/posts",
      params,
    );
    return res.data.data;
  } catch (err) {
    throw err;
  }
}
