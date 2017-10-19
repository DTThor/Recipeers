exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('following').del()
    .then(function () {
<<<<<<< HEAD
      //Inserts seed entries
=======
      // Inserts seed entries
>>>>>>> 03c99588b66cbe42a1e6cb6941c5fda7e4d13121
       return knex('following').insert([
       {user_id: 1, following_user_id: 2},
        {user_id: 1, following_user_id: 3},
        {user_id: 1, following_user_id: 4},
        {user_id: 1, following_user_id: 5},
        {user_id: 1, following_user_id: 6},
        {user_id: 1, following_user_id: 7},
        {user_id: 1, following_user_id: 8},
        {user_id: 1, following_user_id: 9},
        {user_id: 2, following_user_id: 1},
        {user_id: 2, following_user_id: 3},
        {user_id: 2, following_user_id: 4},
        {user_id: 2, following_user_id: 7},
        {user_id: 3, following_user_id: 1},
        {user_id: 3, following_user_id: 2},
        {user_id: 3, following_user_id: 4},
        {user_id: 3, following_user_id: 5},
        {user_id: 3, following_user_id: 6},
        {user_id: 3, following_user_id: 7},
        {user_id: 3, following_user_id: 8},
        {user_id: 3, following_user_id: 9},
        {user_id: 4, following_user_id: 1},
        {user_id: 4, following_user_id: 2},
        {user_id: 4, following_user_id: 3},
        {user_id: 4, following_user_id: 4},
        {user_id: 5, following_user_id: 1},
        {user_id: 6, following_user_id: 1},
        {user_id: 6, following_user_id: 2},
        {user_id: 6, following_user_id: 3},
        {user_id: 6, following_user_id: 4},
        {user_id: 7, following_user_id: 1},
        {user_id: 7, following_user_id: 2},
        {user_id: 7, following_user_id: 3},
        {user_id: 7, following_user_id: 4},
        {user_id: 7, following_user_id: 5},
        {user_id: 8, following_user_id: 1},
        {user_id: 8, following_user_id: 2},
        {user_id: 8, following_user_id: 3},
        {user_id: 9, following_user_id: 1},
        {user_id: 9, following_user_id: 2},
        {user_id: 9, following_user_id: 3},
        {user_id: 9, following_user_id: 4},
        {user_id: 9, following_user_id: 5},
        {user_id: 9, following_user_id: 6},
        {user_id: 9, following_user_id: 7},
        {user_id: 9, following_user_id: 8}
<<<<<<< HEAD
      ]); 
=======
      ]);
>>>>>>> 03c99588b66cbe42a1e6cb6941c5fda7e4d13121
    });
};
