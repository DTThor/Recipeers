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
  res.send('view recipes of user')
})
// .catch( (err) => {
//   next(err);
// })

//GET 'users/<username>/favorites'
router.get('/:username/favorites', (req, res, next) => {
  res.send('view favorites of user')
})
// .catch( (err) => {
//   next(err);
// })

//GET 'users/<username>/following'
router.get('/:username/following', (req, res, next) => {
  res.send('view users a user follows')
})
// .catch( (err) => {
//   next(err);
// })

//GET 'users/<username>/followers'
router.get('/:username/followers', (req, res, next) => {
  res.send('view users following a user')
})
// .catch( (err) => {
//   next(err);
// })

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
