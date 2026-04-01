import {
  createProduct,
  productCreationFields,
  productTypes,
} from "../../functions/products/createProduct";

async function create() {
  try {
    require("../../config/config").config("ha");
    const newProducts: productCreationFields[] = [
      {
        type: "physical",
        sku: "LO72A",
        name: "Japanese White Half-Size Room Divider 107 x 126cm (Case Size 1)",
        price: 107.64,
        page_title: "Japanese White Room Divider Hire | 107 x 126cm | Hireall",
        meta_description:
          "Japanese White Room Divider Hire | Flexible Japanese white room divider for events, offices and exhibitions. Call 01-2953821 to book with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1084E",
        name: "Office Chair with Arms - Black (Case Size 1)",
        price: 28.8,
        page_title: "Black Office Chair with Arms Hire | Chairs | Hireall",
        meta_description:
          "Office Chair with Arms – Black | Comfortable black office chair for meetings, conferences and offices. Call 01-2953821 to hire today with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "BARSTR",
        name: "Cocktail Strainer – Short Handle, 2-Prong, Stainless Steel (Case Size 1)",
        price: 5.58,
        page_title: "Cocktail Strainer Hire | Barware | Hireall",
        meta_description:
          "Cocktail Strainer – Stainless Steel | Professional stainless steel cocktail strainer for mobile bars and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "VV30",
        name: "Cocktail Shaker – Copper Cup (Case Size 1)",
        price: 7,
        page_title: "Copper Cocktail Shaker Cup Hire | Bar Equipment | Hireall",
        meta_description:
          "Cocktail Shaker – Copper Cup | Stylish copper cocktail shaker for bars and events. Call 01-2953821 to hire from Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1000537B",
        name: "Mahogany Bar Unit 8Ft (Case Size 1)",
        price: 196.65,
        page_title: "8ft Mahogany Bar Unit Hire | Bars | Hireall",
        meta_description:
          "Mahogany Bar Unit 8Ft | Classic 8ft mahogany bar unit for weddings, parties and corporate events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1000537BACK",
        name: "Mahogany Back Bar Unit (Case Size 1)",
        price: 196.65,
        page_title: "Mahogany Back Bar Unit Hire | Bars | Hireall",
        meta_description:
          "Mahogany Back Bar Unit | Elegant mahogany back bar unit for displaying drinks at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "904UB",
        name: "Heated Carvery Unit – 2 Lamp (S/Steel, Electric) (Case Size 1)",
        price: 97.55,
        page_title: "2 Lamp Heated Carvery Unit Hire | Catering | Hireall",
        meta_description:
          "Heated Carvery Unit – 2 Lamp | 2 lamp heated carvery unit for serving hot food at events. Call 01-2953821 to hire from Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "673",
        name: "Blue Chopping Board (Small) (Case Size 1)",
        price: 5.65,
        page_title: "Blue Chopping Board Small Hire | Catering | Hireall",
        meta_description:
          "Blue Chopping Board Small | Small blue chopping board for safe food prep at events. Call 01-2953821 to hire from Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "675",
        name: "Brown Chopping Board (Small) (Case Size 1)",
        price: 5.65,
        page_title: "Brown Chopping Board Small Hire | Catering | Hireall",
        meta_description:
          "Brown Chopping Board Small | Small brown chopping board for food prep at events and catering. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "677",
        name: "Yellow Chopping Board (Small) (Case Size 1)",
        price: 5.65,
        page_title: "Yellow Chopping Board Small Hire | Catering | Hireall",
        meta_description:
          "Yellow Chopping Board Small | Small yellow chopping board for event catering and food prep. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "672LG",
        name: "White Chopping Board (Large) (Case Size 1)",
        price: 9.76,
        page_title: "White Chopping Board Large Hire | Catering | Hireall",
        meta_description:
          "White Chopping Board Large | Large white chopping board for professional event food prep. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "673LG",
        name: "Blue Chopping Board (Large) (Case Size 1)",
        price: 9.76,
        page_title: "Blue Chopping Board Large Hire | Catering | Hireall",
        meta_description:
          "Blue Chopping Board Large | Large blue chopping board for catering and event kitchens. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "674L",
        name: "Green Chopping Board (Large) (Case Size 1)",
        price: 9.76,
        page_title: "Green Chopping Board Large Hire | Catering | Hireall",
        meta_description:
          "Green Chopping Board Large | Large green chopping board for safe food prep at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "675LG",
        name: "Brown Chopping Board (Large) (Case Size 1)",
        price: 9.76,
        page_title: "Brown Chopping Board Large Hire | Catering | Hireall",
        meta_description:
          "Brown Chopping Board Large | Large brown chopping board for event catering and prep. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "676L",
        name: "Red Chopping Board (Large) (Case Size 1)",
        price: 9.76,
        page_title: "Red Chopping Board Large Hire | Catering | Hireall",
        meta_description:
          "Red Chopping Board Large | Large red chopping board for professional food prep at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "677L",
        name: "Yellow Chopping Board (Large) (Case Size 1)",
        price: 9.76,
        page_title: "Yellow Chopping Board Large Hire | Catering | Hireall",
        meta_description:
          "Yellow Chopping Board Large | Large yellow chopping board for catering and event kitchens. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "409GAS",
        name: "15 Rack Gastro Trolley (Case Size 1)",
        price: 84.1,
        page_title: "15 Rack Gastro Trolley Hire | Catering | Hireall",
        meta_description:
          "15 Rack Gastro Trolley | 15 rack gastro trolley for transporting trays at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "2008",
        name: "Ascot Teaspoon (Case Size 1)",
        price: 0.52,
        page_title: "Ascot Teaspoon Hire | Cutlery Hire | Hireall",
        meta_description:
          "Ascot Teaspoon | Ascot teaspoons for hire, perfect for weddings and formal dining. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "885",
        name: "Steak Knife – Black Handle (Case Size 1)",
        price: 0.96,
        page_title: "Steak Knife Black Handle Hire | Cutlery Hire | Hireall",
        meta_description:
          "Steak Knife – Black Handle | Black handle steak knives for formal dining and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "737",
        name: "Ivory Linen Tablecloth 70in X 70in (Case Size 1)",
        price: 13.2,
        page_title: "Ivory Linen Tablecloth 70in Hire | Table Linen | Hireall",
        meta_description:
          "Ivory Linen Tablecloth 70in x 70in | Elegant ivory tablecloth for weddings, parties and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1000750",
        name: "Cotton Chair Tie (Wide) - Navy (Case Size 1)",
        price: 3.03,
        page_title: "Navy Cotton Chair Tie Hire | Linen Hire | Hireall",
        meta_description:
          "Cotton Chair Tie – Navy | Navy cotton chair ties for stylish seating at weddings and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1000575B",
        name: "Pod Table Topper – Navy (Case Size 1)",
        price: 3.03,
        page_title: "Navy Pod Table Topper Hire | Linen Hire| Hireall",
        meta_description:
          "Pod Table Topper – Navy | Navy pod table topper for cocktail tables and receptions. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "10007868A",
        name: "Satin Chair Tie Tie (Wide) - Gold (Case Size 1)",
        price: 3.03,
        page_title: "Gold Satin Chair Tie Hire | Linen Hire| Hireall",
        meta_description:
          "Satin Chair Tie – Gold | Gold satin chair ties for weddings and luxury event seating. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1000660",
        name: "Round Table Protector 8Ft (Case Size 1)",
        price: 14.8,
        page_title: "8ft Round Table Protector Hire | Linen Hire | Hireall",
        meta_description:
          "Round Table Protector 8Ft | 8ft round table protector for event tables. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "SP002",
        name: "Black Spandex 8Ft X 30",
        price: 25.88,
        page_title: "Black Spandex 8ft Table Cover Hire | Linen Hire | Hireall",
        meta_description:
          "Black Spandex 8Ft Table Cover | Black spandex table cover for modern events and exhibitions. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1000182",
        name: "Sage Parasol (Case Size 1)",
        price: 22.28,
        page_title: "Sage Parasol Hire | Outdoor Furniture Hire | Hireall",
        meta_description:
          "Sage Parasol | Sage parasol for outdoor seating and garden events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "PICKET1",
        name: "White Picket Fence 1.2M (Case Size 1)",
        price: 34.72,
        page_title: "White Picket Fence 1.2m Hire | Furniture Hire | Hireall",
        meta_description:
          "White Picket Fence 1.2m | 1.2m white picket fence panels for weddings and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "PICKET2",
        name: "White Picket Fence 2m (Case Size 1)",
        price: 34.82,
        page_title: "White Picket Fence 2m Hire | Furniture Hire | Hireall",
        meta_description:
          "White Picket Fence 2m | 2m white picket fence panels for outdoor décor and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "SSFS0010A",
        name: "Stainless Steel Hand Sanitising Unit (Case Size 1)",
        price: 156.75,
        page_title: "Stainless Steel Sanitising Unit Hire | Hygiene | Hireall",
        meta_description:
          "Stainless Steel Hand Sanitising Unit | Stainless steel hand sanitiser unit for events and workplaces. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1000905S",
        name: "Solid Top Chest Freezer - C/W Trolley (Electric.) (Case Size 1)",
        price: 201.83,
        page_title:
          "Solid Top Chest Freezer Hire | Catering Equipment | Hireall",
        meta_description:
          "Solid Top Chest Freezer with Trolley | Chest freezer with trolley for catering events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "924B",
        name: "Hot Servery – 4 Well Dry Unit With Lights (Case Size 1)",
        price: 262.38,
        page_title:
          "4 Well Hot Servery Unit Hire | Catering Equipment | Hireall",
        meta_description:
          "Hot Servery – 4 Well Dry Unit | 4 well hot servery unit for serving hot food at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1000809",
        name: "Sugar Tongs (Case Size 1)",
        price: 1.69,
        page_title: "Sugar Tongs Hire | Table Service Hire | Hireall",
        meta_description:
          "Sugar Tongs | Sugar tongs for tea and coffee stations at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "3607",
        name: "Stainless Steel Tea Pot 35cl (Case Size 1)",
        price: 2.02,
        page_title:
          "Stainless Steel Tea Pot 35cl Hire | Hot Beverage Service | Hireall",
        meta_description:
          "Stainless Steel Tea Pot 35cl | 35cl stainless steel teapot for hot beverage service at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "245A",
        name: "Stainless Steel Round Bread Basket 24cm (Case Size 1)",
        price: 2.15,
        page_title: "Stainless Steel Bread Basket 24cm Hire | Hireall",
        meta_description:
          "Stainless Steel Bread Basket 24cm | 24cm bread basket for table service at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "415BL",
        name: "Small Food Tongs (Case Size 1)",
        price: 2.15,
        page_title: "Small Food Tongs Hire | Catering Equipment | Hireall",
        meta_description:
          "Small Food Tongs | Small food tongs for buffets and serving stations at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "465A",
        name: "Plastic Serving Tray (Case Size 1)",
        price: 2.31,
        page_title: "Plastic Serving Tray Hire | Catering Equipment | Hireall",
        meta_description:
          "Plastic Serving Tray | Plastic serving trays for catering and table service at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "237",
        name: "Large Stainless Steel Mixing Bowl (Case Size 1)",
        price: 2.65,
        page_title: "Large Stainless Steel Mixing Bowl Hire | Hireall",
        meta_description:
          "Large Stainless Steel Mixing Bowl | Large mixing bowl for catering kitchens and food prep. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1000474A",
        name: "Round Glass Serving Bowl - 1.5L (Case Size 1)",
        price: 3.38,
        page_title: "Round Glass Serving Bowl 1.5L Hire | Hireall",
        meta_description:
          "Round Glass Serving Bowl – 1.5L | 1.5L round glass serving bowl for buffets and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "886",
        name: "Wooden Pepper Mill 30cm (Case Size 1)",
        price: 3.62,
        page_title: "Wooden Pepper Mill 30cm Hire | Table Service | Hireall",
        meta_description:
          "Wooden Pepper Mill 30cm | 30cm wooden pepper mill for dining tables and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "KILNER001",
        name: "Kilner Cliptop Jar 0.1L (Case Size 1)",
        price: 4.05,
        page_title: "Kilner Cliptop Jar 0.1L Hire | Hireall",
        meta_description:
          "Kilner Cliptop Jar 0.1L | 0.1L Kilner cliptop jar for table displays and serving. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "464",
        name: "Round Melamine Cake Stand - White 33Cm (Case Size 1)",
        price: 10.11,
        page_title: "White Round Cake Stand 33cm Hire | Hireall",
        meta_description:
          "Round Melamine Cake Stand – White 33cm | 33cm cake stand for dessert displays at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "KILNER005",
        name: "Kilner Cliptop Jar 3L (Case Size 1)",
        price: 12.44,
        page_title: "Kilner Cliptop Jar 3L Hire | Hireall",
        meta_description:
          "Kilner Cliptop Jar 3L | 3L Kilner cliptop jar for displays and event catering. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "172",
        name: "Pump Action Flask 2.5L (Case Size 1)",
        price: 18.75,
        page_title: "Pump Action Flask 2.5L Hire | Beverage Service | Hireall",
        meta_description:
          "Pump Action Flask 2.5L | 2.5L pump action flask for hot beverage service at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "AFT2",
        name: "3 Tier Afternoon Tea Stand - Silver (For 13cm Plates) (Case Size 1)",
        price: 24.21,
        page_title: "3 Tier Afternoon Tea Stand Hire | Silver | Hireall",
        meta_description:
          "3 Tier Afternoon Tea Stand – Silver | Silver 3 tier afternoon tea stand for elegant events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "409GAS12",
        name: "12 Rack Gastro Trolley (Case Size 1)",
        price: 84.1,
        page_title:
          "12 Rack Gastro Trolley Hire | Catering Equipment | Hireall",
        meta_description:
          "12 Rack Gastro Trolley | 12 rack gastro trolley for catering events and transport. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "409GAS20",
        name: "20 Rack Gastro Trolley (Case Size 1)",
        price: 84.1,
        page_title:
          "20 Rack Gastro Trolley Hire | Catering Equipment | Hireall",
        meta_description:
          "20 Rack Gastro Trolley | 20 rack gastro trolley for large catering events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "NOTB",
        name: "Office Notice Board 4Ft X 3Ft (Case Size 1)",
        price: 62.67,
        page_title: "Office Notice Board 4ft x 3ft Hire | Hireall",
        meta_description:
          "Office Notice Board 4ft x 3ft | 4ft x 3ft office notice board for meetings and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "LO72B",
        name: "Japanese White Room Divider 106cm X 45cm X 243cm (Case Size 1)",
        price: 146.25,
        page_title: "Japanese White Room Divider Hire | 243cm | Hireall",
        meta_description:
          "Japanese White Room Divider 243cm | Full height Japanese room divider for offices and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "WHB001",
        name: "Office White Board – 4ft x 3ft (Case Size 1)",
        price: 40.32,
        page_title: "Office Whiteboard 4ft x 3ft Hire | Hireall",
        meta_description:
          "Office White Board 4ft x 3ft | 4ft x 3ft whiteboard for meetings, training and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "ALASKA1A",
        name: "Alaska Black Leather 3 Seater Sofa (Case Size 1)",
        price: 320.85,
        page_title: "Alaska Black Leather 3 Seater Sofa Hire | Hireall",
        meta_description:
          "Alaska Black Leather 3 Seater Sofa | Black leather 3 seater sofa for lounges and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "704",
        name: "2 Ring Gas Cooker (Case Size 1)",
        price: 62.58,
        page_title: "2 Ring Gas Cooker Hire | Catering Equipment | Hireall",
        meta_description:
          "2 Ring Gas Cooker | 2 ring gas cooker for mobile catering and event kitchens. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1000016A",
        name: "Large Plater Warmer (Case Size 1)",
        price: 102.94,
        page_title: "Large Plate Warmer Hire | Catering Equipment | Hireall",
        meta_description:
          "Large Plater Warmer | Large plate warmer for professional catering at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "910C",
        name: "Electric Burger Griddle (Case Size 1)",
        price: 133.21,
        page_title:
          "Electric Burger Griddle Hire | Catering Equipment | Hireall",
        meta_description:
          "Electric Burger Griddle | Electric burger griddle for catering events and kitchens. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1000116A",
        name: "Plain Glass Water Jug 1.3L (Case Size 1)",
        price: 2.35,
        page_title: "Plain Glass Water Jug 1.3L Hire | Hireall",
        meta_description:
          "Plain Glass Water Jug 1.3L | 1.3L glass water jug for table service at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "206S",
        name: "Stainless Steel Pouring Jug 80cl (Case Size 1)",
        price: 2.83,
        page_title: "Stainless Steel Pouring Jug 80cl Hire | Hireall",
        meta_description:
          "Stainless Steel Pouring Jug 80cl | 80cl pouring jug for table service at weddings and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "210",
        name: "Stainless Steel Oval Vegetable Dish 25cm (Case Size 1)",
        price: 4.38,
        page_title: "Stainless Steel Oval Veg Dish 25cm Hire | Hireall",
        meta_description:
          "Stainless Steel Oval Vegetable Dish 25cm | 25cm oval veg dish for table service at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "669",
        name: "4 Section Cutlery Tray (Case Size 1)",
        price: 5.52,
        page_title: "4 Section Cutlery Tray Hire | Catering | Hireall",
        meta_description:
          "4 Section Cutlery Tray | 4 section cutlery tray for organising catering service areas. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "121WH",
        name: "White Round Serving Bowl 25cm x 10cm (Case Size 1)",
        price: 6.58,
        page_title: "White Round Serving Bowl 25cm Hire | Hireall",
        meta_description:
          "White Round Serving Bowl 25cm | 25cm serving bowl for table service at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1000356",
        name: "1/2 Section Insert 6cm (Case Size 1)",
        price: 4.73,
        page_title: "1/2 Section Insert 6cm Hire | Catering | Hireall",
        meta_description:
          "1/2 Section Insert 6cm | 1/2 gastronorm insert for catering setups and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "953",
        name: "1/3 Section Insert 10cm (Case Size 1)",
        price: 3.9,
        page_title: "1/3 Section Insert 10cm Hire | Catering | Hireall",
        meta_description:
          "1/3 Section Insert 10cm | 1/3 gastronorm insert for catering events and kitchens. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "984IN",
        name: "Full Section Insert 3cm (Case Size 1)",
        price: 6.82,
        page_title: "Full Section Insert 3cm Hire | Catering | Hireall",
        meta_description:
          "Full Section Insert 3cm | Full size gastronorm insert for catering and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "950",
        name: "Full Perforated Insert 5cm (Case Size 1)",
        price: 7.31,
        page_title: "Full Perforated Insert 5cm Hire | Catering | Hireall",
        meta_description:
          "Full Perforated Insert 5cm | Full perforated insert for catering kitchens and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1000324",
        name: "White Deep Oval Vegetable Dish 25cm (Case Size 1)",
        price: 6.07,
        page_title: "White Deep Oval Veg Dish 25cm Hire | Hireall",
        meta_description:
          "White Deep Oval Vegetable Dish 25cm | Deep oval veg dish for table service at weddings and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "F028",
        name: "Chloe Brooch for Chameleon Chair (Case Size 1)",
        price: 1.21,
        page_title: "Chloe Brooch for Chameleon Chair Hire | Hireall",
        meta_description:
          "Chloe Brooch for Chameleon Chair | Chloe brooch for chameleon chairs for hire at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "F020",
        name: "Chloe Brooch & Blush Pink Belt for Chameleon Chair (Case Size 1)",
        price: 1.3,
        page_title: "Chloe Brooch & Blush Belt Hire | Linen Hire | Hireall",
        meta_description:
          "Chloe Brooch & Blush Pink Belt | Chloe brooch with blush pink belt for chair styling at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "300",
        name: "2 Part Oval Table 10ft x 5ft (Case Size 1)",
        price: 34.82,
        page_title: "Oval Table 10ft x 5ft Hire | 2 Part | Hireall",
        meta_description:
          "2 Part Oval Table 10ft x 5ft | 10ft x 5ft oval table for weddings and banquets. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "1000365",
        name: "Steel Serving Bucket 8.5cm (Case Size 1)",
        price: 4.25,
        page_title: "Steel Serving Bucket 8.5cm Hire | Buffet Hire | Hireall",
        meta_description:
          "Steel Serving Bucket 8.5cm | 8.5cm steel serving bucket for chips and sides at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "3031B",
        name: "Black Milk Jug (Case Size 1)",
        price: 3.9,
        page_title: "Black Milk Jug Hire | Crockery Hire | Hireall",
        meta_description:
          "Black Milk Jug | Black milk jug for coffee stations and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "ALICE0025",
        name: "Blue Toadstool Stool (Case Size 1)",
        price: 19.59,
        page_title: "Blue Toadstool Stool Hire | Chair Hire | Hireall",
        meta_description:
          "Blue Toadstool Stool | Blue toadstool stool for event seating and casual areas. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "LOCK04",
        name: "4 Door Office Locker (Case Size 1)",
        price: 69.62,
        page_title: "4 Door Office Locker Hire | Office Furniture | Hireall",
        meta_description:
          "4 Door Office Locker | 4 door office locker for staff storage at events and workplaces. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "FB0001",
        name: "Portable Insulated Food Container (Case Size 1) ",
        price: 77,
        page_title: "Portable Insulated Food Container Hire | Hireall",
        meta_description:
          "Portable Insulated Food Container | Portable insulated food container to keep food hot or cold. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "547",
        name: "Cotton Napkin - Gold Ivy Leaf 51cm x 51cm (Case Size 1)",
        price: 2.92,
        page_title: "Gold Ivy Leaf Cotton Napkin Hire | 51cm | Hireall",
        meta_description:
          "Cotton Napkin – Gold Ivy Leaf | Gold ivy leaf cotton napkin for weddings and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "550",
        name: "Cotton Napkin - Green Ivy Leaf 51cm x 51cm (Case Size 1)",
        price: 2.92,
        page_title: "Green Ivy Leaf Cotton Napkin Hire | 51cm | Hireall",
        meta_description:
          "Cotton Napkin – Green Ivy Leaf | Green ivy leaf cotton napkin for table styling at events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "575A",
        name: "Cotton Napkin - Light Blue Ivy Leaf 51cm x 51cm (Case Size 1)",
        price: 2.92,
        page_title: "Light Blue Ivy Leaf Napkin Hire | 51cm | Hireall",
        meta_description:
          "Cotton Napkin – Light Blue Ivy Leaf | Light blue ivy leaf napkin for weddings and events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "K02",
        name: "Black Canopy - 20ft x 10ft (Case Size 1)",
        price: 359.24,
        page_title: "Black Canopy 20ft x 10ft Hire | Outdoor | Hireall",
        meta_description:
          "Black Canopy 20ft x 10ft | 20ft x 10ft black canopy for shelter at outdoor events. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
      {
        type: "physical",
        sku: "POD12",
        name: "Silver Wood Round Pod Table Top 60cm (Case Size 1)",
        price: 19.59,
        page_title: "Silver Wood Round Pod Table Top 60cm Hire | Hireall",
        meta_description:
          "Silver Wood Round Pod Table Top 60cm | 60cm silver wood round pod table top for cocktail tables. Call 01-2953821 to hire with Hireall.",
        is_visible: "FALSE",
      },
    ].map((c) => ({
      ...c,
      weight: 1,
      cost_price: 0,
      is_visible: false,
      type: c.type as productTypes,
    }));
    for (let i = 0; i < newProducts.length; i++) {
      console.log(i, newProducts.length);
      const row = newProducts[i];
      try {
        await createProduct(row);
        await new Promise((res) => setTimeout(res, 2000));
      } catch (err: any) {
        if (err.response.data.status === 409) continue;
        throw err;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

create();
