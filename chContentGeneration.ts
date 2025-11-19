require("./config/config").config("ch");
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
        name: "Black Cotton Napkin",
        sku: "522",
        description:
          "Perfect your table setting with these chic black cotton napkins, designed to infuse elegance into any occasion. Crafted from high-quality cotton, they offer both style and functionality, making them a perfect addition to your event. Plus, their simple yet sophisticated design ensures they complement any d&eacute;cor, creating a seamless and polished look for your table. Key Features:Luxurious black cotton fabric - Professional laundering included with hire - Perfect for formal and casual events. CaterHire Top Tip: Enhance your table setting by pairing these napkins with our elegant tablecloths and chic glassware to create a cohesive aesthetic!",
        blogs: [],
        links: [
          "https://www.caterhire.ie/tablecloths/",
          "https://www.caterhire.ie/products/glassware-hire/",
        ],
      },
      {
        name: "Black Round Tablecloth 130in",
        sku: "533",
        description:
          "Make a stylish impact at any event with our 130-inch Black Round Tablecloth, crafted from high-quality coloured cotton linen. Perfect for creating a sleek and elegant setting for weddings, parties, or corporate occasions.\n\nKey Features\n\n\nMade from durable coloured cotton linen.\nAdds a professional and refined finish to your event. Suitable for weddings, banquets, and special occasions.                                                                                Case Size: 1 Per Case  Colour: Black                                                           Dimensions: 130in/330cm. CaterHire Top Tips: Pair with our 6ft round table for the perfect match! Check out our Blog: Everything You Need to Know About Table Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: ["https://www.caterhire.ie/table-round-6ft-for-hire/"],
      },
      {
        name: "Blue Cotton Ivy Leaf Napkin - 20in x 20in",
        sku: "575",
        description:
          "Add a touch of elegance to your table setting with our Blue Ivy Leaf Napkin. Its rich, crisp hue brings a sophisticated charm to any dining experience, making it perfect for both intimate gatherings and grand events. Enjoy the convenience of our hire service, which includes professional laundry of the napkins after your event, so you can focus on celebrating without the hassle! Key Features: Mix or match with our stylish tablecloth range. Colour: Blue with Ivy Leaf print. Choose from a wide variety of coloured napkins to complement your theme. Dimensions: 20in x 20in/ 50.8cm x 50.8cm CaterHire Top Tip: Check out our Blog: Everything You Need to Know About Table Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Blue Round Tablecloth 120in",
        sku: "552",
        description:
          "Transform your event with our vibrant Blue Round Tablecloth, designed to add a splash of colour and a touch of elegance. Crafted from premium cotton linen, this tablecloth is perfect for creating an inviting atmosphere for any gathering. Whether you&rsquo;re hosting a wedding, party, or corporate event, its rich hue and luxurious feel will leave a lasting impression on your guests. Key Features: Lively blue colour to enhance any event theme - High-quality cotton linen for a sophisticated and soft texture - Ideal for both formal and casual occasions. Dimensions: 304.8cm / 120in                                                                      Caterhire Top Tips: Check out our Blog: ?Everything You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Chair Cover Ivory",
        sku: "1000761",
        description:
          "Our elegant ivory chair covers are a popular choice for weddings, banquets and special events. Designed to fit our standard banquet chairs, they instantly elevate any venue and can be styled with bows, sashes or runners to match your colour scheme.\n\nKey Features\n\nIvory Poly Cotton – Stylish and durable fabric.\nPerfect Fit – Tailored for our standard banquet chairs.\nTransform Any Venue – Instantly dresses up plain chairs.\nCustomisable Style – Pair with bows, napkins, and table runners.                                                                  CaterHire Top Tip: Check out our Blog: Eve.rything You Need to Know About Table Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Chair Cover White",
        sku: "1000763",
        description:
          "Our elegant white chair covers are a popular choice for weddings, banquets and special events. Designed to fit our standard banquet chairs, they instantly elevate any venue and can be styled with bows, sashes or runners to match your colour scheme.\n\nKey Features\n\nWhite Poly Cotton – Stylish and durable fabric.\nPerfect Fit – Tailored for our standard banquet chairs.\nTransform Any Venue – Instantly dresses up plain chairs.\nCustomisable Style – Pair with bows, napkins, and table runners.                                                                  CaterHire Top Tip: Check out our Blog: Eve.rything You Need to Know About Table Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Conference Cloth Blue 120in x 54in",
        sku: "585",
        description:
          'Our blue conference cloth is a practical and professional choice for meetings, training sessions, seminars, and large conferences. Designed to fit standard trestle tables, it instantly creates a neat, uniform look for your event. The hire price includes professional laundry, so you can focus on hosting without worrying about linen care afterwards.\n\nKey Features:\n\nBlue conference cloth\n\nSuitable for 8ft & 6ft rectangular trestle tables\nSeats up to 6 people on each side\nCase Size: 1 per case                                                                             Colour: Blue \n\nDimensions:\n\n120in x 54in /304.8 cm x 137.16 cm\n\n\nCaterhire Top Tip:\nThis cloth is best suited for 8ft tables, giving a 12" linen drop on the ends and a 15" drop on each side. Check out Our Blog: Everything You Need to Know about Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Conference Cloth Blue 120in x 60in",
        sku: "1000656",
        description:
          'Our conference cloths are a popular choice for business meetings, seminars, and conferences. They provide a smart and professional finish to your tables, helping create a tidy and uniform look for your event. The hire price includes full laundry service, so you don’t have to worry about linen care afterwards.\n\nKey Features\n\nConference cloth                                                                                     Colour: Blue                                                                                                                      Case Size: 1 Per Case \nFits 8ft & 6ft rectangular trestle tables\nSeats up to 4 people on each side                                                             Dimensions: 120in x 60in/ 304.8cm x 152.4cm\n\nCaterhire Top Tip\nThis cloth is most often used on 8ft tables. It provides a 12" linen drop on the ends and a 15" drop on each side. Check out our Blog: Everything You Need to Know about Table Linen Hire!',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Conference Cloth Green 120in x 60in",
        sku: "882",
        description:
          'Our conference cloths are a popular choice for business meetings, seminars, and conferences. They provide a smart and professional finish to your tables, helping create a tidy and uniform look for your event. The hire price includes full laundry service, so you don’t have to worry about linen care afterwards.\n\nKey Features\n\nConference cloth                                                                                     Colour: Green                                                                                                                     Case Size: 1 Per Case \nFits 8ft & 6ft rectangular trestle tables\nSeats up to 4 people on each side                                                             Dimensions: 120in x 60in/ 304.8cm x 152.4cm\n\nCaterhire Top Tip\nThis cloth is most often used on 8ft tables. It provides a 12" linen drop on the ends and a 15" drop on each side. Check out our Blog: Everything You Need to Know about Table Linen Hire!',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Forest Green Ivy Leaf Napkin",
        sku: "550",
        description:
          "Add a touch of elegance to your table setting with our Forest Green Ivy Napkin. Its rich, crisp hue brings sophisticated charm to any occasion, making it an ideal choice for everything from intimate dinners to large celebrations.\n\nWith our hire service, professional laundry is included, so you can enjoy your event without the hassle of post-party linen care.\n\nKey Features:\n\nMix and match with our stylish tablecloth range\nWide variety of coloured napkins available to complement your theme.                                                                                                                      Colour: Forest Green                                                                                     Case Size: 1 Per Case                                                                                        CaterHire Top Tip: Check out our Blog: Everything You Need to Know about Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Green Gingham Tablecloth 70in x 144in",
        sku: "GL 598",
        description:
          'Add a fresh, summery touch to your table setting with our beautiful green gingham tablecloth. Featuring a timeless check design, this linen is perfect for outdoor celebrations, countryside weddings, garden parties, and alfresco dining. Pair it with our rustic or trestle tables for a relaxed, inviting look.\n\nInspired by lush greenery and forest tones, the green gingham brings natural elegance to any occasion. Style it with our green or white rattan charger plates and diamond goblets to enhance those laid-back summer vibes.\n\nThe hire price includes professional laundering, so you can enjoy your event stress-free, no washing required!\n\nKey Features:\n\nClassic gingham tablecloth \nFits 8ft x 24" and 8ft x 30" trestle tables\nLinen laundry included in the hire price\nColour: Green \nMatching trestle tables also available to hire   Case Size: 1 Per Case         \n\nDimensions:\n\n70in x 144in/177.8cm x 365.76cm\n\nCaterhire Top Tip:\nOur standard trestle table height is 30". This cloth will provide:\nA 23" drop on the sides of an 8ft x 24" table\nA 20" drop on the sides of an 8ft x 30" table. Check our Blog: All You Need to Know about Table Linen Hire!',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Grey Hemstitched Signature Napkin",
        sku: "1000233",
        description:
          "Elevate your table setting with our exquisite grey hemstitch napkins, designed to bring sophistication and charm to any occasion. The elegant hemstitched border adds a refined detail that won’t go unnoticed, making these napkins a perfect choice for weddings, formal dinners, and special celebrations.\n\nWith our convenient hire service, professional laundry is included in the price, so you can enjoy your event without the hassle of post-party clean up.\n\nKey Features:\n\nElegant hemstitched border for a refined look\nPerfect for weddings, dinners, and special occasions\nHire includes laundry service for convenience\nColour: Grey\nCase size: 1\n\nCaterhire Top Tip: Check out our Blog: All You Need to Know about Table Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Hemstitched Linen Napkin White 20in x 20in",
        sku: "2021",
        description:
          "These beautiful napkins add a refined finishing touch to your table setting. Made from 100% white cotton, they feature an elegant hemstitched border that makes them perfect for weddings, formal dinners, and other special occasions.\n\nThe hire price includes professional laundry, so you can enjoy your event without worrying about post-party linen care.\n\nKey Features:\n\n100% white cotton napkin\nElegant hemstitched border design\nLinen laundry included in hire price\nRange of tablecloths available to hire                                                  Case Size: 1 Per Case \nAlso available in grey hemstitch*\nPairs beautifully with our tableware. Dimensions: 20in x 20in / 50.8cm x 50.8cm. CaterHire Top Tip: Check out our Blog: All You Need to Know About Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Napkin Butter Ivory 20in x 20in",
        sku: "1000613",
        description:
          "The signature range is our premium napkin offering. Our crisp ivory napkins are very popular to hire for banquets, parties and weddings. The hire price includes laundry of the napkins.Key Features: Cotton soft feel napkin Colour: Ivory                                                                                                     Linen laundry included in hire price.                                                                                           Case Size: 1 Per Case.                                                                                            Dimensions:                                                                                                                             20in x 20in / 50.8cm x 50.8cm           CaterHire Top Tip: Check out our Blog: Everything You Need to Know About Table Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Napkin Majestic Creme 20in x 20in",
        sku: "1000855",
        description:
          "The signature range is our premium napkin offering. Our majestic creme napkins are very popular to hire for banquets, parties and weddings. The hire price includes laundry of the napkins.Key Features: Cotton soft feel napkin Colour: Majestic Creme                                                                                                   Linen laundry included in hire price.                                                                                           Case Size: 1 Per Case.                                                                                            Dimensions:                                                                                                                             20in x 20in / 50.8cm x 50.8cm           CaterHire Top Tip: Check out our Blog: Everything You Need to Know About Table Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Napkin Satin Gold 20in x 20in",
        sku: "2023",
        description:
          "The signature range is our premium napkin offering. Our gold satin napkins are very popular to hire for banquets, parties and weddings. The hire price includes laundry of the napkins.Key Features: Cotton soft feel napkin Colour: Gold                                                                                                     Linen laundry included in hire price.                                                                                           Case Size: 1 Per Case.                                                                                            Dimensions:                                                                                                                             20in x 20in / 50.8cm x 50.8cm           CaterHire Top Tip: Check out our Blog: Everything You Need to Know About Table Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Napkin White 20in x 20in",
        sku: "1000601",
        description:
          "The signature range is our premium napkin offering. Our crisp white napkins are very popular to hire for banquets, parties and weddings. The hire price includes laundry of the napkins.Key Features: Cotton soft feel napkin Colour: White                                                                                                  Linen laundry included in hire price.                                                                                           Case Size: 1 Per Case.                                                                                            Dimensions:                                                                                                                             20in x 20in / 50.8cm x 50.8cm           CaterHire Top Tip: Check out our Blog: Everything You Need to Know About Table Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Napkins For Sale - White 20in x 20in",
        sku: "SL01",
        description:
          "Elegant White Napkins For Sale. Add a touch of sophistication to your table with our strong white napkins. These napkins are soft to the touch, durable, and designed to elevate any dining experience. Timeless white, versatile for any occasion. Generously sized at 20 x 20 inches, perfect for formal or casual table settings. Machine washable for easy upkeep, maintaining their elegance wash after wash. While we specialize in linen hire, we are pleased to offer a selection of linens for sale, including these napkins. Perfect for weddings, dinner parties or everyday elegance, they are a stylish investment for your home or business.                                                                                                                                                                                                         Dimensions: 20 in x 20in / 50.8cm x 50.8cm                                                                                                                                                                                                                                                             How to Purchase: As our site primarily caters to linen hire, follow these steps to purchase your napkins: Add to Cart:  Select the quantity you wish to purchase and add it to your cart. At Checkout, select  pick up as your collection option. Provide Collection Dates: Enter two dates when prompted:First Date: Your collection date.Second Date: You may enter the same date. If you would like the linen delivered. Please contact the team directly to discuss your options. Stock is limited, so don't wait! Secure your elegant white napkins today!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Cloth Black - 70in x 108in",
        sku: "510BL",
        description:
          'Our black cotton tablecloths are a popular choice for conferences, buffets, and dining events. They are designed to fit our 6ft tables in a variety of widths, providing a smart and professional look for any occasion.\n\nThe hire price includes professional laundry, so you don’t have to worry about linen care after your event.\n\nKey Features:\n\nColour: Black       Case Size: 1 Per Case \n\n\nFits 6ft x 24", 6ft x 30", and 6ft x 36" tables\n\nLinen laundry included in hire price\nBanquet tables available to hire\nAlso available in blue, red, ivory,and white\nMatching napkins available to hire\n\nDimensions:\n\n70in x 108in / 177.8 cm x 274.32 cm\n\nCaterhire Top Tip:\nThe standard height of our tables is 30". This cloth provides:\nA 23" drop on the sides of a 6ft x 24" table\nA 20" drop on the sides of a 6ft x 30" table.   Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Cloth Black - 70in x 144in",
        sku: "509BL",
        description:
          'Our black tablecloths are a popular choice for conferences, buffets, and dining events. Designed to fit our 8ft tables, they provide a sleek and professional finish, making them ideal for both corporate and private functions.\n\nThe hire price includes professional laundry, so you don’t need to worry about linen care after your event.\n\nKey Features:\n\nColour: Black  \nFits 8ft x 24" and 8ft x 30" tables\nLinen laundry included in hire price\nBanquet tables available to hire\nAlso available in blue, red, ivory and white\nMatching napkins available to hire                                                                        Case Size: 1 Per Case \n\nDimensions:\n70in x 144in / 177.8 cm x 365.76 cm\n\nCaterhire Top Tip:\nThe standard height of our tables is 30". This cloth provides:\nA 23" drop on the sides of an 8ft x 24" table\nA 20" drop on the sides of an 8ft x 30" table. Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Cloth Blue - 60in x 60in",
        sku: "521",
        description:
          'Our blue cotton tablecloths are a popular choice for conferences, buffets, and dining events. Designed to fit our 8ft tables, they bring a smart and professional finish to your setting.\n\nThe hire price includes professional laundry, so you don’t have to worry about linen care after your event.\n\nKey Features:\n\nColour: Blue \nFits 8ft x 24" and 8ft x 30" tables\nLinen laundry included in hire price\nBanquet tables available to hire\nAlso available in black, red, ivory and white\nMatching napkins available to hire\nCase Size: 1 Per Case \nDimensions:\nSize: 60in x 60in\n152.4 cm x 152.4 cm\n\n\nCaterhire Top Tip:\nThe standard height of our tables is 30". This cloth provides:\nA 23" drop on the sides of an 8ft x 24" table\nA 20" drop on the sides of an 8ft x 30" table. Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Cloth Burgundy - 54in x 70in",
        sku: "553",
        description:
          'Our burgundy tablecloths are a popular choice for conferences, buffets, and dining events. Designed to fit our 8ft tables, they bring a rich, elegant finish to your setting, making them perfect for both corporate and private occasions.\n\nThe hire price includes professional laundry, so you can enjoy your event without worrying about linen care afterwards.\n\nKey Features:\n\nFits 8ft x 24" and 8ft x 30" tables\nColour: Burgundy\nLinen laundry included in hire price\nBanquet tables available to hire\nAlso available in blue, red, ivory and white \nCase Size: 1 Per Case \nMatching napkins available to hire\n\nDimensions:\n\n54in x 70in / 137.16 cm x 177.8 cm\n\nCaterhire Top Tip:\nThe standard height of our tables is 30". This cloth provides:\nA 23" drop on the sides of an 8ft x 24" table\nA 20" drop on the sides of an 8ft x 30" table. Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Cloth Ivory - 90in x 90in",
        sku: "738",
        description:
          'Our ivory cotton tablecloths are a popular choice for banquet and dining events. Designed to fit our 5ft round tables, they add a classic and elegant finish to any occasion. The hire price includes professional laundry, so you can enjoy your event without worrying about linen care afterwards.\n\nKey Features:\n\nFits 5ft round tables (corners will drop to the floor)\nLinen laundry included in hire price\nTrestle tables also available to hire\nColour: Ivory \nAlso available in black, red, blue, and white\nMatching napkins available to hire\nCase Size: 1 Per Case \nDimensions:\n\n 90in  x 90in / 228.6 cm x 228.6 cm\n\nCaterhire Top Tip:\nThe standard height of our tables is 30". This cloth will provide a 15" drop on a 5ft round table. Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Cloth White - 36in x 36in",
        sku: "500",
        description:
          'Our white tablecloths are a popular choice for banquet and dining events. Designed to fit our 5ft round tables, they create a classic and elegant look, perfect for both formal and casual occasions.\n\nThe hire price includes professional laundry, so you can enjoy your event without worrying about linen care afterwards.\n\nKey Features:\n\nColour: White\nCase size: 1 per case\nFits 5ft round tables (corners will drop to the floor)\nLinen laundry included in hire price\nTrestle tables also available to hire\nAlso available in ivory, black, and blue\nMatching napkins available to hire\n\nDimensions:\n\n36in x 36in / 91.44 cm x 91.44 cm\n\nCaterhire Top Tip:\nThe standard height of our tables is 30". This cloth will provide a 15" drop on a 5ft round table. Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Skirting - Burgundy - 21ft",
        sku: "586",
        description:
          'Table skirting is a must-have for conferences, banquets and buffets. Perfect for dressing banquet tables, it provides a smart, professional finish for any event. The hire price includes professional laundry, so you don’t need to worry about linen care after use.\n\nKey Features:\n\nColour: Burgundy\nCase Size: 1 Per Case\nDrops to the floor (for a standard 30" high table)\nFits 6ft & 8ft rectangular trestle tables\nSkirting covers the sides of the table only\nRequires 15 clips (supplied separately)\n54" x 120" cloths will cover a 6ft trestle tabletop\n72" x 144" cloths will cover an 8ft trestle tabletop\nAvailable to hire in a variety of colours\n\nDimensions:\n\n21ft / 252in / 640 cm\n\nCaterhire Top Tip:\nThis table skirting will cover the sides of the following trestle tables:\n\n6ft x 2ft\n6ft x 2.5ft\n6ft x 3ft\n8ft x 2ft\n8ft x 2.5ft                   Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Skirting - Ivory 21ft",
        sku: "564",
        description:
          'Table skirting is a must-have for conferences, banquets and buffets. Perfect for dressing banquet tables, it provides a smart, professional finish for any event. The hire price includes professional laundry, so you don’t need to worry about linen care after use.\n\nKey Features:\n\nColour: Ivory\nCase Size: 1 Per Case\nDrops to the floor (for a standard 30" high table)\nFits 6ft & 8ft rectangular trestle tables\nSkirting covers the sides of the table only\nRequires 15 clips (supplied separately)\n54" x 120" cloths will cover a 6ft trestle tabletop\n72" x 144" cloths will cover an 8ft trestle tabletop\nAvailable to hire in a variety of colours\n\nDimensions:\n\n21ft / 252in / 640 cm\n\nCaterhire Top Tip:\nThis table skirting will cover the sides of the following trestle tables:\n\n6ft x 2ft\n6ft x 2.5ft\n6ft x 3ft\n8ft x 2ft\n8ft x 2.5ft                   Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Skirting Black 21ft",
        sku: "576",
        description:
          'Table skirting is a must-have for conferences, banquets and buffets. Perfect for dressing banquet tables, it provides a smart, professional finish for any event. The hire price includes professional laundry, so you don’t need to worry about linen care after use.\n\nKey Features:\n\nColour: Black\nCase Size: 1 Per Case\nDrops to the floor (for a standard 30" high table)\nFits 6ft & 8ft rectangular trestle tables\nSkirting covers the sides of the table only\nRequires 15 clips (supplied separately)\n54" x 120" cloths will cover a 6ft trestle tabletop\n72" x 144" cloths will cover an 8ft trestle tabletop\nAvailable to hire in a variety of colours\n\nDimensions:\n\n21ft / 252in / 640 cm\n\nCaterhire Top Tip:\nThis table skirting will cover the sides of the following trestle tables:\n\n6ft x 2ft\n6ft x 2.5ft\n6ft x 3ft\n8ft x 2ft\n8ft x 2.5ft                   Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Skirting Blue 21ft",
        sku: "1000659",
        description:
          'Table skirting is a must-have for conferences, banquets and buffets. Perfect for dressing banquet tables, it provides a smart, professional finish for any event. The hire price includes professional laundry, so you don’t need to worry about linen care after use.\n\nKey Features:\n\nColour: Blue\nCase Size: 1 Per Case\nDrops to the floor (for a standard 30" high table)\nFits 6ft & 8ft rectangular trestle tables\nSkirting covers the sides of the table only\nRequires 15 clips (supplied separately)\n54" x 120" cloths will cover a 6ft trestle tabletop\n72" x 144" cloths will cover an 8ft trestle tabletop\nAvailable to hire in a variety of colours\n\nDimensions:\n\n21ft / 252in / 640 cm\n\nCaterhire Top Tip:\nThis table skirting will cover the sides of the following trestle tables:\n\n6ft x 2ft\n6ft x 2.5ft\n6ft x 3ft\n8ft x 2ft\n8ft x 2.5ft                   Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Skirting Grey 21ft",
        sku: "570",
        description:
          'Table skirting is a must-have for conferences, banquets and buffets. Perfect for dressing banquet tables, it provides a smart, professional finish for any event. The hire price includes professional laundry, so you don’t need to worry about linen care after use.\n\nKey Features:\n\nColour: Grey\nCase Size: 1 Per Case\nDrops to the floor (for a standard 30" high table)\nFits 6ft & 8ft rectangular trestle tables\nSkirting covers the sides of the table only\nRequires 15 clips (supplied separately)\n54" x 120" cloths will cover a 6ft trestle tabletop\n72" x 144" cloths will cover an 8ft trestle tabletop\nAvailable to hire in a variety of colours\n\nDimensions:\n\n21ft / 252in / 640 cm\n\nCaterhire Top Tip:\nThis table skirting will cover the sides of the following trestle tables:\n\n6ft x 2ft\n6ft x 2.5ft\n6ft x 3ft\n8ft x 2ft\n8ft x 2.5ft                   Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Skirting Purple 21ft",
        sku: "538",
        description:
          'Table skirting is a must-have for conferences, banquets and buffets. Perfect for dressing banquet tables, it provides a smart, professional finish for any event. The hire price includes professional laundry, so you don’t need to worry about linen care after use.\n\nKey Features:\n\nColour: Purple    Case Size: 1 Per Case\nDrops to the floor (for a standard 30" high table)\nFits 6ft & 8ft rectangular trestle tables\nSkirting covers the sides of the table only\nRequires 15 clips (supplied separately)\n54" x 120" cloths will cover a 6ft trestle tabletop\n72" x 144" cloths will cover an 8ft trestle tabletop\nAvailable to hire in a variety of colours\n\nDimensions:\n\n21ft / 252in / 640 cm\n\nCaterhire Top Tip:\nThis table skirting will cover the sides of the following trestle tables:\n\n6ft x 2ft\n6ft x 2.5ft\n6ft x 3ft\n8ft x 2ft\n8ft x 2.5ft                   Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Skirting Red 21ft",
        sku: "565",
        description:
          'Table skirting is a must-have for conferences, banquets and buffets. Perfect for dressing banquet tables, it provides a smart, professional finish for any event. The hire price includes professional laundry, so you don’t need to worry about linen care after use.\n\nKey Features:\n\nColour: Red    Case Size: 1 Per Case\nDrops to the floor (for a standard 30" high table)\nFits 6ft & 8ft rectangular trestle tables\nSkirting covers the sides of the table only\nRequires 15 clips (supplied separately)\n54" x 120" cloths will cover a 6ft trestle tabletop\n72" x 144" cloths will cover an 8ft trestle tabletop\nAvailable to hire in a variety of colours\n\nDimensions:\n\n21ft / 252in / 640 cm\n\nCaterhire Top Tip:\nThis table skirting will cover the sides of the following trestle tables:\n\n6ft x 2ft\n6ft x 2.5ft\n6ft x 3ft\n8ft x 2ft\n8ft x 2.5ft                   Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Skirting White 21ft",
        sku: "1000654",
        description:
          'Table skirting is a must-have for conferences, banquets and buffets. Perfect for dressing banquet tables, it provides a smart, professional finish for any event. The hire price includes professional laundry, so you don’t need to worry about linen care after use.\n\nKey Features:\n\nColour: White   Case Size: 1 Per Case\nDrops to the floor (for a standard 30" high table)\nFits 6ft & 8ft rectangular trestle tables\nSkirting covers the sides of the table only\nRequires 15 clips (supplied separately)\n54" x 120" cloths will cover a 6ft trestle tabletop\n72" x 144" cloths will cover an 8ft trestle tabletop\nAvailable to hire in a variety of colours\n\nDimensions:\n\n21ft / 252in / 640 cm\n\nCaterhire Top Tip:\nThis table skirting will cover the sides of the following trestle tables:\n\n6ft x 2ft\n6ft x 2.5ft\n6ft x 3ft\n8ft x 2ft\n8ft x 2.5ft                   Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Table Skirting White 9ft",
        sku: "1000657",
        description:
          'Table skirting is a must-have for conferences, banquets and buffets. It’s a quick and stylish way to dress trestle tables, giving them a professional and elegant finish. The hire price includes professional laundry, so you don’t need to worry about linen care after your event.\n\nKey Features:\n\nColour: White\n(requires 15 clips)                                                                                         Case Size: 1 Per Case \nQuick and easy way to dress a trestle table\nSkirting covers the sides of the table only\nRequires a 70" x 70" cloth to cover the tabletop\nDrops to the floor (for a standard 30" high table)\nDimensions                          9ft/108in\nCaterhire Top Tip:\nThis 9ft skirting will cover the sides of the following trestle tables:\n4ft x 2ft\n4ft x 2.5ft Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Black 70in x 70in",
        sku: "1000694",
        description:
          'Our black cotton tablecloths are very popular to hire for conferences, buffets, and dining. Designed to fit 4ft rectangular tables as well as 3ft and 4ft round tables, they add a smart and versatile finish to your event.\n\nThe hire price includes professional laundry, so you don’t have to worry about linen care after the event.\n\nKey Features:\nColour: Black \nFits 4ft x 24", 4ft x 30", and 3ft/4ft round tables\nLinen laundry included in hire price\nBanquet tables also available to hire\nAlso available in blue, red, ivory and white\nMatching napkins available to hire                                                                                             Case Size: 1 Per Case                                                                                             Dimensions:                                                                                                                                       70in x 70in / 177.8cm x 177.8cm \n\nCaterhire Top Tip:\nThe standard height of our tables is 30". This cloth provides:\nA 23" drop on the sides of a 4ft x 24" table\nA 20" drop on the sides of a 4ft x 30" table. Check out our Blog: Everything You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Black 72in x 144in",
        sku: "1000632",
        description:
          'Our black cotton tablecloths are a popular choice for conferences, buffets, and dining. Designed to fit our 8ft rectangular trestle tables, they provide a sleek and professional finish, perfect for both corporate and private events.\n\nThe hire price includes professional laundry, so you don’t have to worry about linen care after your event.\n\nKey Features:\n\nFits 8ft x 24" & 8ft x 30" trestle tables\nLinen laundry included in hire price\nTrestle tables available to hire\nColour: Black\nAlso available in red, ivory, and white\nCase Size: 1 Per Case\nMatching napkins available to hire                                                                               Dimensions: \n72in x 144in / 182.88cm x 365.76cm\nCaterhire Top Tip:\nThe standard height of our tables is 30". This cloth provides:\nA 24" drop on the sides of an 8ft x 24" table\nA 21" drop on the sides of an 8ft x 30" table                                                             Check out our Blog: All You Need to Know About Table Linen Hire',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Black 90in x 90in",
        sku: "1000696",
        description:
          'Our black cotton tablecloths are a popular choice for banquet and dining events. Designed to fit our 5ft round tables, they add a sleek, elegant finish that works well for both formal and casual occasions.\n\nThe hire price includes professional laundry, so you can enjoy your event without worrying about linen care afterwards.\n\nKey Features:\n\nFits 5ft round tables (corners will drop to the floor)\nLinen laundry included in hire price\nTrestle tables also available to hire\nAlso available in red, ivory, and white\nMatching napkins available to hire                                                                            Colour: Black \nCase Size: 1 Per Case\nDimensions:\n\n90" x 90" / 228.6cm x 228.6cm \n\nCaterhire Top Tip:\nThe standard height of our tables is 30". This cloth will provide a 15" drop on a 5ft round table. Check out our Blog: All You Need to Know About Table Linen Hire!',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Black Round 118in",
        sku: "1000799",
        description:
          "Add a touch of sophistication to your table with our Black Round Tablecloth 118in. Crafted from high quality fabric, this tablecloth is soft to the touch, durable, and designed to elevate any dining experience from weddings and formal events to stylish home entertaining.\n\nKey Features:\n\nColour: Black\nShape: Round\nCase Size: 1 Per Case  \nDimensions:                                                                                                                                                                                 118in / 300cm floor length for a perfect fit on a 5ft round table\n\nCaterHire Top Tip: Check our our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Blue 54in x 120in",
        sku: "1000698",
        description:
          'Our blue cotton tablecloths are very popular to hire for conferences, buffets, and dining. This tablecloth is designed to fit our 6ft rectangular tables, making it a versatile and practical option for any occasion. The hire price includes laundry of the cloths, so you don’t have to worry about the linen after the event!\n\nKey Features\n\nColour: Blue \nLinen laundry included in hire price\nCase Size: 1 Per Case                                                         \nFits 6ft x 24" and 6ft x 30" trestle tables\nTrestle tables available to hire\nAlso available in red and black\nRange of napkins available to hire\n\nDimensions\n54" x 120in / 137cm x 305cm\n\nCaterhire Top Tips\nThe standard height of our tables is 30". This cloth provides a 15" drop on the sides of a 6ft x 24" table and a 12" drop on a 6ft x 30" table. Check out our Blog: All You Need to Know About Table Linen Hire!',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Blue 70in x 70in",
        sku: "1000602",
        description:
          'Our blue cotton tablecloths are a favorite for conferences, buffets and dining events. Designed to fit a variety of tables, these tablecloths are practical and stylish. The hire price includes laundry so you will not need to worry about cleaning after your event\n\nKey Features\n\nColour: Blue\nLinen laundry included in the hire price\nFits 4ft x 24, 4ft x 30 and 3ft/4ft round tables\nBanquet tables available to hire\nAlso available in black, ivory, red, and white\nCase Size: 1 Per Case \nRange of napkins available for hire\n\nDimensions\n70 x 70in / 177.8cm x 177.8cm\n\nCaterhire Top Tips                                                                                                                        For a standard table height 30":\n4ft x 24 table 23 drop on the sides\n4ft x 30 table 20 drop on the sides\nCheck out our Blog: All You Need to Know About Table Linen Hire!',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Blue 72in x 144in",
        sku: "1000631",
        description:
          "Our blue cotton tablecloths are very popular for conferences, buffets and dining events. This tablecloth fits our 8ft rectangular tables. The hire price includes laundry, so you do not need to worry about cleaning after the event.\n\nKey Features\n\nColour: Blue\nLinen laundry included in hire price\nFits 8ft x 24 and 8ft x 30 trestle tables\nTrestle tables available to hire\nTablecloths also available in red, ivory, black, and white\nRange of napkins available to hire\nCase Size: 1 Per Case\nDimensions\n\n72in x 144in / 183cm x 366cm\n\nCaterhire Top Tips\nStandard table height 30 inches:\n8ft x 24 table: 24-inch linen drop on the sides\n8ft x 30 table: 21-inch linen drop on the sides\n\nCheck out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Blue 90in x 90in",
        sku: "1000695",
        description:
          "Our blue cotton tablecloths are very popular for banquet and dining events. This tablecloth fits our 5ft round tables and is perfect for dressing up a table. The hire price includes laundry, so you do not need to worry about cleaning after the event.\n\nKey Features\n\nColour: Blue\nLinen laundry included in hire price\nFits 5ft round table (corners will drop to floor)\nTrestle tables also available to hire\nTablecloths also available in red, black, ivory and white\nCase Size: 1 Per Case\nRange of napkins available to hire\n\nDimensions\n\n90in x 90in / 229cm x 229 cm\n\nCaterhire Top Tips\n\nStandard table height 30 inches\nThis cloth will drop 15 inches on a 5ft round table\nThese tablecloths provide a polished, professional look for your event while saving you time on cleanup. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Butter Ivory 90in x 90in",
        sku: "1000623",
        description:
          'This tablecloth is made from specially designed fibers that provide a luxurious, soft-touch finish while maintaining the natural feel of cotton. Designed to fit our 5ft round tables, they add a sleek, elegant finish that works well for both formal and casual occasions.\n\nThe hire price includes professional laundry, so you can enjoy your event without worrying about linen care afterwards.\n\nKey Features:\n\nFits 5ft round tables (corners will drop to the floor)\nLinen laundry included in hire price\nTrestle tables also available to hire\nColour: Butter Ivory\nMatching napkins available to hire                                                                            \nCase Size: 1 Per Case\nDimensions:\n\n90" x 90" / 228.6cm x 228.6cm \n\nCaterhire Top Tip:\nThe standard height of our tables is 30". This cloth will provide a 15" drop on a 5ft round table. Check out our Blog: All You Need to Know About Table Linen Hire!',
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Butter Ivory Round 120in",
        sku: "1000624",
        description:
          "This fabric combines specially designed fibres to give a luxurious soft touch finish with a cotton soft feel. Laundry is included in the linen hire price so you can sit back, relax and enjoy your event!                                                                                 Key Features:                                                                                                                                   Colour: Butter Ivory                                                                                                             Case Size: 1 Per Case                                                                                                                             Laundry included in linen hire price                                                                                         Dimensions                                                                                                                         120in / 304.8cm                                                                                                                                  CaterHire Top Tip:                                                                                                                                   Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Butter Ivory Round 132in",
        sku: "1000625",
        description:
          "This fabric combines specially designed fibres to give a luxurious soft touch finish with a cotton soft feel. Laundry is included in the linen hire price so you can sit back, relax and enjoy your event!                                                                                 Key Features:                                                                                                                                   Colour: Butter Ivory                                                                                                             Case Size: 1 Per Case                                                                                                                             Laundry included in linen hire price                                                                                         Dimensions                                                                                                                         132in / 335.28cm                                                                                                                              CaterHire Top Tip:                                                                                                                                   Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Butter Ivory Round 156in",
        sku: "1000776",
        description:
          "This fabric combines specially designed fibres to give a luxurious soft touch finish with a cotton soft feel. Laundry is included in the linen hire price so you can sit back, relax and enjoy your event!                                                                                 Key Features:                                                                                                                                   Colour: Butter Ivory                                                                                                             Case Size: 1 Per Case                                                                                                                             Laundry included in linen hire price                                                                                         Dimensions                                                                                                                         132in / 396.24cm                                                                                                                           CaterHire Top Tip:                                                                                                                                   Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth For Sale - White 54in x 54in",
        sku: "SL02",
        description:
          '<p><strong>Elegant White Square Tablecloth 54" x 54" &ndash; For Sale</strong></p> <p>Add a touch of sophistication to your table with our <strong>White Square Tablecloth 54" x 54"</strong>. This tablecloth is soft to the touch, durable, and designed to elevate any dining experience.</p> <ul> <li><strong>Features:</strong> <ul> <li><strong>Colour:</strong> Timeless white, versatile for any occasion.</li> <li><strong>Shape:</strong> Square</li> <li><strong>Size:</strong> 54" x 54", this table cloth will fit our 2ft x 2ft trestle table.</li> <li><strong>Care:</strong> Machine washable for easy upkeep, maintaining their elegance wash after wash.</li> </ul> </li> </ul> <p>While we specialize in linen hire, we are pleased to offer a <strong>limited selection of linens for sale</strong>, including these exquisite tablecloths. Perfect for weddings, dinner parties, or everyday elegance, they are a stylish investment for your home or business.</p> <p><span style="color: #ff0000;"><strong>How to Purchase:</strong></span></p> <p><br />As our site primarily caters to linen hire, follow these steps to purchase your linen:</p> <ol> <li><strong>Add to Cart:</strong> Select the quantity you wish to purchase and add it to your cart.</li> <li><strong>At Checkout:</strong> Click on <strong>"store pick up"</strong> as your collection option.</li> <li><strong>Provide Collection Dates:</strong> Enter two dates when prompted: <ul> <li><strong>First Date:</strong> Your collection date.</li> <li><strong>Second Date:</strong> You may enter the same date.&nbsp;</li> </ul> </li> </ol> <p>If you would like the linen delivered. Please contact the team direclty to discuss your options. Stock is limited, so don&rsquo;t wait&mdash;secure your linen today!</p>',
        blogs: [],
        links: [],
      },
      {
        name: "Linen Tablecloth For Sale - White 70in x 108in",
        sku: "SL05",
        description:
          '<p><strong>Elegant White Square Tablecloth 70" x 108" &ndash; For Sale</strong></p> <p>Add a touch of sophistication to your table with our <span><strong>White Tablecloth 70" x 108"</strong></span>. This tablecloth is soft to the touch, durable, and designed to elevate any dining experience.</p> <ul> <li><strong>Features:</strong> <ul> <li><strong>Colour:</strong><span>&nbsp;</span>Timeless white, versatile for any occasion.</li> <li><strong>Shape:</strong><span>&nbsp;</span>Rectangle</li> <li><strong>Size:</strong><span>&nbsp;</span>70" x 108", will fit our 6ft x 2ft, 6ft x 2.5ft and 6ft x 3tft trestle tables</li> <li><strong>Care:</strong><span>&nbsp;</span>Machine washable for easy upkeep, maintaining their elegance wash after wash.</li> </ul> </li> </ul> <p>While we specialize in linen hire, we are pleased to offer a<span>&nbsp;</span><strong>limited selection of linens for sale</strong>, including these exquisite tablecloths. Perfect for weddings, dinner parties, or everyday elegance, they are a stylish investment for your home or business.</p> <p><span style="color: #ff0000;"><strong>How to Purchase:</strong></span></p> <p>As our site primarily caters to linen hire, follow these steps to purchase your linen:</p> <ol> <li><strong>Add to Cart:</strong><span>&nbsp;</span>Select the quantity you wish to purchase and add it to your cart.</li> <li><strong>At Checkout:</strong><span>&nbsp;</span>Click on<span>&nbsp;</span><strong>"store pick up"</strong><span>&nbsp;</span>as your collection option.</li> <li><strong>Provide Collection Dates:</strong><span>&nbsp;</span>Enter two dates when prompted: <ul> <li><strong>First Date:</strong><span>&nbsp;</span>Your collection date.</li> <li><strong>Second Date:</strong><span>&nbsp;</span>You may enter the same date.&nbsp;</li> </ul> </li> </ol> <p>If you would like the linen delivered. Please contact the team direclty to discuss your options. Stock is limited, so don&rsquo;t wait&mdash;secure your linen today!</p>',
        blogs: [],
        links: [],
      },
      {
        name: "Linen Tablecloth For Sale - White 70in x 144in",
        sku: "SL06",
        description:
          '<p><strong>Elegant White Tablecloth 70" x 144" &ndash; For Sale</strong></p> <p>Add a touch of sophistication to your table with our <span><strong>White Tablecloth 70" x 144"</strong></span>. This tablecloth is soft to the touch, durable, and designed to elevate any dining experience.</p> <ul> <li><strong>Features:</strong> <ul> <li><strong>Colour:</strong><span>&nbsp;</span>Timeless white, versatile for any occasion.</li> <li><strong>Shape:</strong><span> Rectangle</span></li> <li><strong>Size:</strong><span>&nbsp;</span>70" x 144", this table cloth will fit our 8ft x 2ft trestle tables</li> <li><strong>Care:</strong><span>&nbsp;</span>Machine washable for easy upkeep, maintaining their elegance wash after wash.</li> </ul> </li> </ul> <p>While we specialize in linen hire, we are pleased to offer a<span>&nbsp;</span><strong>limited selection of linens for sale</strong>, including these exquisite tablecloths. Perfect for weddings, dinner parties, or everyday elegance, they are a stylish investment for your home or business.</p> <p><span style="color: #ff0000;"><strong>How to Purchase:</strong></span></p> <p><br />As our site primarily caters to linen hire, follow these steps to purchase your linen:</p> <ol> <li><strong>Add to Cart:</strong><span>&nbsp;</span>Select the quantity you wish to purchase and add it to your cart.</li> <li><strong>At Checkout:</strong><span>&nbsp;</span>Click on<span>&nbsp;</span><strong>"store pick up"</strong><span>&nbsp;</span>as your collection option.</li> <li><strong>Provide Collection Dates:</strong><span>&nbsp;</span>Enter two dates when prompted: <ul> <li><strong>First Date:</strong><span>&nbsp;</span>Your collection date.</li> <li><strong>Second Date:</strong><span>&nbsp;</span>You may enter the same date.&nbsp;</li> </ul> </li> </ol> <p>If you would like the linen delivered. Please contact the team direclty to discuss your options. Stock is limited, so don&rsquo;t wait&mdash;secure your linen today!</p>',
        blogs: [],
        links: [],
      },
      {
        name: "Linen Tablecloth For Sale - White 70in x 70in",
        sku: "SL03",
        description:
          '<p><strong>Elegant White Square Tablecloth 70" x 70" &ndash; For Sale</strong></p> <p>Add a touch of sophistication to your table with our <strong>White Square Tablecloth 70" x 70"</strong>.This tablecloth is soft to the touch, durable, and designed to elevate any dining experience.</p> <ul> <li><strong>Features:</strong> <ul> <li><strong>Colour:</strong><span>&nbsp;</span>Timeless white, versatile for any occasion.</li> <li><strong>Shape:</strong><span>&nbsp;</span>Square</li> <li><strong>Size:</strong><span> 70</span>" x 70", this table cloth will fit our 4ft x 2ft and 4ft x 2.5ft trestle tables</li> <li><strong>Care:</strong><span>&nbsp;</span>Machine washable for easy upkeep, maintaining their elegance wash after wash.</li> </ul> </li> </ul> <p>While we specialize in linen hire, we are pleased to offer a<span>&nbsp;</span><strong>limited selection of linens for sale</strong>, including these exquisite tablecloths. Perfect for weddings, dinner parties, or everyday elegance, they are a stylish investment for your home or business.</p> <p><span style="color: #ff0000;"><strong>How to Purchase:</strong></span></p> <p><br />As our site primarily caters to linen hire, follow these steps to purchase your linen:</p> <ol> <li><strong>Add to Cart:</strong><span>&nbsp;</span>Select the quantity you wish to purchase and add it to your cart.</li> <li><strong>At Checkout:</strong><span>&nbsp;</span>Click on<span>&nbsp;</span><strong>"store pick up"</strong><span>&nbsp;</span>as your collection option.</li> <li><strong>Provide Collection Dates:</strong><span>&nbsp;</span>Enter two dates when prompted: <ul> <li><strong>First Date:</strong><span>&nbsp;</span>Your collection date.</li> <li><strong>Second Date:</strong><span>&nbsp;</span>You may enter the same date.&nbsp;</li> </ul> </li> </ol> <p>If you would like the linen delivered. Please contact the team direclty to discuss your options. Stock is limited, so don&rsquo;t wait&mdash;secure your linen today!</p>',
        blogs: [],
        links: [],
      },
      {
        name: "Linen Tablecloth For Sale - White 90in x 90in",
        sku: "SL04",
        description:
          '<p><strong>Elegant White Square Tablecloth 90" x 90" &ndash; For Sale</strong></p> <p>Add a touch of sophistication to your table with our <strong>White Square Tablecloth 90" x 90"</strong>. This tablecloth is soft to the touch, durable, and designed to elevate any dining experience.</p> <ul> <li><strong>Features:</strong> <ul> <li><strong>Colour:</strong><span>&nbsp;</span>Timeless white, versatile for any occasion.</li> <li><strong>Shape:</strong><span>&nbsp;</span>Square</li> <li><strong>Size:</strong><span> 90</span>" x 90", this table cloth will fit our 5ft and 6ft round table</li> <li><strong>Care:</strong><span>&nbsp;</span>Machine washable for easy upkeep, maintaining their elegance wash after wash.</li> </ul> </li> </ul> <p>While we specialize in linen hire, we are pleased to offer a<span>&nbsp;</span><strong>limited selection of linens for sale</strong>, including these exquisite tablecloths. Perfect for weddings, dinner parties, or everyday elegance, they are a stylish investment for your home or business.</p> <p><span style="color: #ff0000;"><strong>How to Purchase:</strong></span></p> <p><br />As our site primarily caters to linen hire, follow these steps to purchase your linen:</p> <ol> <li><strong>Add to Cart:</strong><span>&nbsp;</span>Select the quantity you wish to purchase and add it to your cart.</li> <li><strong>At Checkout:</strong><span>&nbsp;</span>Click on<span>&nbsp;</span><strong>"store pick up"</strong><span>&nbsp;</span>as your collection option.</li> <li><strong>Provide Collection Dates:</strong><span>&nbsp;</span>Enter two dates when prompted: <ul> <li><strong>First Date:</strong><span>&nbsp;</span>Your collection date.</li> <li><strong>Second Date:</strong><span>&nbsp;</span>You may enter the same date.&nbsp;</li> </ul> </li> </ol> <p>If you would like the linen delivered. Please contact the team direclty to discuss your options. Stock is limited, so don&rsquo;t wait&mdash;secure your linen today!</p>',
        blogs: [],
        links: [],
      },
      {
        name: "Linen Tablecloth For Sale - White Round 118in",
        sku: "SL07",
        description:
          'Add a touch of sophistication to your table with our White Round Tablecloth 118in. Crafted from high quality fabric, this tablecloth is soft to the touch, durable and designed to elevate any dining experience from weddings and formal events to stylish home entertaining.\n\nKey Features:\nColour: White\nShape: Round\nCase Size: 1 Per Case                                                                                                       Dimensions:\n118in / 300cm (floor length for a perfect fit on a 5ft round table). How to Purchase\n\nAs our site primarily caters to linen hire, follow these steps to purchase your linen:\n\nAdd to Cart: Select the quantity you wish to purchase and add it to your cart\n\nAt Checkout: Choose "store pick up" as your collection option\n\nProvide Collection Dates: Enter two dates when prompted:\n\nFirst Date: Your collection date\n\nSecond Date: You may enter the same date\n\nIf you would like the linen delivered, please contact the team directly to discuss your options. Stock is limited, so secure your linen today!',
        blogs: [],
        links: [],
      },
      {
        name: "Linen Tablecloth For Sale - White Round 130in",
        sku: "SL08",
        description:
          'This tablecloth is soft to the touch, durable, and designed to elevate any dining experience.\n\nKey Features\nCase Size: 1 Per Case \nColour: Timeless white, versatile for any occasion\nShape: Round\nSize: 130 inches, floor-length, fits a 6ft round table\nCare: Machine washable for easy upkeep, maintaining elegance wash after wash\n\nWhile we specialize in linen hire, we are pleased to offer a limited selection of linens for sale, including these exquisite tablecloths. Perfect for weddings, dinner parties, or everyday elegance, they are a stylish investment for your home or business.\n\nHow to Purchase\nAs our site primarily caters to linen hire, follow these steps to purchase your linen:\nAdd to Cart: Select the quantity you wish to purchase and add it to your cart\nAt Checkout: Choose "store pick up" as your collection option\nProvide Collection Dates: Enter two dates when prompted:\nFirst Date: Your collection date\nSecond Date: You may enter the same date\n\nIf you would like the linen delivered, please contact the team directly to discuss your options. Stock is limited, so secure your linen today!',
        blogs: [],
        links: [],
      },
      {
        name: "Linen Tablecloth Ivory 70in x 108in",
        sku: "739",
        description:
          "Our ivory cotton tablecloths are very popular for conferences, buffets, and dining events. This tablecloth fits our 8ft rectangular tables. The hire price includes laundry, so you do not need to worry about cleaning after the event.\n\nKey Features\n\nLinen laundry included in hire price\nFits 8ft x 24 and 8ft x 30 trestle tables\nTrestle tables available to hire\nTablecloths also available in red, ivory, black, blue and white\nRange of napkins available to hire                                                                                          Case Size: 1 Per Case \nColour: Ivory                                                                                                                                                                                                                                                                                              \nDimensions\n    \n70in x 108in / 178cm x 274 cm\n\nCaterhire Top Tips\n\nStandard table height 30 inches\n8ft x 24 table: 24-inch linen drop on the sides\n8ft x 30 table: 21-inch linen drop on the sides\nCaterHire Top Tips: Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Red 54in x 120in",
        sku: "1000630",
        description:
          "Our red cotton tablecloths are very popular for conferences, buffets and dining events. This tablecloth fits our 6ft rectangular tables. The hire price includes laundry, so you do not need to worry about cleaning after the event.\n\nKey Features\n\nColour: Red \nLinen laundry included in hire price                                                                                              Case Size: 1 Per Case \nFits 6ft x 24 and 6ft x 30 trestle tables\nTrestle tables available to hire\nTablecloths also available in blue\nRange of napkins available to hire\n\nDimensions\n\n54 x 120in / 137cm x 305cm\n\nCaterhire Top Tips\nStandard table height 30 inches\n6ft x 24 table: 15-inch linen drop on the sides\n6ft x 30 table: 12-inch linen drop on the sides\nThese tablecloths provide a professional, polished look for your event while saving you time on cleanup. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Red 70in x 70in",
        sku: "1000600",
        description:
          "Our red cotton tablecloths are very popular for conferences, buffets and dining events. This tablecloth fits our 4ft rectangular tables and 3ft/4ft round tables. The hire price includes laundry, so you do not need to worry about cleaning after the event.\n\nKey Features\nColour: Red \nLinen laundry included in hire price\nFits 4ft x 24, 4ft x 30, and 3ft/4ft round tables\nBanquet tables available to hire\nTablecloths also available in black, blue, ivory and white\nRange of napkins available to hire\nCase Size: 1 Per Case\nDimensions\n\n70 x 70 inches / 178cm x 178cm\n\nCaterhire Top Tips\nStandard table height 30 inches\n4ft x 24 table: 23-inch linen drop on the sides\n4ft x 30 table: 20-inch linen drop on the sides\nThese tablecloths provide a professional, polished look for your event while saving you time on cleanup. Check out our Blog: All You Need to Know About Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth Red 90in x 90in",
        sku: "1000697",
        description:
          "Our red cotton tablecloths are very popular for banquet and dining events. This tablecloth fits our 5ft round tables and is perfect for dressing up a table. The hire price includes laundry, so you do not need to worry about cleaning after the event.\n\nKey Features\n\nColour: Red \nLinen laundry included in hire price\nFits 5ft round table (corners will drop to floor)\nTrestle tables also available to hire\nTablecloths also available in black, ivory, blue and white\nRange of napkins available to hire\nCase Size: 1 Per Case \nDimensions\n\n90 x 90in / 229cm x 229cm\n\nCaterhire Top Tips: \n\nStandard table height 30 inches\nThis cloth will drop 15 inches on a 5ft round table\nThese tablecloths provide a polished, professional look for your event while saving you time on cleanup. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth White 54in x 54in",
        sku: "1000604",
        description:
          "Our crisp white table linen will add a special touch to any table setting and enhance the dining experience. The hire price includes laundry, so you do not need to worry about cleaning after the event.\n\nKey Features\n\nColour: White \nFits 2ft square table or 3ft round table\nTrestle tables also available to hire\nMatching napkins available to hire\nCase Size: 1 Per Case \nDimensions\n\n54 x 54 inches / 137cm x 137cm\n\nCaterhire Top Tip:\n\nStandard table height 30 inches\n2ft x 24 table: 15-inch linen drop\n2ft x 30 table: 12-inch linen drop\n3ft round table: 9-inch linen drop\n\nCaterHire Top Tip:                                                                                                                               Check out our Blog:\nHow to Create the Perfect Easter Tablescape",
        blogs: [
          "https://www.caterhire.ie/blog/how-to-create-the-perfect-easter-tablescape-/",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth White 70in x 108in",
        sku: "1000651",
        description:
          "Our crisp white table linen will add a special touch to any table setting and enhance the dining experience. The hire price includes laundry, so you do not need to worry about cleaning after the event.\n\nKey Features\nColour: White \nLinen laundry included in hire price\nFits trestle tables 6ft x 24, 6ft x 30, 6ft x 36\nTrestle tables also available to hire\nMatching napkins available to hire\nCase Size: 1 Per Case \n                                                                                                                                                           Dimensions\n70in x 108in x 178cm x 274cm\n\nCaterhire Top Tips\nStandard table height 30 inches\n6ft x 24 table: 23-inch linen drop\n6ft x 30 table: 20-inch linen drop\n6ft x 36 table: 17-inch linen drop\nCheck out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth White 70in x 70in",
        sku: "1000605",
        description:
          "Our crisp white table linen will add a special touch to any table setting and enhance the dining experience. The hire price includes laundry, so you do not need to worry about cleaning after the event.\n\nKey Features\n\nColour: White \nLinen laundry included in hire price\nFits 4ft x 24, 4ft x 30, and 3ft/4ft round tables\nBanquet tables available to hire\nMatching napkins available to hire\nTablecloth also available in blue or black\nCase Size: 1 Per Case                                               \nDimensions\n\n70 x 70 inches / 178cm x 178cm\n\nCaterhire Top Tips\n\nStandard table height 30 inches\n4ft x 24 table: 23-inch linen drop\n4ft x 30 table: 20-inch linen drop\n\nThese tablecloths provide a polished, professional look for your event while saving you time on cleanup. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth White 72in x 144in",
        sku: "509",
        description:
          "Our crisp white table linen will add a special touch to your table setting and enhance the dining experience. The hire price includes laundry, so you do not need to worry about cleaning after the event.\n\nKey Features\nColour: White \nLinen laundry included in hire price\nCase Size: 1 Per Case\nFits 8ft x 24 and 8ft x 30 trestle tables\nTrestle tables available to hire\nMatching napkins available\nTablecloth also available in red, black and blue\n\nDimensions\n\n72in x 144in / 183cm x 366cm\n\nCaterhire Top Tips\nStandard table height 30 inches\n8ft x 24 table: 24-inch linen drop\n8ft x 30 table: 20-inch linen drop\n\nThese tablecloths provide a polished, professional look for your event while saving you time on cleanup. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth White 90in x 90in",
        sku: "1000606",
        description:
          "Our crisp white table linen will add a special touch to your table setting and enhance the dining experience. The hire price includes laundry, so you do not need to worry about cleaning after the event.\n\nKey Features\nColour: White\nLinen laundry included in hire price\nFits 5ft round table (will not drop to floor)\nTrestle tables also available to hire\nMatching napkins available\nAlso available in red, black, blue and ivory\nCase Size: 1 Per Case \nDimensions\n\n90in x 90in / 229cm x 229 cm\n\nCaterhire Top Tips\nStandard table height 30 inches\n5ft round table: 15-inch linen drop\nThese tablecloths provide a polished, professional look for your event while saving you time on cleanup. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth White Round 118in",
        sku: "1000608",
        description:
          "Our crisp white cotton round tablecloth will add a special touch to your table setting and enhance the dining experience. The hire price includes laundry, so you do not need to worry about cleaning after the event.\n\nKey Features\n\nFits a 5ft round table and will drop to the floor\nPopular for weddings and banquet dining\nLinen laundry included in hire price\nRound tables available to hire (5ft, 5.5ft, 6ft)\nColour: White\nMatching or coloured napkins available to hire\nCase Size: 1 Per Case \nTablecloths available in a range of colours\n\nDimensions\n\n120 inches round / 305cm,  drops to the floor on a 5ft round table\n\nCaterhire Top Tips\n\nStandard table height 30 inches\n5.5ft round table: 27-inch linen drop\n6ft round table: check with team for drop. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Linen Tablecloth White Round 130in",
        sku: "1000609",
        description:
          "Our crisp white cotton round tablecloth will add a special touch to your table setting and enhance the dining experience. The hire price includes laundry, so you do not need to worry about cleaning after the event.\n\nKey Features\nColour: White \nFits a 6ft round table and will drop towards the floor\nPopular for weddings and banquet dining\nLinen laundry included in hire price\nRound tables available to hire (5ft, 5.5ft, 6ft)\nMatching or coloured napkins available to hire\nTablecloths available in a range of colours\nCase Size: 1 Per Case \nDimensions\n\n130 inches round / 330cm, drops to within 1-2 inches of the floor on a 6ft round table\n\nCaterhire Top Tips\n\nStandard table height 30 inches\nIdeal for use on high bar tables with a bow, as it will cover the table completely and hide the legs\nThese tablecloths provide a polished, professional look for your event while saving you time on cleanup.                                                Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [],
        links: [],
      },
      {
        name: "MY Drap Canape Napkin Cream 4.5in x 4.5in For Sale",
        sku: "D027",
        description:
          "The MY Drap canape napkins are made from 100% cotton and come on a roll of 100, with perforations for easy tearing. They are designed for single use at events but can also be reused as they are washable. These napkins are for retail purchase only.\n\nKey Features\nColour: Cream\n100% cotton cocktail napkins\nIdeal for aperitifs or as coasters\nSingle use or reusable (washable)\n100 napkins per roll\nFor purchase only\n\nDimensions\n\n4.5in x 4.5in / 11cm x 11cm                                                                                                                                                       Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "MY Drap Cocktail Napkin Black 8in x 8in For Sale",
        sku: "D026",
        description:
          "The MY Drap cocktail napkins are made from 100% cotton and come on a roll of 150, with perforations for easy tearing. They are designed for single use at events but can also be reused as they are washable. These napkins are for retail purchase only.\n\nKey Features\nColour: Black\n100% cotton cocktail napkins\nUsed for cocktails, brunches, and aperitifs\nSingle use or reusable (washable)\n150 napkins per roll\nFor purchase only\nDimensions\n\n8 x 8 inches (20 x 20 cm) CaterHire Top Tip: Check our our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "MY Drap Cocktail Napkin Emerald Green 8in x 8in For Sale",
        sku: "D029",
        description:
          "The MY Drap cocktail napkins are made from 100% cotton and come on a roll, with perforations for easy tearing. They are designed for single use at events but can also be reused as they are washable. These napkins are for retail purchase only.\n\nKey Features\nColour: Emerald Green\n100% cotton cocktail napkins\nUsed for cocktails, brunches, and aperitifs\nSingle use or reusable (washable)\n25 napkins per roll\nFor purchase only\n\nDimensions\n\n8 x 8 inches / 20 x 20 cm CaterHire Top Tip: Check our our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "MY Drap Cocktail Napkin Pearl Grey 8in x 8in For Sale",
        sku: "D031",
        description:
          "The MY Drap cocktail napkins are made from 100% cotton and come on a roll, with perforations for easy tearing. They are designed for single use at events but can also be reused as they are washable. These napkins are for retail purchase only.\n\nKey Features\nColour: Pearl Grey \n100% cotton cocktail napkins\nUsed for cocktails, brunches, and aperitifs\nSingle use or reusable (washable)\n25 napkins per roll\nFor purchase only\n\nDimensions\n\n8 x 8 inches /20cm x 20cmCaterHire Top Tip: Check our our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "MY Drap Cocktail Napkin Pistachio 8in x 8in For Sale",
        sku: "D034",
        description:
          "The MY Drap cocktail napkins are made from 100% cotton and come on a roll, with perforations for easy tearing. They are designed for single use at events but can also be reused as they are washable. These napkins are for retail purchase only.\n\nKey Features\nColour: Pistachio \n100% cotton cocktail napkins\nUsed for cocktails, brunches, and aperitifs\nSingle use or reusable (washable)\n25 napkins per roll\nFor purchase only\n\nDimensions\n\n8 x 8 inches / 20cm x 20cm CaterHire Top Tip: Check our our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "MY Drap Cocktail Napkin Red Gingham 8in x 8in For Sale",
        sku: "D032",
        description:
          "The MY Drap cocktail napkins are made from 100% cotton and come on a roll with perforations for easy tearing. They are designed for single use at events but can also be reused as they are washable. These napkins are for retail purchase only.\n\nKey Features\nColour: Red Gingham\n100% cotton cocktail napkins\nUsed for cocktails, brunches, and aperitifs\nSingle use or reusable (washable)\n25 napkins per roll\nFor purchase only\n\nDimensions\n\n8in x 8in / 20cm x 20cm CaterHire Top Tip: Check our our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "MY Drap Cocktail Napkin Sea Blue 8in x 8in For Sale",
        sku: "D028",
        description:
          "The MY Drap cocktail napkins are made from 100% cotton and come on a roll with perforations for easy tearing. They are designed for single use at events but can also be reused as they are washable. These napkins are for retail purchase only.\n\nKey Features\nColour: Sea Blue \n100% cotton cocktail napkins\nUsed for cocktails, brunches, and aperitifs\nSingle use or reusable (washable)\n25 napkins per roll\nFor purchase only\n\nDimensions\n\n8in x 8in inches / 20cm x 20cm CaterHire Top Tip: Check our our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "MYdrap Napkin Fushia Pink 8in x 8in For Sale",
        sku: "D033",
        description:
          "The MY Drap cocktail napkins are made from 100% cotton and come on a roll with perforations for easy tearing. They are designed for single use at events but can also be reused as they are washable. These napkins are for retail purchase only.\n\nKey Features\nColour: Fushia Pink \n100% cotton cocktail napkins\nUsed for cocktails, brunches, and aperitifs\nSingle use or reusable (washable)\n25 napkins per roll\nFor purchase only\n\nDimensions\n\n8in x 8in inches / 20cm x 20cm CaterHire Top Tip: Check our our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Organza Chair Tie - Black",
        sku: "1151",
        description:
          "We offer a beautiful selection of organza chair ties and table runners available to hire. These are perfect for dressing your chairs or tables and complementing your colour theme for your event.\n\nKey Features\n\nCase size: 1 per case\nColour: Black organza fabric\nCan be used as a chair tie or table runner\nIdeal for dressing a room or venue\nRange of chairs available to hire\nAccessorise with our range of tablecloths and napkins\n\nCaterHire Top Tip\n\nCheck out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Organza Chair Tie - Burgundy",
        sku: "1152",
        description:
          "We offer a beautiful selection of organza chair ties and table runners available to hire. These are perfect for dressing your chairs or tables and complementing your colour theme for your event.\n\nKey Features\n\nCase size: 1 per case\nColour: Burgundy organza fabric\nCan be used as a chair tie or table runner\nIdeal for dressing a room or venue\nRange of chairs available to hire\nAccessorise with our range of tablecloths and napkins\n\nCaterHire Top Tip\n\nCheck out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Organza Chair Tie / Table Runner Gold",
        sku: "1000768",
        description:
          "We offer a beautiful selection of organza chair ties and table runners available to hire. These are perfect for dressing your chairs or tables and complementing your colour theme for your event.\n\nKey Features\n\nCase size: 1 per case\nColour: Gold organza fabric\nCan be used as a chair tie or table runner\nIdeal for dressing a room or venue\nRange of chairs available to hire\nAccessorise with our range of tablecloths and napkins\n\nCaterHire Top Tip\n\nCheck out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Organza Chair Tie / Table Runner Ivory",
        sku: "1000767",
        description:
          "We offer a beautiful selection of organza chair ties and table runners available to hire. These are perfect for dressing your chairs or tables and complementing your colour theme for your event.\n\nKey Features\n\nCase size: 1 per case\nColour: Ivory organza fabric\nCan be used as a chair tie or table runner\nIdeal for dressing a room or venue\nRange of chairs available to hire\nAccessorise with our range of tablecloths and napkins\n\nCaterHire Top Tip\n\nCheck out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Organza Chair Tie / Table Runner Pink",
        sku: "1082",
        description:
          "We offer a beautiful selection of organza chair ties and table runners available to hire. These are perfect for dressing your chairs or tables and complementing your colour theme for your event.\n\nKey Features\n\nCase size: 1 per case\nColour: Pink organza fabric\nCan be used as a chair tie or table runner\nIdeal for dressing a room or venue\nRange of chairs available to hire\nAccessorise with our range of tablecloths and napkins\n\nCaterHire Top Tip\n\nCheck out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Organza Chair Tie / Table Runner Red",
        sku: "1000769",
        description:
          "We offer a beautiful selection of organza chair ties and table runners available to hire. These are perfect for dressing your chairs or tables and complementing your colour theme for your event.\n\nKey Features\n\nCase size: 1 per case\nColour: Red organza fabric\nCan be used as a chair tie or table runner\nIdeal for dressing a room or venue\nRange of chairs available to hire\nAccessorise with our range of tablecloths and napkins\n\nCaterHire Top Tip\n\nCheck out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Pink Cotton Napkin -20in x 20in",
        sku: "520",
        description:
          "Enhance your table setting with our Pink Cotton Napkin. Its elegant shade adds a charming touch to any occasion, making it ideal for all events. Take advantage of our convenient hire service, which includes professional laundering of the napkins after your event, leaving you free to enjoy your celebration hassle-free.\n\nKey Features\n\nMix or match with our chic tablecloth collection\nColour: Soft Pink\nExplore a variety of napkin colours to complement your theme\nCase Size: 1 Per Case                                                                                                                                            Dimensions: 20in x 20in / 50.8cm x 50.8cm \nCaterHire Top Tips\nCheck out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Red Gingham Tablecloth 70in x 144in",
        sku: "GL599",
        description:
          "Bring a fresh, summery feel to your event with our beautiful red gingham tablecloth. Featuring a classic gingham pattern, this linen is perfect for garden parties, picnics, and alfresco dining. It pairs perfectly with our rustic or trestle tables to create a laid-back, countryside-inspired setting.\n\nThe vibrant red gingham evokes a nostalgic picnic vibe and adds a cheerful pop of colour to any summer table. Style it with our white or natural rattan charger plates and diamond goblets to complete the look.\n\nThe hire price includes professional laundering, so you can relax and enjoy your event—no washing required!\n\nKey Features\n\nColour: Red Gingham\nFits 8ft x 24 and 8ft x 30 trestle tables\nLinen laundry included in the hire price\nTrestle tables also available to hire\nCase Size: 1 Per Case \nDimensions\n\n70in x 144in /178cm x 366cm\n\nCaterHire Top Tips\n\nStandard trestle table height: 30 inches\n8ft x 24 table: 23-inch drop on the sides\n8ft x 30 table: 20-inch drop on the sides. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Red Linen Napkin 20in x 20in",
        sku: "527",
        description:
          "The Signature range is our premium napkin offering. Our red napkin has a luxurious soft cotton feel and will add a special touch to your table setting. The hire charge includes professional laundering, so you do not need to worry about the linen after the event.\n\nKey Features\n\nColour: Red\nLinen laundry included in hire price\nMix or match with our tablecloth range\nRange of coloured napkins available to hire\nCase Size: 1 Per Case\nDimensions:\n20in x 20in / 51cm x 51cm\nCheck out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Red Round Tablecloth 90in",
        sku: "559",
        description:
          "Brighten up your event with our delightful Red Round Tablecloth! Crafted from high-quality coloured cotton linen, this tablecloth adds a charming touch to any gathering, effortlessly enhancing the overall ambiance. Whether you're hosting a formal dinner or a casual get-together, this vibrant red piece is sure to make a stunning impact.\n\nKey Features\nCase Size: 1 Per Case\nMade from premium coloured cotton linen\nColour: Red\nPerfect for various occasions\n\nDimensions\n\n90in / 228cm diameter\n\nCaterhire Top Tips\nCheck out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
      },
      {
        name: "Round Linen Table Cloth Ivory -  118in",
        sku: "536",
        description:
          "Our crisp ivory cotton round tablecloth for hire will add a special touch to your table setting and enhance the dining experience. The hire price includes laundry, so you don’t have to worry about cleaning after the event.\n\nKey Features\nColour: Ivory\nFits a 5ft round table and will drop to the floor\nPopular for weddings and banquet dining                                                                                                                    Case Size: 1 Per Case\nLinen laundry included in hire price\nRound tables available to hire (5ft, 5.5ft, 6ft)\nMatching or coloured napkins available to hire\nTablecloths available in a range of colours\nDimensions\n\n120 inches / 300cm diameter\n\nCaterhire Top Tips\n\nStandard table height: 30 inches\n5ft round table: drops right to the floor\n5.5ft round table: 27-inch drop\n6ft round table: check with the team for drop\n\nCheck out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Round Linen Table Cloth Red - 106in",
        sku: "563",
        description:
          "Our round tablecloths are very popular to hire for banquet and dining events. This tablecloth fits our 5ft round tables and is perfect for dressing up a table. The hire price includes laundry, so you don’t have to worry about cleaning after the event.\n\nKey Features\nCase Size: 1 Per Case\nColour: Red \nLinen laundry included in hire price\nFits 5ft round table (corners will drop to floor)\nTrestle tables also available to hire\nTablecloths also available in ivory, black, blue and white\nRange of napkins available to hire\n\nDimensions\n\n106in / 269cm diameter\n\nCaterhire Top Tips\n\nStandard table height: 30 inches\n5ft round table: 15-inch drop\n\nCheck out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Satin Chair Tie / Table Runner Black",
        sku: "1000770",
        description:
          "We offer a beautiful selection of satin chair ties and table runners available to hire. These are perfect for dressing your chairs or tables and complementing your colour theme for your event.\n\nKey Features\nCase Size: 1 Per Case \nBlack satin fabric\nCan be used as a chair tie or table runner\nIdeal for dressing a room or venue\nRange of chairs available to hire\nAccessorise with our range of tablecloths and napkins\nThese satin accessories provide a stylish finishing touch for any event.              CaterHire Top Tip: Check our our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Satin Chair Tie / Table Runner Ivory",
        sku: "1000772",
        description:
          "We offer a beautiful selection of satin chair ties and table runners available to hire. These are perfect for dressing your chairs or tables and complementing your colour theme for your event.\n\nKey Features\nCase Size: 1 Per Case \nIvory satin fabric\nCan be used as a chair tie or table runner\nIdeal for dressing a room or venue\nRange of chairs available to hire\nAccessorise with our range of tablecloths and napkins\nThese satin accessories provide a stylish finishing touch for any event.              CaterHire Top Tip: Check our our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Satin Chair Tie / Table Runner Red (Narrow)",
        sku: "1000616",
        description:
          "We offer a beautiful selection of satin chair ties and table runners available to hire. These are perfect for dressing your chairs or tables and complementing your colour theme for your event.\n\nKey Features\nCase Size: 1 Per Case \nColour: Red satin fabric\nCan be used as a chair tie or table runner\nIdeal for dressing a room or venue\nRange of chairs available to hire\nAccessorise with our range of tablecloths and napkins\nThese satin accessories provide a stylish finishing touch for any event.              CaterHire Top Tip: Check our our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Satin Chair Tie / Table Runner Red (Wide)",
        sku: "1000612",
        description:
          "We offer a beautiful selection of satin chair ties and table runners available to hire. These are perfect for dressing your chairs or tables and complementing your colour theme for your event.\n\nKey Features\nCase Size: 1 Per Case \nColour: Red satin fabric\nCan be used as a chair tie or table runner\nIdeal for dressing a room or venue\nRange of chairs available to hire\nAccessorise with our range of tablecloths and napkins\nThese satin accessories provide a stylish finishing touch for any event.              CaterHire Top Tip: Check our our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Satin Chair Tie / Table Runner Silver",
        sku: "1000771",
        description:
          "We offer a beautiful selection of satin chair ties and table runners available to hire. These are perfect for dressing your chairs or tables and complementing your colour theme for your event.\n\nKey Features\nCase Size: 1 Per Case \nColour: Silver satin fabric\nCan be used as a chair tie or table runner\nIdeal for dressing a room or venue\nRange of chairs available to hire\nAccessorise with our range of tablecloths and napkins\nThese satin accessories provide a stylish finishing touch for any event.              CaterHire Top Tip: Check our our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Satin Napkin Jade Aqua 20in x 20in",
        sku: "2026",
        description:
          "The Signature range is our premium napkin offering. Our satin jade napkins are very popular to hire for banquets, parties, and weddings. The hire price includes professional laundering, so you don’t have to worry about the linen after the event.\n\nKey Features\n\nColour: Jade Aqua \nLinen laundry included in hire price\nMix or match with our tablecloth range\nRange of coloured napkins available to hire\nCase Size: 1 Per Case \nDimensions\n\n20in x 20in / 51cm x 51cm \n\nCaterHire Top Tip: Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Satin Napkin Violet 20in x 20in",
        sku: "2024",
        description:
          "The Signature range is our premium napkin offering. Our satin jade napkins are very popular to hire for banquets, parties, and weddings. The hire price includes professional laundering, so you don’t have to worry about the linen after the event.\n\nKey Features\n\nColour: Violet\nLinen laundry included in hire price\nMix or match with our tablecloth range\nRange of coloured napkins available to hire\nCase Size: 1 Per Case \nDimensions\n\n20in x 20in / 51cm x 51cm \n\nCaterHire Top Tip: Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Signature Linen Napkin Biscuit 20in x 20in",
        sku: "3014",
        description:
          "Our Signature Range is the premium choice for napkins, offering a luxurious, soft cotton feel that adds an elegant touch to any table setting. With the hire price, laundry is included, so you don’t have to worry about post-event cleaning!\n\nKey Features\nColour: Biscuit\nSoft cotton “biscuit” texture\nCase Size: 1 Per Case \nLinen laundry included in hire price\nMix and match with our tablecloth range\nAvailable in a variety of colors for hire\nDimensions\n\n20in  x 20in / 50.8 cm x 50.8 cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Signature Linen Napkin Blush Pink 20in x 20in",
        sku: "2027",
        description:
          "Our Signature Range is the premium choice for napkins, offering a luxurious, soft cotton feel that adds an elegant touch to any table setting. With the hire price, laundry is included, so you don’t have to worry about post-event cleaning!\n\nKey Features\nColour: Blush Pink\nCase Size: 1 Per Case \nLinen laundry included in hire price\nMix and match with our tablecloth range\nAvailable in a variety of colors for hire\nDimensions\n\n20in  x 20in / 50.8 cm x 50.8 cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Signature Linen Napkin Clover Green 20in x 20in",
        sku: "2017",
        description:
          "Our Signature Range is the premium choice for napkins, offering a luxurious, soft cotton feel that adds an elegant touch to any table setting. With the hire price, laundry is included, so you don’t have to worry about post-event cleaning!\n\nKey Features\nColour: Clover Green\nCase Size: 1 Per Case \nLinen laundry included in hire price\nMix and match with our tablecloth range\nAvailable in a variety of colors for hire\nDimensions\n\n20in  x 20in / 50.8 cm x 50.8 cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Signature Linen Napkin Ivory 20in x 20in",
        sku: "3017",
        description:
          "Our Signature Range is the premium choice for napkins, offering a luxurious, soft cotton feel that adds an elegant touch to any table setting. With the hire price, laundry is included, so you don’t have to worry about post-event cleaning!\n\nKey Features\nColour: Ivory\nCase Size: 1 Per Case \nLinen laundry included in hire price\nMix and match with our tablecloth range\nAvailable in a variety of colors for hire\nDimensions\n\n20in  x 20in / 50.8 cm x 50.8 cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Signature Linen Napkin Lavender 20in x 20in",
        sku: "3016",
        description:
          "Our Signature Range is the premium choice for napkins, offering a luxurious, soft cotton feel that adds an elegant touch to any table setting. With the hire price, laundry is included, so you don’t have to worry about post-event cleaning!\n\nKey Features\nColour: Lavendar \nCase Size: 1 Per Case \nLinen laundry included in hire price\nMix and match with our tablecloth range\nAvailable in a variety of colors for hire\nDimensions\n\n20in  x 20in / 50.8 cm x 50.8 cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Signature Linen Napkin Navy 20in x 20in",
        sku: "2019",
        description:
          "Our Signature Range is the premium choice for napkins, offering a luxurious, soft cotton feel that adds an elegant touch to any table setting. With the hire price, laundry is included, so you don’t have to worry about post-event cleaning!\n\nKey Features\nColour: Navy \nCase Size: 1 Per Case \nLinen laundry included in hire price\nMix and match with our tablecloth range\nAvailable in a variety of colors for hire\nDimensions\n\n20in  x 20in / 50.8 cm x 50.8 cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Signature Linen Napkin Royal Blue 20in x 20in",
        sku: "2022",
        description:
          "Our Signature Range is the premium choice for napkins, offering a luxurious, soft cotton feel that adds an elegant touch to any table setting. With the hire price, laundry is included, so you don’t have to worry about post-event cleaning!\n\nKey Features\nColour: Royal Blue\nCase Size: 1 Per Case \nLinen laundry included in hire price\nMix and match with our tablecloth range\nAvailable in a variety of colors for hire\nDimensions\n\n20in  x 20in / 50.8 cm x 50.8 cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Signature Linen Napkin Seafoam Green 20in x 20in",
        sku: "2020",
        description:
          "Our Signature Range is the premium choice for napkins, offering a luxurious, soft cotton feel that adds an elegant touch to any table setting. With the hire price, laundry is included, so you don’t have to worry about post-event cleaning!\n\nKey Features\nColour: Seafoam Green\nCase Size: 1 Per Case \nLinen laundry included in hire price\nMix and match with our tablecloth range\nAvailable in a variety of colors for hire\nDimensions\n\n20in  x 20in / 50.8 cm x 50.8 cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Signature Linen Napkin Wedgwood Blue 20in x 20in",
        sku: "2016",
        description:
          "Our Signature Range is the premium choice for napkins, offering a luxurious, soft cotton feel that adds an elegant touch to any table setting. With the hire price, laundry is included, so you don’t have to worry about post-event cleaning!\n\nKey Features\nColour: Wedgewood Blue \nCase Size: 1 Per Case \nLinen laundry included in hire price\nMix and match with our tablecloth range\nAvailable in a variety of colors for hire\nDimensions\n\n20in  x 20in / 50.8 cm x 50.8 cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Signature Linen Tablecloth Biscuit Round 132in",
        sku: "3010",
        description:
          "Part of our premium Signature Range, this round tablecloth combines specially designed fibres to create a luxurious soft-touch finish with a cotton-soft feel. Perfect for adding elegance and style to any event.\n\nKey Features\nCase Size: 1 Per Case \nLuxurious soft-touch fabric with a cotton-soft feel\nColour: Elegant “Biscuit” shade for versatile styling\nPremium quality from the Signature Range\nDimensions\n\n132”/ 335.3 cm Diameter\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Signature Linen Tablecloth Grey Round 132in",
        sku: "2025",
        description:
          "Part of our premium Signature Range, this round tablecloth combines specially designed fibres to create a luxurious soft-touch finish with a cotton-soft feel. Perfect for adding elegance and style to any event.\n\nKey Features\nCase Size: 1 Per Case \nLuxurious soft-touch fabric with a cotton-soft feel\nColour: Grey\nPremium quality from the Signature Range\nDimensions\n\n132”/ 335.3 cm Diameter\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Signature Linen Tablecloth Lavender Round 132in",
        sku: "3012",
        description:
          "Part of our premium Signature Range, this round tablecloth combines specially designed fibres to create a luxurious soft-touch finish with a cotton-soft feel. Perfect for adding elegance and style to any event.\n\nKey Features\nCase Size: 1 Per Case \nLuxurious soft-touch fabric with a cotton-soft feel\nColour: Laevender\nPremium quality from the Signature Range\nDimensions\n\n132”/ 335.3 cm Diameter\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Silk Taffeta Chair Tie / Table Runner Cappuccino",
        sku: "1000774",
        description:
          "We offer a beautiful selection of taffeta chair ties and table runners available to hire. These versatile pieces are perfect for dressing your chairs or tables, while complementing your chosen colour theme for any event.\n\nKey Features\nColour:\nCrisp cappuccino taffeta fabric\nCan be used as a chair tie or table runner\nIdeal for dressing a room or venue\nWide range of chairs available to hire\nAccessorise with our matching tablecloths and napkins\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Silk Taffeta Chair Tie / Table Runner Pale Pink",
        sku: "1000775",
        description:
          "We offer a beautiful selection of taffeta chair ties and table runners available to hire. These versatile pieces are perfect for dressing your chairs or tables, while complementing your chosen colour theme for any event.\n\nKey Features\nColour:\nCrisp Pink taffeta fabric\nCan be used as a chair tie or table runner\nIdeal for dressing a room or venue\nWide range of chairs available to hire\nAccessorise with our matching tablecloths and napkins\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Silk Taffeta Napkin Black 20in x 20in",
        sku: "1000796",
        description:
          "Our Signature Range is the premium choice for napkins. The crisp black taffeta napkin is a popular hire option for banquets, parties and weddings. With the hire price, laundry is included, so you don’t need to worry about post-event cleaning.\n\nKey Features\nCase Size: 1 Per Case \nColour: Black \nLinen laundry included in hire price\nMix or match with our tablecloth range\nAvailable in a range of colours\n\nDimensions\n\n20in x 20in / 50.8cm x 50.8cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Silk Taffeta Napkin Cappuccino 20in x 20in",
        sku: "1000788",
        description:
          "Our Signature Range is the premium choice for napkins. The crisp cappucino taffeta napkin is a popular hire option for banquets, parties and weddings. With the hire price, laundry is included, so you don’t need to worry about post-event cleaning.\n\nKey Features\nCase Size: 1 Per Case \nColour: Cappucino \nLinen laundry included in hire price\nMix or match with our tablecloth range\nAvailable in a range of colours\n\nDimensions\n\n20in x 20in / 50.8cm x 50.8cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Silk Taffeta Napkin Hot Pink 20in x 20in",
        sku: "1000791",
        description:
          "Our Signature Range is the premium choice for napkins. The crisp hot pink taffeta napkin is a popular hire option for banquets, parties and weddings. With the hire price, laundry is included, so you don’t need to worry about post-event cleaning.\n\nKey Features\nCase Size: 1 Per Case \nColour: Hot Pink\nLinen laundry included in hire price\nMix or match with our tablecloth range\nAvailable in a range of colours\n\nDimensions\n\n20in x 20in / 50.8cm x 50.8cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Silk Taffeta Napkin Pale Pink 20in x 20in",
        sku: "1000789",
        description:
          "Our Signature Range is the premium choice for napkins. The crisp pale pink taffeta napkin is a popular hire option for banquets, parties and weddings. With the hire price, laundry is included, so you don’t need to worry about post-event cleaning.\n\nKey Features\nCase Size: 1 Per Case \nColour: Pale Pink\nLinen laundry included in hire price\nMix or match with our tablecloth range\nAvailable in a range of colours\n\nDimensions\n\n20in x 20in / 50.8cm x 50.8cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Silk Taffeta Napkin Purple 20in x 20in",
        sku: "1000790",
        description:
          "Our Signature Range is the premium choice for napkins. The crisp purple taffeta napkin is a popular hire option for banquets, parties and weddings. With the hire price, laundry is included, so you don’t need to worry about post-event cleaning.\n\nKey Features\nCase Size: 1 Per Case \nColour: Purple\nLinen laundry included in hire price\nMix or match with our tablecloth range\nAvailable in a range of colours\n\nDimensions\n\n20in x 20in / 50.8cm x 50.8cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Silk Taffeta Napkin Teal 20in x 20in",
        sku: "1000792",
        description:
          "Our Signature Range is the premium choice for napkins. The crisp teal taffeta napkin is a popular hire option for banquets, parties and weddings. With the hire price, laundry is included, so you don’t need to worry about post-event cleaning.\n\nKey Features\nCase Size: 1 Per Case \nColour: Teal\nLinen laundry included in hire price\nMix or match with our tablecloth range\nAvailable in a range of colours\n\nDimensions\n\n20in x 20in / 50.8cm x 50.8cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Silk Taffeta Napkin Turquoise 20in x 20in",
        sku: "1000794",
        description:
          "Our Signature Range is the premium choice for napkins. The crisp turquoise taffeta napkin is a popular hire option for banquets, parties and weddings. With the hire price, laundry is included, so you don’t need to worry about post-event cleaning.\n\nKey Features\nCase Size: 1 Per Case \nColour: Turquoise \nLinen laundry included in hire price\nMix or match with our tablecloth range\nAvailable in a range of colours\n\nDimensions\n\n20in x 20in / 50.8cm x 50.8cm\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Silk Taffeta Tablecloth Purple Round 132in",
        sku: "1000778",
        description:
          "This luxurious silk taffeta tablecloth adds a dramatic yet elegant touch to any setting, making it ideal for weddings, banquets, and special occasions. Its vibrant purple finish is perfect for creating a striking tablescape.\n\nKey Features\n\nLuxurious silk taffeta fabric\nColour: Elegant purple shade for dramatic styling\nPerfect for weddings, banquets, and special events\nSuitable for 5ft or 6ft round tables\nCase Size: 1 Per Case \nDimensions\n\n132in /  335.3cm Diameter\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Silk Taffeta Tablecloth Turquoise Round 120in",
        sku: "1000787",
        description:
          "This stunning silk taffeta tablecloth adds a dramatic yet elegant look to any setting. With its vibrant turquoise shade, it’s perfect for creating a bold and stylish tablescape at weddings, banquets, and special occasions.\n\nKey Features\nCase Size: 1 Per Case\nLuxurious silk taffeta fabric\nColour: Striking turquoise colour for dramatic styling\nIdeal for weddings, banquets, and special events\nSuitable for 5ft or 6ft round tables\n\nDimensions\n\n120in / 304.8 cm round\n\nCaterHire Top Tips\nCheck out our blog: All You Need to Know About Linen Hire",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex  Lemon/Yellow Pod Cover",
        sku: "1000689",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re a popular choice for corporate functions, parties, and special occasions. With a wide range of colours available, they can easily complement your event theme.\n\nKey Features\nCase Size: 1 Per Case \nDurable spandex stretch fabric\nSleek and modern fitted design\nVery popular for corporate events & parties\nFits table tops 31.50in - 33.47in / 80–85cm and height 43.31in - 45.28in / 110–115 cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a wide range of colours      Colour: Yellow \n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex Apple Green Pod Cover",
        sku: "1102",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re a popular choice for corporate functions, parties, and special occasions. With a wide range of colours available, they can easily complement your event theme.\n\nKey Features\nCase Size: 1 Per Case \nDurable spandex stretch fabric\nSleek and modern fitted design\nVery popular for corporate events & parties\nFits table tops 31.50in - 33.47in / 80–85cm and height 43.31in - 45.28in / 110–115 cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a wide range of colours      Colour: Green\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex Black Pod Cover",
        sku: "1000662",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re a popular choice for corporate functions, parties, and special occasions. With a wide range of colours available, they can easily complement your event theme.\n\nKey Features\nCase Size: 1 Per Case \nDurable spandex stretch fabric\nSleek and modern fitted design\nVery popular for corporate events & parties\nFits table tops 31.50in - 33.47in / 80–85cm and height 43.31in - 45.28in / 110–115 cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a wide range of colours      Colour: Black\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex Champagne Pod Cover",
        sku: "1106",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re a popular choice for corporate functions, parties, and special occasions. With a wide range of colours available, they can easily complement your event theme.\n\nKey Features\nCase Size: 1 Per Case \nDurable spandex stretch fabric\nSleek and modern fitted design\nVery popular for corporate events & parties\nFits table tops 31.50in - 33.47in / 80–85cm and height 43.31in - 45.28in / 110–115 cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a wide range of colours      Colour: Champagne\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex Dark Blue Pod Table Cover",
        sku: "1104",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re a popular choice for corporate functions, parties, and special occasions. With a wide range of colours available, they can easily complement your event theme.\n\nKey Features\nCase Size: 1 Per Case \nDurable spandex stretch fabric\nSleek and modern fitted design\nVery popular for corporate events & parties\nFits table tops 31.50in - 33.47in / 80–85cm and height 43.31in - 45.28in / 110–115 cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a wide range of colours      Colour: Dark Blue\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex Dark Blue Pod Table Topper",
        sku: "1000575A",
        description:
          "Our spandex table top covers are designed to fit neatly over cocktail tables and complement your chosen spandex cocktail cover. They’re perfect for mixing and matching colours and styles, making them a versatile choice for any event.\n\nKey Features\nColour: Dark Blue\nSpandex topper designed to fit over cocktail table covers\nSpandex cocktail cover not included (order separately)\nCase Size: 1 Per Case \nPopular for corporate events & parties\nFits table tops 31.5in–33.5in / 80–85cm\nAvailable to hire in a variety of styles and colours\n\nCaterHire Top Tip\nCheck out our Blog: All You Need to Know About Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex Dark Purple Pod Cover",
        sku: "1000688",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re a popular choice for corporate functions, parties, and special occasions. With a wide range of colours available, they can easily complement your event theme.\n\nKey Features\nCase Size: 1 Per Case\nDurable spandex stretch fabric\nSleek and modern fitted design\nVery popular for corporate events & parties\nFits table tops 31.5in - 33.5in/ 80–85 cm and height 43.3in – 45.3in / 110cm  - 115cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a wide range of colours\nColour: Dark Purple \nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex for 6ft Trestle Table Black",
        sku: "SP001",
        description:
          "Our black spandex table covers are designed to fit 6ft rectangular banquet tables and are perfect for dressing up furniture at any event. The stretch fabric creates a sleek, polished look, making them a popular choice for corporate functions, parties, and weddings.\n\nKey Features\nColour: Black \nDurable spandex stretch fabric\nFits 6ft x 30” tables \nAlso fits 6ft x 24” trestle tables \nCreates a modern, fitted finish for a professional look\nCase Size: 1 Per Case\nCaterHire Top Tips\nCheck out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex Hot Pink Pod Cover",
        sku: "1000684",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re popular for corporate functions, parties, and special occasions. Available in a wide range of colours, they can complement any event theme.\n\nKey Features\n\nDurable spandex stretch fabric\nSleek and modern fitted design\nColour: Hot Pink \nVery popular for corporate events & parties\nCase Size: 1 Per Case \nFits table tops 31.5in –  33.5in /  80–85cm and height 43.3in – 45.3in / 110–115cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a variety of colours\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex Hunter Green Pod Cover",
        sku: "1000686",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re popular for corporate functions, parties, and special occasions. Available in a wide range of colours, they can complement any event theme.\n\nKey Features\n\nDurable spandex stretch fabric\nSleek and modern fitted design\nColour: Hunter Green\nVery popular for corporate events & parties\nCase Size: 1 Per Case \nFits table tops 31.5in –  33.5in /  80–85cm and height 43.3in – 45.3in / 110–115cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a variety of colours\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex Ivory Pod Cover",
        sku: "1000685",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re popular for corporate functions, parties, and special occasions. Available in a wide range of colours, they can complement any event theme.\n\nKey Features\n\nDurable spandex stretch fabric\nSleek and modern fitted design\nColour: Ivory \nVery popular for corporate events & parties\nCase Size: 1 Per Case \nFits table tops 31.5in –  33.5in /  80–85cm and height 43.3in – 45.3in / 110–115cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a variety of colours\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex Kelly Green Pod Cover",
        sku: "1101",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re popular for corporate functions, parties, and special occasions. Available in a wide range of colours, they can complement any event theme.\n\nKey Features\n\nDurable spandex stretch fabric\nSleek and modern fitted design\nColour: Kelly Green\nVery popular for corporate events & parties\nCase Size: 1 Per Case \nFits table tops 31.5in –  33.5in /  80–85cm and height 43.3in – 45.3in / 110–115cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a variety of colours\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex Lavender Pod Table Cover",
        sku: "1103",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re popular for corporate functions, parties, and special occasions. Available in a wide range of colours, they can complement any event theme.\n\nKey Features\n\nDurable spandex stretch fabric\nSleek and modern fitted design\nColour: Lavender \nVery popular for corporate events & parties\nCase Size: 1 Per Case \nFits table tops 31.5in –  33.5in /  80–85cm and height 43.3in – 45.3in / 110–115cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a variety of colours\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex Navy Blue Pod Cover",
        sku: "1104A",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re popular for corporate functions, parties, and special occasions. Available in a wide range of colours, they can complement any event theme.\n\nKey Features\n\nDurable spandex stretch fabric\nSleek and modern fitted design\nColour: Navy Blue popular for corporate events & parties\nCase Size: 1 Per Case \nFits table tops 31.5in –  33.5in /  80–85cm and height 43.3in – 45.3in / 110–115cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a variety of colours\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex Orange Pod Table Cover",
        sku: "1000655",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re popular for corporate functions, parties, and special occasions. Available in a wide range of colours, they can complement any event theme.\n\nKey Features\n\nDurable spandex stretch fabric\nSleek and modern fitted design\nColour: Orange popular for corporate events & parties\nCase Size: 1 Per Case \nFits table tops 31.5in –  33.5in /  80–85cm and height 43.3in – 45.3in / 110–115cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a variety of colours\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex Pink Pod Cover",
        sku: "1100",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re popular for corporate functions, parties, and special occasions. Available in a wide range of colours, they can complement any event theme.\n\nKey Features\n\nDurable spandex stretch fabric\nSleek and modern fitted design\nColour: Pink popular for corporate events & parties\nCase Size: 1 Per Case \nFits table tops 31.5in –  33.5in /  80–85cm and height 43.3in – 45.3in / 110–115cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a variety of colours\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [
          "https://www.caterhire.ie/pod-table-glass-round-high-for-hire/",
        ],
      },
      {
        name: "Spandex Pod Table Topper Animal Print",
        sku: "1000579",
        description:
          "Our spandex table top covers are designed to fit over cocktail tables and complement your chosen spandex cocktail cover. They’re perfect for mixing and matching colours and styles, providing a bespoke and themed look for any event.\n\nKey Features\nCase Size: 1 Per Case \nSpandex topper designed to fit over cocktail table covers\nSpandex cover not included (order separately)\nVery popular for corporate events & parties\nFits table tops 31.5in – 33.5in / 80cm–85cm\nColour: Animal Print \nAvailable to hire in a variety of styles and colours                                            CaterHire Top Tips:                                                                                                                                                    Check Out Our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex Pod Table Topper Black",
        sku: "1000573",
        description:
          "Our spandex table top covers are designed to fit over cocktail tables and complement your chosen spandex cocktail cover. They’re perfect for mixing and matching colours and styles, providing a bespoke and themed look for any event.\n\nKey Features\nCase Size: 1 Per Case \nSpandex topper designed to fit over cocktail table covers\nSpandex cover not included (order separately)\nVery popular for corporate events & parties\nFits table tops 31.5in – 33.5in / 80cm–85cm\nColour: Black \nAvailable to hire in a variety of styles and colours                                            CaterHire Top Tips:                                                                                                                                                    Check Out Our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex Pod Table Topper Black Sparkle",
        sku: "1000589",
        description:
          "Our spandex table top covers are designed to fit over cocktail tables and complement your chosen spandex cocktail cover. They’re perfect for mixing and matching colours and styles, providing a bespoke and themed look for any event.\n\nKey Features\nCase Size: 1 Per Case \nSpandex topper designed to fit over cocktail table covers\nSpandex cover not included (order separately)\nVery popular for corporate events & parties\nFits table tops 31.5in – 33.5in / 80cm–85cm\nColour: Black Sparkle\nAvailable to hire in a variety of styles and colours                                            CaterHire Top Tips:                                                                                                                                                    Check Out Our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex Pod Table Topper Blue",
        sku: "1000575",
        description:
          "Our spandex table top covers are designed to fit over cocktail tables and complement your chosen spandex cocktail cover. They’re perfect for mixing and matching colours and styles, providing a bespoke and themed look for any event.\n\nKey Features\nCase Size: 1 Per Case \nSpandex topper designed to fit over cocktail table covers\nSpandex cover not included (order separately)\nVery popular for corporate events & parties\nFits table tops 31.5in – 33.5in / 80cm–85cm\nColour: Blue\nAvailable to hire in a variety of styles and colours                                            CaterHire Top Tips:                                                                                                                                                    Check Out Our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex Pod Table Topper Ivory",
        sku: "1000578",
        description:
          "Our spandex table top covers are designed to fit over cocktail tables and complement your chosen spandex cocktail cover. They’re perfect for mixing and matching colours and styles, providing a bespoke and themed look for any event.\n\nKey Features\nCase Size: 1 Per Case \nSpandex topper designed to fit over cocktail table covers\nSpandex cover not included (order separately)\nVery popular for corporate events & parties\nFits table tops 31.5in – 33.5in / 80cm–85cm\nColour: Ivory\nAvailable to hire in a variety of styles and colours                                            CaterHire Top Tips:                                                                                                                                                    Check Out Our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex Pod Table Topper Orange",
        sku: "1000574",
        description:
          "Our spandex table top covers are designed to fit over cocktail tables and complement your chosen spandex cocktail cover. They’re perfect for mixing and matching colours and styles, providing a bespoke and themed look for any event.\n\nKey Features\nCase Size: 1 Per Case \nSpandex topper designed to fit over cocktail table covers\nSpandex cover not included (order separately)\nVery popular for corporate events & parties\nFits table tops 31.5in – 33.5in / 80cm–85cm\nColour: Orange\nAvailable to hire in a variety of styles and colours                                            CaterHire Top Tips:                                                                                                                                                    Check Out Our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex Pod Table Topper Pink Sparkle",
        sku: "1000586",
        description:
          "Our spandex table top covers are designed to fit over cocktail tables and complement your chosen spandex cocktail cover. They’re perfect for mixing and matching colours and styles, providing a bespoke and themed look for any event.\n\nKey Features\nCase Size: 1 Per Case \nSpandex topper designed to fit over cocktail table covers\nSpandex cover not included (order separately)\nVery popular for corporate events & parties\nFits table tops 31.5in – 33.5in / 80cm–85cm\nColour: Pink Sparkle\nAvailable to hire in a variety of styles and colours                                            CaterHire Top Tips:                                                                                                                                                    Check Out Our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex Pod Table Topper Red",
        sku: "1000577",
        description:
          "Our spandex table top covers are designed to fit over cocktail tables and complement your chosen spandex cocktail cover. They’re perfect for mixing and matching colours and styles, providing a bespoke and themed look for any event.\n\nKey Features\nCase Size: 1 Per Case \nSpandex topper designed to fit over cocktail table covers\nSpandex cover not included (order separately)\nVery popular for corporate events & parties\nFits table tops 31.5in – 33.5in / 80cm–85cm\nColour: Red\nAvailable to hire in a variety of styles and colours                                            CaterHire Top Tips:                                                                                                                                                    Check Out Our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex Pod Table Topper White",
        sku: "1000576",
        description:
          "Our spandex table top covers are designed to fit over cocktail tables and complement your chosen spandex cocktail cover. They’re perfect for mixing and matching colours and styles, providing a bespoke and themed look for any event.\n\nKey Features\nCase Size: 1 Per Case \nSpandex topper designed to fit over cocktail table covers\nSpandex cover not included (order separately)\nVery popular for corporate events & parties\nFits table tops 31.5in – 33.5in / 80cm–85cm\nColour: White\nAvailable to hire in a variety of styles and colours                                            CaterHire Top Tips:                                                                                                                                                    Check Out Our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex Red Pod Cover",
        sku: "1000681",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re popular for corporate functions, parties, and special occasions. Available in a wide range of colours, they can complement any event theme.\n\nKey Features\n\nDurable spandex stretch fabric\nSleek and modern fitted design\nColour: Red popular for corporate events & parties\nCase Size: 1 Per Case \nFits table tops 31.5in –  33.5in /  80–85cm and height 43.3in – 45.3in / 110–115cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a variety of colours\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex Round Table Cover White - 5ft/ 6ft",
        sku: "1000566",
        description:
          "Our white spandex round dining table covers are a stylish solution for transforming your event tables. Designed to fit both 5ft (60”) and 6ft (72”) round tables, these covers are perfect for weddings, corporate events, and elegant parties. The stretchable spandex fabric ensures a sleek, wrinkle-free finish, providing a polished and modern look for your venue.\n\nKey Features\nCase Size: 1 Per Case \nPremium spandex stretch fabric\nColour: White \nFits 5ft / 60in and 6ft / 72in round tables\nSleek, fitted design for a modern, wrinkle-free finish\n\nDimensions\n\n5ft round table / 60in \n6ft round table / 72in\n\nCaterHire Top Tips\nCheck out our Blog: All You Need to Know About Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex Royal Blue Pod Cover",
        sku: "1000680",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re popular for corporate functions, parties, and special occasions. Available in a wide range of colours, they can complement any event theme.\n\nKey Features\n\nDurable spandex stretch fabric\nSleek and modern fitted design\nColour: Royal Blue popular for corporate events & parties\nCase Size: 1 Per Case \nFits table tops 31.5in –  33.5in /  80–85cm and height 43.3in – 45.3in / 110–115cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a variety of colours\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex Silver Grey Pod Cover",
        sku: "1000682",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re popular for corporate functions, parties, and special occasions. Available in a wide range of colours, they can complement any event theme.\n\nKey Features\n\nDurable spandex stretch fabric\nSleek and modern fitted design\nColour: Silver Grey popular for corporate events & parties\nCase Size: 1 Per Case \nFits table tops 31.5in –  33.5in /  80–85cm and height 43.3in – 45.3in / 110–115cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a variety of colours\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex Turquoise Pod Cover",
        sku: "1107",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re popular for corporate functions, parties, and special occasions. Available in a wide range of colours, they can complement any event theme.\n\nKey Features\n\nDurable spandex stretch fabric\nSleek and modern fitted design\nColour: Turquoise popular for corporate events & parties\nCase Size: 1 Per Case \nFits table tops 31.5in –  33.5in /  80–85cm and height 43.3in – 45.3in / 110–115cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a variety of colours\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Spandex White Pod Cover",
        sku: "1000650",
        description:
          "Our spandex cocktail table covers are the perfect way to dress up cocktail tables for any event. Designed for a sleek, fitted look, they’re popular for corporate functions, parties, and special occasions. Available in a wide range of colours, they can complement any event theme.\n\nKey Features\n\nDurable spandex stretch fabric\nSleek and modern fitted design\nColour: White  popular for corporate events & parties\nCase Size: 1 Per Case \nFits table tops 31.5in –  33.5in /  80–85cm and height 43.3in – 45.3in / 110–115cm\nFour elasticated feet attach securely to table legs\nAvailable to hire in a variety of colours\n\nCaterHire Top Tips\nOur spandex covers fit perfectly with our high bar cocktail tables. Check out our Blog: All You Need to Know About Table Linen!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Table Protector Rectangular 8ft x 4ft",
        sku: "303T",
        description:
          "Protect your tables with our 8ft x 4ft rectangular table protector, designed to shield surfaces from spills and scratches. This durable protector is ideal for a wide range of events, from weddings to corporate functions.\n\nKey Features\nColour: White\nSuitable for 8ft x 4ft / 96in x 48in rectangular tables\nIdeal for a variety of occasions, from weddings to corporate events\nCase Size: 1 Per Case \nDimensions\n\n8ft x 4ft / 96in x 48in                                                                       CaterHire Top Tips: Check Out Our Blog: All You Need to Know About Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Table Protector Round 5.5ft",
        sku: "1000620A",
        description:
          "Protect your tables with our 5.5ft round table protector, designed to shield surfaces from spills and scratches. This durable protector is ideal for a wide range of events, from weddings to corporate functions.\n\nKey Features\nCase Size: 1 Per Case \nColour: White\nSuitable for 5.5ft / 66in round tables\nIdeal for a variety of occasions, from weddings to corporate events\n\nDimensions\n\n5.5ft round table / 66in \n\nCaterHire Top Tip\nCheck out our Blog: All You Need to Know About Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Table Protector Round 5ft",
        sku: "1000620",
        description:
          "Protect your tables with our 5ft round table protector, designed to shield surfaces from spills and scratches. Ideal for weddings, corporate events, and any special occasion.\n\nKey Features\nCase Size: 1 Per Case \nSuitable for 5ft / 60in  and 6ft / 72in round tables\nDurable and practical table top protection\nPerfect for a variety of events\n\nDimensions\n\nFits a 5ft / 60in round table or a 6ft / 72in round table \n\nCaterHire Top Tip\nCheck out our blog: All You Need to Know About Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Table Protector Round 6ft",
        sku: "1000621",
        description:
          "Protect your tables with our 6ft round table protector, designed to shield surfaces from spills and scratches. This durable protector is ideal for a wide range of events, from weddings to corporate functions.\n\nKey Features\n\nColour: White\nSuitable for 6ft / 72in round tables\nIdeal for a variety of occasions, from weddings to corporate events\n\nDimensions\n\nFits a 6ft round table / 72in \n\nCaterHire Top Tip\nCheck out our blog: All You Need to Know About Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Velvet Chair Cover Black Crush",
        sku: "1000764",
        description:
          "Our black velvet chair covers are a popular hire choice for parties and banqueting events. They fit standard banquet chairs and are a stylish way to dress up a venue or complement your chosen colour scheme.\n\nKey Features\nColour: Black \nBlack crushed velvet fabric\nFits standard banquet chairs\nIdeal for dressing up a venue or covering chairs\nCase Size: 1 Per Case\nCan be accessorised with bows, napkins, and runners\n\nCaterHire Top Tips\nIf using venue chairs, we recommend checking that the chair covers will fit, as chair sizes may vary. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Velvet Chair Cover Red Crush",
        sku: "1000762",
        description:
          "Our red velvet chair covers are a popular hire choice for parties and banqueting events. They fit standard banquet chairs and are a stylish way to dress up a venue or complement your chosen colour scheme.\n\nKey Features\nColour: Red      Red crushed velvet fabric\nFits standard banquet chairs\nIdeal for dressing up a venue or covering chairs\nCase Size: 1 Per Case\nCan be accessorised with bows, napkins, and runners\n\nCaterHire Top Tips\nIf using venue chairs, we recommend checking that the chair covers will fit, as chair sizes may vary. Check out our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
      {
        name: "Velvet Chair Tie / Table Runner Red Crush",
        sku: "1000773",
        description:
          "Our red crushed velvet chair ties and table runners are a versatile way to enhance any event or occasion. Perfect for adding a touch of elegance, they can be used on chairs or tables to complement your chosen colour scheme.\n\nKey Features\nColour: Red\nCan be used as a chair tie or table runner\nIdeal for weddings, parties, and special events\nCase Size: 1 Per Case \nEnhances any venue or table setting\n\nCaterHire Top Tips:                                                                                                             Check Our Our Blog: All You Need to Know About Table Linen Hire!",
        blogs: [
          "https://www.caterhire.ie/blog/everything-you-need-to-know-about-table-linen-hire/?srsltid=AfmBOoo5460K26TtaS5iN7PZQrB0lsmwDsJxGC2d5JsCfXAqRK6KSrmU",
        ],
        links: [],
      },
    ];
    
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
      if (row.name) updates.name = row.name;
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
