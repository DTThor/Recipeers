//bring in express routing and knex
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');

//GET '/' - return the feed of recipes
//**if logged in return recipes of followed users
router.get('/', (req, res, next) => {
  res.send('all the recipes');
})
//.catch((err) => {
//   next(err);
// });

//GET '/recipes/new'
router.get('/new', (req, res, next) => {
  res.render('recipes/new');
})
//.catch( (err) => {
//   next(err);
// });

//POST '/recipes' (can do either recipe format!)
router.post('/', (req, res, next) => {
  res.send('send new recipe in');
})
//.catch( (err) => {
//   next(err);
// });

//GET '/share'
router.get('/share', (req, res, next) => {
  res.send('sharing an external recipe link');
})
//.catch( (err) => {
//   next(err);
// });

//GET /recipe/recipename
router.get('/:recipename', (req, res, next) => {
  res.send('see a particular recipe');
})
// .catch( (err) => {
//   next(err);
// });

module.exports = router;
