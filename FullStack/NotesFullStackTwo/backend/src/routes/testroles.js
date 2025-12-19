// ...existing code...
const express = require('express');
const { authenticate } = require('../middleware/auth');
const { requireRole } = require('../middleware/authorize');
const testrolesController = require('../controllers/testrolesController');

const router = express.Router();

// Swagger: Public endpoint (no auth)
/**
 * @swagger
 * /api/testroles/public:
 *   get:
 *     summary: Public endpoint
 *     tags:
 *       - TestRoles
 *     description: Accessible without authentication.
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/public', testrolesController.publicEndpoint);
 
// Swagger: Auth required (bearer token)
/**
 * @swagger
 * /api/testroles/auth-only:
 *   get:
 *     summary: Authenticated endpoint
 *     tags:
 *       - TestRoles
 *     description: Requires a valid bearer token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
router.get('/auth-only', authenticate, testrolesController.authRequiredEndpoint);

// Swagger: Admin only (bearer token + admin role)
/**
 * @swagger
 * /api/testroles/admin-only:
 *   get:
 *     summary: Admin only endpoint
 *     tags:
 *       - TestRoles
 *     description: Requires valid token and 'admin' role.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/admin-only', authenticate, requireRole('admin'), testrolesController.adminOnlyEndpoint);
 
module.exports = router;
// ...existing code...