document.getElementById('calculateBtn').addEventListener('click', () => {
    // Get the values from the input fields
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    // Validate input
    if (isNaN(num1)) {
        document.getElementById('result').textContent = 'Please enter a valid number for the first input.';
        return;
    }

    // Arrow function with default parameters
    const add = (a, b = 10) => a + b;

    // Calculate the result
    const result = add(num1, isNaN(num2) ? undefined : num2);

    // Display the result
    document.getElementById('result').textContent = `The sum is: ${result}`;
});