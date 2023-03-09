require("../../config/config").config("ch");
const { updateCategory } = require("../../functions/categories/updateCategory");
const data = [
  {
    id: 167,
    storeName: "Caterhire",
    type: "category",
    name: "Miscellaneous",
    page_title:
      "Check out our miscellaneous collection for more event hire options.",
    meta_description:
      "From table service to outdoor furniture, we have everything you need for your event. Check out our miscellaneous collection for more event hire options.",
    url: "https://www.caterhire.ie/miscellaneous/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/167/edit",
  },
  {
    id: 253,
    storeName: "Caterhire",
    type: "category",
    name: "New Products",
    page_title: "Discover the Latest New Products for Event Hire in Ireland",
    meta_description:
      "Check out our latest event hire products! We are always updating our inventory with new and exciting items to make your event stand out.",
    url: "https://www.caterhire.ie/products/new-products/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/253/edit",
  },
  {
    id: 269,
    storeName: "Caterhire",
    type: "category",
    name: "Bins & Ashtrays",
    page_title:
      "Keep Your Event Space Clean with Bins & Ashtrays Rentals in Ireland",
    meta_description:
      "Keep your event clean and organized with our bins and ashtrays. Our collection includes various sizes and styles to suit any event.",
    url: "https://www.caterhire.ie/products/outdoor-furniture-bbq/bins-ashtrays/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/269/edit",
  },
  {
    id: 270,
    storeName: "Caterhire",
    type: "category",
    name: "Deck Chairs",
    page_title:
      "Relax in Style with Deck Chairs Rentals for Your Event in Ireland",
    meta_description:
      "Enjoy the sun and relax in style with our deck chairs. Our collection includes various styles and colors to suit any outdoor event.",
    url: "https://www.caterhire.ie/products/outdoor-furniture-bbq-hire/deck-chairs/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/270/edit",
  },
  {
    id: 295,
    storeName: "Caterhire",
    type: "category",
    name: "Shop By Category",
    page_title: "Shop By Category: Find the Perfect Event Rentals in Ireland",
    meta_description:
      "Looking for something specific? Check out our event hire options by category. From lounge furniture to catering equipment, we have it all.",
    url: "https://www.caterhire.ie/shop-by-category/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/295/edit",
  },
  {
    id: 300,
    storeName: "Caterhire",
    type: "category",
    name: "Lounge Furniture Hire",
    page_title:
      "Lounge Furniture Hire: Create a Comfortable Atmosphere for Your Event in Ireland",
    meta_description:
      "Create a cozy and stylish atmosphere with our lounge furniture hire options. Our collection includes sofas, armchairs, ottomans, and more.",
    url: "https://www.caterhire.ie/lounge-furniture-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/300/edit",
  },
  {
    id: 301,
    storeName: "Caterhire",
    type: "category",
    name: "By Collection",
    page_title:
      "By Collection: Find the Best Event Rentals in Ireland for Your Theme",
    meta_description:
      "Make your event stand out with our Club collection. Our Club chairs, tables, and lounge furniture are perfect for a luxurious and chic event.",
    url: "https://www.caterhire.ie/by-collection/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/301/edit",
  },
  {
    id: 302,
    storeName: "Caterhire",
    type: "category",
    name: "Club",
    page_title:
      "Club Armchairs: Add a Touch of Luxury to Your Event in Ireland",
    meta_description:
      "Add a touch of comfort and style to your event with our Club armchairs. Our Club armchair collection includes various colors and styles to suit any event.",
    url: "https://www.caterhire.ie/club/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/302/edit",
  },
  {
    id: 303,
    storeName: "Caterhire",
    type: "category",
    name: "Armchairs",
    page_title:
      "Hire Armchairs: Add a Touch of Luxury to Your Event in Ireland",
    meta_description:
      "Add a touch of comfort and style to your event with our armchairs. Our collection includes various colors and styles to suit any event.",
    url: "https://www.caterhire.ie/armchairs/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/303/edit",
  },
  {
    id: 304,
    storeName: "Caterhire",
    type: "category",
    name: "Weddings Hire",
    page_title:
      "Make Your Wedding Day Special with Wedding Hire Rentals in Ireland",
    meta_description:
      "Make your wedding unforgettable with our event hire options. From chairs to cutlery, we have everything you need to create your dream wedding.",
    url: "https://www.caterhire.ie/weddings-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/304/edit",
  },
  {
    id: 305,
    storeName: "Caterhire",
    type: "category",
    name: "Table Service Hire",
    page_title:
      "Table Service Hire: Ensure a Smooth Dining Experience for Your Event in Ireland",
    meta_description:
      "Impress your guests with our high-quality table service hire options. Our collection includes cutlery, crockery, glassware, and more.",
    url: "https://www.caterhire.ie/table-service-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/305/edit",
  },
  {
    id: 306,
    storeName: "Caterhire",
    type: "category",
    name: "Cake Stands",
    page_title:
      "Display Your Cake in Style with Cake Stands Rentals in Ireland",
    meta_description:
      "Display your desserts in style with our cake stands. Our collection includes various styles and sizes to suit any event.",
    url: "https://www.caterhire.ie/cake-stands/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/306/edit",
  },
  {
    id: 307,
    storeName: "Caterhire",
    type: "category",
    name: "Buffet & Canape Hire",
    page_title:
      "Buffet & Canape Hire: Impress Your Guests with Elegant Displays in Ireland",
    meta_description:
      "Keep your guests satisfied with our buffet and canape hire options. Our collection includes chafing dishes, platters, and more.",
    url: "https://www.caterhire.ie/buffet-canape-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/307/edit",
  },
  {
    id: 308,
    storeName: "Caterhire",
    type: "category",
    name: "Cake & Afternoon Tea stands",
    page_title:
      "Treat Your Guests to a Lovely Afternoon Tea with Cake & Afternoon Tea Stands Rentals in Ireland",
    meta_description:
      "Elevate your dessert table with our cake and afternoon tea stands. Our collection includes various styles and sizes to",
    url: "https://www.caterhire.ie/cake-afternoon-tea-stands/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/308/edit",
  },
  {
    id: 309,
    storeName: "Caterhire",
    type: "category",
    name: "Cutlery Hire",
    page_title:
      "Cutlery Hire: Add a Touch of Elegance to Your Table Setting in Ireland",
    meta_description:
      "Get the best quality cutlery for your event in Ireland. Our range of cutlery is perfect for any occasion. Contact us today!",
    url: "https://www.caterhire.ie/cutlery-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/309/edit",
  },
  {
    id: 310,
    storeName: "Caterhire",
    type: "category",
    name: "Fine Dining",
    page_title:
      "Fine Dining: Elevate Your Event with High-Quality Rentals in Ireland",
    meta_description:
      "Elevate your event with our Fine Dining collection. From Windsor Cutlery to Royal Doulton China, we have everything you need.",
    url: "https://www.caterhire.ie/fine-dining/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/310/edit",
  },
  {
    id: 311,
    storeName: "Caterhire",
    type: "category",
    name: "Windsor Cutlery",
    page_title:
      "Windsor Cutlery: Add a Classic Touch to Your Table Setting in Ireland",
    meta_description:
      "Our Windsor Cutlery range adds a touch of elegance to any event. Get in touch to find out more about our cutlery hire options.",
    url: "https://www.caterhire.ie/windsor-cutlery/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/311/edit",
  },
  {
    id: 312,
    storeName: "Caterhire",
    type: "category",
    name: "Crockery Hire",
    page_title:
      "Crockery Hire: Choose from a Wide Range of Crockery Rentals in Ireland",
    meta_description:
      "Choose from our selection of high-quality crockery for your event. Contact us today to learn more about our hire options.",
    url: "https://www.caterhire.ie/crockery-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/312/edit",
  },
  {
    id: 313,
    storeName: "Caterhire",
    type: "category",
    name: "Elegance Range",
    page_title:
      "Elegance Range: Create a Sophisticated Atmosphere with Rentals in Ireland",
    meta_description:
      "Make your event unforgettable with our Elegance Range. From table linen to Royal Doulton China, we have everything you need.",
    url: "https://www.caterhire.ie/elegance-range/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/313/edit",
  },
  {
    id: 314,
    storeName: "Caterhire",
    type: "category",
    name: "Royal Doulton China",
    page_title:
      "Royal Doulton China: Impress Your Guests with Fine China Rentals in Ireland",
    meta_description:
      "Add a touch of sophistication to your event with our Royal Doulton China. Contact us today to learn more about our hire options.",
    url: "https://www.caterhire.ie/royal-doulton-china/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/314/edit",
  },
  {
    id: 315,
    storeName: "Caterhire",
    type: "category",
    name: "Table Linen Hire",
    page_title:
      "Table Linen Hire: Set the Perfect Table with High-Quality Linen Rentals in Ireland",
    meta_description:
      "Our table linen hire options include a range of styles and colours to suit any event. Contact us today to find out more.",
    url: "https://www.caterhire.ie/table-linen-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/315/edit",
  },
  {
    id: 316,
    storeName: "Caterhire",
    type: "category",
    name: "Spandex Pod Table covers",
    page_title:
      "Spandex Pod Table Covers: Add a Modern Touch to Your Event in Ireland",
    meta_description:
      "Give your event a modern look with our Spandex Pod Table covers. Contact us today to learn more about our hire options.",
    url: "https://www.caterhire.ie/spandex-pod-table-covers/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/316/edit",
  },
  {
    id: 317,
    storeName: "Caterhire",
    type: "category",
    name: "Chair & Stool Hire",
    page_title:
      "Chair & Stool Hire: Choose from a Wide Range of Seating Rentals in Ireland",
    meta_description:
      "Our chair and stool hire options include a range of styles to suit any event. Contact us today to find out more.",
    url: "https://www.caterhire.ie/chair-stool-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/317/edit",
  },
  {
    id: 318,
    storeName: "Caterhire",
    type: "category",
    name: "Bar Stools",
    page_title:
      "Bar Stools: Add a Touch of Class to Your Event with Bar Stool Rentals in Ireland",
    meta_description:
      "Choose from our selection of stylish bar stools for your event. Contact us today to learn more about our hire options.",
    url: "https://www.caterhire.ie/bar-stools/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/318/edit",
  },
  {
    id: 319,
    storeName: "Caterhire",
    type: "category",
    name: "Barware Hire",
    page_title:
      "Barware Hire: Ensure a Smooth Bar Service with High-Quality Rentals in Ireland",
    meta_description:
      "Make sure your bar is fully equipped with our range of barware hire options. Contact us today to find out more.",
    url: "https://www.caterhire.ie/barware-hire-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/319/edit",
  },
  {
    id: 320,
    storeName: "Caterhire",
    type: "category",
    name: "Bar Accessories",
    page_title:
      "Bar Accessories: Choose from a Wide Range of Rentals in Ireland",
    meta_description:
      "From cocktail shakers to ice buckets, we have everything you need for your bar. Contact us today to learn more.",
    url: "https://www.caterhire.ie/bar-accessories/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/320/edit",
  },
  {
    id: 321,
    storeName: "Caterhire",
    type: "category",
    name: "Outdoor Furniture & BBQ Hire",
    page_title:
      "Enjoy the Outdoors with Outdoor Furniture & BBQ Hire in Ireland",
    meta_description:
      "Enjoy the outdoors with our range of outdoor furniture and BBQ hire options. Contact us today to find out more.",
    url: "https://www.caterhire.ie/outdoor-furniture-bbq-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/321/edit",
  },
  {
    id: 322,
    storeName: "Caterhire",
    type: "category",
    name: "Bins & Ashtrays",
    page_title:
      "Keep Your Event Space Clean with Bins & Ashtrays Rentals in Ireland",
    meta_description:
      "Keep your event clean and tidy with our range of bins and ashtrays. Contact us today to find out more about our hire options.",
    url: "https://www.caterhire.ie/bins-ashtrays/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/322/edit",
  },
  {
    id: 323,
    storeName: "Caterhire",
    type: "category",
    name: "Games & Props Hire",
    page_title:
      "Create a Fun and Memorable Experience with Games & Props Hire in Ireland",
    meta_description:
      "Make your event memorable with our selection of games and props. Contact us today to find out more about our hire options.",
    url: "https://www.caterhire.ie/games-props-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/323/edit",
  },
  {
    id: 324,
    storeName: "Caterhire",
    type: "category",
    name: "Games",
    page_title:
      "Games Rentals: Keep Your Guests Entertained at Your Event in Ireland",
    meta_description:
      "Our range of games will keep your guests entertained all night long. Contact us today to find out more about our hire options.",
    url: "https://www.caterhire.ie/games/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/324/edit",
  },
  {
    id: 325,
    storeName: "Caterhire",
    type: "category",
    name: "Games",
    page_title:
      "Games Hire: Keep Your Guests Entertained at Your Event in Ireland",
    meta_description:
      "Hire games which will keep your guests entertained all night long. Contact us today to find out more about our hire options.",
    url: "https://www.caterhire.ie/games-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/325/edit",
  },
  {
    id: 326,
    storeName: "Caterhire",
    type: "category",
    name: "Outdoor Seating",
    page_title:
      "Make Your Event Stand Out with Outdoor Seating Rentals in Ireland",
    meta_description:
      "Relax in style with our range of outdoor seating options. Contact us today to find out more about our hire options.",
    url: "https://www.caterhire.ie/outdoor-seating/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/326/edit",
  },
  {
    id: 327,
    storeName: "Caterhire",
    type: "category",
    name: "Sofas",
    page_title:
      "Sofas Rentals: Create a Comfortable and Stylish Atmosphere in Ireland",
    meta_description:
      "Make your event comfortable and stylish with our range of sofas. Contact us today to find out more about our hire options.",
    url: "https://www.caterhire.ie/sofas/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/327/edit",
  },
  {
    id: 328,
    storeName: "Caterhire",
    type: "category",
    name: "Sorrento",
    page_title:
      "Sorrento Furniture Rentals: Add a Touch of Elegance to Your Event in Ireland",
    meta_description:
      "Our Sorrento range is perfect for creating a relaxed atmosphere at your event. Contact us today to learn more about our options.",
    url: "https://www.caterhire.ie/sorrento/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/328/edit",
  },
  {
    id: 329,
    storeName: "Caterhire",
    type: "category",
    name: "Funky",
    page_title:
      "Funky Furniture Rentals: Add a Fun and Unique Element to Your Event in Ireland",
    meta_description:
      "Add some fun to your event with our range of funky furniture. Contact us today to find out more about our hire options.",
    url: "https://www.caterhire.ie/funky/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/329/edit",
  },
  {
    id: 330,
    storeName: "Caterhire",
    type: "category",
    name: "Table Hire",
    page_title:
      "Table Hire: Find the Perfect Table Rentals for Your Event in Ireland",
    meta_description:
      "Choose from our selection of tables for your event. Contact us today to learn more about our hire options.",
    url: "https://www.caterhire.ie/table-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/330/edit",
  },
  {
    id: 331,
    storeName: "Caterhire",
    type: "category",
    name: "Coffee Tables",
    page_title:
      "Coffee Tables Rentals: Add a Stylish Touch to Your Event in Ireland",
    meta_description:
      "Hire our coffee tables. Perfect for creating a stylish and comfortable atmosphere at your event. Contact us to find out more.",
    url: "https://www.caterhire.ie/coffee-tables/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/331/edit",
  },
  {
    id: 332,
    storeName: "Caterhire",
    type: "category",
    name: "Coffee Tables",
    page_title:
      "Hire Coffee Tables: Add a Stylish Touch to Your Event in Ireland",
    meta_description:
      "Our coffee tables are perfect for creating a stylish and comfortable atmosphere at your event. Contact us to find out more.",
    url: "https://www.caterhire.ie/coffee-tables-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/332/edit",
  },
  {
    id: 333,
    storeName: "Caterhire",
    type: "category",
    name: "Classic",
    page_title:
      "Classic Table Rentals: Create a Timeless Atmosphere for Your Event in Ireland",
    meta_description:
      "Create a classic look for your event with our range of furniture hire options. Contact us today to find",
    url: "https://www.caterhire.ie/classic/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/333/edit",
  },
  {
    id: 334,
    storeName: "Caterhire",
    type: "category",
    name: "Vintage & Shabby Chic",
    page_title:
      "Vintage & Shabby Chic: Add Rustic Charm to Your Event with Table Rentals in Ireland",
    meta_description:
      "Add a touch of vintage charm to your event with our range of vintage and shabby chic furniture and decor rentals. From tables to seating, we have everything you need to create a unique and stylish ambiance.",
    url: "https://www.caterhire.ie/vintage-shabby-chic/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/334/edit",
  },
  {
    id: 335,
    storeName: "Caterhire",
    type: "category",
    name: "Vintage & Shabby Chic tables",
    page_title:
      "Vintage & Shabby Chic Table Rentals: Create a Cozy Atmosphere for Your Event in Ireland",
    meta_description:
      "Our vintage and shabby chic tables are perfect for creating a rustic and charming atmosphere at your event. Available in a range of sizes and styles, our tables will add a touch of character and elegance to your event.",
    url: "https://www.caterhire.ie/vintage-shabby-chic-tables/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/335/edit",
  },
  {
    id: 336,
    storeName: "Caterhire",
    type: "category",
    name: "Disposable Food Holders",
    page_title:
      "Disposable Food Holders: Ensure Convenient Food Service for Your Event in Ireland",
    meta_description:
      "Make your event more convenient and hassle-free with our range of disposable food holders. Perfect for outdoor events or catering, our food holders are both practical and stylish.",
    url: "https://www.caterhire.ie/disposable-food-holders/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/336/edit",
  },
  {
    id: 337,
    storeName: "Caterhire",
    type: "category",
    name: "Outdoor Chairs",
    page_title:
      "Outdoor Chairs Rentals: Choose from a Wide Range of Comfortable Seating in Ireland",
    meta_description:
      "Enjoy the great outdoors in comfort and style with our range of outdoor chairs. Whether you need seating for a garden party, wedding or festival, we have the perfect chairs for your event.",
    url: "https://www.caterhire.ie/outdoor-chairs/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/337/edit",
  },
  {
    id: 338,
    storeName: "Caterhire",
    type: "category",
    name: "Ottomans",
    page_title:
      "Ottomans Rentals: Create a Cozy and Chic Atmosphere in Ireland",
    meta_description:
      "Add a touch of luxury to your event with our range of ottomans. Available in a range of colours and styles, our ottomans are perfect for creating a stylish and comfortable seating area.",
    url: "https://www.caterhire.ie/ottomans/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/338/edit",
  },
  {
    id: 339,
    storeName: "Caterhire",
    type: "category",
    name: "Regency White Crockery",
    page_title:
      "Regency White Crockery: Add a Touch of Elegance to Your Table Setting in Ireland",
    meta_description:
      "Add a touch of elegance to your event with our regency white crockery rentals. Perfect for weddings, corporate events or any special occasion, our crockery will make your table setting look stunning.",
    url: "https://www.caterhire.ie/regency-white-crockery/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/339/edit",
  },
  {
    id: 340,
    storeName: "Caterhire",
    type: "category",
    name: "Speciality Cutlery",
    page_title:
      "Speciality Cutlery: Choose from a Wide Range of High-Quality Rentals in Ireland",
    meta_description:
      "Impress your guests with our range of speciality cutlery rentals. From gold to rose gold, our cutlery will add a touch of sophistication and elegance to your table setting.",
    url: "https://www.caterhire.ie/speciality-cutlery/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/340/edit",
  },
  {
    id: 341,
    storeName: "Caterhire",
    type: "category",
    name: "Catering & Refrigeration Hire",
    page_title:
      "Catering & Refrigeration Hire: Ensure a Smooth and Efficient Service for Your Event in Ireland",
    meta_description:
      "Ensure your food stays fresh and your drinks stay cool with our range of catering and refrigeration rentals. From fridges to hot holding equipment, we have everything you need to keep your food and drinks at the perfect temperature.",
    url: "https://www.caterhire.ie/catering-refrigeration-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/341/edit",
  },
  {
    id: 342,
    storeName: "Caterhire",
    type: "category",
    name: "Cooking Equipment",
    page_title:
      "Cooking Equipment Rentals: Choose from a Wide Range of Appliances in Ireland",
    meta_description:
      "Make cooking for your event a breeze with our range of cooking equipment rentals. From ovens to grills, our equipment is perfect for cooking up a storm for any size event.",
    url: "https://www.caterhire.ie/cooking-equipment/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/342/edit",
  },
  {
    id: 343,
    storeName: "Caterhire",
    type: "category",
    name: "Hot Holding & Serving",
    page_title:
      "Hot Holding & Serving Rentals: Keep Your Food Warm and Ready to Serve in Ireland",
    meta_description:
      "Keep your food hot and ready to serve with our range of hot holding and serving equipment rentals. Perfect for any catering event, our equipment will ensure your food is always at the perfect temperature.",
    url: "https://www.caterhire.ie/hot-holding-serving/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/343/edit",
  },
  {
    id: 344,
    storeName: "Caterhire",
    type: "category",
    name: "Food Preparation",
    page_title:
      "Food Preparation Rentals: Ensure a Smooth and Efficient Service for Your Event in Ireland",
    meta_description:
      "Make food preparation a breeze with our range of food preparation equipment rentals. From slicers to mixers, our equipment will help you prepare your food quickly and efficiently.",
    url: "https://www.caterhire.ie/food-preparation/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/344/edit",
  },
  {
    id: 345,
    storeName: "Caterhire",
    type: "category",
    name: "Chafers - Hidden",
    page_title:
      "Chafers - Hidden: Find the Perfect Rentals for Your Event in Ireland",
    meta_description:
      "Keep your food warm and presentable with our range of hidden chafer rentals. Perfect for buffets or serving large quantities of food, our chafers are a must-have for any catering event.",
    url: "https://www.caterhire.ie/chafers-hidden/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/345/edit",
  },
  {
    id: 346,
    storeName: "Caterhire",
    type: "category",
    name: "Chafers & Accessories",
    page_title:
      "Chafers & Accessories: Create a Stunning Buffet Display in Ireland",
    meta_description:
      "Keep your food warm and stylishly presented with our range of chafer rentals and accessories. From traditional to modern styles, our chafers will add a touch of sophistication to your event.",
    url: "https://www.caterhire.ie/chafers-accessories/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/346/edit",
  },
  {
    id: 347,
    storeName: "Caterhire",
    type: "category",
    name: "White Tablecloths",
    page_title:
      "White Tablecloths: Elevate Your Table Setting with Rentals in Ireland",
    meta_description:
      "Create an elegant and timeless table setting with our range of white tablecloth rentals. Perfect for any occasion, our tablecloths will help you create a beautiful and sophisticated atmosphere.",
    url: "https://www.caterhire.ie/white-tablecloths/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/347/edit",
  },
  {
    id: 348,
    storeName: "Caterhire",
    type: "category",
    name: "Linens & Chair Covers",
    page_title:
      "Linens & Chair Covers: Add a Touch of Elegance to Your Event in Ireland",
    meta_description:
      "Add a touch of luxury and sophistication to your event with our range of linen and chair cover rentals. From classic to modern styles, our linens and chair covers will help you create the perfect ambiance.",
    url: "https://www.caterhire.ie/linens-chair-covers/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/348/edit",
  },
  {
    id: 349,
    storeName: "Caterhire",
    type: "category",
    name: "Kitchen Utensils",
    page_title:
      "Kitchen Utensils: Find Everything You Need for Your Catering in Ireland",
    meta_description:
      "Make food preparation and serving a breeze with our range of kitchen utensil rentals. From serving spoons to ladles, our utensils are a must-have for any catering event.",
    url: "https://www.caterhire.ie/kitchen-utensils/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/349/edit",
  },
  {
    id: 350,
    storeName: "Caterhire",
    type: "category",
    name: "Dancefloor, Staging & Lighting",
    page_title:
      "Dancefloor, Staging & Lighting: Create the Perfect Ambiance for Your Event in Ireland",
    meta_description:
      "Create the perfect party atmosphere with our range of dancefloor, staging and lighting rentals. From disco balls",
    url: "https://www.caterhire.ie/dancefloor-staging-lighting/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/350/edit",
  },
  {
    id: 351,
    storeName: "Caterhire",
    type: "category",
    name: "Miscellaneous",
    page_title:
      "Miscellaneous Rentals: Choose from a Wide Range of Rentals in Ireland",
    meta_description:
      "Discover our range of miscellaneous event equipment available for hire in Ireland. From lighting to linen, we have everything you need to make your event a success.",
    url: "https://www.caterhire.ie/miscellaneous-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/351/edit",
  },
  {
    id: 352,
    storeName: "Caterhire",
    type: "category",
    name: "Everyday Range",
    page_title:
      "Everyday Range: Choose from a Wide Range of High-Quality Rentals in Ireland",
    meta_description:
      "Our everyday range of event equipment for hire in Ireland offers stylish and practical solutions for any occasion. Explore our selection of tables, chairs, and more today.",
    url: "https://www.caterhire.ie/everyday-range-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/352/edit",
  },
  {
    id: 353,
    storeName: "Caterhire",
    type: "category",
    name: "Apollo White Crockery",
    page_title:
      "Apollo White Crockery: Add a Touch of Sophistication to Your Table Setting in Ireland",
    meta_description:
      "Elevate your event with our elegant Apollo White Crockery for hire in Ireland. Our extensive range includes plates, bowls, and more, perfect for any formal occasion.",
    url: "https://www.caterhire.ie/apollo-white-crockery/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/353/edit",
  },
  {
    id: 354,
    storeName: "Caterhire",
    type: "category",
    name: "Barbeques",
    page_title:
      "Barbeques Rentals: Create a Fun and Casual Atmosphere for Your Event in Ireland",
    meta_description:
      "Make your event sizzle with our range of barbeques for hire in Ireland. From gas to charcoal, we have everything you need to cook up a storm. Contact us today to learn more.",
    url: "https://www.caterhire.ie/barbeques/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/354/edit",
  },
  {
    id: 355,
    storeName: "Caterhire",
    type: "category",
    name: "BBQs & Accessories",
    page_title:
      "BBQs & Accessories: Ensure a Successful BBQ with Rentals in Ireland",
    meta_description:
      "Get everything you need for your next barbeque with our BBQs and accessories for hire in Ireland. From grills to utensils, we have it all. Contact us today to learn more.",
    url: "https://www.caterhire.ie/bbqs-accessories-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/355/edit",
  },
  {
    id: 356,
    storeName: "Caterhire",
    type: "category",
    name: "Stock Pots",
    page_title:
      "Stock Pots Rentals: Cook Large Volumes of Food with Ease in Ireland",
    meta_description:
      "Our range of stock pots for hire in Ireland are perfect for cooking up large batches of soups, stews, and more. Contact us today to learn more about our available sizes and styles.",
    url: "https://www.caterhire.ie/stock-pots/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/356/edit",
  },
  {
    id: 357,
    storeName: "Caterhire",
    type: "category",
    name: "Condiment Sets",
    page_title:
      "Condiment Sets: Keep Your Condiments Organized and Easily Accessible in Ireland",
    meta_description:
      "Add the finishing touch to your event with our stylish condiment sets for hire in Ireland. From salt and pepper shakers to oil and vinegar dispensers, we have everything you need.",
    url: "https://www.caterhire.ie/condiment-sets/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/357/edit",
  },
  {
    id: 358,
    storeName: "Caterhire",
    type: "category",
    name: "Serving Dishes",
    page_title: "Serving Dishes Rentals: Display Your Food in Style in Ireland",
    meta_description:
      "Impress your guests with our range of elegant serving dishes for hire in Ireland. From platters to bowls, we have everything you need to serve up in style. Contact us today to learn more.",
    url: "https://www.caterhire.ie/serving-dishes/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/358/edit",
  },
  {
    id: 359,
    storeName: "Caterhire",
    type: "category",
    name: "Cocktail & Pod Tables",
    page_title:
      "Cocktail & Pod Tables: Create a Chic and Trendy Atmosphere for Your Event in Ireland",
    meta_description:
      "Create the perfect atmosphere for your event with our range of cocktail and pod tables for hire in Ireland. Available in a variety of styles and sizes, contact us today to learn more.",
    url: "https://www.caterhire.ie/cocktail-pod-tables/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/359/edit",
  },
  {
    id: 360,
    storeName: "Caterhire",
    type: "category",
    name: "Everyday Range",
    page_title: "Hire From Our Everyday Range",
    meta_description:
      "Hire From Our Everyday Range for your event, wedding or party",
    url: "https://www.caterhire.ie/everyday-range-2/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/360/edit",
  },
  {
    id: 361,
    storeName: "Caterhire",
    type: "category",
    name: "Kings Pattern Cutlery",
    page_title:
      "Kings Pattern Cutlery: Add a Touch of Elegance to Your Table Setting in Ireland",
    meta_description:
      "Add a touch of elegance to your event with our Kings Pattern Cutlery for hire in Ireland. Our range includes everything from forks to knives and spoons. Contact us today to learn more.",
    url: "https://www.caterhire.ie/kings-pattern-cutlery/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/361/edit",
  },
  {
    id: 362,
    storeName: "Caterhire",
    type: "category",
    name: "Buffet Stands & Risers",
    page_title:
      "Buffet Stands & Risers: Create a Stunning Display for Your Buffet in Ireland",
    meta_description:
      "Display your food in style with our range of buffet stands and risers for hire in Ireland. From sleek and modern to rustic and charming, we have everything you need to make your event stand out.",
    url: "https://www.caterhire.ie/buffet-stands-risers/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/362/edit",
  },
  {
    id: 363,
    storeName: "Caterhire",
    type: "category",
    name: "Glassware Hire",
    page_title:
      "Glassware Hire: Choose from a Wide Range of High-Quality Rentals in Ireland",
    meta_description:
      "Elevate your event with our range of glassware for hire in Ireland. From champagne flutes to water glasses, we have everything you need to serve your guests in style. Contact us today to learn more.",
    url: "https://www.caterhire.ie/glassware-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/363/edit",
  },
  {
    id: 364,
    storeName: "Caterhire",
    type: "category",
    name: "Champagne Glasses",
    page_title: "Champagne Glasses Rentals: Raise a Toast in Style in Ireland",
    meta_description:
      "Make your toast unforgettable with our range of champagne glasses for hire in Ireland. Our selection includes classic and contemporary styles, perfect for any occasion. Contact us today to learn more.",
    url: "https://www.caterhire.ie/champagne-glasses/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/364/edit",
  },
  {
    id: 365,
    storeName: "Caterhire",
    type: "category",
    name: "Everyday Wine Glasses",
    page_title:
      "Everyday Wine Glasses Rentals: Find the Perfect Wine Glass Rentals for Your Event in Ireland",
    meta_description:
      "Our everyday wine glasses for hire in Ireland are perfect for any event. With a variety of styles and sizes to choose from, you're sure to find the perfect glass for your occasion. Contact us today to learn more.",
    url: "https://www.caterhire.ie/everyday-wine-glasses/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/365/edit",
  },
  {
    id: 366,
    storeName: "Caterhire",
    type: "category",
    name: "Kids Furniture",
    page_title:
      "Kids Furniture Rentals: Create a Fun and Safe Space for Your Little Guests in Ireland",
    meta_description:
      "Keep the little ones entertained with our range of kids furniture for hire in Ireland. From chairs to tables, we have everything you need to create a kid-friendly space at your event. Contact us today to learn more.",
    url: "https://www.caterhire.ie/kids-furniture/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/366/edit",
  },
  {
    id: 367,
    storeName: "Caterhire",
    type: "category",
    name: "Kids Chairs",
    page_title:
      "Kids Chairs Rentals: Ensure Comfortable Seating for Your Young Guests in Ireland",
    meta_description:
      "Our kids chairs for hire in Ireland are perfect for any event. With a variety of colours and styles to choose from, you're sure to find the perfect chair for your little guests. Contact us today to learn more.",
    url: "https://www.caterhire.ie/kids-chairs/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/367/edit",
  },
  {
    id: 368,
    storeName: "Caterhire",
    type: "category",
    name: "Contemporary",
    page_title:
      "Contemporary Furniture Rentals: Add a Modern and Stylish Element to Your Event in Ireland",
    meta_description:
      "Make a statement with our range of contemporary event furniture for hire in Ireland. From sleek and modern to bold and colourful, we have everything you need to create a stunning event. Contact us today to learn more.",
    url: "https://www.caterhire.ie/contemporary/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/368/edit",
  },
  {
    id: 369,
    storeName: "Caterhire",
    type: "category",
    name: "Lounge 22",
    page_title:
      "Lounge 22 Rentals: Create a Chic and Comfortable Atmosphere for Your Event in Ireland",
    meta_description:
      "Create a chic and stylish atmosphere with our Lounge 22 furniture for hire in Ireland. Our selection includes everything from sofas to coffee tables, perfect for any event. Contact us today to learn more.",
    url: "https://www.caterhire.ie/lounge-22-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/369/edit",
  },
  {
    id: 370,
    storeName: "Caterhire",
    type: "category",
    name: "Kitchen Accessories - Hidden",
    page_title:
      "Rent High-Quality Kitchen Accessories for Your Event in Ireland",
    meta_description:
      "Keep your event running smoothly with our range of hidden kitchen accessories for hire in Ireland. From chafing dishes to warming trays, we have everything you need to keep your food hot and delicious. Contact us today to learn more.",
    url: "https://www.caterhire.ie/kitchen-accessories-hidden/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/370/edit",
  },
  {
    id: 371,
    storeName: "Caterhire",
    type: "category",
    name: "Conference & Event Hire",
    page_title: "Premium Conference & Event Hire Services in Ireland",
    meta_description:
      "Make your event a success with our range of conference and event equipment for hire in Ireland. From projectors to sound systems, we have everything you need to make your event run smoothly. Contact us today to learn more.",
    url: "https://www.caterhire.ie/conference-event-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/371/edit",
  },
  {
    id: 372,
    storeName: "Caterhire",
    type: "category",
    name: "Event Accessories",
    page_title: "Rent Event Accessories to Make Your Irish Event Stand Out",
    meta_description:
      "Add the finishing touches to your event with our range of event accessories for hire in Ireland. From tablecloths to centrepieces, we have everything you need to make your event truly memorable. Contact us today to learn more.",
    url: "https://www.caterhire.ie/event-accessories/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/372/edit",
  },
  {
    id: 373,
    storeName: "Caterhire",
    type: "category",
    name: "Beverage Service Hire",
    page_title: "Beverage Service Hire for Your Event in Ireland",
    meta_description:
      "Keep your guests refreshed with our range of beverage service equipment for hire in Ireland. From coffee pots to water dispensers, we have everything you need to serve your drinks in style. Contact us today to learn more.",
    url: "https://www.caterhire.ie/beverage-service-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/373/edit",
  },
  {
    id: 374,
    storeName: "Caterhire",
    type: "category",
    name: "Coffee & Tea Pots",
    page_title: "Coffee & Tea Pots for Hire in Ireland",
    meta_description:
      "Serve up the perfect cup of coffee or tea with our range of pots for hire in Ireland. From classic to contemporary styles, we have everything you need to keep your guests caffeinated. Contact us today to learn more.",
    url: "https://www.caterhire.ie/coffee-tea-pots/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/374/edit",
  },
  {
    id: 375,
    storeName: "Caterhire",
    type: "category",
    name: "Arthur Price Silver",
    page_title: "Arthur Price Silverware for Rent in Ireland",
    meta_description:
      "Add a touch of sophistication to your event with our range of Arthur Price Silver for hire in Ireland. Our selection includes everything from cutlery to serving dishes, perfect for any occasion. Contact us today to learn more.",
    url: "https://www.caterhire.ie/arthur-price-silver/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/375/edit",
  },
  {
    id: 376,
    storeName: "Caterhire",
    type: "category",
    name: "Round Coloured Tablecloths",
    page_title: "Add a Pop of Colour with Round Coloured Tablecloths",
    meta_description:
      "Add a pop of colour to your event with our range of round coloured tablecloths for hire in Ireland. Our selection includes a variety of shades and sizes, perfect for any occasion. Contact us today to learn more.",
    url: "https://www.caterhire.ie/round-coloured-tablecloths/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/376/edit",
  },
  {
    id: 377,
    storeName: "Caterhire",
    type: "category",
    name: "Gas Ovens & Cookers",
    page_title: "Rent Gas Ovens & Cookers for Your Event in Ireland",
    meta_description:
      "Keep your food hot and delicious with our range of gas ovens and cookers for hire in Ireland. From small to large, we have everything you need to cater for your guests. Contact us today to learn more.",
    url: "https://www.caterhire.ie/gas-ovens-cookers/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/377/edit",
  },
  {
    id: 378,
    storeName: "Caterhire",
    type: "category",
    name: "Speciality Glasses",
    page_title: "Speciality Glasses for Hire in Ireland",
    meta_description:
      "Impress your guests with our range of speciality glasses for hire in Ireland. From martini glasses to shot glasses, we have everything you need to serve your drinks in style. Contact us today to learn more.",
    url: "https://www.caterhire.ie/speciality-glasses/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/378/edit",
  },
  {
    id: 379,
    storeName: "Caterhire",
    type: "category",
    name: "Coloured Glassware",
    page_title: "Coloured Glassware for Rent in Ireland",
    meta_description:
      "Elevate your event with our range of coloured glassware for hire in Ireland. From water glasses to champagne flutes, we have everything you need to make your event stand out. Contact us today to learn more.",
    url: "https://www.caterhire.ie/coloured-glassware/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/379/edit",
  },
  {
    id: 380,
    storeName: "Caterhire",
    type: "category",
    name: "Water and Juice Glasses",
    page_title: "Rent Water and Juice Glasses for Your Event in Ireland",
    meta_description:
      "Keep your guests hydrated with our range of water and juice glasses for hire in Ireland. With a variety of styles and sizes to choose from, you're sure to find the perfect glass for your occasion. Contact us today to learn more.",
    url: "https://www.caterhire.ie/water-and-juice-glasses/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/380/edit",
  },
  {
    id: 381,
    storeName: "Caterhire",
    type: "category",
    name: "Starter & Dessert Glasses",
    page_title: "Rent Starter & Dessert Glasses for Your Event in Ireland",
    meta_description:
      "Our starter and dessert glasses for hire in Ireland are perfect for any event. With a variety of styles and sizes to choose from, you're sure to find the perfect glass for your occasion. Contact us today to learn more.",
    url: "https://www.caterhire.ie/starter-dessert-glasses/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/381/edit",
  },
  {
    id: 382,
    storeName: "Caterhire",
    type: "category",
    name: "Rustic Weddings",
    page_title: "Rustic Weddings: Rentals for Your Irish Countryside Wedding",
    meta_description:
      "Create a charming and rustic atmosphere with our range of wedding furniture and decor for hire in Ireland. From tables to chairs, we have everything you need to create your dream wedding. Contact us today to learn more.",
    url: "https://www.caterhire.ie/rustic-weddings/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/382/edit",
  },
  {
    id: 383,
    storeName: "Caterhire",
    type: "category",
    name: "Mini Dishes",
    page_title: "Mini Dishes for Rent in Ireland",
    meta_description:
      "Add a touch of elegance to your event with our range of mini dishes for hire in Ireland. Our selection includes everything from canapes to desserts, perfect for any occasion. Contact us today to learn more.",
    url: "https://www.caterhire.ie/mini-dishes/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/383/edit",
  },
  {
    id: 384,
    storeName: "Caterhire",
    type: "category",
    name: "Speciality & Unique Plates",
    page_title: "Speciality & Unique Plates for Rent in Ireland",
    meta_description:
      "Make your event stand out with our range of speciality and unique plates for hire in Ireland. From vintage to modern styles, we have everything you need to create a stunning table setting. Contact us today to learn more.",
    url: "https://www.caterhire.ie/speciality-unique-plates/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/384/edit",
  },
  {
    id: 385,
    storeName: "Caterhire",
    type: "category",
    name: "Mini Dishes",
    page_title: "Mini Dishes Available for Hire on Caterhire.ie",
    meta_description:
      "A large range of mini dishes are available for Hire on Caterhire.ie",
    url: "https://www.caterhire.ie/mini-dishes-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/385/edit",
  },
  {
    id: 386,
    storeName: "Caterhire",
    type: "category",
    name: "Chair Covers, Bows & Table Runners",
    page_title: "Chair Covers, Bows & Table Runners for Rent in Ireland",
    meta_description:
      "Elevate your event decor with our range of chair covers, bows, and table runners for rent in Ireland. Our selection includes a variety of colours and styles to suit any occasion. Contact us today to learn more.",
    url: "https://www.caterhire.ie/chair-covers-bows-table-runners/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/386/edit",
  },
  {
    id: 387,
    storeName: "Caterhire",
    type: "category",
    name: "Napkins",
    page_title: "Find the Perfect Napkins for Rent in Ireland",
    meta_description:
      "Complete your table setting with our selection of napkins for rent in Ireland. From classic to modern styles, we have everything you need to create a stunning table setting. Contact us today to find the perfect napkins for your event.",
    url: "https://www.caterhire.ie/napkins/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/387/edit",
  },
  {
    id: 388,
    storeName: "Caterhire",
    type: "category",
    name: "Folding Chairs",
    page_title: "Rent Folding Chairs for Your Event in Ireland",
    meta_description:
      "Ensure your guests have comfortable seating with our range of folding chairs for rent in Ireland. Our selection includes a variety of styles and colours to suit any occasion. Contact us today to learn more.",
    url: "https://www.caterhire.ie/folding-chairs/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/388/edit",
  },
  {
    id: 389,
    storeName: "Caterhire",
    type: "category",
    name: "Tumbler & Beer Glasses",
    page_title: "Tumbler & Beer Glasses for Rent in Ireland",
    meta_description:
      "Serve your drinks in style with our range of tumbler and beer glasses for rent in Ireland. Our selection includes a variety of styles and sizes to suit any occasion. Contact us today to learn more.",
    url: "https://www.caterhire.ie/tumbler-beer-glasses/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/389/edit",
  },
  {
    id: 390,
    storeName: "Caterhire",
    type: "category",
    name: "Platters & Trays",
    page_title: "Platters & Trays for Rent in Ireland",
    meta_description:
      "Make serving food a breeze with our range of platters and trays for rent in Ireland. Our selection includes a variety of sizes and styles to suit any occasion. Contact us today to learn more.",
    url: "https://www.caterhire.ie/platters-trays/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/390/edit",
  },
  {
    id: 391,
    storeName: "Caterhire",
    type: "category",
    name: "Unique Plates",
    page_title: "Unique Plates for Rent in Ireland",
    meta_description:
      "Make your table setting stand out with our range of unique plates for rent in Ireland. From vintage to modern styles, we have everything you need to create a stunning table setting. Contact us today to learn more.",
    url: "https://www.caterhire.ie/unique-plates/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/391/edit",
  },
  {
    id: 392,
    storeName: "Caterhire",
    type: "category",
    name: "Rectangular Plates",
    page_title: "Rectangular Plates for Rent in Ireland",
    meta_description:
      "Create a sleek and modern table setting with our range of rectangular plates for rent in Ireland. Our selection includes a variety of sizes and colours to suit any occasion. Contact us today to learn more.",
    url: "https://www.caterhire.ie/rectangular-plates/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/392/edit",
  },
  {
    id: 393,
    storeName: "Caterhire",
    type: "category",
    name: "Cabernet Wine Range",
    page_title: "Cabernet Wine Range for Rent in Ireland",
    meta_description:
      "Serve your wine in style with our range of Cabernet wine glasses and carafes for rent in Ireland. Contact us today to learn more about our selection and how we can help you create a stunning table setting.",
    url: "https://www.caterhire.ie/cabernet-wine-range/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/393/edit",
  },
  {
    id: 394,
    storeName: "Caterhire",
    type: "category",
    name: "Gold Rim Crockery",
    page_title: "Rent Gold Rim Crockery for Your Event in Ireland",
    meta_description:
      "Add a touch of elegance to your table setting with our range of gold rim crockery for rent in Ireland. Our selection includes a variety of styles and sizes to suit any occasion. Contact us today to learn more.",
    url: "https://www.caterhire.ie/gold-rim-crockery/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/394/edit",
  },
  {
    id: 395,
    storeName: "Caterhire",
    type: "category",
    name: "Gastro Pans & Roasting Trays",
    page_title: "Gastro Pans & Roasting Trays - Event Hire Ireland",
    meta_description:
      "Cook and serve your food with ease using our range of gastro pans and roasting trays for hire in Ireland. Contact us today to learn more about our selection and how we can help you cater for your guests.",
    url: "https://www.caterhire.ie/gastro-pans-roasting-trays/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/395/edit",
  },
  {
    id: 396,
    storeName: "Caterhire",
    type: "category",
    name: "Serving & Display Trays",
    page_title: "Serving & Display Trays - Event Equipment Hire",
    meta_description:
      "Showcase your food and drinks in style with our range of serving and display trays for hire in Ireland. Contact us today to learn more about our selection and how we can help you create a stunning display for your event.",
    url: "https://www.caterhire.ie/serving-display-trays/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/396/edit",
  },
  {
    id: 397,
    storeName: "Caterhire",
    type: "category",
    name: "Gazebos and Parasols",
    page_title: "Gazebos and Parasols Rental - Event Hire in Ireland",
    meta_description:
      "Create a comfortable outdoor space for your guests with our range of gazebos and parasols for rent in Ireland. Contact us today to learn more about our selection and how we can help you create the perfect outdoor event.",
    url: "https://www.caterhire.ie/gazebos-and-parasols/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/397/edit",
  },
  {
    id: 398,
    storeName: "Caterhire",
    type: "category",
    name: "Linen For Sale",
    page_title: "Linen For Sale - High Quality Event Linen Rental",
    meta_description:
      "Elevate your table setting with our high-quality event linen for sale in Ireland. Our selection includes a variety of colours and sizes to suit any occasion. Contact us today to learn more about our selection.",
    url: "https://www.caterhire.ie/linen-for-sale/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/398/edit",
  },
  {
    id: 399,
    storeName: "Caterhire",
    type: "category",
    name: "Banquet & Dining Tables",
    page_title: "Banquet & Dining Tables - Event Furniture Hire",
    meta_description:
      "Rent high-quality banquet and dining tables for your event in Ireland. Our selection of event furniture hire includes various styles and sizes to fit your needs.",
    url: "https://www.caterhire.ie/banquet-dining-tables/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/399/edit",
  },
  {
    id: 400,
    storeName: "Caterhire",
    type: "category",
    name: "Water Boilers & Coffee Machines",
    page_title: "Water Boilers & Coffee Machines - Beverage Equipment",
    meta_description:
      "Keep your guests refreshed and energized with our water boilers and coffee machines for rent in Ireland. Our beverage equipment is perfect for events of all sizes.",
    url: "https://www.caterhire.ie/water-boilers-coffee-machines/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/400/edit",
  },
  {
    id: 401,
    storeName: "Caterhire",
    type: "category",
    name: "Illuminated Furniture Hire",
    page_title: "Illuminated Furniture Hire - LED Furniture Rental",
    meta_description:
      "Add a unique touch to your event with our LED furniture rental in Ireland. Our illuminated furniture hire includes seating, tables, and bars that will create a stunning ambiance for your guests.",
    url: "https://www.caterhire.ie/illuminated-furniture-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/401/edit",
  },
  {
    id: 402,
    storeName: "Caterhire",
    type: "category",
    name: "Illuminated Seating",
    page_title: "Illuminated Seating Hire - LED Seating for Events",
    meta_description:
      "Make your event stand out with our LED seating for hire in Ireland. Our illuminated seating options will create a stylish and contemporary look for your event.",
    url: "https://www.caterhire.ie/illuminated-seating/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/402/edit",
  },
  {
    id: 403,
    storeName: "Caterhire",
    type: "category",
    name: "Illuminated Tables",
    page_title: "Illuminated Tables Hire - LED Table Hire for Events",
    meta_description:
      "Add a touch of glamour to your event with our LED table hire in Ireland. Our illuminated tables will provide a unique and eye-catching feature for your event.",
    url: "https://www.caterhire.ie/illuminated-tables/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/403/edit",
  },
  {
    id: 404,
    storeName: "Caterhire",
    type: "category",
    name: "Illuminated Bars & Display",
    page_title: "Illuminated Bars & Display - LED Bar Rental",
    meta_description:
      "Impress your guests with our LED bar rental in Ireland. Our illuminated bars and displays will add a stylish and modern touch to your event.",
    url: "https://www.caterhire.ie/illuminated-bars-display/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/404/edit",
  },
  {
    id: 405,
    storeName: "Caterhire",
    type: "category",
    name: "Fine Dining",
    page_title: "Fine Dining - Luxury Tableware & Glassware Hire",
    meta_description:
      "Elevate your event with our luxury tableware and glassware for hire in Ireland. Our fine dining range includes beautiful and elegant pieces to create a sophisticated atmosphere.",
    url: "https://www.caterhire.ie/fine-dining-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/405/edit",
  },
  {
    id: 406,
    storeName: "Caterhire",
    type: "category",
    name: "Wedgwood Fine Bone China",
    page_title: "Wedgwood Fine Bone China - Luxury China Rental",
    meta_description:
      "Impress your guests with our luxury china rental in Ireland. Our Wedgwood fine bone china range is perfect for high-end events and will add a touch of class to your occasion.",
    url: "https://www.caterhire.ie/wedgwood-fine-bone-china/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/406/edit",
  },
  {
    id: 407,
    storeName: "Caterhire",
    type: "category",
    name: "Charger Plates",
    page_title: "Charger Plates - Event Tableware Hire",
    meta_description:
      "Add a stylish touch to your table setting with our charger plates for hire in Ireland. Our selection of event tableware includes various styles and colors to fit your theme.",
    url: "https://www.caterhire.ie/charger-plates-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/407/edit",
  },
  {
    id: 408,
    storeName: "Caterhire",
    type: "category",
    name: "Serving Bowls & Dishes",
    page_title: "Serving Bowls & Dishes - Event Serveware Hire",
    meta_description:
      "Serve your guests in style with our event serveware hire in Ireland. Our selection of serving bowls and dishes will provide a practical yet stylish solution for your catering needs.",
    url: "https://www.caterhire.ie/serving-bowls-dishes/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/408/edit",
  },
  {
    id: 409,
    storeName: "Caterhire",
    type: "category",
    name: "Hygiene & Wash ware",
    page_title: "Hygiene & Wash ware - Sanitary Facilities for Events",
    meta_description:
      "Keep your event clean and hygienic with our sanitary facilities for hire in Ireland. Our hygiene and wash ware options include toilets, handwashing stations, and waste management solutions.",
    url: "https://www.caterhire.ie/hygiene-wash-ware/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/409/edit",
  },
  {
    id: 410,
    storeName: "Caterhire",
    type: "category",
    name: "Refuse Bins",
    page_title: "Refuse Bins - Event Waste Management Solutions",
    meta_description:
      "Keep your event tidy and organized with our event waste management solutions in Ireland. Our refuse bins and recycling options will ensure that your event is environmentally friendly.",
    url: "https://www.caterhire.ie/refuse-bins/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/410/edit",
  },
  {
    id: 411,
    storeName: "Caterhire",
    type: "category",
    name: "Victoria Gold Cutlery",
    page_title: "Victoria Gold Cutlery - Gold Cutlery Rental",
    meta_description:
      "Add a touch of luxury to your event with our gold cutlery rental in Ireland. Our Victoria range of gold cutlery will create a stunning and elegant atmosphere for your guests.",
    url: "https://www.caterhire.ie/victoria-gold-cutlery/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/411/edit",
  },
  {
    id: 412,
    storeName: "Caterhire",
    type: "category",
    name: "Fine Dining Wine Range",
    page_title: "Fine Dining Wine Range - Event Wine Glass Hire",
    meta_description:
      "Choose from our selection of event wine glass hire options in Ireland. Our fine dining wine range includes various styles and sizes to enhance the flavor and aroma of your wine.",
    url: "https://www.caterhire.ie/fine-dining-wine-range/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/412/edit",
  },
  {
    id: 413,
    storeName: "Caterhire",
    type: "category",
    name: "Diva Wine Glasses",
    page_title: "Diva Wine Glasses - Wine Glass Hire for Events",
    meta_description:
      "Impress your guests with our wine glass hire options in Ireland. Our Diva wine glasses are a stylish and elegant choice for any event.",
    url: "https://www.caterhire.ie/diva-wine-glasses/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/413/edit",
  },
  {
    id: 414,
    storeName: "Caterhire",
    type: "category",
    name: "John Rocha Glasses",
    page_title: "John Rocha Glasses - Luxury Glassware Rental",
    meta_description:
      "Choose from our luxury glassware rental options in Ireland. Our John Rocha range includes unique and contemporary pieces that will add a touch of sophistication to your event.",
    url: "https://www.caterhire.ie/john-rocha-glasses/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/414/edit",
  },
  {
    id: 415,
    storeName: "Caterhire",
    type: "category",
    name: "Bean Bags",
    page_title: "Bean Bags Hire - Comfortable Seating for Events",
    meta_description:
      "Create a relaxed and casual atmosphere with our bean bag hire options in Ireland. Our comfortable seating options are perfect for a variety of events.",
    url: "https://www.caterhire.ie/bean-bags/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/415/edit",
  },
  {
    id: 416,
    storeName: "Caterhire",
    type: "category",
    name: "Bar Counters",
    page_title: "Bar Counters - Event Bar Rental",
    meta_description:
      "Rent a stylish bar counter for your next event in Ireland. Our bar rentals are perfect for weddings, corporate events, and parties.",
    url: "https://www.caterhire.ie/bar-counters/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/416/edit",
  },
  {
    id: 417,
    storeName: "Caterhire",
    type: "category",
    name: "Table Top Decor and Silverware",
    page_title: "Table Top Decor and Silverware - Event Table Styling",
    meta_description:
      "Elevate your event with our table styling decor and silverware rentals. From modern to classic, we have everything you need.",
    url: "https://www.caterhire.ie/table-top-decor-and-silverware/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/417/edit",
  },
  {
    id: 418,
    storeName: "Caterhire",
    type: "category",
    name: "Black Plates & Bowls",
    page_title: "Black Plates & Bowls - Event Crockery Hire",
    meta_description:
      "Impress your guests with our black plate and bowl rentals. Perfect for any event in Ireland, our crockery hire is sure to impress.",
    url: "https://www.caterhire.ie/black-plates-bowls/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/418/edit",
  },
  {
    id: 419,
    storeName: "Caterhire",
    type: "category",
    name: "Skirting & Conference Cloths",
    page_title: "Skirting & Conference Cloths - Tablecloth Hire",
    meta_description:
      "Rent high-quality tablecloths and skirting for your conference or event in Ireland. Our cloths are available in a variety of colors.",
    url: "https://www.caterhire.ie/skirting-conference-cloths/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/419/edit",
  },
  {
    id: 420,
    storeName: "Caterhire",
    type: "category",
    name: "Elegance Range",
    page_title: "Elegant Event Hire Ireland - Elegance Range",
    meta_description:
      "Add a touch of elegance to your event with our exclusive Elegance Range. From furniture to decor, our rentals are sure to impress.",
    url: "https://www.caterhire.ie/elegance-range-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/420/edit",
  },
  {
    id: 421,
    storeName: "Caterhire",
    type: "category",
    name: "Festival",
    page_title: "Festival Event Hire Ireland - Festive Party Rentals",
    meta_description:
      "Make your festival or party stand out with our festive party rentals. From lighting to seating, we have everything you need for your event.",
    url: "https://www.caterhire.ie/festival/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/421/edit",
  },
  {
    id: 422,
    storeName: "Caterhire",
    type: "category",
    name: "Centrepieces & Table Stands",
    page_title: "Event Hire Ireland - Centrepieces & Table Stands",
    meta_description:
      "Enhance your table settings with our centrepieces and table stands. Rent our event decor in Ireland and add a touch of elegance to any event.",
    url: "https://www.caterhire.ie/centrepieces-table-stands/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/422/edit",
  },
  {
    id: 423,
    storeName: "Caterhire",
    type: "category",
    name: "Ascot Cutlery",
    page_title: "Event Cutlery Hire Ireland - Ascot Collection",
    meta_description:
      "Impress your guests with our Ascot Collection cutlery rentals. Rent our high-quality cutlery for your event in Ireland.",
    url: "https://www.caterhire.ie/ascot-cutlery/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/423/edit",
  },
  {
    id: 424,
    storeName: "Caterhire",
    type: "category",
    name: "Jasper Conran White Collection",
    page_title:
      "Jasper Conran White Collection - Fine Bone China Hire in Ireland",
    meta_description:
      "Rent our Jasper Conran White Collection fine bone china for your next event in Ireland. Add a touch of luxury to your table setting.",
    url: "https://www.caterhire.ie/jasper-conran-white-collection/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/424/edit",
  },
  {
    id: 425,
    storeName: "Caterhire",
    type: "category",
    name: "Furniture",
    page_title: "Event Furniture Hire in Ireland - Party Rentals",
    meta_description:
      "Create the perfect event with our high-quality furniture rentals. From chairs to tables, we have everything you need for your event.",
    url: "https://www.caterhire.ie/furniture/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/425/edit",
  },
  {
    id: 426,
    storeName: "Caterhire",
    type: "category",
    name: "Banquet & Dining Chairs",
    page_title: "Banquet & Dining Chairs for Hire in Ireland",
    meta_description:
      "Rent our banquet and dining chairs for your event in Ireland. Our chairs are comfortable and stylish, perfect for any event.",
    url: "https://www.caterhire.ie/banquet-dining-chairs/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/426/edit",
  },
  {
    id: 427,
    storeName: "Caterhire",
    type: "category",
    name: "Conference/Office Chairs",
    page_title: "Conference & Office Chair Hire in Ireland",
    meta_description:
      "Need chairs for your conference or office event? Rent our comfortable and stylish chairs in Ireland.",
    url: "https://www.caterhire.ie/conference-office-chairs/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/427/edit",
  },
  {
    id: 428,
    storeName: "Caterhire",
    type: "category",
    name: "Vintage Crockery",
    page_title: "Vintage Crockery Hire in Ireland for Weddings & Events",
    meta_description:
      "Add a touch of vintage charm to your event with our crockery rentals. Rent our vintage crockery for your wedding or event in Ireland.",
    url: "https://www.caterhire.ie/vintage-crockery/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/428/edit",
  },
  {
    id: 429,
    storeName: "Caterhire",
    type: "category",
    name: "Vintage Tableware",
    page_title: "Vintage Tableware Hire in Ireland - Fine China & Glassware",
    meta_description:
      "Rent our vintage fine china and glassware for your event in Ireland. Our tableware rentals are perfect for any vintage-themed event.",
    url: "https://www.caterhire.ie/vintage-tableware/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/429/edit",
  },
  {
    id: 430,
    storeName: "Caterhire",
    type: "category",
    name: "Lux Furniture",
    page_title: "Luxury Event Furniture Hire in Ireland - Party Rentals",
    meta_description:
      "Rent our luxury event furniture for your next event in Ireland. From sofas to chairs, our party rentals will add a touch of luxury to any event.",
    url: "https://www.caterhire.ie/lux-furniture/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/430/edit",
  },
  {
    id: 431,
    storeName: "Caterhire",
    type: "category",
    name: "Silver Rim Crockery",
    page_title: "Event Crockery Hire in Ireland - Silver Rim Collection",
    meta_description:
      "Rent our Silver Rim Collection crockery for your event in Ireland. Our crockery rentals are sure to impress your guests.",
    url: "https://www.caterhire.ie/silver-rim-crockery/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/431/edit",
  },
  {
    id: 432,
    storeName: "Caterhire",
    type: "category",
    name: "Hand Sanitisers",
    page_title: "Hand Sanitiser Stations for Hire in Ireland",
    meta_description:
      "Keep your guests safe and healthy with our hand sanitiser stations. Rent our stations for your event in Ireland.",
    url: "https://www.caterhire.ie/hand-sanitisers/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/432/edit",
  },
  {
    id: 433,
    storeName: "Caterhire",
    type: "category",
    name: "Jasper Conran Chinoiserie Wedgwood",
    page_title:
      "Jasper Conran Chinoiserie Wedgwood Collection - Fine Bone China Hire in Ireland",
    meta_description:
      "Rent our Jasper Conran Chinoiserie Wedgwood Collection fine bone china for your event in Ireland. Add a touch of luxury to your table setting.",
    url: "https://www.caterhire.ie/jasper-conran-chinoiserie-wedgwood/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/433/edit",
  },
  {
    id: 434,
    storeName: "Caterhire",
    type: "category",
    name: "Stoneware & Slate Plates",
    page_title:
      "Stoneware & Slate Plate Hire in Ireland - Rustic Event Rentals",
    meta_description:
      "Add a touch of rustic charm to your event with our stoneware and slate plate hire options. Perfect for weddings, parties, and more. Contact us today to make a booking.",
    url: "https://www.caterhire.ie/stoneware-slate-plates/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/434/edit",
  },
  {
    id: 435,
    storeName: "Caterhire",
    type: "category",
    name: "Benches",
    page_title: "Bench Hire in Ireland - Party and Wedding Rentals",
    meta_description:
      "Looking for seating solutions for your event? Our bench hire options are perfect for weddings, parties, and more. Contact us today to find out more about our party and wedding rentals.",
    url: "https://www.caterhire.ie/benches/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/435/edit",
  },
  {
    id: 436,
    storeName: "Caterhire",
    type: "category",
    name: "Water Jugs & Carafes",
    page_title:
      "Water Jug & Carafe Hire in Ireland - Glass & Crystal Collection",
    meta_description:
      "Keep your guests refreshed with our water jug and carafe hire options. Choose from our glass and crystal collection to add an elegant touch to your event. Contact us today to make a booking.",
    url: "https://www.caterhire.ie/water-jugs-carafes/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/436/edit",
  },
  {
    id: 437,
    storeName: "Caterhire",
    type: "category",
    name: "Wedding Furniture",
    page_title: "Wedding Furniture Hire in Ireland - Party Rentals",
    meta_description:
      "Make your big day unforgettable with our wedding furniture hire options. From chairs to tables, we have everything you need to create the perfect atmosphere. Contact us today to find out more about our party rentals.",
    url: "https://www.caterhire.ie/wedding-furniture/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/437/edit",
  },
  {
    id: 438,
    storeName: "Caterhire",
    type: "category",
    name: "Seasonal Offers",
    page_title: "Seasonal Event Hire Deals in Ireland",
    meta_description:
      "Looking for great deals on event hire? Check out our seasonal event hire deals in Ireland. From furniture to equipment, we have everything you need to make your event a success. Contact us today to find out more.",
    url: "https://www.caterhire.ie/seasonal-offers-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/438/edit",
  },
  {
    id: 440,
    storeName: "Caterhire",
    type: "category",
    name: "Wedding Chairs",
    page_title:
      "Wedding Chair Hire in Ireland - Chiavari, Folding & Ghost Chairs",
    meta_description:
      "Add elegance to your wedding with our chair hire options. Choose from Chiavari, folding, and ghost chairs to suit your style. Contact us today to make a booking.",
    url: "https://www.caterhire.ie/wedding-chairs/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/440/edit",
  },
  {
    id: 441,
    storeName: "Caterhire",
    type: "category",
    name: "Chair Offers",
    page_title: "Chair Hire Deals in Ireland - Party & Wedding Rentals",
    meta_description:
      "Looking for affordable chair hire options? Check out our chair hire deals in Ireland. From parties to weddings, we have everything you need to make your event a success. Contact us today to find out more about our party and wedding rentals.",
    url: "https://www.caterhire.ie/chair-offers-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/441/edit",
  },
  {
    id: 442,
    storeName: "Caterhire",
    type: "category",
    name: "Price Reductions",
    page_title: "Event Hire Discounts in Ireland - Limited Time Offer",
    meta_description:
      "Don't miss out on our event hire discounts in Ireland. For a limited time only, we're offering great deals on furniture, equipment, and more. Contact us today to take advantage of our special offer.",
    url: "https://www.caterhire.ie/price-reductions-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/442/edit",
  },
  {
    id: 443,
    storeName: "Caterhire",
    type: "category",
    name: "Table Protectors",
    page_title:
      "Event Table Protector Hire in Ireland - Tablecloth and Linen Protection",
    meta_description:
      "Protect your tables with our event table protector hire options. Our tablecloth and linen protection options are perfect for weddings, parties, and more. Contact us today to make a booking.",
    url: "https://www.caterhire.ie/table-protectors/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/443/edit",
  },
  {
    id: 444,
    storeName: "Caterhire",
    type: "category",
    name: "Bread & Cheese",
    page_title:
      "Bread & Cheese Board Hire in Ireland - Rustic and Modern Designs",
    meta_description:
      "Impress your guests with our bread and cheese board hire options. Choose from rustic and modern designs to suit your event style. Contact us today to find out more.",
    url: "https://www.caterhire.ie/bread-cheese/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/444/edit",
  },
  {
    id: 445,
    storeName: "Caterhire",
    type: "category",
    name: "Sinks",
    page_title: "Event Hire Company in Ireland: Premium Sinks for Hire",
    meta_description:
      "Keep things clean and hygienic at your event with our premium sinks for hire. Perfect for catering events and outdoor gatherings. Contact us today to make a booking.",
    url: "https://www.caterhire.ie/sinks/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/445/edit",
  },
  {
    id: 446,
    storeName: "Caterhire",
    type: "category",
    name: "Slim Jims",
    page_title: "Slim Jims for Hire in Ireland: Event Equipment Rentals",
    meta_description:
      "Need space-saving solutions for your event? Our slim jims for hire are perfect for tight spaces. Contact us today to find out more about our event equipment rentals.",
    url: "https://www.caterhire.ie/slim-jims/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/446/edit",
  },
  {
    id: 447,
    storeName: "Caterhire",
    type: "category",
    name: "Victoria Gold Rim Glasses",
    page_title: "Hire Victoria Gold Rim Glasses in Ireland for Your Event",
    meta_description:
      "Add a touch of luxury to your event with our Victoria gold rim glasses for hire in Ireland. Contact us today to make a booking.",
    url: "https://www.caterhire.ie/victoria-gold-rim-glasses/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/447/edit",
  },
  {
    id: 448,
    storeName: "Caterhire",
    type: "category",
    name: "Charger Plates/Base Plates",
    page_title: "Premium Charger Plates and Base Plates for Hire in Ireland",
    meta_description:
      "Elevate your table settings with our premium charger plates and base plates for hire in Ireland. Contact us today to find out more.",
    url: "https://www.caterhire.ie/charger-plates-base-plates/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/448/edit",
  },
  {
    id: 449,
    storeName: "Caterhire",
    type: "category",
    name: "Bain Maries - Hidden",
    page_title: "Event Hire in Ireland: Bain Maries - Hidden",
    meta_description:
      "Keep your food warm and fresh with our bain maries for hire. Our hidden options are perfect for maintaining a sleek event design. Contact us today to make a booking.",
    url: "https://www.caterhire.ie/bain-maries-hidden/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/449/edit",
  },
  {
    id: 450,
    storeName: "Caterhire",
    type: "category",
    name: "Stainless Steel Tables & Jack Stacks",
    page_title:
      "Hire High-Quality Stainless Steel Tables and Jack Stacks in Ireland",
    meta_description:
      "Create a professional workspace with our stainless steel tables and jack stacks for your event in Ireland. Rent now from our premium event hire company.",
    url: "https://www.caterhire.ie/stainless-steel-tables-jack-stacks/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/450/edit",
  },
  {
    id: 451,
    storeName: "Caterhire",
    type: "category",
    name: "Chameleon Chairs",
    page_title: "Event Furniture Hire: Chameleon Chairs in Ireland",
    meta_description:
      "Add a touch of elegance to your event in Ireland with our chameleon chairs. Available in a variety of colors and styles, rent now from our event hire company.",
    url: "https://www.caterhire.ie/chameleon-chairs/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/451/edit",
  },
  {
    id: 452,
    storeName: "Caterhire",
    type: "category",
    name: "Rectangular Coloured Tablecloths",
    page_title:
      "Rent Rectangular Coloured Tablecloths in Ireland for Your Event",
    meta_description:
      "Add a pop of color to your event in Ireland with our rectangular colored tablecloths. Choose from a range of colors to match your theme, rent now from our event hire company.",
    url: "https://www.caterhire.ie/rectangular-coloured-tablecloths/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/452/edit",
  },
  {
    id: 453,
    storeName: "Caterhire",
    type: "category",
    name: "Silver Rim Glasses",
    page_title: "Event Hire Company in Ireland: Silver Rim Glasses for Rent",
    meta_description:
      "Impress your guests at your event in Ireland with our silver rim glasses. Rent now from our premium event hire company for a touch of sophistication.",
    url: "https://www.caterhire.ie/silver-rim-glasses/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/453/edit",
  },
  {
    id: 454,
    storeName: "Caterhire",
    type: "category",
    name: "Deep Fat Fryers",
    page_title: "Hire Deep Fat Fryers for Your Event in Ireland",
    meta_description:
      "Fry up delicious treats at your event in Ireland with our deep fat fryers. Rent now from our event hire company for quality equipment.",
    url: "https://www.caterhire.ie/deep-fat-fryers/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/454/edit",
  },
  {
    id: 455,
    storeName: "Caterhire",
    type: "category",
    name: "Boston",
    page_title: "Event Equipment Rental: Boston for Hire in Ireland",
    meta_description:
      "Make your event in Ireland unforgettable with our Boston glassware. Available for rent from our event hire company, impress your guests with this unique glassware.",
    url: "https://www.caterhire.ie/boston/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/455/edit",
  },
  {
    id: 456,
    storeName: "Caterhire",
    type: "category",
    name: "Cocktail Glasses",
    page_title: "Cocktail Glasses for Hire in Ireland: Event Equipment Rentals",
    meta_description:
      "Serve up cocktails in style with our cocktail glasses for rent at your event in Ireland. Choose from a range of styles to suit your theme, rent now from our event hire company.",
    url: "https://www.caterhire.ie/cocktail-glasses/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/456/edit",
  },
  {
    id: 457,
    storeName: "Caterhire",
    type: "category",
    name: "Refrigeration Hire",
    page_title: "Premium Refrigeration Hire for Events in Ireland",
    meta_description:
      "Keep your food and drinks chilled at your event in Ireland with our premium refrigeration hire. Rent now from our event hire company for quality equipment.",
    url: "https://www.caterhire.ie/refrigeration-hire/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/457/edit",
  },
  {
    id: 458,
    storeName: "Caterhire",
    type: "category",
    name: "Storage Freezers",
    page_title: "Hire Storage Freezers for Your Event in Ireland",
    meta_description:
      "Keep your food and drinks frozen at your event in Ireland with our storage freezers for rent. Rent now from our event hire company for quality equipment.",
    url: "https://www.caterhire.ie/storage-freezers/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/458/edit",
  },
  {
    id: 459,
    storeName: "Caterhire",
    type: "category",
    name: "Napkin Rolls (Retail) - Hidden",
    page_title: "Premium Napkin Rolls (Retail) for Hire in Ireland",
    meta_description:
      "Impress your guests with our premium napkin rolls for rent at your event in Ireland. Available in a variety of colors and styles, rent now from our event hire company.",
    url: "https://www.caterhire.ie/napkin-rolls-retail-hidden/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/459/edit",
  },
  {
    id: 460,
    storeName: "Caterhire",
    type: "category",
    name: "Chilled Display Fridges",
    page_title: "Rent Chilled Display Fridges for Your Event in Ireland",
    meta_description:
      "Display your food and drinks in style at your event in Ireland with our chilled display fridges for rent. Rent now from our event hire company for quality equipment.",
    url: "https://www.caterhire.ie/chilled-display-fridges/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/460/edit",
  },
  {
    id: 461,
    storeName: "Caterhire",
    type: "category",
    name: "Bar Refigeration",
    page_title: "Event Equipment Rental: Bar Refrigeration for Hire in Ireland",
    meta_description:
      "Keep your drinks chilled and your bar organized with our bar refrigeration for rent at your event in Ireland. Rent now from our event hire company for quality equipment.",
    url: "https://www.caterhire.ie/bar-refigeration/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/461/edit",
  },
  {
    id: 462,
    storeName: "Caterhire",
    type: "category",
    name: "Carving Units - Hidden",
    page_title: "Event Hire in Ireland: Carving Units - Hidden",
    meta_description:
      "Impress your guests with perfectly sliced meats and vegetables with our carving units for rent at your event in Ireland. Rent now from our event hire company for quality equipment.",
    url: "https://www.caterhire.ie/carving-units-hidden/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/462/edit",
  },
  {
    id: 463,
    storeName: "Caterhire",
    type: "category",
    name: "Props",
    page_title: "Event Prop Hire: High-Quality Props for Rent in Ireland",
    meta_description:
      "Add character and personality to your event in Ireland with our range of props for rent. Rent now from our event hire company and make your event unforgettable.",
    url: "https://www.caterhire.ie/props/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/463/edit",
  },
  {
    id: 464,
    storeName: "Caterhire",
    type: "category",
    name: "Crystal Glasses",
    page_title: "Hire Crystal Glasses for Your Event in Ireland",
    meta_description:
      "Add a touch of elegance to your event in Ireland with our crystal glasses for rent. Choose from a range of styles to suit your theme, rent now from our event hire company.",
    url: "https://www.caterhire.ie/crystal-glasses/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/464/edit",
  },
  {
    id: 465,
    storeName: "Caterhire",
    type: "category",
    name: "Pump Action Flasks",
    page_title:
      "Event Equipment Rental: Pump Action Flasks for Hire in Ireland",
    meta_description:
      "Keep your drinks warm at your event in Ireland with our pump action flasks for rent. Rent now from our event hire company for quality equipment.",
    url: "https://www.caterhire.ie/pump-action-flasks/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/465/edit",
  },
  {
    id: 466,
    storeName: "Caterhire",
    type: "category",
    name: "Electric Ovens & Cookers",
    page_title: "Rent Electric Ovens & Cookers in Ireland for Your Event",
    meta_description:
      "Cook up a storm at your event in Ireland with our electric ovens and cookers for rent. Rent now from our event hire company for quality equipment.",
    url: "https://www.caterhire.ie/electric-ovens-cookers/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/466/edit",
  },
  {
    id: 467,
    storeName: "Caterhire",
    type: "category",
    name: "Deck Chairs",
    page_title: "Event Furniture Hire: Premium Deck Chairs in Ireland",
    meta_description:
      "Relax in style at your event in Ireland with our deck chairs for rent. Available in a range of colors and styles, rent now from our event hire company.",
    url: "https://www.caterhire.ie/deck-chairs/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/467/edit",
  },
  {
    id: 468,
    storeName: "Caterhire",
    type: "category",
    name: "Microwaves",
    page_title: "Hire Microwaves for Your Event in Ireland",
    meta_description:
      "Keep your food warm and ready to serve with our microwaves for rent at your event in Ireland. Rent now from our event hire company for quality equipment.",
    url: "https://www.caterhire.ie/microwaves/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/468/edit",
  },
  {
    id: 469,
    storeName: "Caterhire",
    type: "category",
    name: "Exam Tables",
    page_title: "Rent Exam Tables for Your Event in Ireland",
    meta_description:
      "Set up a professional workspace at your event in Ireland with our exam tables for rent. Rent now from our event hire company for quality",
    url: "https://www.caterhire.ie/exam-tables/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/469/edit",
  },
  {
    id: 470,
    storeName: "Caterhire",
    type: "category",
    name: "Soup Kettles - Hidden",
    page_title: "Event Hire in Ireland: Soup Kettles - Hidden",
    meta_description:
      "Hire soup kettles for your event in Ireland. Perfect for keeping soup, stew, and chili hot and ready to serve.",
    url: "https://www.caterhire.ie/soup-kettles-hidden/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/470/edit",
  },
  {
    id: 471,
    storeName: "Caterhire",
    type: "category",
    name: "Dishwashers",
    page_title: "Hire Dishwashers for Your Event in Ireland",
    meta_description:
      "Save time and hassle with our dishwasher hire for events in Ireland. Keep your dishes clean and ready to use throughout your event.",
    url: "https://www.caterhire.ie/dishwashers-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/471/edit",
  },
  {
    id: 472,
    storeName: "Caterhire",
    type: "category",
    name: "Square Plates",
    page_title: "Rent Square Plates for Your Event in Ireland",
    meta_description:
      "Add a modern touch to your event with our square plate hire in Ireland. Available in various sizes and colors to suit your theme.",
    url: "https://www.caterhire.ie/square-plates/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/472/edit",
  },
  {
    id: 473,
    storeName: "Caterhire",
    type: "category",
    name: "Storage Fridges",
    page_title: "Event Equipment Rental: Storage Fridges for Hire in Ireland",
    meta_description:
      "Keep your food and drinks cool with our storage fridge hire for events in Ireland. Choose from a variety of sizes to fit your needs.",
    url: "https://www.caterhire.ie/storage-fridges/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/473/edit",
  },
  {
    id: 474,
    storeName: "Caterhire",
    type: "category",
    name: "Hot Plates & Griddles",
    page_title: "Hire Hot Plates & Griddles for Your Event in Ireland",
    meta_description:
      "Keep your food warm and ready to serve with our hot plate and griddle hire in Ireland. Perfect for buffets and serving stations.",
    url: "https://www.caterhire.ie/hot-plates-griddles/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/474/edit",
  },
  {
    id: 475,
    storeName: "Caterhire",
    type: "category",
    name: "Tablescape Crockery",
    page_title: "Premium Tablescape Crockery for Hire in Ireland",
    meta_description:
      "Elevate your event with our tablescape crockery hire in Ireland. Choose from a variety of designs and colors to create the perfect table setting.",
    url: "https://www.caterhire.ie/tablescape-crockery/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/475/edit",
  },
  {
    id: 476,
    storeName: "Caterhire",
    type: "category",
    name: "Goa White & Gold Cutlery",
    page_title: "Hire Goa White & Gold Cutlery for Your Event in Ireland",
    meta_description:
      "Make a statement with our Goa white and gold cutlery hire for events in Ireland. This elegant cutlery is sure to impress your guests.",
    url: "https://www.caterhire.ie/goa-white-gold-cutlery/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/476/edit",
  },
  {
    id: 477,
    storeName: "Caterhire",
    type: "category",
    name: "Goa Black & Gold Cutlery",
    page_title:
      "Event Equipment Rental: Goa Black & Gold Cutlery for Hire in Ireland",
    meta_description:
      "Add a touch of sophistication to your event with our Goa black and gold cutlery hire in Ireland. Perfect for formal occasions.",
    url: "https://www.caterhire.ie/goa-black-gold-cutlery/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/477/edit",
  },
  {
    id: 478,
    storeName: "Caterhire",
    type: "category",
    name: "All Chair & Stool Hire",
    page_title: "Event Furniture Hire: All Chair & Stool Hire in Ireland",
    meta_description:
      "Choose from a wide selection of chairs and stools for hire in Ireland. Whether you need seating for a wedding, corporate event, or party, we have options to suit your needs.",
    url: "https://www.caterhire.ie/all-chair-stool-hire-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/478/edit",
  },
  {
    id: 479,
    storeName: "Caterhire",
    type: "category",
    name: "Goa Pink & Gold Cutlery",
    page_title: "Hire Goa Pink & Gold Cutlery for Your Event in Ireland",
    meta_description:
      "Add a pop of color to your table setting with our Goa pink and gold cutlery hire in Ireland. Perfect for themed events or adding a touch of fun to formal occasions.",
    url: "https://www.caterhire.ie/goa-pink-gold-cutlery-1/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/479/edit",
  },
  {
    id: 487,
    storeName: "Caterhire",
    type: "category",
    name: "Communions",
    page_title: "Event Equipment Rental for Communions in Ireland",
    meta_description:
      "Celebrate your child's communion in style with our event hire services in Ireland. We offer a wide range of options to make their special day unforgettable.",
    url: "https://www.caterhire.ie/communions-dir/",
    edit: "https://store-jqwssthhhd.mybigcommerce.com/manage/products/categories/487/edit",
  },
];
async function main() {
  for (const page of data) {
    try {
      console.log(`updating brand: ${page.name}`);
      await updateCategory(page.id, {
        page_title: page.page_title,
        meta_description: page.meta_description,
      });
      console.log("updated");
    } catch (err) {
      console.log(err);
      break;
    }
  }
}
main();
