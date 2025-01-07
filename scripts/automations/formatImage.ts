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

function overallBoundaryBox(detections: Detections): Number[] {
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
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/960w/products/7102/17004/Color_WOW_Extra_Strength_Dream_Coat_Ultra_Moisturising_Anti_Frizz_Treatment_200ml__76267.1691148077.jpg?c=2";
    const detections = await getDetections(image);
    const [minX, maxY, maxX, minY] = overallBoundaryBox(detections);

    const [x, y, width, height] = [
      Number(minX), // Ensure bbox[0] is a number
      Number(maxY), // Ensure bbox[1] is a number
      Number(maxX) - Number(minX), // Calculate width
      Number(maxY) - Number(minY), // Calculate height
    ];

    // const hasVerticalAspect = height >  width

    const imageMetadata = await sharp(await getImageBuffer(image)).metadata();

    if (
      x < 0 ||
      y < 0 ||
      width <= 0 ||
      height <= 0 ||
      x + width > imageMetadata.width! ||
      y + height > imageMetadata.height!
    ) {
      throw new Error(
        `Invalid extract area: x=${x}, y=${y}, width=${width}, height=${height}`
      );
    }

    await sharp(await getImageBuffer(image))
      .extract({ left: x, top: y, width, height })
      .toFile(path.resolve(__dirname, "img-test.jpg"));
  } catch (err) {
    console.log(err);
  }
}

main();
