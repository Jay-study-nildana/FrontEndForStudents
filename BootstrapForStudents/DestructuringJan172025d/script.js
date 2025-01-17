document.getElementById('showDetailsBtn').addEventListener('click', () => {
    // Get the values from the input field
    const arrayInput = document.getElementById('arrayInput').value;

    // Validate input
    if (!arrayInput) {
        document.getElementById('result').textContent = 'Please enter array elements.';
        return;
    }

    // Convert the input string to an array
    const array = arrayInput.split(',').map(item => item.trim());

    // Destructure the array to assign variables
    const [first, second, third, ...rest] = array;

    // Display the result
    document.getElementById('result').textContent = `First: ${first}, Second: ${second}, Third: ${third}, Rest: [${rest.join(', ')}]`;
});