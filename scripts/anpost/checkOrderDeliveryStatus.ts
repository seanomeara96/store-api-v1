import fs from "fs";
import { getItemRecords } from "../../anpost/getItemRecords";
import { ItemRecord } from "../../anpost/parseFileContents";
import { Order } from "../../functions/orders/Order";
import { getAllOrders } from "../../functions/orders/getAllOrders";
import {
  Shipment,
  getOrderShipment,
} from "../../functions/orders/getOrderShipment";
import { output } from "../utils/output";
import path from "path";

async function report(store: string, itemRecords: ItemRecord[]) {
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
        const itemIsDelivered = item.DELIVERY_STATUS == "DELIVERED";

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

    let gmails = []
    for(const o of out){
      if(o.email.includes("gmail.com")){
        gmails.push(o)
      }
    }

    fs.writeFileSync(path.resolve(__dirname, `./${store}-email.json`), JSON.stringify(gmails), {encoding: "utf-8"})
    console.log("done", store)
  } catch (err) {
    console.log(err);
  }
}

async function main() {
  require("../../config/config")
  const itemRecords = await getItemRecords();
  for (const store of ["bf", "ih"]) {
    await report(store, itemRecords);
  }
}
main();
