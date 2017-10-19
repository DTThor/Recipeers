//bring in express routing and knex
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
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

// logging out
router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/')
})

module.exports = router;
