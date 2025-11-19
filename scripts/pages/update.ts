require("../../config/config").config("bf");
import { getAllPages } from "../../functions/pages/getAllPages";

async function update() {
  const pages = await getAllPages();
  console.log(pages);
}
update();
