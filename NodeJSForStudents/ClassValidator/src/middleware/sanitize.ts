/**
 * Simple sanitization middleware (TypeScript)
 * - Recursively trims string fields and escapes HTML special characters
 *
 * Note: This is intentionally small for demo purposes. Consider
 * using well-tested libraries in production.
 */

import { RequestHandler } from 'express';

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeValue(value: any): any {
  if (typeof value === 'string') {
    return escapeHtml(value.trim());
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (value && typeof value === 'object') {
    const out: Record<string, any> = {};
    for (const key of Object.keys(value)) {
      out[key] = sanitizeValue(value[key]);
    }
    return out;
  }
  return value;
}

const sanitizeMiddleware: RequestHandler = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeValue(req.body);
  }
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeValue(req.query);
  }
  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeValue(req.params);
  }
  next();
};

export default sanitizeMiddleware;