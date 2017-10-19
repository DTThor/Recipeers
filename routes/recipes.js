//bring in express routing and knex
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');

//GET '/recipes/new'
router.get('/new', (req, res, next) => {
  res.render('recipes/new');
})

//POST '/recipes' (can do either recipe format!)
router.post('/', (req, res, next) => {
  //console.log(req.session.user);
  console.log(req.body);
  let recipeName = req.body.name;
  let ingredients = [];

  //MAKE A FOR EACH FOR INGREDIENTS INTO ARRAY OF OBJECTS
  for (let i = 0; i < req.body.ingredient.length; i++) {
    let ingredient = {};
    ingredient.ingredient = req.body.ingredient[i];
    ingredient.uom = req.body.uom[i];
    ingredient.quantity = parseInt(req.body.quantity[i]);
    ingredients.push(ingredient);
  }
  console.log(ingredients);
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
  .insert({name: recipeName, user_id: req.session.user.id, ingredients: JSON.stringify(ingredients), instructions: recipeInstructions, upvotes:0, gluten_free:isGluten_free, dairy_free:isDairy_free, vegetarian: isVegetarian, vegan: isVegan, pescatarian: isPescatarian, total_time: recipeTime, recipe_pic_url: req.body.recipe_pic_url})
  //.first()
  .then(recipe => {
    console.log(recipe);
    let recipeURL = '/recipes/' + recipe[0].id;
    res.redirect(recipeURL);
  })

})
//.catch( (err) => {
//   next(err);
// });


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

//GET /recipe/recipename
router.get('/:id', (req, res, next) => {
  knex('recipes')
  .where({id: req.params.id})
  .first()
  .then(recipe => {
    let recipeUser = recipe.user_id;
    knex('users')
    .where({id: recipeUser})
    .then(user => {
      res.render('recipes/show', {recipe:recipe, user:user});
    }).catch( (err) => {
       next(err);
     });
  })
})

module.exports = router;
