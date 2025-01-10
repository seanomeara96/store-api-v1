import Replicate from "replicate";
import sharp from "sharp";
import axios from "axios";
import path from "path";


require("../../config/config");

type Detection = {
  bbox: [number, number, number, number]; // Represents [x1, y1, x2, y2] coordinates
  label: string; // The label of the detected object
  confidence: number; // Confidence score of the detection
};

type Detections = Detection[];

async function getDetections(imageString: string): Promise<Detections> {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const output = (await replicate.run(
    "adirik/grounding-dino:efd10a8ddc57ea28773327e881ce95e20cc1d734c589f7dd01d2036921ed78aa",
    {
      input: {
        image: imageString,
        query: "collection of products and box / packaging",
        box_threshold: 0.2,
        text_threshold: 0.2,
        show_visualisation: false,
      },
    }
  )) as any;
  return output.detections;
}

function overallBoundaryBox(detections: Detections): number[] {
  let [minX, maxY, maxX, minY] = [0, 0, 0, 0];
  for (let i = 0; i < detections.length; i++) {
    const detection = detections[i];
    if (i === 0) {
      [minX, maxY, maxX, minY] = detection.bbox;
    }
    const [x1, y1, x2, y2] = detection.bbox;
    if (x1 <= minX) {
      minX = x1;
    }
    if (x1 >= maxX) {
      maxX = x1;
    }
    if (x2 <= minX) {
      minX = x2;
    }
    if (x2 >= maxX) {
      maxX = x2;
    }

    if (y1 <= minY) {
      minY = y1;
    }
    if (y1 >= maxY) {
      maxY = y1;
    }
    if (y2 <= minY) {
      minY = y2;
    }
    if (y2 >= maxY) {
      maxY = y2;
    }
  }
  return [minX, maxY, maxX, minY];
}

async function getImageBuffer(imagePath: string): Promise<Buffer> {
  const response = await axios.get(imagePath, { responseType: "arraybuffer" });
  return Buffer.from(response.data);
}

async function main() {
  try {
    const image =
      "https://millies.ie/cdn/shop/files/Inkey_f5c54c10-4b51-48fe-a127-37131ed6c0dd.jpg?v=1734620262&width=720";
    const detections = await getDetections(image);
    const [minX, maxY, maxX, minY] = overallBoundaryBox(detections);

    console.log([minX, maxY, maxX, minY])

    let imageMetadata = await sharp(await getImageBuffer(image)).metadata();
    const [left, y, width, height] = [
      minX, // Ensure bbox[0] is a number
      maxY, // Ensure bbox[1] is a number
      maxX - minX, // Calculate width
      maxY - minY, // Calculate height
    ];
    const originalImageHeight = imageMetadata.height!;
    const top = originalImageHeight - y;
    console.log("height", height)

    if (left < 0) {
      throw new Error(`Invalid extract area: left (${left}) is less than 0.`);
    }

    if (top < 0) {
      throw new Error(`Invalid extract area: top (${top}) is less than 0.`);
    }

    if (width <= 0) {
      throw new Error(
        `Invalid extract area: width (${width}) must be greater than 0.`
      );
    }

    if (height <= 0) {
      throw new Error(
        `Invalid extract area: height (${height}) must be greater than 0.`
      );
    }

    if (left + width > imageMetadata.width!) {
      throw new Error(
        `Invalid extract area: left (${left}) + width (${width}) exceeds image width (${imageMetadata.width!}).`
      );
    }

    if (top + height > imageMetadata.height!) {
      throw new Error(
        `Invalid extract area: top (${top}) + height (${height}) exceeds image height (${imageMetadata.height!}).`
      );
    }

    let img = sharp(await getImageBuffer(image));
    img = img.extract({ left, top, width, height });

    await img.toFile(path.resolve(__dirname, "img-preview.jpg"));

    let resizeOptions: any = {};
    const isTall = height > width;
    // const isWide = width > height

    if (isTall) {
      resizeOptions.height = 730;
    } else {
      resizeOptions.width = 700;
    }
    img = img.resize(resizeOptions);

    const background = { r: 255, g: 255, b: 255, alpha: 1 };
    imageMetadata = await sharp(await img.toBuffer()).metadata();

    img = img.extend({
      bottom: 20,
      right: Math.round((800 - imageMetadata.width!) / 2),
      left: Math.round((800 - imageMetadata.width!) / 2),
      top: Math.round(800 - 20 - imageMetadata.height!),
      background,
    });

    await img.toFile(path.resolve(__dirname, "img-test.jpg"));
  } catch (err) {
    console.log(err);
  }
}

main();
