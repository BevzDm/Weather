import getGeolocation from './getGeolocation.js';
const key = 'f3cace81170293dcde048cbbea49900f';
const myUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

const body = document.querySelector('body');
const hourHTML = document.querySelector('.hoursHTML');
const minutesHTML = document.querySelector('.minutesHTML');
const hoursNowHTML = document.getElementById('hoursNowHTML');
const minutesNowHTML = document.getElementById('minutesNowHTML');

const changeColorTheme = async () => {
  const { lat, lon } = await getGeolocation();
  const myRes = await fetch(myUrl + `&lat=${lat}&lon=${lon}&appid=${key}`);
  const myData = await myRes.json();

  const timestamp = myData.dt;
  const date = new Date(timestamp * 1000);

  const hour = date.getHours();
  const minute = date.getMinutes();
  const convertedMinute = `${minute < 10 ? '0' + minute : minute}`;

  hourHTML.innerHTML = `${hour} :`;
  minutesHTML.innerHTML = convertedMinute;
  hoursNowHTML.innerHTML = hour;
  minutesNowHTML.innerHTML = convertedMinute;

  if (hour >= 5 && hour < 7) {
    body.style.background = 'linear-gradient(30deg, #F0B5CE 0%, #8C6BAE 100%)';
  } else if (hour >= 7 && hour < 12) {
    body.style.background = 'linear-gradient(30deg, #EEAECA 0%, #91BEF3 100%)';
  } else if (hour >= 12 && hour < 18) {
    body.style.background = 'linear-gradient(30deg, #A8C8ED 0%, #7673DC 100%)';
  } else if (hour >= 18 && hour < 21) {
    body.style.background = 'linear-gradient(30deg, #AAC0FF 0%, #8C6BAE 100%)';
  } else if (hour >= 21 && hour < 23) {
    body.style.background = 'linear-gradient(30deg, #48355B 0%, #8C6EAB 100%)';
  } else if (hour >= 23 || hour < 5) {
    body.style.background = 'linear-gradient(30deg, #48355B 0%, #91BEF3 100%)';
  }
};

export default changeColorTheme;
