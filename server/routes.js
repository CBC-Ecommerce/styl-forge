const axios = require('axios');

const authHeader = {
  headers: {
    Authorization: '',
  },
};
const apiURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

// '/product?id=5' {id: 5}

exports.getProductByID = function (req, res) {
  const url = `${apiURL}products/${req.query.product_id}`;
  console.log(req.query.product_id, 'this is req.query*******');

  axios.get(url, authHeader)

  // axios({ url: apiURL, method: 'get', headers: authHeader, params: req.query})
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => {
      console.log('There was an error: ', err);
      res.sendStatus(500);
    });
};
