document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById('array-container');
    const statusMessage = document.getElementById('status-message');
    let array = [50, 23, 9, 18, 61, 32];

    function createBubbles() {
        arrayContainer.innerHTML = '';
        array.forEach((value, index) => {
            const bubble = document.createElement('div');
            bubble.classList.add('array-bubble');
            bubble.textContent = value;
            bubble.style.backgroundColor = getRandomColor();
            arrayContainer.appendChild(bubble);
        });
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    async function bubbleSort() {
        statusMessage.textContent = "Sorting started...";
        const bubbles = document.querySelectorAll('.array-bubble');
        let swapped;
        for (let i = 0; i < array.length - 1; i++) {
            swapped = false;
            for (let j = 0; j < array.length - i - 1; j++) {
                bubbles[j].classList.add('active');
                bubbles[j + 1].classList.add('active');

                await new Promise(resolve => setTimeout(resolve, 500));

                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    createBubbles();
                    swapped = true;
                }

                bubbles[j + 1].classList.remove('active');

                await new Promise(resolve => setTimeout(resolve, 500));
            }
            if (!swapped) break;
        }
        statusMessage.textContent = "Sorting completed.";
    }

    function randomizeArray() {
        const bubbles = document.querySelectorAll('.array-bubble');
        bubbles.forEach(bubble => bubble.classList.add('exploding'));

        setTimeout(() => {
            array.sort(() => Math.random() - 0.5);
            createBubbles();
            statusMessage.textContent = "Array randomized.";
        }, 600); // Match the duration of explode animation
    }

    document.getElementById('add-number').addEventListener('click', () => {
        const numberInput = document.getElementById('number-input');
        const number = parseInt(numberInput.value);
        if (!isNaN(number)) {
            array.push(number);
            numberInput.value = '';
            createBubbles();
            bubbleSort();
        }
    });

    document.getElementById('start-sort').addEventListener('click', async () => {
        createBubbles();
        await bubbleSort();
    });

    document.getElementById('randomize-array').addEventListener('click', () => {
        randomizeArray();
    });

    createBubbles();
});
