const server = require('../server');
const request = require('supertest')(server);
//FOR WHEN WE GET OUR DB SET UP
//const knexConfig = require('../knexfile.js')['test'];
//const knex = require('knex')(knexConfig);

const expect = require('Chai').expect;

//test to ensure users-related pages are received
describe('Users Pages', () => {

  //user sign in page
  it('should return a page for logging in and registering', (done) => {
    request.get('/users/signin')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('sign in')
      done()
    })
  })

  //log in
  it('should log a user into the app', (done) => {
    request.post('/users/login')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('log in post')
      done()
    })
  })

  //register
  it('should register a new user to the app', (done) => {
    request.post('/users/register')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('user registration post')
      done()
    })
  })

  //view user profile
  it('should return a user profile page', (done) => {
    request.get('/users/rmcavin')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('view user page')
      done()
    })
  })

  //edit user profile
  it('should update the user profile', (done) => {
    request.patch('users/rmcavin')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('send profile edits')
      done()
    })
  })

  //delete user profile
  it('should delete the user profile', (done) => {
    request.delete('users/rmcavin')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('delete user')
      done()
    })
  })

  //view a users recipes
  it('should return all of the recipes for a user', (done) => {
    request.get('/users/rmcavin/recipes')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('view recipes of user')
      done()
    })
  })

  //view a users favorites
  it('should return all of the favorites for a user', (done) => {
    request.get('/users/rmcavin/favorites')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('view favorites of user')
      done()
    })
  })

  //view users a user followers
  it('should return all of the users a user follows', (done) => {
    request.get('/users/rmcavin/following')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('view users a user follows')
      done()
    })
  })

//view users following a user
  it('should return all of the users following a user', (done) => {
    request.get('/users/rmcavin/followers')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('view users following a user')
      done()
    })
  })

  //search for a user
  it('should return the user page of a searched user', (done) => {
    request.get('/users?rmcavin')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('view user page')
    })
  })

})
