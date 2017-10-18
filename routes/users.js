//bring in express routing and knex
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');
// const session = require('cookie-session');
// const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: "dcc5vb7ot",
  api_key: '451134894389928',
  api_secret: '9R_XPM5LnDgckyaED_zrLMm3mNc'
})

//GET '/users/signin' - a page for logging in or registering
router.get('/signin', (req, res, next) => {
  res.render('users/signin');
})

//POST '/users/login' - log a user into app
router.post('/login', (req, res, next) => {
  knex('users')
  .where({username: req.body.username})
  .first()
  .then(user => bcrypt.compare(req.body.password,user.hashedpass)
    .then(valid => {
      if(valid) {
        req.session.user = user;
        let profileURL = '/users/' + req.body.username;
        res.redirect(profileURL)
      }
  }).catch( (invalid) => {
    res.redirect('/signin');
  }))
})

//POST '/users/register' - register a new user, redirect to edit user profile
router.post('/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
 .then(hash => {
   knex('users')
   .returning('username')
   .insert({username: req.body.username, hashedpass: hash})
   .then(user => {
     req.session.user = user[0];
     let editURL = '/users/' + req.body.username + '/edit';
     res.redirect(editURL)
    })
 }).catch( (err) => {
   next(err);
  })
 })

//GET '/users/<username>' - get the profile page for a user, edit access is avail
//to the user
router.get('/:username', (req, res, next) => {
  console.log("req.session:", req.session)
  let loggedIn = false;
  if (req.session.user && req.session.user.username===req.params.username) {
    loggedIn = true;
  }
  knex('users')
  .where({username: req.params.username})
  .first()
  .then(user => {
    res.render('users/profile', {user:user, loggedIn:loggedIn})
  }).catch( (err) => {
    next(err);
  })
})



//GET '/users/<username>/edit' - get the page to edit user profile
router.get('/:username/edit', (req, res, next) => {
  knex('users')
  .where({username: req.params.username})
  .first()
  .then(user => {
    res.render('users/edit', {user})
  }).catch( (err) => {
    next(err);
  })
})

router.patch('/:username/updatePic', (req, res, next) => {
  if(!req.body.profile_pic_url){
    return;
  }
  knex('users')
  .returning('*')
  .where({username: req.params.username})
  .first()
  .update({profile_pic_url: req.body.profile_pic_url})
  .then(user => {
    let profileURL = '/users/' + req.body.username;
    res.redirect(profileURL)
  }).catch( (err) => {
  next(err);
  })
})


//PATCH '/users/<username>' - edit the user profile information
router.patch('/:username', (req, res, next) => {
  knex('users')
  .returning('*')
  .where({username: req.body.username})
  .first()
  .update(req.body)
  .then(user => {
    let profileURL = '/users/' + req.body.username;
    res.redirect(profileURL)
  }).catch( (err) => {
  next(err);
  })
})

//DELETE '/users/<username>' - delete the user profile information
router.delete('/:username', (req, res, next) => {
  res.send('delete user');
})
// .catch( (err) => {
//   next(err);
// })

//GET 'users/<username>/recipes'
router.get('/:username/recipes', (req, res, next) => {
    knex('users')
    .where({username: req.params.username})
    .first()
    .then(user => {
      console.log(user)
      knex('users')
      .where({username: req.params.username})
      .innerJoin('recipes', 'users.id', 'recipes.user_id')
      .then(recipes => {
        console.log(recipes)
        res.render('users/recipes', {user:user, recipes:recipes})
      }).catch( (err) => {
        next(err);
      })
    })
   })
//GET 'users/<username>/favorites'

router.get('/:username/favorites', (req, res, next) => {
  knex('users')
  .where({username: req.params.username})
  .first()
  .then(user => {
    knex('recipes')
    .where( 'favorites.user_id', user.id)
    .orderBy('upvotes', 'desc')
    .innerJoin('favorites', 'recipes.id', 'favorites.favorite_recipe_id')
    .then(favorites => {
<<<<<<< HEAD
      res.render('users/profile', {user})
=======
      console.log(favorites)
      res.render('users/favorites', {user:user, favorites:favorites})
>>>>>>> 5cc8bed44fc2c28346c42d2abf1c95bde37c47a8
    }).catch( (err) => {
      next(err);
    })
  })
 })

//GET 'users/<username>/following'
router.get('/:username/following', (req, res, next) => {
  knex('users')
  .where({username: req.params.username})
  .first()
  .then(user => {
    console.log(user.name);
    knex('following')
    .where( 'following.user_id', user.id)
    .innerJoin('users', 'users.id', 'following.following_user_id')
    .then(following => {
      console.log(following)
      res.render('users/following', {user:user, following:following})
    }).catch( (err) => {
      next(err);
    })
  })
 })

//GET 'users/<username>/followers'
router.get('/:username/followers', (req, res, next) => {
  knex('users')
  .where({username: req.params.username})
  .first()
  .then(user => {
    knex('following')
    .where( 'following.following_user_id', user.id)
    .innerJoin('users','users.id','following.user_id')
    .then(followers => {
      console.log(followers)
      res.render('users/followers', {user:user, followers:followers});
    }).catch( (err) => {
      next(err);
    })
  })
 })

//search users
router.get('/search', (req, res, next) => {
  //check if the username is in db
  if (req.query.username) {
    //redirect to user page if valid
    res.redirect(`/users/:${req.query.username}`)
  }
  else {
    res.send('user not found.')
  }
})

module.exports = router;
