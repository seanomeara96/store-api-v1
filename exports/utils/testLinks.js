// broken down to for easier understanding

const { default: axios } = require("axios");

const concat = (list) => {
  return Array.prototype.concat.bind(list);
};
const promiseConcat = (nextFunction) => {
  return (x) => {
    return nextFunction().then(concat(x));
  };
};

/*
 * serial executes Promises sequentially.
 * @param {funcs} An array of funcs that return promises.
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * serial(urls.map(url => () => $.ajax(url)))
 *     .then(console.log.bind(console))
 */
const serial = (funcs) => {
  return funcs.reduce(promiseReduce, Promise.resolve([]));
};
// [() => {return axios.get("https://www.beautyfeatures.ie/dermo-suavina/")}, () => {return axios.get("https://www.beautyfeatures.ie/rebeluna/")}]

const promiseReduce = (prmise, nextFunction) => {
  return prmise.then(promiseConcat(nextFunction));
};



let links = [
  "https://www.beautyfeatures.ie/brands/Burts-Bees.html",
  "https://www.beautyfeatures.ie/brands/Carin.html",
  "https://www.beautyfeatures.ie/eleven-australia/",
  "https://www.beautyfeatures.ie/brands/Dermalogica.html",
  "https://www.beautyfeatures.ie/brands/Clarins.html",
  "https://www.beautyfeatures.ie/brands/Decleor.html",
  "https://www.beautyfeatures.ie/brands/Trilogy.html",
  "https://www.beautyfeatures.ie/brands/Kerastase.html",
  "https://www.beautyfeatures.ie/brands/Alfaparf.html",
  "https://www.beautyfeatures.ie/brands/Redken.html",
  "https://www.beautyfeatures.ie/brands/Nioxin.html",
  "https://www.beautyfeatures.ie/brands/Joico-.html",
  "https://www.beautyfeatures.ie/brands/REN-Skincare.html",
  "https://www.beautyfeatures.ie/brands/Mama-Mio/",
  "https://www.beautyfeatures.ie/brands/FitFlop.html",
  "https://www.beautyfeatures.ie/brands/Moroccanoil.html",
  "https://www.beautyfeatures.ie/brands/Amazing-Cosmetics.html",
  "https://www.beautyfeatures.ie/brands/Celebrity-Slim.html",
  "https://www.beautyfeatures.ie/brands/Tangle-Teezer.html",
  "https://www.beautyfeatures.ie/brands/Pestle-%26-Mortar.html",
  "https://www.beautyfeatures.ie/brands/Pureology.html",
  "https://www.beautyfeatures.ie/brands/OLAPLEX.html",
  "https://www.beautyfeatures.ie/brands/Thalgo.html",
  "https://www.beautyfeatures.ie/brands/The-Ordinary.html",
  "https://www.beautyfeatures.ie/brands/COLOR-WOW.html",
  "https://www.beautyfeatures.ie/brands/NIOD.html",
  "https://www.beautyfeatures.ie/brands/Seoulista.html",
  "https://www.beautyfeatures.ie/brands/Aurora.html",
  "https://www.beautyfeatures.ie/brands/Actyva.html",
  "https://www.beautyfeatures.ie/baby-foot/",
  "https://www.beautyfeatures.ie/filorga/",
  "https://www.beautyfeatures.ie/the-inkey-list/",
  "https://www.beautyfeatures.ie/basq/",
  "https://www.beautyfeatures.ie/revolution/",
  "https://www.beautyfeatures.ie/beauty-blender/",
  "https://www.beautyfeatures.ie/nak/",
  "https://www.beautyfeatures.ie/kemon/",
  "https://www.beautyfeatures.ie/brands/The-Wet-Brush.html",
  "https://www.beautyfeatures.ie/advanced-nutrition/",
  "https://www.beautyfeatures.ie/bioderma/",
  "https://www.beautyfeatures.ie/embryolisse/",
  "https://www.beautyfeatures.ie/p-louise/",
  "https://www.beautyfeatures.ie/blank-canvas/",
  "https://www.beautyfeatures.ie/matrix/",
  "https://www.beautyfeatures.ie/biolage/",
  "https://www.beautyfeatures.ie/hawthorn-handmade-skincare/",
  "https://www.beautyfeatures.ie/mio/",
  "https://www.beautyfeatures.ie/r-co/",
  "https://www.beautyfeatures.ie/alterna/",
  "https://www.beautyfeatures.ie/cerave/",
  "https://www.beautyfeatures.ie/skin-formula/",
  "https://www.beautyfeatures.ie/olos/",
  "https://www.beautyfeatures.ie/reform-skincare/",
  "https://www.beautyfeatures.ie/loreal-paris/",
  "https://www.beautyfeatures.ie/the-belle-brush/",
  "https://www.beautyfeatures.ie/skinician/",
  "https://www.beautyfeatures.ie/beverlyhills-formula/",
  "https://www.beautyfeatures.ie/cb12/",
  "https://www.beautyfeatures.ie/spotlight/",
  "https://www.beautyfeatures.ie/sosu/",
  "https://www.beautyfeatures.ie/upgrade/",
  "https://www.beautyfeatures.ie/tonik/",
  "https://www.beautyfeatures.ie/moxi-loves/",
  "https://www.beautyfeatures.ie/human-kind/",
  "https://www.beautyfeatures.ie/sculpted-by-aimee/",
  "https://www.beautyfeatures.ie/cantu/",
  "https://www.beautyfeatures.ie/dermasuri/",
  "https://www.beautyfeatures.ie/caudalie/",
  "https://www.beautyfeatures.ie/garnier/",
  "https://www.beautyfeatures.ie/biabelle-beauty/",
  "https://www.beautyfeatures.ie/astra/",
  "https://www.beautyfeatures.ie/captain-fawcett/",
  "https://www.beautyfeatures.ie/dapper-dan/",
  "https://www.beautyfeatures.ie/elie-saab/",
  "https://www.beautyfeatures.ie/gillette/",
  "https://www.beautyfeatures.ie/narciso-rodriguez/",
  "https://www.beautyfeatures.ie/parker/",
  "https://www.beautyfeatures.ie/proraso/",
  "https://www.beautyfeatures.ie/shiseido/",
  "https://www.beautyfeatures.ie/slick-gorilla/",
  "https://www.beautyfeatures.ie/tend-skin/",
  "https://www.beautyfeatures.ie/avant-skincare/",
  "https://www.beautyfeatures.ie/18-21-man-made/",
  "https://www.beautyfeatures.ie/remescar/",
  "https://www.beautyfeatures.ie/la-roche-posay/",
  "https://www.beautyfeatures.ie/phyto-1/",
  "https://www.beautyfeatures.ie/we-are-paradoxx/",
  "https://www.beautyfeatures.ie/aliso/",
  "https://www.beautyfeatures.ie/nuxe/",
  "https://www.beautyfeatures.ie/solgar/",
  "https://www.beautyfeatures.ie/bleach-london/",
  "https://www.beautyfeatures.ie/duo/",
  "https://www.beautyfeatures.ie/cocoa-brown/",
  "https://www.beautyfeatures.ie/foreo/",
  "https://www.beautyfeatures.ie/dolce-gabbana/",
  "https://www.beautyfeatures.ie/issey-miyake/",
  "https://www.beautyfeatures.ie/ariana-grande/",
  "https://www.beautyfeatures.ie/elle/",
  "https://www.beautyfeatures.ie/batiste/",
  "https://www.beautyfeatures.ie/indeed-labs/",
  "https://www.beautyfeatures.ie/beautyfeatures/",
  "https://www.beautyfeatures.ie/carter-beauty/",
  "https://www.beautyfeatures.ie/wella-professional/",
  "https://www.beautyfeatures.ie/dr-brandt/",
  "https://www.beautyfeatures.ie/elemis-1/",
  "https://www.beautyfeatures.ie/image/",
  "https://www.beautyfeatures.ie/rebeluna/",
  "https://www.beautyfeatures.ie/dermo-suavina/",
];
let mappedLinks = links.map((link) => () => axios.get(link));
// [() => {return axios.get("https://www.beautyfeatures.ie/dermo-suavina/")}, () => {return axios.get("https://www.beautyfeatures.ie/rebeluna/")}]
serial(mappedLinks);
