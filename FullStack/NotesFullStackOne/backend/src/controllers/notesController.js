const { validationResult } = require('express-validator');
const prisma = require('../prisma');

// GET /api/notes
exports.getNotes = async (req, res, next) => {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

exports.getNotesPaginated = async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const skip = (page - 1) * limit;

    const [total, notes] = await Promise.all([
      prisma.note.count(),
      prisma.note.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      })
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: notes,
      meta: { total, page, limit, totalPages }
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/notes/:id
exports.getNote = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const note = await prisma.note.findUnique({ where: { id } });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

// POST /api/notes
exports.createNote = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, content } = req.body;
    const note = await prisma.note.create({
      data: {
        title,
        content: content ?? ''
      }
    });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

// PUT /api/notes/:id
exports.updateNote = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const id = parseInt(req.params.id, 10);
    const { title, content } = req.body;
    const existing = await prisma.note.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Note not found' });

    const updated = await prisma.note.update({
      where: { id },
      data: {
        title,
        content: content ?? ''
      }
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/notes/:id
exports.deleteNote = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existing = await prisma.note.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Note not found' });

    await prisma.note.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// SEARCH /api/notes/search?q=...
exports.searchNotes = async (req, res, next) => {
  try {
    const q = (req.query.q || '').toString().trim();
    if (!q) return res.status(400).json({ error: 'Query parameter q is required' });

    const or = [
      { title: { contains: q, mode: 'insensitive' } },
      { content: { contains: q, mode: 'insensitive' } }
    ];

    const maybeNumber = Number(q);
    if (Number.isInteger(maybeNumber)) {
      or.push({ id: parseInt(q, 10) });
    }

    const parsed = Date.parse(q);
    if (!Number.isNaN(parsed)) {
      const d = new Date(parsed);
      const start = new Date(d); start.setHours(0,0,0,0);
      const end = new Date(start); end.setDate(end.getDate() + 1);
      or.push({ createdAt: { gte: start, lt: end } });
    }

    const notes = await prisma.note.findMany({
      where: { OR: or },
      orderBy: { createdAt: 'desc' },
      take: 100
    });

    res.json(notes);
  } catch (err) {
    next(err);
  }
};

// New: seed n random notes
exports.seedNotes = async (req, res, next) => {
  try {
    const n = Math.min(parseInt(req.query.n, 10) || 10, 1000);
    if (n <= 0) return res.status(400).json({ error: 'n must be a positive integer' });

    const sampleTitles = ['Meeting', 'Plan', 'Todo', 'Note', 'Reminder', 'Idea', 'Task', 'Log', 'Memo', 'Insight'];
    const sampleContents = [
      'Discuss roadmap and priorities.',
      'Follow up with the team.',
      'Prepare slides for the presentation.',
      'Review pull requests and merge.',
      'Set deadlines and owners.',
      'Brainstorm implementation details.',
      'Customer feedback and next steps.',
      'Research technical options.'
    ];

    const items = [];
    for (let i = 0; i < n; i++) {
      const title = `${sampleTitles[Math.floor(Math.random() * sampleTitles.length)]} ${Math.floor(Math.random() * 100000)}`;
      const content = `${sampleContents[Math.floor(Math.random() * sampleContents.length)]} ${Math.random().toString(36).slice(2, 10)}`;
      items.push({ title, content });
    }

    const result = await prisma.note.createMany({ data: items });
    // createMany may return { count } depending on the Prisma version
    res.status(201).json({ created: result.count ?? items.length });
  } catch (err) {
    next(err);
  }
};