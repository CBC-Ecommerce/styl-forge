const axios = require('axios');

const authHeader = {
  Authorization: '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',
};
const apiURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rfp/';

// '/product?id=5' {id: 5}


exports.getProductByID = function (req, res) {
  const url = `${apiURL}/products:${req.query.productId}`;
  console.log(req.query, 'this is req.query*******');


  axios.get(url, {headers: authHeader})

  // axios({ url: apiURL, method: 'get', headers: authHeader, params: req.query})
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.log('There was an error: ', err);
      res.sendStatus(500);
    });
};
