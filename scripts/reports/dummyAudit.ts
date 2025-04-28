require("../../config/config");
const { log, error } = console;
import { getAllCategories } from "../../functions/categories/getAllCategories";
import { getAllProducts } from "../../functions/products/getAllProducts";
import { getSiteUrl } from "../../functions/utils/getSiteUrl";
import ejs from "ejs";
import fs from "fs";
import sgMail from "@sendgrid/mail";
import path from "path";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
const filePath = path.resolve(__dirname, "./dummyAudit/notification.ejs");
const template = fs.readFileSync(filePath, {
  encoding: "utf8",
});

type store = {
  initial: string;
  name: string;
  storeHash?: string;
  url?: string;
};

const allStores: store[] = [
  { initial: "bf", name: "BeautyFeatures" },
  { initial: "bsk", name: "BeautySkincare" },
  { initial: "ah", name: "AllHair" },
  { initial: "pb", name: "Pregnancy&Baby" },
  { initial: "ih", name: "InHealth" },
  { initial: "bs", name: "BabySafety" },
  { initial: "hie", name: "Haakaa IE" },
  { initial: "ds", name: "DogSpace" },
  { initial: "stie", name: "SleepyTots IE" },
];

async function main() {
  try {
    const msgs: string[] = [];
    for (const store of allStores) {
      /**
       * add store hash
       */
      store.storeHash =
        process.env[`${store.initial.toUpperCase()}_STORE_HASH`];
      /**
       * add store Url
       */
      store.url = getSiteUrl(store.initial);
      require("../../config/config").config(store.initial);

      const categories = await getAllCategories();
      /**
       * find dummy category
       */
      const dummyCategory = categories.find(
        (c) => c.name.toLowerCase() === "dummy"
      );

      if (!dummyCategory) {
        throw "ERROR: could not find dummy category";
      }

      const dummyCategoryId = dummyCategory.id;

      const products = await getAllProducts({
        "categories:in": dummyCategoryId.toString(),
      });

      /**
       * find products in dummy category and visible on front end, filter dummy, visible & in stock (high priority)
       */
      const liveProductsInDummy = products.filter(
        (p) =>
          p.categories.includes(dummyCategoryId) &&
          p.is_visible &&
          p.inventory_level
      );

      if (!liveProductsInDummy.length) {
        continue;
      }

      /**
       * Render notification oreach products
       */
      const emailData = ejs.render(template, {
        products: liveProductsInDummy,
        storeHash: store.storeHash,
        storeName: store.name,
        storeUrl: store.url,
      });
      
      msgs.push(emailData)
    }

    const msg = {
      to: "sean@beautyfeatures.ie",
      from: "sean@beautyfeatures.ie",
      subject: "Urgently Need to be Categorised",
      text: "Live, In Stock & In Dummy",
      html: msgs.join(""),
    };
    sgMail
      .send(msg)
      .then(() => log("Email sent"))
      .catch((err) => error(err.response.body.errors));
  } catch (err) {
    console.log(err);
  }
}

main();
