const BASE_URL = 'https://pixabay.com/api';

let numberOfpage, prevQuery;
const KEY = '19388230-75c4bcf9e22da5087bb0ddd0d';
const perPage = 12;

function page() {
    return numberOfpage + 1;
}

async function fetchImages(searchQuery) { 
    if (searchQuery !== prevQuery) numberOfpage = 0;
    prevQuery = searchQuery;
    numberOfpage++;

    const response = await fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${numberOfpage}&per_page=${perPage}&key=${KEY}`);
    const newImg = await response.json();
    console.log(newImg);
    return newImg;
}


export { fetchImages, page };