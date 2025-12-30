document.getElementById('oneParameterButton').addEventListener('click', () => {
  // Arrow function with one parameter
  const greet = name => `Hello, ${name}!`;

  document.getElementById('text').textContent = greet('Alice');
});

document.getElementById('twoParametersButton').addEventListener('click', () => {
  // Arrow function with two parameters
  const add = (a, b) => a + b;

  document.getElementById('text').textContent = `5 + 10 = ${add(5, 10)}`;
});
