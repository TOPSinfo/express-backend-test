const express = require('express');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const swaggerSpec = require('./swagger');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and handle URL-encoded forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// register endpoint
app.use('/locus', require('./routes/locus.route'));
app.use('/auth', require('./routes/authentication.route'));

// route to access swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Handle incorrect routes
app.use('*', (req, res) => res.status(404).json({
  status: false,
  message: 'Incorrect route please check for typo and request type!',
  data: {},
}));

// Start the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    // Start the server once the database connection is successful
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
