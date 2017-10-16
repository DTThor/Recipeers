//bring in express routing and knex
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');

//GET '/' - return the feed of recipes
//**if logged in return recipes of followed users
router.get('/', (res, req, next) => {
  res.send('all the recipes');
}).catch( (err) => {
  next(err);
});

//GET '/recipes/new'
router.get('/recipes/new', (res, req, next) => {
  res.send('new recipe page');
}).catch( (err) => {
  next(err);
});

//POST '/recipes' (can do either recipe format!)
router.post('/recipes', (res, req, next) => {
  res.send('send new recipe in');
}).catch( (err) => {
  next(err);
});

//GET '/share'
router.get('/recipes/share', (res, req, next) => {
  res.send('sharing an external recipe link');
}).catch( (err) => {
  next(err);
});

//GET /recipe/recipename
router.get('/recipes/:recipename', (res, req, next) => {
  res.send('see a particular recipe');
}).catch( (err) => {
  next(err);
});
