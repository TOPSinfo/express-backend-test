// Import the 'jsonwebtoken' library for handling JWT (JSON Web Tokens)
const jwt = require('jsonwebtoken');
const { users } = require('../config/details');

// Define a middleware function for authenticating JWT tokens
function authenticateJWT(req, res, next) {

  const secretKey = process.env.SECRET_KEY;

  // Extract the 'Authorization' header from the request
  const authHeader = req.header('Authorization');

  const token = (!authHeader) ? req.query.Authorization : authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required.' });
  }

  // Verify the token with the provided secret key
  jwt.verify(token, secretKey, (err, decoded) => {

    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // Find the user based on the 'userName' decoded from the token
    const user = users[decoded.userName];

    if (!user) {
      return res.status(403).json({ message: 'User not found.' });
    }

    // Attach the user object to the request for further use in the route
    req.user = user;

    // Continue to the next middleware or route handler
    return next();
  });
}

module.exports = {
  authenticateJWT,
};
