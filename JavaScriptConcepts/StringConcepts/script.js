document.addEventListener('DOMContentLoaded', () => {
    const userStringInput = document.getElementById('userString');
    const reverseButton = document.getElementById('reverseButton');
    const uppercaseButton = document.getElementById('uppercaseButton');
    const lengthButton = document.getElementById('lengthButton');
    const palindromeButton = document.getElementById('palindromeButton');
    const vowelCountButton = document.getElementById('vowelCountButton');
    const resultParagraph = document.getElementById('result');

    reverseButton.addEventListener('click', () => {
        const inputString = userStringInput.value;
        const reversedString = inputString.split('').reverse().join('');
        resultParagraph.textContent = `Reversed String: ${reversedString}`;
    });

    uppercaseButton.addEventListener('click', () => {
        const inputString = userStringInput.value;
        const uppercaseString = inputString.toUpperCase();
        resultParagraph.textContent = `Uppercase String: ${uppercaseString}`;
    });

    lengthButton.addEventListener('click', () => {
        const inputString = userStringInput.value;
        resultParagraph.textContent = `Length of String: ${inputString.length}`;
    });

    palindromeButton.addEventListener('click', () => {
        const inputString = userStringInput.value;
        const reversedString = inputString.split('').reverse().join('');
        const isPalindrome = inputString === reversedString;
        resultParagraph.textContent = `Is Palindrome: ${isPalindrome}`;
    });

    vowelCountButton.addEventListener('click', () => {
        const inputString = userStringInput.value.toLowerCase();
        const vowels = inputString.match(/[aeiou]/g);
        const vowelCount = vowels ? vowels.length : 0;
        resultParagraph.textContent = `Number of Vowels: ${vowelCount}`;
    });
});
