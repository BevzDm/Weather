import changeColorTheme from './changeColorTheme.js';
import { changeCardIfo, changeCardImg, iter } from './changeIcons.js';
import { checkMyWeather, checkWeather, setMyUrl, setUrl, typeOfWeather } from './checkWeather.js';

const temperature = document.querySelector('.temperature');
const cityHtml = document.querySelector('.city');
const search = document.querySelector('.search');
const searchInput = document.querySelector('.searchInput');
const geo = document.querySelector('.geo');
const changeTemp = document.querySelector('.changeTemp');
const cel = document.querySelector('.cel');
const selectCity = document.querySelector('.selectCity');
const error = document.getElementById('error');

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

changeColorTheme();
checkMyWeather();

prev.addEventListener('click', () => {
  const dayData = changeCardIfo();
  if (iter.value >= 4) {
    iter.decrement();
    changeCardImg(dayData);
  } else {
    console.warn('Too low cardLoop');
  }
});

next.addEventListener('click', () => {
  const dayData = changeCardIfo();
  if (iter.value <= 36) {
    iter.increment();
    changeCardImg(dayData);
  } else {
    console.warn('Too big cardLoop');
  }
});

search.addEventListener('click', () => {
  if (search.style.width === '600px' && searchInput.value !== '') {
    checkWeather(searchInput.value);
  }
  search.style.width = '600px';
  search.style.marginTop = '45px';
  search.style.marginLeft = '25px';
  search.style.justifyContent = 'end';
  cityHtml.style.display = 'none';
  geo.style.display = 'none';

  search.classList.add('expanded');
  searchInput.style.display = 'block';
  search.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 100%)';
  searchInput.focus();
  selectCity.style.display = 'none';
});

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    checkWeather(searchInput.value);
    selectCity.style.display = 'none';
  }
});

geo.addEventListener('click', () => {
  checkMyWeather();
  searchInput.value = '';
  searchInput.style.display = 'none';
  search.style.width = '60px';
  search.style.marginTop = '-45px';
  search.style.marginLeft = '542px';
  search.style.justifyContent = 'center';
  selectCity.style.display = 'none';
});
236;
let i = 0;
changeTemp.addEventListener('click', () => {
  if (error.style.display === 'none') {
    if (i % 2 === 0) {
      if (+temperature.innerHTML >= 38) {
        setUrl(`https://api.openweathermap.org/data/2.5/weather?units=imperial&q=`);
        setMyUrl(`https://api.openweathermap.org/data/2.5/weather?units=imperial&q=`);
        typeOfWeather ? checkWeather(searchInput.value) : checkMyWeather();
        cel.style.left = '330px';
        cel.innerHTML = '° F';
        changeTemp.style.left = '940px';
        i++;
      } else {
        setUrl(`https://api.openweathermap.org/data/2.5/weather?units=imperial&q=`);
        setMyUrl(`https://api.openweathermap.org/data/2.5/weather?units=imperial&q=`);
        typeOfWeather ? checkWeather(searchInput.value) : checkMyWeather();
        cel.innerHTML = '° F';
        changeTemp.style.left = '940px';
        i++;
      }
    } else if (i % 2 !== 0) {
      setUrl(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=`);
      setMyUrl(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=`);
      typeOfWeather ? checkWeather(searchInput.value) : checkMyWeather();
      cel.style.left = '240px';
      cel.innerHTML = '° C';
      changeTemp.style.left = '900px';
      i++;
    }
  } else {
    selectCity.style.display = 'block';
  }
});

selectCity.addEventListener('click', () => {
  search.style.width = '600px';
  search.style.marginLeft = '25px';
  search.style.marginTop = '45px';
  search.style.justifyContent = 'end';
  cityHtml.style.display = 'none';
  geo.style.display = 'none';

  search.classList.add('expanded');
  searchInput.style.display = 'block';
  search.style.background = 'linear-gradient(290deg, rgba(196, 196, 196, 0.571) 30%, rgba(255, 255, 255, 0.346) 100%)';
  searchInput.focus();
});
