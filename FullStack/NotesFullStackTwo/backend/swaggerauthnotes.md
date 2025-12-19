# Testing auth refresh endpoint with HttpOnly cookies

Notes:

- The refresh endpoint in this project uses an HttpOnly cookie to store the refresh token.
- Swagger UI cannot set HttpOnly cookies for "Try it out" requests because those cookies are not accessible via JavaScript.
- To test the refresh flow you have a few options:

1. Use your browser + native UI

   - Use the app's login page (or POST /api/auth/login via browser) to receive the HttpOnly cookie.
   - Then use the "Try it out" for POST /api/auth/refresh in Swagger UI from the same browser session — the browser will send the cookie automatically.
   - Observe the response body for the new accessToken.

2. Use an HTTP client that supports cookies (Postman/Insomnia)

   - Perform a POST /api/auth/login to capture cookies.
   - Ensure cookies are included in subsequent POST /api/auth/refresh requests (Postman/Insomnia handle this automatically when the cookie jar is enabled).

3. Temporarily expose refresh token for testing only

   - For quick local testing you can (temporarily) modify the login endpoint to return the refresh token in the response body. DO NOT do this in production.
   - After testing, revert the change.

4. Use dev-only helper endpoint (optional)
   - You can add a dev-only endpoint that returns the current cookie or creates a test cookie. Protect it and remove before production.

Security reminders:

- Keep refresh tokens HttpOnly and Secure in production.
- Use HTTPS in production so cookies are only sent over encrypted connections.
- Remove any temporary testing helpers before deploying.
