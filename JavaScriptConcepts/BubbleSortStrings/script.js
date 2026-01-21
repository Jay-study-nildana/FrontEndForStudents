document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('list-container');
    const statusMessage = document.getElementById('status-message');
    let list = ['Apple', 'Orange', 'Banana', 'Grape', 'Peach'];

    function createListItems() {
        listContainer.innerHTML = '';
        list.forEach((value) => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-item');
            listItem.textContent = value;
            listContainer.appendChild(listItem);
        });
    }

    async function alphabeticalSort() {
        statusMessage.textContent = "Sorting started...";
        const items = document.querySelectorAll('.list-item');
        
        for (let i = 0; i < list.length - 1; i++) {
            for (let j = 0; j < list.length - i - 1; j++) {
                items[j].classList.add('active');
                items[j + 1].classList.add('active');

                await new Promise(resolve => setTimeout(resolve, 500));

                if (list[j].toLowerCase() > list[j + 1].toLowerCase()) {
                    [list[j], list[j + 1]] = [list[j + 1], list[j]];
                    createListItems();
                }

                items[j].classList.remove('active');
                items[j + 1].classList.remove('active');
                
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        statusMessage.textContent = "Sorting completed.";
    }

    function randomizeList() {
        const items = document.querySelectorAll('.list-item');
        items.forEach(item => item.classList.add('exploding'));

        setTimeout(() => {
            list.sort(() => Math.random() - 0.5);
            createListItems();
            statusMessage.textContent = "List randomized.";
        }, 600); // Match the duration of explode animation
    }

    document.getElementById('add-string').addEventListener('click', () => {
        const stringInput = document.getElementById('string-input');
        const string = stringInput.value.trim();
        if (string) {
            list.push(string);
            stringInput.value = '';
            createListItems();
            statusMessage.textContent = "String added.";
        }
    });

    document.getElementById('start-sort').addEventListener('click', async () => {
        await alphabeticalSort();
    });

    document.getElementById('randomize-list').addEventListener('click', () => {
        randomizeList();
    });

    createListItems();
});

