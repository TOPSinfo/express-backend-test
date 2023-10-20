const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LocusMember = sequelize.define('LocusMember', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
  },
  ursTaxId: {
    type: DataTypes.TEXT,
    field: 'urs_taxid',
  },
  regionId: {
    type: DataTypes.INTEGER,
    field: 'region_id',
  },
  locusId: {
    type: DataTypes.BIGINT,
    field: 'locus_id',
  },
  membershipStatus: {
    type: DataTypes.TEXT,
    field: 'membership_status',
  },
}, {
  tableName: 'rnc_locus_members',
  timestamps: false,
});

module.exports = LocusMember;
