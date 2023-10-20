const users = {
  admin: {
    id: 1, userName: 'admin', password: 'test@password', role: 'admin',
  },
  normal: {
    id: 2, userName: 'normal', password: 'test@password', role: 'normal',
  },
  limited: {
    id: 3, userName: 'limited', password: 'test@password', role: 'limited',
  },
};

const secretKey = 'auth-secret';

const allowedRegionIds = [86118093, 86696489, 88186467];

module.exports = {
  users,
  secretKey,
  allowedRegionIds,
};
