document.getElementById('mergeBtn').addEventListener('click', () => {
    // Get the values from the input fields
    const array1Input = document.getElementById('array1').value;
    const array2Input = document.getElementById('array2').value;
    
    // Validate input
    if (!array1Input || !array2Input) {
        document.getElementById('result').textContent = 'Please enter both arrays.';
        return;
    }

    // Convert the input strings to arrays
    const array1 = array1Input.split(',').map(item => item.trim());
    const array2 = array2Input.split(',').map(item => item.trim());
    
    // Use the spread operator to merge the arrays
    const mergedArray = [...array1, ...array2];

    // Display the result
    document.getElementById('result').textContent = `Merged Array: [${mergedArray.join(', ')}]`;
});