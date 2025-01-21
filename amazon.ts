import puppeteer from 'puppeteer';
import openai from "openai"

async function askAboutAmazon(){
    try {

        const buffer = await captureScreenshot('https://www.amazon.co.uk/MoroccanOil-Treatment-Hair-Types-100ml/dp/B001AO0WCG/')

        require("./config/config")
        const client = new openai.OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        })
        
        
        const res = await client.chat.completions.create({
            messages: [
                {content: [
                    {type:"text"}
                ], role: "user"},
            ],
            model: 'chatgpt-4o-latest',

        })

        console.log(res.choices[0].message.content)

    } catch(err) {
        console.log(err)
    }
}



async function captureScreenshot(url: string): Promise<Uint8Array<ArrayBufferLike>> {
  // Launch a new browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

    // Set the viewport size (optional, but can help avoid squareness)
    await page.setViewport({ width: 1280, height: 800 });

  // Navigate to the provided URL
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Hide the cookie banner by setting the display style to 'none'
  await page.evaluate(() => {
    const cookieBanner = document.getElementById('sp-cc');
    if (cookieBanner) {
      cookieBanner.style.display = 'none';
    }
  });

  // Take a screenshot and save it to the specified output path
  const res = await page.screenshot();

  // Close the browser
  await browser.close();


  return res
}






