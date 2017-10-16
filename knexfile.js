// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      debug: true,
      database: 'postgres://localhost:5432/recipeer_dev'
    }
  },

  test: {
    client: 'pg',
    connection: {
      debug: true,
      database: 'postgres://localhost:5432/recipeer_test'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
