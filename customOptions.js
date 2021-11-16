const { getAll } = require("./functions/utils/getAll");

const getOptionSetById = (product_id) =>
  new Promise(async (resolve, reject) => {
    const options = await require("./config/config").store.get(
      `/catalog/products/${product_id}/options`
    );
    console.log(options.data);
    resolve(options);
  });

function customOptions() {
  require("./config/config").config("bf");
  const { getProductById } = require("./functions/products/getProductById");
  getProductById(4630).then(({ id }) => getOptionSetById(id)); // id = 1551
}
const getAllOptions = getAll(`/option_sets`);
async function options2() {
  require("./config/config").config("bf", 2);
  const options = await getAllOptions();
 options.map(({name}) => name).forEach(element => {
     console.log(element)
 });
}
options2()