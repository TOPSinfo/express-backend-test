/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the login was successful.
 *                 message:
 *                   type: string
 *                   description: A message indicating the login status.
 *                 token:
 *                   type: string
 *                   description: The JWT token for authentication in other APIs.
 *       401:
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating invalid credentials.
 *       404:
 *         description: Error during login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the login was unsuccessful.
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue.
 */

const express = require('express');
const { loginUser } = require('../controllers/authentication.controller');
const { logInValidation } = require('../validations/authentication.validation');

const router = express.Router();

router.post(
  '/login',
  logInValidation,
  loginUser,
);

module.exports = router;
