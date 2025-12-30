document.getElementById('calculateBtn').addEventListener('click', () => {
    // Get the values from the input field
    const numbersInput = document.getElementById('numbers').value;
    
    // Convert the input string to an array of numbers
    const numbersArray = numbersInput.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
    
    // Check if the input is valid
    if (numbersArray.length === 0) {
        document.getElementById('result').textContent = 'Please enter valid numbers.';
        return;
    }

    // Function using rest parameters to calculate the sum
    const calculateSum = (...numbers) => {
        return numbers.reduce((acc, current) => acc + current, 0);
    };

    // Calculate the result
    const result = calculateSum(...numbersArray);

    // Display the result
    document.getElementById('result').textContent = `The sum is: ${result}`;
});