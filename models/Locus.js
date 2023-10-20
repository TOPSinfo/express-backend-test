const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const LocusMember = require('./LocusMember');

const Locus = sequelize.define('Locus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  assemblyId: {
    type: DataTypes.STRING,
    field: 'assembly_id',
  },
  locusName: {
    type: DataTypes.STRING,
    field: 'locus_name',
  },
  publicLocusName: {
    type: DataTypes.STRING,
    field: 'public_locus_name',
  },
  chromoSome: {
    type: DataTypes.STRING,
    field: 'chromosome',
  },
  strand: {
    type: DataTypes.STRING,
  },
  locusStartedAt: {
    type: DataTypes.INTEGER,
    field: 'locus_start',
  },
  locusStoppedAt: {
    type: DataTypes.INTEGER,
    field: 'locus_stop',
  },
  memberCount: {
    type: DataTypes.INTEGER,
    field: 'member_count',
  },

}, {
  tableName: 'rnc_locus',
  timestamps: false,
});

// Defined the associations related to locus
Locus.hasMany(LocusMember, { foreignKey: 'locus_id' });
LocusMember.belongsTo(Locus, { foreignKey: 'locus_id' });

module.exports = Locus;
