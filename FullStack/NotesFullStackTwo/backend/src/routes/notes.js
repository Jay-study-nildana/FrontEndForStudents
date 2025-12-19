const express = require('express');
const { body, param, query } = require('express-validator');
const notesController = require('../controllers/notesController');

const router = express.Router();

// Validation rules
const idParam = param('id').isInt().withMessage('Invalid id (must be integer)');
const titleBody = body('title').isString().trim().isLength({ min: 1 }).withMessage('Title is required');
const contentBody = body('content').optional().isString();
const qQuery = query('q').isString().trim().isLength({ min: 1 }).withMessage('Query parameter q is required');
const nQuery = query('n').optional().isInt({ min: 1, max: 1000 }).withMessage('n must be an integer between 1 and 1000').toInt();
const limitQuery = query('limit').optional().isInt({ min: 1, max: 100 }).toInt();
const pageQuery = query('page').optional().isInt({ min: 1 }).toInt();

/**
 * @openapi
 * tags:
 *   - name: Notes
 *     description: Operations on notes
 */

/**
 * @openapi
 * /api/notes:
 *   get:
 *     tags:
 *       - Notes
 *     summary: List notes
 *     responses:
 *       200:
 *         description: Array of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
router.get('/', notesController.getNotes);

/**
 * @openapi
 * /api/notes/paginated:
 *   get:
 *     tags:
 *       - Notes
 *     summary: List notes with pagination
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of notes per page (default 20)
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number (default 1)
 *     responses:
 *       200:
 *         description: Paginated list of notes with metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Note'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
router.get('/paginated', limitQuery, pageQuery, notesController.getNotesPaginated);

/**
 * @openapi
 * /api/notes/search:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Search notes by query across all note properties
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search term (matches title, content, id, or createdAt)
 *     responses:
 *       200:
 *         description: Array of matching notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       400:
 *         description: Validation error (missing or invalid q)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */

// New: search route (place before :id to avoid route conflicts)
router.get('/search', qQuery, notesController.searchNotes);

/**
 * @openapi
 * /api/notes/seed:
 *   post:
 *     tags:
 *       - Notes
 *     summary: Create n random notes
 *     parameters:
 *       - in: query
 *         name: n
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 1000
 *         description: Number of random notes to create (default 10)
 *     responses:
 *       201:
 *         description: Number of notes created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 created:
 *                   type: integer
 *       400:
 *         description: Validation error
 */
router.post('/seed', nQuery, notesController.seedNotes);

/**
 * @openapi
 * /api/notes/{id}:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Get a single note by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the note to get
 *     responses:
 *       200:
 *         description: A single note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', idParam, notesController.getNote);

/**
 * @openapi
 * /api/notes:
 *   post:
 *     tags:
 *       - Notes
 *     summary: Create a note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Note created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
router.post('/', titleBody, contentBody, notesController.createNote);

/**
 * @openapi
 * /api/notes/{id}:
 *   put:
 *     tags:
 *       - Notes
 *     summary: Update a note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the note to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: Updated note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', idParam, titleBody, contentBody, notesController.updateNote);

/**
 * @openapi
 * /api/notes/{id}:
 *   delete:
 *     tags:
 *       - Notes
 *     summary: Delete a note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the note to delete
 *     responses:
 *       204:
 *         description: No content (deleted)
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', idParam, notesController.deleteNote);

module.exports = router;