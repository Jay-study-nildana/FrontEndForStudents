document.getElementById('showDetailsBtn').addEventListener('click', () => {
    // Get the values from the input fields
    const name = document.getElementById('personName').value;
    const age = document.getElementById('personAge').value;
    const city = document.getElementById('personCity').value;
    const country = document.getElementById('personCountry').value;

    // Validate inputs
    if (!name || !age || !city || !country) {
        document.getElementById('result').textContent = 'Please fill in all fields.';
        return;
    }

    // Create a nested object using the input values
    const person = {
        name,
        age,
        address: {
            city,
            country
        }
    };

    // Destructure the nested object to assign values to variables
    const { name: personName, age: personAge, address: { city: personCity, country: personCountry } } = person;

    // Display the result
    document.getElementById('result').textContent = `Name: ${personName}, Age: ${personAge}, City: ${personCity}, Country: ${personCountry}`;
});