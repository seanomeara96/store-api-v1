import { getItemRecords } from "../../anpost/getItemRecords";
import { ItemRecord } from "../../anpost/parseFileContents";
import { Order } from "../../functions/orders/Order";
import { getAllOrders } from "../../functions/orders/getAllOrders";
import {
  Shipment,
  getOrderShipment,
} from "../../functions/orders/getOrderShipment";
import { output } from "../utils/output";
import path from "path"
require("../../config/config").config("bf", 2);

function getAnPostItemCodeFromTrackingNumber(string: string) {
  return string.replace(/^CE|IE$/g, "");
}

async function main() {
  // Yesterday at 12:00 am
  const yesterdayMidnight = new Date();
  yesterdayMidnight.setDate(yesterdayMidnight.getDate() - 2);
  yesterdayMidnight.setHours(14, 0, 0, 0);

  // Yesterday at 11:59 pm
  const yesterdayEndOfDay = new Date();
  yesterdayEndOfDay.setDate(yesterdayEndOfDay.getDate() - 1);
  yesterdayEndOfDay.setHours(13, 59, 59, 999);

  const orders = await getAllOrders({
    min_date_created: yesterdayMidnight.toISOString(),
    max_date_created: yesterdayEndOfDay.toISOString(),
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
    if (shipment.tracking_number && shipment.tracking_number.startsWith("CE")) {
      anPostOrdersAndShipments.push({
        order,
        shipment,
        deliveryRecord: undefined,
      });
    }
  }

  // this all needs to be tested
  const itemRecords = await getItemRecords();

  for (let i = 0; i < anPostOrdersAndShipments.length; i++) {
    const data = anPostOrdersAndShipments[i];

    const deliveryRecord = itemRecords.find(function (item) {
      const itemCodeString = String(item.ITEM_NUMBER);

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
  const out = ordersDelivered.map((o) => ({
    first_name: o.order.billing_address.first_name,
    email: o.order.billing_address.email,
    order_id: o.order.id,
    despatched_at: o.shipment.date_created,
    delivered_at: o.deliveryRecord?.SCAN_DATE.toISOString(),
    tracking_number: o.shipment.tracking_number,
  }));

  output(path.resolve(__dirname, "./output.csv"), out, true)
}
main();
