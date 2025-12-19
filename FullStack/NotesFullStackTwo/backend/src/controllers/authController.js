const bcrypt = require('bcrypt');
const prisma = require('../prisma');
const {
  signAccessToken,
  createRefreshTokenForUser,
  findValidRefreshToken,
  revokeRefreshToken
} = require('../utils/tokens');
const jwt = require('jsonwebtoken');

const COOKIE_NAME = process.env.REFRESH_TOKEN_COOKIE_NAME || 'refreshToken';
const COOKIE_MAX_AGE = (parseInt(process.env.REFRESH_TOKEN_EXPIRES_DAYS || '30', 10)) * 24 * 60 * 60 * 1000;

async function register(req, res, next) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already in use' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name
      }
    });

    // Ensure default "user" role exists and attach
    const role = await prisma.role.upsert({
      where: { name: 'user' },
      update: {},
      create: { name: 'user' }
    });
    await prisma.userRole.create({
      data: { userId: user.id, roleId: role.id }
    });

    const safeUser = { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt };
    res.status(201).json(safeUser);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

    const user = await prisma.user.findUnique({
      where: { email },
      include: { roles: { include: { role: true } } }
    });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const roles = user.roles.map(ur => ur.role.name);
    const accessToken = signAccessToken(user.id, roles);

    // create refresh token record and set it as HttpOnly cookie
    const refresh = await createRefreshTokenForUser(user.id);

    res.cookie(COOKIE_NAME, refresh.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/api/auth/refresh'
    });

    res.json({
      accessToken,
      user: { id: user.id, email: user.email, name: user.name, roles }
    });
  } catch (err) {
    next(err);
  }
}

async function refreshToken(req, res, next) {
  try {
    const tokenValue = req.cookies?.[COOKIE_NAME];
    if (!tokenValue) return res.status(401).json({ error: 'No refresh token' });

    const stored = await findValidRefreshToken(tokenValue);
    if (!stored) return res.status(401).json({ error: 'Invalid or expired refresh token' });

    const user = await prisma.user.findUnique({
      where: { id: stored.userId },
      include: { roles: { include: { role: true } } }
    });
    if (!user) return res.status(401).json({ error: 'User not found' });

    // Rotate refresh token: revoke old and issue a new one
    await revokeRefreshToken(tokenValue);
    const newRefresh = await createRefreshTokenForUser(user.id);

    const roles = user.roles.map(ur => ur.role.name);
    const accessToken = signAccessToken(user.id, roles);

    res.cookie(COOKIE_NAME, newRefresh.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/api/auth/refresh'
    });

    res.json({
      accessToken,
      user: { id: user.id, email: user.email, name: user.name, roles }
    });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const tokenValue = req.cookies?.[COOKIE_NAME];
    if (tokenValue) {
      await revokeRefreshToken(tokenValue);
      res.clearCookie(COOKIE_NAME, { path: '/api/auth/refresh' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

/**
 * assignRole - protected endpoint (administrator)
 * body: { userId: number, role: string }
 */
async function assignRole(req, res, next) {
  try {
    const { userId, role } = req.body;
    if (!userId || !role) return res.status(400).json({ error: 'userId and role are required' });

    const dbRole = await prisma.role.upsert({
      where: { name: role },
      update: {},
      create: { name: role }
    });

    // Connect if not already
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId, roleId: dbRole.id } },
      update: {},
      create: { userId, roleId: dbRole.id }
    });

    res.json({ ok: true, role: dbRole.name });
  } catch (err) {
    next(err);
  }
}

// new endpoint: showClaims - accepts token via Authorization header (Bearer), body.token or query.token
async function showClaims(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : req.body?.token || req.query?.token;
    if (!token) return res.status(400).json({ error: 'token is required (Authorization header, body.token or query.token)' });

    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) return res.status(400).json({ error: 'invalid token' });

    res.json({ header: decoded.header, payload: decoded.payload });
  } catch (err) {
    next(err);
  }
}

// new: showClaimsFromHeader - protected endpoint, reads Bearer token from Authorization header only
async function showClaimsFromHeader(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization Bearer token required' });
    }
    const token = authHeader.slice(7);

    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) return res.status(400).json({ error: 'invalid token' });

    res.json({ header: decoded.header, payload: decoded.payload });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  assignRole,
  showClaims,
  showClaimsFromHeader
};