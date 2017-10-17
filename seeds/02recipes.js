
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {name: 'Meatless Lasagna', user_id: 1, ingredients: 'stuff', instructions: 'do the things to the stuff', upvotes: 210, gluten_free: false, dairy_free: false, vegetarian: true, vegan: false, pescatarian: true, total_time: 40, blogpost_url: ''},
        {name: 'Meatless Meatballs', user_id: 1, ingredients: 'stuff', instructions: 'do the things to the stuff', upvotes: 45, gluten_free: true, dairy_free: true, vegetarian: true, vegan: true, pescatarian: true, total_time: 28, blogpost_url: 'www.blogginallovadaworld.com/meatless'},
        {name: 'Salmon', user_id: 1, ingredients: 'stuff', instructions: 'do the things to the stuff', upvotes: 107, gluten_free: true, dairy_free: true, vegetarian: false, vegan: false, pescatarian: false, total_time: 50, blogpost_url: 'www.blogginallovadaworld.com/salmon'},
        {name: 'Baked Chicken with Apple Stuffing', user_id: 3, ingredients: 'stuff', instructions: 'do the things to the stuff', upvotes: 132, gluten_free: true, dairy_free: true, vegetarian: false, vegan: false, pescatarian: false, total_time: 40, blogpost_url: ''},
        {name: 'Peachy Oatmeal', user_id: 4, ingredients: 'stuff', instructions: 'do the things to the stuff', upvotes: 67, gluten_free: true, dairy_free: true, vegetarian: true, vegan: true, pescatarian: true, total_time: 20, blogpost_url: ''},
        {name: 'Turkey Chili', user_id: 4, ingredients: 'stuff', instructions: 'do the things to the stuff', upvotes: 89, gluten_free: true, dairy_free: true, vegetarian: true, vegan: true, pescatarian: true, total_time: 30, blogpost_url: ''},
        {name: 'GF Pepperoni Pizza', user_id: 5, ingredients: 'stuff', instructions: 'do the things to the stuff', upvotes: 23, gluten_free: true, dairy_free: false, vegetarian: false, vegan: false, pescatarian: false, total_time: 45, blogpost_url: ''},
        {name: 'Watermelon Salad', user_id: 7, ingredients: 'stuff', instructions: 'do the things to the stuff', upvotes: 43, gluten_free: true, dairy_free: true, vegetarian: true, vegan: true, pescatarian: true, total_time: 10, blogpost_url: ''},
        {name: 'Braised Balsamic Chicken', user_id: 7, ingredients: 'stuff', instructions: 'do the things to the stuff', upvotes: 61, gluten_free: true, dairy_free: true, vegetarian: false, vegan: false, pescatarian: false, total_time: 60, blogpost_url: ''},
        {name: 'Tofu Tacos', user_id: 9, ingredients: 'stuff', instructions: 'do the things to the stuff', upvotes: 529, gluten_free: true, dairy_free: true, vegetarian: true, vegan: true, pescatarian: true, total_time: 40, blogpost_url: ''},
        {name: 'Southwestern Salad', user_id: 10, ingredients: 'stuff', instructions: 'do the things to the stuff', upvotes: 2, gluten_free: true, dairy_free: false, vegetarian: false, vegan: false, pescatarian: false, total_time: 35, blogpost_url: 'www.blogginallovadaworld.com/swchick'},
      ]);
    });
};
