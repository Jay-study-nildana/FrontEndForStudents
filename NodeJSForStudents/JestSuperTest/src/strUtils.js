/**
 * String manipulation utility functions
 */

/**
 * Reverses a string
 * @param {string} str - The string to reverse
 * @returns {string} The reversed string
 */
function reverseString(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return str.split('').reverse().join('');
}

/**
 * Capitalizes the first letter of each word
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
function capitalizeWords(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Checks if a string is a palindrome
 * @param {string} str - The string to check
 * @returns {boolean} True if palindrome, false otherwise
 */
function isPalindrome(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

/**
 * Truncates a string to a specified length and adds ellipsis
 * @param {string} str - The string to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} The truncated string
 */
function truncate(str, maxLength) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  if (typeof maxLength !== 'number' || maxLength < 0) {
    throw new TypeError('maxLength must be a non-negative number');
  }
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
}

/**
 * Counts the occurrences of a substring in a string
 * @param {string} str - The string to search in
 * @param {string} substring - The substring to count
 * @returns {number} Number of occurrences
 */
function countOccurrences(str, substring) {
  if (typeof str !== 'string' || typeof substring !== 'string') {
    throw new TypeError('Both arguments must be strings');
  }
  if (substring === '') {
    return 0;
  }
  let count = 0;
  let position = 0;
  while ((position = str.indexOf(substring, position)) !== -1) {
    count++;
    position += substring.length;
  }
  return count;
}

/**
 * Converts a string to camelCase
 * @param {string} str - The string to convert
 * @returns {string} The camelCase string
 */
function toCamelCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
}

/**
 * Removes all whitespace from a string
 * @param {string} str - The string to process
 * @returns {string} String without whitespace
 */
function removeWhitespace(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return str.replace(/\s+/g, '');
}

module.exports = {
  reverseString,
  capitalizeWords,
  isPalindrome,
  truncate,
  countOccurrences,
  toCamelCase,
  removeWhitespace,
};