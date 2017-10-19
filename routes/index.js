//bring in express routing and knex
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: "dcc5vb7ot",
  api_key: '451134894389928',
  api_secret: '9R_XPM5LnDgckyaED_zrLMm3mNc'
})


//home page route
router.get('/', (req, res, next) => {
  knex('recipes')
  .orderBy('upvotes')
  .then(recipes => {
    res.render('index.ejs', {recipes});
  }).catch(err => {
    next(err);
  })
});

module.exports = router;
