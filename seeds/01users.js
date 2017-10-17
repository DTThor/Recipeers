
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Amanda', username: 'amandarulez', location: 'Austin, TX', email: 'af@hotttmail.com', hashedPass: '???', total_following: 57, total_followers: 999999999, },
        {name: 'Dylan', username: 'dtthor', location: 'Austin, TX', email: 'dt@hotttmail.com', hashedPass: '???', total_following: 153, total_followers: 2, },
        {name: 'Jayme', username: 'yoitsJayme', location: 'Austin, TX', email: 'jr@hotttmail.com', hashedPass: '???', total_following: 89, total_followers: 999999999, },
        {name: 'John', username: 'soundboardChef', location: 'Austin, TX', email: 'jm@hotttmail.com', hashedPass: '???', total_following: 25, total_followers: 999999999, },
        {name: 'Michael', username: 'mQuirozcookzzz', location: 'Austin, TX', email: 'mq@hotttmail.com', hashedPass: '???', total_following: 51, total_followers: 999999999, },
        {name: 'Peter', username: 'peterroxx', location: 'Austin, TX', email: 'ps@hotttmail.com', hashedPass: '???', total_following: 435, total_followers: 999999999, },
        {name: 'Rachel', username: 'cssChef', location: 'Austin, TX', email: 'rc@hotttmail.com', hashedPass: '???', total_following: 73, total_followers: 999999999, },
        {name: 'Ryan', username: 'ohioChef1', location: 'Austin, TX', email: 'rw@hotttmail.com', hashedPass: '???', total_following: 27, total_followers: 999999999, },
        {name: 'Zubair', username: 'simmerdownG63', location: 'Austin, TX', email: 'zd@hotttmail.com', hashedPass: '???', total_following: 15, total_followers: 999999999, },
        {name: 'Louis', username: 'wafflerecipezonly', location: 'Austin, TX', email: 'ld@hotttmail.com', hashedPass: '???', total_following: 91, total_followers: 999999999, },
        {name: 'Justin', username: 'thaidishes4dayz', location: 'Austin, TX', email: 'jb@hotttmail.com', hashedPass: '???', total_following: 5, total_followers: 999999999, },

      ]);
    });
};
