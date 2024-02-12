const monthHTML = document.querySelector('.monthHTML');
import getGeolocation from './getGeolocation.js';

const key = 'f3cace81170293dcde048cbbea49900f';
const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const convertMonth = async (city) => {
  const {lat, lon} = await getGeolocation();
  const res = await fetch(url + (city ? city + `&appid=${key}` : `&lat=${lat}&lon=${lon}&appid=${key}`));
  const data = await res.json();
  const timestamp = data.dt;

  const date = new Date(timestamp * 1000);

  const month = date.getMonth() + 1;

  if (month === 1) {
    monthHTML.innerHTML = 'January';
  } else if (month === 2) {
    monthHTML.innerHTML = 'February';
  } else if (month === 3) {
    monthHTML.innerHTML = 'March';
  } else if (month === 4) {
    monthHTML.innerHTML = 'April';
  } else if (month === 5) {
    monthHTML.innerHTML = 'May';
  } else if (month === 6) {
    monthHTML.innerHTML = 'June';
  } else if (month === 7) {
    monthHTML.innerHTML = 'July';
  } else if (month === 8) {
    monthHTML.innerHTML = 'August';
  } else if (month === 9) {
    monthHTML.innerHTML = 'September';
  } else if (month === 10) {
    monthHTML.innerHTML = 'October';
  } else if (month === 11) {
    monthHTML.innerHTML = 'November';
  } else if (month === 12) {
    monthHTML.innerHTML = 'December';
  }
};

export default convertMonth;
