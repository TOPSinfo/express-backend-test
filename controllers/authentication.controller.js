const jwt = require('jsonwebtoken');
const { users } = require('../config/details');

// Define a function for user login
const loginUser = async (req, res) => {
  try {

    const { userName, password } = req.body;

    // Retrieve user information from the 'users' object based on the 'userName'
    const user = users[userName];

    const secretKey = process.env.SECRET_KEY;

    // Check if the user does not exist or the password does not match
    if (!user || user.password !== password) {
      return res.status(401).json({
        message: 'Invalid userName or password.',
      });
    }

    // Generate a JWT token containing the user's 'userName' and 'role'
    const token = jwt.sign(
      { userName: user.userName, role: user.role },
      secretKey,
    );

    // Send a success response with the token upon successful login
    return res.status(200).json({
      status: true,
      message: `${userName} logged in successfully!`,
      token,
    });
  } catch (error) {
    return res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  loginUser,
};
