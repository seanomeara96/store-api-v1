require("../../config/config").config("bf");
const { addLine } = require("../../functions/content/addLine");

const products = [{"Product ID":389},
{"Product ID":390},
{"Product ID":2340},
{"Product ID":2341},
{"Product ID":2622},
{"Product ID":3125},
{"Product ID":3126},
{"Product ID":3380},
{"Product ID":3381},
{"Product ID":3681},
{"Product ID":3682},
{"Product ID":3824},
{"Product ID":3838},
{"Product ID":4161},
{"Product ID":4162},
{"Product ID":4655},
{"Product ID":4656},
{"Product ID":5312},
{"Product ID":5315},
{"Product ID":5505}]

async function addIdTag(productsIds, idString) {
  const script = `<!--start-${idString}--><script id="${idString}" type="text/javascript"></script><!--end-${idString}-->`;
  const promises = productsIds.map((p) => {
    return addLine(Object.values(p)[0], script);
  });
  const res = await Promise.allSettled(promises);
  const fulfilledReducer = (a, c) => (c.status === "fulfilled" ? a + 1 : a);
  const fulfilled = res.reduce(fulfilledReducer, 0);
  const status = `${fulfilled}/${res.length} ok`;
  console.log(status);
  if (fulfilled !== res.length) console.log(res);
}

addIdTag(products, "redken-color-extend");
