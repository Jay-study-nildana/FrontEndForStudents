// Simple controller with three test endpoints.
// Each endpoint sends a plain string indicating which protection was used.

function publicEndpoint(req, res) {
  // No authentication required
  res.send('This endpoint is public: no authentication required.');
}

function authRequiredEndpoint(req, res) {
  // authenticate middleware must have set req.user
  res.send(`This endpoint requires a token. Authenticated as user id=${req.user?.id ?? 'unknown'}.`);
}

function adminOnlyEndpoint(req, res) {
  // authenticate + requireRole('admin') middleware must have run
  res.send(`This endpoint requires admin role. Authenticated admin id=${req.user?.id ?? 'unknown'}.`);
}

module.exports = {
  publicEndpoint,
  authRequiredEndpoint,
  adminOnlyEndpoint,
};