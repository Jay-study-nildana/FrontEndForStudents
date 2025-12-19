const express = require('express');
const authController = require('../controllers/authController');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Authentication and user management
 */

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created (safe user object returned)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 name:
 *                   type: string
 *                   example: "Jane Doe"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       409:
 *         description: Email already in use
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/register', authController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign in and receive an access token (Bearer) and a refresh cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Authentication successful. Returns access token and user info. Refresh token set as HttpOnly cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: 'JWT to use in Authorization: Bearer {token}'
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post('/login', authController.login);

/**
 * @openapi
 * /api/auth/refresh:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Rotate refresh token and receive a new access token
 *     description: |
 *       The client must send the refresh token cookie (HttpOnly) with this request.
 *       A new access token is returned in the response body and a rotated refresh token cookie is set.
 *     responses:
 *       200:
 *         description: New access token issued and refresh cookie rotated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post('/refresh', authController.refreshToken);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout and revoke refresh token
 *     description: Logs the user out by revoking the refresh token stored in the HttpOnly cookie.
 *     responses:
 *       204:
 *         description: Logged out (no content)
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post('/logout', authController.logout);

/**
 * @openapi
 * /api/auth/assign-role:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Assign a role to a user (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 2
 *               role:
 *                 type: string
 *                 example: "admin"
 *             required:
 *               - userId
 *               - role
 *     responses:
 *       200:
 *         description: Role assigned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 role:
 *                   type: string
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.post('/assign-role', authenticate, requireRole('admin'), authController.assignRole);

/**
 * @openapi
 * /api/auth/claims:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Decode a token and show all claims (accepts token in body or Authorization header)
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: JWT token to decode (if not provided in Authorization header)
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Decoded token header and payload (claims)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 header:
 *                   type: object
 *                 payload:
 *                   type: object
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *
 *   get:
 *     tags:
 *       - Auth
 *     summary: Decode a token provided as query parameter `token` or via Authorization header
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         description: JWT token to decode
 *     responses:
 *       200:
 *         description: Decoded token header and payload (claims)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 header:
 *                   type: object
 *                 payload:
 *                   type: object
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.post('/claims', authController.showClaims);
router.get('/claims', authController.showClaims);

/**
 * @openapi
 * /api/auth/claims/header:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Decode the Bearer token from Authorization header and show claims (protected)
 *     description: This endpoint requires a valid Bearer access token in the Authorization header. The token is decoded and its header/payload are returned.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Decoded token header and payload (claims)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 header:
 *                   type: object
 *                 payload:
 *                   type: object
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/claims/header', authenticate, authController.showClaimsFromHeader);

module.exports = router;