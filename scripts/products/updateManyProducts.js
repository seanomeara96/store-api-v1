(async () => {
  const { updateProduct } = require("../../functions/products/updateProduct");

  require("../../config/config").config("ha");

  const data = [
    {
      "Product ID": 149,
      "Product Name": "Linen Tablecloth White Ivy Leaf 72in x 144in",
      "Product Type": "P",
      "Product Code/SKU": "509",
      Category: "Rent Now/Linen Hire;Rent Now/Linen Hire/White Linen",
      Daryl: null,
      "Page Title":
        "Linen Tablecloth White Ivy Leaf 72in x 144in For Hire : HireAll",
      "Meta Keywords": "",
      md: "Hire high-quality linen tablecloths from Hireall in Dublin. Our white ivy leaf tablecloth measures 72in x 144in, adding a touch of elegance to events. Hire now!",
    },
    {
      "Product ID": 163,
      "Product Name": "Samsonite Folding Chair",
      "Product Type": "P",
      "Product Code/SKU": "333A",
      Category:
        "Rent Now/Chair Hire;Rent Now/Chair Hire/Conference & Event Chairs;Rent Now/Chair Hire/Outdoor Chairs",
      Daryl: null,
      "Page Title": "Samsonite Folding Chair For Hire : HireAll",
      "Meta Keywords": "folding chair, cheap chair",
      md: "Make your event comfortable and stylish with our Samsonite folding chairs. Available for hire from Hireall in Dublin. Hire yours today!",
    },
    {
      "Product ID": 166,
      "Product Name": "Elegance Champagne Flute 6oz",
      "Product Type": "P",
      "Product Code/SKU": "1000128",
      Category:
        "Rent Now/Glassware Hire;Rent Now/Glassware Hire/Champagne Glasses",
      Daryl: null,
      "Page Title": "Elegance Champagne Flute 6oz For Hire : HireAll",
      "Meta Keywords": "champagne glass 6oz glass",
      md: "Impress your guests with our elegant champagne flutes, available for hire from Hireall in Dublin. Each flute holds 6oz of your favorite bubbly! Hire yours now!",
    },
    {
      "Product ID": 179,
      "Product Name": "Linen Tablecloth White Round 130in",
      "Product Type": "P",
      "Product Code/SKU": "1000609",
      Category: "Rent Now/Linen Hire;Rent Now/Linen Hire/White Linen",
      Daryl: null,
      "Page Title": "Linen Tablecloth White Round 130in For Hire : HireAll",
      "Meta Keywords": "white linen, table cloth",
      md: "Add a touch of elegance to your event with our white round 130in linen tablecloth. Available for hire from Hireall in Dublin today!",
    },
    {
      "Product ID": 186,
      "Product Name": "Folding Chair Blue",
      "Product Type": "P",
      "Product Code/SKU": "1000536",
      Category:
        "Rent Now/Chair Hire;Rent Now/Chair Hire/Conference & Event Chairs;Rent Now/Chair Hire/Outdoor Chairs",
      Daryl: null,
      "Page Title": "Folding Chair Blue For Hire : HireAll",
      "Meta Keywords": "folding chair, blue chair",
      md: "Make your event comfortable and stylish with our folding chairs in blue. Available for hire from Hireall in Dublin. Order today!",
    },
    {
      "Product ID": 241,
      "Product Name": "Arcade Teaspoon",
      "Product Type": "P",
      "Product Code/SKU": "2008",
      Category: "Rent Now/Cutlery Hire;Rent Now/Cutlery Hire/Arcade",
      Daryl: null,
      "Page Title": "Arcade Teaspoon For Hire : HireAll",
      "Meta Keywords":
        "Teaspoon, cutlery, stainless steel cutlery, Wedgwood Cutlery",
      md: "Add a touch of elegance to your table setting with our Arcade teaspoons. Available for hire from Hireall in Dublin. Order yours now!",
    },
    {
      "Product ID": 246,
      "Product Name": "Padded Banquet Chair Red / Blue",
      "Product Type": "P",
      "Product Code/SKU": "PADBLUE01",
      Category:
        "Rent Now/Chair Hire;Rent Now/Chair Hire/Conference & Event Chairs;Rent Now/Chair Hire/Banquet & Dining Chairs;Rent Now/Christmas Special Offers",
      Daryl: null,
      "Page Title": "Padded Banquet Chair For Hire : HireAll",
      "Meta Keywords":
        "banquet chair hire, banquet chair rent, banquet chair rental",
      md: "Keep your guests comfortable with our padded banquet chairs, available in red and blue. Hire from Hireall in Dublin today!",
    },
    {
      "Product ID": 334,
      "Product Name": "Chiavari Chair Limewash (Deluxe)",
      "Product Type": "P",
      "Product Code/SKU": "1000546",
      Category:
        "Rent Now/Chair Hire/Wedding Chairs;Rent Now/Chair Hire;Rent Now/Chair Hire/Banquet & Dining Chairs;Rent Now/Christmas Special Offers",
      Daryl: null,
      "Page Title": "Chiavari Chair Limewash (Deluxe) For Hire : HireAll",
      "Meta Keywords":
        "chiavari chair hire, chiavari chair rent, chiavari chair rental, chiavari chair wedding hire, chiavari chair wedding rent, chiavari chair wedding rental, Lime Wash chiavari chair hire,Lime Wash chiavari chair rent, Lime Wash chiavari chair rental",
      md: "Add a touch of luxury to your event with our limewash chiavari chairs. Available for hire from Hireall in Dublin. Get yours now!",
    },
    {
      "Product ID": 354,
      "Product Name": "Linen Napkin White 20in x 20in",
      "Product Type": "P",
      "Product Code/SKU": "1000601",
      Category:
        "Rent Now/Linen Hire;Rent Now/Linen Hire/White Linen;Rent Now/Linen Hire/Napkins",
      Daryl: null,
      "Page Title": "Linen Napkin White 20in x 20in For Hire : HireAll",
      "Meta Keywords": "white linen, linen napkins",
      md: "Keep your table setting stylish and coordinated with our white 20in x 20in linen napkins. Available for hire from Hireall in Dublin. Hire yours today!",
    },
    {
      "Product ID": 360,
      "Product Name": "Chrome Stanchion Pillar",
      "Product Type": "P",
      "Product Code/SKU": "1000526A",
      Category:
        "Rent Now/Furniture Hire;Rent Now/Furniture Hire/Conference & Event Essentials",
      Daryl: null,
      "Page Title": "Chrome Stanchion Pillar For Hire : HireAll",
      "Meta Keywords":
        "foyer hire, foyer equipment hire, party foyer hire, event foyer hire, barrier for hire, barrier for rent, covid19 barrier for crowds, covid 19 barrier for hire, crowd management barrier for hire",
      md: "Add a touch of sophistication to your event with our chrome stanchion pillars. Available for hire from Hireall in Dublin. Hire today!",
    },
    {
      "Product ID": 396,
      "Product Name": "Linen Tablecloth White Round 120in",
      "Product Type": "P",
      "Product Code/SKU": "1000608",
      Category: "Rent Now/Linen Hire;Rent Now/Linen Hire/White Linen",
      Daryl: null,
      "Page Title": "Linen Tablecloth White Round 120in For Hire : HireAll",
      "Meta Keywords": "round cloth, white table cloth",
      md: "Make your event elegant and stylish with our white round 120in linen tablecloth. Available for hire from Hireall in Dublin. Order yours now!",
    },
    {
      "Product ID": 424,
      "Product Name": "Wooden Picnic Bench",
      "Product Type": "P",
      "Product Code/SKU": "372",
      Category:
        "Rent Now/Chair Hire;Rent Now/Outdoor Furniture & BBQ;Rent Now/Outdoor Furniture & BBQ/Outdoor Seating;Rent Now/Chair Hire/Benches",
      Daryl: null,
      "Page Title": "Wooden Picnic Bench For Hire : HireAll",
      "Meta Keywords":
        "picnic bench hire, picnic bench rent, picnic bench rental, picnic table hire, picnic table rent, picnic table rental,",
      md: "Add a touch of outdoor charm to your event with our wooden picnic benches. Available for hire from Hireall in Dublin. Order yours today!",
    },
    {
      "Product ID": 425,
      "Product Name": "Linen Tablecloth White Ivy Leaf 70in x 108in",
      "Product Type": "P",
      "Product Code/SKU": "1000651",
      Category: "Rent Now/Linen Hire;Rent Now/Linen Hire/White Linen",
      Daryl: null,
      "Page Title":
        "Linen Tablecloth White Ivy Leaf 70in x 108in For Hire : HireAll",
      "Meta Keywords": "",
      md: "Make your event elegant and stylish with our white ivy leaf 70in x 108in linen tablecloth. Available for hire from Hireall in Dublin. Hire today!",
    },
    {
      "Product ID": 461,
      "Product Name": "Upright Cooler Cabinet Glass Door",
      "Product Type": "P",
      "Product Code/SKU": "1000904",
      Category:
        "Rent Now/Catering Equipment Hire;Rent Now/Catering Equipment Hire/Refrigeration Hire",
      Daryl: null,
      "Page Title": "Upright Cooler Cabinet Glass Door For Hire : HireAll",
      "Meta Keywords": "cooling cabinet, fridge",
      md: "Keep your refreshments cool and fresh with our upright cooler cabinet with glass door. Available for hire from Hireall in Dublin. Hire now!",
    },
    {
      "Product ID": 507,
      "Product Name": "Banquet Cart Single 2 Door",
      "Product Type": "P",
      "Product Code/SKU": "1000017",
      Category:
        "Rent Now/Catering Equipment Hire;Rent Now/Catering Equipment Hire/Cooking & Warming Equipment",
      Daryl: null,
      "Page Title": "Banquet Cart Single 2 Door For Hire : HireAll",
      "Meta Keywords": "alto sham hire, alto sham rent, alto sham rental",
      md: "Make serving food and drinks easy with our single 2 door banquet cart. Available for hire from Hireall in Dublin. Order yours now!",
    },
    {
      "Product ID": 550,
      "Product Name": "Slim Jim 12oz",
      "Product Type": "P",
      "Product Code/SKU": "1000138",
      Category:
        "Rent Now/Glassware Hire;Rent Now/Glassware Hire/Water Glasses;Rent Now/Glassware Hire/Beer Glasses",
      Daryl: null,
      "Page Title": "Slim Jim 12oz For Hire : HireAll",
      "Meta Keywords": "slim jim 12oz, water glass",
      md: "Serve your favorite drinks in style with our Slim Jim glasses, available in 12oz and 10oz sizes. Hire from Hireall in Dublin today!",
    },
    {
      "Product ID": 591,
      "Product Name": "Cabernet Red Wine Glass 12oz",
      "Product Type": "P",
      "Product Code/SKU": "1000132",
      Category: "Rent Now/Glassware Hire;Rent Now/Glassware Hire/Wine Glasses",
      Daryl: null,
      "Page Title": "Cabernet Red Wine Glass 12oz For Hire : HireAll",
      "Meta Keywords": "red wine glass, 11 oz glass",
      md: "Impress your guests with our Cabernet red wine glasses, each holding 12oz of your favorite vintage. Available for hire from Hireall in Dublin. Order today!",
    },
    {
      "Product ID": 623,
      "Product Name": "Cabernet White Wine Glass 8oz",
      "Product Type": "P",
      "Product Code/SKU": "1000130",
      Category: "Rent Now/Glassware Hire;Rent Now/Glassware Hire/Wine Glasses",
      Daryl: null,
      "Page Title": "Cabernet White Wine Glass 8oz For Hire : HireAll",
      "Meta Keywords": "white wine glass, 8oz glass",
      md: "Serve your favorite white wines in style with our Cabernet white wine glasses, each holding 8oz. Available for hire from Hireall in Dublin. Order now!",
    },
    {
      "Product ID": 624,
      "Product Name": "Slim Jim 10oz",
      "Product Type": "P",
      "Product Code/SKU": "1000107",
      Category:
        "Rent Now/Glassware Hire;Rent Now/Glassware Hire/Water Glasses;Rent Now/Glassware Hire/Beer Glasses",
      Daryl: null,
      "Page Title": "Slim Jim 10oz For Hire : HireAll",
      "Meta Keywords": "10oz slim jim, water glass",
      md: "Serve your favorite drinks in style with our Slim Jim glasses, available in 12oz and 10oz sizes. Hire from Hireall in Dublin today!",
    },
    {
      "Product ID": 753,
      "Product Name": "Table Rectangular 6ft x 24in",
      "Product Type": "P",
      "Product Code/SKU": "1000510",
      Category:
        "Rent Now/Table Hire;Rent Now/Table Hire/Banquet & Dining Tables;Rent Now/Table Hire/Exam Tables",
      Daryl: null,
      "Page Title": "Table Rectangular 6ft x 24in For Hire : HireAll",
      "Meta Keywords": "6ft x 2ft table, trestle table",
      md: "Make your event comfortable and stylish with our rectangular 6ft x 24in tables. Available for hire from Hireall in Dublin. Get yours today!",
    },
    {
      "Product ID": 766,
      "Product Name": "Arcade Dinner Fork",
      "Product Type": "P",
      "Product Code/SKU": "2005",
      Category: "Rent Now/Cutlery Hire;Rent Now/Cutlery Hire/Arcade",
      Daryl: null,
      "Page Title": "Arcade Dinner Fork For Hire : HireAll",
      "Meta Keywords":
        "Dinner fork hire dinner fork rent, cutlery rent, stainless steel cutlery, Wedgwood Cutlery",
      md: "Add a touch of elegance to your table setting with our Arcade dinner forks. Available for hire from Hireall in Dublin. Order yours now!",
    },
    {
      "Product ID": 910,
      "Product Name": "Linen Tablecloth White Ivy Leaf 90in x 90in",
      "Product Type": "P",
      "Product Code/SKU": "1000606",
      Category: "Rent Now/Linen Hire;Rent Now/Linen Hire/White Linen",
      Daryl: null,
      "Page Title":
        "Linen Tablecloth White Ivy Leaf 90in x 90in For Hire : HireAll",
      "Meta Keywords": "white linen, table cloth",
      md: "Make your event elegant and stylish with our white ivy leaf 90in x 90in linen tablecloth. Available for hire from Hireall in Dublin. Hire yours today!",
    },
    {
      "Product ID": 938,
      "Product Name": "Brass Handle Chafer Unit",
      "Product Type": "P",
      "Product Code/SKU": "1000416",
      Category:
        "Rent Now/Buffetware & Table Service Hire;Rent Now/Catering Equipment Hire;Rent Now/Catering Equipment Hire/Chafer Units & Gastronorm Inserts;Rent Now/Buffetware & Table Service Hire/Chafer Units & Accessories",
      Daryl: null,
      "Page Title": "Brass Handle Chafer Unit For Hire : HireAll",
      "Meta Keywords": "chafer unit, food warmer",
      md: "Keep your food warm and ready to serve with our brass handle chafer unit. Available for hire from Hireall in Dublin. Hire yours today!",
    },
    {
      "Product ID": 1062,
      "Product Name": "White Square Pod Table",
      "Product Type": "P",
      "Product Code/SKU": "POD17",
      Category:
        "Rent Now/Table Hire;Rent Now/Table Hire/Cocktail & Bistro Tables",
      Daryl: null,
      "Page Title": "White Square Pod Table For Hire : HireAll",
      "Meta Keywords": "",
      md: "Add a touch of modern elegance to your event with our white square pod tables. Available for hire from Hireall in Dublin. Order now!",
    },
    {
      "Product ID": 1117,
      "Product Name": "Combi Oven 10 Rack",
      "Product Type": "P",
      "Product Code/SKU": "927",
      Category:
        "Rent Now/Catering Equipment Hire;Rent Now/Catering Equipment Hire/Cooking & Warming Equipment",
      Daryl: null,
      "Page Title": "Combi Oven 10 Rack For Hire : HireAll",
      "Meta Keywords": "blue seal oven, professional oven",
      md: "Make large-scale catering easy with our 10 rack combi oven. Available for hire from Hireall in Dublin. Order today!",
    },
  ];
  let count = 1;
  try {
    for (const p of data) {
      console.clear();
      console.log("Updating " + p["Product Name"], p["Product ID"]);
      await updateProduct(p["Product ID"], {
        meta_description: p.md,
      });
      console.log(`Updated ${count}/${data.length}`);
      count++;
    }
  } catch (err) {
    console.log(err);
  }
})();
