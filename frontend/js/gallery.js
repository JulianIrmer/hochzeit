let lazyLoadInstance;

function init() {
    lazyLoadInstance = new LazyLoad();
    const container = document.querySelector('#animated-thumbnails');
    if (!container) return;
    addImages();
    lightGallery(document.getElementById('animated-thumbnails'), {
        animateThumb: false,
        zoomFromOrigin: false,
        allowMediaOverlap: true,
        toggleThumb: true
    });
    hideSpinner();
}

function addImages() {
    const container = document.querySelector('#animated-thumbnails');
    if (!container) return;
    const end = 24;

    for (let i = 0; i < end; i++) {
        let url = `https://kimundtom.de/img/gallery/${i}.jpg`;
        const imgContainer = document.createElement('a');
        imgContainer.href = url;
        imgContainer.classList = 'col-6 col-md-3 pb-4';
        const img = document.createElement('img');
        img.classList = 'lazy';
        img.dataset.src = url;
        imgContainer.appendChild(img);
        container.appendChild(imgContainer);
    }

    lazyLoadInstance.update();
}

init();
