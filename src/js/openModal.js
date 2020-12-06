import * as basicLightbox from 'basiclightbox';

const container = document.querySelector('.gallery');
container.addEventListener('click', openModal);

export default function openModal(event) {
    if (event.target.nodeName !== 'IMG') { return }
    else basicLightbox
        .create(`
	<img src="${event.target.dataset.sourse}" width="1400" height="900">
`).show()
}