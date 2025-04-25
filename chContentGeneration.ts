import { caterhirePrompt } from "./chat/prompts";
import { generateProductDescription } from "./functions/chat/generateProductDescription";
import { getAllProducts } from "./functions/products/getAllProducts";
import { getProductBySku } from "./functions/products/getProductBySKU";
import { updateProduct } from "./functions/products/updateProduct";
import fs from "fs";
import path from "path";

const rand = 3;

function getChanges(): { sku: string; before: string; after: string }[] {
  return JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, `ch-content-changes-${rand}.json`),
      {
        encoding: "utf-8",
      }
    )
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
    path.resolve(__dirname, `ch-content-changes-${rand}.json`),
    JSON.stringify(changes),
    { encoding: "utf-8" }
  );
  return changes;
}

async function test() {
  try {
    const data = [
      {
        sku: "1000148",
        name: "Black Neo Wine Glass 35cl (Case Size 1)",
        description:
          "Our Black Neo glasses for hire are great for bringing some sparkle and sophistication to your table setting. These stylish glasses feature a long, slender stem and a well-proportioned body, making them a chic choice for modern table styling. Designed for use as either a water or wine glass, they’re a versatile and popular option for everything from private dinner parties to upscale corporate events.Key FeaturesSleek black coloured glass for a contemporary edgeIdeal as a water or wine glass Colour: Black Adds contrast and drama to your tablewareWashing of glassware included in rental priceCase Size: 1 glass per caseCapacity:35.4cl / 12ozCaterHire Top TipsStyle these striking glasses with our black stemmed glassware collection and pair them with our black crockery range for a coordinated look. Complete the table with modern flatware and minimalist linens to make the black glassware pop. Check out our Essential Guide to Glassware Hire for Events for expert tips on choosing the right glasses for your occasion.",
        links: ["https://www.caterhire.ie/black-crockery/"],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "1000181",
        name: "Black Salto Glass 33cl (Case Size 16)",
        description:
          "Our Salto glass for hire is great for adding a touch of colour and character to your dining table or event. With its curved silhouette and rich black finish, this glass brings a modern edge to any setting. It’s ideal for serving water, cocktails, brandy, or even creative desserts, making it a favourite for both casual and formal occasions.Key FeaturesBlack curved tumbler adds depth and contrast to your tableIdeal for water, cocktails, brandy, or dessertsWashing of glassware included in rental priceCase Size: 16 glasses per caseColour: BlackCapacity32.5cl / 11ozCaterHire Top TipsPair the Salto Black Tumbler with our black crockery range or use it as a striking contrast alongside clear or coloured glassware. Its versatility also makes it perfect for dessert stations or drinks receptions.Check out our Essential Guide to Glassware Hire for Events for expert tips on choosing the right glasses for your occasion.",
        links: [
          "https://www.caterhire.ie/products/glassware/coloured-glassware/",
          "https://www.caterhire.ie/black-crockery/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "1000109",
        name: "Brandy Balloon 27cl (Case Size 25)",
        description:
          "This classical styled snifter glass for hire is specially designed for brandy and cognac. To fully appreciate the rich and complex aromas of these spirits, the glass features a generous bowl that helps direct the bouquet to the nose, mouth, and palate. Its timeless design makes it ideal for both formal events and private gatherings.Key FeaturesClassical styled brandy/cognac glassGenerous bowl size to maximise aroma and flavourWashing of glassware included in the rental priceCase Size: 25 glasses per caseCapacity:26.6cl / 9ozCaterHire Top TipsThe best way to serve brandy is at room temperature. Hold the bowl of the snifter in the palm of your hand to gently warm the brandy, releasing its full aroma and depth of flavour. Check out our Essential Guide to Glassware Hire for Events.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "1000132",
        name: "Cabernet Red Wine Glass 35cl (Case Size 25)",
        description:
          "Our Cabernet range of wine glasses is very popular to hire for weddings, parties, and corporate events. Designed by Europe’s leading glass manufacturer, this red wine glass features an elegant, tall construction that enhances the rich and bold aromas of red wines. Suitable for both formal and informal occasions, the Cabernet glass offers the perfect blend of style and functionality.Key FeaturesStylish and elegant red wine glassHospitality quality glasswareWashing of glassware included in rental priceAvailable in red, white, and champagne stylesPacked in crates for safe transport (25 glasses per case)Capacity:35cl / 12ozCaterHire Top TipsWondering how many glasses you'll need for your event? A general rule of thumb is 1.5 glasses per person for the first hour, and 1 glass per person for every hour after that. Always round up slightly to account for breakages or guests misplacing glasses. Check out our Essential Guide to Glassware Hire for Events. You may also like our Cabernet White Wine Glass 24cl!",
        links: [
          "https://www.caterhire.ie/cabernet-white-wine-glass-8oz/",
          "https://www.caterhire.ie/products/barware-hire/bar-counters/",
          "https://www.caterhire.ie/champagne-saucer-4oz/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "1000130",
        name: "Cabernet White Wine Glass 24cl (Case Size 36)",
        description:
          "Our Cabernet range of wine glasses is very popular to hire for weddings, parties, and corporate events. Designed by Europe’s leading glass manufacturer, this white wine glass features an elegant, tall construction that highlights the delicate aromas and crisp flavours of white wine. These versatile glasses are ideal for both formal dining and relaxed gatherings.Key FeaturesStylish and elegant white wine glassHospitality quality glasswareWashing of glassware included in rental priceAvailable in red, white, and champagne stylesPacked in crates for safe transport (36 glasses per case)Capacity:24.7cl / 8ozCaterHire Top TipsWondering how many glasses you'll need for your event? A general rule of thumb is 1.5 glasses per person for the first hour, and 1 glass per person for every hour after that. Always allow a few extra to cover unexpected needs. Check out our Essential Guide to Glassware Hire for Events. You may also like our Cabernet Red Wine Glass 35cl.",
        links: ["https://www.caterhire.ie/cabernet-red-wine-glass-11oz/"],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "1000477",
        name: "Champagne Glass 12cl (Case Size 25)",
        description:
          "This contemporary champagne flute for hire features a sleek, angled bowl design that enhances the flavour and tasting experience of champagne and sparkling wine. Its tapered shape helps preserve bubbles, making it an ideal glass for weddings, celebrations, and stylish events.Key FeaturesTapered shape to preserve carbonation and flavourContemporary design with angled bowlWashing of glasses included in rental priceChampagne flutes also available in other stylesPacked in crates for safe transport (25 glasses per case)Capacity:11.8cl / 4ozCaterHire Top TipsThe best way to chill your champagne or sparkling wine is to fill an ice bucket and allow the bottle to cool for around 30 minutes before serving. We also supply ice, wine buckets, mobile bars and more to help complete your drinks setup.Check out our Essential Guide to Glassware Hire for Events. You may also like our Champagne Saucer 12cl!",
        links: ["https://www.caterhire.ie/ice-bucket-wine-bucket/"],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "1000147",
        name: "Champagne Saucer 12cl (Case Size 25)",
        description:
          "Our vintage style champagne saucers for hire are very popular to hire for weddings and themed parties. Also known as a champagne coupe, this classic stemmed glass features a wide, shallow bowl and is traditionally used for serving champagne and sparkling wine. It brings a touch of old-world glamour to any celebration.Key FeaturesTraditional vintage-style champagne glassWide, shallow bowl for a distinctive presentationWashing of glasses included in rental priceChampagne flutes also available in complementary stylesPacked in crates for safe transport - 25 per caseCapacity:11.8cl / 4ozCaterHire Top TipsThere are three common types of champagne glasses: the flute, the tulip, and the saucer. While the flute remains the most popular for preserving bubbles, the saucer is perfect for a vintage or glamorous theme. Check out our Essential Guide to Glassware Hire for Events. You may also like our Diva Champagne Flute 20.7cl.",
        links: ["https://www.caterhire.ie/diva-champagne-flute-7oz/"],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "1000125S",
        name: "Chrome Water Jug 100cl (Case Size 1)",
        description:
          "This jug for hire is the ideal choice for keeping water or other beverages easily accessible while adding a touch of sophistication to your table setup. With its polished chrome finish and sleek profile, it pairs beautifully with a variety of glassware and tableware styles, making it a popular choice for both formal and casual events.Key FeaturesPolished chrome finish for a sleek lookGenerous capacity to serve multiple guests with easeErgonomic handle for a comfortable and controlled pourCase Size: 1 per case Capacity:100cl/33.8ozCaterHire Top TipsLooking to complete your drinks setup? Explore our full range of Water Glasses for the perfect pairing. Don’t forget – all washing up is included in the hire price, so you can sit back, relax, and leave the rest to us. Check out our Blog: Our Essential Guide to Glassware Hire for Events.",
        links: ["https://www.caterhire.ie/water-beverage/"],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "185",
        name: "Clear Salto Glass 35cl (Case Size 25)",
        description:
          "Our Salto hiball glass tumbler for hire is a stylish, hard-wearing barrel-shaped glass with a thick base for added sturdiness. Its tall, curved design makes it ideal for serving water, juice, or beer at parties, weddings, and corporate events. Functional and elegant, this glass complements a wide range of table settings.Key FeaturesTall, curved hiball tumbler with durable designThick base for stability and a quality feelWashing of glasses included in rental pricePairs well with a variety of stemware ranges Case Size: 25 Per CaseCapacity:35.4cl / 12ozCaterHire Top TipsCheck out our Blog: Our Essential Guide to Glassware Hire for Events. You may also like: Black Salto Glass 33cl and Red Salto Glass 33cl – great options for adding colour to your table setting.",
        links: [
          "https://www.caterhire.ie/black-salto-glass-11oz/",
          "https://www.caterhire.ie/red-salto-glass-11oz/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "1000164",
        name: "Cubix Martini Bowl with Clear Cube 21cl (Case Size 10)",
        description:
          "Our eye-catching Cubix Martini Glass for hire is a fun and contemporary way to serve funky martinis, signature cocktails, or even creative appetisers. Featuring a stemless cocktail bowl that fits neatly into a separate acrylic cube-shaped base, this design adds a modern edge to your table or bar setup and is sure to be a talking point at your event.Key FeaturesStemless cocktail bowl with cube-shaped acrylic basePerfect for serving cocktails or appetisersWashing of glassware included in rental priceIdeal for stylish and themed events Case Size: 10 Per CaseCapacity:20.7cl / 7ozCaterHire Top TipsExplore our full range of cocktail glasses to bring colour and personality to your drinks menu. We also supply large bags of ice – a must-have for keeping cocktails cold and refreshing. Check out our Blog: Our Essential Guide to Glassware Hire for Events.",
        links: [
          "https://www.caterhire.ie/products/glassware/cocktail-glasses/",
          "https://www.caterhire.ie/ice-cube-bag-20lb-9kg/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "CG003",
        name: "Diamond Clear Water Tumbler 28cl (Case Size 1)",
        description:
          "The Diamond collection for hire originates from the centuries-old Bohemian Crystal tradition, where glass and crystal were intricately decorated with the brilliance of diamond shapes. Our timeless Diamond glassware brings a joyful, elegant touch to any table setting with its shimmering, faceted appearance. Inspired by the rich, earthy palette of Dutch painter Rembrandt, this collection is available in a variety of tones to suit any event style. Its sturdy yet refined design makes it a beautiful choice for everything from everyday gatherings to weddings and special occasions.Key FeaturesColour: ClearAvailable in a variety of shades for hirePerfect for both everyday gatherings and special occasionsCase size: 1 per case Capacity: 28cl/9.5ozCaterHire Top TipYou may also like the Diamond Pitcher Clear (Case Size 1) to complete your table setting with a touch of matching style. Check our Blog: Our Essential Guide to Glassware Hire for Events.",
        links: [
          "https://www.caterhire.ie/products/diamond-pitcher-clear-for-hire/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "CG008",
        name: "Diamond Clear Wine Goblet 21cl (Case Size 25)",
        description:
          "Our gorgeous Diamond Stemmed Glass range for hire will instantly transform any table setting. Made in Portugal, these high-quality crystal glasses feature an eye-catching cut facet design that reflects light beautifully. Available in a selection of unique colours, they’re perfect for enhancing both winter and summer table décor. Whether used for wine or water, these glasses add a refined yet modern touch to your event.Key FeaturesStunning clear diamond-cut crystal glassSuitable for serving wine or waterAvailable in a range of colours to suit any themeWashing of glasses included in rental price Colour: Clear Case Size: 25 Per CaseCapacity:20.7cl / 7ozCaterHire Top TipsCreate a beautifully curated table setting by pairing this glass with our elegant crockery collections from Wedgwood and Jasper Conran for a timeless look. Check out our Blog: Essential Guide to Glassware Hire for Events.",
        links: [
          "https://www.caterhire.ie/wedgwood-fine-white-bone-china/",
          "https://www.caterhire.ie/jasper-conran/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "CG001",
        name: "Diamond Green Wine Goblet 21cl (Case Size 25)",
        description:
          "Our gorgeous Diamond Stemmed Glass range for hire will instantly transform any table setting. Made in Portugal, these high-quality crystal glasses feature an eye-catching cut facet design that reflects light beautifully. Available in a selection of unique colours, they’re perfect for enhancing both winter and summer table décor. Whether used for wine or water, these glasses add a refined yet modern touch to your event.Key FeaturesStunning green diamond-cut crystal glassSuitable for serving wine or waterAvailable in a range of colours to suit any themeWashing of glasses included in rental price Colour: Green Case Size: 25 Per CaseCapacity:20.7cl / 7ozCaterHire Top TipsCreate a beautifully curated table setting by pairing this glass with our elegant crockery collections from Wedgwood and Jasper Conran for a timeless look. Check out our Blog: Essential Guide to Glassware Hire for Events.",
        links: [
          "https://www.caterhire.ie/wedgwood-fine-white-bone-china/",
          "https://www.caterhire.ie/jasper-conran/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "CG009",
        name: "Diamond Grey Wine Goblet 21cl (Case Size 25)",
        description:
          "Our gorgeous Diamond Stemmed Glass range for hire will instantly transform any table setting. Made in Portugal, these high-quality crystal glasses feature an eye-catching cut facet design that reflects light beautifully. Available in a selection of unique colours, they’re perfect for enhancing both winter and summer table décor. Whether used for wine or water, these glasses add a refined yet modern touch to your event.Key FeaturesStunning grey diamond-cut crystal glassSuitable for serving wine or waterAvailable in a range of colours to suit any themeWashing of glasses included in rental price Colour: Grey Case Size: 25 Per CaseCapacity:20.7cl / 7ozCaterHire Top TipsCreate a beautifully curated table setting by pairing this glass with our elegant crockery collections from Wedgwood and Jasper Conran for a timeless look. Check out our Blog: Essential Guide to Glassware Hire for Events.",
        links: [
          "https://www.caterhire.ie/wedgwood-fine-white-bone-china/",
          "https://www.caterhire.ie/jasper-conran/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "CG002",
        name: "Diamond Pastel Blue Wine Goblet 21cl (Case Size 25)",
        description:
          "Our gorgeous Diamond Stemmed Glass range for hire will instantly transform any table setting. Made in Portugal, these high-quality crystal glasses feature an eye-catching cut facet design that reflects light beautifully. Available in a selection of unique colours, they’re perfect for enhancing both winter and summer table décor. Whether used for wine or water, these glasses add a refined yet modern touch to your event.Key FeaturesStunning pastel blue diamond-cut crystal glassSuitable for serving wine or waterAvailable in a range of colours to suit any themeWashing of glasses included in rental price Colour: Pastel Blue Case Size: 25 Per CaseCapacity:20.7cl / 7ozCaterHire Top TipsCreate a beautifully curated table setting by pairing this glass with our elegant crockery collections from Wedgwood and Jasper Conran for a timeless look. Check out our Blog: Essential Guide to Glassware Hire for Events.",
        links: [
          "https://www.caterhire.ie/wedgwood-fine-white-bone-china/",
          "https://www.caterhire.ie/jasper-conran/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "CG005",
        name: "Diamond Pink Wine Goblet 21cl (Case Size 25)",
        description:
          "Our gorgeous Diamond Stemmed Glass range for hire will instantly transform any table setting. Made in Portugal, these high-quality crystal glasses feature an eye-catching cut facet design that reflects light beautifully. Available in a selection of unique colours, they’re perfect for enhancing both winter and summer table décor. Whether used for wine or water, these glasses add a refined yet modern touch to your event.Key FeaturesStunning pink diamond-cut crystal glassSuitable for serving wine or waterAvailable in a range of colours to suit any themeWashing of glasses included in rental price Colour: Pink Case Size: 25 Per CaseCapacity:20.7cl / 7ozCaterHire Top TipsCreate a beautifully curated table setting by pairing this glass with our elegant crockery collections from Wedgwood and Jasper Conran for a timeless look. Check out our Blog: Essential Guide to Glassware Hire for Events.",
        links: [
          "https://www.caterhire.ie/wedgwood-fine-white-bone-china/",
          "https://www.caterhire.ie/jasper-conran/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "CG0011",
        name: "Diamond Pitcher Blue 100cl (Case Size 1)",
        description:
          "The Diamond collection for hire originates from the centuries-old Bohemian Crystal tradition of decorating glass and crystal with the brilliance of diamond-shaped cuts. This timeless glassware brings a joyful, shimmering touch to any table setting and is available in a stunning palette inspired by the colours of Dutch master Rembrandt. Its sturdy yet elegant design makes it a standout choice for both relaxed gatherings and special events like weddings.Key FeaturesColour: BlueCrafted in the Bohemian cut-glass traditionAvailable in a variety of rich tonesPerfect for both everyday use and formal occasionsSturdy design with a sparkling diamond finishCase size: 1 per caseCapacity:100cl/33.8ozCaterHire Top TipsCreate a beautiful table setting by pairing the Diamond glassware with our elegant crockery collections from Wedgwood and Jasper Conran. Complete the look with coordinating pieces from our Diamond Glassware range. Check out our Blog: Our Essential Guide to Glassware Hire.",
        links: [
          "https://www.caterhire.ie/wedgwood-fine-white-bone-china/",
          "https://www.caterhire.ie/jasper-conran/",
          "https://www.caterhire.ie/products/glassware-hire/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "CG0010",
        name: "Diamond Pitcher Clear 100cl (Case Size 1)",
        description:
          "The Diamond collection for hire originates from the centuries-old Bohemian Crystal tradition of decorating glass and crystal with the brilliance of diamond-shaped cuts. This timeless glassware brings a joyful, shimmering touch to any table setting and is available in a stunning palette inspired by the colours of Dutch master Rembrandt. Its sturdy yet elegant design makes it a standout choice for both relaxed gatherings and special events like weddings.Key FeaturesColour: ClearCrafted in the Bohemian cut-glass traditionAvailable in a variety of rich tonesPerfect for both everyday use and formal occasionsSturdy design with a sparkling diamond finishCase size: 1 per caseCapacity:100cl/33.8ozCaterHire Top TipsCreate a beautiful table setting by pairing the Diamond glassware with our elegant crockery collections from Wedgwood and Jasper Conran. Complete the look with coordinating pieces from our Diamond Glassware range. Check out our Blog: Our Essential Guide to Glassware Hire.",
        links: [
          "https://www.caterhire.ie/wedgwood-fine-white-bone-china/",
          "https://www.caterhire.ie/jasper-conran/",
          "https://www.caterhire.ie/products/glassware-hire/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "CG0012",
        name: "Diamond Pitcher Pink 100cl (Case Size 1)",
        description:
          "The Diamond collection for hire originates from the centuries-old Bohemian Crystal tradition of decorating glass and crystal with the brilliance of diamond-shaped cuts. This timeless glassware brings a joyful, shimmering touch to any table setting and is available in a stunning palette inspired by the colours of Dutch master Rembrandt. Its sturdy yet elegant design makes it a standout choice for both relaxed gatherings and special events like weddings.Key FeaturesColour: PinkCrafted in the Bohemian cut-glass traditionAvailable in a variety of rich tonesPerfect for both everyday use and formal occasionsSturdy design with a sparkling diamond finishCase size: 1 per caseCapacity:100cl/33.8ozCaterHire Top TipsCreate a beautiful table setting by pairing the Diamond glassware with our elegant crockery collections from Wedgwood and Jasper Conran. Complete the look with coordinating pieces from our Diamond Glassware range. Check out our Blog: Our Essential Guide to Glassware Hire.",
        links: [
          "https://www.caterhire.ie/wedgwood-fine-white-bone-china/",
          "https://www.caterhire.ie/jasper-conran/",
          "https://www.caterhire.ie/products/glassware-hire/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "1000140",
        name: "Diva Burgundy Glass 84cl (Case Size 16)",
        description:
          "Our Diva collection from Schott Zwiesel for hire is an experience for the senses – a glassware range that allows flavours and aromas to fully unfold. These large wine glasses feature a slender convex stem and a generous bowl. Perfect for weddings, private dining and high-end events.Key FeaturesCase Size: Each pack contains 16 glassesDesigned by world-renowned SCHOTT ZWIESELElegant crystal with slender stem and large bowlAvailable as part of a 4-piece rangeWashing of glassware included in rental priceCapacity:84cl / 28.4ozCaterHire Top TipsThe Diva Burgundy’s generous bowl makes it ideal for enhancing bold red wines and is also a popular choice for serving stylish Gin & Tonics. Check out our Blog: Our Essential Guide to Glassware Hire.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "1000135",
        name: "Diva Champagne Flute 21cl (Case Size 36)",
        description:
          "Our Diva crystal champagne flutes for hire are designed with entertaining in mind, bringing elegance to any celebration. Featuring an exquisitely slender stem and a tall, graceful body, these flutes are perfect for serving champagne or sparkling wine at weddings, parties, and other special events. Make a statement with this stylish, high-quality glassware designed by the world-renowned Schott Zwiesel.Key FeaturesCase Size: Each pack contains 36 glassesDesigned by world-renowned SCHOTT ZWIESELIdeal for serving champagne or sparkling wineWashing of glassware included in rental priceCapacity:20.7cl / 7ozCaterHire Top TipsThe best way to chill your champagne or sparkling wine is to fill an ice bucket and allow your bottle to cool for 20 minutes. Check out our blog: ​How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: ["https://www.caterhire.ie/ice-bucket-wine-bucket/"],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOoqnrPp2SZIGFP07Wc7eHPOxVwdAC37H09fbuqwcH4t-dLaw5zX5",
        ],
      },
      {
        sku: "1000133",
        name: "Diva Red Wine Glass 44cl (Case Size 25)",
        description:
          "Our Diva collection from Schott Zwiesel for hire is designed to enhance the wine-drinking experience, allowing the full flavour and aroma to unfold. These crystal glasses are the epitome of style, featuring a slender convex stem and a generous bowl size, making them perfect for savoury, complex wines. Ideal for fine dining, weddings, and special events, the Diva Burgundy glass brings sophistication to every occasion.Key FeaturesCase Size: Each pack contains 25 glassesDesigned by world-renowned SCHOTT ZWIESELElegant crystal with slender stem and generous bowl sizeWashing of glassware included in rental priceCapacity:44.4cl / 15ozCaterHire Top TipsThis is the perfect glass to savour the full flavour and aroma of Burgundy and Beaujolais wines, allowing them to breathe and enhance your tasting experience. Check out our Blog: ​How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOoqnrPp2SZIGFP07Wc7eHPOxVwdAC37H09fbuqwcH4t-dLaw5zX5",
        ],
      },
      {
        sku: "1000136",
        name: "Diva Water Glass 47cl (Case Size 25)",
        description:
          "Our Diva crystal water glasses for hire are designed with entertaining in mind. Featuring a slender stem and tall body, these glasses complement the Diva wine and champagne glasses perfectly. Ideal for any special event or wedding, they bring an elegant touch to your table setting while ensuring a comfortable and refined drinking experience.Key FeaturesCase Size: Each pack contains 25 glassesDesigned by world-renowned SCHOTT ZWIESELElegant crystal design with slender stem and tall bodyWashing of glassware included in hire priceCapacity:47.3cl / 16ozCaterHire Top TipsWe’ve got everything you need to hire for a drinks reception or a fine dining dinner. From serving trays and wine buckets to bars and much more! Check out our Blog: Caterhire's Essential Guide to Glassware Hire for Events.",
        links: [
          "https://www.caterhire.ie/products/buffet-display/buffet-platters-trays/",
          "https://www.caterhire.ie/ice-bucket-wine-bucket/",
          "https://www.caterhire.ie/products/barware-hire/bar-counters/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "1000134",
        name: "Diva White Wine Glass 30cl (Case Size 36)",
        description:
          "Our Diva collection for hire from Schott Zwiesel offers an exceptional sensory experience, letting the full flavour of your drinks unfold. These crystal glasses are the epitome of style, featuring a slender stem and tall body that add elegance to any occasion. Designed for fine dining, they are the perfect choice for weddings, special events, and high-end gatherings.Key FeaturesCase Size: Each case contains 36 glassesDesigned by world-renowned SCHOTT ZWIESELElegant crystal design with slender stem and tall bodyWashing of glassware included in hire priceCapacity:29.6cl / 10ozCaterHire Top TipsWe’ve got everything you need to hire for a drinks reception or fine dining dinner. From serving trays, wine buckets, bars, and much more! Check out our blog: Caterhire's Essential Guide to Glassware Hire for Events.",
        links: [
          "https://www.caterhire.ie/products/buffet-display/buffet-platters-trays/",
          "https://www.caterhire.ie/ice-bucket-wine-bucket/",
          "https://www.caterhire.ie/products/barware-hire/bar-counters/",
        ],
        blogs: [
          "https://www.caterhire.ie/blogcaterhires-essential-guide-to-glassware-hire-for-events/?srsltid=AfmBOoqf3n26vgf-CvnCz19_wNRW_8aKaA1UoaZ8pZYhyMLA70cvwGJs",
        ],
      },
      {
        sku: "1000128",
        name: "Elegance Champagne Flute 18cl (Case Size 49)",
        description:
          "Our Elegance champagne flutes for hire are highly popular for weddings, parties, and corporate events. Designed by Europe’s leading glass manufacturer, these flutes feature an elegant long stem and a well-proportioned body. Perfect for champagne or sparkling wines, they bring a touch of class and sophistication to any event.Key FeaturesElegant long-stemmed champagne glassWell-proportioned with clean, simple linesWashing of glassware included in rental priceCase Size: Packed in crates for transport (49 glasses)Capacity:17.7cl / 6ozCaterHire Top TipsHow many glasses do you need for your event? We generally recommend the following rule of thumb: 1.5 glasses per person for the first hour and 1 glass per hour for every hour after. Check out our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOoqnrPp2SZIGFP07Wc7eHPOxVwdAC37H09fbuqwcH4t-dLaw5zX5",
        ],
      },
      {
        sku: "CG0013",
        name: "Fleur De Lys Pitcher Powder Pink 100cl (Case Size 1)",
        description:
          "Our timeless Fleur de Lys glassware for hire brings a joyful touch to any table setting with its rich design and vibrant colours. Inspired by the palette of the famous Dutch painter Rembrandt, these pitchers are available in various tones that complement both winter and summer shades. Perfect for serving fresh water, infused with lime and mint, or pouring sweet, deep red sangria, these pitchers make a stunning addition to any event.Key FeaturesRich design with vibrant coloursAvailable in a variety of tones inspired by Rembrandt’s palettePerfect for serving water, sangria, or infused drinksWashing of glassware included in rental price Case Size: 1 Per Case Colour: Powder PinkCapacity:100cl/33.8ozCaterHire Top TipsCreate a stunning table setting by styling this pitcher with our beautiful crockery collections from Wedgwood and Jasper Conran, and pair it with our diamond glassware for an unforgettable look. Check out our Blog: Easy Outdoor Summer Tablescaping.",
        links: [
          "https://www.caterhire.ie/wedgwood-fine-white-bone-china/",
          "https://www.caterhire.ie/jasper-conran/",
          "https://www.caterhire.ie/products/glassware-hire/",
        ],
        blogs: ["Easy", "Outdoor", "Summer", "Tablescaping"],
      },
      {
        sku: "1000364",
        name: "Gin Balloon 59cl (Case Size 16)",
        description:
          "The Gin Revolution is in full swing, and our oversized gin glasses for hire are the perfect choice for every G&T lover. These glasses feature a classic balloon shape, offering ample room for ice and enhancing the flavours of your gin. Perfect for serving refreshing Gin and Tonics, they make an ideal addition to any event.Key FeaturesCase Size: 16 glasses per caseStylish balloon-shaped glassWide bowl enhances the scent of gin’s botanicalsWashing of glassware included in rental priceCapacity:59.1cl / 20ozCaterHire Top TipsWe also supply bags of ice to help you make the perfect Gin and Tonic. Check out our Blog: ​How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: ["https://www.caterhire.ie/ice-cube-bag-20lb-9kg/"],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOoqnrPp2SZIGFP07Wc7eHPOxVwdAC37H09fbuqwcH4t-dLaw5zX5",
        ],
      },
      {
        sku: "1000102",
        name: "Half Pint Glass 30cl (Case Size 36)",
        description:
          "Our Tulip beer glass for hire is a staple in the hospitality industry and a popular choice to hire for parties and events. With its classic tulip shape, this glass is perfect for serving beers, ciders, lagers, and ales, enhancing both the aroma and appearance of your beverages.Key FeaturesCase Size: 36 pieces per caseTulip style beer glassIdeal for beers, ciders, lagers, and alesWashing of glassware included in rental priceCapacity:29.6cl/10ozCaterHire Top TipCheck out our blog: ​How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOoqnrPp2SZIGFP07Wc7eHPOxVwdAC37H09fbuqwcH4t-dLaw5zX5",
        ],
      },
      {
        sku: "1000228",
        name: "Irish Coffee Glass with Handle 24cl (Case Size 25)",
        description:
          "Our traditional Irish coffee glass for hire features a handle, making it ideal for serving Irish coffee or other hot drinks such as mulled wine, lattes, and hot whiskey. This glass combines classic style and practicality for your next event.Key FeaturesTraditional style glass with handleToughened glass, perfect for hot drinksWashing of glassware included in rental priceIrish coffee glasses without handles are also available Case Size: 25 per case Capacity:23.7cl / 8ozCaterHire Top TipOur Irish coffee glasses can be used for any hot drinks such as lattes and mulled wine. We also have Burco boilers and pump-action flasks available to keep your drinks hot throughout your event. Check out our blog: ​How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [
          "https://www.caterhire.ie/products/kitchen-equipment/hot-beverages/coffee-tea-hot-water-machines/",
          "https://www.caterhire.ie/products/kitchen-equipment/hot-beverages/pump-action-flasks/",
        ],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOoqnrPp2SZIGFP07Wc7eHPOxVwdAC37H09fbuqwcH4t-dLaw5zX5",
        ],
      },
      {
        sku: "1071",
        name: "Irish Coffee Glass without Handle 24cl (Case Size 36)",
        description:
          "Perfect for winter warmers and cocktails, our Irish Coffee Glass without handle for hire offers a sleek, minimalist alternative to the traditional design. Made from toughened glass, it's fully suitable for serving hot beverages like Irish coffee, mulled wine, lattes, and hot whiskey. Despite its handleless form, the durable construction ensures it’s safe and practical for hot drink service. A great choice for events, weddings, and parties.Key FeaturesSleek look for a modern twist on the classic Irish coffee glass.Built to withstand hot liquids with ease. Ideal for Irish coffee, mulled wine, hot whiskey, and lattes.Glassware washing included in rental price.Irish coffee glasses with handles are also available. Case Size: 36 Per CaseCapacity: 23.7cl / 8ozCaterhire Top TipsLooking to serve a crowd? Pair these glasses with our Burco boilers or pump-action flasks to keep your hot drinks ready to pour. Great for creating a warm drinks station at any event!",
        links: [
          "https://www.caterhire.ie/water-boiler-23-litre-100-cup/?srsltid=AfmBOoqtHXkIJQ1Qbu5U0oFlP5bDuS5YI7PzjQ4DNisO1RP5hxxFAkty",
          "https://www.caterhire.ie/pump-action-flask-3-litre/",
        ],
        blogs: [""],
      },
      {
        sku: "181",
        name: "John Rocha Red Wine Glass 59cl (Case Size 1)",
        description:
          "Introducing our exclusive John Rocha Waterford Crystal Glasses for hire, the perfect choice for an intimate dinner party or special occasion. From the acclaimed Flow Collection, these glasses reflect John Rocha’s signature aesthetic—clean, contemporary lines paired with a striking geometric motif. Crafted from luxurious Wedgwood crystal, they bring a sense of modern sophistication to any tablescape.Key FeaturesPart of John Rocha’s Waterford Flow Collection.Clean lines with a bold geometric motif.Luxurious Wedgwood crystal glass.Available in wine, flute, and water glass styles.Washing included in rental price. Case Size: 1 Per CaseCapacity: 59.1cl / 20oz Caterhire Top TipsComplete the look with Jasper Conran Chinoiserie china for a refined, designer table setting. For the finishing touch, pair with our Arthur Price silver cutlery.",
        links: [
          "https://www.caterhire.ie/products/crockery-hire/jasper-conran-wedgwood/",
          "https://www.caterhire.ie/products/cutlery/fine-dining/arthur-price-silver/",
        ],
        blogs: [""],
      },
      {
        sku: "182",
        name: "John Rocha Water Glass 47cl (Case Size 1)",
        description:
          "Our exclusive John Rocha Waterford Crystal Glasses for hire are ideal for intimate dinner parties or upscale events. Part of the Flow Collection, this design embodies John Rocha’s signature style—sleek, contemporary lines accented with a bold geometric motif on radiant crystal. Crafted from luxurious Wedgwood crystal, these glasses offer the perfect balance of modern sophistication and timeless craftsmanship.Key FeaturesFrom John Rocha’s iconic Flow Collection.Features clean lines and a distinctive geometric motif.Made from high-quality Wedgwood crystal.Available in wine, flute, and water glass options.Glassware washing included in rental price. Case Size: 1 Per Case Capacity: 47.3cl / 16ozCaterhire Top TipsPair with Jasper Conran Chinoiserie china and Arthur Price silver cutlery.",
        links: [
          "https://www.caterhire.ie/products/crockery-hire/jasper-conran-wedgwood/",
          "https://www.caterhire.ie/products/cutlery/fine-dining/arthur-price-silver/",
        ],
        blogs: [""],
      },
      {
        sku: "180",
        name: "John Rocha White Wine Glass 35cl (Case Size 1)",
        description:
          "Our exclusive John Rocha Waterford Crystal Glasses for hire are perfect for intimate gatherings or special occasions. This piece from the Flow Collection captures John Rocha’s renowned design ethos—simple elegance with modern lines, accented by a striking geometric motif that adds a contemporary edge to classic crystal. Made from luxurious Wedgwood crystal, it’s the ideal choice for those who appreciate refined design.Key FeaturesFrom the stylish John Rocha Flow series.Clean lines meet geometric detailing for a modern look.Crafted from fine Wedgwood crystal.Also available in wine, flute and water glass formats.Includes professional glassware cleaning. Case Size: 1 Per Case Capacity35.4cl /12ozCaterhire Top TipsPair these glasses with Jasper Conran Chinoiserie china and Arthur Price silver cutlery.",
        links: [
          "https://www.caterhire.ie/products/crockery-hire/jasper-conran-wedgwood/",
          "https://www.caterhire.ie/products/cutlery/fine-dining/arthur-price-silver/",
        ],
        blogs: [""],
      },
      {
        sku: "1000112",
        name: "Liqueur Glass 3cl (Case Size 10)",
        description:
          "Our durable and stylish liqueur glass is the perfect choice for serving after dinner drinks. Whether it’s for a formal dinner party or a sophisticated event, these compact glasses are ideal for liqueurs, digestifs or shots. Supplied in packs of 10.We also offer brandy, sherry and port glasses to complete your glassware collection.Key FeaturesDesigned for style and everyday practicality.Ideal size for serving liqueurs and after dinner drinks.Case Size: Supplied in sets of 10 glasses.Glass washing included in hire cost. Matching brandy, sherry and port glasses available for hire.Capacity: 3cl / 1oz CaterHire Top Tip: Check out our blog: Bar and Beverage Guide.",
        links: [""],
        blogs: ["https://www.caterhire.ie/blog/bar-and-beverage-guide/"],
      },
      {
        sku: "1000137",
        name: "Lyric Wine Glass 24cl (Case Size 36)",
        description:
          "Our Lyric Wine Glass is a practical, short-stemmed option ideal for informal receptions, casual events or large scale functions where durability and value are key. Its versatile shape makes it suitable for serving both red and white wine, while its sturdy build ensures reliability in busy event settings. Supplied in packs of 36.Key FeaturesShort-stemmed and sturdy.Suitable for serving both red and white wine. Offers great value without compromising functionality.Case Size: Packed in crates of 36 for safe and easy transport.Glass washing included in the hire price.Matching Lyric champagne flute available for a cohesive setup.DimensionsCapacity: 23.7cl / 8oz CaterHire Top Tip: Check out Our blog: Bar & Beverage Guide.",
        links: [""],
        blogs: ["https://www.caterhire.ie/blog/bar-and-beverage-guide/"],
      },
      {
        sku: "VV10",
        name: "Margarita Cocktail Glass 27cl (Case Size 16)",
        description:
          "Make a statement at your next event with our handcrafted Margarita Glass, designed in an elegant sombrero shape with a subtle rustic charm. Its 27cl capacity and wide rim make it ideal for serving classic margaritas, cocktails or desserts like ice cream sundaes.Key FeaturesClassic stepped silhouette with a wide rim for salt or sugar garnishes.Perfect for margaritas, cocktails or dessert presentations.Washing of glasses included in rental price.Cocktail shakers and accessories also available for hire. Case Size: 16 Per CaseCapacity: 26.7cl/9ozCaterhire Top TipsWe offer everything you need from cocktail shakers to crushed ice. Check out our blog: Bar & Beverage Guide.",
        links: [
          "https://www.caterhire.ie/cocktail-shaker/",
          "https://www.caterhire.ie/crushed-ice-bag-20lb-9kg/",
        ],
        blogs: ["https://www.caterhire.ie/blog/bar-and-beverage-guide/"],
      },
      {
        sku: "1000146",
        name: "Martini Glass 21cl (Case Size 16)",
        description:
          "Our Classic Martini Glass for hire is ideal serving martinis and stylish cocktails. Designed with a V-shaped bowl and rolled edges to prevent chipping, this glass offers a refined look while being practical for high volume service. It allows for standard ",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000173",
        name: "Monaco Wine Glass 24cl (Case Size 36)",
        description:
          "The Monaco Wine Glass for hire is a top choice for large banquets, weddings, and corporate events. Designed for high-volume hospitality use, it is manufactured by one of Europe’s leading glassmakers, ensuring quality and reliability. This glass delivers professional performance without compromising style.Key FeaturesPerfect for high-traffic venues and events.One-piece stem adds strength and reduces breakage.Case Size: Packed in crates of 36 for safe, easy transport.Glass washing included in the hire price.Capacity:23.7cl / 8oz Caterhire Top TipsCheck out our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000103",
        name: "Paris Wine Goblet 18cl (Case Size 36)",
        description:
          "This classic style wine glass for hire is a popular choice for those looking to hire affordable, practical glassware for catering and community events. With a small, rounded bowl, it’s ideal for modest servings of red or white wine, and also perfect for mulled wine during seasonal functions. Key FeaturesIdeal wine glass for casual or large scale events.Round bowl enhances aroma and tasting experience.Great for serving mulled wine in winter months.Case Size: Supplied in crates of 36 for easy transportCapacity: 17.7cl/6oz Caterhire Top TipsCheck out our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000104",
        name: "Paris Wine Goblet 24cl (Case Size 25)",
        description:
          "A popular choice for catering and community events, this classic-style wine glass is the ideal option for serving red wine or mulled wine. Its rounded bowl helps to enhance the wine's aroma.Key FeaturesPerfect for casual and large volume events.Rounded bowl enhances wine aromas and improves tasting experience.Ideal for serving red wine or seasonal mulled wine.Case Size: Supplied in crates of 25 for transport and storage.Capacity23.7cl/8oz Caterhire Top Tip:Check out our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000476",
        name: "Pichet Water Jug 100cl (Case Size 1)",
        description:
          "The Pichet Water Jug offers a stylish and practical solution for serving water, juice or other refreshments at any occasion. It's ideal for everything from elegant dinners to corporate events and casual gatherings. Key FeaturesComplements any table setting.Ideal for serving water, juice, or cold drinks.Suitable for formal and informal occasions. Case Size: 1 Per Case Capacity: 100cl/33.8oz Caterhire Top Tip: Check out our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000101",
        name: "Pint Glass 59cl (Case Size 25)",
        description:
          "The Tulip Beer Glass is a trusted classic in the hospitality industry and a popular choice for parties, festivals and casual events. Designed to enhance the drinking experience, its tulip shape helps retain foam and release aroma, making it ideal for serving beer, lager, cider and ale. Key FeaturesPerfect for beers, ciders, lagers and ales.Case Size: Packed in cases of 25.Glass washing included in rental price.Capacity59cl / 20ozCaterhire Top TipDon’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000116",
        name: "Plain Water Jug 100cl (Case Size 1)",
        description:
          "Our Plain Water Jug for hire is perfect for serving water or juice at a wide range of events, from parties and weddings to meetings and conferences. Key FeaturesIdeal for a variety of cold beverages.Case Size: 1 Per Case.Glassware washing included. Capacity: 100cl/33.8ozCaterhire Top Tip: Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000111",
        name: "Port Glass 6cl (Case Size 10)",
        description:
          "Our elegant and stylish stemmed port glass for hire is expertly designed to enhance flavour and aroma. Its wide bowl and tapered rim concentrate the bouquet for a more refined tasting experience, making it a great choice for port, sherry and other after dinner drinks.Key FeaturesWide bowl with tapered mouth for enhanced aroma and taste.Ideal for serving port, sherry and other dessert wines.Washing of glassware included in hire price. Case Size: 10 Per Case Capacity5.9cl / 2ozCaterhire Top TipComplete your drinkware collection with our range of speciality glasses. Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [
          "https://www.caterhire.ie/products/glassware/speciality-glasses/",
        ],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000177",
        name: "Red Salto Glass 33cl (Case Size 16)",
        description:
          "Our versatile Salto glass is great for adding a touch of colour to your dining table or event. This glass is ideal for water, cocktails, brandy and even for serving desserts. Key Features Red curved tumbler Ideal for drinks or desserts. Washing of glass included in rental price. Case Size: 16 per case. Colour: Red Capacity: 32.5cl / 11oz Caterhire Top Tip Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "SENCH",
        name: "Sensa Champagne Glass 39cl (Case Size 36)",
        description:
          "This elegant and modern Champagne glass fore hire is made of Tritan crystal. It has an elegant fine mout rim with unique brilliance. It has a break resistance stem and a fine and durable base plate. Key Features: Made from Tritan crystal for clarity and strengthElegant fine mouth rimUnique brilliance and shineBreak-resistant stemDurable base plate Washing up inclued in hire price Case Size: 36 Per Case Capacity: 38.7cl / 13.1oz CaterHire Top Tip: Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "SENRED",
        name: "Sensa Red Wine Glass 54cl (Case Size 25)",
        description:
          "This elegant and modern Red Wine glass for hire is made of Tritan crystal. It has an elegant fine mout rim with unique brilliance. It has a break resistance stem and a fine and durable base plate. Key Features: Made from Tritan crystal for clarity and strengthUnique brilliance and shineBreak-resistant stemDurable base plate Washing up inclued in hire price Case Size: 25 Per Case Capacity: 53.5cl / 18.1oz CaterHire Top Tip: Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "SENWAT",
        name: "Sensa Water Glass 50cl (Case Size 25)",
        description:
          "Crafted from premium Tritan crystal, this water glass for hire combines timeless elegance with everyday durability. Its sleek design and brilliant clarity make it perfect for both casual and formal settings.Key Features:Made from high-quality Tritan crystalUnique brilliance and clarity Washing up inclued in hire price Case Size: 25 per caseCapacity:50cl / 16.9oz CaterHire Top Tip: Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "SENWH",
        name: "Sensa White Wine Glass 36cl (Case Size 36)",
        description:
          "Crafted from premium Tritan crystal, this white wine glass blends sophistication with durability. Designed with a fine mouth rim and exceptional brilliance, it elevates the wine-drinking experience. The break-resistant stem and durable base plate add strength.Key Features:Made from high-quality Tritan crystalElegant fine mouth rim Washing of glassware included in hire price Exceptional brilliance and clarityBreak-resistant stemSturdy and durable base plateCase Size: 25 per caseCapacity:36.3cl / 12.3ozCaterHire Top Tip: Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000110",
        name: "Sherry Glass 6cl (Case Size 10)",
        description:
          "Our elegant and stylish sherry glass, is specially designed so you can fully enjoy the taste of the wine. This Elgin styled glass features a tulip style shape and is perfect for sherry or liqueurs. Key Features Used for sherry or liqueurs Washing of glass included in rental price Range of liqueur, brandy and whiskey glasses available Case Size: 10 per case Capacity: 5.9cl / 2oz Caterhire Top Tip Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000139",
        name: "Shot Glass 3cl (Case Size 10)",
        description:
          "Our shot glass for hire is ideal for serving spirits and mini desserts. Key Features Durable, fluted shot glasses Serves single measure (3cl) Washing of glasses included in hire price Case Size: 10 per case Capacity: 3cl/1oz Caterhire Top Tip Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000159",
        name: "Shot Glass Helix 6cl (Case Size 10)",
        description:
          "We hire a range of shot and shooter glasses for serving spirits and for serving mini desserts. With a variety of shapes and sizes you'll find the perfect style for your event or drink of choice. Key Features Etched design shot glasses Double shot glass measure (6cl) Reinforced glass to reduce breakage Case Size: 10 per case Capacity: 5.9cl/2oz Caterhire Top Tip Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000158",
        name: "Shot Glass Hot Shot 6cl (Case Size 10)",
        description:
          "Add a touch of elegance to your event with our Hot Shot Glass. Its tapered design not only enhances drink presentation but also ensures easy handling. Ideal for serving spirits, liqueur or even mini desserts.Key Features:Modern design with a tapered shapeDouble shot glass measure – 6cl capacityPerfect for spirits, shots, or layered dessertsWashing of glassware included in hire price Case Size: 10 per caseCapacity: 5.9cl / 2oz (Double Shot)Caterhire Top Tip:Use the Hot Shot Glass to serve elegant amuse-bouches or layered mini desserts for a creative twist. Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000160",
        name: "Shot Glass Islande (Slim) 6cl (Case Size 10)",
        description:
          "Perfect your drink presentation with our Islande Shot Glass for hire. It's perfect for serving spirits, liqueurs or creative mini desserts.Key Features:Slim and tall contemporary designDouble shot glass measure – 6cl capacityIdeal for spirits, shots or mini dessert servingsCase size: 10 glasses per caseWashing of glassware included in hire priceCapacity: 5.9cl / 2oz Caterhire Top TipDon’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "SR001",
        name: "Silver Rim Champagne Glass 18cl (Case Size 36)",
        description:
          "Add timeless elegance to your table with our Silver Rim Champagne Glass for hire, a beautifully crafted glass perfect for weddings, galas and fine dining. Each glass features a delicate silver rim, slender stem and flared bowl. Available in red and white wine, champagne, and water glasses to suit all your dining needs.Key Features:Exquisite design with a delicate silver rimElegant shape with a slender stem and flared bowlIncludes red wine, white wine, champagne, and water glassesCase Size: 36 glasses per case Washing of glassware included in hire price Capacity: 17.7cl / 6ozCaterhire Top Tip:Complete the look by styling these glasses with our Arthur Price silver cutlery and Wedgwood white crockery for a truly striking and sophisticated table setting. Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [
          "https://www.caterhire.ie/products/cutlery/fine-dining/arthur-price-silver/",
          "https://www.caterhire.ie/wedgwood-fine-white-bone-china/",
        ],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "SR003",
        name: "Silver Rim Red Wine Glass 30cl (Case Size 16)",
        description:
          "Our Silver Rim Red Wine Glass for Hire is the perfect blend of elegance and style, ideal for weddings, formal dinners and luxury events. This beautiful collection includes also includes white wine, champagne and water glasses.Key Features:Featuring an elegant silver rimSlender stem and flared bowlAvailable in wine, champagne, and water glass stylesCase Size: 16 glasses per caseWashing of glassware included in rental priceCapacity: 29.6cl / 10ozCaterhire Top Tip:Pair these glasses with our Arthur Price silver cutlery and Wedgwood white crockery. Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [
          "https://www.caterhire.ie/products/cutlery/fine-dining/arthur-price-silver/",
          "https://www.caterhire.ie/wedgwood-fine-white-bone-china/",
        ],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "SR002",
        name: "Silver Rim Water Glass 33cl (Case Size 16)",
        description:
          "Our Silver Rim Water Glass for hire is part of our Silver Rim glassware collection. This colletion includes red and white wine, champagne and water glasses. Each glass features a silver rim, slender stem and flared bowl. Key Features:Featuring an elegant silver rimSlender stem and flared bowlCase Size: 16 glasses per pack Washing of glassware included in rental priceCapacity: 32.6cl / 11ozCaterhire Top Tip:Pair these glasses with our Arthur Price silver cutlery and Wedgwood white crockery. Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [
          "https://www.caterhire.ie/products/cutlery/fine-dining/arthur-price-silver/",
          "https://www.caterhire.ie/wedgwood-fine-white-bone-china/",
        ],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "SR004",
        name: "Silver Rim White Wine Glass 21cl (Case Size 16)",
        description:
          "Our Silver Rim White Wine Glass features a slender stem, flared bowl and a delicate silver rim. These glasses make a striking statement at weddings, banquets or formal events.Key Features:Featuring an elegant silver rimSlender stem and flared bowlCase Size: 16 glasses per case Washing of glassware included in hire price Capacity: 20.7cl / 7ozCaterhire Top Tip:Pair these glasses with our Arthur Price silver cutlery and Wedgwood white crockery. Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [
          "https://www.caterhire.ie/products/cutlery/fine-dining/arthur-price-silver/",
          "https://www.caterhire.ie/wedgwood-fine-white-bone-china/",
        ],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000175",
        name: "Slim Jim 30.3cl (Case Size 36)",
        description:
          "Our Slim Jim Glass range is a customer favourite and a staple for all types of events. With its straight, slender design, this versatile tumbler adds a modern touch. Ideal for serving everything from water and soft drinks to beers, cocktails and mixers.Key Features:Perfect for all event typesStraight, slim design Suitable for water, beer, soft drinks, cocktails & mixersEquivalent to half-pint sizeCase size: 36 glasses per case Washing of glassware included in hire price Capacity: 30.3cl / 10.25ozCaterhire Top Tip:Mix and match Slim Jim glasses in various sizes.Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000107",
        name: "Slim Jim 30cl (Case Size 36)",
        description:
          "The Slim Jim Glass for hire is one of our most popular and versatile glassware options. It's ideal for any event. Featuring a slender design, it's perfect for a wide range of drinks, from soft drinks and water to beers, cocktails and mixers.Key Features:Perfect for all event typesStraight and slim shape Ideal for water, beer, soft drinks, cocktails & mixersWashing of glassware included in hire price Case size: 36 glasses per caseCapacity: 30cl / 10ozCaterhire Top Tip:Mix and match Slim Jim glasses in various sizes.Don’t miss our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000138",
        name: "Slim Jim 35cl (Case Size 36)",
        description:
          "This is our most popular glassware for hire for a reason! The Slim Jim range is perfect for any event — from chic weddings to corporate soirées. With a tall, slender shape, these 35cl tumblers are ideal for water, beer, soft drinks, cocktails and mixers.Key Features:Case Size: 36 glasses per caseJust over half a pint (35cl/12oz)Perfect for front of house presentation Washing of glassware included in hire price Capacity: 35cl/12ozCaterHire Top Tip: Check out our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000176",
        name: "Slim Jim 21cl (Case Size 36)",
        description:
          "A staple for any event, our most popular Slim Jim range includes this smaller 21cl option for hire, perfect for serving juices or water with elegance. With its straight, slender design, it's a stylish fit for weddings, corporate events and everything in between.Key Features:Case Size: 36 glasses per caseIdeal for water and juices Glassware washing included in hire price Capacity: 21.4cl / 7.25oz CaterHire Top Tip: Check out our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000108",
        name: "Slim Jim 24cl (Case Size 36)",
        description:
          "Part of our most popular glassware range, the Slim Jim 24cl is a must have for your beverage service. With its tall silhouette, this tumbler is perfect for water, juice and light refreshments.Key Features:Case Size: 36 glasses per caseGreat for water and juicesWashing included in hire price Available in multiple sizesCapacity: 23.7cl/8ozCaterHire Top Tip: Check out our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000227",
        name: "Sling Beer Glass 41cl (Case Size 36)",
        description:
          "Our Sling Glass is a tall and sturdy favourite, ideal for serving wheat beers or long, refreshing cocktails. Whether you're planning a wedding, corporate event or party, this glass brings both style and substance to your drinks service.Key Features:Case Size: 36 glasses per caseTall and robust designPerfect for wheat beers & long cocktailsWashing included in hire priceCapacity:41.40cl / 14ozCaterHire Top Tip: This is an ideal glass option for cocktails like Singapore Slings, Mojitos or Tom Collins!",
        links: [""],
        blogs: [""],
      },
      {
        sku: "1000114",
        name: "Sundae Dish Glass 12cl (Case Size 16)",
        description:
          "A great choice for desserts, this glass sundae dish for hire is perfect for sundaes and other sweet treats. Its classic design adds a touch of sophistication.Key Features:Ideal for serving desserts and sundaesTimeless designPerfect for both casual and formal occasionsCase Size: 16 per caseWashing up included in hire price Capacity:11.83cl / 4oz CaterHire Top Tip: Pair with our Sundae/Latte Spoon for the perfect match!",
        links: ["https://www.caterhire.ie/sundae-latte-spoon/"],
        blogs: [""],
      },
      {
        sku: "1000226",
        name: "Tankard Glass with Handle 60cl (Case Size 16)",
        description:
          "Our traditional pint glass is a real classic and is perfect for serving lagers, beers & ales. Key Features Case Size: 16 per case Classic tankard glass Handle for ease of use Washing of glass included in hire price Capacity: 59cl / 20oz Caterhire Top Tip: How many glasses do you need for your event? We generally recommend the following rule of thumb: 1.5 glasses per person for the first hour and 1 glass per hour for every hour after.",
        links: [""],
        blogs: [""],
      },
      {
        sku: "1000304",
        name: "Timeless Champagne Flute 16cl (Case size 36)",
        description:
          "Introducing our timeless vintage champagne Flute cut glass, designed to serve Italian style and craftsmanship at any dining or cocktail party. Adorned with beautiful cut glass decoration, this glass brings elegance and sophistication to any setting. Key Features: Case Size: 36 flutes per case Italian designed by world-renowned RCR Cristalleria Made from Eco-Crystal glass Super transparent crystal glass Pure raw materials give the glasses a unique lightness 100% recyclable Washing of glasses included in the hire price Capacity: 16cl / 5.6oz Caterhire Top Tip: How many glasses do you need for your event? We generally recommend the following rule of thumb: 1.5 glasses per person for the first hour and 1 glass per hour for every hour after.",
        links: [""],
        blogs: [""],
      },
      {
        sku: "1000302",
        name: "Timeless Cut Glass Whiskey Tumbler 31cl (Case size 25)",
        description:
          "Our Timeless Vintage Whiskey Tumbler is designed to echo the elegance of old-world barware. This glass features distinctive cut patterns that shimmer in the light. Key Features:Authentic vintage-style designCut glass detail Ideal or serving neat whiskey or whiskey cocktails Case Size: 36 per case Capacity: 31cl / 10.5ozCaterHire Top Tip: Mix and match styles for a layered look!",
        links: [""],
        blogs: [""],
      },
      {
        sku: "1000303",
        name: "Timeless Red Wine Glass 28cl (Case size 25)",
        description:
          "Introducing our timeless vintage red wine cut glass, designed to serve Italian style and craftsmanship at any dining or cocktail party. Adorned with beautiful cut glass decoration, this glass brings elegance and sophistication to any setting. Key Features: Case Size: 25 glasses per case Italian designed by world-renowned RCR Cristalleria Made from Eco-Crystal glass Super transparent crystal glass Pure raw materials give the glasses a unique lightness 100% recyclable Washing of glasses included in the hire price Capacity 28cl / 9.5oz Caterhire Top Tips How many glasses do you need for your event? We generally recommend the following rule of thumb: 1.5 glasses per person for the first hour and 1 glass per hour for every hour after.",
        links: [""],
        blogs: [""],
      },
      {
        sku: "1000300",
        name: "Timeless Vintage Cocktail Glass 21cl (Case size 16)",
        description:
          "Bring vintage glamour to the table with our Timeless Vintage Cocktail Glass. Inspired by the designs of classic glassware, this piece features detailed cut glass that catches the light beautifully. Key Features:Vintage inspired designCut glass detailing Ideal for cocktails and aperitifs Case Size: 16 per case Washing of glassware included in hire price Capacity: 20.7cl / 7ozCaterHire Top Tip: These glasses are perfect for a cocktail service! Check out our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000301",
        name: "Timeless Vintage Cut Glass Hi Ball 40cl (Case size 36)",
        description:
          "Our Timeless Vintage Cut Glass Tumbler will plunge you into a world of sophisticated, vintage, high-end barware. The structures of the glasses are an exact reproduction of the distinctive marks on the dazzling collections that adorned the tables of yesteryear. The cut glass creates a shimmering effect. Key Features: Case Size: 36 per case Vintage inspired design Cut glass detailing Ideal for highball cocktails and mixers Capacity: 39.9cl / 13.5oz CaterHire Top Tip: Check out our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000305",
        name: "Timeless White Wine Glass 21cl (Case size 25)",
        description:
          "Introducing our timeless vintage white wine cut glass, designed to serve Italian style and craftsmanship at any dining or cocktail party. Adorned with beautiful cut glass decoration, this glass brings elegance and sophistication to any setting. Key Features: Case Size: 25 glasses per case Italian designed by world-renowned RCR Cristalleria Made from Eco-Crystal glass Super transparent crystal glass Pure raw materials give the glasses a unique lightness 100% recyclable Washing of glasses included in the hire price Capacity: 20.7cl / 7.3oz Caterhire Top Tip: How many glasses do you need for your event? We generally recommend the following rule of thumb: 1.5 glasses per person for the first hour and 1 glass per hour for every hour after.",
        links: [""],
        blogs: [""],
      },
      {
        sku: "1000106",
        name: "Tulip Champagne Flute 17cl (Case Size 36)",
        description:
          "Our Tulip champagne flute is very popular to hire for banqueting events and drinks receptions. It has a practical and stylish design with a relatively short stem making it very sturdy and perfect for fast service at busy events. Key Features: Simple and stylish flute Sturdy and stable Washing included in hire price Case Size: 36 classes per case Packed in crates for transport Capacity: 17.7cl / 6oz Caterhire Top Tip: The best way to chill your champagne or sparkling wine is to fill an ice bucket and allow your bottle to cool for 30 minutes.  ",
        links: [
          "https://www.caterhire.ie/ice-bucket-wine-bucket/?srsltid=AfmBOora2I0Nf7lP3cU_0VfyAXWbR4HcQUa6uulUTtSORe1HH7JLeVRU",
        ],
        blogs: [""],
      },
      {
        sku: "VG01",
        name: "Victoria Gold Rim Red Wine Glass 30cl (Case Size 16)",
        description:
          "Our exquisite Gold Rim glassware is very popular to hire for weddings and special events. These European designed crystal red wine glasses feature a slender stem, gently flared bowl with a finely etched gold pattern around the rim. Key Features European crafted gold rim glasses Case Size: 16 glasses per pack Washing of glasses included in hire price Dimensions: 29.6cl / 10oz Caterhire Top Tip: Create a stunning table setting by pairing our gold glassware with our Gold Rim charger plates and Victoria Gold cutlery.",
        links: [
          "https://www.caterhire.ie/gold-rim-charger-plate-12in-to-hire/",
          "https://www.caterhire.ie/products/cutlery/victoria-gold/",
        ],
        blogs: [""],
      },
      {
        sku: "VG04",
        name: "Victoria Gold Rim Water Glass 33cl (Case Size 16)",
        description:
          "Our exquisite Gold Rim glassware is very popular to hire for weddings and special events. These European designed crystal water glasses feature a gently flared bowl with a finely etched gold pattern around the rim. Key Features European crafted gold rim glasses Case Size: 16 glasses per case Pair with our gold tableware collection Washing of glasses included in hire price Capacity: 32.5cl / 11oz Caterhire Top Tip: Create a stunning table setting by pairing our gold glassware with our Gold Rim charger plates and Gold Cutlery.",
        links: [
          "https://www.caterhire.ie/gold-rim-charger-plate-12in-to-hire/",
          "https://www.caterhire.ie/products/cutlery/victoria-gold/",
        ],
        blogs: [""],
      },
      {
        sku: "VG02",
        name: "Victoria Gold Rim White Wine Glass 21cl (Case Size 16)",
        description:
          "Our exquisite Gold Rim glassware is very popular to hire for weddings and special events. These European designed crystal white wine glasses feature a slender stem, gently flared bowl with a finely etched gold pattern around the rim. Key Features European crafted gold rim glasses Case Size: 16 glasses per case Pair with our gold tableware collection Washing of glasses included in hire price Capacity: 20.7cl / 7oz Caterhire Top Tips: Create a stunning table setting by pairing our gold glassware with our Gold Rim charger plates & Gold Cutlery.",
        links: [
          "https://www.caterhire.ie/gold-rim-charger-plate-12in-to-hire/",
          "https://www.caterhire.ie/products/cutlery/victoria-gold/",
        ],
        blogs: [""],
      },
      {
        sku: "1000141",
        name: "V-Shaped Wine Glass 33cl (Case Size 25)",
        description:
          "A stylish addition to any party or event, this V-shaped wine glass comes from our standard range of elegant glassware. Its sleek silhouette adds a modern touch to wine service, making it ideal for both casual and upscale gatherings.Key Features:Modern V-shaped designPerfect for parties, events, and everyday usePart of our standard glassware rangeWashing of glassware included in hire price Case Size: 25 glasses per caseCapacity:32.5cl / 11oz CaterHire Top Tip:Check out our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
        ],
      },
      {
        sku: "1000800",
        name: "Whiskey Tumbler 18cl (Case Size 36)",
        description:
          "Fine whiskey deserves the right glass from which to enjoy its aroma and flavour. Our classic Whiskey tumbler for hire is the perfect glass to enjoy your whiskey from. Key Features Case Size: 36 glasses per case Clear Whiskey tumbler Contemporary design Washing of glasses included in hire price Dimensions: 17.8cl/6oz Caterhire Top Tip: We hire a range of speciality glasses for whiskey, brandy and port. We also hire large bags of ice for the perfect ice cold drink.",
        links: [
          "https://www.caterhire.ie/products/glassware/speciality-glasses/",
          "https://www.caterhire.ie/ice-cube-bag-20lb-9kg/",
        ],
        blogs: [""],
      },
      {
        sku: "1000119",
        name: "Whiskey Tumbler 24cl (Case Size 25)",
        description:
          "Fine whiskey deserves the right glass from which to enjoy its aroma and flavour. Our classic Whiskey tumbler for hire is the perfect glass to enjoy your whiskey from. Key Features Case Size: 25 glasses per case Clear Whiskey tumbler Contemporary design Washing of glasses included in hire price Dimensions: 23.7cl/8oz Caterhire Top Tip: We hire a range of speciality glasses for whiskey, brandy and port. We also hire large bags of ice for the perfect ice cold drink.",
        links: [""],
        blogs: [""],
      },
      {
        sku: "1000180",
        name: "Wide Rim Tumbler 15cl (Case Size 36)",
        description:
          "Our wide rim tumblers have a classic straight-sided design, perfect for events, venues and bars. They are great for serving everything from soft drinks, spirits and even desserts! Key Features Case Size: 36 glasses per case Clear Whiskey tumbler Contemporary design Washing of glasses included in hire price Capacity: 5oz/15cl Caterhire Top Tip: We hire a range of water tumblers to choose from including our Slim Jims, Salto glasses and Coloured water glasses. We also hire large bags of ice for the perfect ice cold drink.",
        links: [
          "https://www.caterhire.ie/products/glassware-hire/beer-glasses/",
          "https://www.caterhire.ie/clear-salto-glass-12oz/",
          "https://www.caterhire.ie/products/glassware/coloured-glassware/",
          "https://www.caterhire.ie/ice-cube-bag-20lb-9kg/",
        ],
        blogs: [""],
      },
      {
        sku: "1000144",
        name: "Wine Tasting Glass 21cl (Case Size 36)",
        description:
          "This Wine Tasting Glass for hire is the ISO Standard Tasting glass. Featuring a fill line, it is used at wine judging events around the world. It can also be hired for serving of aperitifs or liquors as required. Key Features: ISO standard wine tasting glass Tapered shape to enhance wine aromas Case Size: 36 Per Case Washing of glassware included in the hire price Capacity: 20.7cl / 7oz CaterHire Top Tip:Check out our blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        links: [""],
        blogs: [
          "https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/?srsltid=AfmBOop8J8KVKDYGHs15o0FH1pi04wwBEjYsCT-MrwC7u722vpKWZsrp",
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
            path.resolve(__dirname, `glassware-errors.txt`),
            `no products (${products.length}) found on hireall for sku ${row.sku}`,
            { encoding: "utf-8" }
          );
          continue;
        }
        product = products[0];
      }
      console.log(product.name);
      console.log(row.name);
      console.log(row.sku);

      const linksToAdd = row.links;
      const blogLinks = row.blogs;

      let additionalContext = "";
      if (linksToAdd.length) {
        additionalContext += ` Product/Category Links to include: ${JSON.stringify(
          linksToAdd
        )}.`;
      }
      if (blogLinks.length) {
        additionalContext += ` Blog Posts to include: ${JSON.stringify(
          blogLinks
        )}.`;
      }
      const description = await generateProductDescription(
        row.description,
        additionalContext,
        caterhirePrompt
      );

      // update
      await updateProduct(product!.id, { name: row.name, description });

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
