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

require("./config/config").config("ha");
const testing = true;
const customFieldType = hireallCustomFieldNames.glassware;
const data: {
  sku: string;
  description: string;
  blogs?: string[];
  links?: string[];
  name?: string;
}[] = [
    {
        "sku": "1000141",
        "name": "V-Shaped Wine Glass 33cl (Case Size 25)",
        "description": "A chic addition to elevate any celebration, this V-shaped wine glass from our standard glassware range combines elegance and modernity. Its sleek design brings a contemporary flair to wine service, making it perfect whether you're hosting an informal get-together or a sophisticated event. Enhance the experience of your guests with this versatile glass that fits seamlessly into both casual and upscale settings. Key Features: Modern V-shaped design Perfect for parties, events, and everyday use Part of our standard glassware range Washing of glassware included in hire price Case Size: 25 per case Capacity: 32.5cl / 11oz Caterhire Top Tips: Wondering how to prepare your bar for an event? Check out our handy blog post, How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event. It's filled with insightful tips to ensure youâ€™re well-prepared, no matter the occasion. Feel free to explore our full range of glassware and other party essentials to complement your event setup at Caterhire.ie.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "CG004",
        "name": "Diamond Amber Water Glass Tumbler (Case Size 1)",
        "description": "The Diamond collection originates from the centuries old Bohemian Crystal tradition to decorate glass and crystal with the lavishness of diamond shapes. Our timeless Diamond glassware will bring a joyful touch to any table setting with its shimmering appearance. Available in many tones that are inspired by the palette of the famous Dutch painter Rembrandt. Enriching your special gatherings, to enjoy good food and even better company, sharing stories and bringing up memories. The sturdy design will make it a startling element to special events like weddings.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000226",
        "name": "Tankard Glass with Handle 60cl (Case Size 16)",
        "description": "Our traditional pint glass embodies timeless elegance, perfect for enjoying your favorite lagers, beers, and ales. Its classic design and sturdy handle make it both stylish and practical for any event. Whether you're hosting a lively party or a casual get-together, this pint glass is sure to be a hit. Key Features: Classic tankard-style glass Handle for easy use Includes washing service in hire price Case size: 16 glasses per case Capacity: 59 cl / 20 oz Caterhire Top Tips: Wondering how many pint glasses you'll need for your event? As a general rule, plan for about 1.5 glasses per person for the first hour and 1 glass per hour for every subsequent hour. For more tips on planning the perfect event, check out our blog.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000128",
        "name": "Elegance Champagne Flute 18cl (Case Size 49)",
        "description": "Our Elegance champagne flutes are a favourite choice for any occasion, whether it's a wedding, a lively party or a corporate gathering. Crafted by one of Europeâ€™s premier glass manufacturers, these flutes offer a blend of style and functionality. With their graceful long stems and perfectly proportioned bodies, they're ideal for serving champagne or sparkling wines, adding a touch of sophistication to your event. Key Features: Elegant, long-stemmed design Well-proportioned with clean, simple lines Glassware washing included in rental price Packed securely in crates for transport Case size: 49 per case Capacity: 17.7cl / 6oz Caterhire Top Tips: Wondering how many glasses you might need for your celebration? We suggest planning for about 1.5 glasses per person during the first hour and 1 glass for each subsequent hour. For more handy advice on planning your event, check out our complete guide to bars and beverages.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000119",
        "name": "Whiskey Tumbler 24cl (Case Size 25)",
        "description": "Enjoy whiskey with our elegant Whiskey tumbler for hire, designed to enhance the drinking experience. Whether you're savouring a fine single malt or a smooth blend, this glass enhances both aroma and flavour. Ideal for any gathering, our Whiskey tumbler is as stylish as it is functional, making every sip a sophisticated pleasure. Key Features: Set includes 25 glasses per case Sleek, clear design Modern style Dishwasher cleaning included in hire price Capacity: 23.7 cl/8 oz Caterhire Top Tips: Explore our wide array of specialised glasses for other spirits like brandy and port to complement your whiskey selection. And donâ€™t forgetâ€”our hire services also cover large bags of ice to keep your drinks perfectly chilled! Check out our Blog: Caterhire's Essential Guide to Glassware Hire for Events!",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000228",
        "name": "Irish Coffee Glass with Handle 24cl (Case Size 25)",
        "description": "Delight your guests with our traditional Irish coffee glass, expertly designed for both function and flair. With a convenient handle, these glasses are perfect for Irish coffee or any hot beverage you fancy, like lattes or mulled wine. Their robust construction means they're ideal for keeping your drinks warm and your event stylish. Key Features: Classic design with handle for easy gripping Made from toughened glass, perfect for hot beverages Rental price includes washing services Option to choose Irish coffee glasses without handles Case Size: 25 per case Capacity: 23.7cl / 8oz Caterhire Top Tips: Our versatile Irish coffee glasses are great for various hot drinks, ensuring your guests are warm and satisfied. Pair them with Burco boilers or pump-action flasks from our hot beverages collection to keep your drinks hot throughout your event. Wondering how much to serve? Check out our comprehensive blog guide for all your bar and beverage needs.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000140",
        "name": "Diva Burgundy Glass 84cl (Case Size 16)",
        "description": "Elevate your event experience with our Diva collection from Schott Zwiesel, a range of elegant glassware designed to heighten the senses and let flavours and aromas truly blossom. Featuring a sleek, slender convex stem and a generous bowl, these large wine glasses are ideal for weddings, private dining and upscale gatherings. Key Features: Designed by the illustrious SCHOTT ZWIESEL Elegant crystal with a slender stem and large bowl Part of a sophisticated 4-piece range Includes washing of glassware in rental price Case size: 16 per case Capacity: 84cl /28.4oz Caterhire Top Tips: The Diva Burgundy glasses boast a spacious bowl, perfect for accentuating the rich depth of bold red wines and have become a trendy choice for serving chic Gin & Tonics. For more insights, explore Our Essential Guide to Glassware Hire to make the most out of your hire experience.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "180",
        "name": "John Rocha White Wine Glass 35cl (Case Size 1)",
        "description": "Experience sophistication at its finest with our exclusive John Rocha Waterford Crystal Glasses, perfect for intimate gatherings or special occasions. This exquisite piece from the Flow Collection encapsulates John Rocha's masterful design ethos, combining simple elegance with contemporary flair. Crafted from luxurious Wedgwood crystal, these glasses offer a refined aesthetic, making them an ideal choice for those who cherish elegant design. Key Features: Part of the stylish John Rocha Flow series Features clean lines with geometric detailing for a modern appearance Crafted from luxurious Wedgwood crystal Available in wine, flute, and water glass formats Professional glassware cleaning included Case Size: 1 per case Capacity: 35.4cl /12oz Caterhire Top Tips: Pair your John Rocha glasses with Jasper Conran Chinoiserie china from our collection for a stunning table setting. Enhance the elegance with Arthur Price silver cutlery to impress your guests with a truly refined dining experience. For more tips on hosting the perfect event, feel free to explore our blog directory.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000133",
        "name": "Diva Red Wine Glass 44cl (Case Size 25)",
        "description": "Immerse yourself in the world of exquisite wine drinking with our Diva collection from Schott Zwiesel, available for hire. These crystal glasses are designed to elevate every sip, enhancing both the flavour and aroma of your wine. With their sleek design featuring a delicate stem and ample bowl, they are well-suited for those savoury, complex wines that deserve a touch of elegance. Perfect for weddings, fine dining or any special occasion, the Diva Burgundy glass adds a sophisticated charm to your event. Key Features: Designed by the renowned Schott Zwiesel Elegant crystal with a slender convex stem Generous bowl size for enhanced wine aroma and flavour Includes washing with rental service Case size: 25 glasses per case Capacity: 44.4cl / 15oz Caterhire Top Tips: Enjoying a glass of Burgundy or Beaujolais wine? The Diva Burgundy glass is tailored to allow these wines to breathe, enriching your tasting experience. For more tips on how to plan beverages for your event, check out our informative blog post, where you'll find guidance on beverage planning for any occasion.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "CG001",
        "name": "Diamond Green Wine Goblet 21cl (Case Size 25)",
        "description": "Our beautiful Diamond Stemmed Glass range is here to elevate any table setting with effortless elegance. Crafted in Portugal with high-quality crystal, these glasses boast a striking cut facet design that plays with light in the most charming way. Add a splash of colour to your dÃ©cor with their unique hues, perfect for both winter and summer gatherings. Whether serving wine or water, these glasses bring a sophisticated and contemporary appeal to your event. Key Features: Stunning green diamond-cut crystal glass Perfect for serving wine or water Available in a variety of colours to suit any theme Washing of glasses included in rental price Case Size: 25 per case Colour: Green Capacity: 20.7cl / 7oz Caterhire Top Tips: Elevate your event's table setting by pairing these exquisite glasses with our elegant crockery collections from Wedgwood and Jasper Conran for a timeless appeal. For more inspiration, check out our Essential Guide to Glassware Hire for Events.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000134",
        "name": "Diva White Wine Glass 30cl (Case Size 36)",
        "description": "Indulge in a refined drinking experience with our Diva collection, crafted by the esteemed Schott Zwiesel. These exquisitely designed crystal glasses enhance the flavours of your beverages, combining elegance and functionality. A slender stem and tall body exude sophistication, making these glasses the perfect choice for weddings, special occasions, and upscale events. Let each sip be a celebration of style and taste. Key Features: Designed by world-renowned SCHOTT ZWIESEL Elegant crystal design with a slender stem and tall body Washing of glassware included in hire price Case Size: 36 per case Capacity: 29.6cl / 10oz Caterhire Top Tips: Elevate your next drinks reception or fine dining event with our impressive range of hire options. From serving trays to wine buckets, we have you covered for every detail. Discover more in Caterhire's Essential Guide to Glassware Hire for Events. Explore our selection of buffet platters and trays, ice and wine buckets, and bar counters to complement your event perfectly.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000103",
        "name": "Paris Wine Goblet 18cl (Case Size 36)",
        "description": "This classic wine glass is an excellent choice for anyone in need of affordable and practical glassware for events. Its small, rounded bowl makes it perfect for serving modest amounts of red or white wine, and it's also a great option for enjoying mulled wine during festive occasions. Easy to transport and versatile, this wine glass is sure to enhance any event with its traditional charm. Key Features: Ideal for casual and large-scale events Round bowl enhances aroma and tasting experience Perfect for serving mulled wine in winter months Case Size: Supplied in crates of 36 for easy transport Capacity: 17.7cl / 6oz Caterhire Top Tips: For a successful event, check out our blog article on estimating drink quantities: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000181",
        "name": "Black Salto Glass 33cl (Case Size 16)",
        "description": "Enhance your dining experience with our Salto glass, a spectacular choice for any event. Featuring a unique curved silhouette and an arresting black finish, this glassware piece brings a modern flair to your table. Whether you're serving water, cocktails, brandy or dessert, the Salto glass promises to add a splash of elegance to both casual and formal gatherings. Key Features: Stylish black curved tumbler for added table contrast Perfect for water, cocktails, brandy, or desserts Glassware washing included in rental price Available in cases of 16 glasses Capacity: 32.5cl / 11oz Caterhire Top Tips: For an eye-catching table setup, pair the Salto Black Tumbler with our black crockery range or create a stunning contrast with coloured glassware. Its versatile design also makes it a standout choice for dessert stations or drinks receptions. Take a look at our Essential Guide to Glassware Hire for Events for more expert tips on perfecting your glassware selection.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000175",
        "name": "Slim Jim 30.3cl (Case Size 36)",
        "description": "Our Slim Jim Glass range for hire is a beloved choice and a staple at events of all kinds. With its sleek and slender design, this adaptable tumbler brings a contemporary flair to any occasion. Perfect for serving everything from water and soft drinks to beers, cocktails, and mixers, it's a must-have for your next event. Key Features: Perfect for all event types Straight, slim design Suitable for water, beer, soft drinks, cocktails & mixers Equivalent to half-pint size Case Size: 36 per case Washing included in hire price Capacity: Â 30.3cl / 10.25oz Caterhire Top Tips: Mix and match Slim Jim glasses in various sizes to add a dynamic look to your table setting. Check out our blog for more insights on event planning, like How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event. For further details and ideas, visit our blog directory.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000104",
        "name": "Paris Wine Goblet 24cl (Case Size 25)",
        "description": "This classic-style wine glass for hire is a favourite for events. Its elegant design and functionality make it perfect for serving red wine or mulled wine. With a rounded bowl, it enhances the wine's aroma, ensuring a delightful tasting experience for your guests. Key Features: Perfect for casual and large-volume events Rounded bowl enhances wine aromas and improves tasting experience Ideal for serving red wine or seasonal mulled wine Case Size: Supplied in crates of 25 for transport and storage Capacity: 23.7cl/8oz Caterhire Top Tips: Wondering how many drinks you'll need for your event? Check out our complete guide to bars & beverages which can be a lifesaver when planning your next gathering.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "VG01",
        "name": "Victoria Gold Rim Red Wine Glass 30cl (Case Size 16)",
        "description": "Our charming Gold Rim glassware for hire is a delightful choice for weddings and special occasions. These crystal red wine glasses, crafted in Europe, bring elegance to any event with a slender stem and a tastefully flared bowl. Adorned with a finely etched gold pattern around the rim, they add a touch of luxury to your celebration. Key Features: European craftsmanship Elegant gold rim design Comes in packs of 16 glasses Complimentary glass washing included Capacity: 30cl / 10.1oz Caterhire Top Tips: To create a breath taking table setting, pair our gold rim glassware with the Gold Rim Charger Plate and elegant Victoria Gold cutlery. This combination will enhance the sophistication at your event, ensuring your guests are dazzled by the attention to detail. For more tips on planning the perfect event, check out our blog directory.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000176",
        "name": "Slim Jim 21cl (Case Size 36)",
        "description": "Perfect for any occasion, our 21cl Slim Jim glass is a favourite. With its sleek and slender design, this glass brings sophistication to your weddings, corporate gatherings, or casual celebrations. It's ideal for serving refreshing juices and water, making it a versatile addition to any event setup. Key Features: Comes in a case of 36 glasses Perfect for serving water and juices Glassware washing included in the hire price Capacity: 21.4cl / 7.25oz Caterhire Top Tips: Wondering how many drinks you'll need for your upcoming event? Be sure to check out our insightful guide here to ensure you have just the right amount of beverages to delight your guests. Explore more helpful tips on our blog to make your event planning a breeze!",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "SR003",
        "name": "Silver Rim Red Wine Glass 30cl (Case Size 16)",
        "description": "Our Silver Rim Red Wine Glass for hire strikes the perfect balance between elegance and sophistication, making it a standout choice for weddings, formal dinners and luxury events. This stunning glass collection doesn't stop at red wine; it also features options for white wine, champagne and water. Elevate your event experience with these beautiful pieces that bring a touch of class and refinement to any occasion. Key Features: Elegant silver rim Slender stem with a flared bowl Available in wine, champagne and water glass styles Washing included in rental price Case Size: 16 per caseÂ  Capacity: 29.6cl / 10oz Caterhire Top Tips: To really impress your guests, pair these exquisite glasses with Arthur Price silver cutlery and Wedgwood white crockery. If you're planning on serving drinks, don't miss our blog post \"How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event\" for all the insights you'll need.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000476",
        "name": "Pichet Water Jug 100cl (Case Size 1)",
        "description": "The Pichet Water Jug brings a touch of elegance and practicality to your beverage service, making it a perfect choice for any event. Whether you're hosting a sophisticated dinner or a casual get-together, this jug is designed to meet all your needs. Key Features: Complements any table setting Ideal for serving water, juice, or cold drinks Suitable for formal and informal occasions Case Size: 1 per case Washing included in hire priceÂ  Capacity: 100cl/33.8oz Caterhire Top Tips: Wondering how many drinks you'll need for your event? Don't miss our comprehensive guide: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event. It's packed with useful insights to help you plan perfectly. For more tips and ideas, visit our blog directory.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000116",
        "name": "Plain Water Jug 100cl (Case Size 1)",
        "description": "Looking to serve beverages in style at your next event? Our Plain Water Jug is the perfect addition to any gathering, from weddings and parties to meetings and conferences. It's designed to keep your guests refreshed, whether they're sipping on water or juice. Plus, with its sleek and simple design, it complements any event decor effortlessly. Key Features: Versatile for serving a variety of cold beverages Includes glassware washing Sold individually for easy planning Case Size: 1 per caseÂ  Capacity: 100cl / 33.8oz Caterhire Top Tips: Planning the right amount of drinks for your event can be tricky. Check out our complete guide on planning beverages for any event to ensure you hit the mark every time.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000111",
        "name": "Port Glass 6cl (Case Size 10)",
        "description": "Our stemmed port glass is the perfect addition to any sophisticated gathering. Designed to bring out the best in your port or sherry, its elegant design not only looks stunning but also enhances the aroma and flavours of your drink, ensuring a delightful experience for your guests.Â  Key Features: Wide bowl with a tapered mouth for enhanced aroma and taste. Ideal for serving port, sherry, and other dessert wines. Washing of glassware included in hire price. Case Size: 10 per case. Capacity: 5.9cl / 2oz. Caterhire Top Tips: To complete your drinkware collection, explore our range of speciality glasses. For tips on beverage quantities for your event, don't miss our insightful blog post on how many drinks you'll need for any occasion.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000158",
        "name": "Shot Glass Hot Shot 6cl (Case Size 10)",
        "description": "Add a touch of sophistication to your event with our Hot Shot Glass. This elegant glassware features a sleek, tapered design that enhances the presentation of your drinks while also offering easy handling. Perfectly suited for serving spirits, liqueurs or mini desserts. Key Features: Modern design with a tapered shape Double shot glass measure â€“ 6cl capacity Perfect for spirits, shots, or layered desserts Washing of glassware included in hire price Case Size: 10 per caseÂ  Capacity: 5.9cl / 2oz (Double Shot) Caterhire Top Tips: For a creative twist, use the Hot Shot Glass to serve elegant amuse-bouches or layered mini desserts that will surprise and delight your guests. Want to know how many drinks youâ€™ll need? Check out our blog for your complete guide to bars & beverages for any event.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000227",
        "name": "Sling Beer Glass 41cl (Case Size 36)",
        "description": "Our Sling Glass is your go-to choice for stylish and durable drinkware. It's perfect for showcasing your favourite wheat beers or crafting long, invigorating cocktails. Ideal for weddings, corporate gatherings, or casual parties, these glasses effortlessly blend elegance with functionality, ensuring every sip is a delight. Key Features: Case Size: 36 per case Tall and robust design Perfect for wheat beers and long cocktails Washing included in hire price Capacity: 41.40 cl / 14 oz Caterhire Top Tips: For an elevated drink experience, the Sling Glass is an excellent vessel for cocktails like the Singapore Sling, Mojito, or Tom Collins. Consider pairing your selection with our wide range of barware and accessories available on our site to create the perfect setup for your event. Check out our blog directory for more ideas and inspiration on party planning.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000146",
        "name": "Martini Glass 21cl (Case Size 16)",
        "description": "Elevate your event with our Classic Martini Glass. Perfect for serving martinis and a variety of stylish cocktails, this glass combines both elegance and functionality. Its V-shaped bowl is complemented by rolled edges, ensuring durability and sophistication. Whether it's a small gathering or a high-volume event, this glass is the go-to choice for a refined drinking experience. Key Features: V-shaped bowl design for a classic look. Rolled edges to prevent chipping and enhance durability. Ideal for serving martinis and an array of stylish cocktails. Sturdy yet elegant, perfect for high-volume service. Case Size: 16 Per Case Capacity: 20.7cl / 7oz Caterhire Top Tips: To ensure your event is a hit, consider how many drinks you might need. Check out our Complete Guide to Bars & Beverages for Any Event for valuable insights. Whether you're planning a cocktail party or a themed event, pairing these martini glasses with complementary products from our collection can create a seamless and sophisticated look for your guests.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000102",
        "name": "Half Pint Glass 30cl (Case Size 36)",
        "description": "Perfectly complement your event with our Tulip beer glassâ€”a favourite in the hospitality world and an ideal choice for your parties and events. Its classic tulip shape not only enhances the aromatic experience but also adds a touch of elegance to beers, ciders, lagers, and ales. Delight your guests with glassware that doesn't just serve but elevates your beverage presentation. With washing included in the rental price, you can focus on your event while we handle the clean-up. Key Features: Classic tulip shape enhancing aroma and appearance Ideal for serving beers, ciders, lagers, and ales Washing included in rental price Case Size: 36 pieces per case Capacity: 29.6cl/10oz Caterhire Top Tips: Planning an event and unsure how much to drink to have on hand? Check out our insightful blog post for a complete guide. Itâ€™s filled with practical tips to ensure your bar is stocked appropriately and your guests are happy. For more event planning inspiration, make sure to visit our blog directory.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000147",
        "name": "Champagne Saucer 12cl (Case Size 25)",
        "description": "Elevate your event with our charming vintage-style champagne saucers, the perfect choice for weddings and themed parties. Known also as champagne coupes, these glasses add an air of timeless elegance to any occasion with their classic stem and broad, shallow bowls. Whether youâ€™re serving champagne or sparkling wine, these glasses promise to deliver a delightful and stylish drinking experience. Key Features: Traditional vintage-style champagne glass Wide, shallow bowl for distinctive presentation Includes washing service as part of the rental price Complementary champagne flutes available Packed in crates for safe transport (25 per case) Capacity: 11.8 cl / 4 oz Caterhire Top Tips: Did you know there are three main types of champagne glasses? While flutes are best for preserving bubbles, the saucer is ideal for adding a touch of vintage glamour to your event. For more information on choosing the right glassware for your special occasion, check out our Essential Guide to Glassware Hire for Events. And if you're interested in complementary styles, don't miss our Diva Champagne Flute 7oz.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "SR004",
        "name": "Silver Rim White Wine Glass 21cl (Case Size 16)",
        "description": "Ideal for elevating the elegance of weddings, banquets, or any formal gathering, our Silver Rim White Wine Glasses will undoubtedly impress your guests. With their slender stems, flared bowls, and delicate silver rims, these glasses embody both sophistication and style. Each glass is part of a handy set, and with washing included in the hire price, itâ€™s a luxurious choice thatâ€™s as convenient as it is stylish. Key Features: Elegant silver rim Sleek, slender stem Flared bowl design 16 glasses per case Washing included in hire price Capacity: 20.7cl / 7oz Caterhire Top Tips: To create a truly cohesive table setting, consider pairing these exquisite glasses with our Arthur Price silver cutlery and Wedgwood white crockery. Whether you're hosting a small gathering or a lavish celebration, making sure you have enough drinks is crucialâ€”check out our blog for guidance on how many drinks youâ€™ll need for any event. For more event tips and inspiration, visit our blog directory.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000138",
        "name": "Slim Jim 35cl (Case Size 36)",
        "description": "Raise a toast with our most sought-after Slim Jim glassware! These elegant 35cl tumblers, with their tall and stylish design, are a hit at every event â€” from sophisticated weddings to professional corporate gatherings. Perfect for serving a wide array of beverages, they'll undoubtedly elevate the presentation at your occasion. Key Features: Sleek, slender shape perfect for diverse drinks Includes glassware washing in the hire price Case Size: 36 per case Capacity: 35cl/12oz Caterhire Top Tips: Planning how many beverages youâ€™ll need for your event can be tricky. Luckily, we've got you covered! Check out our complete guide to bars and beverages to ensure your drinks service is a hit.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "182",
        "name": "John Rocha Water Glass 47cl (Case Size 1)",
        "description": "Looking to elevate your next gathering? Our John Rocha Waterford Crystal Glasses are a chic choice for everything from cosy dinner parties to grand celebrations. These exquisite glasses, part of the Flow Collection, capture the essence of modern elegance with their sleek lines and bold geometric patterns. Crafted with premium Wedgwood crystal, they define sophistication and timeless artistry. Key Features: Designed by John Rocha as part of the iconic Flow Collection. Distinctive sleek lines paired with a bold geometric motif. Crafted from high-quality Wedgwood crystal. Available in wine, flute, and water glass options. Includes glassware washing with rental. Case Size: 1 per case Capacity: 47.3cl / 16oz Caterhire Top Tips: Pair your crystal glasses with Jasper Conran Chinoiserie china and Arthur Price silver cutlery for a truly sophisticated dining experience. This combination will add a touch of elegance that impresses your guests. For more inspiration, explore our Caterhire blog.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000112",
        "name": "Liqueur Glass 3cl (Case Size 10)",
        "description": "Indulge your guests with our sleek and sturdy liqueur glass, perfect for serving a delightful after-dinner drink. Whether you're hosting a formal dinner party or a chic gathering, these elegant and compact glasses are ideal for serving liqueurs, digestifs, or even shots. Available in convenient packs of 10, they offer a dashing touch to any event. Complement your glassware selection with our brandy, sherry, and port glasses for a complete set. Key Features: Stylish design with everyday practicality in mind. Perfect size for serving liqueurs and after-dinner drinks. Case Size: Conveniently supplied in sets of 10 glasses. Glass washing included in the hire cost. Matching brandy, sherry, and port glasses available for hire. Capacity: 3cl / 1oz Caterhire Top Tips: Elevate your hosting experience by exploring our Bar and Beverage Guide. Here you'll find essential insights to perfect your drink service and pairings, ensuring an unforgettable event.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000132",
        "name": "Cabernet Red Wine Glass 35cl (Case Size 25)",
        "description": "Explore elegance and functionality with our Cabernet wine glasses, perfect for weddings, parties, and corporate events. European design elevates the wine-tasting experience with an exquisite tall shape that enhances the succulent aromas of red wines. These glasses seamlessly blend style and practicality, making them ideal for both formal and casual gatherings. Enhance your special occasions with our sought-after glassware. Key Features: Stylish and elegant design for red wine Hospitality-grade quality Includes glassware washing in rental Safe transport in crates (25 glasses per case) Available in red, white and champagne options Capacity: 35cl / 12oz Caterhire Top Tips: Planning the perfect event involves anticipating your guests' needs. As a rule of thumb, prepare for 1.5 wine glasses per guest for the first hour of your event, and 1 glass per person for each subsequent hour. To ensure everyone's glass stays filled, consider rounding up slightly to cover any breakages or misplaced glasses. For more on this, check out our Essential Guide to Glassware Hire for Events. To further elevate your event, explore our Cabernet White Wine Glass for white wines and our vintage-inspired Champagne Saucer for bubbly. Additionally, discover our range of bar counters to complete your setup.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "CG002",
        "name": "Diamond Pastel Blue Wine Goblet 21cl (Case Size 25)",
        "description": "Our stunning Diamond Stemmed Glass collection is perfect for adding a touch of elegance to your table setting, with its exquisite design from Portugal. These high-quality crystal glasses boast a dazzling cut facet that beautifully refracts light, making your event's ambiance truly sparkle. Offered in a variety of striking colours, they're the ideal choice to elevate your table dÃ©cor in any season. Whether you're serving wine or water, these glasses bring a chic yet contemporary feel to your gathering. Key Features: Gorgeous pastel blue diamond-cut crystal glass Perfect for wine or water service Available in a variety of colours to complement any theme Glass washing included in rental fee Colour: Pastel Blue Case Size: 25 Per Case Capacity: 20.7 cl / 7 oz Caterhire Top Tips: For a timeless table setting, consider pairing these lovely glasses with our elegant Wedgwood Fine White Bone China or Jasper Conran collections. Curious about choosing the right glassware for your event? Check out our Essential Guide to Glassware Hire for Events for more useful insights.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000130",
        "name": "Cabernet White Wine Glass 24cl (Case Size 36)",
        "description": "Our Cabernet range of wine glasses is your go-to choice for weddings, parties, and corporate events. Crafted by one of Europe's top glass manufacturers, these white wine glasses offer an elegant, tall design that beautifully accentuates the subtle aromas and crisp flavours of your favourite whites. Perfect for both sophisticated dining and casual get-togethers, these versatile glasses add a touch of class to any event. Key Features: Stylish and elegant white wine glass Hospitality quality glassware Washing of glassware included in rental price Available in red, white, and champagne styles Packed in crates for safe transport (36 glasses per case) Capacity: 24.7cl / 8oz Caterhire Top Tips: When planning your event, a good rule of thumb is to have 1.5 glasses per person for the first hour, and 1 glass per person for each subsequent hour. It's wise to have a few extras on hand to accommodate any unexpected needs. For more insights on glassware hiring, check out our Essential Guide to Glassware Hire for Events. You might also like to explore our Cabernet Red Wine Glass 35cl for a perfect pairing.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000107",
        "name": "Slim Jim 30cl (Case Size 36)",
        "description": "Looking for a glass that can handle any drink you throw its way? The Slim Jim Glass is your go-to choice for any gathering, whether it's BBQ or a cocktail party. Its sleek, slender design is not just stylish but also versatile. Plus, with glass washing included in the hire price, all you need to focus on is enjoying the event. Key Features: Suited for all types of events Slender, straight design Perfect for beer, water, soft drinks, cocktails, and mixers Washing included in the hire price Case Size: 36 per case Capacity: 30cl / 10oz Caterhire Top Tips: Mix and match Slim Jim glasses in various sizes to add a dynamic touch to your drink service. If you're unsure about the quantities needed for your next event, don't miss our handy guide: \"How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event\". For more useful tips and advice on hosting the perfect event, visit our blog directory.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000135",
        "name": "Diva Champagne Flute 21cl (Case Size 36)",
        "description": "Our Diva crystal champagne flutes are the perfect blend of elegance and functionality, making any celebration feel special. With their slender stems and tall, graceful design, these flutes ensure your champagne or sparkling wine is served in style. Designed by the esteemed Schott Zwiesel, this high-quality glassware will elevate your events, be it weddings, parties, or other grand gatherings. Key Features: Designed by world-renowned SCHOTT ZWIESEL Ideal for serving champagne or sparkling wine Washing included in rental price Case Size: 36 per case Capacity: 20.7cl / 7oz Caterhire Top Tips: Chill your champagne perfectly by placing the bottle in an ice bucket for a cool 20 minutes before serving. Discover more tips in our blog, How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event. Also, check out our range of ice buckets to keep your drinks perfectly chilled. For more inspirational tips and ideas, visit our blog.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "SR001",
        "name": "Silver Rim Champagne Glass 18cl (Case Size 36)",
        "description": "Add a touch of timeless elegance to your events with our Silver Rim Champagne Glass. These finely crafted glasses are perfect for weddings, galas, and upscale dining. With their delicate silver rims and elegant design, they are sure to enhance any table setting. Available in various types, including red and white wine, champagne and water glasses, they cater to all your dining needs. Key Features: Exquisite silver rim design Elegant shape with a slender stem Available in red wine, white wine, champagne and water glasses Case Size: 36 glasses per case Washing included in hire price Capacity: 17.7cl / 6oz Caterhire Top Tips: Complete your table setting by pairing these glasses with our Arthur Price silver cutlery and Wedgwood fine white bone china for a stunning look. For more helpful tips on event planning, check out our blog article on How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event. For more articles and insights, visit our blog.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000139",
        "name": "Shot Glass 3cl (Case Size 10)",
        "description": "Raise a toast or delight your guests with delicious mini desserts served in our sleek, fluted shot glasses, perfect for adding that touch of elegance to any event. Our shot glasses are durable and reliable, ensuring a spill-free, enjoyable experience. Plus, with washing included in the hire price, your post-event clean-up becomes a breeze. Key Features: Sturdy, fluted design for added elegance Serves a single measure of 3cl (1oz) Easy cleaning included in hire fee Case Size: 10 per case Capacity: 3cl/1oz Caterhire Top Tips: Planning your bar perfectly can make a huge difference at your event. Check out our complete guide to how many drinks you'll need to ensure you're well prepared and stress-free on the big day. For more helpful advice and resources, explore our blog directory.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000148",
        "name": "Black Neo Wine Glass 35cl (Case Size 1)",
        "description": "Our Black Neo glasses bring a touch of sparkle and elegance to your dining experience. With their slender stems and perfectly proportioned bodies, these glasses add a chic flair to any contemporary table setting. Ideal for both water and wine, they are a versatile choice for intimate gatherings or elegant corporate events. Key Features: Sleek black glass for a modern edge Suitable for both water and wine Adds dramatic contrast to tableware Inclusive of washing costs in rental price Case Size: 1 per case Capacity: 35.4 cl / 12 oz Caterhire Top Tips: Enhance your table's style by pairing these eye-catching glasses with our black crockery range for a seamless look. Complete the table setting with sleek modern flatware and minimalist linens to let the black glassware stand out. For expert advice on selecting the perfect glassware for your event, explore our Essential Guide to Glassware Hire for Events.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1071",
        "name": "Irish Coffee Glass without Handle 24cl (Case Size 36)",
        "description": "Enjoy your favourite winter beverages in style with our sleek, handle-less Irish Coffee Glass available for hire. Crafted from toughened glass, this modern design reinvents the traditional look while ensuring durability and safety for serving hot drinks. Whether you're sipping on an Irish coffee, mulled wine, or hot whiskey, this glass is a chic and practical addition to any event. Ideal for weddings, parties, and gatherings, it's a sophisticated way to warm up any occasion. Key Features: Minimalist design with a modern twist on the traditional Irish coffee glass. Engineered to handle hot liquids with ease. Perfect for serving Irish coffee, mulled wine, hot whiskey and lattes. Glassware washing is included in the rental price. Handle options also available. Case Size: 36 per case Capacity: 23.7cl / 8oz Caterhire Top Tips: Planning a gathering with a warm drinks station? Pair your Irish coffee glasses with our 23-litre Burco boilers or 3-litre pump-action flasks to make sure your hot beverages are always ready to serve. Enhance your eventâ€™s warm beverage station and keep your guests cosy and satisfied! For more event planning tips, check out our blog.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "181",
        "name": "John Rocha Red Wine Glass 59cl (Case Size 1)",
        "description": "Discover the elegance of our exclusive John Rocha Waterford Crystal Glasses, perfect for intimate dinner parties or special occasions. These exquisite glasses, part of the acclaimed Flow Collection, embody John Rochaâ€™s signature style with their modern and sophisticated look. Made from luxurious Wedgwood crystal, these pieces are sure to impress your guests and add a touch of contemporary flair to your table setting. Key Features: Prestigious John Rocha Waterford Flow Collection. Features clean lines with a striking geometric motif. Luxuriously crafted from Wedgwood crystal. Available in wine, flute, and water styles. Includes washing in the rental price. Case Size: 1 per caseÂ  Capacity: 59.1cl / 20oz Caterhire Top Tips: Complete your table setting by combining these stunning glasses with Jasper Conran Chinoiserie china for an exquisite, designer look. For an extra touch of elegance, pair them with our Arthur Price silver cutlery. Explore our Jasper Conran collection and Arthur Price silver cutlery to elevate your dining experience. If you need more inspiration, visit our blog directory for various insights and ideas.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000101",
        "name": "Pint Glass 59cl (Case Size 25)",
        "description": "The Tulip Beer Glass is an iconic staple in the world of hospitality, beloved for its elegant design and functional features. Its distinctive tulip shape is more than just a look; itâ€™s crafted to retain frothy foam and enhance the rich aromas of your favorite brews, making it a go-to choice for beer enthusiasts at parties, festivals, and casual get-togethers. Whether you prefer beer, lager, cider, or ale, this glass promises an elevated drinking experience, every time. Key Features: Perfect for beers, ciders, lagers, and ales. Case Size: packed conveniently in cases of 25. Glass washing included in rental price. Capacity: 59cl/20oz Caterhire Top Tips: To make the most of your event, check out our blog on how many drinks you'll need for any occasion.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000136",
        "name": "Diva Water Glass 47cl (Case Size 25)",
        "description": "Our Diva crystal water glasses for hire are crafted to enhance any gathering with a touch of sophistication. Featuring a slender stem and graceful design, these glasses align perfectly with the Diva wine and champagne collections. Ideal for weddings and other special occasions, they elevate your table setting while offering a comfortable and polished drinking experience. Key Features: Designed by world-renowned SCHOTT ZWIESEL Elegant crystal design with slender stem and tall body Includes washing of glassware in hire price Case Size: 25 per caseÂ  Capacity: 47.3cl / 16oz Caterhire Top Tips: Weâ€™ve got everything you need for hosting a drinks reception or fine dining event. From buffet platters and trays to wine buckets and bar counters, your event will be well-equipped. For more insights, check out our Essential Guide to Glassware Hire for Events on our blog.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000164",
        "name": "Cubix Martini Bowl with Clear Cube 21cl (Case Size 10)",
        "description": "Looking for a unique way to present your drinks or appetizers? Our Cubix Martini Glass is just the ticket! This contemporary piece combines a stemless martini bowl with a chic, cube-shaped acrylic base, bringing a splash of modern flair to any occasion. Ideal for vibrant martinis or eye-catching appetisers, it's sure to become a favourite talking point among your guests. Stemless cocktail bowl with cube-shaped acrylic base Perfect for serving cocktails or appetisers Washing of glassware included in rental price Ideal for stylish and themed events Case Size: 10 Per Case Capacity: 20.7cl / 7oz Caterhire Top Tips: Unlock the full potential of your drinks menu with our complete range of cocktail glasses. To keep those cocktails perfectly chilled, consider adding a large bag of ice to your order. For more insights, check out our Essential Guide to Glassware Hire for Events.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "VG03",
        "name": "Victoria Gold Champagne Glass 6oz (Case Size 36)",
        "description": "Our exquisite Gold Rim glassware is very popular to hire for weddings and special events. These European designed crystal glasses feature a slender stem, gently flared bowl with a finely etched gold pattern around the rim. Key Features   European crafted gold rim glasses Each pack contains 36 glasses Pair with our gold tableware collection Washing of glasses included in rental charge  Dimensions: 6oz/17cl Caterhire Top Tips  Create a stunning table setting by pairing our gold glassware with our Gold Rim charger plates, gold cutlery and Lady Victoria chair.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000160",
        "name": "Shot Glass Islande (Slim) 6cl (Case Size 10)",
        "description": "Looking to elevate your drink presentation? Our Islande Shot Glass, available for hire, is just what you need! Its sleek, tall design is perfect for spirits, liqueurs, or even creative mini desserts. Whether you're hosting a fancy cocktail party or a casual gathering, this double shot glass will help you serve beverages in style. Key Features: Slim and tall contemporary design Double shot glass measure with a 6cl capacity Ideal for spirits, shots, or mini dessert servings Case Size: 10 glasses per case Washing of glassware included in hire price Capacity: 5.9cl / 2oz Caterhire Top Tips: For event planning tips, don't miss our blog on drink quantities. Itâ€™s your go-to guide for ensuring you have just the right amount of beverages for any occasion. Visit our full blog directory for more expert advice and inspiration.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000106",
        "name": "Tulip Champagne Flute 17cl (Case Size 36)",
        "description": "The Tulip champagne flute is a favourite choice for banqueting events and drinks receptions, offering a blend of practicality and elegance. Its design features a shorter stem, enhancing its sturdiness and making it ideal for quick service in busy settings. These flutes will add a touch of sophistication to any occasion while ensuring functionality remains a top priority. Key Features: Simple and stylish design Sturdy and stable construction Washing included in hire price Packed in crates for easy transport Case Size: 36 per case Capacity: 17.7cl / 6oz Caterhire Top Tips: To ensure your champagne or sparkling wine is perfectly chilled, fill an ice bucket and allow the bottle to cool for about 30 minutes. For more insights on creating the perfect event atmosphere, check out our blog directory. Happy celebrating!",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "VG04",
        "name": "Victoria Gold Rim Water Glass 33cl (Case Size 16)",
        "description": "Our elegant Gold Rim glassware for hire is a favourite for those hosting weddings and special events. Featuring a subtle European design, these crystal water glasses add a touch of sophistication to any occasion. With a finely etched gold pattern gracing the rim, they are sure to enhance the overall aesthetic of your table setting. Key Features: Beautifully crafted in Europe with a refined gold rim Ideal pairing with our gold tableware collection Conveniently include washing service as part of the hire Case Size: 16 per case. Capacity: 32.5cl / 11oz Caterhire Top Tips: For a breathtaking table arrangement, combine our exquisite gold glassware with the Gold Rim charger plates available here and fine Gold Cutlery, which you can explore here. To learn more about creating memorable events, visit our blog, where we share valuable insights and ideas.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000144",
        "name": "Wine Tasting Glass 21cl (Case Size 36)",
        "description": "Elevate your wine-tasting events with our Wine Tasting Glass, designed to meet the ISO standards used by wine connoisseurs globally. This versatile glass is perfect not only for wine tastings but also for serving aperitifs and liquors. Enjoy a heightened sensory experience with its tapered shape, enhancing the rich aromas of your favourite wines. Key Features: ISO standard wine tasting glass Tapered design to enhance wine aromas Includes fill line for precision Washing of glassware included in the hire price Case size: 36 per case Capacity: 20.7 cl / 7 oz Caterhire Top Tips: Planning an event? Make sure you have the right quantity of beverages for your guests. Check out our blog, How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event, for expert advice to ensure you're well-prepared. For more insights and tips, feel free to visit our blog directory.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000110",
        "name": "Sherry Glass 6cl (Case Size 10)",
        "description": "Our charming and sophisticated sherry glass is designed to elevate your wine-tasting experience. With its elegant tulip shape, it's perfect for savouring sherry or liqueurs. Enjoy the pleasure of a perfectly proportioned glass that enhances the aroma and flavour of your favourite drink. Key Features: Ideal for serving sherry or liqueurs Elegant Elgin-styled tulip shape Glass washing included in rental price Wide range of liqueur, brandy and whiskey glasses available Packed in cases of 10 Capacity:Â  5.9cl / 2oz Caterhire Top Tips: To make the most of your event, don't miss out on our complete guide to bars and beverages. Itâ€™s packed with tips on ensuring you have the right amount of drinks for every guest. For more insights and advice, explore our blog.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "185",
        "name": "Clear Salto Glass 35cl (Case Size 25)",
        "description": "The Salto hiball glass tumbler is a chic and robust option for your next event. With its sleek, barrel-shaped design and sturdy thick base, it provides both elegance and functionality. It's perfectly suited for serving various beverages like water, juice, or beer, making it an excellent choice for parties, weddings, and corporate gatherings. Key Features: Tall, curved hiball tumbler with a durable design Thick base for enhanced stability and a quality feel Washing of glasses included in the rental price Complements a variety of stemware ranges Case Size: 25 per case Capacity: 35.4cl / 12oz Caterhire Top Tips: For more tips on selecting the right glassware for your event, check out our Essential Guide to Glassware Hire for Events. Consider adding a splash of colour to your table setting with our Black Salto Glass 33clÂ For more inspiration, visit our blog",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000364",
        "name": "Gin Balloon 59cl (Case Size 16)",
        "description": "Raise a glass to the gin revolution with our oversized gin glassesâ€”perfect for any G&T enthusiast! With their classic balloon shape, these glasses are designed to hold all the ice you need while enhancing the flavours of your favorite gin. Ideal for serving the most refreshing Gin and Tonics at any event, they are sure to be a hit with your guests. Key Features: Classic balloon-shaped design Wide bowl to enhance the scent of ginâ€™s botanicals Includes washing of glassware in the rental price Case size: 16 glasses per caseÂ  Capacity: 59.1cl / 20oz Caterhire Top Tips: To create the ultimate Gin and Tonic experience, remember to stock up on our bags of ice here. If you're trying to figure out the right amount of drinks for your event, check out our informative blog post on how many drinks you'll need. For more tips, visit our blog directory.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "VV10",
        "name": "Margarita Cocktail Glass 27cl (Case Size 16)",
        "description": "Add a touch of flair to your next celebration with our unique Margarita Glass, styled in a sophisticated sombrero shape. Crafted with care, it brings a hint of rustic charm to every occasion, whether you're serving up classic margaritas, delightful cocktails, or sweet dessert creations. With a 27cl capacity and a generously wide rim, itâ€™s perfect for all your garnishing needs, making each drink not just a taste sensation but a visual delight as well. Key Features: Classic stepped silhouette with an elegant wide rim for garnishes. Versatile use for margaritas, cocktails, or desserts. Convenient washing service included with rental. Additional cocktail shakers and accessories available for hire. Case Size: 16 per caseÂ  Capacity: 26.7cl / 9oz Caterhire Top Tips: Make your event planning seamless by exploring our range of cocktail accessories. We have everything from cocktail shakers to crushed ice to elevate your drink presentations. For more inspiration and practical advice, donâ€™t miss our Bar & Beverage Guide on the Caterhire blog.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000137",
        "name": "Lyric Wine Glass 24cl (Case Size 36)",
        "description": "Looking for the perfect wine glass for your next event? Our Lyric Wine Glass is the ideal choice for any casual gathering or large-scale function where practicality and durability are essential. This short-stemmed, versatile glass is designed to effortlessly serve both red and white wine. Plus, its robust construction ensures a reliable performance in even the busiest settings. Key Features: Short-stemmed and sturdy build Versatile for both red and white wine Offers great value without compromising functionality Packed in crates of 36 for safe and easy transport Glass washing included in the hire price Dimensions: Capacity: 23.7cl / 8oz Caterhire Top Tips: For a cohesive look, pair the Lyric Wine Glass with our matching Lyric Champagne Flute. Need some advice on setting up your bar area? Check out our Bar & Beverage Guide for helpful tips.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "SR002",
        "name": "Silver Rim Water Glass 33cl (Case Size 16)",
        "description": "Add a touch of elegance to your event with our Silver Rim Water Glass, part of the sophisticated Silver Rim glassware collection. Whether you're serving water, wine or champagne, each glass boasts a stylish silver rim beautifully complemented by a slender stem and a flared bowl. Make any occasion memorable with these exquisite pieces designed to elevate your table setting. Key Features: Elegant silver rim design Slender stem and flared bowl Case size of 16 glasses per pack Washing of glassware included in rental price Capacity: 32.6cl / 11oz Caterhire Top Tips: For an effortlessly stylish table arrangement, pair these stunning glasses with our Arthur Price silver cutlery and Wedgwood white crockery. If you're planning a bar setup, be sure to check out our comprehensive guide on drink quantities by visiting How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event. For more insights and tips, explore our full range of blog articles at Caterhire Blog.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "CG007",
        "name": "Diamond Pink Water Glass Tumbler",
        "description": "The Diamond collection originates from the centuries old Bohemian Crystal tradition to decorate glass and crystal with the lavishness of diamond shapes. Our timeless Diamond glassware will bring a joyful touch to any table setting with its shimmering appearance. Available in many tones that are inspired by the palette of the famous Dutch painter Rembrandt. Enriching your special gatherings, to enjoy good food and even better company, sharing stories and bringing up memories. The sturdy design will make it a startling element to special events like weddings.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000114",
        "name": "Sundae Dish Glass 12cl (Case Size 16)",
        "description": "Indulge your guests with our elegant glass sundae dish, an excellent choice for serving a variety of desserts. Its timeless design infuses a sense of sophistication, making it ideal for both casual family gatherings and formal events. Each dish holds just the right portion for a delightful treat, ensuring your desserts are not only delicious but also beautifully presented. Key Features: Perfect for serving desserts and sundaes Classic and timeless design Suitable for both casual and formal occasions Comes with washing up service included in the hire price Case Size: 16 per caseÂ  Capacity: 11.83cl / 4oz Caterhire Top Tips: Enhance your dessert presentation by pairing this sundae dish with our Sundae/Latte Spoon for a perfectly matched set. This combination not only adds elegance but also ensures an optimal dining experience for your guests.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000109",
        "name": "Brandy Balloon 27cl (Case Size 25)",
        "description": "Imagine savouring the rich, complex aromas of your favorite brandy or cognac with our elegantly crafted snifter glass. Specifically designed to enhance the tasting experience, this glass features a classic style that suits both sophisticated events and intimate gatherings. Its generous bowl not only directs the bouquet of the spirits to the nose but also enriches the entire drinking experience. Key Features: Classical style design ideal for brandy and cognac. Generous bowl size to maximise aroma and flavour. Washing of glassware included in rental price. Case Size: 25 per case Capacity: 26.6 cl / 9 oz Caterhire Top Tips: For the ultimate brandy experience, serve at room temperature. Gently holding the bowl in your palm will warm the contents, releasing the spirit's full aroma and depth of flavour. Explore more tips in our Essential Guide to Glassware Hire for Events.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000173",
        "name": "Monaco Wine Glass 24cl (Case Size 36)",
        "description": "If you're planning a large banquet, wedding, or corporate event, the Monaco Wine Glass is your go-to choice for elegance and practicality. Crafted by one of Europeâ€™s top glassmakers, this glass ensures quality and reliability, perfect for high-volume hospitality settings. Itâ€™s a reliable option that combines professional performance with a touch of style, giving your event the sophistication it deserves. Key Features: Perfect for high-traffic venues and events. One-piece stem enhances strength and minimizes breakage. Case size: sacked in crates of 36 for safe, easy transport. Glass washing included in the hire price. Caterhire Top Tips: Â 23.7cl / 8oz Caterhire Top Tips: Planning the right number of drinks for your event can be tricky. Be sure to check out our blog post: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event for an in-depth look at how to cater drinks for any occasion.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000159",
        "name": "Shot Glass Helix 6cl (Case Size 10)",
        "description": "Explore our charming collection of shot and shooter glasses, designed to add a touch of elegance to your spirits and desserts. With an assortment of shapes and sizes, you're sure to find the ideal style that complements your event or drink preferences. These glasses are perfect for any occasion, offering both functionality and style to your gatherings. Key Features: Etched design shot glasses Double shot glass measure (6cl) Reinforced glass to reduce breakage Case Size: 10 per caseÂ  Washing included in hire price Capacity: 5.9cl / 2oz Caterhire Top Tips: Planning the perfect party can be challenging, especially when it comes to deciding on the right number of drinks. Check out our informative blog post for a complete guide to bars and beverages for any event.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000108",
        "name": "Slim Jim 24cl (Case Size 36)",
        "description": "The Slim Jim 24cl tumbler is a staple in our glassware collection, designed to elevate your beverage service with ease. Its gracefully tall silhouette makes it an ideal choice for serving water, juice and other light refreshments at any event. With its versatile style and practicality, it's the perfect addition to your drink presentation. Key Features: Case Size: 36 glasses per case Ideal for water and juices Washing included in hire price Available in multiple sizes Capacity: 23.7cl / 8oz Caterhire Top Tips: For insights on planning your beverage service, check out our blog post: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event. Here, youâ€™ll find helpful strategies to ensure your guests are well taken care of at your upcoming event.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "VG02",
        "name": "Victoria Gold Rim White Wine Glass 21cl (Case Size 16)",
        "description": "Delight in elegance with our Gold Rim glassware, a favourite choice for weddings and special occasions. These stylish European-designed crystal white wine glasses elevate any event with their slender stem and gracefully flared bowl. The exquisite gold pattern etched around the rim adds a touch of luxury, ensuring your table setting looks truly spectacular. Key Features: European crafted gold rim glasses Slender stem with a gently flared bowl Finely etched gold pattern around the rim Washing included in hire price Case Size: 16 per case Capacity: 20.7cl / 7oz Caterhire Top Tips: Enhance your table setting with our Gold Rim glassware by pairing them with our Gold Rim charger plates and Gold Cutlery. This combination creates a cohesive and luxurious dining experience for your guests. For more inspiration, explore our blog directory.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "CG008",
        "name": "Diamond Clear Wine Goblet 21cl (Case Size 25)",
        "description": "Looking to elevate your table setting? Our beautiful Diamond Stemmed Glass collection is here to do just that. Handcrafted in Portugal, these high-quality crystal glasses boast a dazzling cut facet design that catches the light brilliantly. Available in a stunning array of colours, they effortlessly complement both winter and summer themes, adding a touch of elegance and modernity to your event. Whether for wine or water, these glasses add the perfect finishing touch. Key Features: Gorgeous diamond-cut crystal glass design Perfect for serving both wine and water Available in various colours to match any theme Includes washing service in rental price Case Size: 25 Per Case Capacity: 20.7cl / 7oz Caterhire Top Tips: Create a timeless table setting by pairing these elegant glasses with our premium Wedgwood and Jasper Conran crockery collections. For more insights on selecting the right glassware for your next event, explore our Essential Guide to Glassware Hire for Events. Discover more tips and ideas on our blog.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000180",
        "name": "Wide Rim Tumbler 15cl (Case Size 36)",
        "description": "Imagine the perfect glassware addition to your event with our wide-rim tumblers for hire. These timeless, straight-sided glasses are versatile enough to serve everything from refreshing soft drinks to sophisticated spirits and delectable desserts. They're a must-have for any occasion. Key Features: Classic straight-sided design Perfect for serving a variety of drinks and desserts Includes glass washing in the hire price Case Size: 36 per case Capacity: 15cl / 5oz Caterhire Top Tips: When planning your event, consider pairing these tumblers with our selection of water tumblers, such as the Slim Jims, Salto glasses, and Coloured water glasses. We also offer large bags of ice to ensure your drinks are served ice cold. Explore our beer glasses, coloured glasswareÂ and our ice cube bags for additional options to elevate your event.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000477",
        "name": "Champagne Glass 12cl (Case Size 25)",
        "description": "Enjoy your celebrations in style with our contemporary champagne flute, featuring a chic, angled bowl design. This elegant glass is designed to enhance the flavour of champagne and sparkling wine, while its tapered shape helps maintain the perfect fizz. Ideal for weddings, parties, and any sophisticated gathering, it's sure to elevate your next event! Key Features: Tapered shape preserves carbonation and flavour Modern design with an angled bowl Includes washing of glasses in the rental price Safely packed in crates (25 glasses per case) Capacity: 11.8cl/4oz Caterhire Top Tips: To perfectly chill your champagne or sparkling wine, fill an ice bucket and let the bottle cool for about 30 minutes before serving. For a complete drinks setup, explore our ice and wine buckets. Don't forget to visit our Essential Guide to Glassware Hire for Events for more insights!",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000800",
        "name": "Whiskey Tumbler 18cl (Case Size 36)",
        "description": "Enjoying a fine whiskey requires the perfect glass to truly appreciate its aroma and flavour. Our classic Whiskey tumbler, available for hire, provides a refined and comfortable way to savour every sip. With its sleek design and included cleaning service, you can focus on enjoying your event with style and ease. Key Features: 36 glasses per case Elegant clear whiskey tumbler Contemporary design Glass washing included in the hire price Capacity: 18cl / 6oz Caterhire Top Tips: To enhance your whiskey experience, consider our range of speciality glasses for hire, perfect for whiskey, brandy, or port. Don't forget to add a cooling touch to your drinks with our large bags of ice for that perfect chill. For more insights and inspirations for your event, explore our blog.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "CG005",
        "name": "Diamond Pink Wine Goblet 21cl (Case Size 25)",
        "description": "Our exquisite Diamond Stemmed Glass collection is a surefire way to elevate any table setting. Crafted in Portugal, these high-quality crystal glasses boast a captivating cut facet design that beautifully reflects light, making them an eye-catching addition to your event. Available in an array of unique colours, they're perfect for complementing both winter and summer decor. These versatile glasses can be used for serving wine or water, adding a chic and modern touch to your celebration. Key Features: Stunning pink diamond-cut crystal glass Suitable for serving both wine and water Available in a range of colours to match any theme Washing of glasses included in the rental price Colour: Pink Case Size: 25 per case Capacity: 20.7cl / 7oz Caterhire Top Tips: For a beautifully curated table setting, consider pairing our Diamond Stemmed Glasses with elegant crockery collections from Wedgwood and Jasper Conran for a timeless look. Donâ€™t miss our Essential Guide to Glassware Hire for Events for more insights on creating the perfect table setting. Explore more helpful tips on our blog.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "CG009",
        "name": "Diamond Grey Wine Goblet 21cl (Case Size 25)",
        "description": "Our stunning Diamond Stemmed Glass collection is sure to elevate any table setting with its intricate elegance. Crafted in Portugal, these crystal glasses feature a dazzling cut facet design that beautifully reflects light, creating a mesmerizing display. With a selection of unique colours to choose from, they're an ideal choice for both winter and summer events. Whether you're serving wine or water, these glasses bring a sophisticated yet contemporary flair to your gatherings. Key Features: Exquisite grey diamond-cut crystal glass Perfect for serving wine or water Available in various colours to complement any theme Glass cleaning included in rental price Colour: Grey Case Size: 25 Per Case Capacity: 20.7cl / 7oz Caterhire Top Tips: Elevate your table setting by pairing these glasses with our elegant Wedgwood and Jasper Conran crockery collections for a timeless and refined appearance. For more insights on choosing the perfect glassware for your event, check out our Essential Guide to Glassware Hire for Events.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "CG0013",
        "name": "Fleur De Lys Pitcher Powder Pink 100cl (Case Size 1)",
        "description": "Elevate your table setting with our exquisite Fleur de Lys glassware, designed to infuse joy into any occasion with its vibrant colours and rich patterns. Reminiscent of Rembrandt's colour palette, these captivating pitchers come in an array of tones that beautifully harmonize with seasonal hues. Perfect for serving refreshing lime and mint-infused water or delectable sangria, they effortlessly add elegance to any gathering. Key Features: Rich design with vibrant colours Available in a variety of tones inspired by Rembrandtâ€™s palette Perfect for serving water, sangria, or infused drinks Washing of glassware included in rental price Colour: Powder Pink Case Size: 1 per case Capacity: 100cl / 33.8oz Caterhire Top Tips: Create an unforgettable table setting by pairing this brilliant pitcher with our stunning crockery collections from Wedgwood and Jasper Conran. Enhance the ensemble with our elegant diamond glassware for a truly memorable look. Discover more styling inspiration in our blogs!",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "CG0010",
        "name": "Diamond Pitcher Clear 100cl (Case Size 1)",
        "description": "Discover the enchanting charm of our Diamond collection, rooted in the illustrious Bohemian Crystal tradition renowned for its exquisite diamond-shaped cuts. This elegant glassware adds a captivating sparkle to any occasion, channeling the rich hues reminiscent of the famed Dutch artist, Rembrandt. Whether you're hosting a casual get-together or planning a grand wedding, the sturdy yet refined design of this collection is sure to impress. Key Features: Colour: Clear Bohemian cut-glass craftsmanship Available in a variety of vibrant tones Perfect for everyday use and formal occasions Durable design with a sparkling diamond finish Case Size: 1 per case Capacity: 100cl/ 3.8oz Caterhire Top Tips: Create an unforgettable table setting by pairing the Diamond glassware with our sophisticated crockery collections from Wedgwood and Jasper Conran. Elevate your decor with matching items from our glassware hire collection. For more insights into choosing the right glassware for your event, check out our Essential Guide to Glassware Hire.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "CG0011",
        "name": "Diamond Pitcher Blue 100cl (Case Size 1)",
        "description": "Experience the allure of the Diamond collection, inspired by the timeless Bohemian Crystal tradition. This glassware, with its radiant diamond-shaped cuts, adds a touch of elegance and sparkle to any occasion. Available in a delightful range of hues reminiscent of Rembrandt's palette, it's perfect for everything from casual get-togethers to elaborate weddings. Its robust yet refined design ensures it's a favourite choice for hosts everywhere. Key Features: Colour: Blue Crafted in the Bohemian cut-glass tradition Available in a variety of rich tones Ideal for both everyday use and formal occasions Sturdy design with a sparkling diamond finish Case Size: 1 per case Capacity: 100cl / 33.8oz Caterhire Top Tips: For a stunning table setup, pair the Diamond glassware with our exquisite crockery collections from Wedgwood and Jasper Conran. Elevate your event further by coordinating with other pieces from our Diamond Glassware range. For additional insights into selecting the right glassware, check out our Blog: Our Essential Guide to Glassware Hire.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "CG0012",
        "name": "Diamond Pitcher Pink 100cl (Case Size 1)",
        "description": "The Diamond collection available for hire from Caterhire is steeped in the rich tradition of Bohemian Crystal craftsmanship, characterized by its radiant diamond-shaped cuts. This exquisite glassware adds an elegant touch to any table with its vibrant colours inspired by the paintings of the legendary Rembrandt. Its robust yet stylish design is perfect for both casual get-togethers and grand celebrations, such as weddings. Key Features: Colour: Pink Crafted in the Bohemian cut-glass tradition Available in a variety of rich tones Suitable for both everyday use and formal occasions Sturdy design with a sparkling diamond finish Case size: 1 per case Capacity: 100cl/33.8oz Caterhire Top Tips: Create an enchanting table setting by pairing the Diamond glassware with our Wedgwood fine white bone china and Jasper Conran crockery collections. Enhance the elegance of your event with matching pieces from our Diamond Glassware range. For more ideas, check out our Essential Guide to Glassware Hire for Events.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "SENRED",
        "name": "Sensa Red Wine Glass 54cl (Case Size 25)",
        "description": "Raise a toast to style and sophistication with these exquisite Red Wine glasses. Crafted from Tritan crystal, these glasses promise both elegance and durability, making them the perfect choice for any event. With their refined design and break-resistant features, you can entertain with confidence and flair. Plus, the washing up is included, so you can focus on enjoying your occasion. Key Features: Made from Tritan crystal for exceptional clarity and strength Unique brilliance and shine Break-resistant stem Durable base plate Case Size: 25 per case Washing included in hire price Capacity: 53.5cl / 18.1oz Caterhire Top Tips: Planning your event? Our Red Wine glasses are just one piece of the puzzle. Donâ€™t forget to check out our guide on how many drinks you need to ensure your bar is perfectly stocked. For more insights and tips, visit our blog directory.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "SENWH",
        "name": "Sensa White Wine Glass 36cl (Case Size 36)",
        "description": "Elevate your wine-tasting experience with this elegant white wine glass for hire, crafted from premium Tritan crystal. Combining sophistication and durability, it boasts a fine mouth rim and exceptional brilliance, creating a delightful sensory journey with every sip. This glass features a break-resistant stem and sturdy base. Key Features: Made from high-quality Tritan crystal Elegant fine mouth rim Exceptional brilliance and clarity Break-resistant stem Sturdy and durable base plate Case Size: 36 per case Washing included in hire price.Â  Capacity: 36.3cl / 12.3oz Caterhire Top Tips: Planning an event? Make sure you have just the right amount of drinks for your guests by checking out our blog guide on drinks and beverages. From start to finish, we're here to make your event extraordinary!",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "SENWAT",
        "name": "Sensa Water Glass 50cl (Case Size 25)",
        "description": "Crafted from the finest Tritan crystal, this water glass is both elegant and resilient, making it an excellent choice for any event. Its sleek contours and sparkling clarity provide a sophisticated touch suitable for both everyday use and special occasions. Available for hire with the added convenience of washing up included, it's a seamless addition to your event setup. Key Features: Made from high-quality Tritan crystal Exceptional brilliance and clarity Washing up included in hire price Case size: available in a case size of 25 Capacity: 50cl / 16.9oz Caterhire Top Tips: Wondering how many drinks you'll need for your event? Weâ€™ve got you covered! Check out our informative blog, How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event, to ensure you're well-prepared for your guests. For additional tips and ideas, explore more of our blogs.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "SENCH",
        "name": "Sensa Champagne Glass 39cl (Case Size 36)",
        "description": "This sophisticated Champagne glass combines modern style with practicality, crafted from durable Tritan crystal. Its refined, thin rim enhances your sipping experience, while its remarkable brilliance adds a touch of elegance to any event. Designed to last, this glass features a break-resistant stem and a sturdy base, making it ideal for both small gatherings and larger celebrations. Plus, the hire price includes washing, ensuring a hassle-free experience. Key Features: Made from Tritan crystal for exceptional clarity and durability Elegant, fine mouth rim for a refined drinking experience Unique brilliance and shine Break-resistant stem for added safety Durable base plate for stability Washing included in hire priceÂ  Case size: 36 per case Capacity: 38.7cl / 13.1oz Caterhire Top Tips: Planning the perfect event requires more than just beautiful glassware. Make sure youâ€™re prepared by checking out our complete guide to bars and beverages for any event to ensure you have enough drinks for your guests. For more helpful insights, visit our blog directory.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000300",
        "name": "Timeless Vintage Cocktail Glass 21cl (Case size 16)",
        "description": "Add a touch of classic elegance to your gatherings with our Timeless Vintage Cocktail Glass. Reminiscent of iconic glassware designs, this glass beautifully reflects light with its intricate cut patterns, making each sip a sophisticated experience. Whether you're serving cocktails or aperitifs, this glass promises to enhance presentation with its vintage charm and style. Key Features: Vintage-inspired design Intricate cut glass detailing Perfect for cocktails and aperitifs Case Size: 16 glasses per case Washing service included in hire price Capacity: 20.7cl / 7oz Caterhire Top Tips: For a seamless cocktail service, these vintage glasses are spot on! Ensure your bar is fully stocked by checking out our comprehensive guide to bars and beverages. Don't forget to explore our wide range of event essentials by visiting our blog section for more helpful tips.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000301",
        "name": "Timeless Vintage Cut Glass Hi Ball 40cl (Case size 36)",
        "description": "Dive into the charm of our Timeless Vintage Cut Glass Tumbler, a perfect blend of sophistication and nostalgia. These tumblers are beautifully crafted reproductions of classic cut glass designs, adding an elegant touch to any sip. Their sparkling finish not only enhances your drinks but also brings a touch of vintage glamour to your table setting. Key Features: Vintage-inspired design Dazzling cut glass detailing Ideal for highball cocktails and mixers Case Size: 36 per case Washing included in hire price Capacity: 39.9cl / 13.5oz Caterhire Top Tips: Explore our blog for expert tips on planning your next event, including how to determine the perfect number of drinks for your guests.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000302",
        "name": "Timeless Cut Glass Whiskey Tumbler 31cl (Case size 25)",
        "description": "Indulge in a touch of nostalgia with our Timeless Vintage Whiskey Tumbler for hire. Crafted to mirror the sophistication of classic barware, these tumblers bring a glow to any occasion with their unique cut patterns. Perfect for serving straight whiskey or your favorite whiskey cocktails, these glasses blend vintage charm with modern convenience. Key Features: Elegant, vintage-style design Distinctive cut glass detail Perfect for neat whiskey or whiskey cocktails Case Size: 25 per case Washing included in hire price Capacity: 31cl / 10.5oz Caterhire Top Tips: Mix and match these timeless beauties with other styles for a layered, sophisticated look. Whether you're hosting a cocktail party or a quiet evening at home, our blog here offers a plethora of ideas to elevate your entertainment game.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000303",
        "name": "Timeless Red Wine Glass 28cl (Case size 25)",
        "description": "Experience the charm and allure of our vintage red wine cut glass, perfect for adding a touch of Italian elegance to your gatherings. This exquisite piece from RCR Cristalleria showcases unparalleled craftsmanship, making it a standout at any dining or cocktail party. Designed with intricate cut glass decoration, it effortlessly elevates your table setting, offering sophistication and style. Key Features: Italian design by world-renowned RCR Cristalleria Made from Eco-Crystal glass Super transparent and lightweight 100% recyclable Washing included in the hire price Case Size: 25 per case Capacity: 28cl / 9.5oz Caterhire Top Tips: Wondering how many glasses you'll need for your event? We recommend planning for 1.5 glasses per person during the first hour, followed by one glass per person per additional hour. This ensures your guests are well-catered for and adds a touch of elegance to your event. Explore more event tips on our blog.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000305",
        "name": "Timeless White Wine Glass 21cl (Case size 25)",
        "description": "Experience the charm and elegance of our vintage white wine cut glass, perfect for any dining or cocktail gathering. Crafted with Italian finesse by RCR Cristalleria, these glasses boast exquisite cut glass decorations that add a touch of sophistication to any occasion. Their eco-friendly materials and crystal-clear transparency make them a delightful choice for your event, while also being 100% recyclable. Key Features: Italian design by esteemed RCR Cristalleria Constructed from Eco-Crystal glass Exceptional transparency and unique lightness Fully recyclable Includes washing of glasses in the hire price Case Size: 25 per case Capacity: 20.7cl / 7.3oz Caterhire Top Tips: To ensure your guests are well-equipped, consider this rule of thumb: allocate about 1.5 glasses per person for the first hour, followed by 1 glass per person for each subsequent hour. For further guidance on event preparations, feel free to explore more insights on our blog.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000304",
        "name": "Timeless Champagne Flute 16cl (Case size 36)",
        "description": "Discover a toast to Italian elegance with our vintage champagne flute cut glass. Perfect for any dining or cocktail event, its exquisite design by RCR Cristalleria adds a touch of sophistication to every gathering. Made from eco-crystal glass, this flute offers unmatched transparency and lightness, elevating your event to a new level of chic. Key Features: Designed by renowned RCR Cristalleria, Italy Made from eco-crystal glass that is 100% recyclable Super transparent crystal glass for ultimate clarity Washing included in hire price Case Size: 36 per case Capacity: 16cl / 5.6oz Caterhire Top Tips: For hosting success, we recommend planning 1.5 glasses per guest for the first hour and 1 additional glass per hour after. This ensures everyone enjoys their bubbly without a hitch! For more event planning tips, feel free to explore our blog directory.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000125S",
        "name": "Chrome Water Jug 100cl (Case Size 1)",
        "description": "This elegant jug is the perfect addition to your event, designed to keep water or other beverages easily accessible while exuding sophistication. Its polished chrome finish and sleek silhouette make it versatile enough to complement any tableware style, whether you're hosting a formal dinner or a casual gathering. Ensure your guests stay refreshed with its generous capacity and enjoy a stylish touch to your tablescape. Key Features: Polished chrome finish for a sleek, modern look Generous capacity, ideal for serving multiple guests Ergonomic handle for a comfortable and controlled pour Case Size: 1 per case Capacity: 100cl/33.8oz Caterhire Top Tips: Elevate your drinks setup by exploring our full range of Water Glasses to find the perfect match for this chrome jug. Remember, all washing up is taken care of in the hire price, so you can focus on enjoying your event. For more tips on glassware selection, check out our detailed Essential Guide to Glassware Hire for Events.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "CG003",
        "name": "Diamond Clear Water Tumbler 28cl (Case Size 1)",
        "description": "The Diamond collection is the perfect choice for adding a touch of elegance to any event. Drawing from the rich Bohemian Crystal tradition, this glassware shines with intricate, diamond-shaped designs that exude timeless beauty. Available in a palette inspired by Rembrandtâ€™s earthy tones, this collection complements a variety of event styles. Whether for a casual gathering or a grand wedding, the Diamond collection serves as a stylish centerpiece to uplift the atmosphere. Key Features: Colour: Clear with availability in various shades Ideal for everyday gatherings and special occasions Case Size: 1 Per Case Timeless design inspired by Bohemian Crystal traditions Capacity: 28cl/9.5oz Caterhire Top Tips: Pair the Diamond glassware with the Diamond Pitcher Clear for a cohesive table setting. For more insights on selecting the right glassware for your event, check out Caterhire's Essential Guide to Glassware Hire for Events.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "113",
        "name": "Carafe 1 Litre (Case Size 1)",
        "description": "Our 1-litre Glass Carafe is the ideal addition for any occasion, inviting your guests to easily pour themselves a refreshing glass of wine or a delightful soft drink. Its generous size minimizes the need for constant refills, keeping your focus on enjoying the event. Stylish and functional, this carafe is a must-have for seamless, hands-on fun at any gathering! Key Features: 1-litre capacity for fewer refills Elegant design made from high-quality glass Perfect for serving wine or soft drinks Case Size: 1 Per Case Capacity: 100cl / 33.8oz Caterhire Top Tips: Maximize your event's efficiency by strategically placing carafes throughout the venue to encourage easy access. Pair your carafe with matching glassware from our collection for a cohesive look.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "4058",
        "name": "LATTE GLASS 27cl (Case Size 1)",
        "description": "Our tall latte glass is perfect for delivering an authentic cafÃ© latte experience to your guests. Designed to make every sip enjoyable, this glass is an ideal choice for both casual gatherings and more formal events. Impress your attendees with a touch of elegance and a quality cafÃ© experience that will leave them wanting more. Key Features: Provides an authentic cafÃ©-style latte experience Sturdy and elegant design for easy handling Perfect for both casual and formal events Capacity: 26.6cl/9oz Caterhire Top Tips: Check out our Blog: How Many Drinks Do I Need? Your Complete Guide to Bars & Beverages for ANY Event.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000115",
        "name": "Martini Glass 15cl (Case Size 16)",
        "description": "Our elegant Martini Glass is a beloved choice among cocktail enthusiasts. Perfectly sized at 5oz, it's ideal for serving your favourite concoction with flair. Whether you're hosting an intimate gathering or a stylish soirÃ©e, these glasses are sure to impress your guests and elevate your event experience. Key Features: Classic and elegant design Popular choice for cocktails Durable and high-quality material Ideal for home parties and professional events Capacity: 14.8cl/5oz Caterhire Top Tips: Pair these martini glasses with our exquisite range of bar accessories to create a complete cocktail station that will wow your guests.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    },
    {
        "sku": "1000149",
        "name": "Savoy Straight Sided Coupe 29cl (Case Size 16)",
        "description": "The Savoy Coupe Glass is the epitome of vintage glamour and elegance. Featuring a stunning vertical optic design, this glassware range adds instant sophistication and sparkle to any bar or event setting. Ideal for serving champagne, cocktails, or desserts, its tall, lined bowl enhances presentation and brings a showstopping flair to every occasion. Whether it's bubbles or a beautifully plated dessert, the Hayworth Coupe is always ready for its close-up. Product Highlights: Striking vertical optic design Perfect for cocktails, champagne, or desserts Popular choice for weddings, parties, and stylish events Packed in crates for safe transport (16 glasses per crate) Washing is included in the rental price Capacity: 29cl /10oz CaterHire's top tip:Â  How many glasses do you need for your event? We generally recommend the following rule of thumb: 1.5 glasses per person for the first hour and 1 glass per hour for every hour after.",
        "blogs": [
            "https://www.hireall.ie/blog/bars-and-beverages-for-events-your-complete-guide/"
        ]
    }
]

async function main() {
  try {
    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const row = data[i];
      let product = await getProductBySku(row.sku);

      if (!product) {
        let products = await getAllProducts({ "sku:in": row.sku });
        if (!products.length || products.length > 1) {
          fs.appendFileSync(
            path.resolve(__dirname, `crockery-errors.txt`),
            `no products (${products.length}) found on hireall for sku ${row.sku}`,
            { encoding: "utf-8" }
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
        destination_name
      );

      let additionalContext = "";
      let customFields = await getCustomFields(product.id);
      let newCustomFields = await generateCustomFields(
        row.description,
        customFieldType
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
              newCustomField.value
            );
          } else {
            console.log(
              "newCustomField.name",
              newCustomField.name,
              "newCustomField.value",
              newCustomField.value
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
        additionalContext
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
      model: "o3",
      messages: [
        {
          role: "user",
          content: `using the following product description 
          '''${htmlToText(productDescription)}''' 
          generate the applicable custom fields from this list of approved field names '''${fieldNames.join(
            ", "
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
