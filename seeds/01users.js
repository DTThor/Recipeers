
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Amanda', username: 'amandarulez', location: 'Austin, TX', email: 'af@hotttmail.com', hashedpass: '$2a$12$TXc3608dPDej5345tl5IAOVOWEXThiNo8t2ch0bjfznWAZiy12Jsq', profile_pic_url: 'http://res.cloudinary.com/dcc5vb7ot/image/upload/v1508375033/6dcb498046243e58c06d400a0a61a21c--pokemon-charmander-pokemon-go_jpmucg.jpg', total_following: 57, total_followers: 999999999, },
        {name: 'Dylan', username: 'dtthor', location: 'Austin, TX', email: 'dt@hotttmail.com', hashedpass: '$2a$12$TXc3608dPDej5345tl5IAOVOWEXThiNo8t2ch0bjfznWAZiy12Jsq', profile_pic_url: 'http://res.cloudinary.com/dcc5vb7ot/image/upload/v1508441740/gTalent_tqvx21.jpg', total_following: 153, total_followers: 2, },
        {name: 'Jayme', username: 'yoitsJayme', location: 'Austin, TX', email: 'jr@hotttmail.com', hashedpass: '$2a$12$TXc3608dPDej5345tl5IAOVOWEXThiNo8t2ch0bjfznWAZiy12Jsq', profile_pic_url: 'https://cdn-enterprise.discourse.org/gethopscotch1/uploads/default/original/2X/f/f13c9f277b7bebe1ad79f92012d664edec5f6b08.png', total_following: 89, total_followers: 999999999, },
        {name: 'John', username: 'soundboardChef', location: 'Austin, TX', email: 'jm@hotttmail.com', hashedpass: '$2a$12$TXc3608dPDej5345tl5IAOVOWEXThiNo8t2ch0bjfznWAZiy12Jsq', profile_pic_url: 'https://cdn-enterprise.discourse.org/gethopscotch1/uploads/default/original/2X/f/f13c9f277b7bebe1ad79f92012d664edec5f6b08.png', total_following: 25, total_followers: 999999999, },
        {name: 'Michael', username: 'mQuirozcookzzz', location: 'Austin, TX', email: 'mq@hotttmail.com', hashedpass: '$2a$12$TXc3608dPDej5345tl5IAOVOWEXThiNo8t2ch0bjfznWAZiy12Jsq', profile_pic_url: 'http://res.cloudinary.com/dcc5vb7ot/image/upload/v1508444126/pacific-rim-2013-hd-desktop-wallpaper_hqh3vd.jpg', total_following: 51, total_followers: 999999999, },
        {name: 'Peter', username: 'peterroxx', location: 'Austin, TX', email: 'ps@hotttmail.com', hashedpass: '$2a$12$TXc3608dPDej5345tl5IAOVOWEXThiNo8t2ch0bjfznWAZiy12Jsq', profile_pic_url: 'https://cdn-enterprise.discourse.org/gethopscotch1/uploads/default/original/2X/f/f13c9f277b7bebe1ad79f92012d664edec5f6b08.png', total_following: 435, total_followers: 999999999, },
        {name: 'Rachel', username: 'cssChef', location: 'Austin, TX', email: 'rc@hotttmail.com', hashedpass: '$2a$12$TXc3608dPDej5345tl5IAOVOWEXThiNo8t2ch0bjfznWAZiy12Jsq', profile_pic_url: 'http://res.cloudinary.com/dcc5vb7ot/image/upload/v1508374346/MeResize_w2aovs.jpg', total_following: 73, total_followers: 999999999, },
        {name: 'Ryan', username: 'ohioChef1', location: 'Austin, TX', email: 'rw@hotttmail.com', hashedpass: '$2a$12$TXc3608dPDej5345tl5IAOVOWEXThiNo8t2ch0bjfznWAZiy12Jsq', profile_pic_url: 'https://cdn-enterprise.discourse.org/gethopscotch1/uploads/default/original/2X/f/f13c9f277b7bebe1ad79f92012d664edec5f6b08.png', total_following: 27, total_followers: 999999999, },
        {name: 'Zubair', username: 'simmerdownG63', location: 'Austin, TX', email: 'zd@hotttmail.com', hashedpass: '$2a$12$TXc3608dPDej5345tl5IAOVOWEXThiNo8t2ch0bjfznWAZiy12Jsq', profile_pic_url: 'http://res.cloudinary.com/dcc5vb7ot/image/upload/v1508375706/simmerdown_v9zg23.jpg', total_following: 15, total_followers: 999999999, },
        {name: 'Louis', username: 'wafflerecipezonly', location: 'Austin, TX', email: 'ld@hotttmail.com', hashedpass: '$2a$12$TXc3608dPDej5345tl5IAOVOWEXThiNo8t2ch0bjfznWAZiy12Jsq', profile_pic_url: 'http://res.cloudinary.com/dcc5vb7ot/image/upload/v1508378277/786d9870800665cd2d0348c2549c7d7d_cf2xww.jpg', total_following: 91, total_followers: 999999999, },
        {name: 'Justin', username: 'thaidishes4dayz', location: 'Austin, TX', email: 'jb@hotttmail.com', hashedpass: '$2a$12$TXc3608dPDej5345tl5IAOVOWEXThiNo8t2ch0bjfznWAZiy12Jsq', profile_pic_url: 'https://cdn-enterprise.discourse.org/gethopscotch1/uploads/default/original/2X/f/f13c9f277b7bebe1ad79f92012d664edec5f6b08.png', total_following: 5, total_followers: 999999999, },

      ]);
    });
};
