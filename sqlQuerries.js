// SELECT donuts.name, shop_donuts.shop_id FROM shop_donuts
// INNER JOIN donuts
// ON shop_donuts.donut_id = donuts.id
// INNER JOIN shops
// ON shops.id = shop_donuts.shop_id
// WHERE donuts.id = 1;
//only returns plain vanilla and the shops they exist st

// SELECT * FROM users;
// SELECT * FROM recipes;
// SELECT * FROM users_recipes;
// SELECT * FROM following;

*****USER PROFILE QUERIES****

//NAME, USERNAME, LOCATION
SELECT name, username, location
FROM users
WHERE username = ;

//FIND ALL USERS RECIPES AND UPVOTES FROM A USER BASED ON ID
SELECT recipes.name, recipes.upvotes
FROM users
INNER JOIN recipes
ON recipes.user_id = users.id
WHERE users.username = 'amandarulez';
//returns the names of all Amandas recipes and their upvotes

//FOLLOWING
SELECT following_user_id
FROM following
WHERE user_id = 1;
//shows all the users taco is following, only amanda user_id:1

//FOLLOWERS
SELECT user_id, username
FROM following
INNER JOIN users
ON following.user_id = users.id
WHERE following_user_id = 2;
//FOLLOWERS
SELECT user_id, username
FROM users
INNER JOIN following
ON following.user_id = users.id
WHERE following_user_id = 2;
//shows all users following taco user_id:5

//FAVORITE RECIPES FOR USER:2
SELECT  recipes.name, recipes.upvotes
FROM recipes
INNER JOIN favorites
ON recipes.id = favorites.favorite_recipe_id
WHERE favorites.user_id = 2;
//returns favorite recipe name and upvotes

//Profile pic to recipe
SELECT users.name, recipes.name, profile_pic_url
FROM recipes
INNER JOIN users
ON recipes.user_id = users.id
WHERE recipes.id = 2;

******RECIPE PAGE QUERIES******

//ALL INFORMATION ABOUT RECIPE SELECTED
SELECT name, ingredients, instructions, upvotes, gluten_free, dairy_free, vegetarian, vegan, pescatarian, total_time
FROM recipes
WHERE recipes.id = 1;
//

//RECIPE AUTHOR
SELECT users.name
FROM users
INNER JOIN recipes
ON users.id = recipes.user_id
WHERE recipes.id = 1;
//returns recipe author

******HOMEPAGE QUERIES******

//NAME, USERNAME
SELECT name, username
FROM users
WHERE id = 1;
//returns who user is following

//FEED SORT RECIPES BY UPVOTES DESC
SELECT  recipes.name, recipes.upvotes, users.name
FROM recipes
INNER JOIN favorites
ON recipes.id = favorites.favorite_recipe_id
INNER JOIN users
ON recipes.user_id = users.id
WHERE favorites.user_id = 2
ORDER BY upvotes DESC;
//returns recepie name, upvotes, author descending

//FEED SORT BY MOST RECENT RECIPE ENTERED
SELECT  recipes.name, recipes.upvotes, users.name
FROM recipes
INNER JOIN favorites
ON recipes.id = favorites.favorite_recipe_id
INNER JOIN users
ON recipes.user_id = users.id
WHERE favorites.user_id = 2
ORDER BY upvotes ASC;
//sort by most recent recipe entered
//sort by upvotes
//sort by dietary restriction

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




//DONUT SHOW PAGE
router.get('/:id', function(req, res){
  //look in donuts table
  knex('donuts')
  //looking for donut "id" in donuts table
  .where({id: req.params.id})
  //need here
  .first()
  //donut found from .where
  .then(function(donut){
    //printing to terminal
    console.log(req.params.id)
    //returns object
    console.log(donut)
    //why does this donuts have to be here, what is it doing?
    knex('donuts')
    //will return columns that I want
    .select('shops.name', 'shops.city')
    //looking in donuts table for donut.name object passed from function
    .where('donuts.name', donut.name)
      //join where "shop_donuts" table, "donut_id" column match "id" column from "donuts" table
      .innerJoin('shop_donuts', 'donut_id', 'donuts.id')
      //join where "shops" table, "shop_id" column = "id" column from "shops" table
      .innerJoin('shops', 'shops.id', 'shop_id')
      //whats getting passed into donuts, from where?
      .then(function (shops) {
        //returns an array of objects
        console.log(shops);
        //adding property to donut object and setting = to shops from function

        donut.shops = shops;
        //console.log(donut.shops);
        //express knows to look in views folder
        //I set donut as the object to pass donut values to ejs
        console.log(donut);
        res.render('donuts/show', {donut: donut})
        //how is donut name, topping and price being sent to .ejs file??
   })
});
});


//DONUT SHOW PAGE
router.get('/:id',(req, res) => {
  knex('donuts')
  .where({id: req.params.id})
  .first()
  .then(donut => {
    knex('donuts')
    .select('shops.name', 'shops.city')
    .where('donuts.name', donut.name)
      .innerJoin('shop_donuts', 'donut_id', 'donuts.id')
      .innerJoin('shops', 'shops.id', 'shop_id')
      .then(shops => {
        donut.shops = shops;
        res.render('donuts/show', {donut: donut})
      })
    });
  });
