const axios = require('axios');
require('dotenv').config();

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

exports.getReviewMetaData = (req, res) => {
  const urlReviewMeta = `${process.env.API_URL}/reviews/meta`;
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

exports.addReviews = (req, res) => {
  const urlPostReviews = `${process.env.API_URL}/reviews`;

  axios.post(urlPostReviews, req.body, authHeader)
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.markReviewHelpful = (req, res) => {
  const urlPut = `${process.env.API_URL}/reviews/${req.query.review_id}/helpful`;

  axios({ url: urlPut, method: 'PUT', headers: authHeader.headers })
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.reportReview = (req, res) => {
  const urlPut = `${process.env.API_URL}/reviews/${req.query.review_id}/report`;

  axios({ url: urlPut, method: 'PUT', headers: authHeader.headers })
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.getQuestions = (req, res) => {
  const url = `${process.env.API_URL}/qa/questions/`;
  // console.log('req.query.product_id:', req.query.product_id);
  // console.log('req.query.page:', req.query.page);

  const config = {
    headers: authHeader.headers,
    params: {
      product_id: req.query.product_id,
      page: req.query.page,
      count: req.query.count,
    },
  };
  axios.get(url, config)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.getAnswers = function (req, res) {
  const urlGetAnswers = `${process.env.API_URL}/qa/questions/${req.params.question_id}/answers`;

  axios({
    url: urlGetAnswers, method: 'GET', params: { page: req.query.page, count: req.query.count }, headers: authHeader.headers,
  })
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.addAQuestion = function (req, res) {
  const urlAddQ = `${process.env.API_URL}/qa/questions`;
  axios.post(urlAddQ, req.body, authHeader)
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.addAnswer = function (req, res) {
  const urlAddAnswers = `${process.env.API_URL}/qa/questions/${req.params.question_id}/answers`;
  const body = {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos,
  };

  axios.post(urlAddAnswers, body, authHeader)
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.markQuestionHelpful = function (req, res) {
  const urlPut = `${process.env.API_URL}/qa/questions/${req.body.question_id}/helpful`;

  axios({ url: urlPut, method: 'PUT', headers: authHeader.headers })
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.reportQuestion = function (req, res) {
  const urlPut = `${process.env.API_URL}/qa/questions/${req.body.question_id}/report`;
  console.log(req.body.question_id);

  axios({ url: urlPut, method: 'PUT', headers: authHeader.headers })
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.markAnswerHelpful = function (req, res) {
  console.log(req.query.answer_id);
  const urlPut = `${process.env.API_URL}/qa/answers/${req.body.answer_id}/helpful`;

  axios({ url: urlPut, method: 'PUT', headers: authHeader.headers })
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.reportAnswer = function (req, res) {
  const urlPut = `${process.env.API_URL}/qa/answers/${req.query.answer_id}/report`;

  axios({ url: urlPut, method: 'PUT', headers: authHeader.headers })
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

exports.getCart = (req, res) => {
  const url = `${process.env.API_URL}/cart`;
  axios.get(url, authHeader)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.addCart = function (req, res) {
  const url = `${process.env.API_URL}/cart`;

  axios.post(url, req.body, authHeader)
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};
