import path from "path";
import fs from "fs";
import { getItemRecords } from "../../anpost/getItemRecords";
import { ItemRecord } from "../../anpost/parseFileContents";
import { Order } from "../../functions/orders/Order";
import { getAllOrders } from "../../functions/orders/getAllOrders";
import {
  Shipment,
  getOrderShipment,
} from "../../functions/orders/getOrderShipment";
import {
  sendGooglReviewRequestEmail,
  sendTrustpilotReviewRequestEmail,
} from "../email/google-review";

function getAnPostItemCodeFromTrackingNumber(string: string) {
  return string.replace(/^CE|IE$/g, "");
}

type store = "bf" | "ih";
async function report(store: store, itemRecords: ItemRecord[]) {
  require("../../config/config").config(store, 2);
  try {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 3); // oldest date default 2
    minDate.setHours(14, 0, 0, 0);

    // Yesterday at 11:59 pm
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 1); // most recent date
    maxDate.setHours(13, 59, 59, 999);

    const orders = await getAllOrders({
      min_date_created: minDate.toISOString(),
      max_date_created: maxDate.toISOString(),
    });

    type OrderAndShipment = {
      order: Order;
      shipment: Shipment;
      deliveryRecord: ItemRecord | undefined;
    };
    const anPostOrdersAndShipments: OrderAndShipment[] = [];

    for (let i = 0; i < orders.length; i++) {
      console.log(`order shipment ${i + 1} of ${orders.length}`);
      const order = orders[i];
      console.log(order.id);
      const shipments = await getOrderShipment(order.id);
      const shipment = shipments[0];
      if (!shipment) {
        console.log(`no shipment on this order`, order.id);
        continue;
      }

      const hasTrackingNumber = shipment.tracking_number;
      const isAnPostTrackingNumber = shipment.tracking_number.startsWith("CE");

      if (hasTrackingNumber && isAnPostTrackingNumber) {
        anPostOrdersAndShipments.push({
          order,
          shipment,
          deliveryRecord: undefined,
        });
      }
    }

    for (let i = 0; i < anPostOrdersAndShipments.length; i++) {
      const data = anPostOrdersAndShipments[i];

      const deliveryRecord = itemRecords.find(function (item) {
        const { tracking_number } = data.shipment;
        const itemNumber = getAnPostItemCodeFromTrackingNumber(tracking_number);
        const matchingCode = String(item.ITEM_NUMBER) === itemNumber;
        const itemIsDelivered = item.DELIVERY_STATUS === "DELIVERED";
        return matchingCode && itemIsDelivered;
      });

      data.deliveryRecord = deliveryRecord;
    }

    const hasDeliveryRecord = (a: OrderAndShipment) => a.deliveryRecord;
    const ordersDelivered = anPostOrdersAndShipments.filter(hasDeliveryRecord);

    let out = ordersDelivered.map((o) => ({
      name: o.order.billing_address.first_name,
      email: o.order.billing_address.email,
      order_id: o.order.id,
      ordered_at: new Date(o.order.date_created).toISOString(),
      despatched_at: new Date(o.shipment.date_created).toISOString(),
      delivered_at: o.deliveryRecord?.SCAN_DATE,
      tracking_number: o.shipment.tracking_number,
    }));

    let gmails = [];
    let nonGmails = [];

    for (const o of out) {
      if (o.email.includes("gmail.com")) {
        gmails.push(o);
      } else {
        nonGmails.push(o);
      }
    }

    // want to cap at 100 emails and 75 25 split toward gmail
    if(store === "bf"){
      console.log("gmails capped at 50")
      gmails = gmails.slice(0, 50)
      console.log("non gmails capped at 25")
      nonGmails = nonGmails.slice(0, 25)
    }


    console.log(
      `store: ${store}, gmails: ${gmails.length}, non-gmails: ${nonGmails.length}`
    );

    await sendGooglReviewRequestEmail(gmails, store);

    // possibly remove this function after 15/2/2023
    if (store === "bf") {
      await sendTrustpilotReviewRequestEmail(nonGmails, store);
    }

    console.log("done", store);
  } catch (err) {
    console.log(err);
  }
}

function getTodaysCachePath() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");
  const todaysHyphenatedDate = `${year}-${month}-${day}`;

  const cacheFileName = todaysHyphenatedDate + ".cache.json";
  return path.resolve(__dirname, cacheFileName);
}

function cacheItemRecords(itemRecords: ItemRecord[], cacheFilePath: string) {
  const itemRecordsString = JSON.stringify(itemRecords);
  // save down the records for future reference
  fs.writeFileSync(cacheFilePath, itemRecordsString, { encoding: "utf-8" });
}

async function main() {
  try {
    require("../../config/config");

    const cacheFilePath = getTodaysCachePath();
    let itemRecords;
    if (fs.existsSync(cacheFilePath)) {
      console.log(`cached data exists`);
      const fileContents = fs.readFileSync(cacheFilePath, {
        encoding: "utf-8",
      });
      itemRecords = JSON.parse(fileContents);
    } else {
      itemRecords = await getItemRecords();
    }
    cacheItemRecords(itemRecords, cacheFilePath);
    const stores = ["bf", "ih"] as store[];
    for (const store of stores) {
      await report(store, itemRecords);
    }
  } catch (err) {
    console.log(err);
  }
}
main();
