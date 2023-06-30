import { getItemRecords } from "../../anpost/getItemRecords";
import { getAllOrders } from "../../functions/orders/getAllOrders";
import { getOrderShipment } from "../../functions/orders/getOrderShipment";

require("../../config/config").config("bf", 2);

function getAnPostItemCodeFromTrackingNumber(string: string) {
  return string.replace(/^CE|IE$/g, "");
}

async function main() {
  const currentDate = new Date(); // Get the current date
  const sevenDaysAgo = new Date(); // Create a new date object

  sevenDaysAgo.setDate(currentDate.getDate() - 7); // Subtract 7 days from the current date

  const orders = await getAllOrders({
    min_date_created: sevenDaysAgo.toISOString(),
  });
  const anPostOrdersAndShipments = [];
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
      anPostOrdersAndShipments.push({ order, shipment });
    }
  }
  // this all needs to be tested
  const itemRecords = await getItemRecords();
  for (let i = 0; i < anPostOrdersAndShipments.length; i++) {
    const { order, shipment } = anPostOrdersAndShipments[i];

    const deliveryRecord = itemRecords.find(function (item) {
      const itemCodeString = String(item.ITEM_NUMBER);

      const shipmentItemNumber = getAnPostItemCodeFromTrackingNumber(
        shipment.tracking_number
      );

      const matchingCode = itemCodeString === shipmentItemNumber;
      const itemIsDelivered = item.DELIVERY_STATUS == "DELIVERED";

      return matchingCode && itemIsDelivered;
    });

    if (!deliveryRecord) {
      continue;
    }
    const timeToDelivery = shipment.date_created - deliveryRecord.SCAN_DATE;

    const timeisLessThan48Hours = timeToDelivery < 1000 * 60 * 60 * 48;
    if (timeisLessThan48Hours) {
      const email = order.email;
      const name = order.name;
      // send google review request email
    }
  }
}
main();
