import {changeCardIfo, changeCardImg, changeIcons} from './changeIcons.js';
import convertMonth from './convertMonth.js';
import getGeolocation from './getGeolocation.js';
import windController from './windController.js';

const key = 'f3cace81170293dcde048cbbea49900f';
let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
let myUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

const cityHtml = document.querySelector('.city');
const dayHTML = document.querySelector('.dayHTML');
const yearHTML = document.querySelector('.yearHTML');
const errorMessage = document.querySelector('.err');
const temp = document.querySelector('.temperature');
const wind = document.querySelector('.windSpeed');
const hum = document.querySelector('.hum');
const geo = document.querySelector('.geo');
const descrHTML = document.querySelector('.descrHTML');
const sunriseHoursHTML = document.querySelector('.sunriseHoursHTML');
const sunriseMinutesHTML = document.querySelector('.sunriseMinutesHTML');
const sunsetHoursHTML = document.querySelector('.sunsetHoursHTML');
const sunsetMinutesHTML = document.querySelector('.sunsetMinutesHTML');

let typeOfWeather = false;
const checkWeather = async (city) => {
  typeOfWeather = true;

  try {
    const res = await fetch(url + city + `&appid=${key}`);
    if (res.status === 404 || res.status === 400 || !res.ok) {
      throw new Error('Город не найден или некорректный запрос.');
    }
    const data = await res.json();

    const timestamp1 = data.dt;
    const timestamp2 = data.sys.sunrise;
    const timestamp3 = data.sys.sunset;

    const date1 = new Date(timestamp1 * 1000);
    const date2 = new Date(timestamp2 * 1000);
    const date3 = new Date(timestamp3 * 1000);

    const day = date1.getDate();
    const year = date1.getFullYear();

    const sunriseHours = date2.getHours();
    const sunriseMinutes = date2.getMinutes();

    const sunsetHours = date3.getHours();
    const sunsetMinutes = date3.getMinutes();

    const dayData = await changeCardIfo();
    convertMonth(city);
    windController(data);

    const convertedDay = `${day < 10 ? '0' + day : day}`;
    const convertedSunriseHours = `${sunriseHours < 10 ? '0' + sunriseHours : sunriseHours}`;
    const convertedSunriseMinutes = `${sunriseMinutes < 10 ? '0' + sunriseMinutes : sunriseMinutes}`;

    const convertedSunsetHours = `${sunsetHours < 10 ? '0' + sunsetHours : sunsetHours}`;
    const convertedSunsetMinutes = `${sunsetMinutes < 10 ? '0' + sunsetMinutes : sunsetMinutes}`;

    if (res.status == 404 || res.status == 400 || !data.sys.sunrise || !data.sys.sunset) {
      cityHtml.style.display = 'none';
      geo.style.display = 'none';
      errorMessage.style.display = 'block';
      errorMessage.style.marginTop = '70px';
      console.log('err');
    } else {
      cityHtml.style.display = 'block';
      geo.style.display = 'block';
      errorMessage.style.display = 'none';
      cityHtml.innerHTML = data.name;
      temp.innerHTML = data.main.temp.toFixed(0);
      dayHTML.innerHTML = `${convertedDay}`;
      yearHTML.innerHTML = year;
      wind.innerHTML = data.wind.deg;
      hum.innerHTML = data.main.humidity;
      descrHTML.innerHTML = data.weather[0].description;
      sunriseHoursHTML.innerHTML = convertedSunriseHours;
      sunriseMinutesHTML.innerHTML = convertedSunriseMinutes;
      sunsetHoursHTML.innerHTML = convertedSunsetHours;
      sunsetMinutesHTML.innerHTML = convertedSunsetMinutes;

      changeIcons(data);
      changeCardImg(dayData);
    }
  } catch (error) {
    cityHtml.style.display = 'none';
    geo.style.display = 'none';
    errorMessage.style.display = 'block';
    errorMessage.style.marginTop = '70px';
    console.error(error);
  }
};

const checkMyWeather = async () => {
  typeOfWeather = false;

  try {
    const {lat, lon} = await getGeolocation();
    const myRes = await fetch(myUrl + `&lat=${lat}&lon=${lon}&appid=${key}`);
    if (!myRes.ok) {
      throw new Error('Не удалось получить данные о погоде на основе геолокации.');
    }

    const myData = await myRes.json();

    const timestamp = myData.dt;
    const timestamp2 = myData.sys.sunrise;
    const timestamp3 = myData.sys.sunset;

    const date = new Date(timestamp * 1000);
    const date2 = new Date(timestamp2 * 1000);
    const date3 = new Date(timestamp3 * 1000);

    const day = date.getDate();
    const year = date.getFullYear();

    const sunriseHours = date2.getHours();
    const sunriseMinutes = date2.getMinutes();

    const sunsetHours = date3.getHours();
    const sunsetMinutes = date3.getMinutes();

    const convertedDay = `${day < 10 ? '0' + day : day}`;
    const convertedSunriseHours = `${sunriseHours < 10 ? '0' + sunriseHours : sunriseHours}`;
    const convertedSunriseMinutes = `${sunriseMinutes < 10 ? '0' + sunriseMinutes : sunriseMinutes}`;

    const convertedSunsetHours = `${sunsetHours < 10 ? '0' + sunsetHours : sunsetHours}`;
    const convertedSunsetMinutes = `${sunsetMinutes < 10 ? '0' + sunsetMinutes : sunsetMinutes}`;

    const dayData = await changeCardIfo();
    convertMonth();
    windController(myData);

    cityHtml.style.display = 'block';
    geo.style.display = 'block';
    errorMessage.style.display = 'none';
    cityHtml.innerHTML = myData.name;
    temp.innerHTML = myData.main.temp.toFixed(0);
    dayHTML.innerHTML = `${convertedDay}`;
    yearHTML.innerHTML = year;
    wind.innerHTML = myData.wind.deg;
    hum.innerHTML = myData.main.humidity;
    descrHTML.innerHTML = myData.weather[0].description;
    sunriseHoursHTML.innerHTML = convertedSunriseHours;
    sunriseMinutesHTML.innerHTML = convertedSunriseMinutes;
    sunsetHoursHTML.innerHTML = convertedSunsetHours;
    sunsetMinutesHTML.innerHTML = convertedSunsetMinutes;

    changeIcons(myData);
    changeCardImg(dayData);
  } catch (error) {
    // Обработка ошибки
    cityHtml.style.display = 'none';
    geo.style.display = 'none';
    errorMessage.style.display = 'block';
    errorMessage.style.marginTop = '70px';
    console.error(error);
  }
};

function setUrl(newUrl) {
  url = newUrl;
}

function setMyUrl(newUrl) {
  myUrl = newUrl;
}

export {checkMyWeather, checkWeather, setMyUrl, setUrl, typeOfWeather};
