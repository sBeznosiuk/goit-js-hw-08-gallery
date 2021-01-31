import gallery from './gallery-items.js'

let galleryArray = [];

const galleryListRef = document.querySelector('.js-gallery')
const lightBox = document.querySelector('.js-lightbox')
const lightBoxImage = document.querySelector('.lightbox__image')
const buttonClose = document.querySelector('button[data-action="close-lightbox"]')
const lightBoxOverlay = document.querySelector('.lightbox__overlay')


galleryListRef.addEventListener('click', openModal)
galleryListRef.addEventListener('keydown', closeModalWithEscape)
buttonClose.addEventListener('click', closeModal)
lightBoxOverlay.addEventListener('click', closeModal)


function openModal(event) {
    event.preventDefault()

    if(event.target.nodeName !== 'IMG') {
        return;
    }
    
    lightBox.classList.add('is-open')

    lightBoxImage.setAttribute('src', event.target.dataset.source)
    lightBoxImage.setAttribute('alt', event.target.alt)
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

function renderGallery(anyGallery) {
    anyGallery.forEach(item => {
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

        galleryItem.appendChild(galleryItemLink)
        galleryItemLink.appendChild(galleryItemImage)

        galleryArray.push(galleryItem)
    })
    
    galleryListRef.append(...galleryArray)
}

renderGallery(gallery)