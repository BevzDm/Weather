import geocodeCity from './geocode.js';

const key = 'f3cace81170293dcde048cbbea49900f';
const dayUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric';

let weatherIcon = document.querySelector('.weatherIcon');
let cardImg1 = document.getElementById('cardImg1');
let cardImg2 = document.getElementById('cardImg2');
let cardImg3 = document.getElementById('cardImg3');
let cardImg4 = document.getElementById('cardImg4');

let cardTemp1 = document.getElementById('cardTemp1');
let cardTemp2 = document.getElementById('cardTemp2');
let cardTemp3 = document.getElementById('cardTemp3');
let cardTemp4 = document.getElementById('cardTemp4');

let cardTime1 = document.getElementById('cardTime1');
let cardTime2 = document.getElementById('cardTime2');
let cardTime3 = document.getElementById('cardTime3');
let cardTime4 = document.getElementById('cardTime4');

const iter = {
  value: 0,
  increment: function () {
    this.value += 1;
  },
  decrement: function () {
    this.value -= 1;
  },
};

const changeCardIfo = async () => {
  const {lat, lon} = await geocodeCity();
  const dayRes = await fetch(dayUrl + `&lat=${lat}&lon=${lon}&appid=${key}`);
  const dayData = await dayRes.json();

  const cardHour1 = `${dayData.list[iter.value].dt_txt[11]}${dayData.list[iter.value].dt_txt[12]}`;
  const cardHour2 = `${dayData.list[iter.value + 1].dt_txt[11]}${dayData.list[iter.value + 1].dt_txt[12]}`;
  const cardHour3 = `${dayData.list[iter.value + 2].dt_txt[11]}${dayData.list[iter.value + 2].dt_txt[12]}`;
  const cardHour4 = `${dayData.list[iter.value + 3].dt_txt[11]}${dayData.list[iter.value + 3].dt_txt[12]}`;

  cardTemp1.innerHTML = dayData.list[iter.value].main.temp.toFixed(0);
  cardTemp2.innerHTML = dayData.list[iter.value + 1].main.temp.toFixed(0);
  cardTemp3.innerHTML = dayData.list[iter.value + 2].main.temp.toFixed(0);
  cardTemp4.innerHTML = dayData.list[iter.value + 3].main.temp.toFixed(0);

  cardTime1.innerHTML = cardHour1;
  cardTime2.innerHTML = cardHour2;
  cardTime3.innerHTML = cardHour3;
  cardTime4.innerHTML = cardHour4;
  return dayData;
};

const changeIcons = (data) => {
  if (data.weather[0].main == 'Clear') {
    weatherIcon.src = './img/dayClearImg.svg';
  } else if (data.weather[0].main == 'Clouds') {
    weatherIcon.src = './img/dayCloudsImg.svg';
  } else if (data.weather[0].main == 'Rain') {
    weatherIcon.src = './img/dayRainImg.svg';
  } else if (data.weather[0].main == 'Drizzle') {
    weatherIcon.src = './img/dayDrizzleImg.svg';
  } else if (data.weather[0].main == 'Mist') {
    weatherIcon.src = './img/dayMistImg.svg';
  }
};

const changeCardImg = async (dayDataPromise) => {
  try {
    const dayData = await dayDataPromise;
    let i = 0;
    for (i; i < 4; i++) {
      if (dayData.list[iter.value].weather[0].main == 'Clear') {
        if (i === 0) {
          cardImg1.src = './img/dayClearImg.svg';
        } else if (i === 1) {
          cardImg2.src = './img/dayClearImg.svg';
        } else if (i === 2) {
          cardImg3.src = './img/dayClearImg.svg';
        } else if (i === 3) {
          cardImg4.src = './img/dayClearImg.svg';
        }
      } else if (dayData.list[iter.value].weather[0].main == 'Clouds') {
        if (i === 0) {
          cardImg1.src = './img/dayCloudsImg.svg';
        } else if (i === 1) {
          cardImg2.src = './img/dayCloudsImg.svg';
        } else if (i === 2) {
          cardImg3.src = './img/dayCloudsImg.svg';
        } else if (i === 3) {
          cardImg4.src = './img/dayCloudsImg.svg';
        } else {
        }
      } else if (dayData.list[iter.value].weather[0].main == 'Rain') {
        if (i === 0) {
          cardImg1.src = './img/dayRainImg.svg';
        } else if (i === 1) {
          cardImg2.src = './img/dayRainImg.svg';
        } else if (i === 2) {
          cardImg3.src = './img/dayRainImg.svg';
        } else if (i === 3) {
          cardImg4.src = './img/dayRainImg.svg';
        }
      } else if (dayData.list[iter.value].weather[0].main == 'Drizzle') {
        if (i === 0) {
          cardImg1.src = './img/dayDrizzleImg.svg';
        } else if (i === 1) {
          cardImg2.src = './img/dayDrizzleImg.svg';
        } else if (i === 2) {
          cardImg3.src = './img/dayDrizzleImg.svg';
        } else if (i === 3) {
          cardImg4.src = './img/dayDrizzleImg.svg';
        }
      } else if (dayData.list[iter.value].weather[0].main == 'Mist') {
        if (i === 0) {
          cardImg1.src = './img/dayMistImg.svg';
        } else if (i === 1) {
          cardImg2.src = './img/dayMistImg.svg';
        } else if (i === 2) {
          cardImg3.src = './img/dayMistImg.svg';
        } else if (i === 3) {
          cardImg4.src = './img/dayMistImg.svg';
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export {changeCardIfo, changeCardImg, changeIcons, iter};
