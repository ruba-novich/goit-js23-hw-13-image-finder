import './styles.css';

import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
const debounce = require('lodash.debounce');

import {fetchImages, page} from './js/apiService';
import photoCardTpl from '../templates/photo-card.hbs';
import openModal from './js/openModal';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { info } from '@pnotify/core';

import getRefs from './js/getRefs';
const refs = getRefs();

const loadMore = document.createElement('button');
loadMore.className = 'load-more load-more_hidden';
loadMore.innerText = 'Load more';
loadMore.addEventListener('click', () => {
    searchImages();
    setTimeout(() => window.scrollTo({
        top: window.innerHeight * page(),
        behavior: 'smooth'
    }), 300);
});
    
document.body.appendChild(loadMore);

refs.searchInput.addEventListener(
    'input',
    debounce(() => {
        searchImages(true);
    }, 500)
);
 
async function searchImages(isReset) { 
    try {
        const { hits , totalHits } = await fetchImages(refs.searchInput.value);
        renderImagesList(hits, isReset);
        loadMore.classList.remove('load-more_hidden');
         info  ({
                    text: `There are ${totalHits} pictures found!`,
                    type: 'info'
                });
    } catch (error) {
        console.log(error);  
    }
}

function renderImagesList(images, isReset) {
    const markup = photoCardTpl(images);
    if (isReset) refs.gallery.innerHTML = markup;
    else refs.gallery.innerHTML += markup;
}
