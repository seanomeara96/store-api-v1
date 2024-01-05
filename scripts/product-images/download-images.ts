import download from "image-downloader";

import path from "path";

const folderName = "images";
const images = [
  "http://www.saltswitch.es/img/items/30-Grapefruit-honey-tea-Zero.jpg",
  "http://www.saltswitch.es/img/items/32-grape-paradise-limited-zero.jpg",
  "http://www.saltswitch.es/img/items/34-grapefruit-strawberry-limited-zero.jpg",
  "http://www.saltswitch.es/img/items/24-apple-ice-zero.jpg",
  "http://www.saltswitch.es/img/items/25-banana-ice-zero.jpg",
  "http://www.saltswitch.es/img/items/26-blueberry-raspberry-zero.jpg",
  "http://www.saltswitch.es/img/items/36-lush-ice-limited-zero.jpg",
  "http://www.saltswitch.es/img/items/28-strawberry-lychee-zero.jpg",
  "http://www.saltswitch.es/img/items/29-Lemon-Soda-Zero.jpg",
  "http://www.saltswitch.es/img/items/30-Grapefruit-honey-tea-Zero.jpg",
  "http://www.saltswitch.es/img/items/32-grape-paradise-limited-zero.jpg",
  "http://www.saltswitch.es/img/items/34-grapefruit-strawberry-limited-zero.jpg",
  "http://www.saltswitch.es/img/items/24-apple-ice-zero.jpg",
  "http://www.saltswitch.es/img/items/25-banana-ice-zero.jpg",
  "http://www.saltswitch.es/img/items/26-blueberry-raspberry-zero.jpg",
  "http://www.saltswitch.es/img/items/36-lush-ice-limited-zero.jpg",
  "http://www.saltswitch.es/img/items/28-strawberry-lychee-zero.jpg",
  "http://www.saltswitch.es/img/items/29-Lemon-Soda-Zero.jpg",
  "http://www.saltswitch.es/img/items/30-Grapefruit-honey-tea-Zero.jpg",
  "http://www.saltswitch.es/img/items/32-grape-paradise-limited-zero.jpg",
  "http://www.saltswitch.es/img/items/34-grapefruit-strawberry-limited-zero.jpg",
  "http://www.saltswitch.es/img/items/24-apple-ice-zero.jpg",
  "http://www.saltswitch.es/img/items/25-banana-ice-zero.jpg",
  "http://www.saltswitch.es/img/items/26-blueberry-raspberry-zero.jpg",
  "http://www.saltswitch.es/img/items/36-lush-ice-limited-zero.jpg",
  "http://www.saltswitch.es/img/items/28-strawberry-lychee-zero.jpg",
  "http://www.saltswitch.es/img/items/29-Lemon-Soda-Zero.jpg",
  "http://www.saltswitch.es/img/items/30-Grapefruit-honey-tea-Zero.jpg",
  "http://www.saltswitch.es/img/items/32-grape-paradise-limited-zero.jpg",
  "http://www.saltswitch.es/img/items/34-grapefruit-strawberry-limited-zero.jpg",
  "http://www.saltswitch.es/img/items/24-apple-ice-zero.jpg",
  "http://www.saltswitch.es/img/items/25-banana-ice-zero.jpg",
  "http://www.saltswitch.es/img/items/26-blueberry-raspberry-zero.jpg",
];

async function main() {
  for (const image of images) {
    const options = {
      url: image,
      dest: path.resolve(__dirname, folderName),
      extractFilename: true,
    };
    await download.image(options).catch(console.log);
  }
}
main();
