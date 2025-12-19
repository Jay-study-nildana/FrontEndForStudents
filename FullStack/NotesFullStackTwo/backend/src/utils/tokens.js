const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || '15m';
const REFRESH_TOKEN_EXPIRES_DAYS = parseInt(process.env.REFRESH_TOKEN_EXPIRES_DAYS || '30', 10);

if (!JWT_SECRET) {
  console.warn('JWT_SECRET not set — set in .env for production');
}

function signAccessToken(userId, roles = []) {
  const payload = {
    sub: String(userId),
    roles
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
}

function verifyAccessToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

function generateRefreshTokenValue() {
  return crypto.randomBytes(48).toString('hex');
}

async function createRefreshTokenForUser(userId) {
  const tokenValue = generateRefreshTokenValue();
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000);
  const created = await prisma.refreshToken.create({
    data: {
      token: tokenValue,
      userId,
      expiresAt
    }
  });
  return created;
}

async function revokeRefreshToken(tokenValue) {
  await prisma.refreshToken.updateMany({
    where: { token: tokenValue },
    data: { revoked: true }
  });
}

async function findValidRefreshToken(tokenValue) {
  return prisma.refreshToken.findFirst({
    where: {
      token: tokenValue,
      revoked: false,
      expiresAt: { gt: new Date() }
    },
    include: { user: true }
  });
}

async function deleteExpiredRefreshTokens() {
  await prisma.refreshToken.deleteMany({
    where: {
      expiresAt: { lt: new Date() }
    }
  });
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
  generateRefreshTokenValue,
  createRefreshTokenForUser,
  revokeRefreshToken,
  findValidRefreshToken,
  deleteExpiredRefreshTokens
};