const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
let currentInput = '';
let operator = null;
let firstValue = null;
let resetNext = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;

        if (button.classList.contains('clear')) {
            clearCalculator();
            return;
        }

        if (resetNext) {
            currentInput = '';
            resetNext = false;
        }

        if (buttonValue >= '0' && buttonValue <= '9' || buttonValue === '.') {
            if (buttonValue === '.' && currentInput.includes('.')) {
                return; // Prevent multiple decimals
            }
            currentInput += buttonValue;
            display.textContent = currentInput;
        } else if (buttonValue === '=') {
            if (operator && firstValue !== null && currentInput !== '') {
                try {
                    currentInput = calculateResult();
                    display.textContent = currentInput;
                    firstValue = null;
                    operator = null;
                } catch (error) {
                    display.textContent = 'Error';
                }
            }
            resetNext = true;
        } else {
            if (!operator) {
                firstValue = parseFloat(currentInput);
                currentInput = '';
                operator = buttonValue;
            } else if (currentInput) {
                try {
                    firstValue = calculateResult();
                    operator = buttonValue;
                    display.textContent = firstValue;
                    currentInput = '';
                } catch (error) {
                    display.textContent = 'Error';
                    firstValue = null;
                    operator = null;
                }
            }
        }
    });
});

function clearCalculator() {
    currentInput = '';
    operator = null;
    firstValue = null;
    display.textContent = '0';
}

function calculateResult() {
    let secondValue = parseFloat(currentInput);
    if (operator === '/' && secondValue === 0) {
        throw new Error('Division by zero');
    }

    switch (operator) {
        case '+': return firstValue + secondValue;
        case '-': return firstValue - secondValue;
        case 'x': return firstValue * secondValue;
        case '/': return firstValue / secondValue;
        default: throw new Error('Invalid operation');
    }
}
