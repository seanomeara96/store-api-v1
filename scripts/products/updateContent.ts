import OpenAI from "openai";
import { pregnancyandbabyPrompt } from "../../chat/prompts"
import { getAllProducts } from "../../functions/products/getAllProducts"
import { htmlToText } from "html-to-text";
import { marked } from "marked";
import path from "path"
import fs from "fs"
import { updateProduct } from "../../functions/products/updateProduct";

async function htmlResponse(
  description: string
): Promise<string> {
  try {
    let response = await new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }).chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: pregnancyandbabyPrompt(htmlToText(description)),
        },
      ],
    });

    return marked(response.choices[0].message.content || "");
  } catch (err: any) {
    throw err;
  }
}

async function update(){
    try {
        let map:{[product_id: number]: {
            old: string;
            new: string;
        } | undefined} = {}
        try {
            map = JSON.parse(fs.readFileSync(path.resolve(__dirname, "content-updates-pb.json"), {encoding: "utf-8"}))
        } catch(err) {
            fs.writeFileSync(path.resolve(__dirname, "content-updates-pb.json"), JSON.stringify(map), {encoding: "utf-8"})
        }
        require("../../config/config").config("pb")
        const products = await getAllProducts({'categories:in': 165})
        for(let i = 0; i < products.length; i++) {
            console.log(i, products.length)
            const product = products[i]
            if(map[product.id]){
                continue
            }
            const description = await htmlResponse(product.description)
            map[product.id] = {old: product.description, new: description}
            fs.writeFileSync(path.resolve(__dirname, "content-updates-pb.json"), JSON.stringify(map), {encoding: "utf-8"})
            await updateProduct(product.id, {description})
        }
    } catch(err){console.log(err)}
}

update()