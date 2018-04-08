const Sequelize = require("sequelize");

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/campuse_registry_db",
  {
    logging: false
  }
);

module.exports = conn;
