const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

const JWT_SECRET = process.env.JWT_SECRET;

// Helper: extract token from Authorization header "Bearer <token>"
function getTokenFromHeader(req) {
  const h = req.headers['authorization'] || req.headers['Authorization'];
  if (!h) return null;
  const parts = h.split(' ');
  if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
  return null;
}


/**
 * authenticate - parse and verify Authorization: Bearer <token>
 * On success attaches req.user = { id, roles } (roles from token if present)
 */
async function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }
  const token = auth.slice('Bearer '.length).trim();
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: parseInt(payload.sub, 10),
      roles: Array.isArray(payload.roles) ? payload.roles : []
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * requireRole - middleware factory to assert the user has at least one of the required roles
 * If you need authoritative roles (not token-embedded), set checkDb=true to fetch roles from DB.
 */
function requireRole(...requiredRoles) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

    let userRoles = req.user.roles || [];

    // If token had no roles, or you want to verify current roles, fetch from DB:
    if (!userRoles.length) {
      const dbUser = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: { roles: { include: { role: true } } }
      });
      userRoles = dbUser?.roles?.map(r => r.role.name) || [];
    }

    const has = requiredRoles.some(r => userRoles.includes(r));
    if (!has) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

/**
 * optionalAuthenticate: if token present and valid attach req.user, otherwise continue with req.user = null
 */
async function optionalAuthenticate(req, res, next) {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      req.user = null;
      return next();
    }
    const payload = verifyToken(token);
    req.user = {
      id: payload.sub ?? payload.id,
      email: payload.email,
      roles: Array.isArray(payload.roles) ? payload.roles : [],
      raw: payload,
    };
    return next();
  } catch {
    // treat invalid token as anonymous for optional flows
    req.user = null;
    return next();
  }
}

// verify token and return payload (throws on invalid/expired)
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { 
  authenticate, 
  requireRole,
  optionalAuthenticate,
  verifyToken,
  getTokenFromHeader
 };