# Test Task NodeJs ExpressJs Backend README

## Tech Stack and Tools
- Node.js
- Jest
- Express.js
- PostgreSQL
- JWT (JSON Web Tokens)
- Sequelize
- Joi

## Role-Based Access for Locus Data

As per our understanding, the document does not provide a concrete way to define role-based access to Locus data. Therefore, we have implemented a login API with dummy users and JWT authentication.

### Dummy Users and Passwords

To access different roles and test role-based access, you can use the following dummy users and passwords:

1. Admin Role:
   - Username: 'admin'
   - Password: 'test@password'

2. Normal User Role:
   - Username: 'normal'
   - Password: 'test@password'

3. Limited User Role:
   - Username: 'limited'
   - Password: 'test@password'

## Project Installation, Running Unit Tests And View Swagger Documentation Process

1. **To get started with this project, follow the steps below:**

   Clone the GitHub repository to your local machine using the following command:

   git clone https://github.com/TOPSinfo/express-backend-test.git

   cd express-backend-test

   npm i

   npm start

   project will be started on http://localhost:3000/

   get locus api end-point http://localhost:3000/locus

2. **To run the unit testing:**

   npm run test

3. **To view swagger documentation:**

   http://localhost:3000/api-doc