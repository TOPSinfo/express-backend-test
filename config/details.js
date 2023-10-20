// Define an object containing user information for authentication
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

// Define an array of allowed region IDs
const allowedRegionIds = [86118093, 86696489, 88186467];

module.exports = {
  users,        
  allowedRegionIds,  
};
