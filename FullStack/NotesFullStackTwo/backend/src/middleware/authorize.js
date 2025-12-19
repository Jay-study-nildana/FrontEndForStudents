/**
 * Role-checking middlewares and wrapper helpers.
 * Token-claims only — reads roles from req.user set by authenticate / optionalAuthenticate.
 */

/**
 * requireRole(role) - route-level middleware
 * Usage: router.get('/admin', authenticate, requireRole('admin'), handler)
 */
function requireRole(role) {
  return (req, res, next) => {
    const roles = req.user?.roles || [];
    if (!Array.isArray(roles) || !roles.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    return next();
  };
}

/**
 * requireAnyRole(rolesArray) - route-level middleware to allow any of provided roles
 * Usage: router.post('/moderate', authenticate, requireAnyRole(['admin','moderator']), handler)
 */
function requireAnyRole(allowed = []) {
  return (req, res, next) => {
    const roles = req.user?.roles || [];
    const ok = Array.isArray(roles) && allowed.some(r => roles.includes(r));
    if (!ok) return res.status(403).json({ error: 'Forbidden' });
    return next();
  };
}

/**
 * withRole(role, handler) - endpoint-level wrapper that enforces role before calling handler.
 * Usage: router.delete('/:id', authenticate, withRole('admin', async (req,res)=>{ ... }))
 */
function withRole(role, handler) {
  return async (req, res, next) => {
    try {
      const roles = req.user?.roles || [];
      if (!Array.isArray(roles) || !roles.includes(role)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      return await handler(req, res, next);
    } catch (err) {
      return next(err);
    }
  };
}

/**
 * withAnyRole(rolesArray, handler)
 */
function withAnyRole(rolesArray, handler) {
  return async (req, res, next) => {
    try {
      const roles = req.user?.roles || [];
      const ok = Array.isArray(roles) && rolesArray.some(r => roles.includes(r));
      if (!ok) return res.status(403).json({ error: 'Forbidden' });
      return await handler(req, res, next);
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = {
  requireRole,
  requireAnyRole,
  withRole,
  withAnyRole,
};