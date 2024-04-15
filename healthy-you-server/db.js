// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   password: "1111",
//   host: "localhost",
//   port: 5432, // default Postgres port
//   database: "healthyYou",
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:1111@localhost:5432/healthyYou"
);

module.exports = sequelize;
