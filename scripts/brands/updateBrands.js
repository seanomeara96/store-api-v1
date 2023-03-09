require("../../config/config").config("ha");
const { updateBrand } = require("../../functions/brands/updateBrand");
const data = [
  {
    id: 35,
    storeName: "HireAll",
    type: "brand",
    name: "Sagaform",
    page_title: "Hire High-Quality Sagaform for Your Event in Ireland",
    meta_description:
      "Add a Scandinavian touch to your event with our Sagaform hire in Ireland. Choose from a variety of homeware products to elevate your table setting.",
    url: "https://www.hireall.ie/brands/sagaform/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/35/edit",
  },
  {
    id: 36,
    storeName: "HireAll",
    type: "brand",
    name: "OFS",
    page_title: "Event Hire in Ireland: OFS",
    meta_description:
      "Impress your guests with our OFS event hire in Ireland. From seating to decor, we have options to create a truly memorable event.",
    url: "https://www.hireall.ie/brands/ofs/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/36/edit",
  },
  {
    id: 37,
    storeName: "HireAll",
    type: "brand",
    name: "Common Good",
    page_title: "Rent Common Good for Your Event in Ireland",
    meta_description:
      "Make a statement with our Common Good hire in Ireland. Choose from a range of eco-friendly and sustainable products to show your commitment to the environment.",
    url: "https://www.hireall.ie/brands/common-good/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/37/edit",
  },
  {
    id: 38,
    storeName: "HireAll",
    type: "brand",
    name: "Lounge 22",
    page_title: "Hire Lounge 22 Furniture for Your Event in Ireland",
    meta_description:
      "Elevate your event with our Lounge 22 hire in Ireland. From sofas to ottomans, we have options to create a comfortable and stylish lounge area for your guests.",
    url: "https://www.hireall.ie/lounge-22/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/38/edit",
  },
  {
    id: 39,
    storeName: "HireAll",
    type: "brand",
    name: "Masterchef",
    page_title: "Event Equipment Rental: Masterchef for Hire in Ireland",
    meta_description:
      "Impress your guests with our Masterchef event hire in Ireland. Choose from a range of professional-grade kitchen equipment to create restaurant-quality dishes.",
    url: "https://www.hireall.ie/masterchef/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/39/edit",
  },
  {
    id: 40,
    storeName: "HireAll",
    type: "brand",
    name: "Wedgwood",
    page_title: "Premium Wedgwood Rentals for Your Event in Ireland",
    meta_description:
      "Add a touch of luxury to your event with our Wedgwood hire in Ireland. Choose from a variety of dinnerware and serveware to create an elegant table setting.",
    url: "https://www.hireall.ie/wedgwood/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/40/edit",
  },
  {
    id: 41,
    storeName: "HireAll",
    type: "brand",
    name: "John Rocha",
    page_title: "Hire John Rocha for Your Event in Ireland",
    meta_description:
      "Make a statement with our John Rocha event hire in Ireland. Choose from a range of contemporary designs to add a modern touch to your event.",
    url: "https://www.hireall.ie/john-rocha/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/41/edit",
  },
  {
    id: 42,
    storeName: "HireAll",
    type: "brand",
    name: "SCHOTT ZWIESEL",
    page_title: "Event Equipment Rental: SCHOTT ZWIESEL for Hire in Ireland",
    meta_description: "Elevate your drink service with our SCHOTT ZWIE",
    url: "https://www.hireall.ie/schott-zwiesel/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/42/edit",
  },
  {
    id: 43,
    storeName: "HireAll",
    type: "brand",
    name: "Waterford",
    page_title: "Rent Waterford for Your Event in Ireland",
    meta_description:
      "Rent Waterford crystal glassware for your event in Ireland. Add a touch of elegance and sophistication to your special occasion with Waterford glasses. Contact us now for availability.",
    url: "https://www.hireall.ie/waterford/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/43/edit",
  },
  {
    id: 44,
    storeName: "HireAll",
    type: "brand",
    name: "Jasper Conran at Wedgwood",
    page_title: "Hire Jasper Conran at Wedgwood for Your Event in Ireland",
    meta_description:
      "Add a touch of luxury to your event with Jasper Conran at Wedgwood tableware. Rent the iconic bone china collection for your wedding, corporate event or private party. Contact us for availability.",
    url: "https://www.hireall.ie/jasper-conran-at-wedgwood/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/44/edit",
  },
  {
    id: 45,
    storeName: "HireAll",
    type: "brand",
    name: "Spandex Apple Green Pod Cover",
    page_title:
      "Event Furniture Rental: Spandex Apple Green Pod Cover for Hire in Ireland",
    meta_description:
      "Create a stylish and modern look with our spandex apple green pod cover. Perfect for weddings, corporate events or private parties. Rent now and elevate your event decor.",
    url: "https://www.hireall.ie/spandex-apple-green-pod-cover/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/45/edit",
  },
  {
    id: 46,
    storeName: "HireAll",
    type: "brand",
    name: "Chameleon Chair Collection",
    page_title: "Hire High-Quality Chameleon Chairs for Your Event in Ireland",
    meta_description:
      "Choose from a range of Chameleon chairs for hire in Ireland. Add a touch of elegance and style to your event with our premium collection. Contact us now for availability.",
    url: "https://www.hireall.ie/chameleon-chair-collection/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/46/edit",
  },
  {
    id: 47,
    storeName: "HireAll",
    type: "brand",
    name: "Alto Sham",
    page_title: "Premium Alto Sham for Hire in Ireland",
    meta_description:
      "Rent Alto Sham hot holding equipment for your catering needs. Keep your food warm and ready to serve at your event in Ireland. Contact us for availability.",
    url: "https://www.hireall.ie/alto-sham/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/47/edit",
  },
  {
    id: 48,
    storeName: "HireAll",
    type: "brand",
    name: "Zeus Bar Stool with Silver Pad Cover",
    page_title:
      "Event Furniture Rental: Zeus Bar Stool with Silver Pad Cover for Hire in Ireland",
    meta_description:
      "Add a touch of glamour to your event with the Zeus bar stool with silver pad cover. Rent now and elevate your event decor. Perfect for weddings, corporate events or private parties.",
    url: "https://www.hireall.ie/zeus-bar-stool-with-silver-pad-cover/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/48/edit",
  },
  {
    id: 49,
    storeName: "HireAll",
    type: "brand",
    name: "Cinders",
    page_title: "Event Equipment Rental: Cinders for Hire in Ireland",
    meta_description:
      "Hire Cinders BBQs and grills for your outdoor event in Ireland. Perfect for weddings, corporate events or private parties. Contact us now for availability.",
    url: "https://www.hireall.ie/cinders/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/49/edit",
  },
  {
    id: 50,
    storeName: "HireAll",
    type: "brand",
    name: "Fatboy",
    page_title: "Hire High-Quality Fatboy Furniture for Your Event in Ireland",
    meta_description:
      "Rent Fatboy outdoor furniture for your event in Ireland. Add a touch of comfort and style to your outdoor space. Contact us for availability.",
    url: "https://www.hireall.ie/fatboy/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/50/edit",
  },
  {
    id: 51,
    storeName: "HireAll",
    type: "brand",
    name: "Special Offers",
    page_title: "Event Hire Special Offers in Ireland",
    meta_description:
      "Check out our latest special offers for event rentals in Ireland. Save on party, wedding, and corporate event rentals. Contact us for more information.",
    url: "https://www.hireall.ie/special-offers/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/51/edit",
  },
  {
    id: 52,
    storeName: "HireAll",
    type: "brand",
    name: "Cutipol",
    page_title: "Premium Cutipol Cutlery for Hire in Ireland",
    meta_description:
      "Rent Cutipol cutlery for your event in Ireland. Choose from a range of modern and elegant designs to elevate your event decor. Contact us for availability.",
    url: "https://www.hireall.ie/cutipol/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/52/edit",
  },
  {
    id: 53,
    storeName: "HireAll",
    type: "brand",
    name: "Genware",
    page_title: "Hire Genware for Your Event in Ireland",
    meta_description:
      "Hire Genware catering equipment for your event in Ireland. Choose from a range of high-quality kitchen and dining equipment to meet your catering needs. Contact us for availability.",
    url: "https://www.hireall.ie/genware/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/53/edit",
  },
  {
    id: 54,
    storeName: "HireAll",
    type: "brand",
    name: "Arc",
    page_title: "Event Equipment Rental: Arc for Hire in Ireland",
    meta_description:
      "Rent Arc glassware for your event in Ireland. Choose from a range of modern and elegant designs to elevate your event decor. Contact us for availability.",
    url: "https://www.hireall.ie/arc/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/54/edit",
  },
  {
    id: 55,
    storeName: "HireAll",
    type: "brand",
    name: "Something Different Linen",
    page_title: "Unique Linen Rentals for Your Event in Ireland",
    meta_description:
      "Rent Something Different Linen for your event in Ireland. Choose from a range of unique and stylish linen designs to elevate your event decor. Contact us for availability.",
    url: "https://www.hireall.ie/something-different-linen/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/55/edit",
  },
  {
    id: 56,
    storeName: "HireAll",
    type: "brand",
    name: "Lolliprops",
    page_title: "Hire Lolliprops for Your Event in Ireland",
    meta_description:
      "Rent Lolliprops for your event in Ireland. Choose from a range of fun and creative props to add a touch of whimsy to your event decor. Contact us for availability.",
    url: "https://www.hireall.ie/lolliprops/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/56/edit",
  },
  {
    id: 57,
    storeName: "HireAll",
    type: "brand",
    name: "Arthur Price",
    page_title: "Event Hire in Ireland: Arthur Price",
    meta_description:
      "Hire Arthur Price cutlery for your event in Ireland. Choose from a range of elegant and classic designs to elevate your event decor. Contact us for availability.",
    url: "https://www.hireall.ie/arthur-price/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/57/edit",
  },
  {
    id: 58,
    storeName: "HireAll",
    type: "brand",
    name: "Hireall Kitchen & Dining",
    page_title:
      "Rent Hireall Kitchen & Dining Equipment for Your Event in Ireland",
    meta_description:
      "Rent Hireall kitchen and dining equipment for your event in Ireland. Choose from a range of high-quality equipment to meet your catering needs. Contact us for availability.",
    url: "https://www.hireall.ie/hireall-kitchen-dining/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/58/edit",
  },
  {
    id: 59,
    storeName: "HireAll",
    type: "brand",
    name: "Flexfurn",
    page_title: "Event Furniture Hire: Flexfurn in Ireland",
    meta_description:
      "Rent Flexfurn furniture for your event in Ireland. Choose from a range of stylish and functional designs to elevate your event decor. Contact us for availability.",
    url: "https://www.hireall.ie/flexfurn/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/59/edit",
  },
  {
    id: 61,
    storeName: "HireAll",
    type: "brand",
    name: "My Drap",
    page_title: "Premium My Drap Rentals for Your Event in Ireland",
    meta_description:
      "Rent My Drap table linen for your event in Ireland. Choose from a range of unique and stylish designs to elevate your event decor. Contact us for availability.",
    url: "https://www.hireall.ie/my-drap/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/61/edit",
  },
  {
    id: 62,
    storeName: "HireAll",
    type: "brand",
    name: "Club Collection",
    page_title: "Event Equipment Rental: Club Collection for Hire in Ireland",
    meta_description:
      "Hire Club Collection glassware for your event in Ireland. Choose from a range of modern and elegant designs to elevate your event decor. Contact us for availability.",
    url: "https://www.hireall.ie/club-collection/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/62/edit",
  },
  {
    id: 63,
    storeName: "HireAll",
    type: "brand",
    name: "Oneida",
    page_title: "Hire Oneida for Your Event in Ireland",
    meta_description: "Rent Oneida cutlery for your event in Ireland.",
    url: "https://www.hireall.ie/oneida/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/63/edit",
  },
  {
    id: 64,
    storeName: "HireAll",
    type: "brand",
    name: "Royal Doulton",
    page_title: "Rent Royal Doulton for Your Event in Ireland",
    meta_description:
      "Host an elegant and sophisticated event with our exquisite collection of Royal Doulton tableware. Perfect for weddings, corporate events and special occasions, our selection of Royal Doulton crockery is sure to impress your guests. Hire today from Hireall, the leading event hire company in Ireland.",
    url: "https://www.hireall.ie/royal-doulton/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/64/edit",
  },
  {
    id: 65,
    storeName: "HireAll",
    type: "brand",
    name: "Garden Games",
    page_title: "Hire Garden Games for Your Event in Ireland",
    meta_description:
      "Add some fun to your event with our range of garden games. From giant Jenga to croquet, our selection of games is perfect for outdoor events and weddings. Keep your guests entertained for hours with Hireall's garden games hire service. Book now and create an unforgettable event experience.",
    url: "https://www.hireall.ie/garden-games/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/65/edit",
  },
  {
    id: 66,
    storeName: "HireAll",
    type: "brand",
    name: "Chesterfield",
    page_title: "Premium Chesterfield Rentals for Your Event in Ireland",
    meta_description:
      "Make a statement at your event with our luxurious Chesterfield sofas. Whether you're hosting a corporate event or a wedding, our Chesterfield collection is sure to add a touch of elegance and sophistication to your event. Hire from Hireall, the leading event hire company in Ireland, and create an unforgettable experience for your guests.",
    url: "https://www.hireall.ie/chesterfield/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/66/edit",
  },
  {
    id: 67,
    storeName: "HireAll",
    type: "brand",
    name: "Vintage Collection",
    page_title:
      "Event Equipment Rental: Vintage Collection for Hire in Ireland",
    meta_description:
      "Add some vintage charm to your event with our stunning collection of vintage crockery and glassware. Perfect for weddings, high teas, and other special occasions, our vintage collection is sure to impress your guests. Hire from Hireall, the leading event hire company in Ireland, and create a timeless and memorable event.",
    url: "https://www.hireall.ie/vintage-collection/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/67/edit",
  },
  {
    id: 68,
    storeName: "HireAll",
    type: "brand",
    name: "Dalebrook",
    page_title: "Hire Dalebrook for Your Event in Ireland",
    meta_description:
      "Impress your guests with our exquisite collection of Dalebrook melamine tableware. Perfect for outdoor events, weddings and corporate events, our selection of Dalebrook crockery is sure to add a touch of elegance to your event. Hire from Hireall, the leading event hire company in Ireland, and create an unforgettable dining experience.",
    url: "https://www.hireall.ie/dalebrook/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/68/edit",
  },
  {
    id: 69,
    storeName: "HireAll",
    type: "brand",
    name: "Slide Design",
    page_title: "Rent Slide Design Furniture for Your Event in Ireland",
    meta_description:
      "Create a modern and stylish event with our range of Slide Design furniture. Perfect for corporate events, exhibitions and product launches, our selection of Slide Design furniture is sure to impress your guests. Hire from Hireall, the leading event hire company in Ireland, and elevate your event to the next level.",
    url: "https://www.hireall.ie/slide-design/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/69/edit",
  },
  {
    id: 70,
    storeName: "HireAll",
    type: "brand",
    name: "Steelite International",
    page_title:
      "Event Equipment Rental: Steelite International for Hire in Ireland",
    meta_description:
      "Host an elegant and sophisticated event with our exquisite collection of Steelite International tableware. Perfect for weddings, corporate events and special occasions, our selection of Steelite International crockery is sure to impress your guests. Hire today from Hireall, the leading event hire company in Ireland.",
    url: "https://www.hireall.ie/steelite-international/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/70/edit",
  },
  {
    id: 71,
    storeName: "HireAll",
    type: "brand",
    name: "Elia",
    page_title: "Hire Elia for Your Event in Ireland",
    meta_description:
      "Impress your guests with our stunning range of Elia cutlery. Perfect for weddings, corporate events and other",
    url: "https://www.hireall.ie/elia/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/71/edit",
  },
  {
    id: 72,
    storeName: "HireAll",
    type: "brand",
    name: "Portable floor maker",
    page_title:
      "Event Equipment Rental: Portable floor maker for Hire in Ireland",
    meta_description:
      "Create a seamless event space with our portable floor maker. Perfect for outdoor events and weddings, our easy-to-install flooring is both durable and stylish. Hire from Hireall, the leading event hire company in Ireland, and create a stable and level surface for your guests to dance and celebrate on.",
    url: "https://www.hireall.ie/portablefloormaker/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/72/edit",
  },
  {
    id: 73,
    storeName: "HireAll",
    type: "brand",
    name: "Artis",
    page_title: "Hire High-Quality Artis Cutlery for Your Event in Ireland",
    meta_description:
      "Impress your guests with our stunning range of Artis glassware. Perfect for weddings, corporate events and other special occasions, our selection of Artis glassware is sure to elevate your event. Hire from Hireall, the leading event hire company in Ireland, and create an unforgettable drinking experience for your guests.",
    url: "https://www.hireall.ie/artis/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/73/edit",
  },
  {
    id: 74,
    storeName: "HireAll",
    type: "brand",
    name: "Blue Seal",
    page_title: "Event Equipment Rental: Blue Seal for Hire in Ireland",
    meta_description:
      "Host a professional and efficient event with our range of Blue Seal catering equipment. From ovens to fryers, our selection of Blue Seal equipment is perfect for catering for large events and weddings. Hire from Hireall, the leading event hire company in Ireland, and ensure your guests are well-fed and satisfied.",
    url: "https://www.hireall.ie/blue-seal/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/74/edit",
  },
  {
    id: 75,
    storeName: "HireAll",
    type: "brand",
    name: "Hireall Tablescapes",
    page_title:
      "Rent Unique Tablescapes for Your Event with Hireall in Ireland",
    meta_description:
      "Create a stunning and elegant dining experience with our range of Hireall tablescapes. From classic white to modern and chic, our selection of tableware is perfect for weddings, corporate events and other special occasions. Hire from Hireall, the leading event hire company in Ireland, and create a memorable event experience for your guests.",
    url: "https://www.hireall.ie/hireall-tablescapes/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/75/edit",
  },
  {
    id: 77,
    storeName: "HireAll",
    type: "brand",
    name: "Hireall Outdoor",
    page_title:
      "Hire High-Quality Outdoor Equipment for Your Event with Hireall in Ireland",
    meta_description:
      "Host an unforgettable outdoor event with our range of Hireall outdoor equipment. From marquees to heaters, our selection of outdoor equipment is perfect for weddings, festivals and other special events. Hire from Hireall, the leading event hire company in Ireland, and create a comfortable and enjoyable outdoor event experience for your guests.",
    url: "https://www.hireall.ie/hireall-outdoor/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/77/edit",
  },
  {
    id: 78,
    storeName: "HireAll",
    type: "brand",
    name: "Rubbermaid",
    page_title: "Event Equipment Rental: Rubbermaid for Hire in Ireland",
    meta_description:
      "Keep your event clean and organised with our range of Rubbermaid cleaning equipment. From bins to cleaning carts, our selection of Rubbermaid equipment is perfect for large events and festivals. Hire from Hireall, the leading event hire company in Ireland, and ensure your event space remains clean and hygienic.",
    url: "https://www.hireall.ie/rubbermaid/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/78/edit",
  },
  {
    id: 79,
    storeName: "HireAll",
    type: "brand",
    name: "Burco",
    page_title: "Rent Burco Catering Equipment for Your Event in Ireland",
    meta_description:
      "Host a hot and refreshing event with our range of Burco beverage equipment. From hot water urns to coffee makers, our selection of Burco equipment is perfect for weddings, corporate events and other special occasions. Hire from Hireall, the leading event hire company in Ireland, and ensure your guests have access to delicious and hot beverages throughout the event.",
    url: "https://www.hireall.ie/burco/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/79/edit",
  },
  {
    id: 80,
    storeName: "HireAll",
    type: "brand",
    name: "Samsonite Folding Chair",
    page_title: "Hire Samsonite Folding Chairs for Your Event in Ireland",
    meta_description:
      "Seat your guests in style with our Samsonite folding chairs. Perfect for weddings, conferences, and other special events, our chairs are both comfortable and easy to set up. Hire from Hireall, the leading event hire company in Ireland, and create a seamless and elegant seating experience for your guests.",
    url: "https://www.hireall.ie/samsonite-folding-chair/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/80/edit",
  },
  {
    id: 81,
    storeName: "HireAll",
    type: "brand",
    name: "Grunwerg",
    page_title: "Premium Grunwerg Cutlery Rentals for Your Event in Ireland",
    meta_description:
      "Elevate your event dining experience with our Grunwerg cutlery. Perfect for weddings, corporate events and other special occasions, our selection of Grunwerg cutlery is sure to impress your guests. Hire from Hireall, the leading event hire company in Ireland, and create a memorable dining experience for your guests.",
    url: "https://www.hireall.ie/grunwerg/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/81/edit",
  },
  {
    id: 82,
    storeName: "HireAll",
    type: "brand",
    name: "Eternum",
    page_title: "Rent Eternum Cutlery for Your Event in Ireland",
    meta_description:
      "Add a touch of elegance to your event with our Eternum flatware. Perfect for weddings, corporate events and other special occasions, our selection of Eternum flatware is sure to impress your guests. Hire from Hireall, the leading event hire company in Ireland, and create a sophisticated dining experience for your guests.",
    url: "https://www.hireall.ie/eternum/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/82/edit",
  },
  {
    id: 83,
    storeName: "HireAll",
    type: "brand",
    name: "Waterford Crystal",
    page_title: "Hire Waterford Crystal for Your Event in Ireland",
    meta_description:
      "Impress your guests with our stunning range of Waterford Crystal glassware. Perfect for weddings, corporate events and other special occasions, our selection of Waterford Crystal glassware is sure to elevate your event. Hire from Hireall, the leading event hire company in Ireland, and create an unforgettable drinking experience for your guests.",
    url: "https://www.hireall.ie/waterford-crystal/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/83/edit",
  },
  {
    id: 84,
    storeName: "HireAll",
    type: "brand",
    name: "Hireall Centerpieces",
    page_title: "Rent Centerpieces for Your Event with Hireall in Ireland",
    meta_description:
      "Create a stunning and elegant event atmosphere with our range of Hireall centerpieces. From classic to modern and chic, our selection of centerpieces is perfect for weddings, corporate events and other special occasions. Hire from Hireall, the leading event hire company in Ireland, and create a memorable event experience for your guests.",
    url: "https://www.hireall.ie/hireall-centerpieces/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/84/edit",
  },
  {
    id: 85,
    storeName: "HireAll",
    type: "brand",
    name: "Flux",
    page_title: "Event Furniture Rental: Flux for Hire in Ireland",
    meta_description:
      "Create a modern and unique event atmosphere with our Flux furniture. Perfect for weddings, conferences and other special events, our selection of Flux furniture is sure to impress your guests. Hire from Hireall, the leading event hire company in Ireland, and create a memorable and stylish event experience for your guests.",
    url: "https://www.hireall.ie/flux/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/85/edit",
  },
  {
    id: 86,
    storeName: "HireAll",
    type: "brand",
    name: "Bash Bars",
    page_title: "Hire Bash Bars for Your Event in Ireland",
    meta_description:
      "Host a professional and stylish event with our Bash Bars. Perfect for weddings, corporate events and other special occasions, our selection of Bash Bars is sure to impress your guests. Hire from Hireall, the leading event hire company in Ireland, and create a seamless and sophisticated event experience for your guests.",
    url: "https://www.hireall.ie/bash-bars/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/86/edit",
  },
  {
    id: 87,
    storeName: "HireAll",
    type: "brand",
    name: "Degrenne",
    page_title: "Rent Degrenne Cutlery for Your Event in Ireland",
    meta_description:
      "Discover the exquisite range of Degrenne tableware at our event hire company in Ireland. Perfect for weddings, corporate events and more.",
    url: "https://www.hireall.ie/degrenne/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/87/edit",
  },
  {
    id: 88,
    storeName: "HireAll",
    type: "brand",
    name: "Victor",
    page_title: "Event Equipment Rental: Victor for Hire in Ireland",
    meta_description:
      "Impress your guests with the stunning Victor range of tableware, available for hire at our event hire company in Ireland. Whether it's a wedding or corporate event, Victor is sure to add a touch of sophistication to your table setting.",
    url: "https://www.hireall.ie/victor/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/88/edit",
  },
  {
    id: 89,
    storeName: "HireAll",
    type: "brand",
    name: "Sorrento Collection",
    page_title: "Hire Sorrento Collection for Your Event in Ireland",
    meta_description:
      "Create an unforgettable dining experience with the Sorrento Collection, available for hire at our event hire company in Ireland. From elegant weddings to corporate events, the Sorrento Collection is the perfect choice for those who demand the very best in tableware.",
    url: "https://www.hireall.ie/sorrento-collection/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/89/edit",
  },
  {
    id: 90,
    storeName: "HireAll",
    type: "brand",
    name: "Lincat",
    page_title: "Event Equipment Rental: Lincat for Hire in Ireland",
    meta_description:
      "Need high-quality catering equipment for your event? Look no further than Lincat, available for hire at our event hire company in Ireland. With Lincat, you can be sure that your guests will enjoy delicious food that is cooked to perfection.",
    url: "https://www.hireall.ie/lincat/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/90/edit",
  },
  {
    id: 91,
    storeName: "HireAll",
    type: "brand",
    name: "Alto Shaam",
    page_title: "Rent Alto Shaam for Your Event in Ireland",
    meta_description:
      "For the ultimate in food presentation, hire Alto Shaam equipment from our event hire company in Ireland. Whether you're catering for a wedding or corporate event, Alto Shaam is sure to impress with its sleek design and exceptional performance.",
    url: "https://www.hireall.ie/alto-shaam/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/91/edit",
  },
  {
    id: 92,
    storeName: "HireAll",
    type: "brand",
    name: "Chiavari Collection",
    page_title: "Hire Chiavari Collection Chairs for Your Event in Ireland",
    meta_description:
      "Make a statement at your event with the elegant Chiavari Collection, available for hire at our event hire company in Ireland. Perfect for weddings, corporate events and more, the Chiavari Collection is sure to add a touch of sophistication to your event.",
    url: "https://www.hireall.ie/chiavari-collection/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/92/edit",
  },
  {
    id: 93,
    storeName: "HireAll",
    type: "brand",
    name: "Fagor",
    page_title: "Event Equipment Rental: Fagor for Hire in Ireland",
    meta_description:
      "Looking for reliable and efficient catering equipment for your event? Look no further than Fagor, available for hire at our event hire company in Ireland. With Fagor, you can be sure that your guests will enjoy delicious food that is cooked to perfection.",
    url: "https://www.hireall.ie/fagor/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/93/edit",
  },
  {
    id: 94,
    storeName: "HireAll",
    type: "brand",
    name: "Panasonic",
    page_title: "Hire Panasonic Catering Equipment for Your Event in Ireland",
    meta_description:
      "Ensure that your event runs smoothly with the help of Panasonic equipment, available for hire at our event hire company in Ireland. From sound systems to lighting, Panasonic has everything you need to make your event a success.",
    url: "https://www.hireall.ie/panasonic/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/94/edit",
  },
  {
    id: 95,
    storeName: "HireAll",
    type: "brand",
    name: "Pedrali",
    page_title: "Event Furniture Rental: Pedrali for Hire in Ireland",
    meta_description:
      "For stylish and modern event furniture, look no further than Pedrali, available for hire at our event hire company in Ireland. With Pedrali, you can create a stunning and comfortable atmosphere for your guests that is sure to impress.",
    url: "https://www.hireall.ie/pedrali/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/95/edit",
  },
  {
    id: 96,
    storeName: "HireAll",
    type: "brand",
    name: "Tefcold",
    page_title:
      "Rent Tefcold Refrigeration Equipment for Your Event in Ireland",
    meta_description:
      "Keep your food and drinks at the perfect temperature with Tefcold refrigeration equipment, available for hire at our event hire company in Ireland. With Tefcold, you can be sure that your guests will enjoy fresh and delicious food and drinks throughout your event.",
    url: "https://www.hireall.ie/tefcold/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/96/edit",
  },
  {
    id: 97,
    storeName: "HireAll",
    type: "brand",
    name: "Novum",
    page_title: "Hire Novum Refrigeration Equipment for Your Event in Ireland",
    meta_description:
      "Looking for high-quality refrigeration equipment for your event? Look no further than Novum, available for hire at our event hire company in Ireland. With Novum, you can be sure that your guests will enjoy fresh and delicious food and drinks throughout your event.",
    url: "https://www.hireall.ie/novum/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/97/edit",
  },
  {
    id: 98,
    storeName: "HireAll",
    type: "brand",
    name: "Angelo Po",
    page_title: "Event Equipment Rental: Angelo Po for Hire in Ireland",
    meta_description:
      "Make sure that your event catering runs smoothly with Angelo Po equipment, available for hire at our event hire company in Ireland. From cooking equipment to refrigeration, Angelo Po has everything you need to create delicious and memorable dishes for your guests.",
    url: "https://www.hireall.ie/angelo-po/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/98/edit",
  },
  {
    id: 99,
    storeName: "HireAll",
    type: "brand",
    name: "Zanussi",
    page_title: "Hire Zanussi for Your Event in Ireland",
    meta_description:
      "Create delicious and memorable dishes for your event with Zanussi cooking equipment, available for hire at our event hire company in Ireland. With Zanussi, you can be sure that your guests will enjoy the very best in event catering.",
    url: "https://www.hireall.ie/zanussi/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/99/edit",
  },
  {
    id: 100,
    storeName: "HireAll",
    type: "brand",
    name: "Pitco",
    page_title: "Rent Pitco Catering Equipment for Your Event in Ireland",
    meta_description:
      "Need reliable and efficient frying equipment for your event? Look no further than Pitco, available for hire at our event hire company in Ireland. With Pitco,",
    url: "https://www.hireall.ie/pitco/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/100/edit",
  },
  {
    id: 101,
    storeName: "HireAll",
    type: "brand",
    name: "Vista Alegre",
    page_title: "Hire Vista Alegre for Your Event in Ireland",
    meta_description:
      "Add a touch of luxury to your event with Vista Alegre tableware, available for hire at our event hire company in Ireland. Perfect for weddings, corporate events and more, Vista Alegre is sure to impress with its stunning design and exceptional quality.",
    url: "https://www.hireall.ie/vista-alegre/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/101/edit",
  },
  {
    id: 102,
    storeName: "HireAll",
    type: "brand",
    name: "Atlas",
    page_title: "Rent Atlas Cutlery for Your Event in Ireland",
    meta_description:
      "Looking for event furniture that is both stylish and comfortable? Look no further than Atlas, available for hire at our event hire company in Ireland. With Atlas, you can create a stunning and inviting atmosphere for your guests that is sure to impress.",
    url: "https://www.hireall.ie/atlas/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/102/edit",
  },
  {
    id: 103,
    storeName: "HireAll",
    type: "brand",
    name: "Salt",
    page_title: "Event Equipment Rental: Salt for Hire in Ireland",
    meta_description:
      "For unique and stylish event decor, look no further than Salt, available for hire at our event hire company in Ireland. With Salt, you can create a beautiful and memorable event that your guests will never forget.",
    url: "https://www.hireall.ie/salt/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/103/edit",
  },
  {
    id: 104,
    storeName: "HireAll",
    type: "brand",
    name: "Victoria",
    page_title: "Hire Victoria Gold Rim Glassware for Your Event in Ireland",
    meta_description:
      "Create a beautiful and elegant event with Victoria tableware, available for hire at our event hire company in Ireland. Whether it's a wedding or corporate event, Victoria is sure to add a touch of sophistication to your table setting.",
    url: "https://www.hireall.ie/victoria/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/104/edit",
  },
  {
    id: 105,
    storeName: "HireAll",
    type: "brand",
    name: "HireAll",
    page_title:
      "Event Equipment Rental: HireAll for Your Event Needs in Ireland",
    meta_description:
      "Need event equipment and furniture for your upcoming event? Look no further than HireAll, the premier event hire company in Ireland. With a wide range of high-quality equipment and furniture available for hire, HireAll has everything you need to make your event a success.",
    url: "https://www.hireall.ie/hireall/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/105/edit",
  },
  {
    id: 106,
    storeName: "HireAll",
    type: "brand",
    name: "Milano",
    page_title: "Rent Milano Cutlery for Your Event in Ireland",
    meta_description:
      "Create a stylish and modern event with Milano furniture, available for hire at our event hire company in Ireland. With Milano, you can create a stunning and comfortable atmosphere for your guests that is sure to impress.",
    url: "https://www.hireall.ie/milano/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/106/edit",
  },
  {
    id: 107,
    storeName: "HireAll",
    type: "brand",
    name: "Regency",
    page_title: "Hire Regency Cutlery for Your Event in Ireland",
    meta_description:
      "Make your event truly unforgettable with Regency furniture, available for hire at our event hire company in Ireland. Whether it's a wedding or corporate event, Regency is sure to add a touch of elegance and sophistication to your event decor.",
    url: "https://www.hireall.ie/regency/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/107/edit",
  },
  {
    id: 108,
    storeName: "HireAll",
    type: "brand",
    name: "GLOBE",
    page_title: "Event Furniture Rental: GLOBE for Hire in Ireland",
    meta_description:
      "Create a unique and memorable event with GLOBE lighting, available for hire at our event hire company in Ireland. With GLOBE, you can add a touch of magic and wonder to your event decor that is sure to impress your guests.",
    url: "https://www.hireall.ie/globe/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/108/edit",
  },
  {
    id: 109,
    storeName: "HireAll",
    type: "brand",
    name: "Kilner",
    page_title: "Hire Kilner Jars and Dispensers for Your Event in Ireland",
    meta_description:
      "Impress your guests with Kilner drink dispensers, available for hire at our event hire company in Ireland. Whether it's a wedding or corporate event, Kilner is the perfect choice for those who want to add a touch of vintage charm to their event decor.",
    url: "https://www.hireall.ie/kilner/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/109/edit",
  },
  {
    id: 110,
    storeName: "HireAll",
    type: "brand",
    name: "Omega",
    page_title: "Rent Omega Cutlery for Your Event in Ireland",
    meta_description:
      "Ensure that your event runs smoothly with Omega catering equipment, available for hire at our event hire company in Ireland. From cooking equipment to refrigeration, Omega has everything you need to create delicious and memorable dishes for your guests.",
    url: "https://www.hireall.ie/omega/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/110/edit",
  },
  {
    id: 111,
    storeName: "HireAll",
    type: "brand",
    name: "Villeroy & Boch",
    page_title: "Hire Villeroy & Boch Tableware for Your Event in Ireland",
    meta_description:
      "Create a beautiful and elegant event with Villeroy & Boch tableware, available for hire at our event hire company in Ireland. Whether it's a wedding or corporate event, Villeroy & Boch is sure to add a touch of sophistication to your table setting.",
    url: "https://www.hireall.ie/villeroy-boch/",
    edit: "https://store-o8co022yz5.mybigcommerce.com/manage/products/brands/111/edit",
  },
];
async function main() {
  for (const page of data) {
    try {
      console.log(`updating brand: ${page.name}`);
      await updateBrand(page.id, {
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
