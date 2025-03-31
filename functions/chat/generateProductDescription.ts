import OpenAI from "openai";
import { htmlToText } from "html-to-text";
import { marked } from "marked";

export async function rewriteProductDescription(
  productDescription: string,
  additionalInstructions: string,
  contextWrapFunc: (description: string, additionalInstructions: string) => string,
): Promise<string> {
  try {
    let response = await new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }).chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: contextWrapFunc(htmlToText(productDescription), additionalInstructions),
        },
      ],
    });

    return marked(response.choices[0].message.content || "");
  } catch (err: any) {
    throw err;
  }
}