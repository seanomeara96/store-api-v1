import { contactcenterinsights } from "googleapis/build/src/apis/contactcenterinsights";
import { updateProduct } from "../../functions/products/updateProduct";
(async () => {
  require("../../config/config").config("ch");

  const data = [
    {
      id: 113,
      page_title:
        "Club Armchair Black Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our club armchair black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 114,
      page_title:
        "Silver Round Cake Stand 16in Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our silver round cake stand 16in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 115,
      page_title:
        "Windsor Soup Spoon (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our windsor soup spoon (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 117,
      page_title:
        "Spandex Pod Table Topper Animal Print Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our spandex pod table topper animal print for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 119,
      page_title: "Bottle Bin Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our bottle bin for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 120,
      page_title:
        "Inflatable Lawn Darts Game Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our inflatable lawn darts game for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 121,
      page_title:
        "Grass 3 Seater Sofa Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our grass 3 seater sofa for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 122,
      page_title:
        "Neo Coffee Table - Black Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our neo coffee table - black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 123,
      page_title:
        "Windsor Teaspoon (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our windsor teaspoon (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 124,
      page_title:
        "Neo Coffee Table - White Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our neo coffee table - white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 125,
      page_title: "Hopscotch Mat Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our hopscotch mat for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 126,
      page_title:
        "Chesterfield Armchair - Antique Brown Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our chesterfield armchair - antique brown for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 127,
      page_title:
        "Art Deco Comic Strip Locker Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our art deco comic strip locker table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 128,
      page_title:
        "Bamboo Looped Skewer 2.7in (Pack of 100) Hire | Disposable Bamboo Cutlery Dublin | Caterhire",
      meta_description:
        "Hire our bamboo looped skewer 2.7in (pack of 100) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 129,
      page_title:
        "Candy Ottoman Yellow - Small Hire | Candy Yellow Outdoor Ottoman for Hire - Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our candy ottoman yellow - small for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 130,
      page_title:
        "Regency Sauce Boat 34cl (Pack Size 1) Hire | Regency Sauce Boat | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our regency sauce boat 34cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 131,
      page_title:
        "Sundae/Latte Spoon (Pack Size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our sundae/latte spoon (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 132,
      page_title: "Chafer Unit Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our chafer unit for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 133,
      page_title:
        "Linen Tablecloth White Ivy Leaf 54in x 54in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth white ivy leaf 54in x 54in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 135,
      page_title:
        "Straining Spoon 14in Hire | Catering Utensil Hire Dublin | Caterhire",
      meta_description:
        "Hire our straining spoon 14in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 136,
      page_title:
        "Black and White Dance Floor 4ft x 2ft Hire | Dance Floor Hire Dublin | Caterhire",
      meta_description:
        "Hire our black and white dance floor 4ft x 2ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 137,
      page_title:
        "Apollo Tea Cup Saucer 15cm (Pack Size 10) Hire | White Tea Cup Saucer | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our apollo tea cup saucer 15cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 138,
      page_title:
        "Masterchef Flat Top Griddle Hire | BBQ Hire Dublin | Caterhire",
      meta_description:
        "Hire our masterchef flat top griddle for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 139,
      page_title:
        "Stock Pot 23 Litre Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our stock pot 23 litre for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 140,
      page_title:
        "Bamboo Kidei Boat 7.5in (Pack of 50) Hire | Disposable Bamboo Cutlery Dublin | Caterhire",
      meta_description:
        "Hire our bamboo kidei boat 7.5in (pack of 50) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 141,
      page_title:
        "Royal Doulton Salt & Pepper Set 6cm (Pack Size 1) Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our royal doulton salt & pepper set 6cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 142,
      page_title:
        "Vegetable Dish Oval 20in 3 Section Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our vegetable dish oval 20in 3 section for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 143,
      page_title:
        "Spandex Black Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex black pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 145,
      page_title:
        "Cone Holder 32 Hole Hire | Catering Accessories Hire Dublin | Caterhire",
      meta_description:
        "Hire our cone holder 32 hole for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 146,
      page_title:
        "Black Stem Champagne Flute 4oz (Case Size 1) Hire | Party Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our black stem champagne flute 4oz (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 147,
      page_title:
        "V-Shaped Wine Glass 11oz (Case Size 25) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our v-shaped wine glass 11oz (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 148,
      page_title:
        "Children's Table Rectangular Blue Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our children's table rectangular blue for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 149,
      page_title:
        "Spandex White Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex white pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 150,
      page_title:
        "Soho Combo 2 - White Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our soho combo 2 - white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 151,
      page_title:
        "Linen Tablecloth White Ivy Leaf 72in x 144in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth white ivy leaf 72in x 144in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 152,
      page_title:
        "Spandex  Lemon/Yellow Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex  lemon/yellow pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 153,
      page_title:
        "Measuring / Pouring Jug 2 Litre Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our measuring / pouring jug 2 litre for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 154,
      page_title:
        "Insulated Tea Pot/Coffee Pot 1.5 Litre Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our insulated tea pot/coffee pot 1.5 litre for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 157,
      page_title:
        "Industrial 6 Ring Cooker (Gas) Hire | Cooking Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our industrial 6 ring cooker (gas) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 160,
      page_title:
        "Diamond Amber Water Glass Tumbler (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our diamond amber water glass tumbler (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 162,
      page_title:
        "White Appetizer Plate 4in x 4in (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our white appetizer plate 4in x 4in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 164,
      page_title:
        "Satin Chair Tie / Table Runner Black Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our satin chair tie / table runner black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 165,
      page_title:
        "Silk Taffeta Napkin Teal 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our silk taffeta napkin teal 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 166,
      page_title:
        "Giant Snakes & Ladders Hire | Garden & Event Game Hire Dublin | Caterhire",
      meta_description:
        "Hire our giant snakes & ladders for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 167,
      page_title:
        "White Cube Dip Pot 2in x 1in (Pack Size 1) Hire | White Cube Dip Pot | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our white cube dip pot 2in x 1in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 168,
      page_title:
        "Folding Chair Burgundy Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our folding chair burgundy for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 169,
      page_title:
        "Tankard Glass with Handle (Case Size 16) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our tankard glass with handle (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 170,
      page_title:
        "White Rectangular Flat Plate 36cm x 16cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our white rectangular flat plate 36cm x 16cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 171,
      page_title:
        "Elegance Champagne Flute 6oz (Case Size 49) Hire | Party Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our elegance champagne flute 6oz (case size 49) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 172,
      page_title:
        "Sauce Boat Stainless Steel Hire | Crockery Hire Dublin | Caterhire",
      meta_description:
        "Hire our sauce boat stainless steel for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 173,
      page_title:
        "Gold Rim Stacking Cup 18cl (Pack Size 10) Hire | White Porcelain Cup with Gold Rim | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our gold rim stacking cup 18cl (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 174,
      page_title:
        "Gastronorm Insert One Third Section (1/3) 6in Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our gastronorm insert one third section (1/3) 6in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 175,
      page_title:
        "Silver Rectangular Tray with Handles Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our silver rectangular tray with handles for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 176,
      page_title:
        "Regatta Outdoor Bistro Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our regatta outdoor bistro chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 177,
      page_title:
        "High Bar Table with Round Top Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our high bar table with round top for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 178,
      page_title:
        "Spandex Pod Table Topper Red Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our spandex pod table topper red for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 179,
      page_title:
        "Gold Rim Teapot 104cl (Pack Size 1) Hire | Gold Rim white porcelain teapot | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our gold rim teapot 104cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 180,
      page_title:
        "Parasol Base Hire | Outdoor Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our parasol base for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 181,
      page_title:
        "Windsor Dessert Spoon (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our windsor dessert spoon (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 182,
      page_title:
        "Kings Coffee Spoon (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our kings coffee spoon (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 183,
      page_title: "Baby High Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our baby high chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 184,
      page_title:
        "Linen Tablecloth White Round 130in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth white round 130in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 185,
      page_title:
        "Linen Tablecloth For Sale - White 70in x 144in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth for sale - white 70in x 144in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 186,
      page_title:
        "Table Rectangular 6ft x 36in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table rectangular 6ft x 36in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 188,
      page_title:
        "Table Half Round 4ft (Folding) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table half round 4ft (folding) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 189,
      page_title:
        "Whiskey Tumbler 8oz (Case Size 25) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our whiskey tumbler 8oz (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 190,
      page_title:
        "Gold Rim Soup Bowl 21cl (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our gold rim soup bowl 21cl (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 191,
      page_title:
        "Folding Chair Blue For Hire Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our folding chair blue for hire for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 192,
      page_title:
        "Table For Sale Rectangular 4ft x 2ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table for sale rectangular 4ft x 2ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 193,
      page_title:
        "Cube Illuminated - Large Hire | Illuminated Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our cube illuminated - large for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 194,
      page_title:
        "Bellux Coffee Pot 60oz Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our bellux coffee pot 60oz for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 195,
      page_title:
        "Wedgwood Pasta Plate 28cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood pasta plate 28cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 196,
      page_title:
        "Flexi Buffet System Hire | Catering Accessories Hire Dublin | Caterhire",
      meta_description:
        "Hire our flexi buffet system for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 197,
      page_title:
        "White Sampling Bowl 10in (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our white sampling bowl 10in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 198,
      page_title:
        "LED Uplighters - Set of 4 Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our led uplighters - set of 4 for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 200,
      page_title:
        "Irish Coffee Glass with Handle 8oz (Case Size 25) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our irish coffee glass with handle 8oz (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 201,
      page_title:
        "Ice Pod Table Illuminated Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our ice pod table illuminated for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 202,
      page_title:
        "Spandex Turquoise Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex turquoise pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 203,
      page_title:
        "Pedestal Bin with Lid Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our pedestal bin with lid for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 204,
      page_title:
        "Victoria Gold Espresso Spoon (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our victoria gold espresso spoon (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 205,
      page_title:
        "Diva Burgundy Glass 28.4oz (Case Size 16) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our diva burgundy glass 28.4oz (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 207,
      page_title:
        "John Rocha White Wine Glass 12oz (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our john rocha white wine glass 12oz (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 208,
      page_title:
        "Diva Red Wine Glass 15oz (Case Size 25) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our diva red wine glass 15oz (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 209,
      page_title:
        "Mighty B Beanbag - Red Hire | Event Party Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our mighty b beanbag - red for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 210,
      page_title:
        "Platter Round-White 15in Hire | Catering Accessories Hire Dublin | Caterhire",
      meta_description:
        "Hire our platter round-white 15in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 211,
      page_title:
        "Spandex Navy Blue Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex navy blue pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 212,
      page_title:
        "Spandex Pod Table Topper Black Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our spandex pod table topper black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 213,
      page_title: "Soho Combo 2 Cream Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our soho combo 2 cream for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 214,
      page_title:
        "Lucky Two Bar Unit, Illuminated Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our lucky two bar unit, illuminated for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 217,
      page_title:
        "Gold Rim Dessert Bowl 30cl (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our gold rim dessert bowl 30cl (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 218,
      page_title:
        "Diamond Green Wine Goblet (Case Size 25) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our diamond green wine goblet (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 219,
      page_title:
        "Waterford Crystal Lismore Salt & Pepper Set Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our waterford crystal lismore salt & pepper set for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 220,
      page_title:
        "Windsor Starter Knife/Side Knife (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our windsor starter knife/side knife (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 221,
      page_title:
        "Regency Salt & Pepper Set (Pack Size 1) Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our regency salt & pepper set (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 222,
      page_title:
        "Diva White Wine Glass 10oz (Case Size 36) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our diva white wine glass 10oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 223,
      page_title:
        "Spandex Pod Table Topper Pink Sparkle Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our spandex pod table topper pink sparkle for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 224,
      page_title:
        "Salad Bowl Glass (3 Litre) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our salad bowl glass (3 litre) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 227,
      page_title:
        "Royal Doulton Dessert Bowl 16cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our royal doulton dessert bowl 16cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 228,
      page_title:
        "Signature Linen Napkin Royal Blue 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our signature linen napkin royal blue 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 229,
      page_title:
        "Signature Linen Napkin Wedgwood Blue 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our signature linen napkin wedgwood blue 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 230,
      page_title:
        "Gold Rim Coffee Pot 114cl (Pack Size 1) Hire | Gold Rim Coffee Pot | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our gold rim coffee pot 114cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 231,
      page_title:
        "Food Tongs 9in Hire | Catering Utensil Hire Dublin | Caterhire",
      meta_description:
        "Hire our food tongs 9in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 232,
      page_title:
        "Bin Ring / Refuse Sack Holder Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our bin ring / refuse sack holder for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 234,
      page_title:
        "Linen Tablecloth For Sale - White Round 118in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth for sale - white round 118in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 236,
      page_title:
        "Japan Lounge Chair Brown Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our japan lounge chair brown for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 239,
      page_title:
        "Linen Table Skirting Blue 21ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table skirting blue 21ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 241,
      page_title:
        "Bamboo Kidei Cone 7in (Pack of 50) Hire | Disposable Bamboo Cutlery Dublin | Caterhire",
      meta_description:
        "Hire our bamboo kidei cone 7in (pack of 50) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 242,
      page_title:
        "Chubby Illuminated Coffee Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chubby illuminated coffee table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 243,
      page_title:
        "Flip Chart Stand Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our flip chart stand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 244,
      page_title:
        "Chesterfield Armchair Oxblood Leather Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our chesterfield armchair oxblood leather for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 245,
      page_title:
        "Oxford Silk White 2 Seater Set Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our oxford silk white 2 seater set for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 247,
      page_title:
        "Insulated Tea Pot/Coffee Pot 1 Litre Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our insulated tea pot/coffee pot 1 litre for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 248,
      page_title:
        "Wedgwood Side Plate 15cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood side plate 15cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 249,
      page_title:
        "White Candelabra 5 Branch 31in Hire | Wedding Decoration Hire Dublin | Caterhire",
      meta_description:
        "Hire our white candelabra 5 branch 31in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 250,
      page_title:
        "Ascot Stainless Steel Cutlery Collection (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our ascot stainless steel cutlery collection (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 251,
      page_title:
        "Mighty B Beanbag Grey Hire | Event Party Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our mighty b beanbag grey for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 252,
      page_title:
        "Wedgwood Jasper Conran Side Plate 18cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood jasper conran side plate 18cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 253,
      page_title:
        "Satin Chair Tie / Table Runner Red (Wide) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our satin chair tie / table runner red (wide) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 254,
      page_title:
        "Gastronorm Lid Half Size (1/2) Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our gastronorm lid half size (1/2) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 255,
      page_title:
        "Padded Banquet Chair Blue Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our padded banquet chair blue for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 256,
      page_title:
        "Lecturn / Podium Clear Perspex Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our lecturn / podium clear perspex for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 257,
      page_title:
        "Velvet Chair Tie / Table Runner Red Crush Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our velvet chair tie / table runner red crush for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 258,
      page_title:
        "Vintage Milk Jug (Pack Size 1) Hire | Vintage Milk Jug | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our vintage milk jug (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 259,
      page_title: "Blue Velvet Rope 1.5m Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our blue velvet rope 1.5m for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 260,
      page_title:
        "Portable Hot/Cold Food Container Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our portable hot/cold food container for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 261,
      page_title:
        "Avocado Ottoman White Leather Hire | Lounge Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our avocado ottoman white leather for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 264,
      page_title:
        "Square Cocktail Table Illuminated Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our square cocktail table illuminated for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 265,
      page_title: "Rounders Set Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our rounders set for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 266,
      page_title:
        "Victoria Gold Starter Fork/Dessert Fork (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our victoria gold starter fork/dessert fork (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 267,
      page_title:
        "Silk Taffeta Napkin Hot Pink 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our silk taffeta napkin hot pink 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 268,
      page_title: "Room Divider Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our room divider for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 270,
      page_title: "Punch Bowl Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our punch bowl for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 271,
      page_title:
        "Black Petite Four Stand Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our black petite four stand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 274,
      page_title:
        "Table For Sale Rectangular 6ft x 2.5ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table for sale rectangular 6ft x 2.5ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 275,
      page_title:
        "Regatta Outdoor Bistro Set Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our regatta outdoor bistro set for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 277,
      page_title:
        "Large Ice Bucket with Copper Band Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our large ice bucket with copper band for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 278,
      page_title: "Chair Cover White Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chair cover white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 279,
      page_title:
        "Ascot Steak Knife (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our ascot steak knife (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 281,
      page_title:
        "Spandex Kelly Green Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex kelly green pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 282,
      page_title:
        "Club 3 Seater Sofa White Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our club 3 seater sofa white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 284,
      page_title:
        "Bash Bar Unit with Shelves, illuminated Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our bash bar unit with shelves, illuminated for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 286,
      page_title:
        "Stoneware Dinner Plate Blue 28cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our stoneware dinner plate blue 28cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 288,
      page_title:
        "Cocktail Shaker 20oz Hire | Bar Accessory Hire Dublin | Caterhire",
      meta_description:
        "Hire our cocktail shaker 20oz for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 290,
      page_title:
        "Regency Starter Plate/Dessert Plate 23cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our regency starter plate/dessert plate 23cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 291,
      page_title:
        "Star Bench Illuminated Hire | Illuminated Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our star bench illuminated for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 292,
      page_title:
        "Insert / Gastronorm Pan 2in 1/2 Section Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our insert / gastronorm pan 2in 1/2 section for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 293,
      page_title:
        "Regatta Outdoor Patio Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our regatta outdoor patio table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 294,
      page_title:
        "Linen Tablecloth Butter Ivory Round 120in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth butter ivory round 120in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 295,
      page_title:
        "Silver Rim Dinner Plate 25cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our silver rim dinner plate 25cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 296,
      page_title:
        "Stock Pot 18 Litre Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our stock pot 18 litre for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 297,
      page_title: "Ice Bucket / Wine Bucket Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our ice bucket / wine bucket for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 298,
      page_title:
        "Square Water Jug 1 Litre Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our square water jug 1 litre for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 299,
      page_title:
        "Paris Wine Goblet 6oz (Case Size 36) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our paris wine goblet 6oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 300,
      page_title:
        "Afternoon Tea Stand Silver 45cm x 25cm (3 Tier) (Pack Size 1)  Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our afternoon tea stand silver 45cm x 25cm (3 tier) (pack size 1)  for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 303,
      page_title:
        "Chaise Longue Purple with Silver Leaf Trim Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our chaise longue purple with silver leaf trim for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 304,
      page_title:
        "Bellux Tea Pot 60oz Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our bellux tea pot 60oz for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 305,
      page_title:
        "Club Footstool Cream Leather Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our club footstool cream leather for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 306,
      page_title:
        "Wedgwood Espresso Cup 8cl (Pack Size 10) Hire | Wedgwood Espresso Cup | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood espresso cup 8cl (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 307,
      page_title:
        "Silver Rim Tea Cup Saucer 14cm (Pack Size 10) Hire | Silver Rim Tea Cup Saucer | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our silver rim tea cup saucer 14cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 308,
      page_title:
        "Chiavari Chair Black Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chiavari chair black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 309,
      page_title:
        "Club 3 Seater Sofa Black Leather Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our club 3 seater sofa black leather for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 310,
      page_title:
        "3ft Round Table (Folding) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our 3ft round table (folding) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 311,
      page_title:
        "Silver Candlestick 6in Hire | Wedding Decoration Hire Dublin | Caterhire",
      meta_description:
        "Hire our silver candlestick 6in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 312,
      page_title:
        "Linen Stage Skirting Black 19.6ft Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our linen stage skirting black 19.6ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 315,
      page_title:
        "Bentwood Rustic Oak Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our bentwood rustic oak chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 316,
      page_title:
        "White Rice Bowl 5in (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our white rice bowl 5in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 318,
      page_title:
        "Table Protector Round 5ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table protector round 5ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 319,
      page_title:
        "Gastronorm Insert Half Size (1/2) 6in Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our gastronorm insert half size (1/2) 6in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 320,
      page_title:
        "Silk Taffeta Napkin Cappuccino 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our silk taffeta napkin cappuccino 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 321,
      page_title:
        "Silver Bread Basket with Base Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our silver bread basket with base for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 323,
      page_title:
        "Black Salto Glass 11oz (Case Size 16) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our black salto glass 11oz (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 324,
      page_title:
        "Hand Wash Sink Unit 10L (Round) Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our hand wash sink unit 10l (round) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 325,
      page_title:
        "Wedgwood Starter/Dessert Plate 22cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood starter/dessert plate 22cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 326,
      page_title:
        "Soho Combo 2 - Black Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our soho combo 2 - black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 329,
      page_title:
        "Platter Square White 13.5in x 13.5in Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our platter square white 13.5in x 13.5in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 330,
      page_title:
        "Windsor Fish Fork (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our windsor fish fork (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 331,
      page_title:
        "Aurora Bar Stool White Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our aurora bar stool white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 333,
      page_title:
        "Slim Jim 10.25oz (Case Size 36) Hire | Barware Glass Hire Dublin | Caterhire",
      meta_description:
        "Hire our slim jim 10.25oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 334,
      page_title:
        "Regency Pasta Plate 30cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our regency pasta plate 30cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 335,
      page_title:
        "Wow bench - Saffron yellow Hire | Bench Hire Dublin | Caterhire",
      meta_description:
        "Hire our wow bench - saffron yellow for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 336,
      page_title:
        "Paris Wine Goblet 8oz (Case Size 25) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our paris wine goblet 8oz (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 337,
      page_title:
        "Victoria Gold Rim Red Wine Glass 10oz (Case Size 16) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our victoria gold rim red wine glass 10oz (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 339,
      page_title:
        "Silk Taffeta Napkin Black 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our silk taffeta napkin black 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 340,
      page_title:
        "Ascot Dessert Spoon (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our ascot dessert spoon (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 341,
      page_title:
        "Arthur Price Silver Starter/Dessert Knife (Pack size 10) Hire | Arthur Price Starter/Dessert Knife | Cutlery Hire | Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our arthur price silver starter/dessert knife (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 342,
      page_title:
        "Wooden Parasol Green Hire | Outdoor Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our wooden parasol green for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 343,
      page_title:
        "Red Carpet Walkway All Weather Hire | Carpet Hire Dublin | Caterhire",
      meta_description:
        "Hire our red carpet walkway all weather for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 344,
      page_title:
        "White Souplet Bowl (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our white souplet bowl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 346,
      page_title:
        "Royal Doulton Sauce Boat 34cl (Pack Size 1) Hire | Royal Doulton Sauce Boat | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our royal doulton sauce boat 34cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 347,
      page_title:
        "White Rectangular Plate 26cm x 13cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our white rectangular plate 26cm x 13cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 348,
      page_title:
        "Table For Sale Half Round 4ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table for sale half round 4ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 349,
      page_title:
        "Chiavari Chair Limewash (deluxe) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chiavari chair limewash (deluxe) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 350,
      page_title:
        "Victoria Oak Left Corner Bar 7.2ft Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our victoria oak left corner bar 7.2ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 351,
      page_title: "Bar Tray Silver 14in Hire | Barware Hire Dublin | Caterhire",
      meta_description:
        "Hire our bar tray silver 14in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 352,
      page_title:
        "Gold Rim Charger Plate 30cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our gold rim charger plate 30cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 353,
      page_title:
        "Victoria Gold Dinner Knife (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our victoria gold dinner knife (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 354,
      page_title:
        "Propane Gas Cylinder 25lb/11kg Hire | BBQ Accessories Dublin | Caterhire",
      meta_description:
        "Hire our propane gas cylinder 25lb/11kg for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 355,
      page_title:
        "White Cube Dip Pot 2in x 2in (Pack Size 1) Hire | 2in White Cube Dip Pot | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our white cube dip pot 2in x 2in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 356,
      page_title:
        "Zeus Bar Stool Black Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our zeus bar stool black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 357,
      page_title:
        "Bain Marie Hot Plate 4 Well Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our bain marie hot plate 4 well for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 358,
      page_title:
        "Mighty B Beanbag - Lime Green Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our mighty b beanbag - lime green for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 360,
      page_title:
        "Stainless Steel Preparation Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our stainless steel preparation table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 361,
      page_title:
        "Stock Pot 5 Litre Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our stock pot 5 litre for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 362,
      page_title:
        "Insert / Gastronorm Pan 4in Full Perforated Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our insert / gastronorm pan 4in full perforated for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 363,
      page_title:
        "Spandex Silver Grey Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex silver grey pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 364,
      page_title:
        "Gold Rim Sugar Bowl 33cl (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our gold rim sugar bowl 33cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 366,
      page_title:
        "Chloe White Chameleon Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chloe white chameleon chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 369,
      page_title:
        "Ice Round Bar Unit, Illuminated (1/4 Unit) Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our ice round bar unit, illuminated (1/4 unit) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 370,
      page_title:
        "Linen Napkin White 20in x 20in Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our linen napkin white 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 372,
      page_title:
        "Slim Jim 7.25oz (Case Size 36) Hire | Barware Glass Hire Dublin | Caterhire",
      meta_description:
        "Hire our slim jim 7.25oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 373,
      page_title:
        "Linen Tablecloth Black 72in x 144in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth black 72in x 144in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 376,
      page_title:
        "Chrome Stanchion Pillar Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our chrome stanchion pillar for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 377,
      page_title:
        "French Boules Set Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our french boules set for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 378,
      page_title:
        "Spandex Ivory Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex ivory pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 379,
      page_title:
        "Silk Taffeta Chair Tie / Table Runner Cappuccino Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our silk taffeta chair tie / table runner cappuccino for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 381,
      page_title:
        "Mobius Ottoman Blue Hire | Lounge Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our mobius ottoman blue for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 384,
      page_title:
        "Arthur Price Silver Dinner Knife (Pack size 10) Hire | Arthur Price Silver Dinner Knife | Cutlery |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our arthur price silver dinner knife (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 385,
      page_title:
        "Bamboo Kidei Boat 3.5in (Pack of 50) Hire | Disposable Bamboo Cutlery Dublin | Caterhire",
      meta_description:
        "Hire our bamboo kidei boat 3.5in (pack of 50) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 386,
      page_title:
        "Silver Rim Red Wine Glass 10oz (Case Size 16) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our silver rim red wine glass 10oz (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 387,
      page_title:
        "Pichet Water Jug 1 Litre Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our pichet water jug 1 litre for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 388,
      page_title:
        "Sorrento Coffee Table Black Leather Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our sorrento coffee table black leather for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 389,
      page_title:
        "Bar Tray Non Slip Black 16in Hire | Barware Hire Dublin | Caterhire",
      meta_description:
        "Hire our bar tray non slip black 16in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 390,
      page_title:
        "Conference Cloth Blue 120in x 60in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our conference cloth blue 120in x 60in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 391,
      page_title:
        "Plain Water Jug 1 Litre Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our plain water jug 1 litre for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 392,
      page_title:
        "Table For Sale Rectangular 2ft x 2ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table for sale rectangular 2ft x 2ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 393,
      page_title:
        "Table For Sale Round 3ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table for sale round 3ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 394,
      page_title:
        "Table For Sale Rectangular 4ft x 2.5ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table for sale rectangular 4ft x 2.5ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 395,
      page_title:
        "Avocado Ottoman Lime Green Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our avocado ottoman lime green for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 396,
      page_title:
        "Signature Linen Napkin Seafoam Green 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our signature linen napkin seafoam green 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 398,
      page_title:
        "Signature Linen Napkin Navy 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our signature linen napkin navy 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 399,
      page_title:
        "Vintage Tea Pot (Pack Size 1) Hire | Vintage Tea Pot | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our vintage tea pot (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 400,
      page_title:
        "Spandex Apple Green Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex apple green pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 401,
      page_title:
        "Wedgwood Dinner Plate 27cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood dinner plate 27cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 402,
      page_title:
        "Spandex Pod Table Topper Orange Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our spandex pod table topper orange for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 405,
      page_title:
        "Platter S-Curved 18in x18in Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our platter s-curved 18in x18in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 406,
      page_title:
        "Wedgwood Sugar Bowl 10cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood sugar bowl 10cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 407,
      page_title:
        "Victoria Gold Starter Knife/Side Knife (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our victoria gold starter knife/side knife (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 408,
      page_title:
        "White Ramekin Dish 3in x 1.5in (Pack Size 1) Hire | 3 Dublin | Caterhire",
      meta_description:
        "Hire our white ramekin dish 3in x 1.5in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 409,
      page_title:
        "Zeus Bar Stool with Royal Blue Pad Cover Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our zeus bar stool with royal blue pad cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 410,
      page_title:
        "Victoria Gold Soup Spoon (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our victoria gold soup spoon (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 412,
      page_title:
        "White Oval Veg Dish (12in) Hire | Crockery Hire Dublin | Caterhire",
      meta_description:
        "Hire our white oval veg dish (12in) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 413,
      page_title:
        "Fish/ Salmon Platter 24in Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our fish/ salmon platter 24in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 414,
      page_title:
        "Deep Fat Fryer Electric (2 Basket) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our deep fat fryer electric (2 basket) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 416,
      page_title:
        "Wedgwood Butter Dish 7cm (Pack Size 1) Hire | Wedgwood Butter Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood butter dish 7cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 419,
      page_title:
        "Linen Tablecloth White Round 118in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth white round 118in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 421,
      page_title:
        "Linen Tablecloth Red 70in x 70in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth red 70in x 70in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 422,
      page_title:
        "Serving Bowl Round White 9.5in Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our serving bowl round white 9.5in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 423,
      page_title:
        "Organza Chair Tie / Table Runner Red Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our organza chair tie / table runner red for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 426,
      page_title:
        "Glass Ashtray Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our glass ashtray for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 427,
      page_title:
        "Kings Ladle (small) Hire | Catering Utensils Hire Dublin | Caterhire",
      meta_description:
        "Hire our kings ladle (small) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 428,
      page_title:
        "Spandex Pod Table Topper Black Sparkle Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our spandex pod table topper black sparkle for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 429,
      page_title: "BBQ Tongs Wooden Hire | BBQ Accessories Dublin | Caterhire",
      meta_description:
        "Hire our bbq tongs wooden for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 431,
      page_title:
        "Club 3 Seater Sofa Cream Leather Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our club 3 seater sofa cream leather for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 432,
      page_title:
        "Port Glass 2oz (Case Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our port glass 2oz (case size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 433,
      page_title:
        "Triangle Ottoman Red Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our triangle ottoman red for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 434,
      page_title:
        "Shot Glass Hot Shot 2oz (Case Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our shot glass hot shot 2oz (case size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 435,
      page_title:
        "Padded Banquet Chair Red Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our padded banquet chair red for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 436,
      page_title:
        "Bamboo Kidei Boat 4.5in (Pack of 50) Hire | Disposable Bamboo Cutlery Dublin | Caterhire",
      meta_description:
        "Hire our bamboo kidei boat 4.5in (pack of 50) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 437,
      page_title:
        "Bamboo Kidei Cone 5in (Pack of 50) Hire | Disposable Bamboo Cutlery Dublin | Caterhire",
      meta_description:
        "Hire our bamboo kidei cone 5in (pack of 50) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 438,
      page_title:
        "Room Divider/Japan Wall Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our room divider/japan wall for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 439,
      page_title:
        "Tufted Pod Table Cream Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our tufted pod table cream for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 440,
      page_title:
        "Signature Linen Napkin Blush Pink 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our signature linen napkin blush pink 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 441,
      page_title:
        "Triangle Ottoman Cream Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our triangle ottoman cream for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 442,
      page_title:
        "Glass Beaded Charger Plate 33cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our glass beaded charger plate 33cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 446,
      page_title:
        "Silver Rim Coffee Pot 32oz (Pack Size 1) Hire | Silver Rim Coffee Pot | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our silver rim coffee pot 32oz (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 447,
      page_title:
        "Essex Lounge Chair Black Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our essex lounge chair black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 448,
      page_title:
        "Sling Beer Glass 14oz (Case Size 36) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our sling beer glass 14oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 449,
      page_title:
        "Milan Rattan Bistro Chairs Set & Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our milan rattan bistro chairs set & table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 450,
      page_title:
        "Industrial 4 Ring Cooker (Gas) Hire | Cooking Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our industrial 4 ring cooker (gas) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 451,
      page_title:
        "Wooden Picnic Bench Hire | Outdoor Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our wooden picnic bench for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 452,
      page_title:
        "Linen Tablecloth White Ivy Leaf 70in x 108in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth white ivy leaf 70in x 108in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 453,
      page_title:
        "Royal Doulton Starter Plate/Dessert Plate 23cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our royal doulton starter plate/dessert plate 23cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 454,
      page_title:
        "Georgian Side Table Mahogany Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our georgian side table mahogany for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 455,
      page_title:
        "Children's Chair Wooden White Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our children's chair wooden white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 456,
      page_title:
        "Children's Table Rectangular Pink Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our children's table rectangular pink for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 457,
      page_title:
        "Martini Glass 7oz (Case Size 16) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our martini glass 7oz (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 458,
      page_title:
        "White Crescent Veg Dish (8in) Hire | Crockery Hire Dublin | Caterhire",
      meta_description:
        "Hire our white crescent veg dish (8in) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 459,
      page_title: "Bash Back Bar Unit Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our bash back bar unit for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 460,
      page_title:
        "Satin Chair Tie / Table Runner Silver Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our satin chair tie / table runner silver for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 462,
      page_title:
        "Crushed Ice Bag 20lb/9kg Hire | Bar Accessory Hire Dublin | Caterhire",
      meta_description:
        "Hire our crushed ice bag 20lb/9kg for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 463,
      page_title:
        "White Canape Spoon with Tail (Pack Size 1) Hire | White Canape Spoon with Tail | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our white canape spoon with tail (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 464,
      page_title:
        "Gold Rim Milk Jug 30cl (Pack Size 1) Hire | Gold Rim Milk Jug | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our gold rim milk jug 30cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 466,
      page_title:
        "Half Pint Glass 10oz (Case Size 36) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our half pint glass 10oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 467,
      page_title:
        "Royal Doulton Soup Plate 24cm - (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our royal doulton soup plate 24cm - (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 468,
      page_title:
        "White Rectangular Platter 21in x 6.5in Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our white rectangular platter 21in x 6.5in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 470,
      page_title:
        "Chesterfield Sofa - Illuminated Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chesterfield sofa - illuminated for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 471,
      page_title:
        "Banquet Cart Double 4 Door Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our banquet cart double 4 door for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 472,
      page_title:
        "Chiavari Bar Stool - Limewash Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our chiavari bar stool - limewash for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 473,
      page_title:
        "Ascot Dinner Knife (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our ascot dinner knife (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 474,
      page_title:
        "Wedgwood Milk Jug 27cl (Pack Size 1) Hire | Wedgwood 9.5oz Milk Jug | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood milk jug 27cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 475,
      page_title:
        "Children's Stool Dark Blue Hire | Childrens Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our children's stool dark blue for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 476,
      page_title:
        "Upright Freezer with White Door Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our upright freezer with white door for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 477,
      page_title:
        "Royal Doulton Tea Cup Saucer 15cm (Pack Size 10) Hire | Royal Doulton Saucer | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our royal doulton tea cup saucer 15cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 479,
      page_title:
        "Art Deco Comic Strip Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our art deco comic strip table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 480,
      page_title:
        "Black Stem Wine Glass 12oz (Case Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our black stem wine glass 12oz (case size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 481,
      page_title:
        "Satin Chair Tie / Table Runner Ivory Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our satin chair tie / table runner ivory for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 482,
      page_title: "Giant Kerplunk Hire | Outdoor Games Hire Dublin | Caterhire",
      meta_description:
        "Hire our giant kerplunk for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 483,
      page_title:
        "Gastronorm Lid One Third Size (1/3) Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our gastronorm lid one third size (1/3) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 484,
      page_title:
        "Oval Gratin/Vegetable Dish 12in Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our oval gratin/vegetable dish 12in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 485,
      page_title:
        "Cube Illuminated - Open Hire | Illuminated Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our cube illuminated - open for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 486,
      page_title:
        "Charger Plate Silver Rim 33cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our charger plate silver rim 33cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 487,
      page_title:
        "MY Drap Cocktail Napkin Emerald Green Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our my drap cocktail napkin emerald green for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 488,
      page_title:
        "MY Drap Cocktail Napkin Red Gingham Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our my drap cocktail napkin red gingham for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 489,
      page_title:
        "Upright Cooler Cabinet Glass Door Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our upright cooler cabinet glass door for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 490,
      page_title:
        "Linen Tablecloth Butter Ivory Round 156in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth butter ivory round 156in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 491,
      page_title:
        "Linen Tablecloth For Sale - White 70in x 108in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth for sale - white 70in x 108in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 493,
      page_title:
        "Linen Tablecloth Blue 70in x 70in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth blue 70in x 70in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 494,
      page_title:
        "Petit Fours Vintage Plate Teal 20cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our petit fours vintage plate teal 20cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 495,
      page_title:
        "Silk Taffeta Tablecloth Turquoise Round 120in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our silk taffeta tablecloth turquoise round 120in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 496,
      page_title:
        "Soup Kettle (10 Litre) Hire | Catering Utensil Hire Dublin | Caterhire",
      meta_description:
        "Hire our soup kettle (10 litre) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 498,
      page_title:
        "Signature Linen Tablecloth Ivory Round 132in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our signature linen tablecloth ivory round 132in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 499,
      page_title:
        "Arthur Price Silver Teaspoon (Pack size 10) Hire | Arthur Price Silver Teaspoon | Cutlery | Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our arthur price silver teaspoon (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 500,
      page_title:
        "Linen Tablecloth Red 90in x 90in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth red 90in x 90in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 501,
      page_title:
        "Table Half Round 5ft (Folding) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table half round 5ft (folding) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 502,
      page_title:
        "Champagne Saucer 4oz (Case Size 25) Hire | Party Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our champagne saucer 4oz (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 504,
      page_title:
        "Table For Sale - Rectangular 2ft x 30in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table for sale - rectangular 2ft x 30in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 507,
      page_title:
        "Frisbee Target Game Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our frisbee target game for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 508,
      page_title:
        "Mobius Ottoman Lime Green Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our mobius ottoman lime green for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 509,
      page_title:
        "Highback Dining Chair White Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our highback dining chair white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 510,
      page_title:
        "Vintage Sugar Bowl (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our vintage sugar bowl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 514,
      page_title:
        "Silk Taffeta Napkin Purple 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our silk taffeta napkin purple 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 515,
      page_title:
        "Hemstitched Linen Napkin White 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our hemstitched linen napkin white 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 516,
      page_title:
        "Optic Bottle Stand Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our optic bottle stand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 517,
      page_title:
        "Signature Linen Napkin Biscuit 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our signature linen napkin biscuit 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 518,
      page_title:
        "Regency Dinner Plate 30cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our regency dinner plate 30cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 520,
      page_title:
        "Button Bar Stool Black Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our button bar stool black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 521,
      page_title: "Linen Napkins For Sale - White 20in x 20in Hire | 20",
      meta_description:
        "Hire our linen napkins for sale - white 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 523,
      page_title:
        "Table Extension Legs (set of 4) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table extension legs (set of 4) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 525,
      page_title:
        "Chiavari Chair Gold Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chiavari chair gold for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 526,
      page_title:
        "Ascot Soup Spoon (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our ascot soup spoon (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 527,
      page_title:
        "Zeus Bar Stool with Silver Pad Cover Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our zeus bar stool with silver pad cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 528,
      page_title:
        "Silver Rim Milk Jug 24cl (Pack Size 1) Hire | Silver Rim Milk Jug | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our silver rim milk jug 24cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 530,
      page_title:
        "Pop Bench - Jet Black Hire | Crockery Hire Dublin | Caterhire",
      meta_description:
        "Hire our pop bench - jet black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 531,
      page_title:
        "Clear Salt & Pepper Mills (Filled) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our clear salt & pepper mills (filled) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 532,
      page_title:
        "S Shape 3 Tier Cake Stand Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our s shape 3 tier cake stand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 533,
      page_title:
        "Bamboo Kidei Cup 1.5in (Pack of 50) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our bamboo kidei cup 1.5in (pack of 50) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 534,
      page_title:
        "Silver Rim Side Plate 15cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our silver rim side plate 15cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 535,
      page_title: "Sterno Chafer Fuel Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our sterno chafer fuel for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 536,
      page_title:
        "Black Round Slate Platter (Pack Size 1) Hire | Black Round Slate Platter | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our black round slate platter (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 537,
      page_title:
        "Coffee Pot 80oz Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our coffee pot 80oz for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 538,
      page_title: "Giant Dominoes Hire | Outdoor Game Hire Dublin | Caterhire",
      meta_description:
        "Hire our giant dominoes for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 539,
      page_title:
        "Karma 2 Seater Sofa - White Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our karma 2 seater sofa - white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 540,
      page_title: "Spandex Pink Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex pink pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 541,
      page_title:
        "Banquet Cart 2 Door Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our banquet cart 2 door for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 542,
      page_title:
        "MY Drap Cocktail Napkin Pistachio Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our my drap cocktail napkin pistachio for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 543,
      page_title:
        "Vintage Tea Cup Saucer (Pack Size 1) Hire | Vintage Tea Cup Saucer | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our vintage tea cup saucer (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 544,
      page_title:
        "Peak Pod Table Illuminated - Low Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our peak pod table illuminated - low for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 545,
      page_title:
        "Chesterlight Armchair Illuminated Hire | Illuminated Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our chesterlight armchair illuminated for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 546,
      page_title:
        "Silver Rim White Wine Glass  7oz (Case Size 16) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our silver rim white wine glass  7oz (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 547,
      page_title:
        "Platter Square White 11in x 11in Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our platter square white 11in x 11in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 548,
      page_title:
        "Table For Sale Rectangular 8ft x 2.5ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table for sale rectangular 8ft x 2.5ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 549,
      page_title:
        "Children's Stool Lime Green Hire | Childrens Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our children's stool lime green for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 551,
      page_title:
        "Heated Carving Unit 2 Lamp Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our heated carving unit 2 lamp for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 552,
      page_title:
        "Gastronorm Insert Full Size (1/1) 4in Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our gastronorm insert full size (1/1) 4in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 554,
      page_title:
        "Kings Starter Fork/Dessert Fork (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our kings starter fork/dessert fork (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 556,
      page_title:
        "Serving Spoon 14in Hire | Catering Utensil Hire Dublin | Caterhire",
      meta_description:
        "Hire our serving spoon 14in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 557,
      page_title:
        "Table For Sale Round 6ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table for sale round 6ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 558,
      page_title:
        "Baroque Armchair Hot Pink with Silver Leaf Trim Hire | Chair Hire Dublin | Caterhire",
      meta_description:
        "Hire our baroque armchair hot pink with silver leaf trim for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 559,
      page_title:
        "Linen Tablecloth For Sale - White 90in x 90in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth for sale - white 90in x 90in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 560,
      page_title:
        "Royal Doulton Milk Jug 25cl (Pack Size 1) Hire | Royal Doulton Milk Jug | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our royal doulton milk jug 25cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 561,
      page_title:
        "Royal Doulton Butter Dish 13cm (Pack Size 1) Hire | Royal Doulton Butter Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our royal doulton butter dish 13cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 562,
      page_title:
        "Table Square 2ft x 24in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table square 2ft x 24in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 563,
      page_title:
        "Victoria Gold Teaspoon (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our victoria gold teaspoon (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 564,
      page_title:
        "Ice Cube Bag 20lb/9kg Hire | Bar Accessories Dublin | Caterhire",
      meta_description:
        "Hire our ice cube bag 20lb/9kg for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 565,
      page_title:
        "Heathrow 2 Seater Sofa - White Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our heathrow 2 seater sofa - white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 566,
      page_title:
        "Ascot Coffee Spoon (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our ascot coffee spoon (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 567,
      page_title:
        "All Seasons Padded Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our all seasons padded chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 568,
      page_title:
        "Silver Rim Soup Bowl 21cl (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our silver rim soup bowl 21cl (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 570,
      page_title:
        "Chaise Longue Black with Gold Leaf Trim Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our chaise longue black with gold leaf trim for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 571,
      page_title:
        "Organza Chair Tie / Table Runner Gold Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our organza chair tie / table runner gold for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 574,
      page_title:
        "Silk Taffeta Napkin Turquoise 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our silk taffeta napkin turquoise 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 575,
      page_title:
        "Footed Cake Stand Blue 27cm (Pack Size 1) Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our footed cake stand blue 27cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 576,
      page_title:
        "Regency Saucer 15cm (Pack Size 10) Hire | Regency Saucer | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our regency saucer 15cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 577,
      page_title:
        "Club Footstool White Leather Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our club footstool white leather for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 578,
      page_title:
        "Wedding Cake Knife (Pack Size 1) Hire | Wedding Hire Dublin | Caterhire",
      meta_description:
        "Hire our wedding cake knife (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 579,
      page_title:
        "Half Moon Bench Illuminated Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our half moon bench illuminated for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 580,
      page_title:
        "Patio Heater Hire | Outdoor Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our patio heater for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 581,
      page_title:
        "Illuminated Rectangular Coffee Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our illuminated rectangular coffee table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 582,
      page_title:
        "Regency Butter Dish 10cm (Pack Size 1) Hire | Regency Butter Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our regency butter dish 10cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 583,
      page_title:
        "Slate Plate 10in x 10in Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our slate plate 10in x 10in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 584,
      page_title: "Bentwood Coatstand Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our bentwood coatstand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 585,
      page_title:
        "Slim Jim 12oz (Case Size 36) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our slim jim 12oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 588,
      page_title:
        "Crystal Wine Glass 4oz (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our crystal wine glass 4oz (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 589,
      page_title:
        "John Rocha Water Glass 16oz (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our john rocha water glass 16oz (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 591,
      page_title:
        "Spirit Measure (Large) Hire | Bar Accessory Hire Dublin | Caterhire",
      meta_description:
        "Hire our spirit measure (large) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 592,
      page_title:
        "Satin Chair Tie / Table Runner Red (Narrow) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our satin chair tie / table runner red (narrow) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 593,
      page_title:
        "Black Retractable Belt Barrier Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our black retractable belt barrier for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 594,
      page_title:
        "Liqueur Glass 1oz (Case Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our liqueur glass 1oz (case size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 595,
      page_title:
        "Silver Rim Starter Plate/Dessert Plate 20cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our silver rim starter plate/dessert plate 20cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 596,
      page_title:
        "Sorrento 3 Seater Sofa White Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our sorrento 3 seater sofa white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 597,
      page_title:
        "Vintage Dinner Plate (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our vintage dinner plate (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 598,
      page_title: "Spandex Red Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex red pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 599,
      page_title:
        "Gold Rim Pasta Plate 30cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our gold rim pasta plate 30cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 600,
      page_title:
        "Java Ottoman White Leather Hire | Java Ottoman White Leather | Lounge Furniture | Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our java ottoman white leather for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 601,
      page_title:
        "Jack Stack Plate Rack Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our jack stack plate rack for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 602,
      page_title:
        "Deep Fat Fryer 2 Basket Table top (Elec.) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our deep fat fryer 2 basket table top (elec.) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 603,
      page_title:
        "Kings Starter Knife/Side Knife (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our kings starter knife/side knife (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 604,
      page_title:
        "Snake Bench Illuminated Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our snake bench illuminated for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 605,
      page_title:
        "Chesterfield 3 Seater Sofa Black Leather Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chesterfield 3 seater sofa black leather for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 606,
      page_title:
        "Champagne Sorbet Glass 4oz (Case Size 16) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our champagne sorbet glass 4oz (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 607,
      page_title:
        "Signature Linen Tablecloth Lavender Round 132in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our signature linen tablecloth lavender round 132in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 608,
      page_title: "Staging 6ft x 3ft Hire | Stage Hire Dublin | Caterhire",
      meta_description:
        "Hire our staging 6ft x 3ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 609,
      page_title:
        "Triangle Ottoman Lime Green Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our triangle ottoman lime green for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 611,
      page_title:
        "Giant Memory Pairs Game Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our giant memory pairs game for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 613,
      page_title:
        "Black Round Plate 28cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our black round plate 28cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 615,
      page_title:
        "Giant Noughts & Crosses Hire | Games Hire Dublin | Caterhire",
      meta_description:
        "Hire our giant noughts & crosses for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 616,
      page_title:
        "Victoria Gold Dinner Fork (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our victoria gold dinner fork (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 617,
      page_title:
        "Linen Tablecloth Blue 90in x 90in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth blue 90in x 90in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 618,
      page_title:
        "Pop Bench - Flame Red Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our pop bench - flame red for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 619,
      page_title:
        "Wow bench- Lime green Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our wow bench- lime green for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 621,
      page_title:
        "White Butter Dish with Cloche (Pack Size 1) Hire | White Butter Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our white butter dish with cloche (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 623,
      page_title:
        "MY Drap Cocktail Napkin Sea Blue Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our my drap cocktail napkin sea blue for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 624,
      page_title:
        "Fish Slice / BBQ Flip 14in Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our fish slice / bbq flip 14in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 625,
      page_title: "Tea Light Holder Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our tea light holder for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 626,
      page_title:
        "Tea Pot Stainless Steel (10 cup) Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our tea pot stainless steel (10 cup) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 629,
      page_title:
        "Cinders Flame Grill BBQ Double Hire | BBQ Hire Dublin | Caterhire",
      meta_description:
        "Hire our cinders flame grill bbq double for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 630,
      page_title:
        "Cabernet Red Wine Glass 12oz (Case Size 25) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our cabernet red wine glass 12oz (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 631,
      page_title: "Giant Lego Blocks Hire | Games Hire Dublin | Caterhire",
      meta_description:
        "Hire our giant lego blocks for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 633,
      page_title:
        "White Square Mini Dish with Stem 2.5in x 2.5in (Pack Size 1) Hire | White Square dish with Stem | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our white square mini dish with stem 2.5in x 2.5in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 634,
      page_title:
        "Afternoon Tea Stand White 3 Tier Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our afternoon tea stand white 3 tier for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 635,
      page_title:
        "Linen Tablecloth Black 70in x 70in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth black 70in x 70in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 636,
      page_title:
        "Gold Rim Saucer 15cm (Pack Size 10) Hire | Gold Rim Saucer | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our gold rim saucer 15cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 638,
      page_title:
        "Measuring/Pouring Jug 4 Litre Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our measuring/pouring jug 4 litre for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 639,
      page_title:
        "Linen Tablecloth Butter Ivory 90in x 90in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth butter ivory 90in x 90in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 640,
      page_title:
        "Gastronorm Insert Half Size (1/2) 4in Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our gastronorm insert half size (1/2) 4in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 641,
      page_title:
        "Linen Napkin Majestic Creme 20in x 20in Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our linen napkin majestic creme 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 642,
      page_title:
        "Wedgwood Salt & Pepper Set 5cm (Pack Size 1) Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood salt & pepper set 5cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 643,
      page_title:
        "Karma 2 Seater Sofa - Black Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our karma 2 seater sofa - black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 644,
      page_title:
        "Linen Tablecloth Blue 72in x 144in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth blue 72in x 144in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 645,
      page_title: "1 Ring Burner (Gas) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our 1 ring burner (gas) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 646,
      page_title:
        "Silk Taffeta Chair Tie / Table Runner Pale Pink Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our silk taffeta chair tie / table runner pale pink for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 647,
      page_title:
        "Wicker Buffet Bread Basket Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our wicker buffet bread basket for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 648,
      page_title:
        "Crystal Wine Glass 6oz (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our crystal wine glass 6oz (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 649,
      page_title:
        "Sorrento Coffee Table White Leather Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our sorrento coffee table white leather for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 651,
      page_title:
        "Bellux Coffee Plunger Pot 60oz Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our bellux coffee plunger pot 60oz for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 652,
      page_title:
        "Colander Stainless Steel 19in Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our colander stainless steel 19in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 653,
      page_title:
        "Signature Linen Napkin Ivory 20in x 20in Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our signature linen napkin ivory 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 654,
      page_title:
        "Pump Action Flask 3 Litre Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our pump action flask 3 litre for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 655,
      page_title:
        "Mobius Ottoman Brown Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our mobius ottoman brown for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 656,
      page_title:
        "Cake Lifter (Case size 1) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our cake lifter (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 657,
      page_title:
        "Blue Seal Turbo Fan Oven (no Stand) Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our blue seal turbo fan oven (no stand) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 660,
      page_title:
        "Diamond Pastel Blue Wine Goblet (Case Size 25) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our diamond pastel blue wine goblet (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 661,
      page_title:
        "White Appetizer Bowl 3.5in (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our white appetizer bowl 3.5in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 662,
      page_title:
        "Table Rectangular 6ft x 30in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table rectangular 6ft x 30in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 663,
      page_title:
        "Bamboo Paddle Skewer 4.7in (Pack of 100) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our bamboo paddle skewer 4.7in (pack of 100) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 664,
      page_title:
        "Cabernet White Wine Glass 8oz (Case Size 36) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our cabernet white wine glass 8oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 665,
      page_title:
        "Slim Jim 10oz (Case Size 36) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our slim jim 10oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 666,
      page_title:
        "Georgian Scroll End Sofa Burgundy Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our georgian scroll end sofa burgundy for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 668,
      page_title:
        "Diva Champagne Flute 7oz (Case Size 36) Hire | Glassware hire Dublin | Caterhire",
      meta_description:
        "Hire our diva champagne flute 7oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 669,
      page_title:
        "Lectern/Podium with Black Top Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our lectern/podium with black top for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 670,
      page_title: "Giant Connect 4 Hire | Games Hire Dublin | Caterhire",
      meta_description:
        "Hire our giant connect 4 for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 671,
      page_title:
        "Hyperlux Coffee Pot Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our hyperlux coffee pot for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 672,
      page_title:
        "Candy Lounge Armchair - Soft yellow Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our candy lounge armchair - soft yellow for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 673,
      page_title: "Giant Outdoor Chess Hire | Games Hire Dublin | Caterhire",
      meta_description:
        "Hire our giant outdoor chess for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 674,
      page_title:
        "Foosball Football Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our foosball football table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 677,
      page_title:
        "Essex 2 Seater Sofa - Black Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our essex 2 seater sofa - black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 678,
      page_title:
        "Wedgwood Tea Cup 20cl (Pack Size 10) Hire | Wedgewood Tea Cup | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood tea cup 20cl (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 679,
      page_title: "BBQ Charcoal 10kg Hire | BBQ Accessories Dublin | Caterhire",
      meta_description:
        "Hire our bbq charcoal 10kg for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 680,
      page_title:
        "Double Sink Unit With Drainer Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our double sink unit with drainer for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 681,
      page_title:
        "Table Top Stainless Steel 6ft x 30in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table top stainless steel 6ft x 30in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 682,
      page_title:
        "Silver Rim Champagne Glass 6oz (Case Size 36) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our silver rim champagne glass 6oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 688,
      page_title:
        "Kings Serving Spoon (Pack Size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our kings serving spoon (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 689,
      page_title:
        "E Shape 3 Tier Cake Stand Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our e shape 3 tier cake stand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 690,
      page_title: "White Bud Vase Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our white bud vase for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 691,
      page_title:
        "MY Drap Cocktail Napkin Black Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our my drap cocktail napkin black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 692,
      page_title: "Croquet Set Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our croquet set for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 693,
      page_title:
        "White Square Mini Dish 4.7in (Pack Size 1) Hire | Square White Mini Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our white square mini dish 4.7in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 694,
      page_title:
        "Spandex Royal Blue Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex royal blue pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 695,
      page_title:
        "Shot Glass 1oz (Case Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our shot glass 1oz (case size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 696,
      page_title: "Coat & Clothes Rail Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our coat & clothes rail for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 697,
      page_title:
        "White Square Mini Dish Deep 3in (Pack Size 1) Hire | 3 Dublin | Caterhire",
      meta_description:
        "Hire our white square mini dish deep 3in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 698,
      page_title:
        "Chameleon Chair Silver Back with White Pad Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chameleon chair silver back with white pad for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 699,
      page_title:
        "Linen Napkin Satin Gold 20inÂ¬Ã¹ x 20inÂ¬Ã¹ Hire | Wedding Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our linen napkin satin gold 20inâ¬ã¹ x 20inâ¬ã¹ for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 700,
      page_title:
        "Silver Candlestick 7inÂ¬Ã¹ Hire | Wedding Hire Dublin | Caterhire",
      meta_description:
        "Hire our silver candlestick 7inâ¬ã¹ for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 702,
      page_title:
        "Black Neo Wine Glass 12oz (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our black neo wine glass 12oz (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 703,
      page_title:
        "Arthur Price Silver Soup Spoon (Pack size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our arthur price silver soup spoon (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 704,
      page_title:
        "Kings Fish Fork (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our kings fish fork (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 705,
      page_title:
        "Button Bar Stool White Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our button bar stool white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 706,
      page_title:
        "Linen Tablecloth Black 90in x 90in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth black 90in x 90in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 707,
      page_title:
        "Velvet Chair Cover Red Crush Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our velvet chair cover red crush for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 708,
      page_title:
        "Tiered Bar with Glass Top Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our tiered bar with glass top for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 709,
      page_title:
        "Heathrow 2 Seater Sofa - Black Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our heathrow 2 seater sofa - black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 711,
      page_title:
        "Traditional Wooden Deckchair Red and White Hire | Outdoor Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our traditional wooden deckchair red and white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 712,
      page_title:
        "Royal Doulton Tea Cup 20cl (Pack Size 10) Hire | Royal Doulton Tea Cup | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our royal doulton tea cup 20cl (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 713,
      page_title:
        "Silver Rim Tea Pot 95cl (Pack Size 1) Hire | Silver Rim Tea Pot | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our silver rim tea pot 95cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 714,
      page_title:
        "Coffee Percolator (101 Cup) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our coffee percolator (101 cup) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 715,
      page_title:
        "Soho Combo 2 - Brown Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our soho combo 2 - brown for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 716,
      page_title:
        "Get Knotted Game Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our get knotted game for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 717,
      page_title:
        "Table for Sale Half Round 5ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table for sale half round 5ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 718,
      page_title:
        "White Canape Spoon (Pack Size 1) Hire | White Canape Spoon | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our white canape spoon (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 719,
      page_title:
        "Floor Mat Rubber Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our floor mat rubber for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 722,
      page_title:
        "MYdrap Napkin Fushia Pink 8in x 8in Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our mydrap napkin fushia pink 8in x 8in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 723,
      page_title:
        "Microwave Domestic Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our microwave domestic for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 724,
      page_title:
        "Irish Coffee Glass without Handle 8oz (Case Size 36) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our irish coffee glass without handle 8oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 725,
      page_title:
        "John Rocha Red Wine Glass 20oz (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our john rocha red wine glass 20oz (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 726,
      page_title:
        "Pint Glass 20oz (Case Size 25) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our pint glass 20oz (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 727,
      page_title:
        "Diva Water Glass 16oz (Case Size 25) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our diva water glass 16oz (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 728,
      page_title:
        "Folding White Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our folding white chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 729,
      page_title:
        "White Paella Dish Small 4in (Pack Size 1) Hire | 4in White Paella Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our white paella dish small 4in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 730,
      page_title:
        "Linen Tablecloth Red 54in x 120in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth red 54in x 120in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 731,
      page_title: "Ice Scoop Hire | Bar Accessories Hire Dublin | Caterhire",
      meta_description:
        "Hire our ice scoop for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 732,
      page_title:
        "Cubix Martini Bowl with Clear Cube 7oz (Case Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our cubix martini bowl with clear cube 7oz (case size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 733,
      page_title:
        "Kings Soup Spoon (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our kings soup spoon (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 735,
      page_title:
        "Signature Linen Tablecloth Biscuit Round 132in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our signature linen tablecloth biscuit round 132in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 736,
      page_title:
        "Kings Dinner Knife (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our kings dinner knife (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 737,
      page_title:
        "Silver Jardiniere with Ladle Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our silver jardiniere with ladle for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 738,
      page_title: "Limbo Pole Hire | Outdoor Games Hire Dublin | Caterhire",
      meta_description:
        "Hire our limbo pole for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 739,
      page_title:
        "Silver Candlestick 8.5inÂ¬Ã¹ Hire | Wedding Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our silver candlestick 8.5inâ¬ã¹ for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 740,
      page_title:
        "Table Rectangular 4ft x 24in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table rectangular 4ft x 24in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 741,
      page_title: "Mahogany Wooden Bar Unit Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our mahogany wooden bar unit for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 742,
      page_title: "Plastic Coat Hangers Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our plastic coat hangers for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 744,
      page_title:
        "Ice Bucket / Wine Bucket Stand Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our ice bucket / wine bucket stand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 745,
      page_title:
        "Table For Sale Rectangular 8ft x 2ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table for sale rectangular 8ft x 2ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 746,
      page_title:
        "Victoria Gold Champagne Glass 6oz (Case Size 36) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our victoria gold champagne glass 6oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 747,
      page_title:
        "Linen Tablecloth For Sale - White Round 130in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth for sale - white round 130in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 749,
      page_title:
        "Conical Strainer 9inÂ¬Ã¹ Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our conical strainer 9inâ¬ã¹ for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 750,
      page_title:
        "Serving Bowl Square White 10in Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our serving bowl square white 10in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 753,
      page_title:
        "Regency Tea Pot 85cl (Pack Size 1) Hire | Regency Teapot | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our regency tea pot 85cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 754,
      page_title:
        "Gold Rim Starter/Dessert Plate 23cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our gold rim starter/dessert plate 23cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 756,
      page_title: "Rolltop Chafer Unit Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our rolltop chafer unit for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 757,
      page_title:
        "Oxford Silk White 4 Seater Set Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our oxford silk white 4 seater set for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 758,
      page_title:
        "Cinders Flame Grill BBQ Single Hire | BBQ Hire Dublin | Caterhire",
      meta_description:
        "Hire our cinders flame grill bbq single for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 759,
      page_title: "Hyperlux Tea Pot Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our hyperlux tea pot for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 760,
      page_title: "Gantry Lights Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our gantry lights for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 761,
      page_title:
        "Sorrento 3 Seater Sofa Black Leather Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our sorrento 3 seater sofa black leather for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 762,
      page_title: "Exam Desk 2ft x 24in Hire | Table Hire Dublin | Caterhire",
      meta_description:
        "Hire our exam desk 2ft x 24in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 763,
      page_title:
        "Club Armchair Cocoa Brown Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our club armchair cocoa brown for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 764,
      page_title:
        "Shot Glass Islande (Slim) 2oz (Case Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our shot glass islande (slim) 2oz (case size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 768,
      page_title:
        "Bamboo Kidei Cup 2.5in (Pack of 50) Hire | Caterhing Hire Dublin | Caterhire",
      meta_description:
        "Hire our bamboo kidei cup 2.5in (pack of 50) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 773,
      page_title:
        "Pour Over Coffee Machine Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our pour over coffee machine for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 777,
      page_title:
        "Plastic Cheese Board (18in x 12in) Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our plastic cheese board (18in x 12in) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 778,
      page_title:
        "Vegetable Dish Oval 10in 2 Section Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our vegetable dish oval 10in 2 section for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 781,
      page_title:
        "Signature Linen Napkin Clover Green 20in x 20in Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our signature linen napkin clover green 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 782,
      page_title:
        "Regency Side Plate 16cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our regency side plate 16cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 783,
      page_title:
        "Brown Tapas Bowl 5in x 1in (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our brown tapas bowl 5in x 1in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 784,
      page_title:
        "Velvet Chair Cover Black Crush Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our velvet chair cover black crush for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 785,
      page_title: "Red Velvet Rope 1.5m Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our red velvet rope 1.5m for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 786,
      page_title:
        "Tulip Champagne Flute 6oz (Case Size 36) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our tulip champagne flute 6oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 787,
      page_title: "Vegetable Dish Oval 20in 2 Section Hire | Catering Hire- 20",
      meta_description:
        "Hire our vegetable dish oval 20in 2 section for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 790,
      page_title:
        "Mixing Bowl Stainless Steel 17in Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our mixing bowl stainless steel 17in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 791,
      page_title: "Chair Cover Ivory Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chair cover ivory for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 792,
      page_title:
        "Black Rectangular Plate 25cm x 15cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our black rectangular plate 25cm x 15cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 793,
      page_title:
        "White Mini Dish 3in (Pack Size 1) Hire | 3 Dublin | Caterhire",
      meta_description:
        "Hire our white mini dish 3in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 794,
      page_title: "Whisk 14inÂ¬Ã¹ Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our whisk 14inâ¬ã¹ for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 795,
      page_title:
        "Giant Piano Keyboard Playmat Hire | Giant Games Hire Dublin | Caterhire",
      meta_description:
        "Hire our giant piano keyboard playmat for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 796,
      page_title:
        "Rustic Oak Table (6.6ft x 33in) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our rustic oak table (6.6ft x 33in) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 799,
      page_title: "S-Curved Platter (18",
      meta_description: "Hire our s-curved platter (18",
    },
    {
      id: 802,
      page_title:
        "Japan Lounge Chair Orange Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our japan lounge chair orange for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 803,
      page_title:
        "Silver Candelabra 3 Branch 8in Hire | Decoration Hire Dublin | Caterhire",
      meta_description:
        "Hire our silver candelabra 3 branch 8in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 805,
      page_title:
        "Stock Pot 35 Litre Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our stock pot 35 litre for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 806,
      page_title:
        "Snake Bar Unit, Illuminated Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our snake bar unit, illuminated for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 807,
      page_title:
        "White Teardrop Canape Spoon Hire | White Teardrop Canape Spoon | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our white teardrop canape spoon for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 810,
      page_title:
        "Silver Square Cake Stand 16in Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our silver square cake stand 16in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 811,
      page_title:
        "Club Armchair White Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our club armchair white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 813,
      page_title:
        "Oval Flat Serving Tray 20in Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our oval flat serving tray 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 816,
      page_title:
        "Victoria Gold Rim Water Glass 11oz (Case Size 16) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our victoria gold rim water glass 11oz (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 818,
      page_title:
        "Pastry Fork (Pack Size 10) Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our pastry fork (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 819,
      page_title:
        "Table Rectangular 6ft x 24in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table rectangular 6ft x 24in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 820,
      page_title: "Post & Belt System Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our post & belt system for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 821,
      page_title:
        "Lux Registration Table / Bar Unit White Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our lux registration table / bar unit white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 822,
      page_title:
        "Afternoon Tea Stand Pink (2 Tier) (Pack Size 1) Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our afternoon tea stand pink (2 tier) (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 823,
      page_title:
        "Soho Combo 2 - Orange Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our soho combo 2 - orange for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 824,
      page_title: "Tufted Bar Unit Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our tufted bar unit for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 825,
      page_title:
        "Wine Bottle Cooler Hire | Bar Accessory Hire Dublin | Caterhire",
      meta_description:
        "Hire our wine bottle cooler for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 826,
      page_title:
        "Children's Wooden Picnic Bench Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our children's wooden picnic bench for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 827,
      page_title:
        "Windsor Starter Fork/Dessert Fork (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our windsor starter fork/dessert fork (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 828,
      page_title: "BBQ Lighter Fuel Hire | BBQ Accessories Dublin | Caterhire",
      meta_description:
        "Hire our bbq lighter fuel for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 829,
      page_title:
        "BBQ Tongs Stainless Steel Hire | BBQ Accessories Dublin | Caterhire",
      meta_description:
        "Hire our bbq tongs stainless steel for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 833,
      page_title:
        "Spandex Hot Pink Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex hot pink pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 835,
      page_title:
        "Ascot Dinner Fork (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our ascot dinner fork (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 836,
      page_title:
        "Chaise Longue Hot Pink with Silver Leaf Trim Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our chaise longue hot pink with silver leaf trim for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 837,
      page_title:
        "Satin Napkin Jade Aqua 20in x 20in Hire | Wedding Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our satin napkin jade aqua 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 838,
      page_title:
        "Linen Tablecloth Black Round 118in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth black round 118in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 839,
      page_title:
        "Gastronorm Insert Full Size (1/1) 6in Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our gastronorm insert full size (1/1) 6in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 840,
      page_title: "Platter stand Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our platter stand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 842,
      page_title:
        "Gold Rim Sauce Boat 33cl (Pack Size 1) Hire | Gold Rim Sauce Boat | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our gold rim sauce boat 33cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 843,
      page_title:
        "Regency Dinner Plate 27cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our regency dinner plate 27cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 845,
      page_title: "Steps for Stage Hire | Stage Hire Dublin | Caterhire",
      meta_description:
        "Hire our steps for stage for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 846,
      page_title: "Soup Tureen 4 Litre Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our soup tureen 4 litre for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 847,
      page_title:
        "Wine Tasting Glass 7oz (Case Size 36) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our wine tasting glass 7oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 848,
      page_title:
        "Sorrento Armchair White Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our sorrento armchair white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 849,
      page_title:
        "Sherry Glass 2oz (Case Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our sherry glass 2oz (case size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 850,
      page_title:
        "Bain Marie Hot Plate 3 Well Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our bain marie hot plate 3 well for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 852,
      page_title:
        "Black Dessert Plate 20cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our black dessert plate 20cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 853,
      page_title: "Stacking Rings Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our stacking rings for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 854,
      page_title:
        "Apollo White Stacking Cup 19cl (Pack size 10) Hire | Apollo Tea Cups | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our apollo white stacking cup 19cl (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 856,
      page_title:
        "Clear Salto Glass 12oz (Case Size 25) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our clear salto glass 12oz (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 857,
      page_title:
        "Children's Table Round Green Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our children's table round green for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 858,
      page_title:
        "Chesterfield 3 Seater Sofa Tan Leather Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chesterfield 3 seater sofa tan leather for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 860,
      page_title:
        "Kings Dessert Spoon (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our kings dessert spoon (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 861,
      page_title:
        "Chiavari Chair Mahogany Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chiavari chair mahogany for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 862,
      page_title:
        "Satin Napkin Violet 20in x 20in Hire | Wedding Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our satin napkin violet 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 863,
      page_title:
        "Cube Illuminated with Silver Top Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our cube illuminated with silver top for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 864,
      page_title:
        "Heated Carving Unit 3 Lamp Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our heated carving unit 3 lamp for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 865,
      page_title:
        "Wedgwood Soup Plate 23cm (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood soup plate 23cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 867,
      page_title:
        "Linen Napkin Butter Ivory 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our linen napkin butter ivory 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 869,
      page_title:
        "Silver Rim Sauce Boat 33cl (Pack Size 1) Hire | Silver Rim Gravy Boat | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our silver rim sauce boat 33cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 871,
      page_title:
        "Vegetable Dish Oval 14in 1 Section Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our vegetable dish oval 14in 1 section for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 872,
      page_title:
        "Bottle Opener / Corkscrew Hire | Bar Accessory Hire Dublin | Caterhire",
      meta_description:
        "Hire our bottle opener / corkscrew for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 874,
      page_title:
        "Pop Bench - Saffron Yellow Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our pop bench - saffron yellow for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 876,
      page_title:
        "John Rocha Champagne Flute 8oz (Case Size 1) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our john rocha champagne flute 8oz (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 877,
      page_title:
        "Royal Doulton Soup Bowl 23cl (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our royal doulton soup bowl 23cl (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 878,
      page_title:
        "Chesterfield 3 Seater Sofa Oxblood Leather Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chesterfield 3 seater sofa oxblood leather for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 879,
      page_title:
        "Crystal Globe Candelabra 31.5in Hire | Decoration Hire Dublin | Caterhire",
      meta_description:
        "Hire our crystal globe candelabra 31.5in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 880,
      page_title:
        "Bamboo Kidei Boat 9.5in (Pack of 50) Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our bamboo kidei boat 9.5in (pack of 50) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 881,
      page_title: "Ornate Wooden Bar Unit Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our ornate wooden bar unit for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 882,
      page_title:
        "Milan High Back Bar Stool - Black Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our milan high back bar stool - black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 883,
      page_title:
        "Regency Soup Bowl 29cl (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our regency soup bowl 29cl (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 884,
      page_title:
        "Black Stem Wine Glass 8oz (Case Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our black stem wine glass 8oz (case size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 885,
      page_title:
        "Linen Tablecloth Butter Ivory Round 132in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth butter ivory round 132in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 887,
      page_title:
        "Wooden Parquet Dance Floor 3ft x 3ft Hire | Dancefloor Hire Dublin | Caterhire",
      meta_description:
        "Hire our wooden parquet dance floor 3ft x 3ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 888,
      page_title:
        "Gin Balloon 20oz (Case Size 16) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our gin balloon 20oz (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 890,
      page_title: "Flip Chart Pad Hire | Conference Hire Dublin | Caterhire",
      meta_description:
        "Hire our flip chart pad for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 891,
      page_title:
        "Serving Bowl Round White 9in Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our serving bowl round white 9in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 892,
      page_title:
        "Table For Sale Round 5ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table for sale round 5ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 893,
      page_title:
        "Margarita Cocktail Glass 9oz (Case Size 16) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our margarita cocktail glass 9oz (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 894,
      page_title:
        "Stand Up Ashtray Stainless Steel Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our stand up ashtray stainless steel for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 896,
      page_title:
        "Gastronorm Lid Full Size (1/1) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our gastronorm lid full size (1/1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 897,
      page_title:
        "Under Counter Bottle Cooler (2 Door) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our under counter bottle cooler (2 door) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 898,
      page_title:
        "Candelabra 5 Branch Black 31in Hire | Decoration Hire Dublin | Caterhire",
      meta_description:
        "Hire our candelabra 5 branch black 31in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 899,
      page_title:
        "Ascot Starter Fork/Dessert Fork (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our ascot starter fork/dessert fork (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 900,
      page_title:
        "Silver Rim Sugar Bowl 24cl (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our silver rim sugar bowl 24cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 901,
      page_title:
        "Lady Victoria Chair Gold Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our lady victoria chair gold for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 902,
      page_title:
        "Silk Taffeta Napkin Pale Pink 20in x 20in Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our silk taffeta napkin pale pink 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 903,
      page_title:
        "Lyric Wine Glass 8oz (Case Size 36) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our lyric wine glass 8oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 904,
      page_title:
        "Microwave Industrial Hire | Catering Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our microwave industrial for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 905,
      page_title:
        "Wooden Cheese Board Hire | Cheese Board Hire Dublin | Caterhire",
      meta_description:
        "Hire our wooden cheese board for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 906,
      page_title:
        "2 Ring Burner (Elec.) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our 2 ring burner (elec.) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 907,
      page_title:
        "Table Rectangular 4ft x 30in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table rectangular 4ft x 30in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 909,
      page_title:
        "Gravy Ladle Hire | Catering Utensils Hire Dublin | Caterhire",
      meta_description:
        "Hire our gravy ladle for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 910,
      page_title:
        "Chaise Longue Hot Pink wth Gold Leaf Trim Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our chaise longue hot pink wth gold leaf trim for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 911,
      page_title:
        "Rattan Outdoor 4 Seater Set Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our rattan outdoor 4 seater set for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 913,
      page_title:
        "Chiavari Limewash Chair (Standard) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chiavari limewash chair (standard) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 914,
      page_title:
        "Windsor Fish Knife (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our windsor fish knife (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 915,
      page_title:
        "Cube Illuminated - Small Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our cube illuminated - small for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 916,
      page_title: "Plate Warmer Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our plate warmer for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 918,
      page_title:
        "Arthur Price Silver Starter/Dessert Fork (Pack size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our arthur price silver starter/dessert fork (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 919,
      page_title:
        "Glitter Plate Black 36cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our glitter plate black 36cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 920,
      page_title: "Spider Strainer 9in Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our spider strainer 9in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 921,
      page_title:
        "Spandex Pod Table Topper White Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our spandex pod table topper white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 922,
      page_title: "Skittles Set Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our skittles set for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 923,
      page_title:
        "Gold Rim Butter Dish 10cm (Pack Size 1) Hire | Gold Rim Butter Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our gold rim butter dish 10cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 924,
      page_title:
        "Silver Rim Water Glass 11oz (16 pack) (Case Size 16) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our silver rim water glass 11oz (16 pack) (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 925,
      page_title:
        "Oval Flat Serving Tray 18in Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our oval flat serving tray 18in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 926,
      page_title:
        "Bamboo Buffet Fork 3.5in (Pack of 50) Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our bamboo buffet fork 3.5in (pack of 50) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 927,
      page_title:
        "Chiavari Chair Crystal with White Pad Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chiavari chair crystal with white pad for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 928,
      page_title: "Air Hockey Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our air hockey table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 929,
      page_title:
        "Wooden Garden Set (4 Seater) Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our wooden garden set (4 seater) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 930,
      page_title:
        "Spirit Measure (Small) Hire | Bar Accessory Hire Dublin | Caterhire",
      meta_description:
        "Hire our spirit measure (small) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 932,
      page_title:
        "Cafetiere 12 Cup Glass Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our cafetiere 12 cup glass for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 933,
      page_title:
        "Wedgwood Tea Cup Saucer 14cm (Pack size 10) Hire | Wedgewood Tea Cup Saucer | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood tea cup saucer 14cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 934,
      page_title:
        "Ascot Serving Spoon (Pack Size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our ascot serving spoon (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 935,
      page_title:
        "Signature Linen Tablecloth Grey Round 132in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our signature linen tablecloth grey round 132in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 936,
      page_title:
        "Illuminated Square Coffee Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our illuminated square coffee table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 938,
      page_title:
        "Water Boiler 23 Litre (100 cup) Hire | Catering Hrie Dublin | Caterhire",
      meta_description:
        "Hire our water boiler 23 litre (100 cup) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 939,
      page_title:
        "Diamond Pink Water Glass Tumbler Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our diamond pink water glass tumbler for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 941,
      page_title:
        "Chameleon Chair Gold & Bronze with Black Legs Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chameleon chair gold & bronze with black legs for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 942,
      page_title: "Grass Armchair Hire | Chair Hire Dublin | Caterhire",
      meta_description:
        "Hire our grass armchair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 943,
      page_title:
        "Pop Bench - Lime Green Hire | furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our pop bench - lime green for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 944,
      page_title:
        "Gold Rim Dinner Plate 30cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our gold rim dinner plate 30cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 945,
      page_title:
        "Linen Tablecloth For Sale - White 54in x 54in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth for sale - white 54in x 54in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 946,
      page_title:
        "Sundae Dish Glass Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our sundae dish glass for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 947,
      page_title:
        "Stoneware Dinner Plate Jade 28cm (Pack size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our stoneware dinner plate jade 28cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 948,
      page_title:
        "Vintage Side Plate (Pack Size  1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our vintage side plate (pack size  1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 950,
      page_title:
        "Roasting Tray 20in x 12in Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our roasting tray 20in x 12in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 952,
      page_title:
        "4ft Round Table (Folding) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our 4ft round table (folding) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 953,
      page_title: "Giant Jenga Hire | Games Hire Dublin | Caterhire",
      meta_description:
        "Hire our giant jenga for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 954,
      page_title:
        "Children's Table Square Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our children's table square for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 955,
      page_title:
        "Vintage Tea Cup (Excludes Saucer) (Pack Size 1) Hire | Vintage Tea Cup | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our vintage tea cup (excludes saucer) (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 956,
      page_title:
        "Frosted Glass Round Spiral Plate 12in Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our frosted glass round spiral plate 12in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 958,
      page_title:
        "Vegetable Dish Oval 20in 1 Section Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our vegetable dish oval 20in 1 section for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 959,
      page_title:
        "Wedgwood Sauce Boat 36cl (Pack size 1) Hire | Wedgewood Sauce Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood sauce boat 36cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 961,
      page_title:
        "Brandy Balloon 9oz (Case Size 25) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our brandy balloon 9oz (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 962,
      page_title:
        "Vintage Afternoon Tea Stand Blue 2 Tier 27cm & 20cm (Pack Size 1) Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our vintage afternoon tea stand blue 2 tier 27cm & 20cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 965,
      page_title:
        "Gazebo Black 10ft x 10ft Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our gazebo black 10ft x 10ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 966,
      page_title: "Ice Tongs Hire | Bar Accessory Hire Dublin | Caterhire",
      meta_description:
        "Hire our ice tongs for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 967,
      page_title:
        "Kings Dinner Fork (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our kings dinner fork (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 971,
      page_title:
        "Apollo White Crockery Collection (Pack Size 10) Hire | Apollo White Crockery Collection | Crockery Hire | Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our apollo white crockery collection (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 972,
      page_title:
        "Quoits Game (wooden ring and ropes) Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our quoits game (wooden ring and ropes) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 973,
      page_title:
        "Regency Sugar Bowl 23cl (Pack size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our regency sugar bowl 23cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 976,
      page_title:
        "Monaco Wine Glass 8oz (Case Size 36) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our monaco wine glass 8oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 977,
      page_title:
        "Bash Bar Corner Unit, Illuminated Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our bash bar corner unit, illuminated for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 980,
      page_title:
        "Gastronorm Insert Full Size (1/1) 2.5in Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our gastronorm insert full size (1/1) 2.5in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 981,
      page_title:
        "Milan High Back Bar Stool - White Hire | Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our milan high back bar stool - white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 982,
      page_title:
        "Spandex Champagne Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex champagne pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 983,
      page_title:
        "Baroque Armchair Purple with Silver Leaf Trim Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our baroque armchair purple with silver leaf trim for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 984,
      page_title:
        "Gastronorm Insert Full Size (1/1) 1in Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our gastronorm insert full size (1/1) 1in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 986,
      page_title: "Charcoal BBQ Hire | BBQ Hire Dublin | Caterhire",
      meta_description:
        "Hire our charcoal bbq for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 987,
      page_title:
        "Spandex Dark Purple Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex dark purple pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 989,
      page_title:
        "Linen Tablecloth White Ivy Leaf 90in x 90in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth white ivy leaf 90in x 90in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 990,
      page_title:
        "Royal Doulton Dinner Plate 31cm (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our royal doulton dinner plate 31cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 991,
      page_title:
        "Black Round Plate 30cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our black round plate 30cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 992,
      page_title:
        "Table Rectangular 8ft x 30in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table rectangular 8ft x 30in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 993,
      page_title:
        "Roasting Tray 16in  x 12in Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our roasting tray 16in  x 12in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 994,
      page_title:
        "MY Drap Canape Napkin Cream Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our my drap canape napkin cream for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 995,
      page_title:
        "Silver Footed Round Cake Stand 16in Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our silver footed round cake stand 16in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 996,
      page_title:
        "Baroque Chair Black with Gold Leaf trim - Rococo Style Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our baroque chair black with gold leaf trim - rococo style for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 997,
      page_title:
        "Glass Salad/Serving Bowl 7in Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our glass salad/serving bowl 7in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 998,
      page_title:
        "5ft Round Table (Folding) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our 5ft round table (folding) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1001,
      page_title:
        "Grass Coffee Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our grass coffee table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1002,
      page_title:
        "Steak Knife with Wooden Handle (Pack Size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our steak knife with wooden handle (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1003,
      page_title:
        "Royal Doulton Sugar Bowl 10cm (Pack size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our royal doulton sugar bowl 10cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1004,
      page_title:
        "5ft 6in Round Table (Folding) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our 5ft 6in round table (folding) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },

    {
      id: 1006,
      page_title:
        "Electric Chafer Unit Hire | Catering Hrie Dublin | Caterhire",
      meta_description:
        "Hire our electric chafer unit for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1007,
      page_title:
        "Shot Glass Helix 2oz (Case Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our shot glass helix 2oz (case size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1008,
      page_title:
        "Blue Seal Turbo Fan Oven on Stand Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our blue seal turbo fan oven on stand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1009,
      page_title:
        "Vegetable Dish Oval 14in 3 Section Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our vegetable dish oval 14in 3 section for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1010,
      page_title:
        "V-Shaped Wine Glass 4oz Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our v-shaped wine glass 4oz for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1013,
      page_title:
        "Wooden Serving Tray 18in x 13.5in Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our wooden serving tray 18in x 13.5in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1014,
      page_title:
        "Mighty B Beanbag - Orange Hire | BeanBag Hire Dublin | Caterhire",
      meta_description:
        "Hire our mighty b beanbag - orange for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1016,
      page_title:
        "Mobius Ottoman Cream Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our mobius ottoman cream for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1017,
      page_title:
        "White Rectangular Platter 14in x 6.5in Hire | White Rectangular Platter | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our white rectangular platter 14in x 6.5in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1018,
      page_title:
        "Gold Rim Salt & Pepper Set 9cm (Pack Size 1) Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our gold rim salt & pepper set 9cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1019,
      page_title: "Glasswasher Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our glasswasher for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1020,
      page_title:
        "Brass Handle Chafer Unit Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our brass handle chafer unit for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1021,
      page_title:
        "Silver Rim Soup Plate 23cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our silver rim soup plate 23cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1022,
      page_title:
        "Table Tennis Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table tennis table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1023,
      page_title:
        "Royal Doulton Side Plate 16cm (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our royal doulton side plate 16cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1024,
      page_title:
        "Windsor Dinner Knife (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our windsor dinner knife (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1025,
      page_title:
        "MY Drap Canape Napkin Black Roll Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our my drap canape napkin black roll for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1026,
      page_title:
        "Wooden Parasol Cream Hire | Outdoor Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our wooden parasol cream for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1027,
      page_title:
        "Pop Bench - Milky white Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our pop bench - milky white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1028,
      page_title:
        "Mighty B Beanbag - Black Hire | Beanbag Hire Dublin | Caterhire",
      meta_description:
        "Hire our mighty b beanbag - black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1029,
      page_title:
        "Slim Jim 8oz (Case Size 36) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our slim jim 8oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1030,
      page_title:
        "Linen Tablecloth White Ivy Leaf 70in x 70in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth white ivy leaf 70in x 70in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1032,
      page_title:
        "Sorrento Armchair Black Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our sorrento armchair black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1033,
      page_title:
        "Regency Cappuccino Cup 23cl (Pack Size 10) Hire | Regency Cappuccino Cup | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our regency cappuccino cup 23cl (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1034,
      page_title:
        "Kings Fish Knife (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our kings fish knife (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1035,
      page_title:
        "White Dance Floor 4ft x 2ft Hire | Dancefloor Hire Dublin | Caterhire",
      meta_description:
        "Hire our white dance floor 4ft x 2ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1036,
      page_title:
        "Seated Bar Unit, Illuminated Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our seated bar unit, illuminated for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1037,
      page_title:
        "Linen Tablecloth Red 72in x 144in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth red 72in x 144in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1040,
      page_title:
        "Silver Candelabra 5 Branch 15in Hire | Decoration Hire Dublin | Caterhire",
      meta_description:
        "Hire our silver candelabra 5 branch 15in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1041,
      page_title:
        "Silk Taffeta Tablecloth Purple Round 132in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our silk taffeta tablecloth purple round 132in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1042,
      page_title:
        "Victoria Gold Rim White Wine Glass 7oz (Case Size 16) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our victoria gold rim white wine glass 7oz (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1043,
      page_title:
        "Candy Ottoman Grey - Large Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our candy ottoman grey - large for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1044,
      page_title:
        "Hand Wash Unit Square Hire | Kitchen Hire Dublin | Caterhire",
      meta_description:
        "Hire our hand wash unit square for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1045,
      page_title:
        "Peak Pod Table Illuminated -Tall Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our peak pod table illuminated -tall for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1046,
      page_title:
        "Organza Chair Tie / Table Runner Ivory Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our organza chair tie / table runner ivory for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1047,
      page_title:
        "Children's Stool White Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our children's stool white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1048,
      page_title:
        "Silver Rim Butter Dish 10cm (Pack Size 1) Hire | Silver Rim Butter Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our silver rim butter dish 10cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1049,
      page_title:
        "Serving Bowl Square White 13in Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our serving bowl square white 13in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1050,
      page_title:
        "Wedgwood Jasper Conran Dinner Plate 33cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood jasper conran dinner plate 33cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1051,
      page_title:
        "Traditional Wooden Deckchair Blue and White Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our traditional wooden deckchair blue and white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1052,
      page_title:
        "Arthur Price Silver Dinner Fork (Pack size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our arthur price silver dinner fork (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1053,
      page_title:
        "Linen Table Skirting White 9ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table skirting white 9ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1055,
      page_title:
        "Silver Candlestick Round Base (small) Hire | Decoration Hire Dublin | Caterhire",
      meta_description:
        "Hire our silver candlestick round base (small) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1056,
      page_title:
        "Regency Soup/Pasta Plate 24cm (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our regency soup/pasta plate 24cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1058,
      page_title:
        "Club 3 Seater Sofa - Cocoa Brown Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our club 3 seater sofa - cocoa brown for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1060,
      page_title:
        "Buffet Stand with 5 Shelves Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our buffet stand with 5 shelves for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1061,
      page_title:
        "Regency Coffee Pot 89cl (Pack size 1) Hire | Regency Coffee Pot | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our regency coffee pot 89cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1062,
      page_title:
        "Bash Bar Unit with Ice Well, illuminated Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our bash bar unit with ice well, illuminated for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1063,
      page_title:
        "Wooden Garden Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our wooden garden chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1064,
      page_title:
        "Zen Illuminated Room Divider Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our zen illuminated room divider for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1065,
      page_title:
        "Wooden Serving Tray 24in x 18in Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our wooden serving tray 24in x 18in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1066,
      page_title:
        "Table For Sale Rectangular 6ft x 2ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table for sale rectangular 6ft x 2ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1067,
      page_title:
        "6ft Round Table (Folding) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our 6ft round table (folding) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1068,
      page_title:
        "Linen Tablecloth For Sale - White 70in x 70in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth for sale - white 70in x 70in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1069,
      page_title:
        "Silver Rim Salt & Pepper Set 8cm (Pack Size 1) Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our silver rim salt & pepper set 8cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1070,
      page_title:
        "Linen Table Skirting White 21ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table skirting white 21ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1071,
      page_title:
        "Table For Sale Round 4ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table for sale round 4ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1072,
      page_title:
        "Bar Tray Silver 16in Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our bar tray silver 16in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1074,
      page_title:
        "Spandex Hunter Green Pod Cover Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our spandex hunter green pod cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1075,
      page_title:
        "Signature Linen Napkin Lavender 20in x 20in Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our signature linen napkin lavender 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1076,
      page_title:
        "Chest Freezer with Glass Top Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our chest freezer with glass top for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1077,
      page_title:
        "Crystal Water Glass 8oz (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our crystal water glass 8oz (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1078,
      page_title:
        "Regency Milk Jug 29cl (Pack size 1) Hire | Regency Milk Jug with Lip | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our regency milk jug 29cl (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1079,
      page_title:
        "Rustic  Wooden Bench with Foldable legs Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our rustic  wooden bench with foldable legs for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1080,
      page_title:
        "Cheese Knife (Pack Size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our cheese knife (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1081,
      page_title:
        "Candy Ottoman Grey - Small Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our candy ottoman grey - small for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1082,
      page_title: "Silver Napkin Ring Hire | Dining Hire Dublin | Caterhire",
      meta_description:
        "Hire our silver napkin ring for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1083,
      page_title:
        "Bain Marie 4 Well Table Top Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our bain marie 4 well table top for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1084,
      page_title:
        "Buffet Mirror Display Tray 36in x 24in Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our buffet mirror display tray 36in x 24in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1085,
      page_title:
        "Silver Candelabra 5 Branch 31in Hire | Decoration Hire Dublin | Caterhire",
      meta_description:
        "Hire our silver candelabra 5 branch 31in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1086,
      page_title:
        "Club Coffee Table in Black Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our club coffee table in black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1087,
      page_title: "Glass Clip Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our glass clip for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1088,
      page_title:
        "Chaise Longue Black with Silver Leaf Trim Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our chaise longue black with silver leaf trim for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1089,
      page_title:
        "Chocolate Fountain (small) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our chocolate fountain (small) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1090,
      page_title:
        "Ascot Starter Knife/Side Knife (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our ascot starter knife/side knife (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1091,
      page_title:
        "Table Rectangular 8ft x 24in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table rectangular 8ft x 24in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1092,
      page_title:
        "Linen Tablecloth Blue 54in x 120in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth blue 54in x 120in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1093,
      page_title:
        "Spandex Pod Table Topper Ivory Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our spandex pod table topper ivory for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1095,
      page_title:
        "Wedgwood Dinner Plate 31cm (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood dinner plate 31cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1096,
      page_title:
        "Gold Rim Side Plate 15cm (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our gold rim side plate 15cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1097,
      page_title:
        "Freestanding Mirror Chrome Frame Hire | Decoration Hire Dublin | Caterhire",
      meta_description:
        "Hire our freestanding mirror chrome frame for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1098,
      page_title:
        "Spandex Pod Table Topper Blue Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our spandex pod table topper blue for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1099,
      page_title:
        "Platter Teardrop White 17.5in x 8in Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our platter teardrop white 17.5in x 8in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1100,
      page_title:
        "Table Number Stand Round Base 18in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table number stand round base 18in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1101,
      page_title:
        "Milano Conference Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our milano conference chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1103,
      page_title:
        "Office Chair Black Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our office chair black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1104,
      page_title:
        "Children's Stool Dark Pink Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our children's stool dark pink for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1105,
      page_title:
        "Children's Chair Blue Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our children's chair blue for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1106,
      page_title:
        "Children's Chair Pink Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our children's chair pink for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1107,
      page_title:
        "Toadstool Table Red and White Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our toadstool table red and white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1108,
      page_title:
        "Toadstool Green and White Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our toadstool green and white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1109,
      page_title:
        "Toadstool Purple and White Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our toadstool purple and white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1110,
      page_title:
        "Toadstool Red and White Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our toadstool red and white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1111,
      page_title:
        "Pallet Outdoor 4 Seater Set Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our pallet outdoor 4 seater set for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1116,
      page_title:
        "Smartie Bench White (5 seater) old Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our smartie bench white (5 seater) old for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1117,
      page_title:
        "Smartie Bench Black (5 seater) Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our smartie bench black (5 seater) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1118,
      page_title:
        "Smartie Bench Fuchsia (5 seater) Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our smartie bench fuchsia (5 seater) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1119,
      page_title:
        "Smartie Bench Yellow (5 seater) Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our smartie bench yellow (5 seater) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1120,
      page_title:
        "Smartie Bench Lime Green (5 seater) Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our smartie bench lime green (5 seater) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1121,
      page_title:
        "Cube White Bar Stool Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our cube white bar stool for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1123,
      page_title:
        "Cube Black Bar Stool Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our cube black bar stool for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1125,
      page_title:
        "Cube Black Bar Stool (Small) Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our cube black bar stool (small) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1126,
      page_title:
        "Zeus Bar Stool with Red Pad Cover Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our zeus bar stool with red pad cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1127,
      page_title:
        "Zeus Stool with White Spandex Cover Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our zeus stool with white spandex cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1128,
      page_title: "Aurora Black Stool Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our aurora black stool for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1129,
      page_title:
        "Traditional Wooden Bar Stool Hire | Bar Stool Hire Dublin | Caterhire",
      meta_description:
        "Hire our traditional wooden bar stool for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1131,
      page_title:
        "Chameleon Black Suede Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chameleon black suede chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1132,
      page_title:
        "Chameleon White Suede Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chameleon white suede chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1133,
      page_title:
        "Chameleon Cocoa Brown Suede Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chameleon cocoa brown suede chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1134,
      page_title:
        "Chloe White Chameleon Chair (Full Cover) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chloe white chameleon chair (full cover) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1135,
      page_title:
        "Chameleon Charcoal Suede Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chameleon charcoal suede chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1136,
      page_title:
        "Chloe Ivory Chameleon Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our chloe ivory chameleon chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1145,
      page_title:
        "Peak Pod Table Black Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our peak pod table black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1146,
      page_title:
        "White Square Pod Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our white square pod table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1147,
      page_title:
        "Pod Table Glass Round- High Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our pod table glass round- high for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1148,
      page_title:
        "Pod Table Glass Round Dining Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our pod table glass round dining table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1149,
      page_title:
        "Pod Table Birch Round Tall Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our pod table birch round tall for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1150,
      page_title:
        "Walnut Square Dining Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our walnut square dining table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1151,
      page_title:
        "Pod Table White Round Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our pod table white round for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1152,
      page_title:
        "Cube Black High Bar Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our cube black high bar table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1154,
      page_title:
        "Cube White High Bar Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our cube white high bar table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1155,
      page_title:
        "Wooden Barrel Pod Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our wooden barrel pod table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1156,
      page_title:
        "Steel Barrel Pod Table with Wooden Top -Yellow Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our steel barrel pod table with wooden top -yellow for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1157,
      page_title:
        "Steel Barrel Pod Table with Wooden Top - Blue Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our steel barrel pod table with wooden top - blue for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1158,
      page_title:
        "Steel Barrel Pod Table with Wooden Top - Green Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our steel barrel pod table with wooden top - green for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1159,
      page_title:
        "Steel Barrel Pod Table with Wooden Top - Red Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our steel barrel pod table with wooden top - red for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1160,
      page_title:
        "Alaska 2 Seater Sofa -White Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our alaska 2 seater sofa -white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1161,
      page_title:
        "Alaska 3 Seater Sofa - White Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our alaska 3 seater sofa - white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1162,
      page_title:
        "Alaska Armchair - White Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our alaska armchair - white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1164,
      page_title:
        "Alaska Square Coffee Table - White Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our alaska square coffee table - white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1165,
      page_title:
        "Kodeta Glass Coffee Table - with shelf Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our kodeta glass coffee table - with shelf for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1166,
      page_title:
        "Low Disc Coffee Table - Dark Brown Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our low disc coffee table - dark brown for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1167,
      page_title:
        "Coffee Table Glass - Tall Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our coffee table glass - tall for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1168,
      page_title:
        "Table Rectangular 8ft x 18in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table rectangular 8ft x 18in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1169,
      page_title:
        "Wingback Armchair Yellow Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our wingback armchair yellow for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1170,
      page_title:
        "Wingback Armchair Red Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our wingback armchair red for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1171,
      page_title: "Mad Men Armchair Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our mad men armchair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1172,
      page_title:
        "Silver Rim Oval Plate 28cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our silver rim oval plate 28cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1173,
      page_title:
        "Silver Rim Dinner Plate 30cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our silver rim dinner plate 30cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1174,
      page_title:
        "Ascot Fish Fork (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our ascot fish fork (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1175,
      page_title:
        "Ascot Fish Knife (Pack Size 10) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our ascot fish knife (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1176,
      page_title:
        "Black Soup Plate 23cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our black soup plate 23cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1177,
      page_title:
        "Black Bowl 18cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our black bowl 18cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1178,
      page_title:
        "Black Bowl 22cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our black bowl 22cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1179,
      page_title:
        "Black Round Plate 23cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our black round plate 23cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1180,
      page_title:
        "White Square Side Plate 17cm (Pack size 10) - Flat Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our white square side plate 17cm (pack size 10) - flat for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1181,
      page_title:
        "White Square Dinner Plate 25cm (Pack size 10) - Flat Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our white square dinner plate 25cm (pack size 10) - flat for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1182,
      page_title:
        "White Square Dinner Plate 25cm (Pack size 10) - Deep Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our white square dinner plate 25cm (pack size 10) - deep for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1183,
      page_title:
        "White Square Dinner Plate 30cm (Pack size 10) - Flat Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our white square dinner plate 30cm (pack size 10) - flat for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1184,
      page_title:
        "White Square Dinner Plate 28cm (Pack size 10) - Deep Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our white square dinner plate 28cm (pack size 10) - deep for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1185,
      page_title:
        "Diamond Clear Wine Goblet (Case Size 25) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our diamond clear wine goblet (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1186,
      page_title:
        "Wide Rim Tumbler 5oz Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our wide rim tumbler 5oz for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1187,
      page_title:
        "Champagne Glass 4oz (Case Size 25) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our champagne glass 4oz (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1188,
      page_title: "Whiskey 6oz Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our whiskey 6oz for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1189,
      page_title:
        "Black Pasta Plate 28cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our black pasta plate 28cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1190,
      page_title:
        "Bain Marie 4 Well with Hot Plate & Gantry Lights Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our bain marie 4 well with hot plate & gantry lights for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1191,
      page_title:
        "Bain Marie 2 Well Table Top Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our bain marie 2 well table top for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1192,
      page_title:
        "Bain Marie 2 Well with Hot Plate Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our bain marie 2 well with hot plate for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1193,
      page_title:
        "Heated Carvery Lamp Chrome Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our heated carvery lamp chrome for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1194,
      page_title:
        "Heated Carvery Unit 1 Lamp Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our heated carvery unit 1 lamp for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1195,
      page_title:
        "Under Counter Freezer (Domestic) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our under counter freezer (domestic) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1196,
      page_title:
        "Freezer Double Door Stainless Steel Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our freezer double door stainless steel for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1197,
      page_title:
        "Fridge Gastro Double Door Stainless Steel Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our fridge gastro double door stainless steel for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1198,
      page_title:
        "Fridge Gastro Single Door Stainless Steel Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our fridge gastro single door stainless steel for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1199,
      page_title:
        "Freezer Single Door Stainless Steel Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our freezer single door stainless steel for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1200,
      page_title:
        "Under Counter Fridge (Domestic) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our under counter fridge (domestic) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1201,
      page_title: "Combi Oven 10 Rack Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our combi oven 10 rack for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1202,
      page_title:
        "6 Ring Industrial Oven Electric Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our 6 ring industrial oven electric for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1203,
      page_title: "Paella Pan Burner Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our paella pan burner for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1204,
      page_title: "Bratt Pan 50L Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our bratt pan 50l for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1205,
      page_title:
        "Hot Plate Griddle 52in x 26in (Elec.) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our hot plate griddle 52in x 26in (elec.) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1206,
      page_title:
        "Hot Plate Griddle 37in x 28in (Elec.) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our hot plate griddle 37in x 28in (elec.) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1207,
      page_title:
        "Burger Griddle 24in x 18in (Elec.) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our burger griddle 24in x 18in (elec.) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1208,
      page_title:
        "Burger Griddle 29in x 19in  (Elec.) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our burger griddle 29in x 19in  (elec.) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1209,
      page_title:
        "Deep Fat Fryer Gas (2 Basket) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our deep fat fryer gas (2 basket) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1211,
      page_title:
        "Cook & Hold Oven (Small) Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our cook & hold oven (small) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1212,
      page_title: "Salamander Grill Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our salamander grill for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1213,
      page_title:
        "Hood Dishwasher 2 Rack Hire | Kitchen Hire Dublin | Caterhire",
      meta_description:
        "Hire our hood dishwasher 2 rack for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1214,
      page_title:
        "Hood Dishwasher with Pre Rinse Sink & Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our hood dishwasher with pre rinse sink & table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1215,
      page_title:
        "Insectazap Fly Killer Hire | Kitchen Hire Dublin | Caterhire",
      meta_description:
        "Hire our insectazap fly killer for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1216,
      page_title: "Avocado Bar Brown 4ft Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our avocado bar brown 4ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1217,
      page_title: "Bamboo Tiki Bar 5.4ft Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our bamboo tiki bar 5.4ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1218,
      page_title: "Jumbo Bar 3ft Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our jumbo bar 3ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1219,
      page_title: "Jumbo Bar Corner Unit Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our jumbo bar corner unit for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1220,
      page_title:
        "Victoria Oak Right Corner Bar 7.2ft Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our victoria oak right corner bar 7.2ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1221,
      page_title:
        "Linen Tablecloth Ivory 70in x 108in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen tablecloth ivory 70in x 108in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1223,
      page_title:
        "MY Drap Cocktail Napkin Pearl Grey Hire | Napkin Hire Dublin | Caterhire",
      meta_description:
        "Hire our my drap cocktail napkin pearl grey for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1224,
      page_title:
        "Medieval Pillory Stocks 1.4m Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our medieval pillory stocks 1.4m for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1226,
      page_title:
        "Christian Lacroix Caribe Dessert Plate 22cm (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our christian lacroix caribe dessert plate 22cm (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1228,
      page_title:
        "Carrara Marble Side Plate 15cm (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our carrara marble side plate 15cm (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1230,
      page_title:
        "Fiji Dinner Plate 27cm (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our fiji dinner plate 27cm (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1231,
      page_title:
        "Fiji Dessert Plate 23cm (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our fiji dessert plate 23cm (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1232,
      page_title:
        "Fiji Side Plate 18cm (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our fiji side plate 18cm (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1234,
      page_title:
        "Timeless Dessert Plate 20cm (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our timeless dessert plate 20cm (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1236,
      page_title:
        "Venezia Dessert Plate 23cm (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our venezia dessert plate 23cm (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1238,
      page_title:
        "Mediterranean Dinner Plate Indigo 28cm (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our mediterranean dinner plate indigo 28cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1239,
      page_title:
        "Mediterranean Dinner Plate Morning Blue 28cm (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our mediterranean dinner plate morning blue 28cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1240,
      page_title:
        "Mediterranean Dinner Plate Pink 28cm (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our mediterranean dinner plate pink 28cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1241,
      page_title:
        "Mediterranean Dinner Plate White Antique 28cm (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our mediterranean dinner plate white antique 28cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1242,
      page_title:
        "Goa White & Gold Dinner Fork (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa white & gold dinner fork (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1244,
      page_title:
        "Goa White & Gold Dinner Knife (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa white & gold dinner knife (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1246,
      page_title:
        "Goa White & Gold Soup Spoon (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa white & gold soup spoon (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1247,
      page_title:
        "Goa White & Gold Starter/Dessert Fork (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa white & gold starter/dessert fork (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1248,
      page_title:
        "Goa White & Gold Starter/Dessert Knife (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa white & gold starter/dessert knife (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1249,
      page_title:
        "Goa White & Gold Coffee/Tea Spoon (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa white & gold coffee/tea spoon (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1250,
      page_title:
        "Goa Black & Gold Dinner Fork (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa black & gold dinner fork (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1251,
      page_title:
        "Goa Black & Gold Dinner Knife (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa black & gold dinner knife (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1253,
      page_title:
        "Goa Black & Gold Soup Spoon (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa black & gold soup spoon (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1254,
      page_title:
        "Goa Black & Gold Starter/Dessert Fork (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa black & gold starter/dessert fork (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1255,
      page_title:
        "Goa Black & Gold Starter/Dessert Knife (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa black & gold starter/dessert knife (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1256,
      page_title:
        "Goa Black & Gold Coffee/Tea Spoon (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa black & gold coffee/tea spoon (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1257,
      page_title:
        "Mini Copper Saucepan 5in (Pack Size 1) Hire | Mini Copper Saucepan | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our mini copper saucepan 5in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1258,
      page_title:
        "White Mini Dish 2 Sections 3in  x 2in (Pack Size 1) Hire | White Two Section Mini Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our white mini dish 2 sections 3in  x 2in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1259,
      page_title:
        "White Mini Dish 2 Sections 4.2in x 2in (Pack Size 1) Hire | White 2 Section Mini Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our white mini dish 2 sections 4.2in x 2in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1260,
      page_title:
        "Curved Mini Dish White 5in x 3in (Pack Size 1) Hire | White Curved Mini Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our curved mini dish white 5in x 3in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1261,
      page_title:
        "Dip/Sauce Bowl White 2.5in x 0.5in (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our dip/sauce bowl white 2.5in x 0.5in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1262,
      page_title:
        "Dip/ Sauce Bowl -White 2.5in x 1in (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our dip/ sauce bowl -white 2.5in x 1in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1263,
      page_title:
        "Spoulet Bowl White 4in (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our spoulet bowl white 4in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1264,
      page_title:
        "Square Flat Mini Dish 3.5in (Pack Size 1) Hire | Min Square Flat Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our square flat mini dish 3.5in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1265,
      page_title:
        "Triangular Mini Dish White 3in (Pack Size 1) Hire | White Mini Triangular Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our triangular mini dish white 3in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1266,
      page_title:
        "Ramekin Dish Black 3.5in (Pack Size 1) Hire | 3 White Ramekin Dishes | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our ramekin dish black 3.5in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1267,
      page_title:
        "White Ramekin Dish White 2in (Pack Size 1) Hire | 2 White Ramekin Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our white ramekin dish white 2in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1268,
      page_title:
        "Ramekin Dish White 3.5in x 1.5in (Pack Size 1) Hire | White Ramekin Dish | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our ramekin dish white 3.5in x 1.5in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1269,
      page_title:
        "Rice Bowl White with Stem 5in (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our rice bowl white with stem 5in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1270,
      page_title:
        "White Rectangular Platter 15in x 10.5in (Pack Size 1) Hire | White Rectangular Platter | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our white rectangular platter 15in x 10.5in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1271,
      page_title:
        "Platter Wooden Rectangular 11in x 8in Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our platter wooden rectangular 11in x 8in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1272,
      page_title:
        "Platter Wooden Rectangular 13in x 9in Hire | Buffet Hire Dublin | Caterhire",
      meta_description:
        "Hire our platter wooden rectangular 13in x 9in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1274,
      page_title:
        "Slate Plate Rectangular 12in x 4in (Pack size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our slate plate rectangular 12in x 4in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1275,
      page_title:
        "Slate Plate Square 11in x 11in (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our slate plate square 11in x 11in (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1276,
      page_title:
        "Platter Wooden Rectangular with Ceramic Plate 14in x 8in Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our platter wooden rectangular with ceramic plate 14in x 8in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1277,
      page_title:
        "Platter Rectangular Wooden with Ceramic Plate 12in x 7.5in Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our platter rectangular wooden with ceramic plate 12in x 7.5in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1280,
      page_title:
        "Crystal Champagne Flute  4oz (Case Size 1) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our crystal champagne flute  4oz (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1281,
      page_title:
        "Black Velvet Rope Barrier 1.5m Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our black velvet rope barrier 1.5m for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1282,
      page_title:
        "Green Rope Barrier 1.5m Hire | Event Hire Dublin | Caterhire",
      meta_description:
        "Hire our green rope barrier 1.5m for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1283,
      page_title: "Red Carpet Hire 10m Hire | Wedding Hire Dublin | Caterhire",
      meta_description:
        "Hire our red carpet hire 10m for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1284,
      page_title:
        "Charcoal Black Carpet Hire 10m Hire | Wedding Hire Dublin | Caterhire",
      meta_description:
        "Hire our charcoal black carpet hire 10m for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1285,
      page_title:
        "Salmon Pink Carpet Hire 10m Hire | Wedding Hire Dublin | Caterhire",
      meta_description:
        "Hire our salmon pink carpet hire 10m for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1286,
      page_title:
        "Giant Scissors Hire 26in Hire | Wedding Hire Dublin | Caterhire",
      meta_description:
        "Hire our giant scissors hire 26in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1287,
      page_title:
        "Wooden Easel/Artist Easel Hire | Conference Hire Dublin | Caterhire",
      meta_description:
        "Hire our wooden easel/artist easel for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1288,
      page_title:
        "Christmas Jumbo Games Package Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our christmas jumbo games package for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1290,
      page_title:
        "Bar and Cocktail Hire Package Hire | Bar Hire Packages Dublin | Caterhire",
      meta_description:
        "Hire our bar and cocktail hire package for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1291,
      page_title: "Cocktail Shaker Copper Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our cocktail shaker copper for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1292,
      page_title:
        "Cocktail Mixing Spoon with Masher Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our cocktail mixing spoon with masher for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1293,
      page_title:
        "Cocktail Lemon Squeezer Copper Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our cocktail lemon squeezer copper for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1294,
      page_title:
        "Cocktail Lemon Slice Squeezer Copper Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our cocktail lemon slice squeezer copper for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1295,
      page_title:
        "Cocktail Strainer Short Handle 2 Prong Copper Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our cocktail strainer short handle 2 prong copper for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1296,
      page_title:
        "Cocktail Strainer Long Handle 2 Prong Copper Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our cocktail strainer long handle 2 prong copper for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1297,
      page_title:
        "Jigger Spirit Measure Copper Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our jigger spirit measure copper for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1298,
      page_title: "Pop Up Gin Bar 4.6ft Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our pop up gin bar 4.6ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1299,
      page_title: "Spikeball Hire | Outdoor Game Hire Dublin | Caterhire",
      meta_description:
        "Hire our spikeball for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1300,
      page_title: "Salt White Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our salt white chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1302,
      page_title:
        "Transatlantica Dessert Plate 19cm (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our transatlantica dessert plate 19cm (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1303,
      page_title:
        "Transatlantica Side Plate 16cm (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our transatlantica side plate 16cm (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1304,
      page_title:
        "Diamond Pink Wine Goblet (Case Size 25) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our diamond pink wine goblet (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1305,
      page_title:
        "Diamond Grey Wine Goblet (Case Size 25) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our diamond grey wine goblet (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1306,
      page_title:
        "Fleur de lys pitcher Powderpink (Case Size 1) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our fleur de lys pitcher powderpink (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1307,
      page_title:
        "Diamond Pitcher Clear (Case Size 1) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our diamond pitcher clear (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1308,
      page_title:
        "Diamond Pitcher Blue (Case Size 1) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our diamond pitcher blue (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1309,
      page_title:
        "Diamond Pitcher Pink (Case Size 1) Hire | Glassware Hire Dublin | Caterhire",
      meta_description:
        "Hire our diamond pitcher pink (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1310,
      page_title:
        "Stoneware Dinner Plate Black 28cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our stoneware dinner plate black 28cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1312,
      page_title:
        "Furniture package for 10 Guests Hire | Furniture Package | Seasonal Offers | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our furniture package for 10 guests for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1314,
      page_title:
        "Gold Dining Package Hire | Dining Rental Packages - Platinum Dublin | Caterhire",
      meta_description:
        "Hire our gold dining package for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1315,
      page_title:
        "Goa Pink & Gold Dinner Fork (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa pink & gold dinner fork (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1316,
      page_title:
        "Goa Pink & Gold Dinner Knife (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa pink & gold dinner knife (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1317,
      page_title:
        "Goa Pink & Gold Dessert Spoon (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa pink & gold dessert spoon (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1319,
      page_title:
        "Goa Pink & Gold Starter / Dessert Fork (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa pink & gold starter / dessert fork (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1320,
      page_title:
        "Goa Pink & Gold Starter / Butter Knife (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa pink & gold starter / butter knife (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1321,
      page_title:
        "Goa Pink & Gold Coffee / Tea Spoon (Pack size 1) Hire | Cutlery Hire Dublin | Caterhire",
      meta_description:
        "Hire our goa pink & gold coffee / tea spoon (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1322,
      page_title:
        "Mother Of Pearl Dinner Knife (Case Size 1) Hire | Mother Of Pearl Dinner Knife | Caterhire Dublin | Caterhire",
      meta_description:
        "Our Mother of Pearl cutlery will bring magic to your dinner table. Hire now at Caterhire for your next event. Click & Collect or next day delivery",
    },
    {
      id: 1323,
      page_title:
        "Mother Of Pearl Dinner Fork (Case Size 1) Hire | Mother Of Pearl Dinner Fork | Caterhire Dublin | Caterhire",
      meta_description:
        "Our Mother of Pearl cutlery will bring magic to your dinner table. Hire now at Caterhire for your next event. Click & Collect or next day delivery",
    },
    {
      id: 1324,
      page_title:
        "Mother Of Pearl Soup Spoon (Case Size 1) Hire | Mother Of Pearl Soup Spoon | Caterhire Dublin | Caterhire",
      meta_description:
        "Our Mother of Pearl cutlery will bring magic to your dinner table. Hire now at Caterhire for your next event. Click & Collect or next day delivery",
    },
    {
      id: 1326,
      page_title:
        "Mother Of Pearl Starter / Dessert Fork (Case Size 1) Hire | Mother Of Pearl Starter Dessert Fork | Caterhire Dublin | Caterhire",
      meta_description:
        "Our Mother of Pearl cutlery will bring magic to your dinner table. Hire now at Caterhire for your next event. Click & Collect or next day delivery",
    },
    {
      id: 1327,
      page_title:
        "Mother Of Pearl Dessert Spoon (Case Size 1) Hire | Mother Of Pearl Starter Dessert Spoon | Caterhire Dublin | Caterhire",
      meta_description:
        "Our Mother of Pearl cutlery will bring magic to your dinner table. Hire now at Caterhire for your next event. Click & Collect or next day delivery",
    },
    {
      id: 1328,
      page_title:
        "Aqua Dinner Knife (Case Size 1) Hire | Cutlery Hire | Aqua Dinner Knife | Caterhire Dublin | Caterhire",
      meta_description:
        "Our aqua duck egg blue cutlery will bring magic to your dinner table. Hire now at Caterhire for your next event. Click & Collect or next day delivery",
    },
    {
      id: 1329,
      page_title:
        "Aqua Dinner Fork (Case Size 1) Hire | Cutlery Hire | Aqua Dinner Fork | Caterhire Dublin | Caterhire",
      meta_description:
        "Our aqua duck egg blue cutlery will bring magic to your dinner table. Hire now at Caterhire for your next event. Click & Collect or next day delivery",
    },
    {
      id: 1330,
      page_title:
        "Aqua Soup Spoon (Case Size 1) Hire | Cutlery Hire | Aqua Soup Spoon | Caterhire Dublin | Caterhire",
      meta_description:
        "Our aqua duck egg blue cutlery will bring magic to your dinner table. Hire now at Caterhire for your next event. Click & Collect or next day delivery",
    },
    {
      id: 1332,
      page_title:
        "Aqua Starter / Dessert Fork (Case Size 1) Hire | Cutlery Hire | Aqua Starter Dessert Fork | Caterhire Dublin | Caterhire",
      meta_description:
        "Our aqua duck egg blue cutlery will bring magic to your dinner table. Hire now at Caterhire for your next event. Click & Collect or next day delivery",
    },
    {
      id: 1333,
      page_title:
        "Aqua Dessert Spoon (Case Size 1) Hire | Cutlery Hire | Aqua Starter Dessert Spoon | Caterhire Dublin | Caterhire",
      meta_description:
        "Our aqua duck egg blue cutlery will bring magic to your dinner table. Hire now at Caterhire for your next event. Click & Collect or next day delivery",
    },
    {
      id: 1334,
      page_title:
        "Christmas Dining Party at Home for 10 Guests Hire | Christmas Dining Party at Home for 10 Guests | Seasonal Offers |  CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our christmas dining party at home for 10 guests for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1336,
      page_title:
        "Flow Network Table (Medium) Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our flow network table (medium) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1337,
      page_title:
        "Flow Dinner Table (Medium) - 5.9ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our flow dinner table (medium) - 5.9ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1338,
      page_title:
        "Flow Grande Network High Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our flow grande network high table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1343,
      page_title:
        "Fine Dining Hire Package for 10 guests Hire | Fine Dining at Home Hire Package for 10 guests | Seasonal Offers | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our fine dining hire package for 10 guests for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1344,
      page_title:
        "Red Linen Napkin Navy 20in x 20in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our red linen napkin navy 20in x 20in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1345,
      page_title:
        "Life Sized Alice in Wonderland Hire | Life Sized Alice in Wonderland | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our life sized alice in wonderland for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1346,
      page_title:
        "Card Soldier with Paintbrush - Clubs Hire | Card Soldier with Paintbrush - Clubs | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our card soldier with paintbrush - clubs for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1347,
      page_title:
        "Card Soldier with Axe - Spades Hire | Card Soldier with Axe - Spades | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our card soldier with axe - spades for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1348,
      page_title:
        "Card Soldier with Joist - Hearts Hire | Card Soldier with Joist - Hearts  | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our card soldier with joist - hearts for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1349,
      page_title:
        "Giant Chess Piece, Rook White Hire | Giant Chess Piece, Rook White | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our giant chess piece, rook white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1350,
      page_title:
        "Giant Pink Cupcake Hire | Giant Pink Cupcake | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our giant pink cupcake for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1351,
      page_title:
        "Giant Yellow Cupcake Hire | Giant Yellow Cupcake | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our giant yellow cupcake for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1352,
      page_title:
        "Giant White Cupcake Hire | Giant White Cupcake | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our giant white cupcake for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1353,
      page_title:
        "Giant Silver Knife & Fork Hire | Giant Silver Knife & Fork | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our giant silver knife & fork for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1354,
      page_title:
        "Life Sized Mad Hatter Hire | Life Sized Mad Hatter | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our life sized mad hatter for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1355,
      page_title:
        "Giant White Rabbit with Stopwatch Hire | Giant White Rabbit with Stopwatch | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our giant white rabbit with stopwatch for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1356,
      page_title:
        "Dance Sign Hire | Dance Sign | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our dance sign for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1357,
      page_title:
        "Tea Party Sign Hire | Tea Party Sign | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our tea party sign for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1358,
      page_title:
        "Giant Teapot with Red & White Spots Hire | Giant Teapot with Red & White Spots | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our giant teapot with red & white spots for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1359,
      page_title:
        "Giant Toadstool Hire | Giant Toadstool  | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our giant toadstool for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1360,
      page_title:
        "Giant Playing Card - Ace of Clubs Hire | Giant Playing Card - Ace of Clubs | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our giant playing card - ace of clubs for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1361,
      page_title:
        "Giant Playing Card - Ace of Diamonds Hire | Giant Playing Card - Ace of Diamonds | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our giant playing card - ace of diamonds for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1362,
      page_title:
        "Giant Playing Card  - Ace of Hearts Hire | Giant Playing Card  - Ace of Hearts | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our giant playing card  - ace of hearts for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1363,
      page_title:
        "Giant Playing Card  - Ace of Spades Hire | Giant Playing Card  - Ace of Spades | Props | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our giant playing card  - ace of spades for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1364,
      page_title:
        "Palm 2 Seater Sofa Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our palm 2 seater sofa for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1365,
      page_title:
        "Palm Armchair Hire | Palm Armchair | Outdoor Furniture & BBQ | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our palm armchair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1366,
      page_title:
        "Palm Coffee Table / Stool Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our palm coffee table / stool for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1367,
      page_title:
        "Volt Barstool Black Hire | Volt Barstool Black | Bar Stools | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our volt barstool black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1368,
      page_title:
        "Volt Barstool White Hire | Volt Barstool White | Bar Stools | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our volt barstool white for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1369,
      page_title: "Volt Chair Black Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our volt chair black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1370,
      page_title:
        "Sensa Red Wine Glass (Case Size 25) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our sensa red wine glass (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1371,
      page_title:
        "Sensa White Wine Glass (Case Size 36) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our sensa white wine glass (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1372,
      page_title:
        "Sensa Water Glass (Case Size 25) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our sensa water glass (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1373,
      page_title:
        "Sensa Champagne Glass (Case Size 36) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our sensa champagne glass (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1374,
      page_title:
        "Capri 2 Seater Sofa Mink Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our capri 2 seater sofa mink for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1375,
      page_title:
        "Capri 2 Seater Sofa Mustard Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our capri 2 seater sofa mustard for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1376,
      page_title:
        "Capri 2 Seater Sofa Dark Green Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our capri 2 seater sofa dark green for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1377,
      page_title:
        "Capri 2 Seater Sofa Dark Blue Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our capri 2 seater sofa dark blue for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1378,
      page_title:
        "Capri Armchair Dark Blue Hire | Capri Armchair Navy |  Armchair Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our capri armchair dark blue for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1379,
      page_title:
        "Capri Armchair Dark Green Hire | Capri Armchair Dark Green |  Armchair Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our capri armchair dark green for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1380,
      page_title:
        "Capri Armchair Mustard Hire | Capri Armchair Mustard |  Armchair Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our capri armchair mustard for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1381,
      page_title:
        "Capri Armchair Mink Hire | Capri Armchair Mink |  Armchair Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our capri armchair mink for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1382,
      page_title:
        "Cold Display Serveover Unit Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our cold display serveover unit for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1383,
      page_title:
        "Alto Buffetware System Hire | Alto Buffetware System | Buffetware | CaterHire.ie Dublin | Caterhire",
      meta_description:
        "Hire our alto buffetware system for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1384,
      page_title:
        "Giant Frankenstein Hire | Giant Frankenstein | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our giant frankenstein for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1385,
      page_title:
        "Frankenstein with hands out Hire | Frankenstein with hands out | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our frankenstein with hands out for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1386,
      page_title:
        "Frankenstein with notice board Hire | Frankenstein with notice board | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our frankenstein with notice board for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1387,
      page_title:
        "Life-sized witch with broomstick Hire | Life-sized witch with broomstick | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our life-sized witch with broomstick for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1388,
      page_title:
        "Dracula with notice board Hire | Dracula with notice board | Prop Hire | Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our dracula with notice board for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1389,
      page_title:
        "Grim Reaper with Scythe Hire | Grim Reaper with Scythe | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our grim reaper with scythe for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1390,
      page_title:
        "Grim Reaper with pumpkin Hire | Grim Reaper with pumpkin | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our grim reaper with pumpkin for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1391,
      page_title:
        "Coffin with head inside Hire | Coffin with head inside | Prop Hire |  CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our coffin with head inside for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1392,
      page_title:
        "Giant Cauldron Hire | Giant Cauldron | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our giant cauldron for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1393,
      page_title:
        "Gravestone Hire | Gravestone | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our gravestone for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1394,
      page_title:
        "Scary Hanging Ghoul - Dracula Hire | Scary Hanging Ghoul - Dracula | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our scary hanging ghoul - dracula for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1395,
      page_title:
        "Scary Hanging Ghoul - Purple Face with Boils Hire | Scary Hanging Ghoul - Purple Face with Boils  | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our scary hanging ghoul - purple face with boils for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1396,
      page_title:
        "Scary Hanging Ghoul - Spiked Tongue Hire | Scary Hanging Ghoul - Spiked Tongue  | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our scary hanging ghoul - spiked tongue for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1397,
      page_title:
        "Scary Hanging Ghoul - White Face and Black Lips Hire | Scary Hanging Ghoul - White Face and Black Lips | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our scary hanging ghoul - white face and black lips for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1398,
      page_title:
        "Free Food Sign with hands in chains Hire | Free Food Sign with hands in chains | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our free food sign with hands in chains for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1399,
      page_title:
        "Linea Coffee Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "We offer nationwide next day delivery for our event and party coffee table rentals. Place your order online or call us today.",
    },
    {
      id: 1400,
      page_title:
        "Zoey Bar Stool Hire | Zoey Bar Stool | Bar Stool Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "We offer nationwide next-day delivery for our event bar stool rentals. Order online or by phone.",
    },
    {
      id: 1401,
      page_title:
        "Flow Cube Dining Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our flow cube dining table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1402,
      page_title:
        "Giant Candy Cane on Stand Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our giant candy cane on stand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1403,
      page_title:
        "Giant Skinny Candy Cane on Stand Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our giant skinny candy cane on stand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1404,
      page_title:
        "Small Winter Tree with Snow Hire | Small Winter Tree with Snow | Prop Hire |  CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our small winter tree with snow for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1405,
      page_title:
        "Large Winter Tree with Snow Hire | Large Winter Tree with Snow | Prop Hire |  CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our large winter tree with snow for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1406,
      page_title:
        "Reindeer Seated, facing forward Hire | Reindeer Seated, facing forward | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our reindeer seated, facing forward for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1407,
      page_title:
        "White Christmas Bell Hire | White Christmas Bell | Prop Hire Dublin | Caterhire",
      meta_description:
        "Hire our white christmas bell for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1408,
      page_title:
        "Large Red Drum Hire | Large Red Drum | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our large red drum for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1409,
      page_title:
        "Small Red Drum Hire | Small Red Drum | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our small red drum for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1410,
      page_title:
        "Red Toy Drummer Hire | Red Toy Drummer | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our red toy drummer for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1411,
      page_title:
        "Grey Toy Drummer Hire | Grey Toy Drummer | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our grey toy drummer for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1412,
      page_title:
        "Boy Elf Hire | Boy Elf | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our boy elf for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1413,
      page_title:
        "Girl Elf Hire | Girl Elf | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our girl elf for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1414,
      page_title:
        "Elf on crouching Reindeer Hire | Elf on crouching reindeer | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our elf on crouching reindeer for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1415,
      page_title:
        "Elf on Flying Reindeer Hire | Elf on flying reindeer | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our elf on flying reindeer for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1416,
      page_title:
        "Elf with arms in front Hire | Elf with arms out front | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our elf with arms in front for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1417,
      page_title:
        "Elf with Bell Hire | Elf with Bell | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our elf with bell for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1418,
      page_title:
        "Elf with Lamp Hire | Elf with Lamp | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our elf with lamp for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1419,
      page_title:
        "Tin Soldier Hire | Tin Soldier | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our tin soldier for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1420,
      page_title:
        "Toy Soldier on Drum Hire | Toy Soldier on Drum | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our toy soldier on drum for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1421,
      page_title:
        "Three Elves on Reindeer Hire | Three Elves on a reindeer | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our three elves on reindeer for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1422,
      page_title:
        "Three Elves on a Sleigh with a sack of presents Hire | Three Elves on a sleigh with a sack of presents| Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our three elves on a sleigh with a sack of presents for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1423,
      page_title:
        "Fireplace Hire | Fireplace  Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our fireplace for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1424,
      page_title:
        "Gingerbread Man with Candy Cane Hire | Gingerbread Man with Candy cane |Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our gingerbread man with candy cane for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1425,
      page_title:
        "Gingerbread Boy Hire | Gingerbread Boy  |Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our gingerbread boy for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1426,
      page_title:
        "Gingerbread Boy with Candy Cane Hire | Gingerbread Boy with Candy Cane  |Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our gingerbread boy with candy cane for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1427,
      page_title:
        "Gingerbread Girl Hire | Gingerbread Girl  |Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our gingerbread girl for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1428,
      page_title:
        "Gingerbread Girl with Book Hire | Gingerbread Girl with Book  |Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our gingerbread girl with book for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1429,
      page_title:
        "Gingerbread Lady Hire | Gingerbread Lady|Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our gingerbread lady for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1430,
      page_title:
        "Red Metal Post Box Hire | Red Metal Post Box  |Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our red metal post box for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1431,
      page_title:
        "Nutcracker Soldier with White Moustache Hire | Nut Cracker Soldier with White Moustache  |Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our nutcracker soldier with white moustache for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1432,
      page_title:
        "Toy Soldier with Trumpet Hire | Toy Soldier with Trumpet  |Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our toy soldier with trumpet for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1433,
      page_title:
        "Lamp Post with Snow Hire | Lamp Post with Snow  | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our lamp post with snow for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1434,
      page_title:
        "Reindeer Standing Facing Sideways Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our reindeer standing facing sideways for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1435,
      page_title:
        "Reindeer Seated Facing Sideways Hire | Reindeer Seated, facing sideways | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our reindeer seated facing sideways for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1436,
      page_title:
        "Reindeer Seated with Hooves Crossed Hire | Reindeer Seated, with hooves crossed | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our reindeer seated with hooves crossed for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1437,
      page_title:
        "Santa Coming Out Of The Fireplace Hire | Santa Coming Out Of The Fireplace | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our santa coming out of the fireplace for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1438,
      page_title:
        "Santa In Workshop Hire | Santa In Workshop | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our santa in workshop for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1439,
      page_title:
        "Santa On Rope Hire | Santa on a rope  | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our santa on rope for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1440,
      page_title:
        "Santa With Bell And Sack Of Presents Hire | Santa with bell and sack of presents  | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our santa with bell and sack of presents for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1441,
      page_title:
        "Santa With Lamp Post Hire | Santa With Lamp Post  | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our santa with lamp post for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1442,
      page_title:
        "Santa With Lantern Hire | Santa With Lantern  | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our santa with lantern for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1443,
      page_title:
        "Santa In Shorts With Guitar Hire | Santa In Shorts With Guitar  | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our santa in shorts with guitar for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1444,
      page_title:
        "Santa In Shorts With Surfboard Hire | Santa In Shorts With Surfboard  | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our santa in shorts with surfboard for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1445,
      page_title:
        "Life-sized Scrooge With Lantern Hire | Life-sized Scrooge With Lantern | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our life-sized scrooge with lantern for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1446,
      page_title:
        "Santa's Throne With Santa's Face On The Back Hire | Santa's Throne With Santa's Face On The Back | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our santa's throne with santa's face on the back for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1447,
      page_title:
        "Santa's Throne With Green Back Hire | Santa's Throne With A Green Back | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our santa's throne with green back for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1448,
      page_title:
        "White Sleigh Hire | White Sleigh | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our white sleigh for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1449,
      page_title:
        "Large Hanging Snowflake with Santa's Face Hire | Large Silver Hanging Snowflake with Santa's face | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our large hanging snowflake with santa's face for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1450,
      page_title:
        "Small Hanging Snowflake with Santa's Face Hire | Small Silver Hanging Snowflake with Santa's face | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our small hanging snowflake with santa's face for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1451,
      page_title:
        "Large Snowman with Hat, Twig and Scarf Hire | Large Snowman with Hat, Twig and Scarf | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our large snowman with hat, twig and scarf for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1452,
      page_title:
        "Small Snowman with Hat, Twig and Scarf Hire | Small Snowman with Hat, Twig and Scarf | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our small snowman with hat, twig and scarf for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1453,
      page_title:
        "Snowman with Candy Cane Hire | Snowman with Candycane | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our snowman with candy cane for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1454,
      page_title:
        "Snowman and Snowboy Hire | Snowman with Snowboy | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our snowman and snowboy for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1455,
      page_title:
        "Kids' Christmas Table Package  for 10 Guests Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our kids' christmas table package  for 10 guests for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1456,
      page_title:
        "Christmas Fine Dining Hire Package for 10 guests Hire | Christmas Fine Dining at Home Hire Package for 10 guests | Seasonal Offers | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our christmas fine dining hire package for 10 guests for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1457,
      page_title:
        "Toy Train Hire | Toy Train | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our toy train for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1458,
      page_title:
        "Santa With Christmas Countdown Hire | Santa With Christmas Countdown | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our santa with christmas countdown for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1459,
      page_title:
        "Giant Green Gift Box Hire | Giant Green Gift Box | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our giant green gift box for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1460,
      page_title:
        "White Christmas Bauble - Medium Hire | White Christmas Bauble - Medium | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our white christmas bauble - medium for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1461,
      page_title:
        "White Christmas Bauble -  Small Hire | White Christmas Bauble - Small| Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our white christmas bauble -  small for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1462,
      page_title:
        "Red Post Box with Snow Hire | Red Post Box  |Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our red post box with snow for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1463,
      page_title:
        "White With Red Christmas Bauble - Medium Hire | White With Red Christmas Bauble - Medium | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our white with red christmas bauble - medium for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1464,
      page_title:
        "Purple Christmas Bauble - Large Hire | Purple With Gold Christmas Bauble - Large | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our purple christmas bauble - large for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1465,
      page_title:
        "Purple Christmas Bauble - Medium Hire | Purple With Gold Christmas Bauble - Medium | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our purple christmas bauble - medium for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1466,
      page_title:
        "Purple Christmas Bauble - Small Hire | Purple With Gold Christmas Bauble - Small | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our purple christmas bauble - small for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1467,
      page_title:
        "Green and Gold Christmas Bauble - Large Hire | Green with Gold Christmas Bauble - Large | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our green and gold christmas bauble - large for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1468,
      page_title:
        "Jumbo Games Package Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our jumbo games package for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1469,
      page_title:
        "Dining Party at Home for 10 Guests Hire | Dining Party at Home for 10 Guests | Seasonal Offers |  CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our dining party at home for 10 guests for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1472,
      page_title:
        "Alice Bar Stool Rose Gold Hire | Alice Bar Stool Rose Gold | Bar Stools | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our alice bar stool rose gold for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1473,
      page_title: "Ronda Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our ronda chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1474,
      page_title:
        "Palm Black Coffee Table / Ottoman Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our palm black coffee table / ottoman for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1475,
      page_title:
        "Palm Black Armchair Hire | Palm Black Armchair | Outdoor Furniture & BBQ | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our palm black armchair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1476,
      page_title:
        "Palm Black 2 Seater Sofa Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our palm black 2 seater sofa for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1477,
      page_title:
        "Flow Carrara Silver Marble Effect Round Dining Table - 5.9ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our flow carrara silver marble effect round dining table - 5.9ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1478,
      page_title:
        "Cornhole Games Set Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our cornhole games set for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1479,
      page_title:
        "Timeless Vintage Cocktail Glass 7oz (Case size 16) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our timeless vintage cocktail glass 7oz (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1480,
      page_title:
        "Timeless Vintage Cut Glass Hi Ball 13.5oz (Case size 36) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our timeless vintage cut glass hi ball 13.5oz (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1481,
      page_title:
        "Timeless Cut Glass Whiskey Tumbler 10.5oz (Case size 25) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our timeless cut glass whiskey tumbler 10.5oz (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1482,
      page_title:
        "Phobos Black Reactive Dinner Plate 27cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our phobos black reactive dinner plate 27cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1483,
      page_title:
        "Phobos Black Reactive Pasta Plate 29cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our phobos black reactive pasta plate 29cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1484,
      page_title:
        "Fusion Reactive Blue Dinner Plate 29cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our fusion reactive blue dinner plate 29cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1485,
      page_title:
        "Fusion Reactive Blue Elliptical Tray 24cm x 10cm (Pack Size 10) Hire | Fusion Reactive Blue Elliptical Tray | Crockery Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our fusion reactive blue elliptical tray 24cm x 10cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1486,
      page_title:
        "Lace Glass Charger Plate 33cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our lace glass charger plate 33cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1487,
      page_title:
        "Lace Glass Side Plate (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our lace glass side plate (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1488,
      page_title:
        "Rattan Charger Plate - White 32cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our rattan charger plate - white 32cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1489,
      page_title:
        "Rattan Charger Plate - Brown 32cm (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our rattan charger plate - brown 32cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1490,
      page_title:
        "Rimini Lounge Corner Unit Hire | Rimini Lounge Corner Unit | Outdoor Furniture | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our rimini lounge corner unit for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1491,
      page_title:
        "Rimini Lounge Set Hire | Party & Event Games Dublin | Caterhire",
      meta_description:
        "Hire our rimini lounge set for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1492,
      page_title:
        "Arthur Price Silver Dessert Spoon (Pack Size 10) Hire | Arthur Price Silver Dessert Spoon For Hire Dublin | Caterhire",
      meta_description:
        "We hire quality Arthur Price Silver Dessert Spoon for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1493,
      page_title:
        "Wedgwood Espresso Cup Saucer 12cm (Pack Size 10) Hire | Wedgwood Espresso Cup Saucer For Hire | Crockery Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "We hire quality Wedgwood Espresso Cup Saucer for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1494,
      page_title:
        "Victoria Gold Dessert Spoon (Pack Size 10) Hire | Victoria Gold Dessert Spoon For Hire Dublin | Caterhire",
      meta_description:
        "We hire quality Victoria Gold Dessert Spoon for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1495,
      page_title:
        "Windsor Dinner Fork (Pack Size 10) Hire | Windsor Dinner Fork For Hire Dublin | Caterhire",
      meta_description:
        "We hire quality Windsor Dinner Fork for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1496,
      page_title:
        "Silver Rim Dessert Bowl 24cl (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "We hire quality Silver Rim Dessert Bowl 8oz for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1497,
      page_title:
        "Kings Teaspoon (Pack Size 10) Hire | Kings Teaspoon For Hire Dublin | Caterhire",
      meta_description:
        "We hire quality Kings Teaspoon for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1498,
      page_title:
        "Black Round Tablecloth 130in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our black round tablecloth 130in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1499,
      page_title:
        "Wedgwood Jasper Conran Peacock Green Starter Plate 23cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "We offer a wide selection of Wedgwood Jasper Conran Peacock Tea Cups for rent, perfect for any event or party. Choose from our extensive online inventory or call us now to place an order for nationwide delivery or click and collect.",
    },
    {
      id: 1500,
      page_title:
        "Wedgwood Jasper Conran Peacock Tea Cup Saucer 16cm (Pack Size 10) Hire | Wedgwood Jasper Conran Peacock Tea Cup Saucer For Hire | Crockery Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "We offer a wide selection of Wedgwood Jasper Conran Peacock Tea Cups for rent, perfect for any event or party. Choose from our extensive online inventory or call us now to place an order for nationwide delivery or click and collect.",
    },
    {
      id: 1501,
      page_title:
        "Wedgwood Jasper Conran Peacock Side Plate 18cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "We offer a wide selection of Wedgwood Jasper Conran Peacock Tea Cups for rent, perfect for any event or party. Choose from our extensive online inventory or call us now to place an order for nationwide delivery or click and collect.",
    },
    {
      id: 1502,
      page_title:
        "Wedgwood Jasper Conran Peacock White Starter Plate 23cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "We offer a wide selection of Wedgwood Jasper Conran Peacock Tea Cups for rent, perfect for any event or party. Choose from our extensive online inventory or call us now to place an order for nationwide delivery or click and collect.",
    },
    {
      id: 1503,
      page_title:
        "Jasper Conran Wedgwood Peacock Dinner Plate  27cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "We offer a wide selection of Wedgwood Jasper Conran Peacock Tea Cups for rent, perfect for any event or party. Choose from our extensive online inventory or call us now to place an order for nationwide delivery or click and collect.",
    },
    {
      id: 1504,
      page_title:
        "Wedgwood Jasper Conran Peacock Tea Cup  25cl (Pack Size 10) Hire | Wedgwood Jasper Conran Peacock Tea Cup For Hire | Crockery Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "We offer a wide selection of Wedgwood Jasper Conran Peacock Tea Cups for rent, perfect for any event or party. Choose from our extensive online inventory or call us now to place an order for nationwide delivery or click and collect.",
    },
    {
      id: 1505,
      page_title:
        "Aqua Starter / Side Knife Hire | Aqua Starter / Side Knife For Hire Dublin | Caterhire",
      meta_description:
        "We hire quality Aqua Starter / Side Knife for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1506,
      page_title:
        "Mother Of Pearl Starter / Side Knife (Case size 1) Hire | Mother Of Pearl Starter / Side Knife For Hire Dublin | Caterhire",
      meta_description:
        "We hire quality Mother Of Pearl Starter / Side Knife for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1507,
      page_title:
        "Goa Pink & Gold Soup Spoon (Pack size 1) Hire | Goa Pink & Gold Soup Spoon For Hire Dublin | Caterhire",
      meta_description:
        "We hire quality Goa Pink & Gold Soup Spoon for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1508,
      page_title:
        "Goa Black & Gold Dessert Spoon (Pack Size 1) Hire | Goa Black & Gold Dessert Spoon For Hire Dublin | Caterhire",
      meta_description:
        "We hire quality Goa Black & Gold Dessert Spoon for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1509,
      page_title:
        "Goa White & Gold Dessert Spoon (Pack Size 1) Hire | Goa White & Gold Dessert Spoon For Hire Dublin | Caterhire",
      meta_description:
        "We hire quality Goa White & Gold Dessert Spoon for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1510,
      page_title:
        "Mediterranean Dinner Plate Anthracite 28cm (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "We hire quality Mediterranean Dinner Plate Anthracite 11in for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1511,
      page_title:
        "Venezia Dinner Plate 28cm (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "We hire quality Venezia Dinner Plate 11in for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1512,
      page_title:
        "Timeless Dinner Plate 27cm (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "We hire quality Timeless Dinner Plate 10.5in for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1513,
      page_title:
        "Fiji Charger Plate 33cm (Case size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "We hire quality Fiji Charger Plate 13in for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1514,
      page_title:
        "Carrara Marble Dinner Plate 28cm (Case size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "We hire quality Carrara Marble Dinner Plate 11in for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1515,
      page_title:
        "Christian Lacroix Caribe Dinner Plate 28cm (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "We hire quality Christian Lacroix Caribe Dinner Plate 11in for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1516,
      page_title:
        "Gold Rim Dinner Plate 25cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "We hire quality Gold Rim Dinner Plate 10in for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1517,
      page_title:
        "Transatlantica Dinner Plate 28cm (Case Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "We hire quality Transatlantica Dinner Plate 11in for events & parties. Nationwide Delivery or Click & Collect. Browse our extensive online range or CALL US NOW.",
    },
    {
      id: 1518,
      page_title:
        "Wedgwood Jasper Conran Dinner Plate  27cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our wedgwood jasper conran dinner plate  27cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1519,
      page_title:
        "Aqua Rice Bowl 5â€ x 2â€ (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our aqua rice bowl 5â€ x 2â€ (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1521,
      page_title:
        "White Mini Triangular Appetiser Dish 3.5â€ x 1.5â€ (Pack Size 1) Hire | White Mini Triangular Appetiser Dish 3.5â€ x 1.5â€  |  Mini Dishes | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our white mini triangular appetiser dish 3.5â€ x 1.5â€ (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1522,
      page_title:
        "White Tapas Bowl 5â€ x 1â€ (Pack Size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our white tapas bowl 5â€ x 1â€ (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1523,
      page_title:
        "White Mini Dish Bowl Shaped 4â€ x 2.5â€ (Pack size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our white mini dish bowl shaped 4â€ x 2.5â€ (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1524,
      page_title:
        "Slopping Appetiser Bowl 4â€ x 1â€ (Pack size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our slopping appetiser bowl 4â€ x 1â€ (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1525,
      page_title: "Blue Morocco Footed Bowl 4",
      meta_description: "Hire our blue morocco footed bowl 4",
    },
    {
      id: 1526,
      page_title:
        "White Square Appetiser Dish 6â€ x 6â€ (Pack size 1) Hire | White Square Appetiser Dish 6â€ x 6â€  |  Mini Dishes | Caterhire.ie Dublin | Caterhire",
      meta_description:
        "Hire our white square appetiser dish 6â€ x 6â€ (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1527,
      page_title:
        "Rustic Wine Barrell Bar Hire | Rustic Wine Barrell Bar | Bar Counters | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our rustic wine barrell bar for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1528,
      page_title:
        "Stoneware Dinner Plate Taupe 28cm (Pack size 1) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our stoneware dinner plate taupe 28cm (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1529,
      page_title:
        "Regency Soup Cup with Handle 29cl (Pack Size 10) Hire | Regency Soup Cup with Handle 29cl | Crockery Hire |Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our regency soup cup with handle 29cl (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1530,
      page_title:
        "Regency Dessert Bowl 17cm (Pack Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our regency dessert bowl 17cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1531,
      page_title:
        "Spandex for 6ft Trestle Table Black Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "We hire table linen for every type of event. From spandex table covers to coloured and white table linen. Nationwide delivery. Order online hireall.ie",
    },
    {
      id: 1532,
      page_title:
        "Victoria Oak Straight Unit Bar 6.6ft Hire | Bar Hire Dublin | Caterhire",
      meta_description:
        "Hire our victoria oak straight unit bar 6.6ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1533,
      page_title:
        "Mediterranean Starter / Dessert Plate Pink 22cm (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our mediterranean starter / dessert plate pink 22cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1534,
      page_title:
        "Mediterranean Starter / Dessert Plate Antique White 22cm (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our mediterranean starter / dessert plate antique white 22cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1535,
      page_title:
        "Timeless Red Wine Glass 27cl (Case size 25) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our timeless red wine glass 27cl (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1536,
      page_title:
        "Timeless White Wine Glass 21cl (Case size 25) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our timeless white wine glass 21cl (case size 25) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1537,
      page_title:
        "Timeless Champagne Flute 16cl (Case size 36) Hire | Timeless Champagne Flute 16cl  | Champagne Glass Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our timeless champagne flute 16cl (case size 36) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1538,
      page_title:
        "Woodley Flute Bar 3.08m Hire | Woodley Flute Bar 3.08m | Bar Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "We hire bar counters for every type of event. Including the Woodley. Nationwide delivery. Order online caterhire.ie",
    },
    {
      id: 1539,
      page_title:
        "White Wooden Bar Hire | White Wooden Bar | Bar Counter Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "We hire bar counters for every type of wedding and event. Including our White Wooden Bar. Nationwide delivery. Order online caterhire.ie",
    },
    {
      id: 1540,
      page_title:
        "Royal Doulton Dinner Plate 26cm (Pack size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our royal doulton dinner plate 26cm (pack size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1541,
      page_title:
        "Fridge Gastro single clear door Hire | Catering Hire Dublin | Caterhire",
      meta_description:
        "Hire our fridge gastro single clear door for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1542,
      page_title:
        "Forest Green Ivy Leaf Napkin Hire | Forest Green Ivy Leaf Napkin | Napkin Hire | CaterHire.ie Dublin | Caterhire",
      meta_description:
        "Discover premium table linen and napkins for hire, perfect for any event. Wide range of colours and styles available with convenient nationwide delivery.",
    },
    {
      id: 1543,
      page_title:
        "Chrome Water Jug Hire | Chrome Water Jug | Water Jug Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our chrome water jug for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1544,
      page_title:
        "Black Bottle Bin Hire | Bottle Bin Black | Event Essentials | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our black bottle bin for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1545,
      page_title:
        "Large Ice and Champagne Bucket Hire | Large Ice Bucket | Barware Serveware | CaterHire.ie Dublin | Caterhire",
      meta_description:
        "Hire our large ice and champagne bucket for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1546,
      page_title:
        "Small Stainless Steel Ice Bucket Stand Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our small stainless steel ice bucket stand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1547,
      page_title:
        "Bar Tray Non-Slip Black 36cm Hire | Bar Tray Non-Slip Black 36cm | Table Service | CaterHire.ie Dublin | Caterhire",
      meta_description:
        "Hire our bar tray non-slip black 36cm for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1548,
      page_title:
        "Beko Chest Freezer Hire | Beko Chest Freezer  | Freezer Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our beko chest freezer for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1549,
      page_title:
        "Electric Meat Slicer Hire | Electric Meat Slicer | Food Preparation Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our electric meat slicer for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1550,
      page_title:
        "3 Tier Large Vintage  Afternoon Tea Stand Hire | Display & Presentation Dublin | Caterhire",
      meta_description:
        "Hire our 3 tier large vintage  afternoon tea stand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1551,
      page_title:
        "Table number stand round 30cm Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table number stand round 30cm for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1552,
      page_title:
        "Kings Pattern Serving Spoon Hire | Kings Pattern Service Spoon | Cutlery Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our kings pattern serving spoon for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1553,
      page_title:
        "Metal Easel Hire | Metal Easel | Event Essentials for Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our metal easel for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1554,
      page_title:
        "Red Carpet 92cm X 207cm Hire | Red Carpet 92CM X 207CM | Carpet Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our red carpet 92cm x 207cm for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1555,
      page_title:
        "Red Carpet  92cm X 580cm Hire | Red Carpet 92CM X 580CM | Carpet Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our red carpet  92cm x 580cm for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1556,
      page_title:
        "Free standing mirror Hire | Free Standing Mirror | Event Essentials | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our free standing mirror for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1557,
      page_title:
        "Coat stand Hire | Coat Stand | Cloakroom Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our coat stand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1558,
      page_title:
        "Wooden Coat Hangers pack of 50 Hire | Wooden Coat Hangers | Cloakroom | CaterHire.ie Dublin | Caterhire",
      meta_description:
        "Hire our wooden coat hangers pack of 50 for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1559,
      page_title:
        "Life Size Baby Elephant Prop Hire | Life Size Baby Elephant Prop | Prop Hire | CaterHire.ie Dublin | Caterhire",
      meta_description:
        "Hire our life size baby elephant prop for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1560,
      page_title:
        "Life Size Lion Prop - Hire | Life Size Lion Prop | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our life size lion prop - for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1561,
      page_title:
        "Life Size Polar Bear Prop Hire | Life Size Polar Bear Prop | Prop Hire | CaterHire.ie Dublin | Caterhire",
      meta_description:
        "Hire our life size polar bear prop for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1562,
      page_title:
        "Life Size Snarling Wolf Prop Hire | Life Size Wolf Prop -| Prop Hire | CaterHire.ie Dublin | Caterhire",
      meta_description:
        "Hire our life size snarling wolf prop for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1563,
      page_title:
        "Life Size Zebra Prop Hire | Life Size Zebra Prop | Prop Hire | CaterHire.ie Dublin | Caterhire",
      meta_description:
        "Hire our life size zebra prop for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1564,
      page_title:
        "Life Size Penguin Prop Hire | Life Size Penguin Prop | Prop Hire | CaterHire.ie Dublin | Caterhire",
      meta_description:
        "Hire our life size penguin prop for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1565,
      page_title:
        "Gold Statue Hire | Golden Statue | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our gold statue for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1566,
      page_title:
        "Santa in window frame (hanging) Hire | Santa in Window | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our santa in window frame (hanging) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1567,
      page_title:
        "Organza Chair Tie - Black Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our organza chair tie - black for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1568,
      page_title:
        "Organza Chair Tie - Burgundy Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our organza chair tie - burgundy for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1569,
      page_title:
        "Conference Cloth Blue - 120in x 54in Hire | Blue Conference Cloth 120in x 54in | Linen Hire | Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our conference cloth blue - 120in x 54in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1570,
      page_title:
        "Conference Cloth Green - 120in x 60in Hire | Green Conference Cloth 120in x 60in | Linen Hire | Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our conference cloth green - 120in x 60in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1571,
      page_title:
        "Diamond Clear Water Tumbler (case size 1) Hire | Diamond Clear Water Tumbler | Glassware Hire | Caterhire Dublin | Caterhire",
      meta_description:
        "Hire our diamond clear water tumbler (case size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1572,
      page_title:
        "Linen Table Cloth Black - 70in x 108in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table cloth black - 70in x 108in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1573,
      page_title:
        "Linen Table Cloth Black - 70in x 144in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table cloth black - 70in x 144in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1574,
      page_title:
        "Linen Table Cloth Burgundy - 54in x 70in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table cloth burgundy - 54in x 70in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1575,
      page_title:
        "Linen Table Cloth Blue - 60in x 60in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table cloth blue - 60in x 60in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1576,
      page_title:
        "Round Linen Table Cloth Ivory -  118in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our round linen table cloth ivory -  118in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1577,
      page_title:
        "Linen Table Cloth Ivory - 90in x 90in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table cloth ivory - 90in x 90in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1578,
      page_title:
        "Round Linen Table Cloth Red - 106in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our round linen table cloth red - 106in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1579,
      page_title:
        "Linen Table Cloth White - 36in x 36in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table cloth white - 36in x 36in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1580,
      page_title:
        "Blue Cotton Ivy Leaf Napkin - 20in x 20in Hire | Blue Ivy Leaf Napkin | Napkin Hire | CaterHire.ie Dublin | Caterhire",
      meta_description:
        "Discover premium table linen and napkins for hire, perfect for any event. Wide range of colours and styles available with convenient nationwide delivery.",
    },
    {
      id: 1581,
      page_title:
        "Pink Cotton Napkin -20in x 20in Hire | Pink Cotton Napkin | Napkin Hire | CaterHire.ie Dublin | Caterhire",
      meta_description:
        "Discover premium table linen and napkins for hire, perfect for any event. Wide range of colours and styles available with convenient nationwide delivery.",
    },
    {
      id: 1582,
      page_title:
        "Spandex Dark Blue Pod Table Cover Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our spandex dark blue pod table cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1583,
      page_title:
        "Spandex Lavender Pod Table Cover Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our spandex lavender pod table cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1584,
      page_title:
        "Spandex Orange Pod Table Cover Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our spandex orange pod table cover for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1585,
      page_title:
        "Spandex Dark Blue Pod Table Topper Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our spandex dark blue pod table topper for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1586,
      page_title:
        "Sheer Organza Satin Edge Overlay - Apple Green - 60in x 60in Hire | Linen Hire Dublin | Caterhire",
      meta_description:
        "Hire our sheer organza satin edge overlay - apple green - 60in x 60in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1587,
      page_title:
        "Linen Table Skirting - Burgundy - 21ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table skirting - burgundy - 21ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1588,
      page_title:
        "Linen Table Skirting - Ivory 21ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table skirting - ivory 21ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1589,
      page_title:
        "Spandex Round Table Cover White - 5ft/ 6ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our spandex round table cover white - 5ft/ 6ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1590,
      page_title:
        "Table Protector Round 5.5ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table protector round 5.5ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1591,
      page_title:
        "Table Protector Round 6ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table protector round 6ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1592,
      page_title:
        "Table Protector Rectangular 8ft x 4ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our table protector rectangular 8ft x 4ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1593,
      page_title:
        "Tableware Wedding Package for 100 Guests Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Luxurious Tableware Wedding Package for 100 guests with gold rim plates, Victoria gold cutlery, and glassware. We delivery, collect and do the washing up!",
    },
    {
      id: 1594,
      page_title:
        "Wedding Furniture Package for 100 Guests Hire | Wedding Furniture Package for 100 Guests for Hire | Wedding Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our wedding furniture package for 100 guests for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1595,
      page_title:
        "Villeroy & Boch Pasta Plate 29cm (Case Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our villeroy & boch pasta plate 29cm (case size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1596,
      page_title:
        "Villeroy & Boch Wide Rim Pasta Plate 28cm (Case Size 10) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our villeroy & boch wide rim pasta plate 28cm (case size 10) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1597,
      page_title:
        "Mini Dish Cup & Saucer (Pack Size 1) Hire | Mini Dish Cup & Saucer | Mini Dishes | CaterHire.ie Dublin | Caterhire",
      meta_description:
        "Hire our mini dish cup & saucer (pack size 1) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1598,
      page_title:
        "Pod Table Walnut Square Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our pod table walnut square for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1599,
      page_title:
        "White Round Dining Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our white round dining table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1600,
      page_title:
        "White Square Dining Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our white square dining table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1601,
      page_title:
        "Smartie Bench White (5 seater) Hire | Furniture Hire Dublin | Caterhire",
      meta_description:
        "Hire our smartie bench white (5 seater) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1602,
      page_title:
        "Oval Stainless Steel Bread Basket Hire | Oval S/Steel Bread Basket|Buffetware & Table Service Hire Dublin | Caterhire",
      meta_description:
        "Hire our oval stainless steel bread basket for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1603,
      page_title:
        "Carafe 1litre Hire | Carafe 1 Litre | Water Jugs & Carafes for hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our carafe 1litre for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1604,
      page_title:
        "Catering Trolley Hire | Catering Trolley | Food Prep & Service Hire | CaterHire Dublin Dublin | Caterhire",
      meta_description:
        "Hire our catering trolley for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1605,
      page_title:
        "Milano Chair with Lecture Arm Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our milano chair with lecture arm for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1606,
      page_title:
        "Organza Chair Tie / Table Runner Pink Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our organza chair tie / table runner pink for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1607,
      page_title:
        "Chargrill - on stand (Gas) Hire | Gas Chargrill on Stand | Cooking & Warming Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our chargrill - on stand (gas) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1608,
      page_title:
        "Chopping Board - Green (Small) Hire | Small Green Chopping Board |Buffetware & Table Service Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our chopping board - green (small) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1609,
      page_title:
        "Chopping Board - Red (Small) Hire | Small Red Chopping Board | Buffetware & Table Service Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our chopping board - red (small) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1610,
      page_title:
        "Chopping Board - White (Small) Hire | Small White Chopping Board|Buffetware & Table Service Hire Dublin | Caterhire",
      meta_description:
        "Hire our chopping board - white (small) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1611,
      page_title:
        "Cocktail Muddler - Soft wood Hire | Cocktail Mudler - Softwood | Bar Accessories | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our cocktail muddler - soft wood for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1612,
      page_title:
        "Giant Blue & White Deckchair Hire | Giant Deckchair for hire | Outdoor Chair Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our giant blue & white deckchair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1613,
      page_title:
        "Exam Desk 2ft x 18in Hire | Exam Desk 2ft x 18in | Exam Table Hire | CaterHire Dublin Dublin | Caterhire",
      meta_description:
        "Hire our exam desk 2ft x 18in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1614,
      page_title:
        "Large Frying Pan Hire | Large Frying Pan | Buffetware & Table Service Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our large frying pan for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1615,
      page_title:
        "LATTE GLASS 9oz (Case Size Single) Hire | Latte Glass 9oz | Glssware hire | CaterHire Dublin Dublin | Caterhire",
      meta_description:
        "Hire our latte glass 9oz (case size single) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1616,
      page_title:
        "Blue Round Tablecloth 120in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our blue round tablecloth 120in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1617,
      page_title:
        "Red Round Tablecloth 90in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our red round tablecloth 90in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1618,
      page_title:
        "Martini Glass 5oz (Case Size 16) Hire | Tableware for Events Dublin | Caterhire",
      meta_description:
        "Hire our martini glass 5oz (case size 16) for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1619,
      page_title:
        "Black Cotton Napkin Hire | Black Cotton Napkin| Napkin Hire | CaterHire Dublin Dublin | Caterhire",
      meta_description:
        "Hire our black cotton napkin for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1620,
      page_title:
        "Grey Hemstitched Signature Napkin Hire | Grey Hemstitched Napkin | Napkin Hire | CaterHire Dublin Dublin | Caterhire",
      meta_description:
        "Hire our grey hemstitched signature napkin for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1621,
      page_title:
        "Office Cabinet 2 Door Hire | Office Cabinet 2 Door | Office Furniture Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our office cabinet 2 door for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1622,
      page_title:
        "Low Office Pedestal Hire | Low Office Pedestal | Office Furniture Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our low office pedestal for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1623,
      page_title:
        "Office Waste Bin Hire | Office Waste Bin | Office Furniture Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our office waste bin for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1624,
      page_title:
        "Clear Tabletop Raffle Drum Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our clear tabletop raffle drum for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1625,
      page_title:
        "Silver Raffle Drum with stand Hire | Silver Raffle Drum with stand | Prop Hire | CaterHire Dublin | Caterhire",
      meta_description:
        "Hire our silver raffle drum with stand for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1626,
      page_title:
        "Linen Table Skirting Black 21ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table skirting black 21ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1627,
      page_title:
        "Linen Table Skirting Grey 21ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table skirting grey 21ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1628,
      page_title:
        "Linen Table Skirting Purple 21ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table skirting purple 21ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1629,
      page_title:
        "Linen Table Skirting Red 21ft Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our linen table skirting red 21ft for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1630,
      page_title:
        "Rectangle Table 2ft x 30in Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our rectangle table 2ft x 30in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1631,
      page_title:
        "Omega Rectangle Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our omega rectangle table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1632,
      page_title: "Round 8ft Table Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our round 8ft table for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1633,
      page_title:
        "Electric 6 Slice Toaster Hire | Electric 6 Slice Toaster | Cooking & Warming Equipment Hire Dublin | Caterhire",
      meta_description:
        "Hire our electric 6 slice toaster for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1634,
      page_title:
        "Black Leather Tub Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our black leather tub chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1635,
      page_title:
        "White Leather Tub Chair Hire | Event Furniture Dublin | Caterhire",
      meta_description:
        "Hire our white leather tub chair for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
    {
      id: 1636,
      page_title:
        "White Oval Lugged Vegetable Dish 10.5in Hire | White Oval Lugged Vegetable Dish 10.5in | Serving Dishe Hire Dublin | Caterhire",
      meta_description:
        "Hire our white oval lugged vegetable dish 10.5in for your next event or party in Dublin. Fast delivery and collection available. Book online with Caterhire.",
    },
  ];

  try {
    for (let i = 703; i < data.length; i++) {
      const p = data[i];
      console.log(i, data.length);
      try {
        await updateProduct(p.id, {
          meta_description: p.meta_description,
          page_title: p.page_title,
        });
      } catch (err: any) {
        if (
          err.response &&
          err.response.data &&
          err.response.data.status == 404
        ) {
          console.log(err.response.data.title);
          continue;
        }
        throw err;
      }
      await new Promise(async function (resolve) {
        setTimeout(resolve, 1000);
      });
    }
  } catch (err: any) {
    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err);
    }
  }
})();
