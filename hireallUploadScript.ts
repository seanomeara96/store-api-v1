import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { htmlToText } from "html-to-text";
import { marked } from "marked";
import { hireallPrompt } from "./chat/prompts";
import {
  CustomField,
  getCustomFields,
} from "./functions/custom-fields/getCustomFields";
import { updateProduct } from "./functions/products/updateProduct";
import { getProductBySku } from "./functions/products/getProductBySKU";
import { getAllProducts } from "./functions/products/getAllProducts";
import { hireallCustomFieldNames } from "./hireall/customFieldNames";
import { applyCustomField } from "./functions/custom-fields/applyCustomField";

const testing = false;
const customFieldType = hireallCustomFieldNames.buffetWare;
const data: {
  sku: string;
  description: string;
  blogs?: string[];
  links?: string[];
  name?: string;
}[] = [
  {
    sku: "LO72A",
    description:
      "Create elegant separation within your event space using our Japanese White Half Size Room Divider. Ideal for weddings, exhibitions, backstage areas or corporate events, this divider offers a simple and stylish way to define zones without closing off the room completely.\n\nKey Features\n\nContemporary Japanese-inspired white finish\nHalf-size design for flexible space styling\nLightweight and easy to reposition\nSuitable for front-of-house and back-of-house use\n\nDimensions\n\nLength: 107cm / 42.1in\nWidth: 6cm / 2.4in\nHeight:126cm / 49.6in\n\nCaterHire Top Tip\nUse multiple half-size dividers together to create a clean visual flow while still allowing light to pass through. This is perfect for subtly guiding guest movement.",
    links: [],
    blogs: [],
  },
  {
    sku: "1084E",
    description:
      "Our Black Office Chair with Arms provides comfortable and practical seating for offices, control rooms, production areas and event operations. Designed for all-day use, it offers reliable support while maintaining a smart and professional appearance.\n\nKey Features\n\nClassic black office chair design\nIntegrated armrests for added comfort\nAdjustable height for user comfort\nSuitable for offices, event production, and back-of-house areas\n\nCaterHire Top Tip\nPair with our office furniture to create a functional and comfortable admin area for event teams and staff.",
    links: ["https://www.hireall.ie/office-furniture"],
    blogs: [],
  },
  {
    sku: "BARSTR",
    description:
      "Our Stainless Steel Short Handle Cocktail Strainer is an essential bar tool for creating perfectly smooth cocktails. Designed for professional and event bar use, it efficiently strains ice and solids to ensure a clean, polished pour.\n\nKey Features\n\nDurable stainless steel construction\nShort handle design for control and ease of use\nTwo-prong strainer for secure fit on mixing glasses\nIdeal for cocktail bars, mobile bars, and event service\n\nCaterHire Top Tip\nCheck out our Blog: Bar and Beverage Guide!",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/",
    ],
  },
  {
    sku: "VV30",
    description:
      "Our Copper Cup Cocktail Shaker is sleek and stylish. It combines a classic design with professional functionality, making it perfect for cocktail making at your next event!\n\nKey Features:\n\nCopper finish for a premium look and feel\nDurable stainless steel construction inside for long-lasting use\nSecure lid and built-in strainer for mixing\nIdeal for shaking cocktails and mocktails\nEasy to clean and maintain\n\nCaterHire Top Tip:\nCheck out our Blog:",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/",
    ],
  },
  {
    sku: "1000537B",
    description:
      "Bring style to your event or home bar setup with the Mahogany 8ft Bar Unit. Crafted from mahogany finish panels, this flat-pack unit is designed for easy transport and on-site assembly. Perfect for weddings, parties or professional events, it provides ample space to serve drinks while adding a classic touch to any venue.\n\nKey Features:\n\nElegant mahogany finish for a timeless look\nFlat-pack design for easy transport and storage\nAssemble on-site with included instructions\nSturdy construction to support glassware, bottles, and bar equipment\nVersatile for weddings, parties or corporate events\n\nDimensions:\n8 ft (243.8 cm)\n\nCaterHire Top Tip:\nCheck out our Blog: ​How to Choose a Bar to Hire for a Party or Event!",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/",
    ],
  },
  {
    sku: "1000537BACK",
    description:
      "Complete your bar setup with the Mahogany Back Bar Unit. The mahogany finish adds warmth and sophistication, while the flat-pack design makes transport and on-site assembly hassle-free. It's ideal for corporate events and weddings.\n\nKey Features:\n\nClassic mahogany finish for a stylish look\nFlat-pack design for easy transport and on-site assembly\nSturdy and durable construction\nPerfect for weddings, parties, corporate events or home bars\n\nCaterHire Top Tip:                                                                                                          Check out our Blog: ​How to Choose a Bar to Hire for a Party or Event.",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/",
    ],
  },
  {
    sku: "904UB",
    description:
      "Serve hot roasts and buffet style dishes with ease using our Stainless Steel 2-Lamp Heated Carvery Unit. Perfect for weddings, corporate events or large gatherings, this electric unit keeps your meats and sides at the ideal serving temperature while adding a professional touch to your catering setup. Durable and easy to use, it’s a must-have for any event.\n\nKey Features:\n\nMade from durable stainless steel for longevity and easy cleaning\nEquipped with 2 heat lamps to keep food warm and appetising\nElectric-powered for consistent temperature control\nIdeal for carvery stations, buffet lines or high volume catering        \n\nCaterHire Top Tip:                                                                                                           Always keep the carving area covered with foil or lids when not serving to lock in heat and moisture.",
    links: [],
    blogs: [],
  },
  {
    sku: "673",
    description:
      "Keep your food prep safe and organised with this Small Blue Chopping Board. It's an essential tool for any kitchen or catering setup. Its compact size makes it easy to store and clean, while the durable construction ensures long-lasting use.\n\nKey Features:\n\nColour-coded blue for easy hygiene and food safety (ideal for fish or seafood)\nCompact size, perfect for small prep tasks\nLightweight and easy to clean\nNon-slip surface for safe cutting\n\nCaterHire Top Tip:\nUse colour-coded chopping boards to prevent cross-contamination in busy kitchens.",
    links: [],
    blogs: [],
  },
  {
    sku: "675",
    description:
      "Stay organised and maintain food safety with this Small Brown Chopping Board, designed for everyday kitchen and catering use.It's durable and easy to clean and is an essential tool for event kitchens.\n\nKey Features:\nColour-coded brown for safe food prep\nCompact and lightweight for easy handling\nEasy to clean and sanitise\n\nCaterHire Top Tip:\nPair it with other colour-coded boards in your kitchen to keep prep hygienic and efficient.",
    links: [],
    blogs: [],
  },
  {
    sku: "677",
    description:
      "Stay organised and maintain food safety with this Small Yellow Chopping Board, designed for everyday kitchen and catering use.It's durable and easy to clean and is an essential tool for event kitchens.\n\nKey Features:\nColour-coded yellow for safe food prep\nCompact and lightweight for easy handling\nEasy to clean and sanitise\n\nCaterHire Top Tip:\nPair it with other colour-coded boards in your kitchen to keep prep hygienic and efficient.",
    links: [],
    blogs: [],
  },
  {
    sku: "672LG",
    description:
      "Stay organised and maintain food safety with this Large White Chopping Board, designed for everyday kitchen and catering use.It's durable and easy to clean and is an essential tool for event kitchens.\n\nKey Features:\nColour-coded white for safe food prep\nLightweight for easy handling\nEasy to clean and sanitise\n\nCaterHire Top Tip:\nPair it with other colour-coded boards in your kitchen to keep prep hygienic and efficient.",
    links: [],
    blogs: [],
  },
  {
    sku: "673LG",
    description:
      "Stay organised and maintain food safety with this Large Blue Chopping Board, designed for everyday kitchen and catering use.It's durable and easy to clean and is an essential tool for event kitchens.\n\nKey Features:\nColour-coded blue for safe food prep\nLightweight for easy handling\nEasy to clean and sanitise\n\nCaterHire Top Tip:\nPair it with other colour-coded boards in your kitchen to keep prep hygienic and efficient.",
    links: [],
    blogs: [],
  },
  {
    sku: "674L",
    description:
      "Stay organised and maintain food safety with this Large Green Chopping Board, designed for everyday kitchen and catering use.It's durable and easy to clean and is an essential tool for event kitchens.\n\nKey Features:\nColour-coded green for safe food prep\nLightweight for easy handling\nEasy to clean and sanitise\n\nCaterHire Top Tip:\nPair it with other colour-coded boards in your kitchen to keep prep hygienic and efficient.",
    links: [],
    blogs: [],
  },
  {
    sku: "675LG",
    description:
      "Stay organised and maintain food safety with this Large Brown Chopping Board, designed for everyday kitchen and catering use.It's durable and easy to clean and is an essential tool for event kitchens.\n\nKey Features:\nColour-coded brown for safe food prep\nLightweight for easy handling\nEasy to clean and sanitise\n\nCaterHire Top Tip:\nPair it with other colour-coded boards in your kitchen to keep prep hygienic and efficient.",
    links: [],
    blogs: [],
  },
  {
    sku: "676L",
    description:
      "Stay organised and maintain food safety with this Large Red Chopping Board, designed for everyday kitchen and catering use.It's durable and easy to clean and is an essential tool for event kitchens.\n\nKey Features:\nColour-coded red for safe food prep\nLightweight for easy handling\nEasy to clean and sanitise\n\nCaterHire Top Tip:\nPair it with other colour-coded boards in your kitchen to keep prep hygienic and efficient.",
    links: [],
    blogs: [],
  },
  {
    sku: "677L",
    description:
      "Stay organised and maintain food safety with this Large Yellow Chopping Board, designed for everyday kitchen and catering use.It's durable and easy to clean and is an essential tool for event kitchens.\nKey Features:\nColour-coded yellow for safe food prep\nLightweight for easy handling\nEasy to clean and sanitise\n\nCaterHire Top Tip:\nPair it with other colour-coded boards in your kitchen to keep prep hygienic and efficient.",
    links: [],
    blogs: [],
  },
  {
    sku: "409GAS",
    description:
      "Transport and store your gastronorm trays with ease using the 15 Rack Gastro Trolley. Designed for professional catering environments, this sturdy trolley allows for efficient movement of prepared food between kitchen and service areas. Practical and reliable, it is an essential piece of equipment for busy events and commercial kitchens.\n\nKey Features:\n\nHolds up to 15 gastronorm trays\nStrong, durable construction for commercial use\nSmooth-rolling castor wheels for easy manoeuvring\nOpen design for quick access to trays\nIdeal for kitchens, event catering and food service operations\n\nCaterHire Top Tip:\nLoad heavier trays on the lower racks to keep the trolley stable while moving. Check out our full range of Catering Equipment for more must-haves for your event kitchen!",
    links: [
      "https://www.hireall.ie/products/category/catering-equipment-hire/",
    ],
    blogs: [],
  },
  {
    sku: "2008",
    description:
      "Add a touch of classic elegance to your table setting with the Ascot Teaspoon. Featuring a timeless design and polished finish, this teaspoon is ideal for tea, coffee, and desserts, making it a versatile choice for events.\n\nKey Features:\n\nClassic Ascot pattern for a refined look\nPolished stainless steel finish\nComfortable to hold and well balanced\nSuitable for tea, coffee and desserts\nDurable and easy to clean\n\nCaterHire Top Tip:\nPair Ascot teaspoons with our matching Ascot cutlery to create a coordinated table setting.",
    links: ["https://www.hireall.ie/products/category/cutlery-hire/"],
    blogs: [],
  },
  {
    sku: "885",
    description:
      "Add a smart finishing touch to your table settings with our Steak Knife. It features a sharp stainless steel blade and a classic black handle, making it ideal for steak dinners and catered events. Supplied as a single item, it’s perfect for flexible table setups.\n\nKey Features:\n\nSharp stainless steel blade for effortless cutting\nClassic black handle for a clean, professional look\nComfortable grip for ease of use\nDurable design suitable for repeated catering use\nIdeal for steak service and formal dining\n\nCaterHire Top Tip:\nCheck out our full range of Tableware for more options!",
    links: [
      "https://www.hireall.ie/products/category/buffetware-table-service-hire/",
    ],
    blogs: [],
  },
  {
    sku: "737",
    description:
      "Create a soft, elegant table setting with the Ivory Linen 70in x 70in. Its neutral ivory tone adds a timeless, sophisticated look that complements any event theme, from weddings and formal dinners to corporate functions and private celebrations.\n\nKey Features:\n\nClassic ivory colour for a clean, elegant finish\nGenerous square size ideal for standard tables\nHigh-quality fabric with a smooth drape\nSuitable for weddings, banquets, and special events\nEasy to dress tables for a polished presentation\n\nDimensions:\n\nSize: 70 in x 70 in (178 cm x 178 cm)\n\nCaterHire Top Tip:                                                                                                       Check out our Blog: ​Everything You Need to Know About Table Linen Hire!",
    links: [],
    blogs: ["https://www.hireall.ie/blog/table-seating-and-linen-guide-/"],
  },
  {
    sku: "1000750",
    description:
      "Add a touch of sophistication to your seating with the Navy Cotton Wide Chair Tie. Perfect for weddings, corporate events, or special occasions, this tie effortlessly transforms plain chairs into stylish accents that complement your event’s décor.\n\nKey Features:\n\nRich navy colour for a classic, elegant look\nWide cotton fabric for a full, luxurious appearance\nEasy to tie and secure on most chair styles\nReusable and durable for multiple events\nIdeal for weddings, parties, and formal occasions\n\nCaterHire Top Tip:\nCheck out our Blog: Everything You Need to Know About Table Linen Hire!",
    links: [],
    blogs: ["https://www.hireall.ie/blog/table-seating-and-linen-guide-/"],
  },
  {
    sku: "1000575B",
    description:
      "Enhance your table décor with the Navy Pod Table Topper. Designed to add a pop of color and elegance, this tabletop accent is perfect for weddings, corporate events, and special occasions. Its rich navy hue complements a variety of table settings while protecting your surfaces and creating a polished look.\n\nKey Features:\n\nDeep navy color for a sophisticated, stylish finish\nDurable fabric suitable for repeated use\nProtects tables while enhancing presentation\nEasy to lay and remove\nIdeal for weddings, parties and formal events\n\nCaterHire Top Tip:\nCheck out our Blog: Everything You Need to Know About Table Linen Hire!",
    links: [],
    blogs: ["https://www.hireall.ie/blog/table-seating-and-linen-guide-/"],
  },
  {
    sku: "10007868A",
    description:
      "Elevate your event décor with the Gold Satin Wide Chair Tie. Luxurious and eye-catching, this satin tie transforms ordinary chairs into elegant focal points, perfect for weddings and banquets. Its wide design ensures a rich, full appearance that complements any theme.\n\nKey Features:\n\nLustrous gold satin finish for a glamorous look\nWide design for a full, luxurious effect\nEasy to tie and secure on most chair styles\nReusable and durable for multiple events\nIdeal for weddings, parties and special occasion\n\nCaterHire Top Tip:\nCreate a neat bow or drape the tie elegantly down the back of the chair. Pair with matching table linens or runners for a coordinated look.",
    links: [],
    blogs: ["https://www.hireall.ie/blog/table-seating-and-linen-guide-/"],
  },
  {
    sku: "1000660",
    description:
      "Keep your tables looking pristine with the 8ft Round Table Protector. Designed to shield surfaces from scratches, spills and heat, this durable protector is perfect for large events. Its round shape ensures full coverage.\n\nKey Features:\n\nProtects tables from scratches, spills and heat damage\nDurable and reusable material\nDesigned for 8ft round tables\nLightweight and easy to place or remove\nIdeal for any catered events\n\nDimensions:\n\nDiameter: 8ft \n\nCaterHire Top Tip: \nPlace the protector directly under table linens for complete coverage while keeping tables safe. Check out our Blog: Everything You Need to Know About Table Linen Hire!",
    links: [],
    blogs: ["https://www.hireall.ie/blog/table-seating-and-linen-guide-/"],
  },
  {
    sku: "SP002",
    description:
      "Transform your standard 8ft x 30” table into a sleek, modern feature with the Black Spandex Table Cover. Stretchy and form-fitting, this cover hugs the table’s edges for a clean and wrinkle-free look. It's ideal corporate events or trade shows, or even cocktail setups.\n\nKey Features:\n\nStretchable spandex material for a smooth and snug fit\nClassic black colour for a sophisticated, versatile look\nCovers 8ft x 30” tables perfectly\nEasy to fit\nIdeal for all types of events \n\nDimensions:\n\nLength: 8ft\n\nCaterHire Top Tip:\nCheck out our Blog: Everything You Need to Know About Table Linen Hire!",
    links: [],
    blogs: ["https://www.hireall.ie/blog/table-seating-and-linen-guide-/"],
  },
  {
    sku: "1000182",
    description:
      "Add style to your outdoor event with our Sage Parasol. Its soft and natural hue complements any wedding or patio setup, all whilst providing sun protection for guests.\n\nKey Features:\n\nColour: Sage\nProvides shade and comfort for outdoor events\nSturdy frame for stability and durability\nIdeal for garden parties and outdoor dining\n\nCaterHire Top Tip:                                                                                                                                                                      Check out our Blog: Garden Party Ideas for the Ultimate Summer Celebration",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/outdoor-furniture-must-haves-for-hire-for-spring-summer-2023/",
    ],
  },
  {
    sku: "PICKET1",
    description:
      "Add charm to your event décor with the White Picket Fence 1.2m. Perfect for garden parties or themed events, this classic fence provides a stylish barrier or backdrop.\n\nKey Features:\n\nClassic white picket design for a timeless look\nSturdy construction for easy placement and stability\nIdeal for lining paths, creating photo backdrops or sectioning areas\nLightweight and easy to assemble\nPerfect for weddings, garden parties or themed events\n\nDimensions:\n\n1.2m\n\nCaterHire Top Tip:                                                                                                                                                                   Check out our Blog: Garden Party Ideas for the Ultimate Summer Celebration",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/outdoor-furniture-must-haves-for-hire-for-spring-summer-2023/",
    ],
  },
  {
    sku: "PICKET2",
    description:
      "Add charm to your event décor with the White Picket Fence 2m. Perfect for garden parties or themed events, this classic fence provides a stylish barrier or backdrop.\n\nKey Features:\n\nClassic white picket design for a timeless look\nSturdy construction for easy placement and stability\nIdeal for lining paths, creating photo backdrops or sectioning areas\nLightweight and easy to assemble\nPerfect for weddings, garden parties or themed events\n\nDimensions:\n2m\n\nCaterHire Top Tip:                                                                                                                                                                   Check out our Blog: Garden Party Ideas for the Ultimate Summer Celebration",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/outdoor-furniture-must-haves-for-hire-for-spring-summer-2023/",
    ],
  },
  {
    sku: "SSFS0010A",
    description:
      "Keep your events safe and hygienic with the Free-Standing Stainless Steel Hand Sanitising Unit. Equipped with an automatic dispenser, this sleek unit provides a touch-free sanitising solution, making it an ideal choice for public gatherings.\n\nKey Features:\n\nFree-standing for flexible placement anywhere at your venue\nAutomatic, touch-free dispenser for hygiene and convenience\nDurable stainless steel construction for long-lasting use\nSimple refill system for standard sanitiser bottles\nIdeal for high-traffic events\n\nCaterHire Top Tip:\nCheck out our full range of Hygiene & Washware for more options for your next event!",
    links: [
      "https://www.hireall.ie/products/category/dishwashers-hygiene-for-hire/",
    ],
    blogs: [],
  },
  {
    sku: "1000905S",
    description:
      "Keep your food and beverages perfectly chilled with the Large Solid Top Chest Freezer, complete with trolley for easy mobility. This electric freezer is ideal for catering, events or commercial use, offering generous storage space. Its sturdy trolley makes repositioning hassle-free.\n\nKey Features:\n\nLarge capacity chest freezer for bulk storage\nSolid top design to maximise cold retention\nComes with a built-in trolley for easy movement\nElectric-powered for reliable, consistent freezing\nDurable construction for commercial and event use\n\nDimensions:\n\nLength: 175 cm\nWidth: 73 cm\nHeight: 100 cm\n\nCaterHire Top Tip:\nCheck out our full range of refrigeration options for hire for your next event!",
    links: ["https://www.hireall.ie/products/category/refrigeration-hire/"],
    blogs: [],
  },
  {
    sku: "924B",
    description:
      "Serve hot dishes efficiently with the 4-Well Hot Servery Dry Unit with Lights. Designed for buffet lines and banquets, this professional unit keeps food warm and visible without the use of water.\n\nKey Features:\n\n4 well compartments for multiple dishes\nDry heating system for even, consistent warmth\nIntegrated lights to highlight and display food\nDurable construction suitable for events and catering\nIdeal for buffets, carveries and large-scale food service\n\nCaterHire Top Tip:\nCheck out our full range of Buffetware and Canape options for hire!",
    links: [
      "https://www.hireall.ie/products/category/buffetware-table-service-hire/",
    ],
    blogs: [],
  },
  {
    sku: "1000809",
    description:
      "Serve your sugar in style with these classic Sugar Tongs. They're perfect for tea service, coffee stations or dessert tables.\n\nKey Features:\n\nDurable stainless steel construction\nSleek design\nEasy-to-use design for picking up sugar cubes\nIdeal for tea, coffee and dessert service\nReusable and easy to clean\n\nCaterHire Top Tip:\nCheck out our Blog: ​How to: Host the Ultimate Afternoon Tea at Home!",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/how-to-throw-a-communion-party-at-home-the-ultimate-guide/",
    ],
  },
  {
    sku: "3607",
    description:
      "Brew and serve tea with style using the Stainless Steel 35cl Teapot. Sleek and easy to handle, this single-serving teapot is perfect for events or home use.\n\nKey Features:\n\nMade from durable stainless steel for long-lasting use\n34.5cl capacity, ideal for single or small servings\nEasy-pour spout for precise serving\nSleek, polished finish for a professional appearance\nSimple to clean and maintain\n\nCapacity: \n34.5cl / 12oz \n\nCaterHire Top Tip:\nCheck out our full range of Beverage Service options for more!",
    links: [
      "https://www.hireall.ie/products/category/hot-beverage-service-for-hire/",
    ],
    blogs: [],
  },
  {
    sku: "245A",
    description:
      "Serve bread and rolls in style with the Round Stainless Steel Bread Basket 24cm. Sleek and easy to clean, this basket is perfect for weddings and catered events.\n\nKey Features:\n\nDurable stainless steel construction\nRound design, perfect for breads and pastries\nPolished finish for an elegant presentation\nLightweight and easy to handle\nIdeal for buffets and events\n\nDimensions:\n\n 24cm / 9.5in\n\nCaterHire Top Tip:\nCheck out our full range of Table Service options to complete your event!",
    links: [
      "https://www.hireall.ie/products/category/buffetware-table-service-hire/",
    ],
    blogs: [],
  },
  {
    sku: "415BL",
    description:
      "Handle and serve food with ease using these Small Food Tongs. Perfect for buffets, catering and casual dining, they provide a hygienic and convenient way to pick up pastries or salad items.\n\nKey Features:\n\nCompact size for precise handling of small items\nDurable stainless steel construction\nEasy to use design for hygienic serving\nLightweight and simple to clean\nIdeal for buffets, catering events and food stations                                                                                                               CaterHire Top Tip:                                                                                                                                                                            Check out our full selection of buffetware for more options for catering your event!",
    links: [
      "https://www.hireall.ie/products/category/buffetware-table-service-hire/",
    ],
    blogs: [],
  },
  {
    sku: "465A",
    description:
      "Make serving drinks and snacks effortless with this durable Plastic Serving Tray. Lightweight yet sturdy, it’s perfect for events or hospitality, providing a practical way to transport items.\n\nKey Features:\n\nMade from plastic\nEasy to carry and handle\nSuitable for drinks or snacks\nSimple to clean and maintain\nIdeal for catering events and hospitality use\n\nCaterHire Top Tip:\nCheck out our Blog: ​How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event!",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/",
    ],
  },
  {
    sku: "237",
    description:
      "Make food prep quick and efficient with our Large Stainless Steel Mixing Bowl. Ideal for mixing, tossing and holding ingredients, it’s a versatile essential for catering, baking and home kitchens. Durable and easy to clean, it combines practicality with a professional look.\n\nKey Features:\n\nMade from high-quality stainless steel\nLarge capacity for mixing or holding bulk ingredients\nLightweight yet sturdy design\nEasy to clean and maintain\nPerfect for catering and baking\n\nCaterHire Top Tip:\nCheck out our full range of Catering Equipment for more options for your event kitchen!",
    links: [
      "https://www.hireall.ie/products/category/catering-equipment-hire/",
    ],
    blogs: [],
  },
  {
    sku: "1000474A",
    description:
      "Present salads and side dishes beautifully with our Round Glass Serving Bowl. Its 1.5l capacity makes it ideal for catering or buffets.\n\nKey Features:\n\nMade from clear glass for an elegant look\nRound design ideal for salads, desserts and sides\n1.5 L capacity, suitable for small to medium portions\nEasy to clean and maintain\nPerfect for weddings, buffets, and catering events\n\nDimensions:\n\nDiameter: 15.2cm / 6in\nCapacity: 1.5L / 150cl / 50.7oz\n\nCaterHire Top Tip:                                                                                                                                                             Check out our full range of Serving Dishes to choose from a range of options for your next event!",
    links: [
      "https://www.hireall.ie/products/category/food-prep-service-for-hire/",
    ],
    blogs: [],
  },
  {
    sku: "886",
    description:
      "Add flavour to your dishes with this 30in Wooden Pepper Mill. Crafted from durable wood, it combines classic design with functionality, making it the ideal choice for both professional catering.\n\nKey Features:\n\nMade from high-quality, durable wood\n30.5cm size for easy handling\nAdjustable grinding mechanism for fine or coarse pepper\nElegant design that complements any table setting\nIdeal for restaurants or catering\n\nDimensions:\n\n30.5cm / 12in\n\nCaterHire Top Tip:\nCheck out our full Table Service selections for more options for catering your next event!",
    links: [
      "https://www.hireall.ie/products/category/buffetware-table-service-hire/",
    ],
    blogs: [],
  },
  {
    sku: "KILNER001",
    description:
      "Store and serve condiments, spices or small preserves with our 10cl Kilner Cliptop Jar. Its airtight seal keeps contents fresh, while the classic design adds a touch of charm to your table or kitchen. Perfect for catering, home use or gifting.\n\nKey Features:\n\n10cl capacity, ideal for small quantities\nAirtight cliptop lid to maintain freshness\nDurable glass construction\nClassic Kilner design for style and functionality\nPerfect for condiments, spices, preserves or gifts\n\nDimensions:\n\nCapacity: 10cl / 3.4oz \n\nCaterHire Top Tip:\nCheck out our Blog: 7 Wedding Favours That Your Guests Will ACTUALLY Use!",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/buffet-stations-your-complete-guide-/",
    ],
  },
  {
    sku: "464",
    description:
      "Display cakes, pastries and desserts elegantly with the Round White Melamine Cake Stand. Measuring 33cm, this sturdy and lightweight stand is perfect for weddings and catered events.\n\nKey Features:\n\nMade from melamine\nClassic round design with a pristine white finish\nIdeal for cakes, cupcakes and dessert presentations\nEasy to clean and reuse\n\nDimensions:\n\n33cm / 13in\n\nCaterHire Top Tip:                                                                                                                                                                Check out our Blog: How to: Host the Ultimate Afternoon Tea at Home!",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/how-to-throw-a-communion-party-at-home-the-ultimate-guide/",
    ],
  },
  {
    sku: "KILNER005",
    description:
      "Store, preserve and serve in style with our 3L Kilner Cliptop Jar. Its large capacity and airtight seal make it perfect for bulk preserves or beverages.\n\nKey Features:\n\nGenerous 3L capacity for large quantities\nAirtight cliptop lid keeps contents fresh\nClassic Kilner design suitable for display and service\nIdeal for preserves, pickles, infused drinks or bulk storage\n\nCapacity:                                                                                                                                                                                                      3L / 300cl / 101.4oz                                                                                                                            CaterHire Top Tip:\nCheck out our Blog: ​How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event!",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/",
    ],
  },
  {
    sku: "172",
    description:
      "Keep beverages hot or cold for your event with the 2.5L Pump Action Flask. Ideal for coffee, tea or chilled drinks, this flask combines convenience and durability, making it perfect for catering, buffets and self-service stations.\n\nKey Features:\n\n2.5 L capacity, suitable for small to medium groups\nPump action dispenser for easy, spill-free serving\nDurable construction for repeated event use\nKeeps beverages hot or cold for extended periods\nIdeal for catering, coffee stations and buffet setups\n\nCapacity:\n\n2.5L / 250cl / 84.5oz\n\nCaterHire Top Tip:\nCheck out our full range of Beverage Service options for more!",
    links: [
      "https://www.hireall.ie/products/category/hot-beverage-service-for-hire/",
    ],
    blogs: [],
  },
  {
    sku: "AFT2",
    description:
      "Serve scones, sandwiches and pastries in style with our Small 3-Tier Silver Afternoon Tea Stand. Designed to hold 13cm plates, this elegant stand is perfect for weddings, afternoon tea and catered events.\n\nKey Features:\n\nElegant silver finish for a polished, professional look\n3 tiers to display a variety of sweet and savory treats\nDesigned to hold 13cm plates\nSturdy construction for safe, stable use\nIdeal for weddings, afternoon teas, and special occasions\n\nDimensions:\n\nTakes 12.7cm / 5in plates\n\nCaterHire Top Tip:\nCheck out our Blog: How to: Host the Ultimate Afternoon Tea at Home!",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/how-to-throw-a-communion-party-at-home-the-ultimate-guide/",
    ],
  },
  {
    sku: "409GAS12",
    description:
      "Transport and store trays efficiently with the 12-Rack Gastro Trolley. Perfect for catering, buffets and high-volume events, this sturdy trolley keeps trays organised, making kitchen and service operations smoother and more professional.\n\nKey Features:\n\nHolds up to 12 standard gastronorm trays\nDurable stainless steel construction for long-lasting use\nSmooth-rolling wheels for easy maneuverability\nOpen design for easy loading and unloading of trays\nIdeal for commercial kitchens, catering and event service\n\nCaterHire Top Tip:\nCheck out our full range of Catering Equipment for more options to help you cater your event!",
    links: [
      "https://www.hireall.ie/products/category/catering-equipment-hire/",
    ],
    blogs: [],
  },
  {
    sku: "409GAS20",
    description:
      "Transport and store trays efficiently with the 20-Rack Gastro Trolley. Perfect for catering, buffets and high-volume events, this sturdy trolley keeps trays organised, making kitchen and service operations smoother and more professional.\n\nKey Features:\n\nHolds up to 20 standard gastronorm trays\nDurable stainless steel construction for long-lasting use\nSmooth-rolling wheels for easy maneuverability\nOpen design for easy loading and unloading of trays\nIdeal for commercial kitchens, catering and event service\n\nCaterHire Top Tip:\nCheck out our full range of Catering Equipment for more options to help you cater your event!",
    links: [
      "https://www.hireall.ie/products/category/catering-equipment-hire/",
    ],
    blogs: [],
  },
  {
    sku: "NOTB",
    description:
      "Keep your office or event space organized with this 4ft x 3ft Notice Board. Ideal for posting important information, schedules or announcements, it combines practicality with a professional appearance, making it perfect for offices, conference rooms or public areas.\n\nKey Features:\n\nLarge 4ft x 3ft surface for maximum display space\nSturdy frame for a polished, professional look\nPerfect for offices, schools or event spaces\n\nDimensions:\n\n4ft /122cm / 48in x 3ft / 91cm / 36in \nCaterHire Top Tip:\nCheck out our full range of Office Furniture for more options for your next corporate event!",
    links: ["https://www.hireall.ie/office-furniture"],
    blogs: [],
  },
  {
    sku: "LO72B",
    description:
      "Create privacy and define spaces elegantly with the Japanese White Room Divider. Its sleek, minimalist design adds a touch of sophistication to any event or interior, making it ideal for weddings, corporate events or home use.\n\nKey Features:\n\nClassic Japanese style design with white panels\nFreestanding and lightweight for easy positioning\nProvides privacy or divides spaces seamlessly\nDurable construction for repeated use\nPerfect for weddings or exhibitions\nCaterHire Top Tip:\nCheck out our Blog: How To: Have Your Wedding Reception at Home!",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/your-complete-guide-to-event-furniture-for-hire/",
    ],
  },
  {
    sku: "WHB001",
    description:
      "Keep your office, classroom or event space organised with this 4ft x 3ft Whiteboard. Perfect for writing notes, schedules or presentations, it provides a smooth, professional surface for markers, making it an essential tool for meetings and planning.\n\nKey Features:\n\nLarge 4ft x 3ft writing surface for maximum visibility\nSmooth whiteboard finish for dry-erase markers\nDurable frame for long-lasting use\nIdeal for offices, schools and event spaces                                                                          Dimensions:\n4ft /122cm / 48in x 3ft / 91cm / 36in \n\nCaterHire Top Tip:\nCheck out our full range of Office Furniture for more options for your next corporate event!",
    links: ["https://www.hireall.ie/office-furniture"],
    blogs: [],
  },
  {
    sku: "ALASKA1A",
    description:
      "Relax in style with the Alaska 3-Seater Sofa in Black Leather. Its sleek, modern design combines comfort and sophistication, making it perfect for lounges, offices, event spaces or VIP areas. The high quality leather finish adds durability while maintaining a luxurious look.\n\nKey Features:\n\nSeats three people comfortably\nPremium black leather upholstery for durability and elegance\nModern, minimalist design suitable for multiple settings\nSturdy frame for long-lasting use\nEasy to maintain and clean\n\nDimensions:\n\nLength: 185 cm / 73in\nWidth: 83 cm / 33in\nHeight: 60 cm / 24in\nCaterHire Top Tip:\nCheck out our Blog: All You Need to Know About Hiring Event Furniture!",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/your-complete-guide-to-event-furniture-for-hire/",
    ],
  },
  {
    sku: "704",
    description:
      "Cook quickly and efficiently with this 2-Ring Gas Cooker. Compact and portable, it’s perfect for catering or temporary kitchen setups where reliable heat is essential. Its simple design allows for versatile cooking while maintaining safety and ease of use.\n\nKey Features:\n\nTwo gas burners for simultaneous cooking\nCompact and portable design\nSuitable for pans of various sizes\nQuick, controllable heat for efficient cooking\nIdeal for catering events or temporary kitchens\n\nCaterHire Top Tip:\nCheck out our full range of Catering Equipment for more options for catering your next event!",
    links: [
      "https://www.hireall.ie/products/category/catering-equipment-hire/",
    ],
    blogs: [],
  },
  {
    sku: "1000016A",
    description:
      "Keep your plates at the perfect serving temperature with this Large Plate Warmer. Ideal for catering, buffets and professional kitchens, it ensures that food stays warm and ready to serve, enhancing both presentation and guest satisfaction.\n\nKey Features:\n\nLarge capacity suitable for multiple plates at once\nMaintains plates at optimal serving temperature\nDurable construction for repeated professional use\nSleek design fits seamlessly in catering or buffet setups\nEasy to operate and clean\n\nDimensions:\n\nLength: 152.4cm / 60in\nWidth: 71.1cm / 28in\nHeight: 86.4cm / 34in\n\nCaterHire Top Tip:\nCheck out our full range of Catering Equipment for more options for catering your next event!",
    links: [
      "https://www.hireall.ie/products/category/catering-equipment-hire/",
    ],
    blogs: [],
  },
  {
    sku: "910C",
    description:
      "Cook burgers, sandwiches and other hot foods efficiently with this Electric Burger Griddle. Compact yet powerful, it’s perfect for catering events, pop-ups or professional kitchens where consistent heat and quick service are essential.\n\nKey Features:\n\nElectric-powered for even, consistent cooking\nCompact design for versatile use in small spaces\nIdeal for burgers, sandwiches and grilled items\nDurable construction for repeated professional use\n\nDimensions:\n\nLength: 43.2cm / 17in\nWidth: 43.2 cm / 17in\nCaterHire Top Tip:\nCheck out our full range of Catering Equipment for more options for catering your next event!",
    links: [
      "https://www.hireall.ie/products/category/catering-equipment-hire/",
    ],
    blogs: [],
  },
  {
    sku: "1000116A",
    description:
      "Serve water, juice or other beverages elegantly with this Plain Glass Water Jug. With a 1.3L capacity, it’s perfect for catering and buffets.\nKey Features:\n\nMade from clear glass \n1.3 L capacity, ideal for small groups or table service\nSimple, plain design suitable for any setting\nEasy to clean and maintain\nPerfect for events\n\nCapacity: \n\n1.3L / 130cl / 44oz\n\nCaterHire Top Tip:\nCheck out our full range of Glassware for more!",
    links: ["https://www.hireall.ie/products/category/glassware-hire/"],
    blogs: [],
  },
  {
    sku: "206S",
    description:
      "Measure, pour, and serve with ease using this 80cl Stainless Steel Pouring Jug. Ideal for sauces, gravies or beverages, its sleek design and durable construction make it a must-have for catering and professional kitchens.\n\nKey Features:\n\nMade from durable, polished stainless steel\n80cl capacity for small to medium portions\nErgonomic handle and spout for precise pouring\nEasy to clean and maintain\nPerfect for table service or buffets\n\nCapacity:\n80cl / 27.05oz \nCaterHire Top Tip:\nCheck out our full range of Glassware for more!",
    links: ["https://www.hireall.ie/products/category/glassware-hire/"],
    blogs: [],
  },
  {
    sku: "210",
    description:
      "Serve vegetables or side dishes in style with our 25cm Oval Stainless Steel Veg Dish. With a single compartment, it’s perfect for catering, buffets and plated meals, offering durability and a professional presentation.\n\nKey Features:\n\nMade from durable stainless steel for long-lasting use\nOval design with one section for versatile serving\nIdeal for vegetables, side dishes or accompaniments\nSleek finish for professional presentation\nEasy to clean and maintain\n\nDimensions:\n 25.4cm / 10in\n\nCaterHire Top Tip:                                                                                                                                                            Check out our full range of Serving Dishes to choose from a range of options for your next event!",
    links: [
      "https://www.hireall.ie/products/category/salad-bowls-serving-dishes-for-hire/",
    ],
    blogs: [],
  },
  {
    sku: "669",
    description:
      "Keep your cutlery organised and accessible with this 4-Section Cutlery Tray. Ideal for catering, buffet or kitchen storage, it provides a neat and professional solution for separating knives, forks, spoons and other serving utensils.\n\nKey Features:\n\nFour separate compartments for organised storage\nDurable construction for repeated use\nEasy to clean and maintain\nSuitable for catering events or restaurants, \nLightweight and portable for flexible placement\n\nCaterHire Top Tip:\nCheck out our full range of Catering Equipment for more options on catering your next event!",
    links: [
      "https://www.hireall.ie/products/category/catering-equipment-hire/",
    ],
    blogs: [],
  },
  {
    sku: "121WH",
    description:
      "Serve salads, sides, or desserts elegantly with this Round White Serving Bowl. Its classic design and versatile size make it perfect for buffets or catered events. \n\nKey Features:\n\nDurable, high-quality white finish\nRound design ideal for a variety of dishes\nPerfect for salads, sides,or desserts\nEasy to clean and maintain\nIdeal for all types of catered events\n\nDimensions:\n25.4cm / 10in x 10.16cm / 4in\n\nCaterHire Top Tip:\nCheck out our full range of Serving Dishes for more options for your next event!",
    links: [
      "https://www.hireall.ie/products/category/salad-bowls-serving-dishes-for-hire/",
    ],
    blogs: [],
  },
  {
    sku: "1000356",
    description:
      "Perfect for buffet setups and food service, this 6cm Half-Section Insert allows you to portion and organise foods efficiently in gastronorm trays or hot/cold serving units. Its durable construction ensures professional, long-lasting use.\n\nKey Features:\n6cm inch deep, half-section size for flexible portioning\nCompatible with standard gastronorm trays and serving units\nDurable stainless steel construction\nIdeal for hot or cold food service\nEasy to clean and maintain\n\nDimensions:\n6.35cm / 2.5in\n\nCaterHire Top Tip:\nCheck out our full range of Gastro Pans & Roasting Trays for more!",
    links: [
      "https://www.hireall.ie/products/category/chafer-units-gastronorm-inserts-for-hire/",
    ],
    blogs: [],
  },
  {
    sku: "953",
    description:
      "Perfect for buffets and catering setups, this 10cm 1/3 Section Insert allows you to portion and organise foods efficiently within standard gastronorm trays. Its durable stainless steel construction ensures professional, long-lasting use/\n\nKey Features:\n10cm deep, 1/3 section size for versatile portioning\nCompatible with standard gastronorm trays and serving units\nDurable stainless steel construction\nSuitable for both hot and cold food service\nEasy to clean and maintain\n\nDimensions:\n10.2cm / 4in\n\nCaterHire Top Tip:\nCheck out our full range of Gastro Pans & Roasting Trays for more!",
    links: [
      "https://www.hireall.ie/products/category/chafer-units-gastronorm-inserts-for-hire/",
    ],
    blogs: [],
  },
  {
    sku: "984IN",
    description:
      "Designed for professional catering and buffet service, this 3cm Full Section Insert is ideal for shallow food presentation and efficient portion control. Perfect for use in gastronorm systems, it offers durability and flexibility for both hot and cold service.\n\nKey Features:\n\n3cm inch deep full-section size for shallow food layers\nCompatible with standard full-size gastronorm units\nSuitable for hot and cold food service\nEasy to clean and maintain\nDimensions                                                                                                                                                                   3.2cm                                                                                                                       CaterHire Top Tip: Check out our range of Gastro Pans & Roasting Trays for more!",
    links: [
      "https://www.hireall.ie/products/category/chafer-units-gastronorm-inserts-for-hire/",
    ],
    blogs: [],
  },
  {
    sku: "950",
    description:
      "Ideal for steaming, draining, and efficient food preparation, this 5cm Full Perforated Insert is designed for professional catering and buffet service. Its perforated base allows liquids to drain easily, making it perfect for vegetables, pasta and steamed foods.\n\nKey Features:\n\n5cm deep full-section size\nPerforated design for draining and steaming\nCompatible with standard full-size gastronorm units\nSuitable for hot and cold food preparation\n\nDimensions:\n\n5cm / 2in\n\nCaterHire Top Tip:\nCheck out our range of Gastro Pans & Roasting Trays for more!",
    links: [
      "https://www.hireall.ie/products/category/chafer-units-gastronorm-inserts-for-hire/",
    ],
    blogs: [],
  },
  {
    sku: "1000324",
    description:
      "Here’s a polished product description for your deep oval veg dish:\n\nServe vegetables and side dishes beautifully with the Oval White Deep Veg Dish 25cm. Its classic white finish and deeper design make it ideal for generous portions, buffets and catered events, offering both practicality and elegant presentation.\n\nKey Features:\n\nDurable white finish for a clean, professional look\nDeep oval design to hold larger portions\nIdeal for vegetables, sides and shared dishes\nSuitable for buffets, banquets and table service\nEasy to clean and maintain\n\nDimensions:\n25.4cm / 10in                                                                                                    CaterHire Top Tip:                                                                                                                                                             Check out our full range of Serving Dishes to choose from a range of options for your next event!",
    links: [
      "https://www.hireall.ie/products/category/salad-bowls-serving-dishes-for-hire/",
    ],
    blogs: [],
  },
  {
    sku: "F028",
    description:
      "The Chloe Brooch for our Chameleon chairs is a stylish decorative accessory designed to enhance the look of event chairs. Perfect for weddings, gala dinners or any special occasion, it adds a touch of elegance and sparkle. \n\nElegant and eye-catching accessory for chairs.\nSimple to attach to chair backs, ribbons or sashes.\nReusable and durable, made to withstand multiple events.\nAdds instant glamour and visual interest to standard seating.\n\nCaterHire Top Tip\n\nCheck out our Blog: Wedding Chair Hire - Why Hire Wedding Chairs for Your Big Day!",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
    ],
  },
  {
    sku: "F020",
    description:
      "The Chloe Brooch & Blush Pink Belt is a stylish accessory set designed to add to your event chairs. The brooch adds a sparkling focal point, while the blush pink belt (or sash) adds a soft touch of colour. Perfect for weddings, gala dinners or any event where sophistication and attention to detail matter.\n\nKey Features\nSoft pastel colour that complements the brooch and enhances chair covers or ribbons.\nEasy to attach: clip the brooch over the belt or ribbon to secure in place.\nReusable and durable, ideal for multiple events.\nInstantly transforms plain chairs into elegant seating displays.\n\nCaterHire Top Tip\n\nCheck out our Blog: Wedding Chair Hire - Why Hire Wedding Chairs for Your Big Day!",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
    ],
  },
  {
    sku: "300",
    description:
      "The 10 ft × 5 ft Oval Table (2 Part) is a versatile and elegant solution for large-scale events such as weddings, banquets, corporate dinners and gala functions. Its two-part design makes it easier to transport and assemble on-site while still providing a spacious surface for seating and catering.\nKey Features\nAccommodates a large number of guests or extensive table settings.\nSplits into two pieces for easier handling, transport, and storage.\nConstructed to support tableware, centrepieces and décor.\nIdeal for weddings, corporate events, buffets and banquet seating.                                                                                  Works with linens, runners, or overlays for customised styling.\n\nDimensions\n\n10 ft (305 cm) x 5 ft (152 cm)\n\nCaterHire Top Tip\nCheck out our Blog: All You Need to Know About Hiring Event Furniture!",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/your-complete-guide-to-event-furniture-for-hire/",
    ],
  },
  {
    sku: "1000365",
    description:
      "The Steel Serving Bucket is a practical and stylish way to serve chips, fries or other finger foods at dining events, bars or catering setups. Its compact size and durable construction make it ideal for individual servings or table presentation.\n\nKey Features\nIdeal for chips, fries, snacks or small side dishes.\nSmooth steel surface allows for quick washing and reuse.\nAdds a modern look to your table or buffet.\n\nDimensions\n\nDiameter: 8.5 cm / 21.6in                                                                                                                                                      CaterHire Top Tip:\nCheck out our Blog: Questions to Ask Your Caterer: Claire Hanley's Top Tips for Summer Weddings",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/buffet-stations-your-complete-guide-/",
    ],
  },
  {
    sku: "3031B",
    description:
      "The Black Milk Jug is a sleek and practical accessory for serving milk or cream at coffee stations, breakfast buffets, restaurants or catering events. Its dark, modern finish adds a touch of sophistication to any table setup.\n\nKey Features\n\nModern and elegant, suitable for any table or counter display.\nEasy-pour spout ensures smooth, drip-free pouring.\nMade to withstand regular use in busy catering environments.\nIdeal for milk, cream or sauces.\nSmooth surface allows for quick washing and maintenance.\n\nCaterHire Top Tip\nCheck out our full range of Crockery for more options!",
    links: ["https://www.hireall.ie/products/category/crockery-hire/"],
    blogs: [],
  },
  {
    sku: "ALICE0025",
    description:
      "Transform your children's parties into a whimsical wonderland with our delightful Toadstool Stool. Perfect for themed gatherings or playful tea parties, this stool brings a touch of magic to both indoor and outdoor settings. Pair it effortlessly with our matching Toadstool Table for a full fairytale feel. Available in vibrant colours, it's as charming as it is sturdy.\n\nKey Features:\nAdds a playful, whimsical element to any party\nMade from durable fiberglass resin\nSuitable for indoor and outdoor use\nAvailable in green/white, purple/white, and red/white\nColour: Blue \nCaterhire Top Tips:\nConsider mixing and matching different coloured stools to create a lively, colourful seating area for your little ones. Looking for more inspiration? Visit our blog for expert advice on event furniture hires to ensure your event is a memorable one!",
    links: [],
    blogs: ["https://www.hireall.ie/blog/"],
  },
  {
    sku: "LOCK04",
    description:
      "The 4-Door Office Locker is a practical and secure storage solution for workplaces, gyms, schools, or events. Its compact design provides multiple compartments in a single unit, helping keep personal belongings organised and safe.\n\nKey Features\nAllows multiple users to securely store items in one locker.\nMade from strong steel for long-lasting use.\nEach door comes with a key or padlock option for personal security.\nIdeal for offices, staff rooms, changing areas or storage rooms.\nSmooth surface for simple cleaning and upkeep.\n\nCaterHire Top Tip\nCheck out our full range of office furniture for more options!",
    links: ["https://www.hireall.ie/office-furniture"],
    blogs: [],
  },
  {
    sku: "FB0001",
    description:
      "The Portable Insulated Food Container is ideal for transporting hot or cold food safely to events, buffets, or off-site catering. Its insulation maintains temperature, ensuring food arrives fresh and ready to serve. Perfect for large-scale catering, outdoor events, or meal deliveries.\n\nKey Features\n\nKeeps food hot or cold for extended periods.\nRobust construction with handles for easy transport.\nLarge capacity to accommodate trays, pans or bulk food items.\nSmooth surfaces for quick cleaning and maintenance.\nIdeal for buffets, events and catering on the go.\n\nDimensions\n\nLength: 46.5cm / 18.3in\nWidth: 61cm / 24in \nHeight: 63cm / 24.8in\n\nCaterHire Top Tip\nCheck out our full range of Catering Equipment for more options for your event!",
    links: [
      "https://www.hireall.ie/products/category/catering-equipment-hire/",
    ],
    blogs: [],
  },
  {
    sku: "547",
    description:
      "Add a dash of sophistication to your table setting with our Gold Ivy Leaf Napkin. Its vibrant and crisp colour lends an elegant charm to any dining occasion, whether it’s a cozy dinner or a large celebration. Our convenient hire service ensures you can savour your event without the worry of cleaning, as we professionally launder the napkins afterward!\n\nKey Features:\nGold with Ivy Leaf print\nMix and match with our stylish tablecloth range\nVariety of colours available to complement any theme\nDimensions:\n20 in x 20 in / 50.8 cm x 50.8 cm \nCaterhire Top Tips:\nFor an effortless setup, be sure to explore our blog post on Everything You Need to Know About Table Linen Hire. It’s chock-full of useful advice to help you get the most out of your tableware choices.",
    links: [],
    blogs: ["https://www.hireall.ie/blog/table-seating-and-linen-guide-/"],
  },
  {
    sku: "550",
    description:
      "Add a dash of sophistication to your table setting with our Green Ivy Leaf Napkin. Its vibrant and crisp colour lends an elegant charm to any dining occasion, whether it’s a cozy dinner or a large celebration. Our convenient hire service ensures you can savour your event without the worry of cleaning, as we professionally launder the napkins afterward!\n\nKey Features:\nGreen with Ivy Leaf print\nMix and match with our stylish tablecloth range\nVariety of colours available to complement any theme\nDimensions:\n20 in x 20 in / 50.8 cm x 50.8 cm \nCaterhire Top Tips:\nFor an effortless setup, be sure to explore our blog post on Everything You Need to Know About Table Linen Hire. It’s chock-full of useful advice to help you get the most out of your tableware choices.",
    links: [],
    blogs: ["https://www.hireall.ie/blog/table-seating-and-linen-guide-/"],
  },
  {
    sku: "575A",
    description:
      "Add a dash of sophistication to your table setting with our Light Blue Ivy Leaf Napkin. Its vibrant and crisp colour lends an elegant charm to any dining occasion, whether it’s a cozy dinner or a large celebration. Our convenient hire service ensures you can savour your event without the worry of cleaning, as we professionally launder the napkins afterward!\n\nKey Features:\nLight Blue with Ivy Leaf print\nMix and match with our stylish tablecloth range\nVariety of colours available to complement any theme\nDimensions:\n20 in x 20 in / 50.8 cm x 50.8 cm \nCaterhire Top Tips:\nFor an effortless setup, be sure to explore our blog post on Everything You Need to Know About Table Linen Hire. It’s chock-full of useful advice to help you get the most out of your tableware choices.",
    links: [],
    blogs: ["https://www.hireall.ie/blog/table-seating-and-linen-guide-/"],
  },
  {
    sku: "K02",
    description:
      "The Black Kanopy 20 ft × 10 ft is a versatile outdoor shelter ideal for events, markets, weddings and exhibitions. Its modular design provides shade & shelter while being easy to transport and assemble.\n\nKey Features\nComes with frame, 8 walls, 12 weights, roof and a transport bag.\n20 ft × 10 ft provides ample space for tables, guests or merchandise.\nStrong materials suitable for outdoor conditions.\nModular frame and panels allow quick setup and takedown.\nIncludes 12 weights to secure the structure in place.\nPackage Includes\n1 × Frame\n8 × Walls (for full enclosure or partial configuration)\n12 × Weights \n1 × Roof\n1 × Transport Bag      \nDimensions\n\nLength: 20ft / 609.6cm\nWidth: 10ft / 304.8cm                                                                                                       CaterHire Top Tip:                                                                                                                  Check out our full range of Outdoor Furniture for more options for your next event!",
    links: [
      "https://www.hireall.ie/products/category/outdoor-furniture-bbq-for-hire/",
    ],
    blogs: [],
  },
  {
    sku: "POD12",
    description:
      "The Silver Wood Round Pod Table Top is a stylish, versatile table surface designed for events. Its silver-toned wood finish adds a modern look, ideal for cocktail tables or small dining arrangements.\n\nKey Features\n\nModern and versatile, complements a variety of event themes.\nIdeal for socialising and easy grouping in event spaces.\nBuilt to withstand regular use in busy event or catering settings.\nEasy to attach to compatible table bases or podium stands.\nPerfect for cocktail tables, buffet stations or display surfaces.\n\nDimensions\n\nDiameter: 59.7cm / 23.5in\n\nCaterHire Top Tip\nCheck out our Blog: All You Need to Know About Hiring Event Furniture!",
    links: [],
    blogs: [
      "https://www.hireall.ie/blog/your-complete-guide-to-event-furniture-for-hire/",
    ],
  },
];
const ouptputFilePath = path.resolve(__dirname, "ha-new-products-2026.json");
function addUpdatedItem(id: number): number[] {
  const ids = getUpdatedItems();
  ids.push(id);
  fs.writeFileSync(ouptputFilePath, JSON.stringify(ids), { encoding: "utf-8" });
  return ids;
}

function getUpdatedItems(): number[] {
  return JSON.parse(
    fs.readFileSync(ouptputFilePath, {
      encoding: "utf-8",
    }),
  );
}

require("./config/config").config("ha");

async function main() {
  try {
    if (testing) console.log(`### TESTING ### no products will be updated`);
    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const row = data[i];
      let product = await getProductBySku(row.sku);

      if (!product) {
        let products = await getAllProducts({ "sku:in": row.sku });
        if (!products.length || products.length > 1) {
          fs.writeFileSync(
            path.resolve(__dirname, `hireall-new-product-upload-errors.txt`),
            `no products (${products.length}) found on hireall for sku ${row.sku}`,
            { encoding: "utf-8", flag: "a" },
          );
          continue;
        }
        product = products[0];
      }

      if (getUpdatedItems().includes(product.id)) {
        console.log(`skipped ${product.name} because already updated`);
        continue;
      }

      const src_name = "caterhire";
      const destination_name = "hireall";
      const match_src_name = new RegExp(src_name, "gi");
      row.description = row.description.replace(
        match_src_name,
        destination_name,
      );

      let additionalContext = "";
      let customFields = await getCustomFields(product.id);
      let newCustomFields = await generateCustomFields(
        row.description,
        customFieldType,
      );

      console.log(`#### new custom fields`, newCustomFields);

      for (let i = 0; i < newCustomFields.length; i++) {
        const newCustomField = newCustomFields[i];
        let exists = false;
        for (let j = 0; j < customFields.length; j++) {
          const existingCustomField = customFields[j];
          if (
            newCustomField.name.trim().toLowerCase() ===
            existingCustomField.name.trim().toLowerCase()
          ) {
            exists = true;
          }
        }
        if (!exists) {
          if (testing) {
            await applyCustomField(
              product.id,
              newCustomField.name,
              newCustomField.value,
            );
          } else {
            console.log(
              "newCustomField.name",
              newCustomField.name,
              "newCustomField.value",
              newCustomField.value,
            );
          }
          customFields.push(newCustomField as CustomField);
        }
      }

      if (customFields.length > 0) {
        additionalContext += `IMPORTANT The updated product description (key features section) should exclude information contained in these custom fields: """${customFields
          .map((c) => c.name + " => " + c.value)
          .join(" | ")}""".`;
      }

      if (row.links && row.links.length) {
        additionalContext += `Embed this link in the content where suitable: ${row.links}.`;
      }

      if (row.blogs && row.blogs.length) {
        additionalContext += `Embed this blog hyperlink in the content after the key features list in its own sentence/paragraph: ${row.blogs}. The anchor text can be discerned from the slug of the provided blog URL.`;
      }

      additionalContext +=
        "Take a moment to ensure all the commands in this prompt are satisfied.";

      const newDescription = await contentStructure(
        row.description,
        additionalContext,
      );

      console.log(row.description);
      console.log(`---- BEFORE ----`);
      console.log(newDescription);
      console.log(`---- AFTER ----`);

      const updatedFields: any = {
        description: newDescription,
      };

      if (row.name) {
        updatedFields.name = row.name;
      }

      if (!testing) {
        //console.log(updatedFields)
        await updateProduct(product!.id, updatedFields);
        console.log(`updated  ${product!.id}`);
        addUpdatedItem(product!.id);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
main();

export async function contentStructure(
  productDescription: string,
  additionalContext: string,
): Promise<string> {
  try {
    const content = hireallPrompt(
      htmlToText(productDescription),
      additionalContext,
    );

    let response = await new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }).chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        {
          role: "user",
          content,
        },
      ],
    });

    return marked(response.choices[0].message.content || "");
  } catch (err: any) {
    throw err;
  }
}

async function generateCustomFields(
  productDescription: string,
  fieldNames: string[],
): Promise<{ name: string; value: string }[]> {
  try {
    let response = await new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }).chat.completions.create({
      model: "o3",
      messages: [
        {
          role: "user",
          content: `using the following product description
          '''${htmlToText(productDescription)}'''
          generate the applicable custom fields from this list of approved field names '''${fieldNames.join(
            ", ",
          )}'''
          If a field/value is not applicable or not specified do not include it in your response. Content wrapped in html <!-- --> comments should not appear in property name. The instructions inside the html comments should be adhered to.
          `,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "custom_fields_schema",
          schema: {
            $schema: "https://json-schema.org/draft/2020-12/schema",
            type: "object", // <-- FIXED: The root must be an object
            properties: {
              fields: {
                // <-- Wrap the array inside an object property
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    value: { type: "string" },
                  },
                  required: ["name", "value"],
                  additionalProperties: false,
                },
              },
            },
            required: ["fields"],
            additionalProperties: false,
          },
          strict: true,
        },
      },
    });

    const content = response.choices?.[0]?.message?.content;
    const parsed = content ? JSON.parse(content) : { fields: [] };

    return parsed.fields; // Extract the array from the object
  } catch (err: any) {
    throw err;
  }
}
