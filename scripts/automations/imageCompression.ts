import axios from "axios";
import sharp from "sharp";
import { deleteProductImage } from "../../functions/images/deleteProductImage";
import { createProductImageFromBuffer } from "../../functions/images/createProductImage";
import path from "path";
import fs from "fs";
import { updateProductImage } from "../../functions/images/updateProductImage";
const { config } = require("../../config/config");

// Helper function to format bytes into human-readable units (KB, MB, etc.)
function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Calculate the value in the appropriate unit
  const value = bytes / Math.pow(k, i);

  // Handle cases where decimals should be omitted for Bytes
  const formattedValue =
    i === 0
      ? value.toString() // No decimals for Bytes
      : value.toFixed(decimals);

  return `${formattedValue} ${sizes[i]}`;
}

async function compressImage(imageUrl: string): Promise<{
  originalSize: number;
  compressedBuffer: Buffer;
  compressedSize: number;
}> {
  try {
    // Fetch the image
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");

    // Calculate original size
    const originalSize = Buffer.byteLength(imageBuffer);
    console.log(`Original size: ${formatBytes(originalSize)}`);

    // Determine quality based on original size
    const quality = originalSize > 770 * 1024 ? 50 : 80; // 770 KB threshold
    console.log(`Using quality: ${quality}`);

    // Load the image metadata to get dimensions
    const metadata = await sharp(imageBuffer).metadata();
    const { width, height } = metadata;

    // Check if both dimensions are greater than 1000px
    if (width && height && width > 1000 && height > 1000) {
      console.log("Resizing image to maintain aspect ratio...");
      // Determine the shortest side and scale it to 1000px
      const scaleFactor = 1000 / Math.min(width, height);

      // Resize and compress the image
      const resizedBuffer = await sharp(imageBuffer)
        .resize(
          Math.round(width * scaleFactor),
          Math.round(height * scaleFactor),
          {
            fit: "inside", // Maintain aspect ratio
            withoutEnlargement: true, // Prevent enlarging if already smaller
          }
        )
        .jpeg({ quality })
        .toBuffer();

      // Calculate compressed size
      const compressedSize = Buffer.byteLength(resizedBuffer);
      console.log(`Compressed size: ${formatBytes(compressedSize)}`);

      return { originalSize, compressedBuffer: resizedBuffer, compressedSize };
    } else {
      console.log(
        "Image dimensions are within limits. Compressing without resizing..."
      );
      // Compress the image without resizing
      const compressedBuffer = await sharp(imageBuffer)
        .jpeg({ quality })
        .toBuffer();

      // Calculate compressed size
      const compressedSize = Buffer.byteLength(compressedBuffer);
      console.log(`Compressed size: ${formatBytes(compressedSize)}`);

      return { originalSize, compressedBuffer, compressedSize };
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const data = [{"product_id":1101,"image_id":5433,"sort_order":1,"is_thumbnail":null,"sku":"269","name":"Milano Conference Chair","image_url":"https://store-jqwssthhhd.mybigcommerce.com/product_images/u/201/Milano_Conference_Chairimage__31090.jpg","file_size":117004,"width":1000,"height":1000,"excesive_file_size_gt_70_kb":1,"not_square":null,"excessive_file_dimensions":null,"insufficent_file_dimensions":null},
{"product_id":1621,"image_id":4732,"sort_order":0,"is_thumbnail":1,"sku":"CAB001","name":"Office Cabinet 2 Door","image_url":"https://store-jqwssthhhd.mybigcommerce.com/product_images/h/957/Office-Cabinet-2-Door-29in-High__41270__72275.jpg","file_size":142371,"width":800,"height":800,"excesive_file_size_gt_70_kb":1,"not_square":null,"excessive_file_dimensions":null,"insufficent_file_dimensions":null},
{"product_id":1622,"image_id":4733,"sort_order":0,"is_thumbnail":1,"sku":"PED001","name":"Low Office Pedestal","image_url":"https://store-jqwssthhhd.mybigcommerce.com/product_images/m/290/Office-Pedestal-Low__97626__27793.jpg","file_size":115851,"width":800,"height":800,"excesive_file_size_gt_70_kb":1,"not_square":null,"excessive_file_dimensions":null,"insufficent_file_dimensions":null},
{"product_id":1623,"image_id":4734,"sort_order":0,"is_thumbnail":1,"sku":"1079","name":"Office Waste Bin","image_url":"https://store-jqwssthhhd.mybigcommerce.com/product_images/e/713/Office-Waste-Bin__26108__62731.jpg","file_size":101105,"width":800,"height":800,"excesive_file_size_gt_70_kb":1,"not_square":null,"excessive_file_dimensions":null,"insufficent_file_dimensions":null},
{"product_id":1651,"image_id":6014,"sort_order":1,"is_thumbnail":null,"sku":"AS0005","name":"Aspen Accent Armchair","image_url":"https://store-jqwssthhhd.mybigcommerce.com/product_images/r/760/Aspen_Accent_Armchairimage__78958.jpg","file_size":106322,"width":1000,"height":1000,"excesive_file_size_gt_70_kb":1,"not_square":null,"excessive_file_dimensions":null,"insufficent_file_dimensions":null},
{"product_id":1651,"image_id":6015,"sort_order":9,"is_thumbnail":null,"sku":"AS0005","name":"Aspen Accent Armchair","image_url":"https://store-jqwssthhhd.mybigcommerce.com/product_images/a/512/Aspen_Accent_Armchairimage__36694.jpg","file_size":198417,"width":1000,"height":1000,"excesive_file_size_gt_70_kb":1,"not_square":null,"excessive_file_dimensions":null,"insufficent_file_dimensions":null},
{"product_id":1651,"image_id":6016,"sort_order":10,"is_thumbnail":null,"sku":"AS0005","name":"Aspen Accent Armchair","image_url":"https://store-jqwssthhhd.mybigcommerce.com/product_images/r/149/Aspen_Accent_Armchairimage__23811.jpg","file_size":199047,"width":1000,"height":1000,"excesive_file_size_gt_70_kb":1,"not_square":null,"excessive_file_dimensions":null,"insufficent_file_dimensions":null},
{"product_id":1652,"image_id":6017,"sort_order":1,"is_thumbnail":null,"sku":"BR0005","name":"Bourbon Mid-Century Armchair","image_url":"https://store-jqwssthhhd.mybigcommerce.com/product_images/l/440/Bourbon_Mid-Century_Armchairimage__25857.jpg","file_size":120173,"width":1000,"height":1000,"excesive_file_size_gt_70_kb":1,"not_square":null,"excessive_file_dimensions":null,"insufficent_file_dimensions":null}];

async function main() {
  try {
    config("ch");

    console.log(`${data.length} images to compress`);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    let totalOriginalSize = 0;
    let totalCompressedSize = 0;

    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const row = data[i];
      console.log(`updating image for product ${row.product_id}`);
      console.log(row.image_url);

      // Example usage
      const res = await compressImage(row.image_url);
      totalOriginalSize += res.originalSize;
      totalCompressedSize += res.compressedSize;

      console.log(`deleting product image...`);
      try {
        await deleteProductImage(row.product_id, row.image_id);
      } catch {
        throw `could not delete product image for ${row.product_id}`;
      }

      const image = await createProductImageFromBuffer(
        row.product_id,
        res.compressedBuffer,
        row.name + "image",
        Boolean(row.is_thumbnail),
        row.sort_order
      );
      // multipart form is losing these details so I am adding these in a separate api call
      const foo = await updateProductImage(image.product_id, image.id, {
        is_thumbnail: Boolean(row.is_thumbnail),
        sort_order: row.sort_order,
      });

      console.log(foo);

      fs.appendFileSync(
        path.resolve(__dirname, "image-compression.log"),
        `Compressed image for product(${row.product_id}) sku:${
          row.sku
        } reduced size by  ${formatBytes(
          res.originalSize - res.compressedSize
        )}`,
        { encoding: "utf-8" }
      );
      console.log();
    }
    fs.appendFileSync(
      path.resolve(__dirname, "image-compression.log"),
      `${data.length} images compressed in total saving ${formatBytes(
        totalOriginalSize - totalCompressedSize
      )} in unnecessary download data for users`,
      { encoding: "utf-8" }
    );
  } catch (err) {
    console.log(err);
  }
}
main();
