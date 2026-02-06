/**
 * Router exposing:
 *  - POST /files/upload    => accepts multipart/form-data field "file" (single file)
 *  - GET  /files           => returns list of uploaded files metadata
 *
 * Expects req.requestId to be present (middleware responsibility).
 * Uses multer memoryStorage to avoid disk writes.
 */

const express = require('express');
const multer = require('multer');
const router = express.Router();
const logger = require('../src/logger');
const filesStore = require('../src/fileStoreUtils');

const upload = multer({ storage: multer.memoryStorage() });

// POST /files/upload
router.post('/upload', upload.single('file'), (req, res) => {
  logger.info({ route: '/files/upload', requestId: req.requestId }, 'file upload');
  // Validate presence of file
  if (!req.file || typeof req.file !== 'object') {
    return res
      .status(400)
      .json({ error: 'file is required (multipart/form-data field "file")', requestId: req.requestId });
  }

  const { originalname, mimetype, size, buffer } = req.file;
  try {
    const saved = filesStore.addFile({ originalname, mimetype, size, buffer });
    // Return metadata (no buffer)
    const { buffer: _buf, ...meta } = saved;
    return res.status(201).json({ file: meta });
  } catch (err) {
    logger.error({ route: '/files/upload', requestId: req.requestId, err: err.message }, 'file upload error');
    return res.status(500).json({ error: 'internal error', requestId: req.requestId });
  }
});

// GET /files
router.get('/', (req, res) => {
  logger.info({ route: '/files', requestId: req.requestId }, 'list files');
  try {
    const files = filesStore.listFiles();
    return res.json({ files });
  } catch (err) {
    logger.error({ route: '/files', requestId: req.requestId, err: err.message }, 'list files error');
    return res.status(500).json({ error: 'internal error', requestId: req.requestId });
  }
});

module.exports = { router };