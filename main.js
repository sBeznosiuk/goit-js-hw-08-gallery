import gallery from './gallery-items.js'

let galleryArray = [];

const ref = {
    galleryListRef: document.querySelector('.js-gallery'),
    lightBox: document.querySelector('.js-lightbox'),
    lightBoxImage: document.querySelector('.lightbox__image'),
    buttonClose: document.querySelector('button[data-action="close-lightbox"]'),
    lightBoxOverlay: document.querySelector('.lightbox__overlay'),
}

const { galleryListRef, lightBox, lightBoxImage, buttonClose, lightBoxOverlay } = ref;

galleryListRef.addEventListener('click', openModal)
galleryListRef.addEventListener('keydown', closeModalWithEscape)
buttonClose.addEventListener('click', closeModal)
lightBoxOverlay.addEventListener('click', closeModal)


function openModal(event) {
    event.preventDefault()

    if(event.target.nodeName !== 'IMG') {
        return;
    }

    window.addEventListener('keydown', handleSwitchClick)

    
    lightBox.classList.add('is-open')

    lightBoxImage.setAttribute('src', event.target.dataset.source)
    lightBoxImage.setAttribute('alt', event.target.alt)
    lightBoxImage.setAttribute('data-index', event.target.dataset.index)
}

function closeModal() {
    lightBox.classList.remove('is-open')

    lightBoxImage.removeAttribute('src')
    lightBoxImage.removeAttribute('alt')
}

function closeModalWithEscape(event) {
    if (event.code === 'Escape') {
        closeModal()
    }
}
function handleSwitchClick(event) {
    const { dataset } = lightBoxImage;
    const currentIndex = Number(dataset.index);

    if (event.code === 'ArrowRight') {
        if (currentIndex === gallery.length - 1) {
            lightBoxImage.src = gallery[0].original
            lightBoxImage.alt = gallery[0].description
            dataset.index = 0;
            return;
    }
    
        lightBoxImage.src = gallery[currentIndex + 1].original
        lightBoxImage.alt = gallery[currentIndex + 1].description
        dataset.index = currentIndex + 1;
    }

    if (event.code === 'ArrowLeft') {
        if (currentIndex === 0) {
            lightBoxImage.src = gallery[gallery.length - 1].original
            lightBoxImage.alt = gallery[gallery.length - 1].description
            dataset.index = gallery.length - 1;
            return;
    }
    
        lightBoxImage.src = gallery[currentIndex - 1].original
        lightBoxImage.alt = gallery[currentIndex - 1].description
        dataset.index = currentIndex - 1;
    }
}

function renderGallery(anyGallery) {
    anyGallery.forEach((item, index) => {
        const galleryItem = document.createElement('li');
        galleryItem.classList.add('gallery__item')

        const galleryItemLink = document.createElement('a') 
        galleryItemLink.classList.add('gallery__link')
        galleryItemLink.setAttribute('href', item.original)

        const galleryItemImage = document.createElement('img')
        galleryItemImage.classList.add('gallery__image')
        galleryItemImage.setAttribute('src', item.preview)
        galleryItemImage.setAttribute('data-source', item.original)
        galleryItemImage.setAttribute('alt', item.description)
        galleryItemImage.setAttribute('data-index', index)

        galleryItem.appendChild(galleryItemLink)
        galleryItemLink.appendChild(galleryItemImage)

        galleryArray.push(galleryItem)
    })
    
    galleryListRef.append(...galleryArray)
}

renderGallery(gallery)