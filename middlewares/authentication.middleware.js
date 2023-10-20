const jwt = require('jsonwebtoken');
const { users, secretKey } = require('../config/details');

function authenticateJWT(req, res, next) {

  const authHeader = req.header('Authorization');


  const token = (!authHeader) ? req.query.Authorization : authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    const user = users[decoded.userName];

    if (!user) {
      return res.status(403).json({ message: 'User not found.' });
    }

    req.user = user;
    return next();
  });

}

module.exports = {
  authenticateJWT,
};
