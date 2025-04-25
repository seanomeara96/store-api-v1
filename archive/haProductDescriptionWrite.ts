import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { htmlToText } from "html-to-text";
import { marked } from "marked";
import { hireallPrompt } from "../chat/prompts";
import {
  CustomField,
  getCustomFields,
} from "../functions/custom-fields/getCustomFields";
import { updateProduct } from "../functions/products/updateProduct";
import { getProductBySku } from "../functions/products/getProductBySKU";
import { getAllProducts } from "../functions/products/getAllProducts";
import { hireallCustomFieldNames } from "../hireall/customFieldNames";
import { applyCustomField } from "../functions/custom-fields/applyCustomField";

function addUpdatedItem(id: number): number[] {
  const ids = getUpdatedItems();
  ids.push(id);
  fs.writeFileSync(
    path.resolve(__dirname, "ha-updated-products.json"),
    JSON.stringify(ids),
    { encoding: "utf-8" }
  );
  return ids;
}

function getUpdatedItems(): number[] {
  return JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "ha-updated-products.json"), {
      encoding: "utf-8",
    })
  );
}

const data = [
  {
    sku: "333A",
    name: "Folding Chair Burgundy",
    description:
      "<p>Our stackable burgundy folding chairs are a hit among event planners and party hosts. With a sleek grey frame, these chairs offer a chic and budget-friendly seating solution for any gathering, whether it's a bustling conference or an intimate garden party. We stock thousands, ensuring you always have enough for your guests, and they&rsquo;re suitable for both indoor and outdoor events. Reliable and easy to store, these chairs combine functionality and style effortlessly.</p> <h3>Key Features:</h3> <ul> <li>Lightweight and sturdy design</li> <li>Injected moulded polypropylene seat and back</li> <li>Folds flat for convenient storage and transport</li> <li>Strong, powder-coated grey frame</li> <li>Weight capacity of 115 kg</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 45 cm / 18''</li> <li>Width: 50 cm / 20''</li> <li>Height: 80 cm / 31''</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our folding chairs are an excellent choice for large gatherings such as concerts and conferences, thanks to our expansive stock and the ability to provide setup and breakdown services for large events. If you're collecting, note that a pallet can accommodate around 120 chairs. For more insights on organizing large events, check out our <a href=\"https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/?srsltid=AfmBOor0_74y2YvwdCzzazrLaBKdcVdpucwamZwj61SSOJYH0r3hVJZB\">blog</a>. Consider pairing these chairs with our range of<a href=\"https://www.caterhire.ie/products/table-hire/\"> tables</a> to complete your event setup.</p>",
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000999",
    name: "Baby High Chair",
    description:
      '<p>Hiring baby highchairs is a smart choice when hosting an event for young families. Our durable and secure highchairs ensure that your little guests have a safe and comfortable dining experience. With easy-to-clean surfaces and sturdy construction, these highchairs help maintain a mess-free environment for everyone. Whether it&#39;s a wedding, a temporary restaurant, or a party, our highchairs keep things hassle-free for parents and enjoyable for the kids.</p> <h3>Key Features:</h3> <ul> <li>Sturdy metal and plastic frame for long-lasting durability</li> <li>Safety harness for added security</li> <li>Easy to clean, ensuring hassle-free maintenance</li> <li>Perfect for children who can sit unaided, up to 3 years old or 15kg in weight</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 56 cm / 22&quot;</li> <li>Width: 62 cm / 24&quot;</li> <li>Height: 90 cm / 35&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Keep the young ones entertained and ensure a successful event with our range of kid-friendly games. From <a href="https://www.caterhire.ie/giant-kerplunk/">Giant Kerplunk</a> to a variety of other engaging activities, we have just what you need to delight children of all ages. For more ideas on creating an unforgettable kid-friendly gathering, check out our blog post, <a href="https://www.caterhire.ie/bloggame-on-top-garden-games-to-hire-for-events/">Game On! Top Garden Games to Hire for Events</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000536",
    name: "Folding Chair Blue For Hire",
    description:
      '<p>Looking for a versatile seating option for your next event? Our stackable blue folding chairs with a sleek grey frame are an excellent choice. With thousands in stock, these chairs complement a wide range of events, from graduation ceremonies to trade shows. Not only are they suitable for both indoor and outdoor use, but they also provide an affordable and practical seating solution.</p> <h3>Key Features:</h3> <ul> <li>Lightweight and sturdy design</li> <li>Injected molded polypropylene seat and back</li> <li>Folds flat for easy storage and transport</li> <li>Strong powder-coated grey frame</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 45 cm / 18&quot;</li> <li>Width: 50 cm / 20&quot;</li> <li>Height: 80 cm / 31&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our folding chairs are especially popular for large-scale events like concerts and conferences. We offer a convenient set-up and break-down service to help you manage seating arrangements effortlessly. If youâ€™re handling collection yourself, note that a pallet can accommodate around 120 folding chairs. For more detailed guidance, check out our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">blog article</a> on hiring event furniture.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "FB07",
    name: "Mighty B Beanbag - Red",
    description:
      '<p>Our vibrant Mighty B Beanbags are a favorite choice for any event, be it a lively party, a formal conference, or a relaxed day in the garden. These beanbags provide a cosy spot where kids can engage in playful games and adults can relax or socialize. Lightweight and crafted for both indoor and outdoor settings, they\'re the perfect blend of comfort and convenience, making them suitable for short- or long-term hire.</p> <h3>Key Features:</h3> <ul> <li>Lightweight &amp; portable</li> <li>Suitable for outdoor and indoor use</li> <li>Made of tough, waterproof fabric</li> <li>Easy to clean</li> <li>Colour: Red&nbsp;</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 80 cm / 31"</li> <li>Width: 99 cm / 39"</li> <li>Height: 94 cm / 37"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Thinking of creating a cool chill-out area or a fun zone? Our wide array of games is sure to keep everyone entertained. Consider pairing these beanbags with some of our popular game options like <a href="https://www.caterhire.ie/giant-connect-4/">Giant Connect 4</a>, <a href="https://www.caterhire.ie/giant-kerplunk/">Giant Kerplunk</a>, and <a href="https://www.caterhire.ie/fussball-football-table/">Fussball Table</a>. Don\'t forget to check our blog for more inspiration: <a href="https://www.caterhire.ie/bloggame-on-top-garden-games-to-hire-for-events/">Game On! Top Garden Games to Hire for Events</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "FB06",
    name: "Mighty B Beanbag Grey",
    description:
      '<p>Our outdoor Mighty B Beanbags are a hit for any event, conference, or party. Perfect for kids\' games and adults looking to relax and socialize, these beanbags are versatile for both short- and long-term hire. With a cheerful selection of colours to choose from, they\'ll add a splash of fun and comfort to your gathering.</p> <h3>Key Features:</h3> <ul> <li>Lightweight and portable</li> <li>Suitable for both outdoor and indoor use</li> <li>Made from tough, waterproof fabric</li> <li>Easy-to-clean material</li> <li>Colour: Grey</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 80 cm / 31"</li> <li>Width: 99 cm / 39"</li> <li>Height: 94 cm / 37"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Looking to design an engaging chill-out or entertainment zone for your guests? Consider pairing our beanbags with exciting games like <a href="https://www.caterhire.ie/giant-connect-4/">Giant Connect 4</a>, <a href="https://www.caterhire.ie/giant-kerplunk/">Kerplunk</a>, and <a href="https://www.caterhire.ie/fussball-football-table/">Fussball</a>. For more inspiration, visit our blog on <a href="https://www.caterhire.ie/bloggame-on-top-garden-games-to-hire-for-events/">Top Garden Games to Hire for Events</a>. Let the fun begin!</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "PADBLUE01",
    name: "Padded Banquet Chair Blue",
    description:
      '<p>Our stackable banquet chairs in royal blue offer a touch of elegance perfect for any event, from conferences and banquets to weddings. The luxurious royal blue velvet paired with a stylish gold frame provides a sophisticated and regal look, effortlessly elevating the ambiance of any venue. These chairs are designed with both comfort and durability in mind, making them an ideal choice for any occasion, whether you require short-term or long-term hire.</p> <h3>Key Features:</h3> <ul> <li>Lightweight aluminium frame with elegant gold finish.</li> <li>Double padded seat pad and backrest for enhanced comfort.</li> <li>Stackable up to 10 chairs high for convenient storage.</li> <li>Double support bracing for added strength and stability.</li> <li>Fireproof velvet fabric ensures safety and peace of mind.</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 45cm / 18&quot;</li> <li>Width: 50cm / 20&quot;</li> <li>Height: 92cm / 36&quot;</li> <li>Seat Height: 47cm / 19&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our royal blue padded stacking chairs pair beautifully with our <a href="https://www.caterhire.ie/table-round-5ft-for-hire/">5ft round tables</a> and <a href="https://www.caterhire.ie/table-round-6ft-for-hire/">6ft round tables</a>. When used together, they can comfortably accommodate 8-10 people or 10-12 people, respectively, making them a perfect match for your event&#39;s seating needs. Looking for inspiration on hiring event furniture? Check out our blog post for some great tips and advice: <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "IL08",
    name: "Star Bench Illuminated",
    description:
      '<p>Bring a captivating ambiance to your event with our glowing Star Bench, part of our exclusive illuminated furniture collection. Made from sturdy polyethylene, this striking bench radiates a mesmerizing glow in multiple colours to create the ideal setting. Perfect for both indoor and outdoor events, the Star Bench offers a versatile seating solution that adapts beautifully to any occasion. Available for both short-term and long-term hire, it ensures your guests enjoy a truly memorable experience.</p> <h3>Key Features:</h3> <ul> <li>Suitable for indoor and outdoor use.</li> <li>LED multi-color lighting with remote control.</li> <li>Rechargeable battery with 6-8 hours of life.</li> <li>Seats up to 3 people.</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 100cm (39")</li> <li>Width: 120cm (47")</li> <li>Height: 43cm (17")</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Enhance your event\'s atmosphere by combining the Star Bench with our <a href="https://www.caterhire.ie/snake-bench-illuminated-for-hire/">Snake Bench</a> and <a href="https://www.caterhire.ie/cube-illuminated-with-silver-top-17in/">Cube</a> seating options. This creates a vibrant and adaptable seating arrangement that\'s perfect for any theme&mdash;from chic lounge areas to playful group settings. For more insights, don\'t miss our blog on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">all you need to know about hiring event furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000565",
    name: "Chiavari Chair Black",
    description:
      '<p>Our elegant black Chiavari chairs are a top choice for adding a touch of sophistication to your event. Perfect for corporate gatherings, gala dinners, and chic black-and-white themed parties, these chairs will elevate the ambiance. Whether you need them for a short-term event or a longer engagement, their versatility and style make them a crowd favorite.</p> <h3>Key Features:</h3> <ul> <li>European beech wood frame with black lacquer finish</li> <li>Sleek, bamboo-like design</li> <li>Lightweight yet sturdy and comfortable</li> <li>Stacks up to 8 for easy transport and storage</li> <li>Interchangeable seat pads in a variety of colours, including ivory, green, burgundy, cocoa brown and more!</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 37 cm / 15\'\'</li> <li>Width: 43 cm / 17\'\'</li> <li>Height: 92 cm / 36\'\'</li> <li>Seat Height: 45 cm / 18\'\'</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our Chiavari Black stacking chairs perfectly complement <a href="https://www.caterhire.ie/products/tables/banquet-dining-tables/">wooden banqueting tables</a>, creating a cohesive and stylish look for your event. Pair them with our <a href="https://www.caterhire.ie/black-and-white-dance-floor-4ft-x-2ft/">black &amp; white dancefloor</a> and <a href="https://www.caterhire.ie/products/table-linen-hire/white-tablecloths/">black and white linens</a> or explore our <a href="https://www.caterhire.ie/coloured-tablecloths/">coloured tablecloths</a> for added versatility. The compact design allows you to seat 8-10 guests around a 5ft round table and 10-12 guests around a 6ft round table. For more inspiration on seating arrangements, check out our blog on <a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">Wedding Seating: Which Is Best For Me?</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "BTWOOD",
    name: "Bentwood Rustic Oak Chair",
    description:
      "<p>Introducing our charming rustic oak Bentwood chair, the ideal seating solution for your special event or wedding. This modern take on the iconic Bentwood design, renowned for its presence in elegant Parisian spots over the last 200 years, adds a touch of timeless elegance to any occasion. The chair features a beautifully crafted rustic oak frame with a unique loop back design, and you can choose from a variety of seat pad colours to perfectly match your event theme. Whether you need seating for a short-term gathering or a longer engagement, this chair is your go-to for sophistication and style.</p> <h3>Key Features:</h3> <ul> <li>Elegant wooden loop frame with a rustic oak finish</li> <li>Lightweight yet strong and comfortable</li> <li>Conveniently stacks up to 9 or 10 chairs high for easy transport and storage</li> <li>Customisable seat pads available in several colours, including ivory, green, burgundy, cocoa brown and more!</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 42 cm / 17''</li> <li>Width: 52 cm / 20''</li> <li>Height: 90 cm / 35''</li> <li>Seat Height: 45 cm / 18''</li> <li>Weight: 3.5 kg</li> </ul> <h3>Caterhire Top Tips:</h3> <p>For those planning a rustic-themed wedding or event, our selection of rustic tables, benches, chairs, and barrels will help you achieve the perfect look. This Bentwood Chair&rsquo;s compact design allows fitting 8-10 people at a <a href=\"https://www.caterhire.ie/table-round-5ft-for-hire/\">5ft round table</a> and 10-12 people at a <a href=\"https://www.caterhire.ie/table-round-6ft-for-hire/\">6ft round table</a>. For more seating guidance, take a look at our article: <a href=\"https://www.caterhire.ie/blog/rustic-wedding-ideas-to-help-inspire-you/\">Rustic Wedding Ideas To Help Inspire You</a>.</p>",
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "AURORAWH",
    name: "Aurora Bar Stool White",
    description:
      '<p>Add a touch of elegance to your event with our chic white bar stools, ideal for corporate gatherings, parties, and product launches. With its white faux leather cushioned seat and back, the Aurora Stool seamlessly matches most event decorations and pairs beautifully with both high and low cocktail tables. Available for both short-term and long-term hire, this stylish stool is an essential piece for any modern event setup.</p> <h3>Key Features:</h3> <ul> <li>Polished chrome frame for a sleek and modern look</li> <li>Adjustable seat height mechanism for customizable comfort</li> <li>Padded seat and back for enhanced support</li> <li>Foot rail for additional comfort</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 51 cm / 20&quot;</li> <li>Width: 42 cm / 17&quot;</li> <li>Height: 82 cm / 32&quot;</li> <li>Seat Height: 77 cm / 30&quot;</li> <li>Seat Height (Lower): 63 cm / 25&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Transform your event space with our range of tables and covers that pair perfectly with these stools. Opt for our high or low pod tables, network high table, and spandex/linen table covers to create a stylish and functional environment. For more inspiration and tips, check out our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a> blog post.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "SL1008",
    name: "Wow bench - Saffron yellow",
    description:
      '<p>Looking to add a touch of modern flair to your event? Our Wow Bench is the perfect choice with its lively design that grabs attention! Constructed from sturdy polyethylene, it can be ingeniously flipped to spell &quot;MOM&quot; for a bit of creative fun. Whether you&#39;re hosting a conference, outdoor party, or any gathering, this bench is versatile enough to use indoors or out and is available for both short and long-term hire.</p> <h3>Key Features:</h3> <ul> <li>Unique &quot;WOW&quot; shaped design</li> <li>Seats up to 3 people</li> <li>Made from durable polyethylene</li> <li>Suitable for indoor and outdoor use</li> <li>Available in vibrant saffron yellow</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 147cm/58&quot;</li> <li>Width: 43cm/17&quot;</li> <li>Height: 43cm/17&quot;</li> <li>Weight: 20kg</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Brighten up your event with our range of funky outdoor furniture! The Wow Bench pairs brilliantly with our <a href="https://www.caterhire.ie/pop-bench-lime-green-for-hire/">Pop Bench in Lime Green</a> or check out the playful <a href="https://www.caterhire.ie/candy-lounge-armchair-soft-yellow-for-hire/">Candy Lounge Armchair in Soft Yellow</a>. For a unique touch, consider our <a href="https://www.caterhire.ie/coffee-table-illuminated/">Illuminated Coffee Table</a>. To dive deeper into expert tips on selecting event furniture, explore our blog, <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000546",
    name: "Chiavari Chair Limewash (deluxe)",
    description:
      "<p>The Chiavari chair is a beloved choice for weddings and banquets, held in high esteem at celebrity events and elite venues worldwide. Crafted in Europe by leading furniture experts, this chair embodies unparalleled quality and style. Its timeless French design and elegant lime wash finish make it the preferred seating for opulent weddings, sophisticated corporate gatherings, and intimate private parties. Available for both short and long-term hire, the Chiavari chair adds a touch of class to any occasion.</p> <h3>Key Features:</h3> <ul> <li>Beech wood frame with a lime wash finish and ivory pad</li> <li>Lightweight yet robust, offering exceptional comfort</li> <li>Stackable for easy transport and storage, up to 9/10 high</li> <li>Interchangeable seat pads available in many colours, including ivory, green, burgundy, cocoa brown and more!</li> <li>Made from sustainably managed forest wood</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 43 cm / 17''</li> <li>Width: 43 cm / 17''</li> <li>Height: 88 cm / 35''</li> <li>Seat Height: 45 cm / 18''</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our Chiavari chairs are perfect when paired with our wooden <a href=\"https://www.caterhire.ie/products/tables/banquet-dining-tables/\">banqueting tables</a> or <a href=\"https://www.caterhire.ie/rustic-oak-foldable-trestle-table/\">rustic oak foldable trestle tables</a>. Their compact design ensures you can comfortably seat 8-10 people at a 5ft round table and 10-12 at a 6ft round table. For more insights on optimizing your event setup, have a look at our <a href=\"https://www.caterhire.ie/blogyour-guide-to-table-linen-sizing-seating-capacity/\">guide on table linen sizing and seating capacity</a>.</p>",
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000937",
    name: "Zeus Bar Stool Black",
    description:
      '<p>Meet the Black Zeus Stool. With its plush black seat and sleek chrome frame, this stool is bound to impress your guests, whether it\'s a sophisticated exhibition or a lively party. Add a splash of colour with our spandex seat covers to perfectly match your theme and enjoy comfort with the built-in footrest.</p> <h3>Key Features:</h3> <ul> <li>Minimalist bar stool design with retro flair</li> <li>Comfortable padded black seat with a sleek chrome frame</li> <li>Built-in footrest for added comfort</li> <li>Customisable with interchangeable seat covers in various colours</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 37cm / 15"</li> <li>Seat Height: 82cm / 32"</li> <li>Overall Height: 75cm / 30"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Transform your event ambiance effortlessly with our interchangeable seat covers available in vibrant hues like silver, red, blue, and white. These covers are an excellent way to tailor the Black Zeus Stool to suit your unique colour scheme. Explore our <a href="https://www.caterhire.ie/products/table-linen-hire/spandex-pod-table-covers/">spandex seat covers</a> for additional options. For more inspiration and practical advice on organizing your event, check out our comprehensive guide: <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "FB08",
    name: "Mighty B Beanbag - Lime Green",
    description:
      '<p>Experience unmatched comfort and style with our Mighty B Beanbags, designed for ultimate relaxation at events, parties, and conferences. Perfect for both kids and adults, these beanbags offer a versatile seating option that adds a touch of fun to any occasion. With a variety of vibrant colours, including an eye-catching lime green, these beanbags are a favorite for both long and short-term hires.</p> <h3>Key Features:</h3> <ul> <li>Lightweight and portable</li> <li>Suitable for both outdoor and indoor use</li> <li>Made from tough, waterproof fabric</li> <li>Easy-to-clean material</li> <li>Colour: Lime Green</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 80 cm / 31"</li> <li>Width: 99 cm / 39"</li> <li>Height: 94 cm / 37"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Transform any space into the ultimate chill-out zone by pairing our Mighty B Beanbags with some engaging outdoor games. Consider adding excitement with <a href="https://www.caterhire.ie/giant-connect-4/">Giant Connect 4</a>, <a href="https://www.caterhire.ie/giant-kerplunk/">Giant Kerplunk</a>, or our <a href="https://www.caterhire.ie/fussball-football-table/">Fussball Table</a>. For more ideas, check out our blog on <a href="https://www.caterhire.ie/bloggame-on-top-garden-games-to-hire-for-events/">Top Garden Games to Hire for Events</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "F018",
    name: "Chloe White Chameleon Chair",
    description:
      '<p>Discover the Chloe White Chameleon Chair, where style meets sophistication. With its crisp white fabric and sleek curved back, this chair sets the tone for luxury and elegance at any event. Featured at renowned occasions like the Academy Awards Governor&#39;s Ball, it&#39;s the perfect choice for weddings, glamorous gala dinners, or any lavish affair. Not only versatile, these chairs can be personalized with a variety of covers, adding a touch of flair to your event. It&#39;s available for both short and long-term hire exclusively from Caterhire!</p> <h3>Key Features:</h3> <ul> <li>Elegant Chloe White Chameleon chair with topper on silver legs</li> <li>Customizable Lycra topper fits over chair back &amp; seat pad</li> <li>Eco-friendly design, crafted from recyclable steel</li> <li>Optional Rhinestone jewel band and full leg skirting</li> <li>Easy transport and storage with trolleys for up to 36 chairs</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 43 cm / 17&#39;&#39;</li> <li>Width: 43 cm / 17&#39;&#39;</li> <li>Height: 97 cm / 38&#39;&#39;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our Chloe White Chameleon chair pairs beautifully with our range of wooden banqueting tables, perfect for stylish settings. Whether itâ€™s a <a href="https://www.caterhire.ie/table-round-5ft-for-hire/">round</a> or <a href="https://www.caterhire.ie/products/tables/banquet-dining-tables/">rectangular</a> table, these chairs offer supreme comfort. Draping your table with white or silver linens can enhance its elegance. For seating arrangements, this chair accommodates 8 guests around a <a href="https://www.caterhire.ie/table-round-5ft-for-hire/">5ft round table</a> and 10 guests around a <a href="https://www.caterhire.ie/table-round-6ft-for-hire/">6ft round</a>. For more insights on seating arrangements, check out our <a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">blog post on wedding seating</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000691",
    name: "Zeus Bar Stool with Royal Blue Pad Cover",
    description:
      '<p>Our Zeus stools are the perfect blend of style and versatility, making them an excellent choice for any event, from exhibitions to parties and conferences. Featuring a sleek chrome frame paired with a comfortable royal blue seat pad, these stools offer both aesthetic appeal and functionality. You can effortlessly transform the look of your event by adding a pop of colour with our seat caps available in silver, blue, or red, ensuring a unique and vibrant atmosphere.</p> <h3>Key Features:</h3> <ul> <li>Classic-style bar stool with a royal blue seat pad and chrome frame</li> <li>Includes a footrest for added comfort</li> <li>Customizable with coloured seat caps (silver, blue, red) to refresh the look</li> <li>Ideal for events like exhibitions, parties, and conferences</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 37cm/15&rdquo;</li> <li>Height: 75cm/30&rdquo;</li> <li>Seat Height: 82cm/32&rdquo;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Transform the ambiance of your event effortlessly with our range of Zeus stool seat caps available in silver, red, or blue. These caps provide a fresh and vibrant appearance, suitable for both short-term and long-term hire. For more insights and tips on selecting the perfect furniture for your event, don\'t miss our blog post on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "PADRED01",
    name: "Padded Banquet Chair Red",
    description:
      '<p>Our stackable red padded banquet chairs are an elegant and practical solution for all your event seating needs. Whether it&#39;s for a conference, a lavish banquet, or a dreamy wedding, these chairs offer both style and comfort. With their plush red velvet finish and graceful gold frame, they add a touch of sophistication to any occasion. Plus, their durable design means they&#39;ll provide comfortable seating for your guests, event after event!</p> <h3>Key Features:</h3> <ul> <li>Lightweight aluminum frame with a stylish gold finish</li> <li>Double padded seat and backrest for enhanced comfort</li> <li>Stackable up to 10 chairs high for efficient storage</li> <li>Double support bracing for increased strength and stability</li> <li>Fireproof fabric for safety</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 45cm/18&quot;</li> <li>Width: 50cm/20&quot;</li> <li>Height: 92cm/36&quot;</li> <li>Seat Height: 47cm/19&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our red padded stacking chairs pair beautifully with our <a href="https://www.caterhire.ie/table-round-5ft-for-hire/">5ft round tables</a> or <a href="https://www.caterhire.ie/table-round-6ft-for-hire/">6ft round tables</a>, offering excellent seating arrangements for 8-12 guests. For a refined touch, consider using chair covers or pairing them with our wooden banqueting tables. Explore different seating options in our <a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">wedding seating guide</a> to find what works best for your event&#39;s theme and layout.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "CH01",
    name: "Children's Chair Wooden White",
    description:
      "<p>Our kid&rsquo;s white wooden chairs are a fantastic choice when you need extra seating for birthday parties or special events. They are designed to be lightweight, making them easy to move around your home or event area. Plus, their charming and simple design means they will fit seamlessly into any setting.</p> <h3>Key Features:</h3> <ul> <li>Wooden chair with back</li> <li>Lightweight and easy to move</li> <li>Easy to clean</li> <li>Suitable for indoor use</li> <li>Colour: White</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 27 cm / 11''</li> <li>Width: 29 cm / 11''</li> <li>Height: 53 cm / 21''</li> <li>Seat Height: 30 cm / 12''</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our white kid&rsquo;s chairs pair beautifully with our <a href=\"https://www.caterhire.ie/childrens-table-rectangular-blue-for-hire/\">blue</a> or <a href=\"https://www.caterhire.ie/childrens-table-rectangular-pink-for-hire/\">pink</a> rectangular tables, creating a delightful setting for your little ones. These tables can accommodate 4-6 small kids comfortably, ensuring everyone has a spot during your event. For more advice on planning the perfect party, check out our blog on <a href=\"https://www.caterhire.ie/blogtop-tips-for-hosting-a-communion-party-at-home-2024/\">Top Tips for Hosting a Communion Party at Home</a>.</p>",
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "CHST",
    name: "Chiavari Bar Stool - Limewash",
    description:
      '<p>Our Chiavari lime wash stools are a delightful addition to any wedding, party, or corporate event. With their elegant lime wash finish and comfortable ivory seat pad, these stools are perfect for making your guests feel stylish and cosy.</p> <h3>Key Features:</h3> <ul> <li>Beech wood frame with a lime wash finish</li> <li>Lightweight yet strong and sturdy design</li> <li>Offers back support and a comfortable seat pad</li> <li>Designed to complement 42" high-top tables and bars</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 39 cm / 15"</li> <li>Width: 40 cm / 16"</li> <li>Height: 114 cm / 45"</li> <li>Seat Height: 75 cm / 30"</li> <li>Weight: 6 kg</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Elevate your event space by pairing our lime wash stools with our <a href="https://www.caterhire.ie/products/tables/cocktail-tables/">cocktail tables</a>. For an added touch of sophistication, consider dressing your tables with <a href="https://www.caterhire.ie/products/table-linen-hire/spandex-pod-table-covers/">spandex covers</a> or luxurious <a href="https://www.caterhire.ie/tablecloths/">tablecloths</a>. If you\'re unsure about seating arrangements, our <a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">blog on wedding seating</a> offers great insights to help you choose the best options for your event.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000550",
    name: "Children's Stool Dark Blue",
    description:
      '<p>Our dark blue kid&#39;s stools are a favourite for any occasion involving little ones. Whether it&#39;s a birthday bash, a sunny picnic in the garden, or a fun family day, these stools provide a perfect spot for children to sit, play, or do crafts. Lightweight yet robust, they offer both convenience and reliability, ensuring every event goes smoothly and stylishly.</p> <h3>Key Features:</h3> <ul> <li>Made from polypropylene plastic</li> <li>Easy to clean</li> <li>Suitable for indoor or outdoor use</li> <li>Available in dark blue, lime green, white, or dark pink</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 35 cm / 14&#39;&#39;</li> <li>Seat Diameter: 30 cm / 12&#39;&#39;</li> <li>Height: 30 cm / 12&#39;&#39;</li> <li>Max. Load: 35 kg</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our dark blue stools pair wonderfully with our <a href="https://www.caterhire.ie/childrens-table-rectangular-blue-for-hire/">blue</a> or <a href="https://www.caterhire.ie/childrens-table-rectangular-pink-for-hire/">pink</a> rectangular tables, both of which can accommodate 4-6 small children comfortably. For more inspiration on hosting, check out our <a href="https://www.caterhire.ie/blogtop-tips-for-hosting-a-communion-party-at-home-2024/">Top Tips for Hosting a Communion Party at Home</a> to make your event memorable!</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "OH02",
    name: "Highback Dining Chair White",
    description:
      '<p>Meet your new go-to chair for any occasion! With its modern design and comfortable seating, this chair is ideal for corporate events, private gatherings, and banquets. Keep your guests happy with the sleek white vinyl finish, which pairs perfectly with any event theme. Whether it&#39;s a short or long-term hire, these chairs have you covered for both style and function.</p> <h3>Key Features:</h3> <ul> <li>White vinyl cover with a sleek silver powder-coated frame</li> <li>Comfortable cushioned pad and back, which are removable</li> <li>Stackable up to 10 chairs high for easy transport and storage</li> <li>Foot bungs to prevent floor scratches</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 43 cm / 17&#39;&#39;</li> <li>Width: 46 cm / 18&#39;&#39;</li> <li>Height: 102 cm / 40&#39;&#39;</li> <li>Seat Height: 48 cm / 19&#39;&#39;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our white high-back dining chairs make a stylish statement when paired with our <a href="https://www.caterhire.ie/products/tables/banquet-dining-tables/">wooden banqueting tables</a>. Looking to create a modern, sleek design? Mix and match with our <a href="https://www.caterhire.ie/spandex-pod-table-cover-white/">white spandex pod table cover</a> and <a href="https://www.caterhire.ie/milan-high-back-bar-stool-white-for-hire/">white Milan bar stool</a>. Their compact size allows you to seat 8-9 people comfortably on a <a href="https://www.caterhire.ie/table-round-5ft-for-hire/">5ft round table</a> and 10-11 on a <a href="https://www.caterhire.ie/table-round-6ft-for-hire/">6ft round table</a>. For more insights into choosing the right event furniture, check out our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">Blog: All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000150",
    name: "Button Bar Stool Black",
    description:
      '<p>Our contemporary button stools are a hit for all kinds of gatherings, from chic corporate events to lively parties. With a focus on both aesthetics and comfort, these stools boast a deep seat pad and a sleek chrome frame. Thanks to their adjustable seat height, they fit into any setting.</p> <h3>Key Features:</h3> <ul> <li>Stylish black padded stool with a chrome frame</li> <li>Adjustable height mechanism with footrest for comfort</li> <li>Available black and white.</li> <li>Suitable for cocktail and dining table heights</li> </ul> <h3>Dimensions:</h3> <ul> <li>Width: 36 cm / 14"</li> <li>Height: 104 cm / 41"</li> <li>Seat Height: 73 cm / 29"</li> <li>Lowest Height: 58 cm / 23"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our button stools are incredibly versatile due to their adjustable heights, making them suitable for both cocktail and dining tables. They pair perfectly with our high bar tables and Milan white dining tables. For more insights and ideas on styling your event, check out our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">blog on hiring event furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000567",
    name: "Chiavari Chair Gold",
    description:
      '<p>Our gold Chiavari chair is a favorite among our rentals, embodying elegance and sophistication. Perfect for adding a touch of luxury to weddings, parties, or corporate gatherings, this chair combines style with practicality. Its lightweight and sturdy design means it&#39;s perfect for both short-term and long-term hire. Choose from various seat pad colors to match your event&#39;s theme.</p> <h3>Key Features:</h3> <ul> <li>Made from European beech wood with a gold finish.</li> <li>Elegant and sophisticated design.</li> <li>Light yet strong and comfortable.</li> <li>Stackable up to 8 chairs for easy transport and storage.</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 37 cm / 15&quot;</li> <li>Width: 40 cm / 16&quot;</li> <li>Height: 92 cm / 36&quot;</li> <li>Seat Height: 45 cm / 18&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our Chiavari chairs are a versatile option that pairs beautifully with our <a href="https://www.caterhire.ie/products/tables/banquet-dining-tables/">wooden banqueting tables</a> or <a href="https://www.caterhire.ie/rustic-oak-foldable-trestle-table/">rustic oak trestle tables</a>. Their compact design allows you to seat 8â€“10 guests comfortably around a 5ft round table and 10â€“12 around a 6ft round table. For more ideas and inspirations, don&#39;t forget to <a href="https://www.caterhire.ie/blog/wedding-seating-which-is-best-for-me">check out our Blog: Wedding Seating: Which is Best for Me?</a> where we delve into seating options that might best suit your event.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000797",
    name: "Zeus Bar Stool with Silver Pad Cover",
    description:
      "<p>Our Zeus stools are the perfect blend of style and function for any event, whether it's an exhibition, party, or conference. Featuring a sleek chrome frame and a plush silver seat pad, these stools are both practical and stylish. Want to add a splash of colour? Choose from vibrant blue, bold red, or classic silver seat caps to match your event's theme.</p> <h3>Key Features:</h3> <ul> <li>Classic-style bar stool with a royal blue seat pad &amp; chrome frame</li> <li>Comfortable footrest for added support</li> <li>Customisable with coloured seat caps: silver, blue, red</li> <li>Perfect for events, exhibitions, and parties</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 37cm/15&rdquo;</li> <li>Height: 75cm/30&rdquo;</li> <li>Seat Height: 82cm/32&rdquo;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Enhance your event&rsquo;s atmosphere effortlessly with our colourful seat caps. Opt for silver, red, or blue to transform your Zeus stools and keep your d&eacute;cor fresh and engaging. Our stools are available for both short and long-term hire, making them versatile for any occasion. For more insights on how to make the most out of your event furniture rental, check out our <a href=\"https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/\">blog article</a>.</p>",
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "SL1010",
    name: "Pop Bench - Jet Black",
    description:
      '<p>Our Pop Benches are all about infusing your event with fun and energy, thanks to their sleek design and vibrant colours. Ideal for corporate summer gatherings, festivals, and hospitality events, these benches effortlessly create stylish, yet relaxed chill-out zones. Crafted in Italy from durable polyethylene, they&rsquo;re perfect for both indoor and outdoor usage. Whether you\'re planning a short or long-term event, these benches offer both functionality and flair.</p> <h3>Key Features:</h3> <ul> <li>Designed in Italy for a sleek, modern appearance</li> <li>Constructed from durable polyethylene for indoor and outdoor use</li> <li>Comfortably seats 1-2 people</li> <li>Stackable for easy storage and transportation</li> <li>Available in a spectrum of five vibrant colours including jet black, lime green, milky white, yellow, and flame red</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 115cm / 46"</li> <li>Width: 46cm / 18"</li> <li>Height: 42cm / 17"</li> <li>Weight: 8 kg</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Add a pop of colour to outdoor event spaces with our diverse range of funky outdoor furniture. Pair our <a href="https://www.caterhire.ie/pop-bench-lime-green-for-hire/">Pop Benches in Lime Green</a> with the <a href="https://www.caterhire.ie/wow-bench-saffron-yellow-for-hire/">Wow Bench in Saffron Yellow</a> for a striking visual appeal. For a blend of style and functionality, consider including our <a href="https://www.caterhire.ie/coffee-table-illuminated/">Illuminated Coffee Tables</a>. Or, create a cosy corner with the <a href="https://www.caterhire.ie/candy-lounge-armchair-soft-yellow-for-hire/">Candy Lounge Armchair in Soft Yellow</a>. For more inspiration, check out our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">blog post on hiring event furniture</a> to ensure you create the perfect vibe for your gathering.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000583",
    name: "Children's Stool Lime Green",
    description:
      "<p>Brighten up your kid's party with our lime green stools&mdash;perfect for birthday bashes, family fun days, or outdoor gatherings. These stools are lightweight yet robust, making them ideal for little ones to sit comfortably while they play, draw, create crafts, or enjoy a picnic. Their vibrant colour adds a splash of joy to any setting, making them a favorite choice for various events.</p> <h3>Key Features:</h3> <ul> <li>Made of polypropylene plastic</li> <li>Easy to clean</li> <li>Suitable for indoor and outdoor use</li> <li>Available in dark pink, white, or dark blue</li> <li>Colour: Lime green</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 35 cm / 14''</li> <li>Seat Diameter: 30 cm / 12''</li> <li>Height: 30 cm / 12''</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our lime green stools pair wonderfully with our <a href=\"https://www.caterhire.ie/childrens-table-rectangular-blue-for-hire/\">blue</a> or <a href=\"https://www.caterhire.ie/childrens-table-rectangular-pink-for-hire/\">pink</a> rectangular tables, which can seat 4-6 small kids comfortably. Whether you&rsquo;re planning a casual gathering or a special occasion like a communion party, these stools and tables can help create a comfortable and colourful environment. For more ideas on hosting events at home, check out our <a href=\"https://www.caterhire.ie/blogtop-tips-for-hosting-a-communion-party-at-home-2024/\">blog article on top tips for hosting a communion party</a>.</p>",
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000547",
    name: "All Seasons Padded Chair",
    description:
      '<p>The All Seasons Padded Banquet Chair is a timeless and elegant seating choice, ideal for conferences, banquets, weddings and formal gatherings. With its classic gold frame and regal patterned upholstery, this chair offers both style and comfort. Suitable for short or long-term hire.</p> <p><strong>Key Features</strong></p> <ul> <li>Easy to handle and reposition.</li> <li>Decorative patterned fabric for a refined look.</li> <li>Features a double-padded seat and backrest.</li> <li>Stackable up to 10 high for efficient storage and transport.</li> <li>Fitted with protective feet bungs to prevent scratching.</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 43cm/17"</li> <li>Width: 45cm/18"</li> <li>Height: 93cm/37"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our All Seasons Padded Chairs pair perfectly with our <a href="https://www.caterhire.ie/table-round-5ft-for-hire/">5ft round tables</a> or <a href="https://www.caterhire.ie/table-round-6ft-for-hire/">6ft round tables</a>, or even with chair covers for a more formal setting. Their compact design allows seating for 8-10 people around a 5ft table and 10-12 people around a 6ft table. For more insights on seating arrangements, explore our blog on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>, or discover more seating tips on our website.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "IL10",
    name: "Half Moon Bench Illuminated",
    description:
      "<p>Explore the dazzling possibilities of our extensive illuminated furniture collection! Whether you're aiming to create an enchanting atmosphere or add a touch of modern elegance, our half-moon units are perfect for your event. With their versatility, these glow-in-the-dark wonders can serve as seating, tables, or eye-catching decor. Plus, with remote-controlled colour and brightness options, the ambiance is entirely in your hands!</p> <h3>Key Features:</h3> <ul> <li>LED multi-colour options with remote control</li> <li>Rechargeable battery providing 6-8 hours of illumination</li> <li>Suitable for both indoor and outdoor use</li> <li>Can be easily customized with branding</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 140 cm / 55''</li> <li>Width: 109 cm / 43''</li> <li>Height: 43 cm / 17''</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Looking to transform your space? Our illuminated furniture is ideal for creating vibrant event settings. Consider experimenting with different seating configurations or pairing with our other <a href=\"https://www.caterhire.ie/products/illuminated-furniture/\">illuminated furniture</a> to curate the perfect atmosphere. For more insights, visit our <a href=\"https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/\">blog</a> where we share all you need to know about hiring event furniture. Make your event a glowing success with Caterhire!</p>",
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "IL07",
    name: "Snake Bench Illuminated",
    description:
      '<p>Looking to add a touch of flair and functionality to your event seating? Our Snake Bench from the illuminated furniture collection is just the ticket! Versatile and eye-catching, this bench is crafted from sturdy polyethylene and features vibrant LED lighting to match your desired mood. Perfect for both indoor settings and outdoor festivities, the Snake Bench can be used alone or combined to create stunning curved seating for an unforgettable event atmosphere.</p> <h3>Key Features:</h3> <ul> <li>Suitable for indoor and outdoor use</li> <li>LED multi-colour lighting with remote control</li> <li>Rechargeable battery with 6-8 hours of life</li> <li>Seats up to 2 people</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 123 cm / 48&quot;</li> <li>Width: 43 cm / 17&quot;</li> <li>Height: 43 cm / 17&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Get creative with your event&#39;s seating arrangement! Mix and match the Snake Bench with our <a href="https://www.caterhire.ie/cube-illuminated-with-silver-top-17in/">Cube</a> and <a href="https://www.caterhire.ie/star-bench-illuminated-for-hire/">Star</a> benches to craft a one-of-a-kind lounge or casual networking area. These illuminated pieces allow endless configurations that can perfectly align with your event&#39;s theme. For more insights on how to create the ultimate event setup, explore our blog on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "SL1011",
    name: "Pop Bench - Flame Red",
    description:
      '<p>Our Pop Benches bring a lively burst of colour and modern charm to any occasion! Whether you&rsquo;re hosting a corporate summer party, a festive gathering, or running a hospitality event, these vibrant benches transform spaces into stylish and relaxed chill-out zones. Crafted in Italy from resilient polyethylene, they offer a striking blend of aesthetics and practicality, suitable for both indoor and outdoor settings. Available for short and long-term hire, they\'re as versatile as they are eye-catching.</p> <h3>Key Features:</h3> <ul> <li>Designed in Italy for a contemporary, sleek style.</li> <li>Constructed from durable polyethylene for both indoor and outdoor use.</li> <li>Comfortably accommodates 1-2 people.</li> <li>Stackable, allowing for easy storage and transport.</li> <li>Available in five lively colours including red, jet black, lime green, milky white, yellow, and flame red.</li> </ul> <h3>Dimensions:</h3> <ul> <li><strong>Length:</strong> 115cm (46")</li> <li><strong>Width:</strong> 46cm (18")</li> <li><strong>Height:</strong> 42cm (17")</li> <li><strong>Weight:</strong> 8 kg</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Explore our diverse range of vibrant outdoor furniture to elevate your event. Alongside our Pop Benches, consider enhancing your setting with our <a href="https://www.caterhire.ie/wow-bench-saffron-yellow-for-hire/">Wow Benches</a>, or create a focal point with our <a href="https://www.caterhire.ie/coffee-table-illuminated/">Illuminated Coffee Tables</a>. For an extra dash of flair, our <a href="https://www.caterhire.ie/candy-lounge-armchair-soft-yellow-for-hire/">Candy Lounge Armchairs</a> will perfectly complement your setup. Get inspired and learn more about maximizing your event furniture in our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">blog article</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "SL1009",
    name: "Wow bench- Lime green",
    description:
      '<p>Meet our Wow Bench, the ideal blend of modern style and playful creativity for your event! Its lively design is perfect for indoor and outdoor occasions like conferences and outdoor gatherings. Made from robust polyethylene, this delightful bench can even be flipped to display the whimsical word &quot;MOM,&quot; adding a unique touch to your decor setup. Available for both short- and long-term hire, it&#39;s sure to elevate any space it graces.</p> <h3>Key Features:</h3> <ul> <li>Unique &quot;WOW&quot; shaped design</li> <li>Seats up to 3 people</li> <li>Durable polyethylene construction</li> <li>Suitable for both indoor and outdoor use</li> <li>Also comes in saffron yellow</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 147cm/58&quot;</li> <li>Width: 43cm/17&quot;</li> <li>Height: 43cm/17&quot;</li> <li>Weight: 20kg</li> <li>Case size: 1 per case</li> </ul> <h3>Caterhire Top Tips:</h3> <p>To craft a dynamic and colorful atmosphere, pair the Wow Bench with our lively <a href="https://www.caterhire.ie/pop-bench-lime-green-for-hire/">Pop Bench</a> or explore our <a href="https://www.caterhire.ie/candy-lounge-armchair-soft-yellow-for-hire/">Candy Lounge Armchair</a> for a cohesive look. For those seeking to illuminate their event, consider adding our <a href="https://www.caterhire.ie/coffee-table-illuminated/">Illuminated Coffee Table</a>. Need more event furniture inspiration? Check out our blog on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a> for expert advice and tips!</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "F001",
    name: "Chameleon Chair Silver Back",
    description:
      '<p>Sophistication effortlessly blends with style in our silver Chameleon chair, exclusively available for hire from Caterhire. Featuring a luxurious cushion and an elegantly curved silhouette, these chairs have graced prestigious gatherings like the Academy Awards Governor Ball and various celebrity weddings. They\'re versatile, fully customisable and can be tailored to match any event theme.</p> <h3>Key Features:</h3> <ul> <li>Elegant silver frame with a curved back</li> <li>Comfortable curved silhouette with plush seat pad</li> <li>Custom-fitted covers available to match any theme</li> <li>Eco-friendly, crafted from recyclable steel</li> <li>Includes foot bungs to protect floors</li> <li>Interchangeable seat pads available in many colours, including white, silver, pink, turquoise, sage and more!</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 43 cm / 17"</li> <li>Width: 43 cm / 17"</li> <li>Height: 97 cm / 38"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Choosing the right seating for your event is crucial for both comfort and aesthetics. For more insights on selecting the perfect wedding seating, explore our <a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">blog article</a>. Additionally, consider pairing these chairs with our elegant table settings to elevate the ambiance of your event.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "11181W",
    name: "Button Bar Stool White",
    description:
      '<p>Our contemporary button stools are a stylish and practical choice, perfect for adding flair to corporate events and parties. With their chic design and deep, comfortable seating, they\'re crafted to enhance both the look and feel of your gathering. The chrome frame and adjustable seat height mechanism make these stools an adaptable addition to any event, catering to various needs with ease.</p> <h3>Key Features:</h3> <ul> <li>Sleek design with a padded white seat and chrome frame</li> <li>Adjustable height and a footrest for added comfort</li> <li>Available in black and white.</li> </ul> <h3>Dimensions:</h3> <ul> <li>Width: 36 cm / 14"</li> <li>Height: 104 cm / 41"</li> <li>Seat Height: 73 cm / 29"</li> <li>Lowest Height: 58 cm / 23"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our button stools boast an adjustable height feature, making them versatile enough for both cocktail and dining table settings. They pair exceptionally well with our high bar tables and Milan dining tables. For more insights, check out our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">blog</a> on hiring event furniture.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000569",
    name: "Folding White Chair",
    description:
      '<p>Our white folding chairs bring a touch of elegance to any event, whether it&#39;s indoors or outdoors. Perfect for weddings, fashion shows, ceremonies, and more, these chairs are a popular choice that easily adapts to various settings. Their sleek design doesnâ€™t compromise on practicality, offering convenient storage and transportation options as well. Fit the same number of guests around the table as with our Chiavari or Banqueting chairs for a seamless event setup.</p> <h3>Key Features:</h3> <ul> <li>Elegant white folding chair with a glossy lacquer finish</li> <li>Crafted from durable resin with a faux leather seat pad</li> <li>Designed for both indoor and outdoor use</li> <li>Easily folds flat for storage and transportation</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 45 cm / 18&quot;</li> <li>Width: 41 cm / 16&quot;</li> <li>Height: 77 cm / 30&quot;</li> <li>Seat Height: 46 cm / 18&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our white folding chairs make the perfect pairing with our <a href="https://www.caterhire.ie/table-round-5ft-for-hire/">5ft round wooden banqueting tables</a> or <a href="https://www.caterhire.ie/table-round-6ft-for-hire/">6ft round tables</a>. You can seat 8-10 guests comfortably with the 5ft round table and 10-12 with the 6ft round table, especially when complemented with our crisp white table linen. For more insights and advice on setting up your event, check out our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">blog post on hiring event furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000572",
    name: "Children's Wooden Picnic Bench",
    description:
      '<p>Looking for the perfect kid-sized seating for your next birthday party or family fun day? Our children&#39;s picnic table is a fantastic choice! With a charming brown-grey stained finish, it comfortably seats four little ones, making it ideal for outdoor events where the kids can feast and play. Easy to transport, it fits snugly in your car if you&#39;re collecting it.</p> <h3>Key Features:</h3> <ul> <li>Solid wood with brown-grey stained finish</li> <li>Seats 4 kids comfortably</li> <li>Designed for outdoor use</li> <li>Conveniently fits in a car for easy collection</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 92 cm / 36&#39;&#39;</li> <li>Width: 89 cm / 35&#39;&#39;</li> <li>Height: 49 cm / 19&#39;&#39;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Need entertainment options to keep the children happy during your event? Check out our fantastic selection of games, including <a href="https://www.caterhire.ie/giant-connect-4/">Giant Connect 4</a> and many more. These games are perfect for adding a fun and interactive element to your party. For more inspiration, explore our blog post, <a href="https://www.caterhire.ie/bloggame-on-top-garden-games-to-hire-for-events/">Game On! Top Garden Games to Hire for Events</a>, and discover how you can make your event truly memorable.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000564",
    name: "Chiavari Chair Mahogany",
    description:
      '<p>Our Mahogany Chiavari chair is a stellar choice for weddings and corporate gatherings. Crafted to perfection, it offers a rich, dark brown hue that elevates autumn weddings and rustic dining experiences alike. Lightweight yet sturdy, it ensures comfort without compromising on style, making your guests feel both welcome and elegant.</p> <h3>Key Features:</h3> <ul> <li>Crafted from European beech wood with a rich mahogany finish</li> <li>Elegant, stylish, and lightweight design</li> <li>Strong and comfortable structure</li> <li>Stackable up to 8 chairs for easy transport and storage</li> <li>Interchangeable seat pads in a variety of colours, including ivory, green, burgundy, cocoa brown and more!</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 38 cm / 15"</li> <li>Width: 44 cm / 17"</li> <li>Height: 91 cm / 36"</li> <li>Seat Height: 46 cm / 18"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our Chiavari mahogany stacking chairs pair beautifully with <a href="https://www.caterhire.ie/products/tables/banquet-dining-tables/">wooden banqueting tables</a> and the <a href="https://www.caterhire.ie/rustic-oak-foldable-trestle-table/">rustic oak foldable trestle table</a>. Their compact size is perfect for seating arrangements, allowing 8-10 people on a 5ft round table and 10-12 on a 6ft round table. For more tips on selecting event furniture, check out our blog post on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "SL1014",
    name: "Pop Bench - Saffron Yellow",
    description:
      '<p>Introducing our vibrant Pop Benches, a playful blend of sleek design and bright colours that are sure to add a splash of fun to any event. Whether it\'s a corporate summer gathering, a lively festival, or a chic hospitality setting, these benches, crafted in Italy, promise to enhance any chill-out area. Their durable polyethylene construction ensures they\'re as functional as they are stylish, ready to brighten both indoor and outdoor spaces.</p> <h3>Key Features:</h3> <ul> <li>Designed in Italy for a modern, sleek look</li> <li>Made from durable polyethylene, suitable for both indoor and outdoor use</li> <li>Seats 1-2 people comfortably</li> <li>Stackable for easy storage and transport</li> <li>Available in vibrant colours: saffron yellow, jet black, lime green, milky white, and flame red</li> </ul> <h3>Dimensions:</h3> <ul> <li><strong>Length:</strong> 115cm / 46"</li> <li><strong>Width:</strong> 46cm / 18"</li> <li><strong>Height:</strong> 42cm / 17"</li> <li><strong>Weight:</strong> 8 kg</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Transform your event space with a pop of colour and contemporary style by exploring our extensive range of outdoor furniture options. Complement your Pop Benches with our <a href="https://www.caterhire.ie/wow-bench-saffron-yellow-for-hire/">Wow Bench in Saffron Yellow</a> or make a statement with our <a href="https://www.caterhire.ie/candy-lounge-armchair-soft-yellow-for-hire/">Candy Lounge Armchair in Soft Yellow</a>. Don\'t forget to incorporate some creative lighting with our <a href="https://www.caterhire.ie/coffee-table-illuminated/">Illuminated Coffee Table</a>. For further inspiration and guidance, check out our detailed blog post on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "BS1001",
    name: "Milan High Back Bar Stool - Black",
    description:
      '<p>Transform any event with our stylish Milan bar stools, inspired by chic Italian design. Perfect for modern settings, these stools combine a sleek aesthetic with comfort and practicality. Crafted from durable materials, they are an excellent choice for any gathering needing a touch of elegance.</p> <h3>Key Features:</h3> <ul> <li>Sleek black matt polypropylene seat</li> <li>Durable powder-coated chrome frame</li> <li>Powder-coated legs with footrest for added support</li> <li>Stackable up to 6 high for convenient storage</li> <li>Available in both black and white</li> </ul> <h3>Dimensions:</h3> <ul> <li>Width: 53cm/21&quot;</li> <li>Height: 109cm/43&quot;</li> <li>Seat Height: 75cm/30&quot;</li> <li>Weight: 6kg</li> </ul> <h3>Caterhire Top Tips:</h3> <p>For a seamlessly sophisticated event setup, pair these bar stools with our <a href="https://www.caterhire.ie/peak-pod-table-black-for-hire/">peak pod tables</a> or <a href="hhttps://www.caterhire.ie/cube-black-high-bar-table-for-hire/">high bar tables</a>. To add a polished finish, consider using <a href="https://www.caterhire.ie/spandex-pod-table-cover-black/">spandex pod table covers</a>. For more insights on creating the ideal event atmosphere, check out our blog post, <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000546A",
    name: "Chiavari Limewash Chair (Standard)",
    description:
      "<p>The Chiavari chair is a timeless classic in the world of event seating, beloved for its elegant design and versatility. Renowned for gracing high-profile occasions and luxurious settings globally, this chair's delicate French-inspired styling and sophisticated lime wash finish add a touch of class to any wedding, party, or celebration. Whether you need seating for an intimate gathering or a grand event, the Chiavari chair is your go-to for comfort and elegance, available for both short and long-term hire.</p> <h3>Key Features:</h3> <ul> <li>Crafted from beech wood with a refined lime wash finish</li> <li>Lightweight yet durable and comfortable</li> <li>Conveniently stacks up to 8 chairs high</li> <li>Interchangeable seat pads with many colour options including ivory, green, burgundy, cocoa brown and more!</li> <li>Available in additional finishes: mahogany, gold, and black</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 39 cm / 15''</li> <li>Width: 46 cm / 18''</li> <li>Height: 88 cm / 34''</li> <li>Weight: 5 kg</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our Chiavari stacking chairs pair beautifully with our wooden <a href=\"https://www.caterhire.ie/products/tables/banquet-dining-tables/\">banquet dining tables</a> and <a href=\"https://www.caterhire.ie/rustic-oak-foldable-trestle-table/\">rustic oak foldable trestle tables</a>, making your seating arrangement both functional and stylish. Thanks to their compact size, you can easily seat 8-10 guests at a 5ft round table and 10-12 at a 6ft round table. For more guidance on hosting and optimizing your event setup, don't miss our blog post: <a href=\"https://www.caterhire.ie/blogyour-guide-to-table-linen-sizing-seating-capacity/\">Your Guide To Table Linen Sizing &amp; Seating Capacity</a>.</p>",
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "CRY01",
    name: "Chiavari Chair Crystal with White Pad",
    description:
      '<p>The Crystal Chiavari chair offers a modern twist on a timeless classic, providing elegance and versatility for any occasion. With its transparent design, the chair can seamlessly adapt to varying lighting, creating a unique visual effect that suits any party or event theme. Lightweight and elegant, it&#39;s an excellent choice for both short-term and long-term events.</p> <h3>Key Features:</h3> <ul> <li>Made from durable polycarbonate resin</li> <li>Lightweight for easy transport</li> <li>Stackable up to 6 chairs high for convenient storage</li> <li>Includes a white faux leather seat pad</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 39 cm / 15&quot;</li> <li>Width: 40 cm / 16&quot;</li> <li>Height: 92 cm / 36&quot;</li> <li>Seat Height: 44 cm / 17&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>For an exquisite event setting, pair the Crystal Chiavari chairs with our <a href="https://www.caterhire.ie/products/tables/banquet-dining-tables/">banquet dining tables</a> and <a href="https://www.caterhire.ie/peak-pod-table-illuminated-low-for-hire/">illuminated Peak low tables</a>. Their compact design is perfect for maximizing seating around your table, accommodating 8-10 people on a 5ft round or 10-12 people on a 6ft round. For more insights on event planning and decor, check out our <a href="https://www.caterhire.ie/blogyour-guide-to-table-linen-sizing-seating-capacity/">guide to table linen sizing and seating capacity</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "F002",
    name: "Chameleon Chair Gold & Bronze with Black Legs",
    description:
      '<p>Step into timeless elegance with our exclusive two-tone Chameleon chair, guaranteed to make a statement at any event. Known for gracing the likes of the Academy Awards Governor Ball and celebrity weddings, these chairs exude sophistication while offering versatility and comfort. Available in a variety of colours and fabrics, they can be perfectly tailored to fit the theme of any occasion. Whether you need them for a short or long-term event, their chic design adds a touch of class that enhances any venue.</p> <h3>Key Features:</h3> <ul> <li>Elegant two-tone gold and bronze design</li> <li>Comfortable curved silhouette back and deep seat pad</li> <li>Customizable seat pad colours</li> <li>Eco-friendly, manufactured from recyclable steel</li> <li>Easy transport and storage with trolleys (36 chairs per trolley)</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 43 cm / 17"</li> <li>Width: 43 cm / 17"</li> <li>Height: 97 cm / 38"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>For an exceptional dining experience, pair our Gold &amp; Bronze Chameleon chairs with our <a href="https://www.caterhire.ie/products/tables/banquet-dining-tables/">wooden banqueting tables</a>, draped in ivory or white table linen. When planning your seating arrangement, remember that these chairs fit comfortably around a 5ft round table for eight guests or a 6ft round table for ten guests. For more helpful insights on seating options, visit our blog article: <a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">Wedding Seating: Which is Best For Me?</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "SL1013",
    name: "Pop Bench - Lime Green",
    description:
      '<p>Brighten up your event with our Pop Benches, where sleek design meets vibrant colour. These Italian-designed benches, available in several eye-catching shades like lime green, flame red, and more, bring both style and practicality to the forefront. Perfect for corporate summer events, festivals, and hospitality settings, they create inviting chill-out areas. Plus, their durability ensures they\'re ready for any indoor or outdoor occasion.</p> <h3>Key Features:</h3> <ul> <li>Sleek, modern Italian design</li> <li>Made from durable polyethylene for versatile use</li> <li>Comfortably seats 1-2 people</li> <li>Stackable for easy storage and transport</li> <li>Available in five lively colours</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 115cm / 46"</li> <li>Width: 46cm / 18"</li> <li>Height: 42cm / 17"</li> <li>Weight: 8 kg</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Enhance your event&rsquo;s ambiance by mixing and matching from our vibrant selection of furniture. Pair the lime green <a href="https://www.caterhire.ie/pop-bench-lime-green-for-hire/">Pop Bench</a> with our <a href="https://www.caterhire.ie/wow-bench-saffron-yellow-for-hire/">Wow Bench in saffron yellow</a> for a burst of colour, or add a touch of elegance with an <a href="https://www.caterhire.ie/coffee-table-illuminated/">illuminated coffee table</a>. Explore our <a href="https://www.caterhire.ie/candy-lounge-armchair-soft-yellow-for-hire/">Candy Lounge Armchair in soft yellow</a> to create a fun and dynamic seating area. For more inspiration on setting up your event, check out our blog: <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "BS1000",
    name: "Milan High Back Bar Stool - White",
    description:
      '<p>Add a touch of sophistication to your event with our exquisite Milan bar stools, crafted in Italy for the ultimate in stylish seating. With a minimalist design that complements any decor, these stools feature a chic matte white seat paired with a durable chrome frame. Whether youâ€™re hosting an intimate gathering or a grand celebration, these bar stools will elevate your setting.</p> <h3>Key Features:</h3> <ul> <li>Chic white matt polypropylene seat with a sleek chrome frame</li> <li>Robust powder-coated legs equipped with a footrest for extra comfort</li> <li>Stackable up to 6 for effortless storage and transportation</li> <li>Also available in elegant black</li> </ul> <h3>Dimensions:</h3> <ul> <li>Width: 53cm/21&quot;</li> <li>Height: 109cm/43&quot;</li> <li>Seat Height: 75cm/30&quot;</li> <li>Weight: 6kg</li> </ul> <h3>Caterhire Top Tips:</h3> <p>For a truly cohesive and stylish event setup, consider pairing these Milan bar stools with our <a href="https://www.caterhire.ie/peak-pod-table-illuminated-tall-for-hire/">peak tables</a>, <a href="https://www.caterhire.ie/pod-table-white-melamine-33-5in-for-hire/">high bar tables</a>, or <a href="https://www.caterhire.ie/tables/flow-grande-network-high-table-for-hire/">network high tables</a>. These combinations not only enhance the aesthetic appeal but also offer practical seating solutions for your guests. For more insights on selecting the perfect event furniture, visit our blog: <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "FB09",
    name: "Mighty B Beanbag - Orange",
    description:
      '<p>Our Mighty B Beanbags are the perfect touch for any event, conference, or party, bringing comfort and style to guests of all ages. Kids will delight in playing games with these vibrant beanbags, while adults will appreciate a cosy spot for relaxation or socializing. Whether you need them for a day or a few weeks, these beanbags provide a flexible seating solution that\'s both fun and functional.</p> <h3>Key Features:</h3> <ul> <li>Lightweight and portable</li> <li>Suitable for outdoor and indoor use</li> <li>Made from tough, waterproof fabric</li> <li>Easy-to-clean material</li> <li>Available in a range of colours: black, green, grey, and red</li> <li>Colour: Orange</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 80 cm / 31"</li> <li>Width: 99 cm / 39"</li> <li>Height: 94 cm / 37"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Create the ultimate chill-out or entertainment zone with our broad selection of games. From <a href="https://www.caterhire.ie/giant-connect-4/">Giant Connect 4</a> and <a href="https://www.caterhire.ie/giant-kerplunk/">Kerplunk</a> to <a href="https://www.caterhire.ie/fussball-football-table/">Fussball Tables</a>, we have activities to keep everyone engaged. For more inspiration, check out our blog post on <a href="https://www.caterhire.ie/bloggame-on-top-garden-games-to-hire-for-events/">Top Garden Games to Hire for Events</a>. Let\'s make your next event a memorable one!</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "SL1012",
    name: "Pop Bench - Milky white",
    description:
      '<p>Our Pop Benches are the perfect blend of sleek design and playful colour, sure to infuse any event with energy and style. Whether you\'re hosting a corporate summer gathering, a vibrant festival, or creating a cosy hospitality nook, these benches are both fashionable and functional. Crafted in Italy from durable polyethylene, they\'re designed for both indoor and outdoor use, making them a versatile addition to any event setting. Available for both short- and long-term hire, these benches promise to add a touch of fun and sophistication to your occasion.</p> <h3>Key Features:</h3> <ul> <li>Italian-designed with a modern, sleek aesthetic</li> <li>Made from durable polyethylene, perfect for indoor and outdoor use</li> <li>Comfortably seats 1-2 people</li> <li>Stackable design for easy storage and transport</li> <li>Available in five vibrant colours: jet black, lime green, milky white, yellow, and flame red</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 115cm/46"</li> <li>Width: 46cm/18"</li> <li>Height: 42cm/17"</li> <li>Weight: 8 kg</li> </ul> <h3>Caterhire Top Tips:</h3> <p>To make your event truly stand out, explore our wide range of vibrant outdoor furniture options. Mix and match these Pop Benches with our <a href="https://www.caterhire.ie/wow-bench-saffron-yellow-for-hire/">Wow Bench</a> or <a href="https://www.caterhire.ie/candy-lounge-armchair-soft-yellow-for-hire/">Candy Lounge Armchair</a> to create striking chill-out spaces. For a unique touch, consider adding an <a href="https://www.caterhire.ie/coffee-table-illuminated/">Illuminated Coffee Table</a> to your setup. Be sure to check out our blog, <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>, for more inspiration and advice!</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "FB03",
    name: "Mighty B Beanbag - Black",
    description:
      '<p>Our outdoor Mighty B Beanbags are a must-have for any event, be it a conference, party, or casual garden gathering. With their vibrant colours and super cosy design, they\'re a hit with everyone&mdash;from energetic kids playing games to adults looking to unwind. Whether you need them short-term or for a longer duration, these beanbags promise to add comfort and style to any setting.</p> <h3>Key Features:</h3> <ul> <li>Lightweight &amp; portable</li> <li>Suitable for both outdoor and indoor use</li> <li>Made from tough, waterproof fabric</li> <li>Easy-to-clean material</li> <li>Available in black, orange, green, grey, and red</li> <li>Colour: Black</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 80 cm / 31"</li> <li>Width: 99 cm / 39"</li> <li>Height: 94 cm / 37"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Planning a chill-out zone or a playful corner? Our Mighty B Beanbags pair perfectly with our selection of entertaining games. Consider renting our exciting <a href="https://www.caterhire.ie/giant-connect-4/">Giant Connect 4</a>, <a href="https://www.caterhire.ie/giant-kerplunk/">Giant Kerplunk</a>, or the thrilling <a href="https://www.caterhire.ie/fussball-football-table/">Fussball Table</a> to keep your guests engaged and happy. For more ideas on creating an unforgettable event atmosphere, check out our blog post, <a href="https://www.caterhire.ie/bloggame-on-top-garden-games-to-hire-for-events/">"Game On! Top Garden Games to Hire for Events"</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000584",
    name: "Children's Stool White",
    description:
      '<p>Our white kid&#39;s stools are a hit for any celebration, from birthday parties and family fun days to outdoor gatherings. Lightweight yet robust, these stools are ideal for little ones to sit comfortably as they play, draw, do crafts, or enjoy a garden picnic. Designed for both indoor and outdoor use, these stools blend functionality with a touch of fun.</p> <h3>Key Features:</h3> <ul> <li>Made from polypropylene plastic</li> <li>Easy to clean</li> <li>Suitable for indoor and outdoor use</li> <li>Available in white, with options in dark pink, lime green, or dark blue</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 35 cm / 14&#39;&#39;</li> <li>Seat Diameter: 30 cm / 12&#39;&#39;</li> <li>Height: 30 cm / 12&#39;&#39;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our white stools pair seamlessly with our <a href="https://www.caterhire.ie/childrens-table-rectangular-pink-for-hire/">pink rectangular tables</a> or <a href="https://www.caterhire.ie/childrens-table-rectangular-blue-for-hire/">blue rectangular tables</a>, each accommodating 4-6 small children. For tips on organizing memorable events, you might want to explore our blog on <a href="https://www.caterhire.ie/blogtop-tips-for-hosting-a-communion-party-at-home-2024/">Top Tips for Hosting a Communion Party at Home</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "R003",
    name: "Rustic  Wooden Bench with Foldable legs",
    description:
      '<p>Embrace the charm and versatility of our new rustic benches, exclusively developed for Caterhire! Perfect for weddings, parties, or any event, these benches offer a seamless blend of style and practicality. Their rustic design, crafted from reclaimed pine wood, pairs beautifully with our complementary rustic tables and the elegant bentwood chair. Whether you&#39;re aiming for informal banquet-style seating or setting the scene for a ceremony, these benches are a fantastic, flexible choice.</p> <h3>Key Features:</h3> <ul> <li>Crafted from reclaimed pine for a genuine rustic feel</li> <li>Comfortably seats 3-4 people</li> <li>Foldable legs for simple transport and storage</li> <li>Available for both short and long-term hire</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 200cm/79&quot;</li> <li>Width: 32cm/12&quot;</li> <li>Height: 42cm/17&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>For a cohesive rustic-themed event, consider mixing our rustic benches with our <a href="https://www.caterhire.ie/rustic-oak-foldable-trestle-table/">rustic oak foldable trestle table</a> and the charming <a href="https://www.caterhire.ie/bentwood-rustic-oak-chair/">bentwood rustic oak chair</a>. These pieces complement each other beautifully and create a warm, welcoming atmosphere. To learn more about selecting the best seating arrangements for your wedding or event, visit our blog post on <a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">wedding seating options</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "269",
    name: "Milano Conference Chair",
    description:
      '<p>Offering a blend of style and functionality, our charcoal grey conference chair is the ultimate choice for hosting large gatherings, from business meetings to educational lectures. With its plush cushioning and robust design, this chair ensures both comfort and longevity for your events. Its sleek, stackable structure makes it a breeze to store and transport, letting you focus on what truly matters.</p> <h3>Key Features:</h3> <ul> <li>Classic design with a chrome frame</li> <li>Charcoal grey fabric with padded seating and back</li> <li>Stackable up to 10 chairs high for convenient storage</li> <li>Upholstered in premium, durable fabric</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 54cm / 21&quot;</li> <li>Width: 40cm / 16&quot;</li> <li>Height: 82cm / 32&quot;</li> <li>Seat Height: 43cm / 17&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Planning a large-scale event? Let us handle the setup and breakdown so you can focus on your tasks. Consider exploring our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">blog on hiring event furniture</a> for insights and tips on creating inviting and functional spaces. Reach out to our team for a seamless planning experience and to discover our range of complementary products for your event needs.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1084D",
    name: "Office Chair Black",
    description:
      '<p>Elevate your workspace with our sleek and ergonomic office operator chair, perfectly suited for meeting rooms, media rooms, or even a pop-up office. Designed to prioritize your comfort, this chair comes with a breathable mesh backrest and a height-adjustable chrome frame, merging modern aesthetics with professional functionality. Whether youâ€™re working for a few hours or pulling an all-nighter, the chair&#39;s thoughtful design ensures you stay supported and comfortable.</p> <h3>Key Features:</h3> <ul> <li>Chrome base paired with black mesh upholstery</li> <li>Enhanced lumbar support for superior comfort</li> <li>Safety castors equipped with a braking system</li> <li>Adjustable height lever for personalized seating</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 46cm/18&quot;</li> <li>Width: 46cm/18&quot;</li> <li>Height: Adjustable between 39-48cm/15&quot;-19&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>To create an efficient and inviting office space, consider complementing your seating arrangement with our wide array of desks, lockable cupboards, filing cabinets, and conference tables. For further insights, check out our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">blog article</a> on how to make the most of event furniture rentals.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000552",
    name: "Children's Stool Dark Pink",
    description:
      '<p>Introduce your little ones to a world of fun and creativity with our charming dark pink kidâ€™s stools. Perfect for birthday parties, family fun days, and outdoor events, these stools are as sturdy as they are lightweight, making them a delightful addition to any child-centered gathering. Small children will love using them for playing, crafting, or hosting a garden picnic, all while seated comfortably.</p> <h3>Key Features:</h3> <ul> <li>Made from durable polypropylene plastic</li> <li>Easy to clean</li> <li>Suitable for both indoor and outdoor use</li> <li>Available in dark pink, lime green, white, or dark blue</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 35 cm / 14&quot;</li> <li>Seat Diameter: 30 cm / 12&quot;</li> <li>Height: 30 cm / 12&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our dark pink stools are a perfect match with either our <a href="https://www.caterhire.ie/childrens-table-rectangular-pink-for-hire/">pink</a> or <a href="https://www.caterhire.ie/childrens-table-rectangular-blue-for-hire/">blue</a> rectangular tables, with each table comfortably seating 4-6 small children. For anyone planning a special event like a communion party, don&#39;t miss our blog post with <a href="https://www.caterhire.ie/blogtop-tips-for-hosting-a-communion-party-at-home-2024/">top tips for hosting a communion party at home</a>. These resources and products ensure a seamless and joyous day for your little guests.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "371",
    name: "Children's Chair Blue",
    description:
      "<p>Perfect for birthday parties or events, our kid&rsquo;s plastic chairs offer versatile seating solutions with the convenience of being both lightweight and easy to move. Available in fun blue and pink colours, these chairs are a delightful addition to any gathering, ensuring both style and functionality. Whether indoors or outdoors, our plastic chairs provide durable seating that is simple to maintain and clean.</p> <h3>Key Features:</h3> <ul> <li>Lightweight and easy to carry</li> <li>Available in blue or pink</li> <li>Suitable for indoor and outdoor use</li> <li>Easy to clean</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 40 cm / 16''</li> <li>Width: 32 cm / 13''</li> <li>Height: 55 cm / 22''</li> <li>Seat Height: 30 cm / 12''</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our chairs pair beautifully with our <a href=\"https://www.caterhire.ie/childrens-table-rectangular-pink-for-hire/\">pink rectangular kid&rsquo;s tables</a> or <a href=\"https://www.caterhire.ie/childrens-table-rectangular-blue-for-hire/\">blue rectangular kid&rsquo;s tables</a>, comfortably seating 4-6 little ones. For inspiration and guidance on throwing a memorable event, take a look at our blog on <a href=\"https://www.caterhire.ie/blogtop-tips-for-hosting-a-communion-party-at-home-2024/\">Top Tips for Hosting a Communion Party at Home</a>. Let us make your child's celebration a stress-free and joyous occasion!</p>",
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "370",
    name: "Children's Chair Pink",
    description:
      '<p>Looking for the perfect seating solution for your child&#39;s next big event? Our kid&#39;s plastic chairs are lightweight, easy to move, and ideal for adding extra spaces at birthday parties or any gathering. Available in playful blue or pink, these chairs are not just eye-catching but also suitable for both indoor and outdoor use, making them a versatile choice for any setting.</p> <h3>Key Features:</h3> <ul> <li>Lightweight and easy to move </li> <li>Durable plastic design with a back </li> <li>Easy to clean </li> <li>Available in blue or pink </li> <li>Suitable for indoor and outdoor use</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 40 cm / 16&#39;&#39; </li> <li>Width: 32 cm / 13&#39;&#39; </li> <li>Height: 55 cm / 22&#39;&#39; </li> <li>Seat Height: 30 cm / 12&#39;&#39;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Pair these charming chairs with our matching <a href="https://www.caterhire.ie/childrens-table-rectangular-pink-for-hire/">pink</a> or <a href="https://www.caterhire.ie/childrens-table-rectangular-blue-for-hire/">blue</a> rectangular kidâ€™s tables for a coordinated look that seats 4-6 small children comfortably. For more inspiration on hosting unforgettable events, check out our <a href="https://www.caterhire.ie/blogtop-tips-for-hosting-a-communion-party-at-home-2024/">blog on top tips for hosting a Communion Party at Home</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "ALICE0017",
    name: "Toadstool Table Red and White",
    description:
      '<p>Looking to add a whimsical touch to your childâ€™s party? Our Toadstool Table is the perfect choice for themed tea parties or celebrations inspired by classic tales like Alice in Wonderland or Charlie and the Chocolate Factory. Made from durable fiberglass resin, this charming table can be used indoors or outdoors, bringing an enchanting element to any occasion. Pair it with our colorful Toadstool Stools for a truly magical setup thatâ€™s sure to delight young guests.</p> <h3>Key Features:</h3> <ul> <li>Fun, themed element for any party</li> <li>Seats up to 2 Toadstool Stools</li> <li>Strong fiberglass resin construction</li> <li>Suitable for indoor and outdoor use</li> <li>Vibrant red and white color scheme</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 70cm (28 inches)</li> <li>Height: 55cm (22 inches)</li> </ul> <h3>Caterhire Top Tips:</h3> <p>For the ultimate party setting, mix and match the Toadstool Table with our matching <a href="https://www.caterhire.ie/toadstool-table-red-and-white-for-hire/">Toadstool Stools</a> available in various colors. Create a play area with our childrenâ€™s picnic benches and add in some fun with a classic Connect 4 game. For more expert tips on event planning, check out our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">blog article</a> filled with all you need to know about hiring event furniture.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "ALICE0026",
    name: "Toadstool Green and White",
    description:
      '<p>Transform your children\'s parties into a whimsical wonderland with our delightful Toadstool Stool. Perfect for themed gatherings or playful tea parties, this stool brings a touch of magic to both indoor and outdoor settings. Pair it effortlessly with our matching <a href="https://www.caterhire.ie/toadstool-table-red-and-white-for-hire/">Toadstool Table</a> for a full fairytale feel. Available in vibrant colours, it\'s as charming as it is sturdy.</p> <h3>Key Features:</h3> <ul> <li>Adds a playful, whimsical element to any party</li> <li>Made from durable fiberglass resin</li> <li>Suitable for indoor and outdoor use</li> <li>Available in green/white, purple/white, and red/white</li> <li>Colour: Green &amp; White&nbsp;</li> </ul> <h3>Dimensions:</h3> <ul> <li>Width: 35cm / 13.7"</li> <li>Depth: 35cm / 13.7"</li> <li>Height: 30cm / 11.8"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>These toadstools truly come alive when paired with our <a href="https://www.caterhire.ie/toadstool-table-red-and-white-for-hire/">red and white Toadstool Table</a>. Consider mixing and matching different coloured stools to create a lively, colourful seating area for your little ones. Looking for more inspiration? Visit our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">blog</a> for expert advice on event furniture hires to ensure your event is a memorable one!</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "ALICE0027",
    name: "Toadstool Purple and White",
    description:
      '<p>Add a touch of whimsy to any children\'s party or themed tea gathering with our delightful Toadstool Stools. These playful seats are the perfect addition to an Alice in Wonderland, Country Garden, or Charlie and the Chocolate Factory-inspired event. Designed for both indoor and outdoor use, they\'re as sturdy as they are charming, making them a versatile choice for any celebration.</p> <h3>Key Features:</h3> <ul> <li>Infuses a lively, themed element to any event</li> <li>Constructed from durable fiberglass resin</li> <li>Suitable for both indoor and outdoor settings</li> <li>Available in a variety of colours: green and white, purple and white, and red and white</li> <li>Colour: Purple &amp; White</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length 35cm / 13.7"</li> <li>Width: 35cm / 13.7"</li> <li>Height: 30cm / 11.8"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>These enchanting toadstools make a striking impression when paired with our <a href="https://www.caterhire.ie/toadstool-red-and-white-stool-for-hire/">Red &amp; White Toadstool Table.</a> For a more dynamic and cheerful setup, consider mixing and matching stool colours to craft a vibrant seating area at your child&rsquo;s party. For additional insights and expert advice, check out our blog: <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "ALICE0024",
    name: "Toadstool Red and White",
    description:
      '<p>Our Toadstool Stool brings a touch of whimsy and fun to any children&#39;s celebration or themed gathering. Perfect for events inspired by classic tales like Alice in Wonderland or Charlie and the Chocolate Factory, this delightful stool pairs beautifully with our Toadstool Table to create a magical setting. Designed for both indoor and outdoor use, the stoolâ€™s vibrant colors and sturdy build make it a charming and practical addition to your party dÃ©cor.</p> <h3>Key Features:</h3> <ul> <li>Infuses a playful, themed accent to any party setting</li> <li>Constructed from durable fiberglass resin</li> <li>Suitable for indoor and outdoor use</li> <li>Available in three color combinations: green &amp; white, purple &amp; white, and red &amp; white</li> </ul> <h3>Dimensions:</h3> <ul> <li>Width: 35cm/13.7&quot;</li> <li>Depth: 35cm/13.7&quot;</li> <li>Height: 30cm/11.8&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Enhance your party ambiance by pairing these toadstools with our <a href="https://www.caterhire.ie/toadstool-table-red-and-white-for-hire/">red and white Toadstool Table</a> for a cohesive look. Mixing different colored stools can create a lively and dynamic seating area that captures the imagination of young guests. For additional event inspiration and tips, explore our blog on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1083B",
    name: "Smartie Bench Black (5 seater)",
    description:
      '<p><span style="font-size: medium;">Exclusive to Caterhire our Black Smartie benches are very popular to hire for exhibitions, trade shows, corporate events and product demonstrations. The smarties benches seat up to 5 people. You can also choose from a range of seat pads colours to match your event theme.</span></p> <p><strong><span style="font-size: medium;">Key Features</span></strong></p> <ul> <li><span style="font-size: medium;">Stylish black solid wooden bench</span></li> <li><span style="font-size: medium;">Removable seat pads for easy cleaning</span></li> <li><span style="font-size: medium;">Suitable for indoor use</span></li> <li><span style="font-size: medium;">Seats 5 people</span></li> <li><span style="font-size: medium;">Non folding bench</span></li> <li><span style="font-size: medium;">Also available in white</span></li> <li><span style="font-size: medium;">Seat pads available in a variety of colours, including ivory, gold, green, blue and more.&nbsp;</span></li> </ul> <p><strong><span style="font-size: medium;">Dimensions</span></strong></p> <p><span style="font-size: medium;">Height: 52cm/20&rdquo;</span><br /><span style="font-size: medium;">Width: 183cm/77&rdquo;</span><br /><span style="font-size: medium;">Depth: 50cm/20&rdquo;</span></p> <p><strong><span style="font-size: medium;">Caterhire Top Tips</span></strong></p> <p><span style="font-size: medium;">Looking to create a break out seating area? We have a great range of furniture to choose from! Check out our <a href="https://www.caterhire.ie/avocado-ottoman-white-leather/">Avocado ottomans</a> and <a href="https://www.caterhire.ie/java-ottoman-white-leather/">Java lounge furniture</a>.</span></p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1083C",
    name: "Smartie Bench Fuchsia (5 seater)",
    description:
      '<p>Exclusive to Caterhire, our Fuchsia Smartie Benches are the perfect blend of style and functionality for any event. Whether you&#39;re hosting an exhibition, trade show, or corporate event, these chic benches will add a splash of modern elegance. Comfortable enough for up to 5 guests, they come in a rainbow of colors, allowing you to match your event&#39;s theme effortlessly.</p> <h3>Key Features:</h3> <ul> <li>Stylish fuchsia solid wooden bench</li> <li>Removable seat pads for easy cleaning and customization</li> <li>Suitable for indoor use</li> <li>Seats up to 5 people</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 183 cm / 77â€</li> <li>Width: 50 cm / 20â€</li> <li>Height: 52 cm / 20â€</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Explore the full potential of your event&#39;s seating arrangements by pairing these benches with our colorful <a href="https://www.caterhire.ie/pop-bench-lime-green-for-hire/">Pop Benches in Lime Green</a> and <a href="https://www.caterhire.ie/wow-bench-saffron-yellow-for-hire/">WOW Benches in Saffron Yellow</a>. For more insights on creating a truly memorable event space, be sure to check out our blog post: <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1083D",
    name: "Smartie Bench Yellow (5 seater)",
    description:
      '<p>Looking to add a pop of color to your event? Our exclusive Yellow Smartie Benches are just the ticket! Perfect for exhibitions, trade shows, corporate events, and product demonstrations, these sleek benches effortlessly combine modern style with functionality. Comfortably seating up to five people, they&#39;re not just practical but also visually appealing. Plus, with the option to choose seat pad colors, they&#39;re easily customizable to fit your event&#39;s theme.</p> <h3>Key Features:</h3> <ul> <li>Stylish grey solid wooden bench</li> <li>Removable seat pads for easy cleaning and customization</li> <li>Suitable for indoor use</li> <li>Seats up to 5 people</li> <li>Available in a range of colors: white, fuchsia, green, yellow &amp; grey</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 183 cm / 77â€</li> <li>Width: 50 cm / 20â€</li> <li>Height: 52 cm / 20â€</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Consider pairing the Yellow Smartie Bench with our <a href="https://www.caterhire.ie/pop-bench-lime-green-for-hire/">Pop Bench in Lime Green</a> or the <a href="https://www.caterhire.ie/wow-bench-saffron-yellow-for-hire/">WOW Bench in Saffron Yellow</a> for a vibrant color mix that will surely impress your guests. For more tips and insights, check out our blog on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">Everything You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1083E",
    name: "Smartie Bench Lime Green (5 seater)",
    description:
      '<p>Looking for a sleek seating option for your event? Exclusive to Caterhire, our Lime Green Smartie Benches are perfect for adding a modern flair to exhibitions, trade shows, corporate events, and product demonstrations. With their vibrant color and stylish design, these benches can comfortably seat up to five people. Available in various colors, you can mix and match with different seat pad colors to create a look that aligns perfectly with your event theme.</p> <h3>Key Features:</h3> <ul> <li>Stylish grey solid wooden bench</li> <li>Removable seat pads for easy cleaning and customization</li> <li>Suitable for indoor use</li> <li>Seats up to 5 people</li> <li>Non-folding bench design</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 183 cm / 77 inches</li> <li>Width: 50 cm / 20 inches</li> <li>Height: 52 cm / 20 inches</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Enhance the look of your setup by pairing these benches with our Pop &amp; WOW Benches available in vibrant colors. For more insights on choosing the perfect furniture for your event, check out our blog on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>. Explore options like the <a href="https://www.caterhire.ie/pop-bench-lime-green-for-hire/">Pop Bench Lime Green</a> and the <a href="https://www.caterhire.ie/wow-bench-saffron-yellow-for-hire/">WOW Bench Saffron Yellow</a> to complement your event theme seamlessly.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "FLOW15",
    name: "Cube White Bar Stool",
    description:
      '<p>Our Cube white bar stools are a chic and popular choice for corporate events and parties, offering a sleek and modern design. These stools boast a durable steel frame with a powder coated white finish. Plus, you can customize with black, white, velvet gold, velvet green or bamboo wood seat pad options. Pair these stools with their matching <a href="https://www.caterhire.ie/cube-white-high-bar-table-for-hire/">Cube High Bar Table</a> for a complete look.</p> <h3>Key Features:</h3> <ul> <li>Stylish white powder-coated steel frame</li> <li>Interchangeable seat pads (white, black, bamboo wood)</li> <li>Stacks up to 25 with Cube trolley</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 35 cm / 14\'\'</li> <li>Width: 35 cm / 14\'\'</li> <li>Height: 79 cm / 31\'\'</li> <li>Case Size: 1 per case</li> </ul> <h3>Caterhire Top Tips:</h3> <p>For a sleek and contemporary atmosphere at your event, pair our Cube stools with the <a href="https://www.caterhire.ie/cube-white-high-bar-table-for-hire/">Cube High Bar Table</a> or the <a href="https://www.caterhire.ie/shop-by-category/flow-network-table-medium-for-hire/">Flow Network Table</a>. Explore our blog for more insights on choosing the best event furniture in <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "FLOW16",
    name: "Cube Black Bar Stool",
    description:
      "<p>Our Cube black bar stools, with their sleek and modern design, are a favorite choice for corporate gatherings and parties. The stools boast a chic black steel frame. With customisable seat pad options like gold velvet, green velvet, white faux leather, black faux leather and bamboo wood, you can easily match these stools to your event&rsquo;s aesthetic.&nbsp;</p> <h3>Key Features:</h3> <ul> <li>Stylish black powder-coated steel frame</li> <li>Stackable 8 or 25 high with a Cube trolley</li> <li>Interchangeable seat pads available in multiple styles</li> <li>Durable aluminium footrest</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 35 cm / 14''</li> <li>Width: 35 cm / 14''</li> <li>Height: 79 cm / 31''</li> </ul> <h3>CaterHire Top Tips:</h3> <p>Create a fresh and contemporary atmosphere at your event by pairing our Cube stools with the <a href=\"https://www.caterhire.ie/cube-black-high-bar-table-for-hire/\">Cube High Bar Table</a>. For a more collaborative setup, consider integrating them with the <a href=\"https://www.caterhire.ie/shop-by-category/flow-network-table-medium-for-hire/\">Flow Network Table</a>. To get inspired with more ideas and practical advice on event furniture selection, read our blog: <a href=\"https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/\">All You Need to Know About Hiring Event Furniture</a>.</p>",
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "FLOW08",
    name: "Cube Black Bar Stool (Small)",
    description:
      '<p>Elevate your summer events, festivals, and parties with our chic Cube black bar stools. These trendy seating solutions are a hit, thanks to their sleek black powder-coated steel frame and a choice of 5 various seat pads. Effortlessly stylish, they pair perfectly with the <a href="https://www.caterhire.ie/shop-by-category/flow-network-table-medium-for-hire/">Flow Dinner Table (medium)</a> for an inviting dining or social setting.</p> <h3>Key Features:</h3> <ul> <li>Stylish black powder-coated steel frame</li> <li>Choice of 5 various seat pads.&nbsp;</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 35 cm / 14"</li> <li>Width: 35 cm / 14"</li> <li>Height: 46 cm / 18"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>The Cube small stool offers versatility with a choice of 5 various seat pads, allowing you to mix and match. Pair them with the <a href="https://www.caterhire.ie/tables/flow-dinner-table-medium-5-9ft-for-hire/">Flow Dinner Table (Medium) - 5.9ft. </a>For more inspiration, check out our blog post on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000690",
    name: "Zeus Bar Stool with Red Pad Cover",
    description:
      '<p>Our Zeus stools are a chic addition to any occasion, whether it&rsquo;s a lively party, an important conference, or a bustling exhibition. Featuring a dazzling chrome frame and a plush red seat pad, these stools bring an element of sophistication and comfort to your event space. The flexibility of our coloured seat caps, available in silver, blue, and red, offers an easy way to revitalize your setup with a splash of vibrant colour.</p> <h3>Key Features:</h3> <ul> <li>Classic bar stool design with a red seat pad and chrome frame</li> <li>Integrated footrest for enhanced comfort</li> <li>Customisable seat caps in silver, blue, or red for a refreshing look</li> <li>Perfect for events, exhibitions, and parties</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 37 cm (15&rdquo;)</li> <li>Height: 75 cm (30&rdquo;)</li> <li>Seat Height: 82 cm (32&rdquo;)</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Revamp the aesthetics of your event with our versatile coloured seat caps, an easy way to personalize your Zeus stools for any theme. Whether you\'re planning a short-term occasion or something more enduring, our varied options ensure a fresh, lively appearance. For more insights and ideas, read our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">blog on hiring event furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1000692",
    name: "Zeus Stool with White Spandex Cover",
    description:
      '<p>Elevate your event&#39;s ambiance with our popular Z stools, a perfect blend of comfort and style for any occasion. Featuring a sleek black seat pad and a sophisticated chrome frame, these stools add a touch of elegance to exhibitions, parties, and gatherings. Want to add a splash of color? Customize the look with vibrant seat caps in shades of white, silver, blue, or red. Whether it&#39;s for short or long-term hire, the Z stool is a versatile choice that will enhance the atmosphere of your event.</p> <h3>Key Features:</h3> <ul> <li>Classic-style bar stool with a comfortable black seat pad and chrome frame</li> <li>Optional seat caps available in white, silver, blue, and red for customization</li> <li>Equipped with a footrest for added comfort</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 37cm/15â€</li> <li>Height: 75cm/30â€</li> <li>Seat Height: 82cm/32â€</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Transform your event effortlessly by selecting from our diverse range of colored seat caps to match your theme perfectly. These quick-change seat covers can take your decor from simple to stunning in no time. Need guidance on planning your event setup? Check out our blog post on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a> for tips and insights. For more complementary items to pair with your Z stool selection, feel free to explore our other offerings.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "AURBL",
    name: "Aurora Black Stool",
    description:
      '<p>Looking to elevate your event with a touch of elegance? Our sleek black bar stools are just what you need, ideal for corporate gatherings, parties, and product launches. The Aurora Stool boasts a sophisticated black faux leather cushioned seat and back, seamlessly blending with all styles of event dÃ©cor. Whether you&#39;re going for a contemporary look or something more classic, these versatile stools are perfect for both short-term and long-term hire.</p> <h3>Key Features:</h3> <ul> <li>Polished chrome frame for a modern aesthetic</li> <li>Adjustable seat height for personalized comfort</li> <li>Cushioned seat and back for optimal support</li> <li>Convenient foot rail for extra ease</li> <li>Also available in a white seat pad option</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 51 cm / 20&quot;</li> <li>Width: 42 cm / 17&quot;</li> <li>Height: 82 cm / 32&quot;</li> <li>Seat Height: 77 cm / 30&quot;</li> <li>Seat Height (Lower): 63 cm / 25&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Complete your event setup by pairing our stools with the perfect tables and covers. Consider our <a href="https://www.caterhire.ie/pod-table-birch-round-tall-for-hire/">high or low pod tables</a>, the elegant <a href="https://www.caterhire.ie/tables/pod-table-glass-round-dining-table-for-hire/">round glass dining table</a>, or the versatile <a href="https://www.caterhire.ie/tables/flow-grande-network-high-table-for-hire/">network high table</a>. Donâ€™t forget our <a href="https://www.caterhire.ie/products/table-linen-hire/spandex-pod-table-covers/">spandex table covers</a> to add a polished finish to your event space. Explore our <a href="https://www.caterhire.ie/blog/all-you-need-to-know-about-hiring-event-furniture">blog for more event furniture tips</a> and inspiration.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "BARWOOD",
    name: "Traditional Wooden Bar Stool",
    description:
      '<p>Our Traditional Wooden Bar Stools bring a touch of rustic charm to any event, whether it&#39;s a wedding, party, or corporate gathering. Crafted from solid beech wood with a stunning walnut vintage finish, these stools are as durable as they are stylish. Perfect for creating a warm and inviting atmosphere in barns, bars, and other traditional settings, they&#39;re available for both short- and long-term hire.</p> <h3>Key Features:</h3> <ul> <li>Solid beech wood construction</li> <li>Classic walnut vintage finish</li> <li>Footrest for added comfort and support</li> <li>Suitable for indoor use</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 41cm/16&quot;</li> <li>Width: 41cm/16&quot;</li> <li>Height: 75cm/30&quot;</li> <li>Case Size: 1 Per Case</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Enhance your event setting by pairing these stools with our <a href="https://www.caterhire.ie/steel-barrel-pod-table-with-wooden-top-yellow-for-hire/">steel barrel pod tables</a> or our elegant <a href="https://www.caterhire.ie/mahogany-wooden-bar-unit/">mahogany bar unit</a>. For guidance on hosting and catering your event, check out our blog on <a href="https://www.caterhire.ie/bloghow-many-drinks-do-i-need-your-complete-guide-to-bars-beverages-for-any-event/">how many drinks you might need</a>. This blend of seating and articles ensures a stylish and well-prepared gathering that will impress your guests.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "F016",
    name: "Chameleon Black Suede Chair",
    description:
      '<p>Experience the blend of comfort and modern style with our luxurious Chameleon black suede chairs. These exclusive chairs have made an appearance at many prestigious events, including celebrity weddings and the Academy Awards Governor Ball. With their versatility and customization options, they are perfect for adding a touch of elegance to any event, whether short or long-term. Customize them with a selection of cushions and covers to perfectly match your theme.</p> <h3>Key Features:</h3> <ul> <li>Luxurious black suede upholstery with dark brown legs</li> <li>Double-padded back and deep seat pad for enhanced comfort</li> <li>Easy transportation with trolleys holding up to 36 chairs</li> <li>Eco-friendly construction using recyclable steel</li> <li>Foot bungs designed to protect floors from damage</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 43 cm / 17â€</li> <li>Width: 43 cm / 17â€</li> <li>Height: 97 cm / 38â€</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Explore our blog post on <a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">Wedding Seating: Which is Best For Me?</a> for more expert advice on choosing the best seating for your event. Remember that while the chair hire includes the luxurious seat, you can opt for additional styling with our range of suede covers in white, charcoal, and cocoa brown. For a complete setup service, feel free to contact us for a customized quote.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "F015",
    name: "Chameleon White Suede Chair",
    description:
      '<p>Experience the perfect blend of comfort and elegance with the exquisite Chameleon white suede chair, available exclusively from Caterhire. This premier seating option has graced high-profile occasions, from the glamorous Academy Awards Governors Ball to luxurious celebrity weddings. Known for their versatility, these chairs can be customized with a variety of colors and fabrics to match any event theme, making them ideal for both short and long-term hires. Add a touch of sophistication and style to your next event with these chic and adaptable chairs.</p> <h3>Key Features:</h3> <ul> <li>Elegant and stylish white suede design with silver legs</li> <li>Double-padded back and deep seat pad for extra comfort</li> <li>Transport-friendly, with up to 36 chairs per trolley</li> <li>Eco-friendly, constructed from recyclable steel</li> <li>Protective foot bungs to safeguard floors</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 43 cm / 17&quot;</li> <li>Width: 43 cm / 17&quot;</li> <li>Height: 97 cm / 38&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>The Chameleon chair&#39;s adaptable design makes it a great choice for various event setups. For optimal space and comfort, it fits 8 people comfortably around a <a href="https://www.caterhire.ie/table-round-5ft-for-hire/">5ft round table</a> and 10 people on a <a href="https://www.caterhire.ie/table-round-6ft-for-hire/">6ft round table</a>. Curious about finding the best seating for your wedding? Check out our <a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">Blog article</a> for more insights!</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "F017",
    name: "Chameleon Cocoa Brown Suede Chair",
    description:
      '<p>Step into style and comfort with our stunning cocoa brown Chameleon chairs, exclusively available for hire at Caterhire. These chic chairs have graced numerous prestigious events, including the Academy Awards Governor Ball and celebrity weddings, offering unmatched versatility and sophistication for any occasion. Customize them with diverse covers to perfectly match your event&#39;s theme and enjoy the flexibility of short or long-term hire.</p> <h3>Key Features:</h3> <ul> <li>Modern cocoa brown suede design with coordinating brown legs</li> <li>Double-padded back and deep seat pad for enhanced comfort</li> <li>Easy transportation and storage with trolleys (36 chairs per trolley)</li> <li>Eco-friendly craftsmanship with recyclable steel frames</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 43 cm / 17&#39;&#39;</li> <li>Width: 43 cm / 17&#39;&#39;</li> <li>Height: 97 cm / 38&#39;&#39;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Our cocoa brown suede Chameleon chairs pair beautifully with our <a href="https://www.caterhire.ie/products/tables/banquet-dining-tables/">wooden banqueting tables</a> available in both round and rectangular sizes. Elevate your event decor with luxurious white table linens and complete the ambiance with our brown suede Soho combo sofas. These chairs comfortably seat 8 on a 5ft round or 10 on a 6ft round table. For more inspiration, check out our <a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">blog on wedding seating options</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "F019",
    name: "Chloe White Chameleon Chair (Full Cover)",
    description:
      '<p>Brighten up your special occasions with the sophisticated Chloe Chameleon chairs, exclusively available from Caterhire. These chic chairs are wrapped in pristine white stretch fabric, exuding luxury and elegance, making them perfect for weddings and gala events. Elevate your venue&#39;s ambiance with their stylish appeal and make a memorable impression on your guests. Convenient for both short and long-term hire, these chairs will seamlessly integrate into your celebration decor.</p> <h3>Key Features:</h3> <ul> <li>Covered completely with bright white stretch fabric for a luxurious look</li> <li>Adorned with a Rhinestone jewel band for added glam</li> <li>Transported easily in trolleys, each carrying 36 chairs</li> <li>Constructed from eco-friendly, recyclable steel</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 43 cm / 17&quot;</li> <li>Width: 43 cm / 17&quot;</li> <li>Height: 97 cm / 38&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>For optimal seating arrangements, consider pairing the Chloe chairs with our <a href="https://www.caterhire.ie/table-round-5ft-for-hire/">5ft round tables</a> or <a href="https://www.caterhire.ie/table-round-6ft-for-hire/">6ft round tables</a>. These combinations work seamlessly to accommodate 8-12 guests per table, depending on the table size. To further enhance the visual appeal, add a touch of sparkle with our Crystal Globe Candelabra. For more advice on wedding seating arrangements, check out our <a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">blog</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "F025",
    name: "Chameleon Charcoal Suede Chair",
    description:
      '<p>Discover the perfect blend of comfort and elegance with our Chameleon charcoal suede chairs, available exclusively for hire at Caterhire. Featuring a stylish charcoal suede finish and sleek silver legs, these chairs are designed to enhance any event decor with a contemporary flair. Known for their versatility, they have graced prestigious events such as the Academy Awards Governor Ball and celebrity weddings. With customizable options available, these chairs promise to add a touch of sophistication to both short and long-term events.</p> <h3>Key Features:</h3> <ul> <li>Charcoal suede topper and seat pad</li> <li>Double-padded back &amp; deep seat pad for extra comfort</li> <li>Available in multiple seat pad colors</li> <li>Eco-friendly, made from recyclable steel</li> <li>Also available in cocoa brown, white, and black suede</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 43 cm / 17&quot;</li> <li>Width: 43 cm / 17&quot;</li> <li>Height: 97 cm / 38&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Looking for the best seating for your wedding or event? Explore our <a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">blog article</a> for insights into choosing the perfect seating arrangement for your special day. Our Chameleon chairs are a fantastic option to consider for their sophistication and customizable features to match everything from intimate gatherings to lavish celebrations.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "F018A",
    name: "Chloe Ivory Chameleon Chair",
    description:
      '<p>Meet the Chloe Ivory Chameleon, a chair that embodies sophistication, luxury, and elegance in one sleek design. Available exclusively for hire through Caterhire, these chairs have graced high-profile events, including the Academy Awards Governor&#39;s Ball and celebrity weddings. Completely versatile and customizable, the Chameleon Chair range offers an array of covers perfect for weddings or glamorous gala dinners. Available for both short-term and long-term hire, these chairs are sure to leave a lasting impression.</p> <h3>Key Features:</h3> <ul> <li>Chloe Ivory Chameleon chair available with a lycra topper.</li> <li>Eco-friendly, crafted from recyclable steel, complete with protective foot bungs.</li> <li>Designed for easy transport and storage in trolleys, accommodating 36 chairs.</li> <li>Optional full leg skirting available for added elegance.</li> <li>Silver legs enhance its sleek aesthetic.</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 43 cm / 17&quot;</li> <li>Width: 43 cm / 17&quot;</li> <li>Height: 97 cm / 38&quot;</li> <li>Case Size: 1 per case</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Pair the Ivory Chloe Chameleon chairs with our <a href="https://www.caterhire.ie/products/tables/banquet-dining-tables/">wooden banquet dining tables</a>, available in both round and rectangular shapes. Add a touch of elegance with white or ivory table linens to elevate your setting. These chairs fit 8 people comfortably around a 5ft round table and 10 around a 6ft round. For more advice on seating arrangements, explore our <a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">Wedding Seating Blog</a> for expert tips.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "ST001",
    name: "Salt White Chair",
    description:
      '<p>Looking for the perfect seating solution for your event? Our chic Salt White Chairs are just what you need. Combining both style and function, theyâ€™re perfect for any occasion, indoors or out. Theyâ€™re lightweight and stackable, making them not only easy to move but also simple to store. Whether you need them for a day or much longer, these chairs are ready to impress your guests.</p> <h3>Key Features:</h3> <ul> <li>Modern Salt White design</li> <li>Stackable for easy storage and transport</li> <li>Durable polypropylene construction</li> <li>Suitable for both indoor and outdoor use</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 44cm/17.32&quot;</li> <li>Width: 48 cm/18.9&quot;</li> <li>Height: 80 cm/31.5&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Want to create a memorable look for your event? Pair these Salt White Chairs with our stylish <a href="https://www.caterhire.ie/products/table-hire/">range of tables</a> for a complete and coordinated setup. If youâ€™re after expert advice about event furniture, check out our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">blog post</a> for some helpful insights.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "PALMCOF",
    name: "Palm Coffee Table / Stool",
    description:
      '<p>Transform any venue into a stylish sanctuary with our eye-catching Rattan Palm Coffee Table. With its chic glass top and elegant design, this piece effortlessly doubles as a coffee table or a stool, ensuring both elegance and function. Pair it seamlessly with the matching 2-seater bench and armchair for a truly polished look that will captivate your guests.</p> <h3>Key Features:</h3> <ul> <li>Elegant rattan frame paired with a sleek glass top providing a modern, timeless vibe.</li> <li>Functions as both a coffee table and a stool, making it perfect for diverse settings.</li> <li>Offers ample surface area while maintaining a sleek, space-saving profile.</li> </ul> <h3>Dimensions:</h3> <ul> <li><strong>Diameter:</strong> 80 cm / 31.5&quot;</li> <li><strong>Height:</strong> 30 cm / 11.8&quot;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Enhance your venueâ€™s ambiance by pairing this delightful coffee table with our <a href="https://www.caterhire.ie/new-products/palm-2-seater-sofa-for-hire/">Palm 2-Seater Sofa</a> and <a href="https://www.caterhire.ie/new-products/palm-armchair-for-hire/">Palm Armchair</a>. This coordinated setup promises a sophisticated flair. To delve deeper into hiring the perfect event furniture, read our insightful blog on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">All You Need to Know About Hiring Event Furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "BS1003",
    name: "Volt Barstool Black",
    description:
      '<p>Our Volt Black Barstool brings a sleek and contemporary look to any event setting. Designed for both style and comfort, this barstool requires no cushions, offering a supportive and ergonomic seating option. Built to withstand outdoor conditions, it is both durable and robust, making it perfect for a variety of event spaces.</p> <p><strong>Key Features:</strong></p> <ul> <li>Modern, sleek design</li> <li>Comfortable, no need for cushions</li> <li>Weather-resistant and highly durable</li> <li>Suitable for indoor and outdoor use</li> <li>Colour: Black</li> <li>Case size: 1 per case</li> </ul> <p><strong>CaterHire Top Tips:</strong></p> <p>Pair the Volt Black Barstool with our <a href="https://www.caterhire.ie/products/tables/cocktail-tables/">high-top tables</a> or <a href="https://www.caterhire.ie/illuminated-bars/">LED bar counters.</a>&nbsp;Whether for cocktail parties, corporate gatherings, or weddings, these stools provide both elegance and practicality. Check out our blog:<a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/"> All You Need to Know About Hiring Event Furniture.</a></p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "VOLTW",
    name: "Volt Barstool White",
    description:
      '<p>Introducing our Volt White Barstool, the perfect blend of style and comfort for any event setting. Its sleek, modern design makes it a standout addition to your dÃ©cor, while its ergonomic construction ensures a comfortable seating experience without the need for additional cushions. Built to brave the elements, this robust barstool is ideal for a variety of indoor and outdoor events.</p> <h3>Key Features:</h3> <ul> <li>Modern, sleek design</li> <li>Comfortable with no need for cushions</li> <li>Weather-resistant and highly durable</li> <li>Suitable for both indoor and outdoor use</li> <li>Colour: White</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Elevate your event space by pairing our Volt White Barstools with our <a href="https://www.caterhire.ie/pod-table-white-melamine-33-5in-for-hire/">high-top tables</a> or <a href="https://www.caterhire.ie/jumbo-bar-3ft/">LED bar counters</a> to create a chic and contemporary ambiance. Whether you&#39;re hosting a cocktail party, corporate gathering, or wedding, these stools bring both elegance and practicality. For more insights, check out our blog on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">hiring event furniture</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "VOLTBCH",
    name: "Volt Chair Black",
    description:
      '<p>Our Volt Black Chair effortlessly combines style and durability, making it a fantastic choice for any occasion, whether indoors or out. Its modern and sleek design fits seamlessly into any setting, and with its ergonomic build, you\'ll enjoy comfortable seating without the need for cushions. Ideal for both sunny gardens and bustling indoor events, this chair is designed to withstand the elements.</p> <h3>Key Features:</h3> <ul> <li>Suitable for all-weather use, ensuring versatility indoors and outdoors.</li> <li>Ergonomically designed for maximum comfort&mdash;no cushion needed.</li> <li>Crafted from UV-resistant, low-maintenance polypropylene preventing discolouration from sunlight.</li> <li>Built-in drainage hole for convenient water runoff.</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 50cm / 19.7"</li> <li>Width: 48cm / 18.9"</li> <li>Height: 81cm / 31.9"</li> </ul> <h3>Caterhire Top Tips:</h3> <p>For more insights on selecting the perfect event furniture, be sure to <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">check out our blog</a>. Plus, explore our extensive range of complementary products to complete your event setup.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "BS1004",
    name: "Zoey Bar Stool",
    description:
      '<p>Elevate your event with our stylish Zoey Bar Stool, the perfect mix of comfort and modern flair. Wrapped in soft velvet, this stool features a low backrest and sleek black-brown legs, creating a warm, chic look that&#39;s sure to impress. Whether it&#39;s a wedding reception, corporate event, or private party, the Zoey Bar Stool adds a sophisticated touch to any occasion!</p> <h3>Key Features:</h3> <ul> <li>Luxurious beige velvet upholstery</li> <li>Sleek profile with casual comfort</li> <li>Sturdy, elegant black-brown legs</li> <li>Versatile color scheme for any decor</li> <li>Comfortable cushioning for extended use</li> </ul> <h3>Dimensions:</h3> <ul> <li>Case Size: 1 Per Case</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Need guidance on selecting event furniture? Explore our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">blog post about hiring event furniture</a>. Additionally, consider pairing the Zoey Bar Stool with our elegant range of cocktail tables to complete the look for your next event.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "210224",
    name: "Alice Bar Stool Rose Gold",
    description:
      "<p>Discover the Alice Bar Stool, a chic and elegant option to elevate your bar space. Its chrome rose gold finish and plush velvet seat not only exude luxury but also provide exceptional comfort. Designed with versatility in mind, you can swap the velvet seat pads to perfectly match your event's colour palette, allowing for a seamless aesthetic. Ideal for various settings, this stool is both fashionable and functional.</p> <h3>Key Features:</h3> <ul> <li>Sleek and modern chrome rose gold frame</li> <li>Customizable with interchangeable velvet seat pads</li> <li>Available in Velvet Black, Black Boucle, Velvet Gold, Velvet Pink, and Velvet Green</li> <li>Robust and durable, ensuring long-lasting use</li> <li>Case Size: 1 Per Case</li> <li>Colour: Rose Gold Frame</li> </ul> <h3>Caterhire Top Tips:</h3> <p>Want to create an unforgettable event space? Explore our blog post <a href=\"https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/\">All You Need to Know About Hiring Event Furniture</a> for expert advice. Whether you're planning a lavish party or setting up a modern bar, the Alice Bar Stool can be adapted to suit your needs. Mix and match with our other stylish furniture pieces for a cohesive look that will impress your guests.</p>",
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "230224",
    name: "Ronda Chair",
    description:
      '<p>Meet the Ronda Stacking Chair, a stylish and versatile wooden seat perfect for any catering event. At just 4.6 kg, it&#39;s a breeze to handle and stack, making setups and teardowns simple. With options for natural rattan or black velvet seat cushions, the Ronda chair allows you to customize your eventâ€™s decor effortlessly.</p> <h3>Key Features:</h3> <ul> <li>Lightweight wooden frame weighing only 4.6 kg</li> <li>Interchangeable seat cushions for personalization</li> <li>Choice of seat options: Natural Rattan or Black Velvet</li> <li>Stackable for efficient storage</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 46.5 cm (18.3&quot;)</li> <li>Width: 41.5 cm (31&quot;)</li> <li>Seat Height: 41.5 cm (31&quot;)</li> <li>Full Height: 86 cm (33.9&quot;)</li> </ul> <h3>Caterhire Top Tips:</h3> <p>For more insights on selecting event furniture, check out our blog post on <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">hiring event furniture</a>. Customize your seating arrangement by mixing different cushion styles to match your event&#39;s theme. Explore our catalog for more complementary products that can elevate your event setup!</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "1083",
    name: "Smartie Bench White (5 seater)",
    description:
      '<p>Imagine adding a touch of modern flair to your next event with our stylish White Smartie Benches, available exclusively at Caterhire. Perfectly suited for exhibitions, trade shows, corporate events, and product demonstrations, these benches comfortably seat up to five attendees. With customisable seat pads, it\'s easy to tailor them to fit your event theme perfectly.</p> <h3>Key Features:</h3> <ul> <li>Stylish white solid wooden construction</li> <li>Removable seat pads for easy cleaning</li> <li>Indoor use only</li> <li>Seats up to 5 people</li> <li>Seat pads available in a variety of colours, including ivory, gold, green, blue and more.&nbsp;</li> </ul> <h3>Dimensions:</h3> <ul> <li>Length: 183 cm / 77&rdquo;</li> <li>Width: 50 cm / 20&rdquo;</li> <li>Height: 52 cm / 20&rdquo;</li> </ul> <h3>Caterhire Top Tips:</h3> <p>You might also enjoy exploring our Pop &amp; WOW Benches to bring additional colour and style to your event. Check out our Pop Bench Lime Green <a href="https://www.caterhire.ie/pop-bench-lime-green-for-hire/">here</a> and WOW Bench Saffron Yellow <a href="https://www.caterhire.ie/wow-bench-saffron-yellow-for-hire/">here</a>. For more insights into selecting the perfect furniture for your events, visit our <a href="https://www.caterhire.ie/blogall-you-need-to-know-about-hiring-event-furniture/">blog</a>.</p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "LECARM",
    name: "Milano Chair with Lecture Arm",
    description:
      "<p>Experience the seamless blend of style and practicality with our Milano Chair, which comes equipped with a convenient lecture arm. Perfect for lectures, conferences, and various events, this chair offers a comfortable seating solution that allows participants to easily take notes without the need for a separate desk. Stylish and highly functional, it's designed to enhance any professional gathering.</p> <h3>Key Features:</h3> <ul> <li>Lecture arm attached for easy note-taking</li> <li>Sleek and comfortable design</li> <li>Lightweight and easy to move</li> <li>Durable and sturdy construction</li> </ul> <h3>Dimensions:</h3> <ul> <li>Height: 80 cm / 31.5 inches</li> <li>Width: 55 cm / 21.7 inches</li> <li>Depth: 60 cm / 23.6 inches</li> </ul>",
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "HAMP01",
    name: "Hampton Wooden Folding Chair",
    description:
      '<p>The perfect choice for ceremonies, summer events, and stylish receptions.</p> <p>Make your event stand out with our elegant <em>Hampton Wooden Folding Chair</em>. Crafted from solid beech wood with a warm oak finish, this beautifully designed chair offers a refined look that blends natural charm with comfort. Its rattan mesh seat and backrest create a light and breathable seating experience, ideal for indoor summer occasions.</p> <p>Designed with both style and practicality in mind, the chair features a folding frame for easy transport and compact storage, making it a smart choice for weddings, ceremonies, and elegant receptions.</p> <p><strong>Now available for hire &ndash; book early to avoid disappointment!</strong></p> <p><strong>Key Features</strong></p> <ul> <li>Solid beech wood frame with stylish rattan mesh seat and back</li> <li>Warm oak finish for a natural, elegant look</li> <li>Folding design for convenient transport and storage</li> <li>Lightweight yet sturdy construction</li> <li>Indoor use only</li> </ul> <p><strong>&nbsp;</strong></p> <p><strong>Dimensions</strong></p> <ul> <li>Height: 83 cm / 32.7"</li> <li>Width: 40 cm / 15.7"</li> <li>Depth: 39 cm / 15.4"</li> <li>Seat Height: 46 cm / 18.1"</li> </ul> <p>&nbsp;</p> <p><strong>CaterHire Top tip:</strong></p> <p><span>Choosing the right seating for your event is crucial for both comfort and aesthetics. For more insights on selecting the perfect wedding seating, explore our&nbsp;</span><a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">blog article</a><span>. Additionally, consider pairing these chairs with our elegant table settings to elevate the ambiance of your event.</span></p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
  {
    sku: "CRB001",
    name: "Emily Crossback Chair Light Walnut",
    description:
      '<p>The <strong>Emily Crossback Chair</strong> is one of our newest and most stylish additions to our event seating range. With its distinctive crossback design and curved backrest, it brings a perfect blend of <strong>vintage charm and contemporary elegance</strong> to any event setting.</p> <p>Crafted from high-quality hardwood and finished in a beautiful <strong>light walnut tone</strong>, this chair adds warmth and character to weddings, private parties, corporate events, and styled photo shoots. It&rsquo;s a popular alternative to the traditional Chiavari chair and is especially suited for <strong>rustic, boho, and romantic themes</strong>.</p> <p><strong>Key Features:</strong></p> <ul> <li>Stylish crossback design with curved backrest</li> <li>Light walnut wood finish for a warm, natural look</li> <li>Interchangeable seat pad comes in mink, or request a different colour from the range we have to offer when ordering.&nbsp;</li> <li>Stackable and lightweight &ndash; easy to handle and store</li> <li>Ideal for weddings, corporate events, and private functions</li> </ul> <p><strong>Please Note:</strong> This chair is for <strong>indoor use or dry outdoor use under cover only</strong>. Suitable for use with a range of our <strong>event tables</strong> and <strong>linen options</strong></p> <p><strong>Dimensions:</strong></p> <ul> <li>Height: 89 cm/ 35"</li> <li>Width: 38 cm/15"</li> <li>Depth: 41 cm/16"</li> <li>Seat Height: 50 cm/19.6"</li> </ul> <p><strong>CaterHire\'s Top tip:</strong></p> <p><span>Choosing the right seating for your event is crucial for both comfort and aesthetics. For more insights on selecting the perfect wedding seating, explore our&nbsp;</span><a href="https://www.caterhire.ie/blogwedding-seating-which-is-best-for-me-/">blog article</a><span>. Additionally, consider pairing these chairs with our elegant table settings to elevate the ambiance of your event.</span></p>',
    links: "",
    blogs:
      "https://www.hireall.ie/blog/your-complete-guide-to-chair-hire-for-all-types-of-events/",
  },
];
async function main() {
  try {
    require("../config/config").config("ha");

    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const row = data[i];
      let product = await getProductBySku(row.sku);

      if (!product) {
        let products = await getAllProducts({ "sku:in": row.sku });
        if (!products.length || products.length > 1) {
          fs.appendFileSync(
            path.resolve(__dirname, `chair-errors.txt`),
            `no products (${products.length}) found on hireall for sku ${row.sku}`,
            { encoding: "utf-8" }
          );
          continue
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
      product.description = product.description.replace(
        match_src_name,
        destination_name
      );

      let additionalContext = "";
      let customFields = await getCustomFields(product.id);
      let newCustomFields = await generateCustomFields(
        product.description,
        hireallCustomFieldNames.chairs
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
          await applyCustomField(
            product.id,
            newCustomField.name,
            newCustomField.value
          );
          customFields.push(newCustomField as CustomField);
        }
      }

      if (customFields.length > 0) {
        additionalContext += `IMPORTANT The updated product description (key features section) should exclude information contained in these custom fields: """${customFields
          .map((c) => c.name + " => " + c.value)
          .join(" | ")}""".`;
      }

      if (row.links.length) {
        additionalContext += `Embed this link in the content where suitable: ${row.links}.`;
      }

      if (row.blogs.length) {
        additionalContext += `Embed this blog hyperlink in the content after the key features list in its own sentence/paragraph: ${row.blogs}. The anchor text can be discerned from the slug of the provided blog URL.`;
      }

      additionalContext +=
        "Take a moment to ensure all the commands in this prompt are satisfied.";

      const newDescription = await contentStructure(
        row.description,
        additionalContext
      );

      console.log(product!.description);
      console.log(`---- BEFORE ----`);
      console.log(newDescription);
      console.log(`---- AFTER ----`);

      await updateProduct(product!.id, {
        name: row.name,
        description: newDescription,
      });

      console.log(`updated  ${product!.id}`);
      addUpdatedItem(product!.id);
    }
  } catch (err) {
    console.log(err);
  }
}
main();

export async function contentStructure(
  productDescription: string,
  additionalContext: string
): Promise<string> {
  try {
    const content = hireallPrompt(
      htmlToText(productDescription),
      additionalContext
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
  fieldNames: string[]
): Promise<{ name: string; value: string }[]> {
  try {
    let response = await new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }).chat.completions.create({
      model: "o3-mini",
      messages: [
        {
          role: "user",
          content: `using the following product description 
          '''${htmlToText(productDescription)}''' 
          generate the applicable custom fields from this list of approved field names '''${fieldNames.join(
            ", "
          )}'''
          If a field/value is not applicable or not specified do not include it in your response. Content wrapped in html <!-- --> comments should not appear in property name 
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
