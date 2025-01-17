document.getElementById('showDetailsBtn').addEventListener('click', () => {
    // Get the values from the input fields
    const name = document.getElementById('personName').value.trim();
    const age = document.getElementById('personAge').value.trim();
    const country = document.getElementById('personCountry').value.trim();

    // Validate inputs
    if (!name || !age || !country) {
        document.getElementById('result').textContent = 'Please fill in all fields.';
        return;
    }

    // Create an object using the input values
    const person = { name, age, country };

    // Destructure the object to extract values
    const { name: personName, age: personAge, country: personCountry } = person;

    // Display the result
    document.getElementById('result').textContent = `Name: ${personName}, Age: ${personAge}, Country: ${personCountry}`;
});