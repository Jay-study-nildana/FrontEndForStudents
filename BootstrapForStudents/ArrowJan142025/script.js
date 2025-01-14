document.getElementById('arrowFunctionButton').addEventListener('click', function() {
  // Arrow function example
  const arrowFunction = () => {
      // 'this' refers to the value of 'this' outside the arrow function
      return "This is an ES6 Arrow Function!";
  };

  document.getElementById('text').textContent = arrowFunction();
});

document.getElementById('regularFunctionButton').addEventListener('click', function() {
  // Regular function example
  function regularFunction() {
      // 'this' scope depends on how the function is called
      return "This is a Regular Function!";
  }

  document.getElementById('text').textContent = regularFunction();
});
