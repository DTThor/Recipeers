//bring in express routing and knex
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');

//GET '/users/signin' - a page for logging in or registering
router.get('/signin', (req, res, next) => {
  res.send('sign in');
})
// .catch( (err) => {
//   next(err);
// })

//POST '/users/login' - log a user into app
router.post('/login', (req, res, next) => {
  res.send('log in post');
})
// .catch( (err) => {
//   next(err);
// })

//POST '/users/register' - register a new user, redirect to user profile
router.post('/register', (req, res, next) => {
  res.send('user registration post');
})
// .catch( (err) => {
//   next(err);
// })

//GET '/users/<username>' - get the profile page for a user, edit access is avail
//to the user
router.get('/:username', (req, res, next) => {
  res.send('view user page');
})
// .catch( (err) => {
//   next(err);
// })

//GET '/users/<username>/edit' - get the page to edit user profile
router.get('/:username/edit', (req, res, next) => {
  res.send('edit user profile');
})
// .catch( (err) => {
//   next(err);
// })

//PATCH '/users/<username>' - edit the user profile information
router.patch('/:username', (req, res, next) => {
  res.send('send profile edits');
})
// .catch( (err) => {
//   next(err);
// })

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
