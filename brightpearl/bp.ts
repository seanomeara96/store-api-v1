/*(async () => {


  const IDSET = "0-199";

  let sumThis = [];

  let count = 0;

  

  for (let i = 0; i < 7500; i += 500) {
    try {
      const e = await axios.get(
        `https://${DATACENTER}.brightpearlconnect.com/public-api/${ACCOUNT}` +
          `/product-service/product-search`,
        {
          headers,
          params: {
            productId: `${i}-${i + 500}`,
          },
        }
      );
      console.log(e.data.response.results.length);

      const product = e.data.response.results;
      count += e.data.response.results.length;
      console.log(count);
      sumThis.push(product);
    } catch (err: any) {
      if (err.response) {
        console.log(err.response);
      } else {
        console.log(err);
      }
      continue;
    }
  }
  console.log(sumThis.flat());
})();
*/