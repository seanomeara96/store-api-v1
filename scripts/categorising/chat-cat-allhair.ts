import { getAllCategories } from "../../functions/categories/getAllCategories";
import { getProductById } from "../../functions/products/getProductById";
import { Configuration, CreateChatCompletionResponse, OpenAIApi } from "openai";
import { updateProduct } from "../../functions/products/updateProduct";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { convert } from "html-to-text";

require("../../config/config").config("ah");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function main() {
  const dummyProducts = await getAllProducts({ "categories:in": 190 });
  const cats = await getAllCategories({ parent_id: 170 });
  let catContext = `id\tcategory_name\tparent_category_name\n`;

  for (let i = 0; i < cats.length; i++) {
    const cat = cats[i];
    let parentCategoryName = "";
    if (cat.parent_id) {
      let parentCat = cats.find((parent) => parent.id == cat.parent_id);
      if (parentCat) {
        parentCategoryName = parentCat.name;
      }
    }
    catContext += `${cat.id}\t${cat.name}\t${parentCategoryName}\n`;
  }

  for (let i = 94; i < dummyProducts.length; i++) {
    const product = dummyProducts[i];

    console.log(`product ${i + 1} of ${dummyProducts.length}`);
    console.log(`product id`, product.id);

    const start = performance.now();
    let completion: CreateChatCompletionResponse;
    try {
      let { data } = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `you are a product categoriser who returns only js array literals with integers respresenting category ids e.g. [1,2,3]. You resoond only with a js literal. You give no reason for your answer.`,
          },
          {
            role: "user",
            content: `Return only a javascript array of the most relevant IDs for categories relevant to the 
                ${product.name} based on this product description "${convert(product.description)}" using this category dataset: "${catContext}".`,
          },
        ],
      });

      if (!data) {
        throw new Error("promblem with request");
      }

      completion = data;
    } catch (err: any) {
        console.log(err.response ? err.response.data : err)
        if(err.response.data && err.response.data.error.code === "rate_limit_exceeded"){
            await new Promise((res) => setTimeout(res, 5000))
            i--
            continue
        }
        break
    }

    if (!completion.choices.length || !completion.choices[0].message) {
      throw new Error("somehting went wrong in response");
    }

    const text = completion.choices[0].message.content;

    if (!text) {
      throw new Error("no text");
    }

    console.log(text);

    let newCats;
    try {
      newCats = JSON.parse(text);
    } catch {
      i--;
      continue;
    }

    const combinedCats = [...new Set([...product.categories, ...newCats])];

    try {
      await updateProduct(product.id, {
        categories: combinedCats,
      });
    } catch (err) {
      console.log(err);
      continue;
    }
    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`);
  }
}
main();
