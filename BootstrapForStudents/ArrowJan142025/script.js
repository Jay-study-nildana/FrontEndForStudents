document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('text');

    document.getElementById('container').addEventListener('click', (event) => {
        if (event.target.id === 'arrowFunctionButton') {
            // Arrow function example
            const arrowFunction = () => {
                // 'this' refers to the value of 'this' outside the arrow function
                return "This is an ES6 Arrow Function!";
            };
            textElement.textContent = arrowFunction();
        } else if (event.target.id === 'regularFunctionButton') {
            // Regular function example
            function regularFunction() {
                // 'this' scope depends on how the function is called
                return "This is a Regular Function!";
            }
            textElement.textContent = regularFunction();
        }
    });
});
