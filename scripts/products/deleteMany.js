const {
  deleteManyProducts,
} = require("../../functions/products/deleteManyProducts");

require("../../config/config").config("bf");

function deleteMany() {
  const products = [
    { bc_id: 5734 },
    { bc_id: 5735 },
    { bc_id: 5736 },
    { bc_id: 5737 },
    { bc_id: 5738 },
    { bc_id: 5739 },
    { bc_id: 5740 },
    { bc_id: 5741 },
    { bc_id: 5742 },
    { bc_id: 5743 },
    { bc_id: 5744 },
    { bc_id: 5745 },
    { bc_id: 5746 },
    { bc_id: 5747 },
  ];

  deleteManyProducts(products).then(console.log).catch(console.log);
}
deleteMany();
