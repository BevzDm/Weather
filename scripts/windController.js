const windSpeedHTML = document.querySelector('.windSpeedHTML');
const windSpeedTracker = document.querySelector('.pointAir');
const indexWindHTML = document.getElementById('indexWind');

const pressureHTML = document.querySelector('.pressureHTML');
const pressureTracker = document.querySelector('.pointUV');
const indexPressureHTML = document.getElementById('indexPressure');

const windController = (data) => {
  const windSpeed = data.wind.speed;

  windSpeedHTML.innerHTML = windSpeed.toFixed(0);

  if (windSpeed < 1) {
    windSpeedTracker.style.top = '-10px';
    windSpeedTracker.style.left = '60px';
    indexWindHTML.innerHTML = 'Calm';
  } else if (windSpeed >= 1 && windSpeed <= 5) {
    windSpeedTracker.style.top = '-20px';
    windSpeedTracker.style.left = '60px';
    indexWindHTML.innerHTML = 'Light breeze';
  } else if (windSpeed >= 5 && windSpeed <= 11) {
    windSpeedTracker.style.top = '-53px';
    windSpeedTracker.style.left = '86px';
    indexWindHTML.innerHTML = 'Moderate breeze';
  } else if (windSpeed >= 11 && windSpeed <= 20) {
    windSpeedTracker.style.top = '-107px';
    windSpeedTracker.style.left = '146px';
    indexWindHTML.innerHTML = 'Strong breeze';
  } else if (windSpeed >= 20 && windSpeed <= 51) {
    windSpeedTracker.style.top = '-81px';
    windSpeedTracker.style.left = '210px';
    indexWindHTML.innerHTML = 'Moderate gale';
  } else if (windSpeed >= 51 && windSpeed <= 101) {
    windSpeedTracker.style.top = '-45px';
    windSpeedTracker.style.left = '231px';
    indexWindHTML.innerHTML = 'Strong gale';
  } else if ((windSpeed >= 102 && windSpeed <= 117) || windSpeed > 117) {
    windSpeedTracker.style.top = '-17px';
    windSpeedTracker.style.left = '234px';
    indexWindHTML.innerHTML = 'Hurricane';
  }

  const pressure = data.main.pressure;
  pressureHTML.innerHTML = pressure.toFixed(0);

  if (pressure < 970) {
    pressureTracker.style.top = '-40px';
    pressureTracker.style.left = '375px';
    indexPressureHTML.innerHTML = 'Very low';
  } else if (pressure >= 970 && pressure <= 990) {
    pressureTracker.style.top = '-68px';
    pressureTracker.style.left = '380px';
    indexPressureHTML.innerHTML = 'Low';
  } else if (pressure >= 990 && pressure <= 1010) {
    pressureTracker.style.top = '-100px';
    pressureTracker.style.left = '400px';
    indexPressureHTML.innerHTML = 'Moderate';
  } else if (pressure >= 1010 && pressure <= 1013) {
    pressureTracker.style.top = '-125px';
    pressureTracker.style.left = '460px';
    indexPressureHTML.innerHTML = 'Normal';
  } else if (pressure >= 1013 && pressure <= 1020) {
    pressureTracker.style.top = '-100px';
    pressureTracker.style.left = '527px';
    indexPressureHTML.innerHTML = 'Above normal';
  } else if (pressure >= 1020 && pressure <= 1030) {
    pressureTracker.style.top = '-70px';
    pressureTracker.style.left = '545px';
    indexPressureHTML.innerHTML = 'Very high';
  } else if (pressure > 1030) {
    pressureTracker.style.top = '-35px';
    pressureTracker.style.left = '548px';
    indexPressureHTML.innerHTML = 'Extremely high';
  }
};

export default windController;
