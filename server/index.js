require('dotenv').config();
const express = require('express');
const path = require('path');
const controllers = require('./controllers');

// Create server and serve up client side folders to view in browser
const app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes for Products
app.get('/products', controllers.getProductByID);
app.get('/products/styles', controllers.getProductStyles);
app.get('/products/related', controllers.getRelatedProducts);

// Routes for Reviews

app.get('/reviews', controllers.getReviews);
app.get('/reviews/meta', controllers.getReviewMetaData);
app.post('/reviews', controllers.addReviews);
app.put('/reviews/helpful', controllers.markReviewHelpful);
app.put('/reviews/report', controllers.reportReview);

app.get('/qa/questions', controllers.getQuestions);
app.get('/qa/questions/answers', controllers.getAnswers);
app.post('/qa/questions', controllers.addAQuestion);
app.post('/qa/questions/answers', controllers.addAnswer);
app.put('/qa/questions/helpful', controllers.markQuestionHelpful);
app.put('/qa/questions/report', controllers.reportQuestion);
app.put('/qa/answers/helpful', controllers.markAnswerHelpful);
app.put('/qa/answers/report', controllers.reportAnswer);

// Establish connection to port
const port = process.env.PORT;
app.listen(port);
// Airbnb linter does not like console logs, only because it's a reminder
// to remove all your development console logs before deployment
console.log(`Listening at http://localhost:${port}`);
