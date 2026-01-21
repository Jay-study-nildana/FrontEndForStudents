document.addEventListener('DOMContentLoaded', () => {
    const outputDiv = document.getElementById('array-demo');
    const fruitInput = document.getElementById('fruit-input');
    
    let fruits = ['apple', 'banana', 'cherry'];

    const randomFruits = [
        'mango', 'pear', 'peach', 'plum', 'grape',
        'melon', 'kiwi', 'orange', 'papaya', 'pineapple',
        'pomegranate', 'strawberry', 'blueberry', 'blackberry', 'raspberry'
    ];

    function renderArray(title, array) {
        outputDiv.innerHTML = ''; // Clear previous content

        const heading = document.createElement('h3');
        heading.textContent = title;
        outputDiv.appendChild(heading);
        
        const list = document.createElement('ul');
        array.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            list.appendChild(listItem);
        });
        outputDiv.appendChild(list);
    }

    function addToList(action) {
        const fruit = fruitInput.value.trim();
        if (fruit) {
            if (action === 'end') {
                fruits.push(fruit);
                renderArray(`After adding "${fruit}" to end`, fruits);
            } else if (action === 'start') {
                fruits.unshift(fruit);
                renderArray(`After adding "${fruit}" to start`, fruits);
            }
            fruitInput.value = ''; // Clear input
        } else {
            alert("Please enter a fruit name!");
        }
    }

    function addRandomFruits() {
        for (let i = 0; i < 10; i++) {
            const randomFruit = randomFruits[Math.floor(Math.random() * randomFruits.length)];
            fruits.push(randomFruit);
        }
        renderArray('After adding 10 random fruits', fruits);
    }

    renderArray('Initial Array', fruits);

    document.getElementById('add-end').addEventListener('click', () => addToList('end'));
    
    document.getElementById('remove-end').addEventListener('click', () => {
        if (fruits.length > 0) fruits.pop();
        renderArray(`After removing from end`, fruits);
    });

    document.getElementById('add-start').addEventListener('click', () => addToList('start'));

    document.getElementById('remove-start').addEventListener('click', () => {
        if (fruits.length > 0) fruits.shift();
        renderArray(`After removing from start`, fruits);
    });

    document.getElementById('add-random').addEventListener('click', addRandomFruits);
});

