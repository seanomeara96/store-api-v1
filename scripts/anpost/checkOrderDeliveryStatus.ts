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
import { sendGooglReviewRequestEmail } from "../email/google-review";

type store = "bf" | "ih";
async function report(store: store, itemRecords: ItemRecord[]) {
  require("../../config/config").config(store, 2);
  try {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 2); // oldest date
    minDate.setHours(14, 0, 0, 0);

    // Yesterday at 11:59 pm
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 1); // most recent date
    maxDate.setHours(13, 59, 59, 999);

    const orders = await getAllOrders({
      min_date_created: minDate.toISOString(),
      max_date_created: maxDate.toISOString(),
    });
    /*console.log(orders.length);
    const dates = orders.map((o) => o.date_created);
    console.log(dates[0]);
    console.log(dates[dates.length - 1]);*/

    const anPostOrdersAndShipments: {
      order: Order;
      shipment: Shipment;
      deliveryRecord: ItemRecord | undefined;
    }[] = [];

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
      if (
        shipment.tracking_number &&
        shipment.tracking_number.startsWith("CE")
      ) {
        anPostOrdersAndShipments.push({
          order,
          shipment,
          deliveryRecord: undefined,
        });
      }
    }

    // this all needs to be tested

    for (let i = 0; i < anPostOrdersAndShipments.length; i++) {
      const data = anPostOrdersAndShipments[i];

      const deliveryRecord = itemRecords.find(function (item) {
        const itemCodeString = String(item.ITEM_NUMBER);

        function getAnPostItemCodeFromTrackingNumber(string: string) {
          return string.replace(/^CE|IE$/g, "");
        }

        const shipmentItemNumber = getAnPostItemCodeFromTrackingNumber(
          data.shipment.tracking_number
        );

        const matchingCode = itemCodeString === shipmentItemNumber;
        const itemIsDelivered = item.DELIVERY_STATUS === "DELIVERED";

        return matchingCode && itemIsDelivered;
      });

      data.deliveryRecord = deliveryRecord;
      /**const timeToDelivery = shipment.date_created - deliveryRecord.SCAN_DATE;
  
      const timeisLessThan48Hours = timeToDelivery < 1000 * 60 * 60 * 48;
      if (timeisLessThan48Hours) {
        const email = order.email;
        const name = order.name;
        // send google review request email
      } */
    }
    const ordersDelivered = anPostOrdersAndShipments.filter(
      (a) => a.deliveryRecord
    );
    let out = ordersDelivered.map((o) => ({
      name: o.order.billing_address.first_name,
      email: o.order.billing_address.email,
      order_id: o.order.id,
      ordered_at: new Date(o.order.date_created).toISOString(),
      despatched_at: new Date(o.shipment.date_created).toISOString(),
      delivered_at: o.deliveryRecord?.SCAN_DATE.toISOString(),
      tracking_number: o.shipment.tracking_number,
    }));

    let gmails = [];
    for (const o of out) {
      if (o.email.includes("gmail.com")) {
        gmails.push(o);
      }
    }
    console.log(
      "calling sendGooglReviewRequestEmail with gmails.length",
      gmails.length,
      "store: ",
      store
    );
    await sendGooglReviewRequestEmail(gmails, store);
    console.log("done", store);
  } catch (err) {
    console.log(err);
  }
}

function getTodaysCachePath() {
  const today = new Date();
  const todaysHyphenatedDate = today.toLocaleDateString().replace(/\//g, "-");
  const cacheFileName = todaysHyphenatedDate + ".cache.json";
  return path.resolve(__dirname, cacheFileName);
}

function cacheItemRecords(itemRecords: ItemRecord[], cacheFilePath: string) {
  const itemRecordsNoDateObjects = itemRecords.map((r) => ({
    ...r,
    SCAN_DATE: r.SCAN_DATE.toISOString(),
  }));
  const itemRecordsString = JSON.stringify(itemRecordsNoDateObjects);
  // save down the records for future reference
  fs.writeFileSync(cacheFilePath, itemRecordsString, {encoding: "utf-8"});
}

async function main() {
  try {
    require("../../config/config");
    
    const cacheFilePath = getTodaysCachePath();
    let itemRecords;
    if (fs.existsSync(cacheFilePath)) {
      console.log(`cached data exists`);
      const fileContents = fs.readFileSync(cacheFilePath, {encoding: "utf-8"});
      itemRecords = JSON.parse(fileContents);
    }
    itemRecords = await getItemRecords();
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
