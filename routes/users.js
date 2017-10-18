//bring in express routing and knex
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');
// const session = require('cookie-session');
// const cookieParser = require('cookie-parser');

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

  knex('users')
.where({username: req.params.username})
.first()
.then(user => {
  res.render('users/profile', {user})
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
    .select('users.name')
    .where({username: req.params.username})
    .first()
    .then(user => {
      console.log(user)
      knex('users')
      //selects can be removed to return all columns
      .select('recipes.name', 'recipes.upvotes', 'recipes.ingredients')
      .where({username: req.params.username})
      .innerJoin('recipes', 'users.id', 'recipes.user_id')
      .then(recipes => {
        console.log(recipes)
        res.render('users/profile', {user})
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
    //console.log(user.id);
    knex('recipes')
    .select('recipes.name', 'upvotes')
    .where( 'favorites.user_id', user.id)
    .orderBy('upvotes', 'desc')
    .innerJoin('favorites', 'recipes.id', 'favorites.favorite_recipe_id')
    .then(favorites => {
      console.log(favorites)
      res.render('users/profile', {user})
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
  //why doesn't select work here?
  //.select('users.name')
  .then(user => {
    console.log(user.name);
    //console.log(user);
    //why did I have to use following and not users, get error with users?
    knex('following')
    //.select()
    .where( 'following.user_id', user.id)
    //not specifying table still works, why, how??
    .select('name', 'following_user_id')
    .innerJoin('users', 'users.id', 'following.following_user_id')
    .then(following => {
      console.log(following)
      res.render('users/profile', {user})
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
    // .select('users.name', 'users.username')
    .innerJoin('users','users.id','following.user_id')
    .then(followers => {
      res.send(followers);
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
