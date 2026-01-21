document.addEventListener('DOMContentLoaded', () => {
    const stringInput = document.getElementById('string-input');
    const resultDiv = document.getElementById('result');

    function displayResult(operation, result) {
        resultDiv.innerHTML = `<strong>${operation}:</strong> ${result}`;
    }

    document.getElementById('to-uppercase').addEventListener('click', () => {
        const inputText = stringInput.value;
        displayResult('Uppercase', inputText.toUpperCase());
    });

    document.getElementById('to-lowercase').addEventListener('click', () => {
        const inputText = stringInput.value;
        displayResult('Lowercase', inputText.toLowerCase());
    });

    document.getElementById('length').addEventListener('click', () => {
        const inputText = stringInput.value;
        displayResult('Length', inputText.length);
    });

    document.getElementById('trim').addEventListener('click', () => {
        const inputText = stringInput.value;
        displayResult('Trimmed', inputText.trim());
    });

    document.getElementById('substring').addEventListener('click', () => {
        const inputText = stringInput.value;
        if (inputText.length >= 5) {
            displayResult('Substring (0,5)', inputText.substring(0, 5));
        } else {
            displayResult('Substring (0,5)', 'Input is too short');
        }
    });

    document.getElementById('replace').addEventListener('click', () => {
        const inputText = stringInput.value;
        // Example replace: replace "Hello" with "Hi"
        const replacedText = inputText.replace("Hello", "Hi");
        displayResult('Replace "Hello" with "Hi"', replacedText);
    });
});
