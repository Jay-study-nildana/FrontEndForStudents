document.getElementById("varButton").addEventListener("click", function () {
  handleVarButtonClick();
});

document.getElementById("letButton").addEventListener("click", function () {
  handleLetButtonClick();
});

function handleVarButtonClick() {
  if (true) {
    var globalVar = "The scope of 'var' is function-wide or global.";
  }

  document.getElementById("text").textContent = globalVar;
  document.getElementById("error").textContent = "var usage";
}

function handleLetButtonClick() {
  if (true) {
    let blockLet = "The scope of 'let' is block-wide.";
    document.getElementById("text").textContent = blockLet;
  }

  try {
    document.getElementById("text").textContent = blockLet;
  } catch (error) {
    document.getElementById("error").textContent =
      "'blockLet' is not accessible outside the block.";
  }
}
