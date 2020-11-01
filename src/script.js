const apiKey = "ac106569ff97a53a6fcbe74a7eb305cf";
const apiURL = "https://api.openweathermap.org/data/2.5/weather";

// Form
const cityNameElement = document.querySelector("#CityName");
const cityInputElement = document.querySelector("#CityInput");
const searchBtnElement = document.querySelector("#SearchBtn");
const currentBtnElement = document.querySelector("#CurrentBtn");
// Current Weather
const currentWeatherElement = document.querySelector("#WeatherCity");
const temperatureElement = document.querySelector("#Temperature");
const dateTimeElement = document.querySelector("#DateTime");
const weatherDescriptionElement = document.querySelector("#WeatherDescription");
const weatherIconElement = document.querySelector("#WeatherIcon");
// const celsiusBtnElement = document.querySelector("#CelsiusBtn");
// const fahrenheitBtnElement = document.querySelector("#FahrenheitBtn");

function setCityName(cityName) {
  cityInputElement.value = cityName;
  cityNameElement.innerHTML = cityName;
}

function setCurrentWeather(temp, icon, description) {
  currentWeatherElement.style.display = "block";
  temperatureElement.innerHTML = Math.round(temp);
  weatherIconElement.innerHTML = "";
  let img = document.createElement("img");
  img.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  weatherIconElement.appendChild(img);
  weatherDescriptionElement.innerHTML = description;
}

searchBtnElement.addEventListener("click", () => {
  let cityName = cityInputElement.value;
  if (cityName == "") {
    return;
  }

  let url = `${apiURL}?q=${cityName}&appid=${apiKey}&units=metric`;
  console.log(url);
  axios.get(url).then(function (response) {
    console.log(response);
    setCurrentWeather(
      response.data.main.temp,
      response.data.weather[0].icon,
      response.data.weather[0].description
    );
    setCityName(response.data.name);
  });
});

currentBtnElement.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `${apiURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log(url);
    axios.get(url).then(function (response) {
      console.log(response);
      setCurrentWeather(
        response.data.main.temp,
        response.data.weather[0].icon,
        response.data.weather[0].description
      );
      setCityName(response.data.name);
    });
  });
});

// celsiusBtnElement.addEventListener("click", (e) => {
//   e.preventDefault();
//   temperatureElement.innerHTML = "19";
// });

// fahrenheitBtnElement.addEventListener("click", (e) => {
//   e.preventDefault();
//   temperatureElement.innerHTML = "66";
// });

// function setDateTime() {
//   let now = new Date();
//   let dayName = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ][now.getDay()];
//   dateTimeElement.innerHTML = `${dayName} ${now.getHours()}:${now.getMinutes()}`;
// }

// setInterval(setDateTime, 1000);
// setDateTime();
