/**
 * Router exposing string utility endpoints wrapping src/strUtils.js
 */
const express = require("express");
const router = express.Router();
const logger = require("../src/logger");
const strUtils = require("../src/strUtils");

// POST /str/reverse { str }
router.post("/reverse", (req, res) => {
  const { str } = req.body || {};
  logger.info(
    { route: "/str/reverse", requestId: req.requestId },
    "reverse request",
  );
  if (typeof str !== "string")
    return res
      .status(400)
      .json({ error: "str must be a string", requestId: req.requestId });
  const result = strUtils.reverseString(str);
  res.json({ result });
});

// POST /str/capitalize { str }
router.post("/capitalize", (req, res) => {
  const { str } = req.body || {};
  logger.info(
    { route: "/str/capitalize", requestId: req.requestId },
    "capitalize request",
  );
  if (typeof str !== "string")
    return res
      .status(400)
      .json({ error: "str must be a string", requestId: req.requestId });
  const result = strUtils.capitalizeWords(str);
  res.json({ result });
});

// POST /str/isPalindrome { str }
router.post("/isPalindrome", (req, res) => {
  const { str } = req.body || {};
  logger.info(
    { route: "/str/isPalindrome", requestId: req.requestId },
    "palindrome check",
  );
  if (typeof str !== "string")
    return res
      .status(400)
      .json({ error: "str must be a string", requestId: req.requestId });
  const result = strUtils.isPalindrome(str);
  res.json({ result });
});

// POST /str/truncate { str, maxLength }
router.post("/truncate", (req, res) => {
  const { str, maxLength } = req.body || {};
  logger.info(
    { route: "/str/truncate", requestId: req.requestId },
    "truncate request",
  );
  if (typeof str !== "string")
    return res
      .status(400)
      .json({ error: "str must be a string", requestId: req.requestId });
  if (typeof maxLength !== "number" || maxLength < 0)
    return res
      .status(400)
      .json({
        error: "maxLength must be a non-negative number",
        requestId: req.requestId,
      });
  const result = strUtils.truncate(str, maxLength);
  res.json({ result });
});

// POST /str/countOccurrences { str, substring }
router.post("/countOccurrences", (req, res) => {
  const { str, substring } = req.body || {};
  logger.info(
    { route: "/str/countOccurrences", requestId: req.requestId },
    "countOccurrences request",
  );
  if (typeof str !== "string" || typeof substring !== "string")
    return res
      .status(400)
      .json({
        error: "str and substring must be strings",
        requestId: req.requestId,
      });
  const count = strUtils.countOccurrences(str, substring);
  res.json({ count });
});

// POST /str/toCamelCase { str }
router.post("/toCamelCase", (req, res) => {
  const { str } = req.body || {};
  logger.info(
    { route: "/str/toCamelCase", requestId: req.requestId },
    "toCamelCase request",
  );
  if (typeof str !== "string")
    return res
      .status(400)
      .json({ error: "str must be a string", requestId: req.requestId });
  const result = strUtils.toCamelCase(str);
  res.json({ result });
});

// POST /str/removeWhitespace { str }
router.post("/removeWhitespace", (req, res) => {
  const { str } = req.body || {};
  logger.info(
    { route: "/str/removeWhitespace", requestId: req.requestId },
    "removeWhitespace request",
  );
  if (typeof str !== "string")
    return res
      .status(400)
      .json({ error: "str must be a string", requestId: req.requestId });
  const result = strUtils.removeWhitespace(str);
  res.json({ result });
});

module.exports = { router };
