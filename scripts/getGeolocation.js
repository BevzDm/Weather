const getGeolocation = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const lat = latitude.toFixed(2);
          const lon = longitude.toFixed(2);
          resolve({lat, lon});
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      console.log("Couldn't et current position");
    }
  });
};

export default getGeolocation;
