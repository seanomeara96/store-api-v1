import {
    RediSearchSchema,
    SchemaFieldTypes,
    VectorAlgorithms,
    createClient,
  } from "redis";
require("../../config/config")
  
  async function main() {
    try {
      const client = createClient({
        url: process.env.REDIS_URL,
      });
  
      client.on("error", (err: any) => console.log("Redis Client Error", err));
      await client.connect();
      const schema: RediSearchSchema = {
        "$.id": {
          AS: "id",
          type: SchemaFieldTypes.NUMERIC,
        },
        "$.embedding": {
          AS: "embedding",
          type: SchemaFieldTypes.VECTOR,
          ALGORITHM: VectorAlgorithms.FLAT,
          TYPE: "float32",
          BLOCK_SIZE: 5,
          DIM: 1536,
          DISTANCE_METRIC: "COSINE",
          INITIAL_CAP: 5,
        },
      };
  
      const res = await client.ft.CREATE("productIndx", schema, { ON: "JSON", PREFIX: "product" });
      console.log(res)
  
  
      await client.disconnect();
    } catch (err) {
      console.log(err);
    }
  }
  main();