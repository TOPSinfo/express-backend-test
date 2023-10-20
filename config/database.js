const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'pfmegrnargs',
  username: 'reader',
  password: 'NWDMCE5xdipIjRrp',
  host: 'hh-pgsql-public.ebi.ac.uk',
  port: 5432,
  dialect: 'postgres',
});

module.exports = sequelize;
