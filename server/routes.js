const axios = require('axios');

const authHeader = {
  headers: {
    Authorization: '122',
  },
};
const apiURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

exports.getProductByID = function (req, res) {
  const url = `${apiURL}products/${req.query.product_id}`;

  axios.get(url, authHeader)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch(() => {
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

exports.getReviewMetaData = function (req, res) {
  const urlReviewMeta = `${apiURL}reviews/meta`;
  const config = {
    headers: authHeader.headers,
    params: {
      product_id: req.query.product_id,
    },
  };

  axios.get(urlReviewMeta, config)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.addReviews = function (req, res) {
  const urlPostReviews = `${apiURL}reviews`;

  axios.post(urlPostReviews, req.body, authHeader)
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch((err) => {
      console.log(err, 'failed to post a review');
      res.sendStatus(500);
    });
};

exports.markReviewHelpful = function (req, res) {
  const urlPut = `${apiURL}reviews/${req.query.review_id}/helpful`;

  axios({ url: urlPut, method: 'PUT', headers: authHeader.headers })
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.reportReview = function (req, res) {
  const urlPut = `${apiURL}reviews/${req.query.review_id}/report`;

  axios({ url: urlPut, method: 'PUT', headers: authHeader.headers })
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};
