const server = require('../server');
const request = require('supertest')(server);
//FOR WHEN WE GET OUR DB SET UP
//const knexConfig = require('../knexfile.js')['test'];
//const knex = require('knex')(knexConfig);

const expect = require('Chai').expect;

//test to ensure users-related pages are received
describe('Recipe Pages', () => {

  //user sign in page
  it('should return a page with recently posted recipes', (done) => {
    request.get('/recipes')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('all the recipes')
      done()
    })
  })

  //new internal recipe page
  it('should return a page to add a new internal recipe', (done) => {
    request.get('/recipes/new')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('new recipe page')
      done()
    })
  })

  //post new recipe
  it('should post a new recipe', (done) => {
    request.post('/recipes')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('send new recipe in')
      done()
    })
  })

  //new external recipe page
  it('should return a page to add a new external recipe', (done) => {
    request.get('/recipes/share')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('sharing an external recipe link')
      done()
    })
  })

  //recipe by name
  it('should return the page of a recipe searched by name', (done) => {
    request.get('/recipes/:recipename')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('see a particular recipe')
      done()
    })
  })
})
