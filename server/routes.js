const axios = require('axios');

const authHeader = {
  headers: {
    Authorization: '123',
  },
};
const apiURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

exports.getProductByID = function (req, res) {
  const url = `${apiURL}products/${req.query.product_id}`;

  axios.get(url, authHeader)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => {
      console.log('There was an error: ', err);
      res.sendStatus(500);
    });
};

exports.getProductStyles = function (req, res) {
  const url = `${apiURL}products/${req.query.product_id}/styles`;

  axios.get(url, authHeader)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.getRelatedProducts = function (req, res) {
  const url = `${apiURL}products/${req.query.product_id}/related`;

  axios.get(url, authHeader)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.getReviews = function (req, res) {
  const urlReview = `${apiURL}reviews`;
  const config = {
    headers: authHeader.headers,
    params: {
      product_id: req.query.product_id,
      sort: req.query.sort,
      page: req.query.page,
      count: req.query.count,
    },
  };

  axios.get(urlReview, config)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};
