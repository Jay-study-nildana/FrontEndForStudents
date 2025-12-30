document.getElementById('showDetailsBtn').addEventListener('click', () => {
    // Get the values from the input fields
    const name = document.getElementById('personName').value.trim();
    const age = document.getElementById('personAge').value.trim();
    const country = document.getElementById('personCountry').value.trim();

    // Validate inputs
    if (!name || !age || !country) {
        alert('Please fill in all fields.');
        return;
    }

    // Create an object using the input values
    const person = {
        name: name,
        age: age,
        country: country
    };

    // Destructure the object to assign values to variables
    const { name: personName, age: personAge, country: personCountry } = person;

    // Display the result
    document.getElementById('result').textContent = `Name: ${personName}, Age: ${personAge}, Country: ${personCountry}`;
});