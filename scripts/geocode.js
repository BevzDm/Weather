import {typeOfWeather} from './checkWeather.js';
import getGeolocation from './getGeolocation.js';

const city = document.querySelector('.searchInput');
const cityHtml = document.querySelector('.city');
const geo = document.querySelector('.geo');
const errorMessage = document.querySelector('.err');

async function geocodeCity() {
  if (typeOfWeather) {
    return new Promise((resolve, reject) => {
      const cityName = city.value;
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({address: cityName}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lon = location.lng();
          resolve({lat, lon});
        } else {
          cityHtml.style.display = 'none';
          geo.style.display = 'none';
          errorMessage.style.display = 'block';
          errorMessage.style.marginTop = '70px';
          const errorText = `Geocode failed with status: ${status}`;
          console.error(errorText);
          reject(new Error(errorText));
        }
      });
    });
  } else {
    try {
      const {lat, lon} = await getGeolocation();
      return {lat, lon};
    } catch (error) {
      cityHtml.style.display = 'none';
      geo.style.display = 'none';
      errorMessage.style.display = 'block';
      errorMessage.style.marginTop = '70px';
      const errorText = `Geolocation failed: ${error.message}`;
      console.error(errorText);
      throw new Error(errorText);
    }
  }
}

export default geocodeCity;
