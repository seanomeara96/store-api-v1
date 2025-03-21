import axios from "axios";
import sharp from "sharp";
import { deleteProductImage } from "./functions/images/deleteProductImage";
import { createProductImageFromBuffer } from "./functions/images/createProductImage";
import path from "path";
import fs from "fs";
const { config } = require("./config/config");

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

const data = [
  {
    product_id: 122,
    image_id: 1899,
    sort_order: 2,
    is_thumbnail: null,
    sku: "LO69",
    name: "Neo Coffee Table - Black",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/r/785/_Z1N1805__82080.jpg",
    file_size: 198827,
    width: 2496,
    height: 1664,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 122,
    image_id: 1900,
    sort_order: 1,
    is_thumbnail: null,
    sku: "LO69",
    name: "Neo Coffee Table - Black",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/r/304/_Z1N1864__24109.jpg",
    file_size: 203557,
    width: 2496,
    height: 1664,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 124,
    image_id: 1901,
    sort_order: 1,
    is_thumbnail: null,
    sku: "LO70",
    name: "Neo Coffee Table - White",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/p/446/_Z1N1864__83398.jpg",
    file_size: 203557,
    width: 2496,
    height: 1664,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 124,
    image_id: 1902,
    sort_order: 2,
    is_thumbnail: null,
    sku: "LO70",
    name: "Neo Coffee Table - White",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/s/836/_Z1N1805__58152.jpg",
    file_size: 198827,
    width: 2496,
    height: 1664,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 127,
    image_id: 705,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "AD02",
    name: "Art Deco Comic Strip Locker Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/k/280/art-deco-comic-strip-table-plus-drawers1__17503.jpg",
    file_size: 111447,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 177,
    image_id: 539,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "1000535",
    name: "High Bar Table with Round Top",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/e/610/high_bar_octopus_front_2016__33598.jpg",
    file_size: 362598,
    width: 2040,
    height: 2040,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 177,
    image_id: 1723,
    sort_order: 6,
    is_thumbnail: null,
    sku: "1000535",
    name: "High Bar Table with Round Top",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/j/206/2_marquee_overall_1__89880.jpg",
    file_size: 371534,
    width: 2716,
    height: 2714,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 177,
    image_id: 1724,
    sort_order: 3,
    is_thumbnail: null,
    sku: "1000535",
    name: "High Bar Table with Round Top",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/e/533/DSC_3048_1__75974.jpg",
    file_size: 98874,
    width: 2734,
    height: 2720,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 177,
    image_id: 1725,
    sort_order: 2,
    is_thumbnail: null,
    sku: "1000535",
    name: "High Bar Table with Round Top",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/h/045/DSC_5868_1__31132.jpg",
    file_size: 386814,
    width: 2720,
    height: 2718,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 186,
    image_id: 652,
    sort_order: 1,
    is_thumbnail: null,
    sku: "1000560",
    name: "Table Rectangular 6ft x 36in",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/i/779/low_res_rect_table_back_view_2__64972.jpg",
    file_size: 77921,
    width: 899,
    height: 703,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 201,
    image_id: 1709,
    sort_order: 3,
    is_thumbnail: null,
    sku: "IL01",
    name: "Ice Pod Table Illuminated",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/h/083/table-x2-3resized_1__75643.jpg",
    file_size: 119195,
    width: 1081,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 201,
    image_id: 1710,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "IL01",
    name: "Ice Pod Table Illuminated",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/g/389/table-x2-1coverrezised_1__87759.jpg",
    file_size: 87630,
    width: 810,
    height: 810,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 201,
    image_id: 1711,
    sort_order: 1,
    is_thumbnail: null,
    sku: "IL01",
    name: "Ice Pod Table Illuminated",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/m/868/table-x2-2resized_1__66503.jpg",
    file_size: 220667,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 310,
    image_id: 943,
    sort_order: 2,
    is_thumbnail: null,
    sku: "1000503",
    name: "3ft Round Table (Folding)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/u/733/514_7039_1__77469.jpg",
    file_size: 1154119,
    width: 3000,
    height: 3000,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 439,
    image_id: 1732,
    sort_order: 1,
    is_thumbnail: null,
    sku: "BAR0002",
    name: "Tufted Pod Table Cream",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/d/966/tufted__69632.jpg",
    file_size: 84547,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 544,
    image_id: 1720,
    sort_order: 2,
    is_thumbnail: null,
    sku: "IL33",
    name: "Peak Pod Table Illuminated - Low",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/c/368/_Y2A1004_1__54234.jpg",
    file_size: 197517,
    width: 1489,
    height: 1488,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 562,
    image_id: 755,
    sort_order: 2,
    is_thumbnail: null,
    sku: "1000508",
    name: "Table Square 2ft x 24in",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/g/031/514_7041__70249.jpg",
    file_size: 688938,
    width: 3000,
    height: 3000,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 581,
    image_id: 1913,
    sort_order: 2,
    is_thumbnail: null,
    sku: "IL22",
    name: "Illuminated Rectangular Coffee Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/z/150/Still_02__60605.1603810431_1__21396.jpg",
    file_size: 135404,
    width: 852,
    height: 868,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 649,
    image_id: 1905,
    sort_order: 1,
    is_thumbnail: null,
    sku: "1208",
    name: "Sorrento Coffee Table White Leather",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/n/503/Additionalimages_0069_alaska_armchair_sofa_sorrento_coffee_table_3__34687.jpg",
    file_size: 94736,
    width: 416,
    height: 416,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 662,
    image_id: 798,
    sort_order: 2,
    is_thumbnail: null,
    sku: "1000511",
    name: "Table Rectangular 6ft x 30in",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/x/513/low_res_rect_table_back_view__01083.jpg",
    file_size: 77921,
    width: 899,
    height: 703,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 662,
    image_id: 3553,
    sort_order: 1,
    is_thumbnail: null,
    sku: "1000511",
    name: "Table Rectangular 6ft x 30in",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/c/537/1__69764.png",
    file_size: 289745,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 740,
    image_id: 1131,
    sort_order: 1,
    is_thumbnail: null,
    sku: "1000509",
    name: "Table Rectangular 4ft x 24in",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/k/654/514_7045_1__63421.jpg",
    file_size: 1205325,
    width: 3000,
    height: 3000,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 762,
    image_id: 4180,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "1000568",
    name: "Exam Desk 2ft x 24in",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/n/833/Untitled_design_10__82910.png",
    file_size: 89560,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 796,
    image_id: 3950,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "R001",
    name: "Rustic Oak Table (6.6ft x 33in)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/v/419/oak_table__66506.png",
    file_size: 104821,
    width: 810,
    height: 810,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 819,
    image_id: 1418,
    sort_order: 1,
    is_thumbnail: null,
    sku: "1000510",
    name: "Table Rectangular 6ft x 24in",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/f/660/low_res_rect_table_back_view_1__19596.jpg",
    file_size: 77921,
    width: 899,
    height: 703,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 907,
    image_id: 1047,
    sort_order: 1,
    is_thumbnail: null,
    sku: "1000523",
    name: "Table Rectangular 4ft x 30in",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/h/996/514_7045__57068.jpg",
    file_size: 1205325,
    width: 3000,
    height: 3000,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 936,
    image_id: 1906,
    sort_order: 1,
    is_thumbnail: null,
    sku: "L044",
    name: "Illuminated Square Coffee Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/s/174/GDB_5707-001__11183.jpg",
    file_size: 371637,
    width: 4212,
    height: 2791,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 952,
    image_id: 1426,
    sort_order: 1,
    is_thumbnail: null,
    sku: "1000504",
    name: "4ft Round Table (Folding)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/d/842/low_res_table_back_view__20168.jpg",
    file_size: 86418,
    width: 905,
    height: 904,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 992,
    image_id: 998,
    sort_order: 2,
    is_thumbnail: null,
    sku: "1000527",
    name: "Table Rectangular 8ft x 30in",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/v/477/low_res_rect_table_back_view_4__83885.jpg",
    file_size: 77921,
    width: 899,
    height: 703,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 992,
    image_id: 3554,
    sort_order: 1,
    is_thumbnail: null,
    sku: "1000527",
    name: "Table Rectangular 8ft x 30in",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/e/356/4__69529.png",
    file_size: 194672,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 998,
    image_id: 1421,
    sort_order: 2,
    is_thumbnail: null,
    sku: "1000505",
    name: "5ft Round Table (Folding)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/c/913/low_res_table_back_view_1__95573.jpg",
    file_size: 86418,
    width: 905,
    height: 904,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 998,
    image_id: 3557,
    sort_order: 1,
    is_thumbnail: null,
    sku: "1000505",
    name: "5ft Round Table (Folding)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/n/477/5__05361.png",
    file_size: 239455,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1001,
    image_id: 4516,
    sort_order: 2,
    is_thumbnail: null,
    sku: "1236",
    name: "Grass Coffee Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/y/928/Grass_Coffee_Table_1__92056.png",
    file_size: 216984,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1001,
    image_id: 4517,
    sort_order: 3,
    is_thumbnail: null,
    sku: "1236",
    name: "Grass Coffee Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/o/892/Grass_Coffee_Table_4__70965.png",
    file_size: 289104,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1001,
    image_id: 4518,
    sort_order: 1,
    is_thumbnail: null,
    sku: "1236",
    name: "Grass Coffee Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/o/723/Grass_Coffee_Table_2__08581.png",
    file_size: 325363,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1001,
    image_id: 4519,
    sort_order: 4,
    is_thumbnail: null,
    sku: "1236",
    name: "Grass Coffee Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/k/844/Grass_Coffee_Table_3__34817.png",
    file_size: 428430,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1004,
    image_id: 514,
    sort_order: 1,
    is_thumbnail: null,
    sku: "1000518",
    name: "5ft 6in Round Table (Folding)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/t/011/low_res_table_back_view_2__03649.jpg",
    file_size: 86418,
    width: 905,
    height: 904,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1045,
    image_id: 1713,
    sort_order: 2,
    is_thumbnail: null,
    sku: "IL02",
    name: "Peak Pod Table Illuminated -Tall",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/y/960/peaks_with_flowers_1__24365.jpg",
    file_size: 183269,
    width: 2707,
    height: 2708,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1045,
    image_id: 1714,
    sort_order: 1,
    is_thumbnail: null,
    sku: "IL02",
    name: "Peak Pod Table Illuminated -Tall",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/i/671/peak1b_1__46627.jpg",
    file_size: 130107,
    width: 1575,
    height: 1576,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1045,
    image_id: 1715,
    sort_order: 4,
    is_thumbnail: null,
    sku: "IL02",
    name: "Peak Pod Table Illuminated -Tall",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/l/962/peaks_purple_portrait_1__31581.jpg",
    file_size: 129599,
    width: 1398,
    height: 1398,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1045,
    image_id: 1716,
    sort_order: 3,
    is_thumbnail: null,
    sku: "IL02",
    name: "Peak Pod Table Illuminated -Tall",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/e/863/slide-peak_31_1__45603.jpg",
    file_size: 150350,
    width: 1378,
    height: 1377,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1045,
    image_id: 1717,
    sort_order: 5,
    is_thumbnail: null,
    sku: "IL02",
    name: "Peak Pod Table Illuminated -Tall",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/t/752/peak_tops_1__37546.jpg",
    file_size: 120762,
    width: 1282,
    height: 1282,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1067,
    image_id: 816,
    sort_order: 3,
    is_thumbnail: null,
    sku: "1000506",
    name: "6ft Round Table (Folding)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/j/643/low_res_table_back_view_3__31292.jpg",
    file_size: 86418,
    width: 905,
    height: 904,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1067,
    image_id: 3555,
    sort_order: 1,
    is_thumbnail: null,
    sku: "1000506",
    name: "6ft Round Table (Folding)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/m/475/5__12844.png",
    file_size: 239455,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1067,
    image_id: 3556,
    sort_order: 2,
    is_thumbnail: null,
    sku: "1000506",
    name: "6ft Round Table (Folding)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/u/354/3__11049.png",
    file_size: 318738,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1086,
    image_id: 4499,
    sort_order: 1,
    is_thumbnail: null,
    sku: "1228",
    name: "Club Coffee Table in Black",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/z/870/Black_lifestyle_coffee_table__96003.png",
    file_size: 333202,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1091,
    image_id: 1386,
    sort_order: 1,
    is_thumbnail: null,
    sku: "1000512",
    name: "Table Rectangular 8ft x 24in",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/d/266/low_res_rect_table_back_view_3__04124.jpg",
    file_size: 77921,
    width: 899,
    height: 703,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1145,
    image_id: 1735,
    sort_order: 2,
    is_thumbnail: null,
    sku: "IL02A",
    name: "Peak Pod Table Black",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/j/951/Black-Peak__72599.jpg",
    file_size: 153092,
    width: 416,
    height: 416,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1146,
    image_id: 1737,
    sort_order: 3,
    is_thumbnail: null,
    sku: "POD17+POD6",
    name: "White Square Pod Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/f/882/514_2250_1__42702.jpg",
    file_size: 399441,
    width: 2714,
    height: 2714,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1146,
    image_id: 1738,
    sort_order: 4,
    is_thumbnail: null,
    sku: "POD17+POD6",
    name: "White Square Pod Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/g/958/514_2242_1__33577.jpg",
    file_size: 286144,
    width: 2718,
    height: 2714,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1146,
    image_id: 1739,
    sort_order: 2,
    is_thumbnail: null,
    sku: "POD17+POD6",
    name: "White Square Pod Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/h/968/514_2244_1__03026.jpg",
    file_size: 402628,
    width: 2717,
    height: 2714,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1146,
    image_id: 1740,
    sort_order: 1,
    is_thumbnail: null,
    sku: "POD17+POD6",
    name: "White Square Pod Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/q/617/Additionalimages_0002_white_square_pod_table_bistro_30_inch_leg1__09515.jpg",
    file_size: 108018,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1147,
    image_id: 1742,
    sort_order: 1,
    is_thumbnail: null,
    sku: "POD21",
    name: "Pod Table Glass Round- High",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/d/721/pod-glass__23675.jpg",
    file_size: 346280,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1147,
    image_id: 1743,
    sort_order: 3,
    is_thumbnail: null,
    sku: "POD21",
    name: "Pod Table Glass Round- High",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/m/188/Milan_High_Back_White_1__18051.jpg",
    file_size: 497660,
    width: 3024,
    height: 3024,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1147,
    image_id: 1744,
    sort_order: 2,
    is_thumbnail: null,
    sku: "POD21",
    name: "Pod Table Glass Round- High",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/g/018/Milan_High_Back_White_2_1__23836.jpg",
    file_size: 577955,
    width: 3023,
    height: 3024,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1149,
    image_id: 1748,
    sort_order: 2,
    is_thumbnail: null,
    sku: "PODBIRCH",
    name: "Pod Table Birch Round Tall",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/w/527/444_1515_1__44216.jpg",
    file_size: 261598,
    width: 2714,
    height: 2714,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1149,
    image_id: 1749,
    sort_order: 1,
    is_thumbnail: null,
    sku: "PODBIRCH",
    name: "Pod Table Birch Round Tall",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/f/540/Linen-pod-table-Cover-ivory_1__82590.jpg",
    file_size: 128188,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1150,
    image_id: 1751,
    sort_order: 1,
    is_thumbnail: null,
    sku: "POD18+POD7",
    name: "Walnut Square Dining Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/k/313/Walnut-aquare__67460.jpg",
    file_size: 357838,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1150,
    image_id: 1752,
    sort_order: 2,
    is_thumbnail: null,
    sku: "POD18+POD7",
    name: "Walnut Square Dining Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/g/053/Barrels_wooden_bar_stolls_Mahogany_Chivari_3_1__08144.jpg",
    file_size: 553229,
    width: 2720,
    height: 2720,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1150,
    image_id: 4531,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "POD18+POD7",
    name: "Walnut Square Dining Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/u/582/Untitled_design_5__97546.png",
    file_size: 80041,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1151,
    image_id: 1754,
    sort_order: 1,
    is_thumbnail: null,
    sku: "POD16+POD6",
    name: "Pod Table White Round",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/l/866/Button_Stool_White_1__81423.jpg",
    file_size: 139351,
    width: 1062,
    height: 1063,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1152,
    image_id: 1758,
    sort_order: 5,
    is_thumbnail: null,
    sku: "FLOW10",
    name: "Cube Black High Bar Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/u/489/Kubo_Pod_Smart_2__29005.jpg",
    file_size: 103471,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1152,
    image_id: 1759,
    sort_order: 7,
    is_thumbnail: null,
    sku: "FLOW10",
    name: "Cube Black High Bar Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/r/728/Kubo_Pod_Smart_4__08354.jpg",
    file_size: 134820,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1152,
    image_id: 1761,
    sort_order: 6,
    is_thumbnail: null,
    sku: "FLOW10",
    name: "Cube Black High Bar Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/s/902/Kubo_Pod_Smart_3__14093.jpg",
    file_size: 105316,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1152,
    image_id: 3836,
    sort_order: 1,
    is_thumbnail: null,
    sku: "FLOW10",
    name: "Cube Black High Bar Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/e/996/Untitled_design_5__87412.png",
    file_size: 715228,
    width: 810,
    height: 810,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1152,
    image_id: 4319,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "FLOW10",
    name: "Cube Black High Bar Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/z/073/19__01162.jpg",
    file_size: 183945,
    width: 4227,
    height: 4227,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1152,
    image_id: 4320,
    sort_order: 2,
    is_thumbnail: null,
    sku: "FLOW10",
    name: "Cube Black High Bar Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/z/383/20__98284.jpg",
    file_size: 189572,
    width: 4227,
    height: 4227,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1152,
    image_id: 4321,
    sort_order: 3,
    is_thumbnail: null,
    sku: "FLOW10",
    name: "Cube Black High Bar Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/z/169/21__36344.jpg",
    file_size: 175029,
    width: 4227,
    height: 4227,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1154,
    image_id: 1770,
    sort_order: 1,
    is_thumbnail: null,
    sku: "FLOW11 (legs) FLOW13 (tabletop)",
    name: "Cube White High Bar Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/k/906/Kubo_Smart_Pod_White_2__47269.jpg",
    file_size: 109622,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1154,
    image_id: 4316,
    sort_order: 2,
    is_thumbnail: null,
    sku: "FLOW11 (legs) FLOW13 (tabletop)",
    name: "Cube White High Bar Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/e/314/17__28082.jpg",
    file_size: 174767,
    width: 4227,
    height: 4227,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1154,
    image_id: 4317,
    sort_order: 3,
    is_thumbnail: null,
    sku: "FLOW11 (legs) FLOW13 (tabletop)",
    name: "Cube White High Bar Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/b/908/18__31372.jpg",
    file_size: 160526,
    width: 4227,
    height: 4227,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1154,
    image_id: 4318,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "FLOW11 (legs) FLOW13 (tabletop)",
    name: "Cube White High Bar Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/h/050/16__40672.jpg",
    file_size: 164397,
    width: 4227,
    height: 4227,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1155,
    image_id: 1772,
    sort_order: 4,
    is_thumbnail: null,
    sku: "WOODBAR",
    name: "Wooden Barrel Pod Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/e/323/Barrels_wooden_bar_stolls_Mahogany_Chivari_1__73729.jpg",
    file_size: 539549,
    width: 2724,
    height: 2722,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1155,
    image_id: 1773,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "WOODBAR",
    name: "Wooden Barrel Pod Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/v/957/Wooden-Barrel-Table-1m__22584.jpg",
    file_size: 155439,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1155,
    image_id: 1774,
    sort_order: 1,
    is_thumbnail: null,
    sku: "WOODBAR",
    name: "Wooden Barrel Pod Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/e/168/barrell-table__98859.jpg",
    file_size: 253395,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1155,
    image_id: 1775,
    sort_order: 2,
    is_thumbnail: null,
    sku: "WOODBAR",
    name: "Wooden Barrel Pod Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/z/984/barrell-table-2__60495.jpg",
    file_size: 344229,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1155,
    image_id: 1776,
    sort_order: 3,
    is_thumbnail: null,
    sku: "WOODBAR",
    name: "Wooden Barrel Pod Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/a/650/100_4873_1__08006.jpg",
    file_size: 489193,
    width: 2481,
    height: 2482,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1157,
    image_id: 4492,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "FURN0151",
    name: "Steel Barrel Pod Table with Wooden Top - Blue",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/i/162/Blue_steel_barrell__40405.png",
    file_size: 74307,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1159,
    image_id: 4490,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "FURN0153",
    name: "Steel Barrel Pod Table with Wooden Top - Red",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/j/695/Red_steel_barrell__74388.png",
    file_size: 71830,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1164,
    image_id: 1908,
    sort_order: 2,
    is_thumbnail: null,
    sku: "ALASKA4",
    name: "Alaska Square Coffee Table - White",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/z/177/Alaska_Range__34828.jpg",
    file_size: 490064,
    width: 4032,
    height: 3024,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1164,
    image_id: 1909,
    sort_order: 1,
    is_thumbnail: null,
    sku: "ALASKA4",
    name: "Alaska Square Coffee Table - White",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/g/577/Park_Pavilion4__79238.jpg",
    file_size: 322317,
    width: 4032,
    height: 3024,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1165,
    image_id: 1915,
    sort_order: 1,
    is_thumbnail: null,
    sku: "10961D",
    name: "Kodeta Glass Coffee Table - with shelf",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/y/397/Additionalimages_0067_alaska_candy_ottoman_kodeta__09948.jpg",
    file_size: 80496,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1165,
    image_id: 1916,
    sort_order: 2,
    is_thumbnail: null,
    sku: "10961D",
    name: "Kodeta Glass Coffee Table - with shelf",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/g/534/514_2333__71597.jpg",
    file_size: 424259,
    width: 4288,
    height: 2848,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1336,
    image_id: 2878,
    sort_order: 4,
    is_thumbnail: null,
    sku: "FLOW06",
    name: "Flow Network Table (Medium)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/s/204/Flow_Medium_Network_5__37006.jpg",
    file_size: 161076,
    width: 416,
    height: 416,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1336,
    image_id: 2880,
    sort_order: 5,
    is_thumbnail: null,
    sku: "FLOW06",
    name: "Flow Network Table (Medium)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/h/337/Flow_Medium_Network_3__35414.jpg",
    file_size: 101293,
    width: 416,
    height: 416,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1336,
    image_id: 2882,
    sort_order: 6,
    is_thumbnail: null,
    sku: "FLOW06",
    name: "Flow Network Table (Medium)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/z/277/Flow_Medium_Network_4__45399.jpg",
    file_size: 87186,
    width: 416,
    height: 416,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1336,
    image_id: 3930,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "FLOW06",
    name: "Flow Network Table (Medium)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/n/452/4__80518.png",
    file_size: 84767,
    width: 810,
    height: 810,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1336,
    image_id: 3931,
    sort_order: 2,
    is_thumbnail: null,
    sku: "FLOW06",
    name: "Flow Network Table (Medium)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/n/849/5__51873.png",
    file_size: 136082,
    width: 810,
    height: 810,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1336,
    image_id: 3932,
    sort_order: 1,
    is_thumbnail: null,
    sku: "FLOW06",
    name: "Flow Network Table (Medium)",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/n/156/1__65382.png",
    file_size: 765021,
    width: 810,
    height: 810,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1337,
    image_id: 2886,
    sort_order: 4,
    is_thumbnail: null,
    sku: "FLOW05",
    name: "Flow Dinner Table (Medium) - 5.9ft",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/s/955/Flow_Dinner_Table_Medium_For_Hire_2__86788.jpg",
    file_size: 152391,
    width: 416,
    height: 416,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1337,
    image_id: 2887,
    sort_order: 5,
    is_thumbnail: null,
    sku: "FLOW05",
    name: "Flow Dinner Table (Medium) - 5.9ft",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/n/532/Flow_Dinner_Table_Medium_For_Hire_3__76531.jpg",
    file_size: 93835,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1337,
    image_id: 3928,
    sort_order: 2,
    is_thumbnail: null,
    sku: "FLOW05",
    name: "Flow Dinner Table (Medium) - 5.9ft",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/l/770/5__06014.png",
    file_size: 136082,
    width: 810,
    height: 810,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1337,
    image_id: 3929,
    sort_order: 1,
    is_thumbnail: null,
    sku: "FLOW05",
    name: "Flow Dinner Table (Medium) - 5.9ft",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/l/066/2__58518.png",
    file_size: 814295,
    width: 810,
    height: 810,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1338,
    image_id: 2890,
    sort_order: 1,
    is_thumbnail: null,
    sku: "",
    name: "Flow Grande Network High Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/a/261/Flow_Network_Table_Large_Lifestyle2__41777.jpg",
    file_size: 146331,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1338,
    image_id: 2891,
    sort_order: 5,
    is_thumbnail: null,
    sku: "",
    name: "Flow Grande Network High Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/i/913/Flow_Network_Table_Large_Lifestyle4__53778.jpg",
    file_size: 140845,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1338,
    image_id: 4515,
    sort_order: 2,
    is_thumbnail: null,
    sku: "",
    name: "Flow Grande Network High Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/h/404/Large_Flow_White_Top__86885.png",
    file_size: 201486,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1366,
    image_id: 4495,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "PALMCOF",
    name: "Palm Coffee Table / Stool",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/d/516/natural_palm_coffee_table__81956.png",
    file_size: 110493,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1401,
    image_id: 3626,
    sort_order: 7,
    is_thumbnail: null,
    sku: "FLOW21",
    name: "Flow Cube Dining Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/b/614/1__77667.png",
    file_size: 426535,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1401,
    image_id: 3627,
    sort_order: 3,
    is_thumbnail: null,
    sku: "FLOW21",
    name: "Flow Cube Dining Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/k/678/2__78293.png",
    file_size: 555998,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1401,
    image_id: 3753,
    sort_order: 4,
    is_thumbnail: null,
    sku: "FLOW21",
    name: "Flow Cube Dining Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/q/109/1__95645__10403.png",
    file_size: 426535,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1401,
    image_id: 3756,
    sort_order: 9,
    is_thumbnail: null,
    sku: "FLOW21",
    name: "Flow Cube Dining Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/b/099/2__86838__15950.png",
    file_size: 555998,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1401,
    image_id: 4227,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "FLOW21",
    name: "Flow Cube Dining Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/y/943/3__79040.png",
    file_size: 175623,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1401,
    image_id: 4228,
    sort_order: 1,
    is_thumbnail: null,
    sku: "FLOW21",
    name: "Flow Cube Dining Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/y/074/4__59796.png",
    file_size: 252942,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1474,
    image_id: 3778,
    sort_order: 1,
    is_thumbnail: null,
    sku: "PALMCOFBL",
    name: "Palm Black Coffee Table / Ottoman",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/p/569/5__60129__87775.png",
    file_size: 627362,
    width: 675,
    height: 675,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1474,
    image_id: 3780,
    sort_order: 3,
    is_thumbnail: null,
    sku: "PALMCOFBL",
    name: "Palm Black Coffee Table / Ottoman",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/h/387/4__71251__84390.png",
    file_size: 522890,
    width: 675,
    height: 675,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1474,
    image_id: 4496,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "PALMCOFBL",
    name: "Palm Black Coffee Table / Ottoman",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/r/970/Palm_coffee_table_black__64884.png",
    file_size: 89877,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1474,
    image_id: 4497,
    sort_order: 2,
    is_thumbnail: null,
    sku: "PALMCOFBL",
    name: "Palm Black Coffee Table / Ottoman",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/s/975/Palm_stool_black__07770.png",
    file_size: 88740,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1477,
    image_id: 3787,
    sort_order: 0,
    is_thumbnail: 1,
    sku: "FLOW30",
    name: "Flow Carrara Silver Marble Effect Round Dining Table - 5.9ft",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/v/631/Untitled_design_17_1__19960__25554.png",
    file_size: 160413,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1477,
    image_id: 3788,
    sort_order: 1,
    is_thumbnail: null,
    sku: "FLOW30",
    name: "Flow Carrara Silver Marble Effect Round Dining Table - 5.9ft",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/w/814/xxl_table_with_volt_chairs_1__76783__82920.jpg",
    file_size: 165904,
    width: 1333,
    height: 1333,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1477,
    image_id: 3789,
    sort_order: 2,
    is_thumbnail: null,
    sku: "FLOW30",
    name: "Flow Carrara Silver Marble Effect Round Dining Table - 5.9ft",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/d/902/Grigrio_table_top_-_detail_-_Open_House_Days_2023_1__97737__42471.jpg",
    file_size: 75081,
    width: 853,
    height: 1280,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1598,
    image_id: 4527,
    sort_order: 1,
    is_thumbnail: null,
    sku: "POD18+POD6",
    name: "Pod Table Walnut Square",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/w/850/walnut_pod_tables__39536.png",
    file_size: 486934,
    width: 1080,
    height: 1080,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1599,
    image_id: 4530,
    sort_order: 1,
    is_thumbnail: null,
    sku: "POD16+POD7",
    name: "White Round Dining Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/d/801/Button_Stool_White_1__81423.1602663839.1280.1280__46375.jpg",
    file_size: 218651,
    width: 1062,
    height: 1063,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1600,
    image_id: 4533,
    sort_order: 1,
    is_thumbnail: null,
    sku: "POD17+POD7",
    name: "White Square Dining Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/j/747/Additionalimages_0002_white_square_pod_table_bistro_30_inch_leg1__09515.1602616002.1280.1280__33069.jpg",
    file_size: 124606,
    width: 800,
    height: 800,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1600,
    image_id: 4534,
    sort_order: 3,
    is_thumbnail: null,
    sku: "POD17+POD7",
    name: "White Square Dining Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/l/179/514_2250_1__42702.1602616002.1280.1280__66697.jpg",
    file_size: 313894,
    width: 1280,
    height: 1280,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1600,
    image_id: 4535,
    sort_order: 4,
    is_thumbnail: null,
    sku: "POD17+POD7",
    name: "White Square Dining Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/l/778/514_2242_1__33577.1602616002.1280.1280__59014.jpg",
    file_size: 266897,
    width: 1280,
    height: 1278,
    excesive_file_size_gt_70_kb: 1,
  },
  {
    product_id: 1600,
    image_id: 4536,
    sort_order: 2,
    is_thumbnail: null,
    sku: "POD17+POD7",
    name: "White Square Dining Table",
    image_url:
      "https://store-jqwssthhhd.mybigcommerce.com/product_images/v/276/514_2244_1__03026.1602616002.1280.1280__31193.jpg",
    file_size: 338040,
    width: 1280,
    height: 1279,
    excesive_file_size_gt_70_kb: 1,
  },
].sort((a, b) => b.file_size - a.file_size);

async function main() {
  try {
    config("ch");

    console.log(`${data.length} images to compress`);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    let totalOriginalSize = 0
    let totalCompressedSize = 0

    for (let i = 1; i < data.length; i++) {
      console.log(i, data.length);
      const row = data[i];
      console.log(`updating image for product ${row.product_id}`);
      console.log(row.image_url);

      // Example usage
      const res = await compressImage(row.image_url);
      totalOriginalSize += res.originalSize
      totalCompressedSize += res.compressedSize

      console.log(`deleting product image...`);
      try {
        await deleteProductImage(row.product_id, row.image_id);
      } catch {
        console.log(`could not delete product image for ${row.product_id}`);
      }

      await createProductImageFromBuffer(
        row.product_id,
        res.compressedBuffer,
        row.name + "image",
        Boolean(row.is_thumbnail),
        row.sort_order
      );

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
      `${data.length} images compressed in total saving ${formatBytes(totalOriginalSize - totalCompressedSize)} in unnecessary download data for users`,
      { encoding: "utf-8" }
    );
  } catch (err) {
    console.log(err);
  }
}
main();
