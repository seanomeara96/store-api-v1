import { caterhirePrompt } from "./chat/prompts";
import { generateProductDescription } from "./functions/chat/generateProductDescription";
import { getAllProducts } from "./functions/products/getAllProducts";
import { getProductBySku } from "./functions/products/getProductBySKU";
import { updateProduct } from "./functions/products/updateProduct";
import fs from "fs";
import path from "path";

const FILE_NAME = `ch-content-changes-table-service.json`;

function getChanges(): { sku: string; before: string; after: string }[] {
  return JSON.parse(
    fs.readFileSync(path.resolve(__dirname, FILE_NAME), {
      encoding: "utf-8",
    })
  );
}

function saveChange(change: {
  sku: string;
  before: string;
  after: string;
}): { sku: string; before: string; after: string }[] {
  const changes = getChanges();
  changes.push(change);
  fs.writeFileSync(
    path.resolve(__dirname, FILE_NAME),
    JSON.stringify(changes),
    { encoding: "utf-8" }
  );
  return changes;
}

async function test() {
  try {
    const data: {
      sku: string;
      description: string;
      blogs?: string[];
      links?: string[];
      name?: string;
    }[] = [
      {
        sku: "293",
        name: "Regatta Outdoor Bistro Chair",
        description:
          "Create a charming and inviting atmosphere at your next event with our Regatta Range of bistro furniture, the perfect choice for both casual bistro seating and stylish outdoor setups. Whether you're planning a garden party, wedding reception, BBQ, or any outdoor celebration, our Regatta Range adds a touch of elegance and comfort to any occasion.\n\nKey Features\nIdeal for bistro-style seating, garden events, weddings, BBQs, and outdoor parties.\nRent individual pieces or as a complete set.\nCombines classic design with functionality to complement any outdoor setting. Ready to hire now to suit your event schedule.\nDesigned for both aesthetics and comfort, ensuring guests can relax and enjoy.                                                                                                                                              CaterHire Top Tip:                                                                                                                                                                                                                                Check out our Blog: Garden Party Ideas for the Ultimate Summer Celebration",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/blog/garden-party-ideas-for-the-ultimate-summer-celebration-/?srsltid=AfmBOorsOeSYb_e3i9mcRlawQTuHdTGkLRIxY_OZI28z9JYOuXX2I8YO",
        ],
      },
      {
        sku: "1000551",
        name: "Parasol Base",
        description:
          "Our sturdy metal Parasol Base is designed to securely hold our Wooden Parasol in place. Perfect for outdoor events, garden parties, and weddings, it ensures stability and safety, even in breezy conditions.\n\nKey Features:\n\nStrong metal construction for durability\nDesigned to fit and support our Wooden Parasol\nIdeal for use with bistro tables or standalone shade setups\nProvides reliable stability on various surfaces                                                                    CaterHire Top Tip:                                                                                                                                                                                                                                Check out our Blog: Garden Party Ideas for the Ultimate Summer Celebration",
        links: ["https://www.caterhire.ie/cream-parasol/"],
        blogs: [
          "https://www.caterhire.ie/blog/garden-party-ideas-for-the-ultimate-summer-celebration-/?srsltid=AfmBOorsOeSYb_e3i9mcRlawQTuHdTGkLRIxY_OZI28z9JYOuXX2I8YO",
        ],
      },
      {
        sku: "OXFORD02",
        name: "Oxford Silk White 2 Seater Set",
        description:
          'If you are looking to add some style and elegance to your outdoor event, you will certainly achieve this with our Oxford Silk White 2 seater cast aluminium set. The set includes a round cast aluminium table, 2 armchairs and beige cushions. Available for short and long term hire these sets are very popular for marquee weddings and corporate events. Key Features  Stylish lightweight 2 Seater set with scroll design Lightweight (cast aluminium) Ergonomically designed chairs for comfort Showerproof cushions Fitting for parasol Stackable chairs  Dimensions                                              Table\nDiameter: 71cm/28"\nHeight: 72cm/28”\n\nChair\nLength 47cm/19”\nWidth 43cm/17”                                                                                                                                                                                                                                                         Height: 93cm/37” Caterhire Top Tip We have everything you need to create the perfect outdoor event. From our elegant garden sets, and rattan furniture to parasols, patio heaters, BBQs and much more. Check out our Blog: Garden Party Ideas for the Ultimate Summer Celebration!',
        links: [
          "https://www.caterhire.ie/garden-table-and-chairs-set-wooden-for-hire/",
          "https://www.caterhire.ie/milan-rattan-bistro-set-for-hire/",
          "https://www.caterhire.ie/cream-parasol/",
          "https://www.caterhire.ie/patio-heater/",
          "https://www.caterhire.ie/charcoal-bbq/",
        ],
        blogs: [
          "https://www.caterhire.ie/blog/garden-party-ideas-for-the-ultimate-summer-celebration-/?srsltid=AfmBOorsOeSYb_e3i9mcRlawQTuHdTGkLRIxY_OZI28z9JYOuXX2I8YO",
        ],
      },
      {
        sku: "292",
        name: "Regatta Outdoor Patio Table",
        description:
          "Our Regatta Range of bistro furniture is the perfect choice for stylish and practical seating at any event. Whether you're hosting a garden gathering, wedding, BBQ, or outdoor party, this versatile range adds charm and comfort to your setting. Available to hire now, the Regatta Bistro furniture can be rented as individual pieces or as a complete set, including the Bistro Table and Bistro Chairs.\n\nKey Features\n\nClassic bistro look that suits a variety of event themes.\nIdeal for garden parties, weddings, BBQs, outdoor dining, and more.\nRent individually or as a complete set with matching table and chairs.\nEasy to set up and arrange in any outdoor space.\nBuilt for outdoor use with quality materials.\nDesigned with guest comfort in mind for extended use.                                                 CaterHire Top Tip:                                                                                                                                                                                                                                Check out our Blog: Garden Party Ideas for the Ultimate Summer Celebration",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/blog/garden-party-ideas-for-the-ultimate-summer-celebration-/?srsltid=AfmBOorsOeSYb_e3i9mcRlawQTuHdTGkLRIxY_OZI28z9JYOuXX2I8YO",
        ],
      },
      {
        sku: "1000156",
        name: "Green Parasol",
        description:
          "Add stylish shade to your outdoor event with our elegant Green Parasol. Featuring a lightweight yet durable aluminium frame, it’s the perfect addition for summer parties, weddings, and al fresco dining setups.\n\nKey Features:\n\nElegant green canopy for a classic outdoor look\nSturdy and durable aluminium frame\nLightweight and easy to handle\nIdeal for garden events, parties, and outdoor seating areas\nRequires a base – cannot stand alone (base hired separately)\nCaterHire Top Tip:                                                                                                                                                                                                                                Check out our Blog: Garden Party Ideas for the Ultimate Summer Celebration",
        links: ["https://www.caterhire.ie/parasol-base/"],
        blogs: [
          "https://www.caterhire.ie/blog/garden-party-ideas-for-the-ultimate-summer-celebration-/?srsltid=AfmBOorsOeSYb_e3i9mcRlawQTuHdTGkLRIxY_OZI28z9JYOuXX2I8YO",
        ],
      },
      {
        sku: "1000554",
        name: "Milan Rattan Bistro Chairs Set & Table",
        description:
          "The Milan Rattan 3 piece bistro set comprises of 2 bistro style tub chairs with cushions and a matching table in a striking 'chunky' anthracite style weave. They are very popular to hire for outdoor events such as garden parties, marquee weddings and outdoors events. Key Features  3 piece rattan bistro set in anthracite grey Stylish & comfortable Indoor or outdoor use Supplied with showerproof cushions                                                                                                                    Dimensions                                                                                            Armchair                                                                                                      Length 57cm/22”\nWidth  66cm/26”\nHeight 82cm/32”\nSeat Height 49cm/19”\n\nTable\n\nLength 50cm/20”\nWidth 50cm/20”                                                                                                                                                                                                                                                  Height 49cm/19”                                                                                                                                                                                                                                                     Caterhire Top Tip:  Our pop up gazebo is great and quick way of creating a chill out zone especially if the weather forecast is not great! Check out our Blog: Garden Party Ideas for the Ultimate Summer Celebration",
        links: ["https://www.caterhire.ie/gazebo-black-10ft-x-10ft-for-hire/"],
        blogs: [
          "https://www.caterhire.ie/blog/garden-party-ideas-for-the-ultimate-summer-celebration-/?srsltid=AfmBOorsOeSYb_e3i9mcRlawQTuHdTGkLRIxY_OZI28z9JYOuXX2I8YO",
        ],
      },
      {
        sku: "372",
        name: "Wooden Picnic Bench",
        description:
          "Our traditional picnic benches are very popular to hire for all types of outdoor events including sporting events, festivals, exhibitions and garden parties. It features a rectangular table with bench seating which can seat 4 people. Key Features  Solid wood with teak finish Seats 4 people comfortably Ready assembled Perfect for summer outdoor events Require Van/Truck if collecting.                                                                                        Dimensions:                                                                                                                                                                                                                                                             Length: 160cm/63”(table top)\nWidth:130cm/51”                                                                                                                                                                                                                                                  Height: 75cm/30”  \nCaterhire Top Tips Our picnic benches can stack 4 high and approximately 48 picnic benches will fit in a 40ft curtain side trailer. We are more than happy to assist you in the delivery of the picnic benches using our own dedicated truck fleet. If the picnic benches are being delivered to multiple areas within a site we would recommend using a Moffett onsite to move the benches efficiently. Check out our Blog: Garden Party Ideas for the Ultimate Summer Celebration",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/blog/garden-party-ideas-for-the-ultimate-summer-celebration-/?srsltid=AfmBOorsOeSYb_e3i9mcRlawQTuHdTGkLRIxY_OZI28z9JYOuXX2I8YO",
        ],
      },
      {
        sku: "1000934",
        name: "Patio Heater",
        description:
          "Keep your guests warm and comfortable with our portable outdoor Patio Heaters, ideal for evening events, garden parties, weddings, and outdoor gatherings. This heater comes in two parts for easy setup and transport. The heat deflector distributes warmth over a generous 8-foot radius, making it perfect for creating a cosy atmosphere.\n\nKey Features:\n\nPortable and easy to assemble\nEffective heat coverage: up to 8ft radius\nRequires 1 x 25lb Propane Gas (hired separately)\nSuitable for various outdoor events                                                                                     CaterHire Top Tip:                                                                                Check out our Blog: Garden Party Ideas for the Ultimate Summer Celebration!",
        links: ["https://www.caterhire.ie/propane-gas-cylinder-25lb-11kg/"],
        blogs: [
          "https://www.caterhire.ie/blog/garden-party-ideas-for-the-ultimate-summer-celebration-/?srsltid=AfmBOorsOeSYb_e3i9mcRlawQTuHdTGkLRIxY_OZI28z9JYOuXX2I8YO",
        ],
      },
      {
        sku: "OXFORD04",
        name: "Oxford Silk White 4 Seater Set",
        description:
          "If you are looking to add some style and elegance to your outdoor event, you will certainly achieve this with our Oxford Silk White 4 seater cast aluminium set. The set includes round cast aluminium table, 4 armchairs and beige cushions. Available for short and long term hire.\n\nKey Features\n\nStylish 4 Seater set with scroll design\nLightweight (cast aluminium)\nErgonomically designed chairs for comfort\nShowerproof cushions\nStackable chairs\nFitting for parasol\nDimensions\n\nTable\nDiameter: 137cm/54”\nHeight: 74cm/29”\n\nChair\n\nLength 47cm/19”\nWidth 43cm/17”                                                                                Height: 93cm/37”\n\nCaterhire Top Tip\n\nWe have everything you need to create the perfect outdoor event. From our elegant garden sets and rattan furniture to parasols, patio heaters, BBQs and much more.                     CaterHire Top Tip:                                                                                                                   Check out our Blog: Garden Party Ideas for the Ultimate Summer Celebration!",
        links: [
          "https://www.caterhire.ie/garden-table-and-chairs-set-wooden-for-hire/",
          "https://www.caterhire.ie/milan-rattan-bistro-set-for-hire/",
          "https://www.caterhire.ie/cream-parasol/",
          "https://www.caterhire.ie/patio-heater/",
          "https://www.caterhire.ie/charcoal-bbq/",
        ],
        blogs: [
          "https://www.caterhire.ie/blog/garden-party-ideas-for-the-ultimate-summer-celebration-/?srsltid=AfmBOorsOeSYb_e3i9mcRlawQTuHdTGkLRIxY_OZI28z9JYOuXX2I8YO",
        ],
      },
    ];
    require("./config/config").config("ch");
    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const row = data[i];

      if (
        getChanges()
          .map((r) => r.sku)
          .includes(row.sku)
      ) {
        continue;
      }

      let product = await getProductBySku(row.sku);
      if (!product) {
        const products = await getAllProducts({ sku: row.sku });
        if (!products.length || products.length > 1) {
          fs.appendFileSync(
            path.resolve(__dirname, `table-service-errors.txt`),
            `no products (${products.length}) found on caterhire for sku ${row.sku}`,
            { encoding: "utf-8" }
          );
          continue;
        }
        product = products[0];
      }
      console.log(product.name);
      if (row.name) console.log(row.name);
      console.log(row.sku);

      let additionalContext = "";
      if (row.links && row.links.length) {
        additionalContext += ` Product/Category Links to include: ${JSON.stringify(
          row.links
        )}.`;
      }
      if (row.blogs && row.blogs.length) {
        additionalContext += ` Blog Posts to include: ${JSON.stringify(
          row.blogs
        )}.`;
      }
      const description = await generateProductDescription(
        row.description,
        additionalContext,
        caterhirePrompt
      );

      // update
      const updates: any = { description };
      //if (row.name) updates.name = row.name;
      await updateProduct(product!.id, updates);

      saveChange({
        sku: row.sku,
        before: product!.description,
        after: description,
      });
    }
  } catch (err: any) {
    console.log(err.response.data ?? err.response ?? err);
  }
}
test();
