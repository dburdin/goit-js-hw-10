import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { createMarkUpList, createMurkupInfo } from './js/createMurkup';

const DEBOUNCE_DELAY = 300;
const searchBox = document.getElementById('search-box');

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch({ target }) {
  const inputValue = target.value.trim();
  if (inputValue === '') {
    clearMarkup(countryList);
    clearMarkup(countryInfo);
    return;
  }
  fetchCountries(inputValue)
    .then(countriesData => {
      if (countriesData.length > 10) {
        alertTooManyMatches();
        clearMarkup(countryList);
        clearMarkup(countryInfo);
      } else if (countriesData.length === 1) {
        clearMarkup(countryList);
        renderInfo(countryInfo, countriesData);
      } else {
        clearMarkup(countryInfo);
        renderList(countryList, countriesData);
      }
    })
    .catch(alertBadName);
}

function alertTooManyMatches() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}
function alertBadName() {
  Notify.failure('Oops, there is no country with that name');
}

function clearMarkup(element) {
  element.innerHTML = '';
  element.innerHTML = '';
}
function renderInfo(element, countriesData) {
  element.innerHTML = createMurkupInfo(countriesData);
}
function renderList(element, countriesData) {
  element.innerHTML = createMarkUpList(countriesData);
}
