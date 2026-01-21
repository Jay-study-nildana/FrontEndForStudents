document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("photoGallery");
    const images = [
        'https://upload.wikimedia.org/wikipedia/commons/5/5f/AmeeshaPatel01.jpg',   // Replace these with your image URLs
        'https://upload.wikimedia.org/wikipedia/commons/5/5f/AmeeshaPatel01.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/5f/AmeeshaPatel01.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/5f/AmeeshaPatel01.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/5f/AmeeshaPatel01.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/5/5f/AmeeshaPatel01.jpg'
    ];

    images.forEach(src => {
        const col = document.createElement('div');
        col.className = 'col-md-4 gallery-item';

        const img = document.createElement('img');
        img.src = src;
        img.className = 'img-fluid img-thumbnail';
        img.alt = 'Gallery Image';

        col.appendChild(img);
        gallery.appendChild(col);
    });
});
