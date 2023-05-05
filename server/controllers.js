const axios = require('axios');

const authHeader = {
  headers: {
    Authorization: process.env.API_KEY,
  },
};

// note, added apiURL into process.env folder: it no longer has the ending slash v
//                                                                    (.../hr-rfp/)
exports.getProductByID = (req, res) => {
  const url = `${process.env.API_URL}/products/${req.query.product_id}`;

  axios.get(url, authHeader)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getProductStyles = (req, res) => {
  const url = `${process.env.API_URL}/products/${req.query.product_id}/styles`;

  axios.get(url, authHeader)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.getRelatedProducts = (req, res) => {
  const url = `${process.env.API_URL}/products/${req.query.product_id}/related`;

  axios.get(url, authHeader)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.getReviews = (req, res) => {
  const urlReview = `${process.env.API_URL}/reviews`;
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
