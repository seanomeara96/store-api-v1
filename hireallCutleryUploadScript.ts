/**
 * 
 * this is for cutlery on hireall
 * 
 * missing custom field names for these so do not upload until received
 * 
 * 
 */


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

const data: {
  sku: string;
  description: string;
  blogs: string[];
  links?: string[];
  name?: string;
}[] = [
    {
        "sku": "AQ06",
        "name": "Aqua Dessert Spoon (Case Size 1)",
        "description": "Add a splash a colour to the table with our vibrant Aqua cutlery for hire. Crafted in France by luxury cutlery house CAPDECO, this fresh and elegant cutlery is perfect to hire for summer parties and weddings. Key Features   Made in France Colour: Aqua marine colour Case Size: 1 per case 18/10 stainless steel Nylon polyamide handle for durability Available to hire in six-piece set  Caterhire Top Tips: This pairs beautifully with our Venezia dinner plates and pastel blue diamond glassware.",
        "links": [
            "https://www.hireall.ie/products/view/venezia-dinner-plate-11in-for-hire/?searchid=194520&search_query=Venezia",
            "https://www.hireall.ie/products/view/diamond-pastel-blue-wine-goblet-for-hire/?searchid=194521&search_query=Blue+diamond"
        ],
        "blogs": []
    },
    {
        "sku": "AQ02",
        "name": "Aqua Dinner Fork (Case Size 1)",
        "description": "Add a splash a colour to the table with our vibrant Aqua cutlery for hire. Crafted in France by luxury cutlery house CAPDECO, this fresh and elegant cutlery is perfect to hire for summer parties and weddings. Key Features   Made in France Colour: Aqua marine colour Case Size: 1 per case 18/10 stainless steel Nylon polyamide handle for durability Available to hire in six-piece set  Caterhire Top Tips: This pairs beautifully with our Venezia dinner plates and pastel blue diamond glassware.",
        "links": [
            "https://www.hireall.ie/products/view/venezia-dinner-plate-11in-for-hire/?searchid=194520&search_query=Venezia",
            "https://www.hireall.ie/products/view/diamond-pastel-blue-wine-goblet-for-hire/?searchid=194521&search_query=Blue+diamond"
        ],
        "blogs": []
    },
    {
        "sku": "AQ01",
        "name": "Aqua Dinner Knife (Case Size 1)",
        "description": "Add a splash a colour to the table with our vibrant Aqua cutlery for hire. Crafted in France by luxury cutlery house CAPDECO, this fresh and elegant cutlery is perfect to hire for summer parties and weddings. Key Features   Made in France Colour: Aqua marine colour Case Size: 1 per case 18/10 stainless steel Nylon polyamide handle for durability Available to hire in six-piece set  Caterhire Top Tips: This pairs beautifully with our Venezia dinner plates and pastel blue diamond glassware.",
        "links": [
            "https://www.hireall.ie/products/view/venezia-dinner-plate-11in-for-hire/?searchid=194520&search_query=Venezia",
            "https://www.hireall.ie/products/view/diamond-pastel-blue-wine-goblet-for-hire/?searchid=194521&search_query=Blue+diamond"
        ],
        "blogs": []
    },
    {
        "sku": "AQ03",
        "name": "Aqua Soup Spoon (Case Size 1)",
        "description": "Add a splash a colour to the table with our vibrant Aqua cutlery for hire. Crafted in France by luxury cutlery house CAPDECO, this fresh and elegant cutlery is perfect to hire for summer parties and weddings. Key Features   Made in France Colour: Aqua marine colour Case Size: 1 per case 18/10 stainless steel Nylon polyamide handle for durability Available to hire in six-piece set  Caterhire Top Tips: This pairs beautifully with our Venezia dinner plates and pastel blue diamond glassware.",
        "links": [
            "https://www.hireall.ie/products/view/venezia-dinner-plate-11in-for-hire/?searchid=194520&search_query=Venezia",
            "https://www.hireall.ie/products/view/diamond-pastel-blue-wine-goblet-for-hire/?searchid=194521&search_query=Blue+diamond"
        ],
        "blogs": []
    },
    {
        "sku": "AQ05",
        "name": "Aqua Starter / Dessert Fork (Case Size 1)",
        "description": "Add a splash a colour to the table with our vibrant Aqua cutlery for hire. Crafted in France by luxury cutlery house CAPDECO, this fresh and elegant cutlery is perfect to hire for summer parties and weddings. Key Features   Made in France Aqua marine colour 18/10 stainless steel Nylon polyamide handle for durability Available to hire in six-piece set  Caterhire Top Tips  Pairs beautifully with our Venezia dinner plates and pastel blue diamond glassware.",
        "links": [
            "https://www.hireall.ie/products/view/venezia-dinner-plate-11in-for-hire/?searchid=194520&search_query=Venezia",
            "https://www.hireall.ie/products/view/diamond-pastel-blue-wine-goblet-for-hire/?searchid=194521&search_query=Blue+diamond"
        ],
        "blogs": []
    },
    {
        "sku": "AQ04",
        "name": "Aqua Starter / Side Knife (Case Size 1)",
        "description": "Add a splash a colour to the table with our vibrant Aqua cutlery for hire. Crafted in France by luxury cutlery house CAPDECO, this fresh and elegant cutlery is perfect to hire for summer parties and weddings. Key Features   Made in France Aqua marine colour 18/10 stainless steel Nylon polyamide handle for durability Available to hire in six-piece set  Caterhire Top Tips  Pairs beautifully with our Venezia dinner plates and pastel blue diamond glassware.",
        "links": [
            "https://www.hireall.ie/products/view/venezia-dinner-plate-11in-for-hire/?searchid=194520&search_query=Venezia",
            "https://www.hireall.ie/products/view/diamond-pastel-blue-wine-goblet-for-hire/?searchid=194521&search_query=Blue+diamond"
        ],
        "blogs": []
    },
    {
        "sku": "9002",
        "name": "Arthur Price Silver Dessert Spoon (Case Size 10)",
        "description": "Perfect your dining experience with the timeless elegance of the Arthur Price Silver-Plated Cutlery Collection. Crafted with precision and sophistication, each piece in this 7-piece set is plated with 20 microns of pure silver, offering a luxurious finish perfect for weddings, private events, and high-end corporate functions. Designed to complement both modern and traditional tablescapes, this premium cutlery not only enhances the aesthetics of your table setting but also offers outstanding durability and functionality. Even better, the washing of cutlery is included in the rental price—allowing you to focus on entertaining your guests in style.\n\nKey Features:\n\nCase Size: 10 per case\nColour: Silver\nFinish: 20 microns of silver plating\nCare: Washing included in rental price\n\nCaterhire Top Tips:\n\nStyle our Arthur Price silver cutlery with our beautiful selection of fine dining Gio plates from Wedgwood.\nTransform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [
            "https://www.hireall.ie/products/view/wedgwood-gio-platinum-dinner-plate-28cm-case-size-10-for-hire/?searchid=194522&search_query=Gio"
        ],
        "blogs": []
    },
    {
        "sku": "9005",
        "name": "Arthur Price Silver Dinner Fork (Case Size 10)",
        "description": "Perfect your dining experience with the timeless elegance of the Arthur Price Silver-Plated Cutlery Collection. Crafted with precision and sophistication, each piece in this 7-piece set is plated with 20 microns of pure silver, offering a luxurious finish perfect for weddings, private events, and high-end corporate functions. Designed to complement both modern and traditional tablescapes, this premium cutlery not only enhances the aesthetics of your table setting but also offers outstanding durability and functionality. Even better, the washing of cutlery is included in the rental price—allowing you to focus on entertaining your guests in style.\n\nKey Features:\n\nCase Size: 10 per case\nColour: Silver\nFinish: 20 microns of silver plating\nCare: Washing included in rental price\n\nCaterhire Top Tips:\n\nStyle our Arthur Price silver cutlery with our beautiful selection of fine dining Gio plates from Wedgwood.\n Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [
            "https://www.hireall.ie/products/view/wedgwood-gio-platinum-dinner-plate-28cm-case-size-10-for-hire/?searchid=194522&search_query=Gio"
        ],
        "blogs": []
    },
    {
        "sku": "9004",
        "name": "Arthur Price Silver Dinner Knife (Case Size 10)",
        "description": "Perfect your dining experience with the timeless elegance of the Arthur Price Silver-Plated Cutlery Collection. Crafted with precision and sophistication, each piece in this 7-piece set is plated with 20 microns of pure silver, offering a luxurious finish perfect for weddings, private events, and high-end corporate functions. Designed to complement both modern and traditional tablescapes, this premium cutlery not only enhances the aesthetics of your table setting but also offers outstanding durability and functionality. Even better, the washing of cutlery is included in the rental price—allowing you to focus on entertaining your guests in style.\n\nKey Features:\n\nCase Size: 10 per case\nColour: Silver\nFinish: 20 microns of silver plating\nCare: Washing included in rental price\n\nCaterhire Top Tips:\n\nStyle our Arthur Price silver cutlery with our beautiful selection of fine dining Gio plates from Wedgwood.\n Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [
            "https://www.hireall.ie/products/view/wedgwood-gio-platinum-dinner-plate-28cm-case-size-10-for-hire/?searchid=194522&search_query=Gio"
        ],
        "blogs": []
    },
    {
        "sku": "9003",
        "name": "Arthur Price Silver Soup Spoon (Case Size 10)",
        "description": "Perfect your dining experience with the timeless elegance of the Arthur Price Silver-Plated Cutlery Collection. Crafted with precision and sophistication, each piece in this 7-piece set is plated with 20 microns of pure silver, offering a luxurious finish perfect for weddings, private events, and high-end corporate functions. Designed to complement both modern and traditional tablescapes, this premium cutlery not only enhances the aesthetics of your table setting but also offers outstanding durability and functionality. Even better, the washing of cutlery is included in the rental price—allowing you to focus on entertaining your guests in style.\n\nKey Features:\n\nCase Size: 10 per case\nColour: Silver\nFinish: 20 microns of silver plating\nCare: Washing included in rental price\n\nCaterhire Top Tips:\n\nStyle our Arthur Price silver cutlery with our beautiful selection of fine dining Gio plates from Wedgwood.\n Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [
            "https://www.hireall.ie/products/view/wedgwood-gio-platinum-dinner-plate-28cm-case-size-10-for-hire/?searchid=194522&search_query=Gio"
        ],
        "blogs": []
    },
    {
        "sku": "9007",
        "name": "Arthur Price Silver Starter/Dessert Fork (Case Size 10)",
        "description": "Perfect your dining experience with the timeless elegance of the Arthur Price Silver-Plated Cutlery Collection. Crafted with precision and sophistication, each piece in this 7-piece set is plated with 20 microns of pure silver, offering a luxurious finish perfect for weddings, private events, and high-end corporate functions. Designed to complement both modern and traditional tablescapes, this premium cutlery not only enhances the aesthetics of your table setting but also offers outstanding durability and functionality. Even better, the washing of cutlery is included in the rental price—allowing you to focus on entertaining your guests in style.\n\nKey Features:\n\nCase Size: 10 per case\nColour: Silver\nFinish: 20 microns of silver plating\nCare: Washing included in rental price\n\nCaterhire Top Tips:\n\nStyle our Arthur Price silver cutlery with our beautiful selection of fine dining Gio plates from Wedgwood.\n Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [
            "https://www.hireall.ie/products/view/wedgwood-gio-platinum-dinner-plate-28cm-case-size-10-for-hire/?searchid=194522&search_query=Gio"
        ],
        "blogs": []
    },
    {
        "sku": "9006",
        "name": "Arthur Price Silver Starter/Dessert Knife (Case Size 10)",
        "description": "Perfect your dining experience with the timeless elegance of the Arthur Price Silver-Plated Cutlery Collection. Crafted with precision and sophistication, each piece in this 7-piece set is plated with 20 microns of pure silver, offering a luxurious finish perfect for weddings, private events, and high-end corporate functions. Designed to complement both modern and traditional tablescapes, this premium cutlery not only enhances the aesthetics of your table setting but also offers outstanding durability and functionality. Even better, the washing of cutlery is included in the rental price—allowing you to focus on entertaining your guests in style.\n\nKey Features:\n\nCase Size: 10 per case\nColour: Silver\nFinish: 20 microns of silver plating\nCare: Washing included in rental price\n\nCaterhire Top Tips:\n\nStyle our Arthur Price silver cutlery with our beautiful selection of fine dining Gio plates from Wedgwood.\n Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [
            "https://www.hireall.ie/products/view/wedgwood-gio-platinum-dinner-plate-28cm-case-size-10-for-hire/?searchid=194522&search_query=Gio"
        ],
        "blogs": []
    },
    {
        "sku": "9008",
        "name": "Arthur Price Silver Teaspoon (Case Size 10)",
        "description": "Perfect your dining experience with the timeless elegance of the Arthur Price Silver-Plated Cutlery Collection. Crafted with precision and sophistication, each piece in this 7-piece set is plated with 20 microns of pure silver, offering a luxurious finish perfect for weddings, private events, and high-end corporate functions. Designed to complement both modern and traditional tablescapes, this premium cutlery not only enhances the aesthetics of your table setting but also offers outstanding durability and functionality. Even better, the washing of cutlery is included in the rental price—allowing you to focus on entertaining your guests in style.\n\nKey Features:\n\nCase Size: 10 per case\nColour: Silver\nFinish: 20 microns of silver plating\nCare: Washing included in rental price\n\nCaterhire Top Tips:\n\nStyle our Arthur Price silver cutlery with our beautiful selection of fine dining Gio plates from Wedgwood.\n Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [
            "https://www.hireall.ie/products/view/wedgwood-gio-platinum-dinner-plate-28cm-case-size-10-for-hire/?searchid=194522&search_query=Gio"
        ],
        "blogs": []
    },
    {
        "sku": "2009",
        "name": "Ascot Coffee Spoon (Case Size 10)",
        "description": "Our Ascot cutlery is guaranteed to add style to your dining tables. This cutlery features an elegant design with a polished mirror finish in 18/10 stainless steel. Crafted by one of Europe's leading design houses, its versatile look means it's ideal to hire for both informal and formal dining. The collection includes everything from dinner knives & fork, dessert spoons, starter knives and forks, steak knives and much more. Key Features  Case Size: 10 pieces Use for informal or formal dining 18/10 stainless steel Washing of cutlery included in rental price Available in a full set Packed in storage containers for transport/storage Colour/Material: Stainless Steel  Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards. Check out our Blog: Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [],
        "blogs": [
            "https://www.hireall.ie/blog/how-to-the-formal-table-setting-/"
        ]
    },
    {
        "sku": "2002",
        "name": "Ascot Dessert Spoon (Case Size 10)",
        "description": "Our Ascot cutlery is guaranteed to add style to your dining tables. This cutlery features an elegant design with a polished mirror finish in 18/10 stainless steel. Crafted by one of Europe's leading design houses, its versatile look means it's ideal to hire for both informal and formal dining. The collection includes everything from dinner knives & fork, dessert spoons, starter knives and forks, steak knives and much more. Key Features  Case Size: 10 pieces Use for informal or formal dining 18/10 stainless steel Washing of cutlery included in rental price Available in a full set Packed in storage containers for transport/storage Colour/Material: Stainless Steel  Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards. Check out our Blog: Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [],
        "blogs": [
            "https://www.hireall.ie/blog/how-to-the-formal-table-setting-/"
        ]
    },
    {
        "sku": "2005",
        "name": "Ascot Dinner Fork (Case Size 10)",
        "description": "Our Ascot cutlery is guaranteed to add style to your dining tables. This cutlery features an elegant design with a polished mirror finish in 18/10 stainless steel. Crafted by one of Europe's leading design houses, its versatile look means it's ideal to hire for both informal and formal dining. The collection includes everything from dinner knives & fork, dessert spoons, starter knives and forks, steak knives and much more. Key Features  Case Size: 10 pieces Use for informal or formal dining 18/10 stainless steel Washing of cutlery included in rental price Available in a full set Packed in storage containers for transport/storage Colour/Material: Stainless Steel  Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards. Check out our Blog: Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [],
        "blogs": [
            "https://www.hireall.ie/blog/how-to-the-formal-table-setting-/"
        ]
    },
    {
        "sku": "2004",
        "name": "Ascot Dinner Knife (Case Size 10)",
        "description": "Our Ascot cutlery is guaranteed to add style to your dining tables. This cutlery features an elegant design with a polished mirror finish in 18/10 stainless steel. Crafted by one of Europe's leading design houses, its versatile look means it's ideal to hire for both informal and formal dining. The collection includes everything from dinner knives & fork, dessert spoons, starter knives and forks, steak knives and much more. Key Features  Case Size: 10 pieces Use for informal or formal dining 18/10 stainless steel Washing of cutlery included in rental price Available in a full set Packed in storage containers for transport/storage Colour/Material: Stainless Steel  Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards. Check out our Blog: Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [],
        "blogs": [
            "https://www.hireall.ie/blog/how-to-the-formal-table-setting-/"
        ]
    },
    {
        "sku": "2012",
        "name": "Ascot Fish Fork (Case Size 10)",
        "description": "Our Ascot cutlery is guaranteed to add style to your dining tables. This cutlery features an elegant design with a polished mirror finish in 18/10 stainless steel. Crafted by one of Europe's leading design houses, its versatile look means it's ideal to hire for both informal and formal dining. The collection includes everything from dinner knives & fork, dessert spoons, starter knives and forks, steak knives and much more. Key Features  Case Size: 10 pieces Use for informal or formal dining 18/10 stainless steel Washing of cutlery included in rental price Available in a full set Packed in storage containers for transport/storage Colour/Material: Stainless Steel  Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards. Check out our Blog: Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [],
        "blogs": [
            "https://www.hireall.ie/blog/how-to-the-formal-table-setting-/"
        ]
    },
    {
        "sku": "2013",
        "name": "Ascot Fish Knife (Case Size 10)",
        "description": "Our Ascot cutlery is guaranteed to add style to your dining tables. This cutlery features an elegant design with a polished mirror finish in 18/10 stainless steel. Crafted by one of Europe's leading design houses, its versatile look means it's ideal to hire for both informal and formal dining. The collection includes everything from dinner knives & fork, dessert spoons, starter knives and forks, steak knives and much more. Key Features  Case Size: 10 pieces Use for informal or formal dining 18/10 stainless steel Washing of cutlery included in rental price Available in a full set Packed in storage containers for transport/storage Colour/Material: Stainless Steel  Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards. Check out our Blog: Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [],
        "blogs": [
            "https://www.hireall.ie/blog/how-to-the-formal-table-setting-/"
        ]
    },
    {
        "sku": "2003",
        "name": "Ascot Soup Spoon (Case Size 10)",
        "description": "Our Ascot cutlery is guaranteed to add style to your dining tables. This cutlery features an elegant design with a polished mirror finish in 18/10 stainless steel. Crafted by one of Europe's leading design houses, its versatile look means it's ideal to hire for both informal and formal dining. The collection includes everything from dinner knives & fork, dessert spoons, starter knives and forks, steak knives and much more. Key Features  Case Size: 10 pieces Use for informal or formal dining 18/10 stainless steel Washing of cutlery included in rental price Available in a full set Packed in storage containers for transport/storage Colour/Material: Stainless Steel  Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards. Check out our Blog: Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [],
        "blogs": [
            "https://www.hireall.ie/blog/how-to-the-formal-table-setting-/"
        ]
    },
    {
        "sku": "2005A",
        "name": "Ascot Stainless Steel Cutlery Collection (Pack Size 10)",
        "description": "Our Ascot cutlery is guaranteed to add style to your dining tables. This cutlery features an elegant design with a polished mirror finish in 18/10 stainless steel. Crafted by one of Europe's leading design houses, its versatile look means it's ideal to hire for both informal and formal dining. The collection includes everything from dinner knives & fork, dessert spoons, starter knives and forks, steak knives and much more. Key Features  Case Size: 10 pieces Use for informal or formal dining 18/10 stainless steel Washing of cutlery included in rental price Available in a full set Packed in storage containers for transport/storage Colour/Material: Stainless Steel  Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards. Check out our Blog: Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [],
        "blogs": [
            "https://www.hireall.ie/blog/how-to-the-formal-table-setting-/"
        ]
    },
    {
        "sku": "2007",
        "name": "Ascot Starter Fork/Dessert Fork (Case Size 10)",
        "description": "Our Ascot cutlery is guaranteed to add style to your dining tables. This cutlery features an elegant design with a polished mirror finish in 18/10 stainless steel. Crafted by one of Europe's leading design houses, its versatile look means it's ideal to hire for both informal and formal dining. The collection includes everything from dinner knives & fork, dessert spoons, starter knives and forks, steak knives and much more. Key Features  Case Size: 10 pieces Use for informal or formal dining 18/10 stainless steel Washing of cutlery included in rental price Available in a full set Packed in storage containers for transport/storage Colour/Material: Stainless Steel  Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards. Check out our Blog: Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [],
        "blogs": [
            "https://www.hireall.ie/blog/how-to-the-formal-table-setting-/"
        ]
    },
    {
        "sku": "2006",
        "name": "Ascot Starter Knife/Side Knife (Case Size 10)",
        "description": "Our Ascot cutlery is guaranteed to add style to your dining tables. This cutlery features an elegant design with a polished mirror finish in 18/10 stainless steel. Crafted by one of Europe's leading design houses, its versatile look means it's ideal to hire for both informal and formal dining. The collection includes everything from dinner knives & fork, dessert spoons, starter knives and forks, steak knives and much more. Key Features  Case Size: 10 pieces Use for informal or formal dining 18/10 stainless steel Washing of cutlery included in rental price Available in a full set Packed in storage containers for transport/storage Colour/Material: Stainless Steel  Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards. Check out our Blog: Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [],
        "blogs": [
            "https://www.hireall.ie/blog/how-to-the-formal-table-setting-/"
        ]
    },
    {
        "sku": "2010",
        "name": "Ascot Steak Knife (Case Size 10)",
        "description": "Our Ascot cutlery is guaranteed to add style to your dining tables. This cutlery features an elegant design with a polished mirror finish in 18/10 stainless steel. Crafted by one of Europe's leading design houses, its versatile look means it's ideal to hire for both informal and formal dining. The collection includes everything from dinner knives & fork, dessert spoons, starter knives and forks, steak knives and much more. Key Features  Case Size: 10 pieces Use for informal or formal dining 18/10 stainless steel Washing of cutlery included in rental price Available in a full set Packed in storage containers for transport/storage Colour/Material: Stainless Steel Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards. Check out our Blog: Transform Your Garden into the Perfect Dinner Party Oasis with Our Tablescapes!",
        "links": [],
        "blogs": [
            "https://www.hireall.ie/blog/how-to-the-formal-table-setting-/"
        ]
    },
    {
        "sku": "1000703",
        "name": "Cake Lifter (Case Size 1)",
        "description": "Serve in style with our elegant Stainless Steel Cake Server—perfect for weddings, celebrations, and special occasions. Designed for both function and presentation, this sleek cake lifter features a sturdy handle for a comfortable grip, making it ideal for serving everything from layered cakes to delicate quiches and desserts. Its classic stainless steel finish pairs beautifully with a wide range of table settings and is a must-have addition to any dessert station. Pair it with our cake stands and matching cake knife for a coordinated and polished look at your event.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Stainless steel\nCake lifter with handle for easy serving\nPerfect for cake, desserts, or quiche\n\nCaterHire Top Tip: Check out our Blog: ?How to: Host the Ultimate Afternoon Tea at Home.",
        "links": [
            "https://www.hireall.ie/products/category/afternoon-tea-cake-stands-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "1000213",
        "name": "Cheese Knife (Case Size 1)",
        "description": "Our Stainless Steel Cheese Knife is ideal for use with your after-dinner cheese board, adding a refined touch to any dining occasion. With its sleek finish and practical design, this knife is perfect for slicing through soft, semi-soft, or firm cheeses with ease. Whether you're hosting an intimate dinner or a large-scale celebration, it makes the perfect companion to a well-curated cheese selection. Pair it with our cheese boards or platters to complete your service setup.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Stainless steel\nPerfect for after-dinner cheese boards and grazing tables\n \nCaterHire Top Tip: Check out our Blog: Caterhire’s Top Tips for Throwing a Party at Home.",
        "links": [],
        "blogs": []
    },
    {
        "sku": "GOA0014",
        "name": "Goa Black & Gold Coffee/Tea Spoon (Case Size 1)",
        "description": "Bring magic to the table with our exclusive Goa Black and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek black resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and black (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Pair with our fusion plates for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/fusion-reactive-blue-dinner-plate-pack-size-10-for-hire/?searchid=194546&search_query=Fusion"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0010",
        "name": "Goa Black & Gold Dessert Spoon (Case Size 1)",
        "description": "Bring magic to the table with our exclusive Goa Black and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek black resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and black (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Pair with our fusion plates for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/fusion-reactive-blue-dinner-plate-pack-size-10-for-hire/?searchid=194546&search_query=Fusion"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0008",
        "name": "Goa Black & Gold Dinner Fork (Case Size 1)",
        "description": "Bring magic to the table with our exclusive Goa Black and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek black resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and black (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Pair with our fusion plates for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/fusion-reactive-blue-dinner-plate-pack-size-10-for-hire/?searchid=194546&search_query=Fusion"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0009",
        "name": "Goa Black & Gold Dinner Knife (Case Size 1)",
        "description": "Bring magic to the table with our exclusive Goa Black and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek black resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and black (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Pair with our fusion plates for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/fusion-reactive-blue-dinner-plate-pack-size-10-for-hire/?searchid=194546&search_query=Fusion"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0011",
        "name": "Goa Black & Gold Soup Spoon (Case Size 1)",
        "description": "Bring magic to the table with our exclusive Goa Black and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek black resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and black (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Pair with our fusion plates for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/fusion-reactive-blue-dinner-plate-pack-size-10-for-hire/?searchid=194546&search_query=Fusion"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0012",
        "name": "Goa Black & Gold Starter/Dessert Fork (Case Size 1)",
        "description": "Bring magic to the table with our exclusive Goa Black and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek black resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and black (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Pair with our fusion plates for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/fusion-reactive-blue-dinner-plate-pack-size-10-for-hire/?searchid=194546&search_query=Fusion"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0013",
        "name": "Goa Black & Gold Starter/Dessert Knife (Case Size 1)",
        "description": "Bring magic to the table with our exclusive Goa Black and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek black resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and black (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Pair with our fusion plates for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/fusion-reactive-blue-dinner-plate-pack-size-10-for-hire/?searchid=194546&search_query=Fusion"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0021",
        "name": "Goa Pink & Gold Coffee / Tea Spoon (Case Size 1)",
        "description": "Bring magic to the table with our exclusive Pink and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek pink resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and pink (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Check out our blog: Easy Outdoor Summer Tablescaping. Pair with our Stoneware Crockery & Coloured Glassware for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/stoneware-dinner-plate-jade-11in-for-hire/?searchid=194549&search_query=Jade+stonew",
            "https://www.hireall.ie/products/category/glassware-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0017",
        "name": "Goa Pink & Gold Dessert Spoon (Case Size 1)",
        "description": "Bring magic to the table with our exclusive Pink and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek pink resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and pink (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Check out our blog: Easy Outdoor Summer Tablescaping. Pair with our Stoneware Crockery & Coloured Glassware for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/stoneware-dinner-plate-jade-11in-for-hire/?searchid=194549&search_query=Jade+stonew",
            "https://www.hireall.ie/products/category/glassware-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0015",
        "name": "Goa Pink & Gold Dinner Fork (Case Size 1)",
        "description": "Bring magic to the table with our exclusive Pink and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek pink resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and pink (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Check out our blog: Easy Outdoor Summer Tablescaping. Pair with our Stoneware Crockery & Coloured Glassware for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/stoneware-dinner-plate-jade-11in-for-hire/?searchid=194549&search_query=Jade+stonew",
            "https://www.hireall.ie/products/category/glassware-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0016",
        "name": "Goa Pink & Gold Dinner Knife (Case Size 1)",
        "description": "Bring magic to the table with our exclusive Pink and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek pink resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and pink (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Check out our blog: Easy Outdoor Summer Tablescaping. Pair with our Stoneware Crockery & Coloured Glassware for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/stoneware-dinner-plate-jade-11in-for-hire/?searchid=194549&search_query=Jade+stonew",
            "https://www.hireall.ie/products/category/glassware-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0018",
        "name": "Goa Pink & Gold Soup Spoon (Case Size 1)",
        "description": "Bring magic to the table with our exclusive Pink and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek pink resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and pink (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Check out our blog: Easy Outdoor Summer Tablescaping. Pair with our Stoneware Crockery & Coloured Glassware for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/stoneware-dinner-plate-jade-11in-for-hire/?searchid=194549&search_query=Jade+stonew",
            "https://www.hireall.ie/products/category/glassware-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0020",
        "name": "Goa Pink & Gold Starter / Butter Knife (Case Size 1)",
        "description": "Bring magic to the table with our exclusive Pink and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek pink resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and pink (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Check out our blog: Easy Outdoor Summer Tablescaping. Pair with our Stoneware Crockery & Coloured Glassware for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/stoneware-dinner-plate-jade-11in-for-hire/?searchid=194549&search_query=Jade+stonew",
            "https://www.hireall.ie/products/category/glassware-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0019",
        "name": "Goa Pink & Gold Starter / Dessert Fork (Case Size 1)",
        "description": "Bring magic to the table with our exclusive Pink and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek pink resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and pink (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Check out our blog: Easy Outdoor Summer Tablescaping. Pair with our Stoneware Crockery & Coloured Glassware for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/stoneware-dinner-plate-jade-11in-for-hire/?searchid=194549&search_query=Jade+stonew",
            "https://www.hireall.ie/products/category/glassware-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0007",
        "name": "Goa White & Gold Coffee/Tea Spoon (Case Size 1)",
        "description": "Bring magic to the table with our exclusive White and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek pink resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and white (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Pair with our Transatlantica Plates for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/transatlantica-dinner-plate-11in-for-hire/?searchid=194555&search_query=Transatlantica"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0003",
        "name": "Goa White & Gold Dessert Spoon (Case Size 1)",
        "description": "Bring magic to the table with our exclusive White and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek pink resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and white (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Check out our blog: Easy Outdoor Summer Tablescaping. Pair with our Transatlantica Plates for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/transatlantica-dinner-plate-11in-for-hire/?searchid=194555&search_query=Transatlantica"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0001",
        "name": "Goa White & Gold Dinner Fork (Case Size 1)",
        "description": "Bring magic to the table with our exclusive White and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek pink resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and white (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Check out our blog: Easy Outdoor Summer Tablescaping. Pair with our Transatlantica Plates for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/transatlantica-dinner-plate-11in-for-hire/?searchid=194555&search_query=Transatlantica"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0002",
        "name": "Goa White & Gold Dinner Knife (Case Size 1)",
        "description": "Bring magic to the table with our exclusive White and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek pink resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and white (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Check out our blog: Easy Outdoor Summer Tablescaping. Pair with our Transatlantica Plates for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/transatlantica-dinner-plate-11in-for-hire/?searchid=194555&search_query=Transatlantica"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0004",
        "name": "Goa White & Gold Soup Spoon (Case Size 1)",
        "description": "Bring magic to the table with our exclusive White and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek pink resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and white (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Check out our blog: Easy Outdoor Summer Tablescaping. Pair with our Transatlantica Plates for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/transatlantica-dinner-plate-11in-for-hire/?searchid=194555&search_query=Transatlantica"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0005",
        "name": "Goa White & Gold Starter/Dessert Fork (Case Size 1)",
        "description": "Bring magic to the table with our exclusive White and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek pink resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and white (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Check out our blog: Easy Outdoor Summer Tablescaping. Pair with our Transatlantica Plates for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/transatlantica-dinner-plate-11in-for-hire/?searchid=194555&search_query=Transatlantica"
        ],
        "blogs": []
    },
    {
        "sku": "GOA0006",
        "name": "Goa White & Gold Starter/Dessert Knife (Case Size 1)",
        "description": "Bring magic to the table with our exclusive White and Gold Cutlery for hire. Sophisticated and luxurious, this stunning range features a brushed gold finish complemented by sleek pink resin handles—perfect for creating a refined, contemporary look at weddings, private dining events, and upscale celebrations. Each piece is meticulously handcrafted by skilled artisans in Portugal, offering not only exquisite design but also exceptional quality and craftsmanship. Whether styled with elegant tableware or bold modern décor, the Goa range makes a dramatic statement on any tablescape.\n\nKey Features:\n\nCase Size: 1 per case\nColour/Material: Gold and white (brushed gold 18/10 stainless steel with black resin handles)\nCraftsmanship: Handcrafted in Portugal\nSet Availability: Available to hire as a full set\nCaterHire Top Tip: Check out our blog: Easy Outdoor Summer Tablescaping. Pair with our Transatlantica Plates for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/view/transatlantica-dinner-plate-11in-for-hire/?searchid=194555&search_query=Transatlantica"
        ],
        "blogs": []
    },
    {
        "sku": "1000200",
        "name": "Kings Coffee Spoon (Pack Size 10)",
        "description": "Our Kings Pattern cutlery range is our most popular everyday cutlery to hire. Designed on commission from King George III, it features a classical motif based on the honeysuckle flower and shell in 18/0 stainless steel. Â Perfect to rent for banquets and weddings. Key Features Case Size:  10 pieces per pack Colour: Silver/Stainless Steel Traditional design steeped in heritage Available in a full set Washing of cutlery included in rental price Pair with our gold rim or white crockery ranges  Caterhire Top Tips: Pair with our Royal Doulton Crockery for the perfect match!",
        "links": [],
        "blogs": []
    },
    {
        "sku": "1000208",
        "name": "Kings Dessert Spoon (Pack Size 10)",
        "description": "Our Kings Pattern cutlery range is our most popular everyday cutlery to hire. Designed on commission from King George III, it features a classical motif based on the honeysuckle flower and shell in 18/0 stainless steel. Â Perfect to rent for banquets and weddings. Key Features Case Size:  10 pieces per pack Colour: Silver/Stainless Steel Traditional design steeped in heritage Available in a full set Washing of cutlery included in rental price Pair with our gold rim or white crockery ranges  Caterhire Top Tips: Pair with our Royal Doulton Crockery for the perfect match!",
        "links": [],
        "blogs": []
    },
    {
        "sku": "1000206",
        "name": "Kings Dinner Fork (Pack Size 10)",
        "description": "Our Kings Pattern cutlery range is our most popular everyday cutlery to hire. Designed on commission from King George III, it features a classical motif based on the honeysuckle flower and shell in 18/0 stainless steel. Â Perfect to rent for banquets and weddings. Key Features Case Size:  10 pieces per pack Colour: Silver/Stainless Steel Traditional design steeped in heritage Available in a full set Washing of cutlery included in rental price Pair with our gold rim or white crockery ranges  Caterhire Top Tips: Pair with our Royal Doulton Crockery for the perfect match!",
        "links": [],
        "blogs": []
    },
    {
        "sku": "1000205",
        "name": "Kings Dinner Knife (Pack Size 10)",
        "description": "Our Kings Pattern cutlery range is our most popular everyday cutlery to hire. Designed on commission from King George III, it features a classical motif based on the honeysuckle flower and shell in 18/0 stainless steel. Â Perfect to rent for banquets and weddings. Key Features Case Size:  10 pieces per pack Colour: Silver/Stainless Steel Traditional design steeped in heritage Available in a full set Washing of cutlery included in rental price Pair with our gold rim or white crockery ranges  Caterhire Top Tips: Pair with our Royal Doulton Crockery for the perfect match!",
        "links": [],
        "blogs": []
    },
    {
        "sku": "1000202",
        "name": "Kings Fish Fork (Pack Size 10)",
        "description": "Our Kings Pattern cutlery range is our most popular everyday cutlery to hire. Designed on commission from King George III, it features a classical motif based on the honeysuckle flower and shell in 18/0 stainless steel. Â Perfect to rent for banquets and weddings. Key Features Case Size:  10 pieces per pack Colour: Silver/Stainless Steel Traditional design steeped in heritage Available in a full set Washing of cutlery included in rental price Pair with our gold rim or white crockery ranges  Caterhire Top Tips: Pair with our Royal Doulton Crockery for the perfect match!",
        "links": [],
        "blogs": []
    },
    {
        "sku": "1000201",
        "name": "Kings Fish Knife (Pack Size 10)",
        "description": "Our Kings Pattern cutlery range is our most popular everyday cutlery to hire. Designed on commission from King George III, it features a classical motif based on the honeysuckle flower and shell in 18/0 stainless steel. Â Perfect to rent for banquets and weddings. Key Features Case Size:  10 pieces per pack Colour: Silver/Stainless Steel Traditional design steeped in heritage Available in a full set Washing of cutlery included in rental price Pair with our gold rim or white crockery ranges  Caterhire Top Tips: Pair with our Royal Doulton Crockery for the perfect match!",
        "links": [],
        "blogs": []
    },
    {
        "sku": "812",
        "name": "Kings Pattern Serving Spoon",
        "description": "Our Kings Pattern cutlery range is our most popular everyday cutlery to hire. Designed on commission from King George III, it features a classical motif based on the honeysuckle flower and shell in 18/0 stainless steel. Â Perfect to rent for banquets and weddings. Key Features Case Size:  10 pieces per pack Colour: Silver/Stainless Steel Traditional design steeped in heritage Available in a full set Washing of cutlery included in rental price Pair with our gold rim or white crockery ranges  Caterhire Top Tips: Pair with our Royal Doulton Crockery for the perfect match!",
        "links": [],
        "blogs": []
    },
    {
        "sku": "1000210",
        "name": "Kings Serving Spoon (Pack Size 1)",
        "description": "Our Kings Pattern cutlery range is our most popular everyday cutlery to hire. Designed on commission from King George III, it features a classical motif based on the honeysuckle flower and shell in 18/0 stainless steel. Â Perfect to rent for banquets and weddings. Key Features Case Size:  10 pieces per pack Colour: Silver/Stainless Steel Traditional design steeped in heritage Available in a full set Washing of cutlery included in rental price Pair with our gold rim or white crockery ranges  Caterhire Top Tips: Pair with our Royal Doulton Crockery for the perfect match!",
        "links": [],
        "blogs": []
    },
    {
        "sku": "1000203",
        "name": "Kings Soup Spoon (Pack Size 10)",
        "description": "Our Kings Pattern cutlery range is our most popular everyday cutlery to hire. Designed on commission from King George III, it features a classical motif based on the honeysuckle flower and shell in 18/0 stainless steel. Â Perfect to rent for banquets and weddings. Key Features Case Size:  10 pieces per pack Colour: Silver/Stainless Steel Traditional design steeped in heritage Available in a full set Washing of cutlery included in rental price Pair with our gold rim or white crockery ranges  Caterhire Top Tips: Pair with our Royal Doulton Crockery for the perfect match!",
        "links": [],
        "blogs": []
    },
    {
        "sku": "1000207",
        "name": "Kings Starter Fork/Dessert Fork (Pack Size 10)",
        "description": "Our Kings Pattern cutlery range is our most popular everyday cutlery to hire. Designed on commission from King George III, it features a classical motif based on the honeysuckle flower and shell in 18/0 stainless steel. Â Perfect to rent for banquets and weddings. Key Features Case Size:  10 pieces per pack Colour: Silver/Stainless Steel Traditional design steeped in heritage Available in a full set Washing of cutlery included in rental price Pair with our gold rim or white crockery ranges  Caterhire Top Tips: Pair with our Royal Doulton Crockery for the perfect match!",
        "links": [],
        "blogs": []
    },
    {
        "sku": "1000204",
        "name": "Kings Starter Knife/Side Knife (Pack Size 10)",
        "description": "Our Kings Pattern cutlery range is our most popular everyday cutlery to hire. Designed on commission from King George III, it features a classical motif based on the honeysuckle flower and shell in 18/0 stainless steel. Â Perfect to rent for banquets and weddings. Key Features Case Size:  10 pieces per pack Colour: Silver/Stainless Steel Traditional design steeped in heritage Available in a full set Washing of cutlery included in rental price Pair with our gold rim or white crockery ranges  Caterhire Top Tips: Pair with our Royal Doulton Crockery for the perfect match!",
        "links": [],
        "blogs": []
    },
    {
        "sku": "1000209",
        "name": "Kings Teaspoon (Pack Size 10)",
        "description": "Our Kings Pattern cutlery range is our most popular everyday cutlery to hire. Designed on commission from King George III, it features a classical motif based on the honeysuckle flower and shell in 18/0 stainless steel. Â Perfect to rent for banquets and weddings. Key Features Case Size:  10 pieces per pack Colour: Silver/Stainless Steel Traditional design steeped in heritage Available in a full set Washing of cutlery included in rental price Pair with our gold rim or white crockery ranges  Caterhire Top Tips: Pair with our Royal Doulton Crockery for the perfect match!",
        "links": [],
        "blogs": []
    },
    {
        "sku": "PRL06",
        "name": "Mother Of Pearl Dessert Spoon (Case Size 1)",
        "description": "Bring magic to the table with our beautiful Mother of Pearl cutlery for hire. Crafted in France by luxury cutlery house CAPDECO, this shimmering horn-toned mother of pearl handle provide a sophisticated design imbued with classic elegance. This collection is a must to rent for that special event or wedding. Key Features: Case Size: 1 per case Made in France 18/10 stainless steel Acrylic horn-toned handle Available to hire in six-piece set  Caterhire Top Tips: This cutlery pairs beautifully with our Wedgwood fine bone China and Mediterranean dinner plates.",
        "links": [
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/",
            "https://www.hireall.ie/products/view/mediterranean-dinner-plate-pink-11in-for-hire/?searchid=194566&search_query=Medit"
        ],
        "blogs": []
    },
    {
        "sku": "PRL02",
        "name": "Mother Of Pearl Dinner Fork (Case Size 1)",
        "description": "Bring magic to the table with our beautiful Mother of Pearl cutlery for hire. Crafted in France by luxury cutlery house CAPDECO, this shimmering horn-toned mother of pearl handle provide a sophisticated design imbued with classic elegance. This collection is a must to rent for that special event or wedding. Key Features: Case Size: 1 per case Made in France 18/10 stainless steel Acrylic horn-toned handle Available to hire in six-piece set  Caterhire Top Tips: This cutlery pairs beautifully with our Wedgwood fine bone China and Mediterranean dinner plates.",
        "links": [
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/",
            "https://www.hireall.ie/products/view/mediterranean-dinner-plate-pink-11in-for-hire/?searchid=194566&search_query=Medit"
        ],
        "blogs": []
    },
    {
        "sku": "PRL01",
        "name": "Mother Of Pearl Dinner Knife (Case Size 1)",
        "description": "Bring magic to the table with our beautiful Mother of Pearl cutlery for hire. Crafted in France by luxury cutlery house CAPDECO, this shimmering horn-toned mother of pearl handle provide a sophisticated design imbued with classic elegance. This collection is a must to rent for that special event or wedding. Key Features: Case Size: 1 per case Made in France 18/10 stainless steel Acrylic horn-toned handle Available to hire in six-piece set  Caterhire Top Tips: This cutlery pairs beautifully with our Wedgwood fine bone China and Mediterranean dinner plates.",
        "links": [
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/",
            "https://www.hireall.ie/products/view/mediterranean-dinner-plate-pink-11in-for-hire/?searchid=194566&search_query=Medit"
        ],
        "blogs": []
    },
    {
        "sku": "PRL03",
        "name": "Mother Of Pearl Soup Spoon (Case Size 1)",
        "description": "Bring magic to the table with our beautiful Mother of Pearl cutlery for hire. Crafted in France by luxury cutlery house CAPDECO, this shimmering horn-toned mother of pearl handle provide a sophisticated design imbued with classic elegance. This collection is a must to rent for that special event or wedding. Key Features: Case Size: 1 per case Made in France 18/10 stainless steel Acrylic horn-toned handle Available to hire in six-piece set  Caterhire Top Tips: This cutlery pairs beautifully with our Wedgwood fine bone China and Mediterranean dinner plates.",
        "links": [
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/",
            "https://www.hireall.ie/products/view/mediterranean-dinner-plate-pink-11in-for-hire/?searchid=194566&search_query=Medit"
        ],
        "blogs": []
    },
    {
        "sku": "PRL05",
        "name": "Mother Of Pearl Starter / Dessert Fork (Case Size 1)",
        "description": "Bring magic to the table with our beautiful Mother of Pearl cutlery for hire. Crafted in France by luxury cutlery house CAPDECO, this shimmering horn-toned mother of pearl handle provide a sophisticated design imbued with classic elegance. This collection is a must to rent for that special event or wedding. Key Features: Case Size: 1 per case Made in France 18/10 stainless steel Acrylic horn-toned handle Available to hire in six-piece set  Caterhire Top Tips: This cutlery pairs beautifully with our Wedgwood fine bone China and Mediterranean dinner plates.",
        "links": [
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/",
            "https://www.hireall.ie/products/view/mediterranean-dinner-plate-pink-11in-for-hire/?searchid=194566&search_query=Medit"
        ],
        "blogs": []
    },
    {
        "sku": "PRL04",
        "name": "Mother Of Pearl Starter / Side Knife (Case size 1)",
        "description": "Bring magic to the table with our beautiful Mother of Pearl cutlery for hire. Crafted in France by luxury cutlery house CAPDECO, this shimmering horn-toned mother of pearl handle provide a sophisticated design imbued with classic elegance. This collection is a must to rent for that special event or wedding. Key Features: Case Size: 1 per case Made in France 18/10 stainless steel Acrylic horn-toned handle Available to hire in six-piece set  Caterhire Top Tips: This cutlery pairs beautifully with our Wedgwood fine bone China and Mediterranean dinner plates.",
        "links": [
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/",
            "https://www.hireall.ie/products/view/mediterranean-dinner-plate-pink-11in-for-hire/?searchid=194566&search_query=Medit"
        ],
        "blogs": []
    },
    {
        "sku": "1000142",
        "name": "Pastry Fork (Cack Size 10)",
        "description": "Our Stainless Steel Pastry Forks are the ideal finishing touch for your event’s dessert course. Crafted with a sleek finish and a classic design, these forks are perfect for enjoying cakes, pastries and sweet treats. Whether you're planning a wedding, banquet, or corporate function, these forks offer a professional presentation and comfortable handling.\n\nKey Features:\nMaterial: High-quality stainless steel\nDesign: Three-pronged fork with a widened edge for easy pastry cutting\nCase Size: Supplied in packs of 10\n\nCaterHire Top Tips:\nPair with our matching stainless steel dessert spoons and cake knives for a coordinated table setting.",
        "links": [],
        "blogs": []
    },
    {
        "sku": "1000214",
        "name": "Steak Knife with Wooden Handle (Case Size 1)",
        "description": "When you're serving steak or other hearty mains, a quality steak knife is a must. Our Steak Knife with Wooden Handle features a durable stainless steel blade that cuts through meat with ease. The classic wooden handle provides a comfortable grip.\n\nKey Features:\nBlade: Serrated stainless steel for easy cutting\nHandle: Traditional wooden handle \nCase Size: 1 per case \n\nCaterHire Top Tips:                                                                                                                                                Pair with our Ascot Cutlery for the perfect match!",
        "links": [],
        "blogs": []
    },
    {
        "sku": "1000234",
        "name": "Sundae/Latte Spoon (Case Size 1)",
        "description": "Perfect your dessert and coffee service with our Sundae/Latte Spoons. Designed with a long handle and sleek finish, these spoons are perfect for enjoying layered desserts, sundaes or tall lattes. A versatile and stylish addition to any event, these spoons are ideal for weddings, banquets, or café style catering.\n\nKey Features:\nHigh-quality stainless steel\nLong-handled spoon for tall glasses and deep dishes\nPolished silver look to complement any tableware\nCase Size: 10 per case\n\nCaterHire Top Tips:\nPair with our sundae glasses for the perfect match!\nIdeal for serving Eton mess, trifles, or parfaits — anything that needs a longer reach!\n\nGreat for hot and cold drinks alike; these spoons work just as well with iced coffees as with hot lattes.\n\nOrder extra packs for busy events — these tend to be one of the first items to run low!",
        "links": [
            "https://www.hireall.ie/products/view/sundae-dish-glass-for-hire/?searchid=194567&search_query=Sundae"
        ],
        "blogs": []
    },
    {
        "sku": "VGC06",
        "name": "Victoria Gold Dessert Spoon (Case Size 10)",
        "description": "The popular Victoria Gold Cutlery is perfect for Weddings, Parties or Formal Dining Events. It's gold finish is perfect with our Victoria Gold Glass range and Gold Rim Charger plates to create a stunning table setting.  Key Features Case Size: 10 pieces per case 18/10 stainless steel with PVD coating Available in an 8 piece setting Colour: Gold Washing of cutlery included in rental price  CaterHire Top Tips: Pair With Our Wedgwood Gio Gold Collection for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/category/wedgwood-gio-gold-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "VGC04",
        "name": "Victoria Gold Dinner Fork (Case Size 10)",
        "description": "The popular Victoria Gold Cutlery is perfect for Weddings, Parties or Formal Dining Events. It's gold finish is perfect with our Victoria Gold Glass range and Gold Rim Charger plates to create a stunning table setting.  Key Features Case Size: 10 pieces per case 18/10 stainless steel with PVD coating Available in an 8 piece setting Colour: Gold Washing of cutlery included in rental price  CaterHire Top Tips: Pair With Our Wedgwood Gio Gold Collection for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/category/wedgwood-gio-gold-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "VGC03",
        "name": "Victoria Gold Dinner Knife (Case Size 10)",
        "description": "The popular Victoria Gold Cutlery is perfect for Weddings, Parties or Formal Dining Events. It's gold finish is perfect with our Victoria Gold Glass range and Gold Rim Charger plates to create a stunning table setting.  Key Features Case Size: 10 pieces per case 18/10 stainless steel with PVD coating Available in an 8 piece setting Colour: Gold Washing of cutlery included in rental price  CaterHire Top Tips: Pair With Our Wedgwood Gio Gold Collection for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/category/wedgwood-gio-gold-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "VGC08",
        "name": "Victoria Gold Espresso Spoon (Case Size 10)",
        "description": "The popular Victoria Gold Cutlery is perfect for Weddings, Parties or Formal Dining Events. It's gold finish is perfect with our Victoria Gold Glass range and Gold Rim Charger plates to create a stunning table setting.  Key Features Case Size: 10 pieces per case 18/10 stainless steel with PVD coating Available in an 8 piece setting Colour: Gold Washing of cutlery included in rental price  CaterHire Top Tips: Pair With Our Wedgwood Gio Gold Collection for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/category/wedgwood-gio-gold-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "VGC01",
        "name": "Victoria Gold Soup Spoon (Case Size 10)",
        "description": "The popular Victoria Gold Cutlery is perfect for Weddings, Parties or Formal Dining Events. It's gold finish is perfect with our Victoria Gold Glass range and Gold Rim Charger plates to create a stunning table setting.  Key Features Case Size: 10 pieces per case 18/10 stainless steel with PVD coating Available in an 8 piece setting Colour: Gold Washing of cutlery included in rental price  CaterHire Top Tips: Pair With Our Wedgwood Gio Gold Collection for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/category/wedgwood-gio-gold-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "VGC05",
        "name": "Victoria Gold Starter Fork/Dessert Fork (Case Size 10)",
        "description": "The popular Victoria Gold Cutlery is perfect for Weddings, Parties or Formal Dining Events. It's gold finish is perfect with our Victoria Gold Glass range and Gold Rim Charger plates to create a stunning table setting.  Key Features Case Size: 10 pieces per case 18/10 stainless steel with PVD coating Available in an 8 piece setting Colour: Gold Washing of cutlery included in rental price  CaterHire Top Tips: Pair With Our Wedgwood Gio Gold Collection for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/category/wedgwood-gio-gold-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "VGC02",
        "name": "Victoria Gold Starter Knife/Side Knife (Case Size 10)",
        "description": "The popular Victoria Gold Cutlery is perfect for Weddings, Parties or Formal Dining Events. It's gold finish is perfect with our Victoria Gold Glass range and Gold Rim Charger plates to create a stunning table setting.  Key Features Case Size: 10 pieces per case 18/10 stainless steel with PVD coating Available in an 8 piece setting Colour: Gold Washing of cutlery included in rental price  CaterHire Top Tips: Pair With Our Wedgwood Gio Gold Collection for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/category/wedgwood-gio-gold-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "VGC07",
        "name": "Victoria Gold Teaspoon (Case Size 10)",
        "description": "The popular Victoria Gold Cutlery is perfect for Weddings, Parties or Formal Dining Events. It's gold finish is perfect with our Victoria Gold Glass range and Gold Rim Charger plates to create a stunning table setting.  Key Features Case Size: 10 pieces per case 18/10 stainless steel with PVD coating Available in an 8 piece setting Colour: Gold Washing of cutlery included in rental price  CaterHire Top Tips: Pair With Our Wedgwood Gio Gold Collection for the perfect match!",
        "links": [
            "https://www.hireall.ie/products/category/wedgwood-gio-gold-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "1000918",
        "name": "Wedding Cake Knife (Case Size 1)",
        "description": "Our wedding cake knife is an essential hire for any wedding. Featuring an attractive polished finish and ornate kings pattern decorating the handle, this visually striking knife adds a sense of splendour to the occasion. Key Features  Case Size: 1 per Case Kings Pattern classic design 18/10 stainless steel knife Hire with our silver circular or square cake stand. Wedding cake table available to hire (3ft or 4ft)  Dimensions (L): 36cm/14in Caterhire Top Tip  Hire with our beautiful selection of wedding cake stands!",
        "links": [
            "https://www.hireall.ie/products/category/afternoon-tea-cake-stands-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "WN05",
        "name": "Windsor Dessert Spoon (Case Size 10)",
        "description": "Our elegant Windsor cutlery is very popular to hire for weddings and formal dining. Styled in classic European tradition, Windsor delivers the finest 18/10 stainless on a timeless shape. This elite pattern celebrates a delicate, scrolled border that culminates in a majestic crown. Key Features  Case Size: 10 per case Available in a full set Washing of cutlery included in rental price Pair with our Gold Rim or Wedgwood white crockery! Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards.",
        "links": [
            "https://www.hireall.ie/products/category/gold-rim-for-hire/",
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "WN02",
        "name": "Windsor Dinner Fork (Case Size 10)",
        "description": "Our elegant Windsor cutlery is very popular to hire for weddings and formal dining. Styled in classic European tradition, Windsor delivers the finest 18/10 stainless on a timeless shape. This elite pattern celebrates a delicate, scrolled border that culminates in a majestic crown. Key Features  Case Size: 10 per case Available in a full set Washing of cutlery included in rental price Pair with our Gold Rim or Wedgwood white crockery! Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards.",
        "links": [
            "https://www.hireall.ie/products/category/gold-rim-for-hire/",
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "WN01",
        "name": "Windsor Dinner Knife (Case Size 10)",
        "description": "Our elegant Windsor cutlery is very popular to hire for weddings and formal dining. Styled in classic European tradition, Windsor delivers the finest 18/10 stainless on a timeless shape. This elite pattern celebrates a delicate, scrolled border that culminates in a majestic crown. Key Features  Case Size: 10 per case Available in a full set Washing of cutlery included in rental price Pair with our Gold Rim or Wedgwood white crockery! Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards.",
        "links": [
            "https://www.hireall.ie/products/category/gold-rim-for-hire/",
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "WN09",
        "name": "Windsor Fish Fork (Case Size 10)",
        "description": "Our elegant Windsor cutlery is very popular to hire for weddings and formal dining. Styled in classic European tradition, Windsor delivers the finest 18/10 stainless on a timeless shape. This elite pattern celebrates a delicate, scrolled border that culminates in a majestic crown. Key Features  Case Size: 10 per case Available in a full set Washing of cutlery included in rental price Pair with our Gold Rim or Wedgwood white crockery! Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards.",
        "links": [
            "https://www.hireall.ie/products/category/gold-rim-for-hire/",
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "WN08",
        "name": "Windsor Fish Knife (Case Size 10)",
        "description": "Our elegant Windsor cutlery is very popular to hire for weddings and formal dining. Styled in classic European tradition, Windsor delivers the finest 18/10 stainless on a timeless shape. This elite pattern celebrates a delicate, scrolled border that culminates in a majestic crown. Key Features  Case Size: 10 per case Available in a full set Washing of cutlery included in rental price Pair with our Gold Rim or Wedgwood white crockery! Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards.",
        "links": [
            "https://www.hireall.ie/products/category/gold-rim-for-hire/",
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "WN07",
        "name": "Windsor Soup Spoon (Case Size 10)",
        "description": "Our elegant Windsor cutlery is very popular to hire for weddings and formal dining. Styled in classic European tradition, Windsor delivers the finest 18/10 stainless on a timeless shape. This elite pattern celebrates a delicate, scrolled border that culminates in a majestic crown. Key Features  Case Size: 10 per case Available in a full set Washing of cutlery included in rental price Pair with our Gold Rim or Wedgwood white crockery! Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards.",
        "links": [
            "https://www.hireall.ie/products/category/gold-rim-for-hire/",
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "WN04",
        "name": "Windsor Starter Fork/Dessert Fork (Case Size 10)",
        "description": "Our elegant Windsor cutlery is very popular to hire for weddings and formal dining. Styled in classic European tradition, Windsor delivers the finest 18/10 stainless on a timeless shape. This elite pattern celebrates a delicate, scrolled border that culminates in a majestic crown. Key Features  Case Size: 10 per case Available in a full set Washing of cutlery included in rental price Pair with our Gold Rim or Wedgwood white crockery! Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards.",
        "links": [
            "https://www.hireall.ie/products/category/gold-rim-for-hire/",
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "WN03",
        "name": "Windsor Starter Knife/Side Knife (Case Size 10)",
        "description": "Our elegant Windsor cutlery is very popular to hire for weddings and formal dining. Styled in classic European tradition, Windsor delivers the finest 18/10 stainless on a timeless shape. This elite pattern celebrates a delicate, scrolled border that culminates in a majestic crown. Key Features  Case Size: 10 per case Available in a full set Washing of cutlery included in rental price Pair with our Gold Rim or Wedgwood white crockery! Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards.",
        "links": [
            "https://www.hireall.ie/products/category/gold-rim-for-hire/",
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/"
        ],
        "blogs": []
    },
    {
        "sku": "WN06",
        "name": "Windsor Teaspoon (Case Size 10)",
        "description": "Our elegant Windsor cutlery is very popular to hire for weddings and formal dining. Styled in classic European tradition, Windsor delivers the finest 18/10 stainless on a timeless shape. This elite pattern celebrates a delicate, scrolled border that culminates in a majestic crown. Key Features  Case Size: 10 per case Available in a full set Washing of cutlery included in rental price Pair with our Gold Rim or Wedgwood white crockery! Caterhire Top Tips Choose a cutlery that complements your table decor style. Place your cutlery on the table in the order of use, starting from the outside and working inwards with each course. Forks should be set to the left of the plate, knives to the right, blade edges facing inwards.",
        "links": [
            "https://www.hireall.ie/products/category/gold-rim-for-hire/",
            "https://www.hireall.ie/products/category/wedgwood-crockery-for-hire/"
        ],
        "blogs": []
    }
]


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
      product.description = product.description.replace(
        match_src_name,
        destination_name
      );

      let additionalContext = "";
      let customFields = await getCustomFields(product.id);
      let newCustomFields = await generateCustomFields(
        product.description,
        hireallCustomFieldNames.tables
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

      if (row.links && row.links.length) {
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

      const updatedFields:any = {
        description: newDescription,
      };

      if (row.name) {
        updatedFields.name = row.name;
      }

      //console.log(updatedFields)
       await updateProduct(product!.id, updatedFields);

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
