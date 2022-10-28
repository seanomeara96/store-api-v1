const puppeteer = require("puppeteer");
(async () => {
  const data = [
    {
      name: "BeautyFeatures.ie",
      storeHash: "63354",
      xAuth: "hlt382l5le9phaqwwjyjrf5fsr46h32",
      url: "https://www.beautyfeatures.ie",
      dummy_id: 548,
    },
    {
      name: "BeautySkincare.ie",
      storeHash: "7f87b",
      xAuth: "oixypiux7apjmvud0kghb2v4rwbuhl5",
      url: "https://www.beautyskincare.ie",
      dummy_id: 85,
    },
    {
      name: "AllHair.ie",
      storeHash: "d5068dtk11",
      xAuth: "7zaa6z7qqndushxm8h9yg1rzu5hyih3",
      url: "https://www.allhair.ie",
      dummy_id: 190,
    },
    {
      name: "InHealth.ie",
      storeHash: "1jn0h8pjbp",
      xAuth: "b1k44jj0l8sa5eutjpy8a4xpbog2hkg",
      url: "https://www.inhealth.ie",
      dummy_id: 1469,
    },
    {
      name: "PregnancyAndBaby.ie",
      storeHash: "5rdxj17",
      xAuth: "2o5vdhajv4idtl4jbcm4l1qt486fubm",
      url: "https://www.pregnancyandbaby.ie",
      dummy_id: 165,
    },
    {
      name: "BabySafety.ie",
      storeHash: "egiahb",
      xAuth: "lxyqtdvbsqcuke7t3lgfahguqm4p53b",
      url: "https://www.babysafety.ie",
      dummy_id: 81,
    },
    {
      name: "HaakaaOfficial.co.uk",
      storeHash: "xxj4tzwboh",
      xAuth: "nx5g7ol59osblpcnzd0jme6d94820ic",
      url: "https://www.haakaaofficial.co.uk",
      dummy_id: 67,
    },
    {
      name: "Haakaa.ie",
      storeHash: "5d0pjlwy5c",
      xAuth: "6mpsm1gd9vf1fcc6ipho75nw0jil1nf",
      url: "https://www.haakaa.ie",
      dummy_id: 38,
    },
    {
      name: "DogSpace.ie",
      storeHash: "imyjwz3oie",
      xAuth: "3swo6lbxgqulmogqn43ipcbwm3b7yen",
      url: "https://www.dogspace.ie",
      dummy_id: 24,
    },
    {
      name: "Sleepytot.ie",
      storeHash: "su70uzfhmn",
      xAuth: "4jf8ifqhw47p3egl0jgugmfcxmuneif",
      url: "https://www.sleepytot.ie",
      dummy_id: 24,
    },
    {
      name: "FertilityStore.ie",
      storeHash: "c7kc4",
      xAuth: "2u1uzh9b52ncuz0mrdkqmyblx3ncpo2",
      url: "https://www.fertilitystore.ie",
      dummy_id: 27,
    },
  ];

  const browser = await puppeteer.launch({
    headless: false,
    timeout: 100000,
  });

  function saveScreenshot(url, name) {
    return new Promise(async (resolve) => {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });

      await page.goto(url, {
        waitUntil: "networkidle2",
      });
      //await page.waitFor(500);

      await page.screenshot({
        path: `./images/${name}.png`,
        fullPage: false,
      });
      resolve();
    });
  }

  for (const page of data) {
    await saveScreenshot(page.url, page.name);
  }

  browser.close();
})();
