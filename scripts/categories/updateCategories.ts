require("../../config/config").config("bf");
const { updateCategory } = require("../../functions/categories/updateCategory");
const data = [
  {
    id: 737,
    name: "Complexion",
    page_title: "Achieve a Flawless Complexion With Our Makeup Range",
    meta_description:
      "Achieve a flawless complexion with our range of makeup products. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 288,
    name: "Primer",
    page_title: "Prep Your Skin with Our Range of High Quality Primers",
    meta_description:
      "Create a smooth canvas for your makeup with our high-quality primers. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 753,
    name: "Foundation",
    page_title: "Find Your Perfect Foundation To Match Your Skin Tone",
    meta_description:
      "Discover a wide selection of foundations to match your skin tone. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 754,
    name: "Concealer",
    page_title: "Conceal Blemishes & Dark Circles With Our Concealer Range!",
    meta_description:
      "Cover up blemishes and dark circles with our range of concealers. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 755,
    name: "Blusher",
    page_title: "Add a Natural Flush with Our High Quality Range of Blushers",
    meta_description:
      "Get a rosy glow with our collection of blushers in various shades. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 756,
    name: "Bronzer",
    page_title: "Achieve a Sun-Kissed Look With Our Range of Bronzers",
    meta_description:
      "Contour and add warmth to your complexion with our bronzing products. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 757,
    name: "Contouring",
    page_title: "Sculpt and Define With Our Range of Contouring Products!",
    meta_description:
      "Discover how to contour & highlight your features with our range of contouring products. Shop online today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 758,
    name: "Highlighter",
    page_title: "Add a Radiant Glow With Our Selection of Highlighters",
    meta_description:
      "Add a radiant glow to your face with our selection of highlighters. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 759,
    name: "Face Powder",
    page_title: "Shop Our Range of High Quality Face Powders to Set Makeup",
    meta_description:
      "Lock in your foundation and reduce shine with our face powders. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 760,
    name: "BB & CC Creams",
    page_title: "Achieve the No Makeup Look With Our Range of BB & CC Creams",
    meta_description:
      "Achieve a natural and even complexion with our BB and CC creams. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 761,
    name: "Setting Spray",
    page_title: "Make Your Makeup Last with Setting Spray, Shop Now",
    meta_description:
      "Keep your makeup fresh all day with our long-lasting setting sprays. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 42,
    name: "Eyes",
    page_title: "Enhance Your Eyes With Our Range of Eye Makeup Products",
    meta_description:
      "Explore our wide range of eye makeup products for stunning looks. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 762,
    name: "Eye Primer",
    page_title: "Ensure your Eyeshadow Stays in Place With Our Eye Primers",
    meta_description:
      "Ensure your eyeshadow stays in place with our reliable eye primers. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 763,
    name: "Eye Shadow",
    page_title: "Create Mesmerizing Looks with Our Range of Eye Shadows",
    meta_description:
      "Discover a variety of shades and finishes in our eye shadow collection. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 764,
    name: "Eyeliner/Kohl Pencils",
    page_title: "Define Your Eyes With Our Range of Eyeliners & Pencils",
    meta_description:
      "Achieve precise and dramatic eye looks with our eyeliners and pencils. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 765,
    name: "Mascara",
    page_title: "Get Luscious Lashes with Our Range of Mascaras",
    meta_description:
      "Lengthen, volumize, and define your lashes with our mascaras. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 766,
    name: "False Lashes/Eyelash Glue",
    page_title: "Shop Our Range of False Lashes & Reliable Eyelash Glue",
    meta_description:
      "Achieve glamorous looks with our false lashes and reliable eyelash glue. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 708,
    name: "Brows",
    page_title: "Shape & Define Your Eyebrows With Our Range of Brow Products",
    meta_description:
      "Shape and define your eyebrows with our range of brow products. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 767,
    name: "Brow Pencils",
    page_title: "Achieve Natural Looking Brows With our Range of Brow Pencils",
    meta_description:
      "Achieve natural-looking brows with our precise brow pencils. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 768,
    name: "Brow Gel",
    page_title: "Keep Your Brows in Place All Day With Our Brow Gels!",
    meta_description:
      "Keep your brows in place all day with our long-lasting brow gels. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 769,
    name: "Brow Soap",
    page_title: "Shop Our Specially Formulated Brow Soap.",
    meta_description:
      "Get the trendy fluffy brow look with our specially formulated brow soap. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 770,
    name: "Lash & Brow Serum",
    page_title: "Nourish & Strengthen your Lashes & Brows with our Serums!",
    meta_description:
      "Nourish and strengthen your lashes and brows with our serums. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 771,
    name: "Lipsticks",
    page_title: "Find Your Perfect Lipstick Shade & Finish In Our Selection",
    meta_description:
      "Explore a wide range of lipsticks in various shades and finishes. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 772,
    name: "Lip Liners",
    page_title: "Define and Shape With Our Range of Lip Liners",
    meta_description:
      "Create a precise lip contour with our selection of lip liners. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 773,
    name: "Lip Glosses",
    page_title: "Plump and Shine Your Lips with Our Range of Lip Glosses",
    meta_description:
      "Achieve luscious lips with our wide selection of lip glosses. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 774,
    name: "Lip Balms",
    page_title: "Keep Your Lips Soft & Moisturized With Our Lip Balm Range",
    meta_description:
      "Keep your lips soft and moisturized with our range of lip balms. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 739,
    name: "Makeup Brushes & Applicators",
    page_title: "Shop High Quality, Affordable Makeup Brushes & Applicators",
    meta_description:
      "Discover high-quality makeup brushes & applicators for a professional finish. Shop online at BeautyFeatures.ie & enjoy next day delivery direct from Ireland",
  },
  {
    id: 775,
    name: "Makeup Brush Sets",
    page_title: "Find the Perfect Set of High Quality Makeup Brushes",
    meta_description:
      "Find the perfect set of makeup brushes to meet all your needs. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 776,
    name: "Complexion Brushes",
    page_title: "Shop Our Range of Complexion Brushes for Seamless Makeup",
    meta_description:
      "Explore our range of complexion brushes for seamless makeup application. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 777,
    name: "Concealer Brushes",
    page_title: "Shop Our Range of Concealer Brushes",
    meta_description:
      "Get a natural and flawless finish with our selection of concealer brushes. Shop online at BeautyFeatures.ie today & enjoy next day delivery direct from Ireland",
  },
  {
    id: 778,
    name: "Eye Brushes",
    page_title: "Create Stunning Eye Looks with Our Eye Brushes Range",
    meta_description:
      "Enhance your eye makeup skills with our wide variety of eye brushes. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 779,
    name: "Lip Brushes",
    page_title: "Achieve perfectly defined lips with our range of lip brushes",
    meta_description:
      "Achieve perfectly defined lips with our range of lip brushes. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 780,
    name: "Makeup Sponges",
    page_title: "Blend Seamlessly with Our Range of Makeup Sponges",
    meta_description:
      "Achieve a flawless finish with our high-quality makeup sponges. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 781,
    name: "Brush Cleaners",
    page_title: "Keep Your Makeup Brushes Clean & Fresh With Brush Cleaners",
    meta_description:
      "Maintain the longevity of your brushes with our effective brush cleaners. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 740,
    name: "Beauty Accessories",
    page_title: "Shop Our High Quality Range of Beauty Accessories",
    meta_description:
      "Discover a range of beauty accessories to elevate your makeup experience. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 782,
    name: "Dermaplaning Tools",
    page_title: "Achieve Smooth & Radiant Skin With Our Dermaplaning Tools",
    meta_description:
      "Achieve smooth and radiant skin with our dermaplaning tools. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 783,
    name: "Eyelash Curler",
    page_title: "Enhance Your Lashes with Our Range of Eyelash Curlers",
    meta_description:
      "Create stunning curled lashes with our high-quality eyelash curlers. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 784,
    name: "Tweezers",
    page_title: "Remove Unwanted Hair with Our Range of Tweezers",
    meta_description:
      "Shape your brows and remove unwanted hair with our precision tweezers. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 785,
    name: "Scissors",
    page_title: "Trim and Shape with Our Range of Scissors",
    meta_description:
      "Achieve precise cuts and trims with our high-quality scissors. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 786,
    name: "Pencil Sharpeners",
    page_title: "Keep Your Makeup Pencils Sharp and Ready",
    meta_description:
      "Maintain the sharpness of your makeup pencils with our pencil sharpeners. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 787,
    name: "Makeup Mirrors",
    page_title: "Illuminate Your Beauty with Makeup Mirrors",
    meta_description:
      "Find the perfect makeup mirror for flawless application and touch-ups. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 788,
    name: "Miscellaneous",
    page_title: "Explore Our Range of Miscellaneous Beauty Products",
    meta_description:
      "Discover unique beauty products to enhance your routine. Shop online at BeautyFeatures.ie today and enjoy next day delivery direct from Ireland",
  },
  {
    id: 789,
    name: "Makeup Bags",
    page_title: "Hold Your Makeup in Our Selection of Makeup Bags!",
    meta_description:
      "Keep beauty essentials organized with our stylish and functional makeup bags. Shop online at BeautyFeatures.ie & enjoy next day delivery direct from Ireland",
  },
];
async function main() {
  for (const page of data) {
    try {
      console.log(`updating category: ${page.name}`);
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
