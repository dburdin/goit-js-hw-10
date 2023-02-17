function createMurkupInfo(countries) {
  return countries
    .map(({ name, capital, population, flags, languages }) => {
      return `<div class="country-item">
        <img
          src="${flags.svg}"
          alt="${name.official}"
          width="100px"
         />
        <b>${name.official}</b>
      </div>
      <p><b>Capital:</b> ${capital}</p>
      <p><b>Population:</b> ${population}</p>
      <p><b>Languages:</b> ${Object.values(languages)}</p>`;
    })
    .join('');
}
function createMarkUpList(countries) {
  return countries
    .map(({ name, flags }) => {
      return `<li class="country-item">
              <img src="${flags.svg}" alt="${name.official}" width="40px" height = "30px"/>
              <b>${name.official}</b>
              </li>`;
    })
    .join('');
}
export { createMarkUpList, createMurkupInfo };
