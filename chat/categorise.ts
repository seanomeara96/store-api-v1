import { getAllCategories } from "../functions/categories/getAllCategories";
import { getProductById } from "../functions/products/getProductById";
import { Configuration, OpenAIApi } from "openai";
import { updateProduct } from "../functions/products/updateProduct";

require("./config/config").config("bf");

async function main() {
  const product_id = 4491;

  const product:any = await getProductById(product_id);

  const cats = await getAllCategories();
  let data = `id\tname\n`;

  for (let i = 0; i < cats.length; i++) {
    const cat = cats[i];
    data += `${cat.id}\t${cat.name}\n`;
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const start = performance.now();


  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Return only a javascript array of the 10 most relevant IDs for categories relevant to the 
    ${product.name} based on this product description "${product.description}" using this category dataset: "${data}"`,
    temperature: 0,
    max_tokens: 1000,
  });

  if(!response.data.choices[0].text){
    console.log("no response")
    return
  }

  const newCats = JSON.parse(response.data.choices[0].text);

  //const combinedCats = [... new Set([...product.categories, ...newCats])];

  // const res = await updateProduct(product_id, {
  //   categories: newCats,
  // });

  console.log(newCats)

  const end = performance.now();
  console.log(`Execution time: ${end - start} ms`);
}
main();
