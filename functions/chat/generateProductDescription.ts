import OpenAI from "openai";
import { htmlToText } from "html-to-text";
import { marked } from "marked";
import { ChatModel } from "openai/resources/chat/chat";

export async function generateProductDescription(
  model: ChatModel,
  productDescription: string,
  additionalInstructions: string,
  contextWrapFunc: (
    description: string,
    additionalInstructions: string,
  ) => string,
): Promise<string> {
  try {
    let response = await new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }).chat.completions.create({
      model: model,
      messages: [
        {
          role: "user",
          content: contextWrapFunc(
            htmlToText(productDescription),
            additionalInstructions,
          ),
        },
      ],
    });

    return marked(response.choices[0].message.content || "");
  } catch (err: any) {
    throw err;
  }
}
