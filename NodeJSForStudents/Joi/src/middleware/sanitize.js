/**
 * Simple sanitization middleware
 *
 * Goals:
 * - Trim string values
 * - Escape HTML special characters (<, >, &, ", ')
 * - Remove top-level unexpected fields is handled by Joi (stripUnknown) in validation
 *
 * This is a light-weight sanitizer for demo purposes. For production consider
 * a vetted library and audit for edge cases.
 */

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function sanitizeValue(value) {
  if (typeof value === 'string') {
    // Trim and escape
    return escapeHtml(value.trim());
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value && typeof value === 'object') {
    // Recursively sanitize object
    const out = {};
    for (const key of Object.keys(value)) {
      out[key] = sanitizeValue(value[key]);
    }
    return out;
  }

  // Numbers, booleans, null, undefined are returned as-is
  return value;
}

module.exports = function sanitizeMiddleware(req, res, next) {
  // Sanitize body (only if body exists)
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeValue(req.body);
  }

  // Sanitize query params
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeValue(req.query);
  }

  // Sanitize params (route path params)
  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeValue(req.params);
  }

  next();
};