const axios = require("axios");
const token = {
  headers: { "x-auth-token": "2u1uzh9b52ncuz0mrdkqmyblx3ncpo2" },
};
axios
  .get(
    "https://api.bigcommerce.com/stores/c7kc4/v3/catalog/products?limit=2000",
    token
  )
  .then(({ data }) => {
    let count = 1;
    const productsArray = data.data;
    //console.log(productsArray);
    productsArray.forEach((product) => {
      console.log(
        `${count} => ${product["id"]}  ${product["name"]} ${product["sku"]}/n`
      );
      count++;
    });
  })
  .catch((err) => {
    console.log(err);
  });

/**
   * 63 => 178  Proceive® Men - 60 Capsules 6986/n
     64 => 179  Proceive® Dual Pack - 120 Capsules 6987/n
     65 => 180  Proceive® Women Max - 30 Sachets 6988/n
     66 => 181  Proceive® Men Max - 30 Sachets 6989/n
*/
