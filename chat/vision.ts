import OpenAI from "openai";
require("../config/config");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const response = await openai.chat.completions.create({
    max_tokens: 1000,
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Desribe this image in detail" },
          {
            type: "image_url",
            image_url: {
              url: "https://replicate.delivery/pbxt/KJe29nGWJc8DewwTEzAeS17T9EmK4xihsHU56sTFAXQGFxmb/Snapchat-997866382.jpg",
            },
          },
        ],
      },
    ],
  });
  console.log(response.choices[0].message.content);
}
main();
