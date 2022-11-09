module.exports = {
  local: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "skilvul_article",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
  },
  development: {
    username: "user_dev",
    password: process.env.DB_PASSWORD,
    database: "skilvul_article",
    host: "database.dev.internet.com",
    port: 3306,
    dialect: "mysql",
  },
  production: {
    username: "user_prod",
    password: process.env.DB_PASSWORD,
    database: "skilvul_article",
    host: "database.production.internet.com",
    port: 3306,
    dialect: "mysql",
  },
};
