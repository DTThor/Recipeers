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
  if (req.session.user) {
    let user = null;
    let following = null;
    let recipes = null;
    knex('users')
    .where({id:req.session.user.id})
    .first()
    .then(fetchedUser => {
      user = fetchedUser;
      return knex('following')
      .where({user_id: fetchedUser.id})
      .then(fetchedFollowers => {
        followers = fetchedFollowers.map(f=>f.following_user_id)
        return knex('recipes')
        .whereIn('user_id', followers)
        .then(fetchedRecipes => {
          recipes = fetchedRecipes;
          return knex('users')
          .join('recipes', 'users.id', '=', 'user_id')
          .returning('*')
          .then(authors => {
            console.log('THE AUTHORS ARE... ', authors);
            res.render('index.ejs', {user:user, following:following, recipes:recipes, authors:authors});
          })
        })
      }).catch(err => {
        next(err);
      })
    })

  }

  else {
    knex('recipes')
    .orderBy('upvotes', 'desc')
    .then(recipes => {
      res.render('index.ejs', {recipes});
    }).catch(err => {
      next(err);
    })
  }

});

// logging out
router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/')
})

module.exports = router;
