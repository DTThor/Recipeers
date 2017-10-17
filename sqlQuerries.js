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
WHERE id = 1;

//FIND ALL USERS RECIPES AND UPVOTES FROM A USER BASED ON ID
SELECT recipes.name, recipes.upvotes
FROM users
INNER JOIN recipes
ON recipes.user_id = users.id
WHERE users.id = 1;
//returns the names of all Amandas recipes and their upvotes

//FOLLOWING
SELECT following_user_id
FROM following
WHERE user_id = 1;
//shows all the users taco is following, only amanda user_id:1

//FOLLOWERS
SELECT user_id
FROM following
WHERE following_user_id = 1;
//shows all users following taco user_id:5

//FAVORITE RECIPES FOR USER:2
SELECT  recipes.name, recipes.upvotes
FROM recipes
INNER JOIN favorites
ON recipes.id = favorites.favorite_recipe_id
WHERE favorites.user_id = 2;
//returns favorite recipe name and upvotes


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








router.get('/:id', function(req, res){
  //look in donuts table
  knex('users')
  //not needed here
  .select('*')
  //looking for donut "id" in donuts table
  .where({id: req.params.id})
  //need here
  .first()
  //donut found frm .where
  .then(function(user){

    knex('users')
    //Return the columns I want from different tables I'm joining on.
    .select('donuts.name', 'shops.name', 'shops.city')
    //looking in donuts table for donut.name object passed from function
    .where('donuts.name', donut.name)
      //join where "shop_donuts" table, "donut_id" column match "id" column from "donuts" table
      .innerJoin('shop_donuts', 'donut_id', 'donuts.id')
      //join where "shops" table, "shop_id" column = "id" column from "shops" table
      .innerJoin('shops', 'shop_id', 'shops.id')
      //orderBy can go anywhere after knex()
      .orderBy('price', 'asc')

      .then(function (shops) {
        //adding property to donut object and setting = to shops from function
        donut.shops = shops;
        //express knows to look in views folder
        //I set donut as the object to pass donut values to ejs
        res.render('donuts/show', {donut: donut})
   })
});
});
