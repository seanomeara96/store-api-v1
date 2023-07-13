import puppeteer from "puppeteer";
import express from "express";
const app = express();
app.listen(3000);

(async () => {
  const data = [
    { title: "Life's not a race.", body: "Do things at your own pace." },
    { title: "Sorry I'm late…", body: "But did you see my makeup?" },
    { title: "Quote of the day", body: "But first, skincare" },
    { title: "Quote of the day", body: "It's not hoarding if it's makeup" },
    {
      title: "Quote of the day",
      body: "Good things come to those who double cleanse!",
    },
    {
      title: "Quote of the day",
      body: "May your coffee be strong, your SPF stronger and your Monday short!",
    },
    {
      title: "Happiness is…",
      body: "That feeling when you take your makeup off",
    },
    { title: "Home is….", body: "Where the face masks are!" },
    {
      title: "Quote of the day",
      body: "May your day be as good as your hair!",
    },
    {
      title: "I could stop buying haircare products….",
      body: "But I'm not a quitter",
    },
  ];

  for (let i = 0; i < data.length; i++) {
    const { title, body } = data[i];
    app.get(`/${i}`, function (req, res) {
      res.send(/*HTML*/ `
      <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=swap" rel="stylesheet">
        </head>
        <body>
            <div style="display: inline-flex; flex-direction: column; align-items: center; justify-content: center; position: relative; height: 1080px; width: 1080px;" id="quote">
                <img style="position: absolute; top:0; left:0; width: 100%; height: 100%; z-index:-1;" src="https://cdn11.bigcommerce.com/s-63354/images/stencil/original/image-manager/bf-social-templates.png" alt="">
                
                <div style="background-color: white; padding: 6rem 3rem; margin: 10rem;  box-shadow: 0 10px 10px -10px gray; position: relative;border-radius: 3rem;">
                <img style="position: absolute; top: -25rem; right: -20rem; transform: scale(.5) rotate(65deg);" src="https://cdn11.bigcommerce.com/s-63354/images/stencil/original/image-manager/stroke.png" alt="">
                
                <h1 style="font-size: 4rem; font-family: 'Mistrully', serif; font-weight :200; margin: 0;
            ">${title}</h1>
                
                <h2 style="font-size: 4rem; font-family: 'Cormorant Garamond', serif; font-weight :200; position: relative; margin: 0;
            ">"${body}"</h2>
                </div>
            
                <span style="position: absolute; display: block; bottom: 3rem; height: 5rem; font-weight:  300;">
                <img style="height: 100%;
                            width: 100%;
                            object-position: center;
                            object-fit: cover;" src="https://cdn11.bigcommerce.com/s-63354/images/stencil/original/image-manager/logo-bf.png" alt="">
                </span>
            </div>
        </body>
</html>
`);
    });
  }

  const browser = await puppeteer.launch({
    headless: false,
    timeout: 100000,
  });

  for (let i = 0; i < data.length; i++) {
    await new Promise(async (resolve) => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1080, height: 1080 });

      await page.goto(`http://localhost:3000/${i}`, {
        waitUntil: "networkidle2",
      });
      //await page.waitFor(500);

      await page.screenshot({
        path: `./gen-images/${i}.png`,
        fullPage: false,
      });
      resolve(undefined);
    });
  }

  browser.close();
  process.exit(0); 
})();
