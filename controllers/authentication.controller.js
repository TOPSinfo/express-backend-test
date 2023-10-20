const jwt = require('jsonwebtoken');
const { users, secretKey } = require('../config/details');

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = users[userName];

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: 'Invalid userName or password.',
      });
    }

    const token = jwt.sign(
      { userName: user.userName, role: user.role },
      secretKey,
    );

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
