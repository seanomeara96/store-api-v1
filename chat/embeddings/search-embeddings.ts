import { createClient } from "redis";
import { Configuration, OpenAIApi } from "openai";
export function float32Buffer(arr: number[]) {
  return Buffer.from(new Float32Array(arr).buffer);
}
export async function search(input: string) {
  try {
    // This example demonstrates how to use RediSearch to index and query data
    // stored in Redis hashes using vector similarity search.
    //
    // Inspired by RediSearch Python tests:
    // https://github.com/RediSearch/RediSearch/blob/06e36d48946ea08bd0d8b76394a4e82eeb919d78/tests/pytests/test_vecsim.py#L96

    const client = createClient({ url: process.env.REDIS_URL });

    await client.connect();

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input,
    });

    if (embeddingResponse.status !== 200) {
      throw embeddingResponse;
    }

    const [responseData] = embeddingResponse.data.data;

    // Perform a K-Nearest Neighbors vector similarity search
    // Documentation: https://redis.io/docs/stack/search/reference/vectors/#pure-knn-queries
    const results = await client.ft.search(
      "productIndx",
      "*=>[KNN 4 @embedding $BLOB AS dist]",
      {
        PARAMS: {
          BLOB: float32Buffer(responseData.embedding),
        },
        SORTBY: "dist",
        DIALECT: 2,
        RETURN: ["id", "dist"],
      }
    );

    const { documents } = results;

    const productIds: number[] = [];

    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      productIds.push(parseInt(document.value.id as string));
    }

    client.quit();

    return productIds;
  } catch (err: any) {
    console.log(err);
  }
}
