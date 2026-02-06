/**
 * Unit tests for string manipulation utilities
 */

const {
  reverseString,
  capitalizeWords,
  isPalindrome,
  truncate,
  countOccurrences,
  toCamelCase,
  removeWhitespace,
} = require('../src/strUtils');

describe('String Utilities', () => {
  describe('reverseString', () => {
    test('reverses a simple string', () => {
      expect(reverseString('hello')).toBe('olleh');
    });

    test('reverses a string with spaces', () => {
      expect(reverseString('hello world')).toBe('dlrow olleh');
    });

    test('returns empty string for empty input', () => {
      expect(reverseString('')).toBe('');
    });

    test('handles single character', () => {
      expect(reverseString('a')).toBe('a');
    });

    test('throws TypeError for non-string input', () => {
      expect(() => reverseString(123)).toThrow(TypeError);
      expect(() => reverseString(null)).toThrow(TypeError);
    });
  });

  describe('capitalizeWords', () => {
    test('capitalizes first letter of each word', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    test('handles mixed case input', () => {
      expect(capitalizeWords('hELLo WoRLd')).toBe('Hello World');
    });

    test('handles single word', () => {
      expect(capitalizeWords('javascript')).toBe('Javascript');
    });

    test('handles empty string', () => {
      expect(capitalizeWords('')).toBe('');
    });

    test('handles multiple spaces', () => {
      expect(capitalizeWords('hello  world')).toBe('Hello  World');
    });

    test('throws TypeError for non-string input', () => {
      expect(() => capitalizeWords(123)).toThrow(TypeError);
    });
  });

  describe('isPalindrome', () => {
    test('identifies simple palindrome', () => {
      expect(isPalindrome('racecar')).toBe(true);
    });

    test('identifies palindrome with mixed case', () => {
      expect(isPalindrome('RaceCar')).toBe(true);
    });

    test('identifies palindrome with spaces and punctuation', () => {
      expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
    });

    test('returns false for non-palindrome', () => {
      expect(isPalindrome('hello')).toBe(false);
    });

    test('returns true for empty string', () => {
      expect(isPalindrome('')).toBe(true);
    });

    test('returns true for single character', () => {
      expect(isPalindrome('a')).toBe(true);
    });

    test('throws TypeError for non-string input', () => {
      expect(() => isPalindrome(123)).toThrow(TypeError);
    });
  });

  describe('truncate', () => {
    test('truncates string longer than maxLength', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
    });

    test('returns original string if shorter than maxLength', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    test('returns original string if equal to maxLength', () => {
      expect(truncate('Hello', 5)).toBe('Hello');
    });

    test('handles empty string', () => {
      expect(truncate('', 5)).toBe('');
    });

    test('handles maxLength of 0', () => {
      expect(truncate('Hello', 0)).toBe('...');
    });

    test('throws TypeError for non-string input', () => {
      expect(() => truncate(123, 5)).toThrow(TypeError);
    });

    test('throws TypeError for invalid maxLength', () => {
      expect(() => truncate('hello', 'five')).toThrow(TypeError);
      expect(() => truncate('hello', -1)).toThrow(TypeError);
    });
  });

  describe('countOccurrences', () => {
    test('counts occurrences of substring', () => {
      expect(countOccurrences('hello world', 'l')).toBe(3);
    });

    test('counts occurrences of multi-character substring', () => {
      expect(countOccurrences('banana', 'na')).toBe(2);
    });

    test('returns 0 when substring not found', () => {
      expect(countOccurrences('hello', 'z')).toBe(0);
    });

    test('returns 0 for empty substring', () => {
      expect(countOccurrences('hello', '')).toBe(0);
    });

    test('returns 0 for empty string', () => {
      expect(countOccurrences('', 'a')).toBe(0);
    });

    test('is case-sensitive', () => {
      expect(countOccurrences('Hello hello', 'hello')).toBe(1);
    });

    test('throws TypeError for non-string inputs', () => {
      expect(() => countOccurrences(123, 'a')).toThrow(TypeError);
      expect(() => countOccurrences('hello', 123)).toThrow(TypeError);
    });
  });

  describe('toCamelCase', () => {
    test('converts hyphenated string to camelCase', () => {
      expect(toCamelCase('hello-world')).toBe('helloWorld');
    });

    test('converts underscored string to camelCase', () => {
      expect(toCamelCase('hello_world')).toBe('helloWorld');
    });

    test('converts space-separated string to camelCase', () => {
      expect(toCamelCase('hello world test')).toBe('helloWorldTest');
    });

    test('handles mixed separators', () => {
      expect(toCamelCase('hello-world_test case')).toBe('helloWorldTestCase');
    });

    test('handles already camelCase string', () => {
      expect(toCamelCase('helloWorld')).toBe('helloworld');
    });

    test('handles empty string', () => {
      expect(toCamelCase('')).toBe('');
    });

    test('throws TypeError for non-string input', () => {
      expect(() => toCamelCase(123)).toThrow(TypeError);
    });
  });

  describe('removeWhitespace', () => {
    test('removes all spaces', () => {
      expect(removeWhitespace('hello world')).toBe('helloworld');
    });

    test('removes tabs and newlines', () => {
      expect(removeWhitespace('hello\tworld\n')).toBe('helloworld');
    });

    test('removes multiple consecutive spaces', () => {
      expect(removeWhitespace('hello    world')).toBe('helloworld');
    });

    test('returns empty string for whitespace-only input', () => {
      expect(removeWhitespace('   ')).toBe('');
    });

    test('handles string with no whitespace', () => {
      expect(removeWhitespace('helloworld')).toBe('helloworld');
    });

    test('throws TypeError for non-string input', () => {
      expect(() => removeWhitespace(123)).toThrow(TypeError);
    });
  });
});