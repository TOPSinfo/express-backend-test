const { Op } = require('sequelize');
const Locus = require('../models/Locus');
const LocusMember = require('../models/LocusMember');
const { allowedRegionIds } = require('../config/details');

const getLocus = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 1000;
    const id = parseInt(req.query.id, 10);
    const assemblyId = parseInt(req.query.assemblyId, 10);
    const regionId = parseInt(req.query.regionId, 10);
    let sideLoading = parseInt(req.query.sideLoading, 10);
    const role = req.user.role;
    const sortBy = req.query.sortBy;
    const offset = (page - 1) * pageSize;

    let locusAttributes = [
      'id',
      'assemblyId',
      'locusName',
      'publicLocusName',
      'chromoSome',
      'strand',
      'locusStartedAt',
      'locusStoppedAt',
      'memberCount',
    ];

    let locusMemberAttributes = [
      'id',
      'ursTaxId',
      'regionId',
      'locusId',
      'membershipStatus',
    ];

    let whereCondition = {};

    if (!id) {
      locusAttributes = locusAttributes.filter((locusAttribute) => locusAttribute !== 'id');
    }

    if (!assemblyId) {
      locusAttributes = locusAttributes.filter((locusAttribute) => locusAttribute !== 'assemblyId');
    }

    if (!regionId) {
      locusMemberAttributes = locusMemberAttributes.filter((locusMemberAttribute) => locusMemberAttribute !== 'regionId');
    }

    // Permission handling
    if (role === 'normal') {
      locusMemberAttributes = [];
      sideLoading = 0;
    } else if (role === 'limited') {
      whereCondition = {
        region_id: { [Op.in]: allowedRegionIds },
      };
    }

    let includeModels = [{
      model: LocusMember,
      attributes: locusMemberAttributes,
      where: whereCondition,
    }];

    if (sideLoading === 0) {
      includeModels = [];
    }

    const { count, rows } = await Locus.findAndCountAll({
      limit: pageSize,
      offset,
      include: includeModels,
      attributes: locusAttributes,
    });

    const totalPages = Math.ceil(count / pageSize);

    if (sortBy) {
      rows.sort((a, b) => {
        const fieldA = a[sortBy].toLowerCase();
        const fieldB = b[sortBy].toLowerCase();

        if (fieldA < fieldB) return -1;
        if (fieldA > fieldB) return 1;
        return 0; 
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Data retrieved successfully',
      data: rows,
      pagination: {
        totalRecords: count,
        totalPages,
        currentPage: page,
        pageSize,
      },

    });
  } catch (error) {
    return res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getLocus,
};
