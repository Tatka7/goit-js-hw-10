import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const el = {
  selectInput: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  containerCatInfo: document.querySelector('.cat-info'),
};

el.selectInput.addEventListener('change', handlerSelect);

Loading.pulse('&#128008; Loading data, please wait...', {clickToClose: true,svgSize: '100px', animation: '3s',});

fetchBreeds()
    .then(data => {
        createOptions(data.data);
        new SlimSelect({
            select: '.breed-select',
        });
        el.selectInput.classList.remove('is-hidden');
    })
    .catch(error => {
        Report.failure(
                'Oops &#128049;! Something went wrong!',
                'Try reloading the page &#128062;!',
                'OK'
            );
    })
    .finally(Loading.remove());

function createOptions(arrCats) {
    el.selectInput.innerHTML = arrCats
        .map(({ id, name }) => `<option value=${id}>${name}</option>`)
        .join('');
}

function createCard(selectedCat) {
    el.containerCatInfo.innerHTML = `<article class="flex-container"><img src=${selectedCat.url} alt=${selectedCat.breeds[0].name} width="300"><div class="thumb"><h2 class="title">${selectedCat.breeds[0].name}</h2><p>${selectedCat.breeds[0].description}</p><p><b class="temp">Temperament: </b>${selectedCat.breeds[0].temperament}</p></div></article>`;
}

function handlerSelect(elem) {
    Loading.pulse('&#128008; Loading data, please wait...', {
        clickToClose: true,
        svgSize: '100px',
        animation: '3s',});
    el.containerCatInfo.innerHTML = '';
    fetchCatByBreed(elem.target.value)
        .then(data => {
            createCard(...data.data);
            el.containerCatInfo.classList.remove('is-hidden');
        })
        .catch(error => {
            Report.failure(
                'Oops &#128049;! Something went wrong!',
                'Try reloading the page &#128062;!',
                'OK'
            );
        })
        .finally(Loading.remove());
}