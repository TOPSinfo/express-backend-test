const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Test Task',
      version: '1.0.0',
      description: 'API documentation for Test Task Node-Express-Backend with PostgreSql',
    },
  },
  apis: ['./routes/*.js'], // Replace with the path to your Express routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
