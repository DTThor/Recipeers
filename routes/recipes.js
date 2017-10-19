//bring in express routing and knex
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');

//GET '/recipes/new'
router.get('/new', (req, res, next) => {
  res.render('recipes/new');
})

//POST '/recipes'
router.post('/', (req, res, next) => {

  let recipeName = req.body.name;
  let ingredients = [];

  for (let i = 0; i < req.body.ingredient.length; i++) {
    let ingredient = {};
    ingredient.ingredient = req.body.ingredient[i];
    ingredient.uom = req.body.uom[i];
    ingredient.quantity = parseInt(req.body.quantity[i]);
    ingredients.push(ingredient);
  }
  let recipeInstructions = req.body.instructions;
  let isVegan = false;
  let isVegetarian = false;
  let isGluten_free = false;
  let isPescatarian = false;
  let isDairy_free = false;

  if (req.body.dietary.includes('gluten_free')) {
    isGluten_free = true;
  }
  if (req.body.dietary.includes('dairy_free')) {
    isDairy_free = true;
  }
  if (req.body.dietary.includes('vegan')) {
    isVegan = true;
  }
  if (req.body.dietary.includes('vegetarian')) {
    isVegetarian = true;
  }
  if (req.body.dietary.includes('pescatarian')) {
    isPescatarian = true;
  }

  let recipeTime = req.body.total_time;

  knex('recipes')
  .returning('*')
  .insert({name: recipeName, user_id: req.session.user.id, ingredients: JSON.stringify(ingredients), instructions: recipeInstructions, upvotes:0, gluten_free:isGluten_free, dairy_free:isDairy_free, vegetarian: isVegetarian, vegan: isVegan, pescatarian: isPescatarian, total_time: recipeTime})
  .then(recipe => {
    console.log(recipe);
    res.send('send new recipe in');
  }).catch( (err) => {
     next(err);
   });
})

// GET recipes/:recipeId/upvote
router.get('/:recipeId/upvote', (req, res, next) => {
  if(req.session.user) {
    knex('recipes')
    .returning('*')
    .where({id: req.params.recipeId})
    .first()
    .update({upvotes: knex.raw('upvotes + 1')})
    .then(recipe => {
      res.redirect('/')
    }).catch( (err) => {
       next(err);
     });
  } else {
    res.redirect('/users/signin')
  }
})

// GET /recipes/:recipeId/addFavorite
router.get('/:recipeId/addFavorite', (req, res, next) => {
  if(req.session.user) {
    knex('favorites')
    .returning('*')
    .insert({user_id: req.session.user.id, favorite_recipe_id: req.params.recipeId})
    .then(recipe => {
      res.redirect('/')
    }).catch( (err) => {
       next(err);
     });
  } else {
    res.redirect('/users/signin')
  }
})

//GET /recipe/:id
router.get('/:id', (req, res, next) => {
  let recipe = null;
  knex('recipes')
  .where({id: req.params.id})
  .first()
  .then(fetchedRecipe => {
    recipe = fetchedRecipe;
    let recipeUser = fetchedRecipe.user_id;
     return knex('users')
    .where({id: recipeUser})
    .first();
  })
  .then(user => {
    res.render('recipes/show', {recipe:recipe, user:user});
  }).catch( (err) => {
     next(err);
   });
});

module.exports = router;
