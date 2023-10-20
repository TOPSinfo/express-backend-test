/**
 * @swagger
 * tags:
 *   name: Locus
 *   description: Locus related endpoints
 */

/**
 * @swagger
 * securitySchemes:
 *   BearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
 
/**
 * @swagger
 * /locus:
 *   get:
 *     summary: Get locus data
 *     tags: [Locus]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer token for authentication
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         description: Locus ID (0 or 1)
 *       - in: query
 *         name: assemblyId
 *         schema:
 *           type: number
 *         description: Assembly ID (0 or 1)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *         description: Number of items per page
 *       - in: query
 *         name: currentPage
 *         schema:
 *           type: number
 *         description: Current page number
 *       - in: query
 *         name: regionId
 *         schema:
 *           type: number
 *         description: Region ID (0 or 1)
 *       - in: query
 *         name: sideLoading
 *         schema:
 *           type: number
 *         description: Side loading (0 or 1)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by (locusName, publicLocusName)
 *     responses:
 *       200:
 *         description: Successful retrieval of locus data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   description: A message indicating the request status.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: Locus ID
 *                       assemblyId:
 *                         type: number
 *                         description: Assembly ID
 *                       locusName:
 *                         type: string
 *                         description: Locus name
 *                       publicLocusName:
 *                         type: string
 *                         description: Public locus name
 *                       chromoSome:
 *                         type: string
 *                         description: Chromosome
 *                       strand:
 *                         type: string
 *                         description: Strand
 *                       locusStartedAt:
 *                         type: number
 *                         description: Locus start date
 *                       locusStoppedAt:
 *                         type: number
 *                         description: Locus stop date
 *                       memberCount:
 *                         type: number
 *                         description: Member count
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalRecords:
 *                       type: number
 *                       description: Total number of records
 *                     totalPages:
 *                       type: number
 *                       description: Total number of pages
 *                     currentPage:
 *                       type: number
 *                       description: Current page number
 *                     pageSize:
 *                       type: number
 *                       description: Number of items per page
 *       400:
 *         description: Bad request, invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the request was unsuccessful.
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue.
 *       401:
 *         description: Unauthorized, missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the request was unsuccessful.
 *                 message:
 *                   type: string
 *                   description: Error message indicating missing or invalid token.
 *       404:
 *         description: Error during retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the request was unsuccessful.
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue.
 */

const express = require('express');
const { getLocus } = require('../controllers/locus.controller');
const { authenticateJWT } = require('../middlewares/authentication.middleware');
const { getLocusValidation } = require('../validations/locus.validation');

const router = express.Router();

router.get(
  '/',
  authenticateJWT,
  getLocusValidation,
  getLocus,
);

module.exports = router;
