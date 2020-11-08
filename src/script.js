const apiKey = "ac106569ff97a53a6fcbe74a7eb305cf";
const apiURL = "https://api.openweathermap.org/data/2.5/weather";

// State
let temperatureUnit = "celsius";

// Form
const cityInputElement = document.querySelector("#CityInput");
const searchBtnElement = document.querySelector("#SearchBtn");
const currentBtnElement = document.querySelector("#CurrentBtn");
// Current Weather
const cityNameElement = document.querySelector("#CityName");
const cityLocalTimeElement = document.querySelector("#CityLocalTime");
const currentWeatherElement = document.querySelector("#WeatherCity");
const temperatureElement = document.querySelector("#Temperature");
const temperatureUnitElement = document.querySelector("#TemperatureUnit");
const dateTimeElement = document.querySelector("#DateTime");
const weatherDescriptionElement = document.querySelector("#WeatherDescription");
const weatherIconElement = document.querySelector("#WeatherIcon");
const switchTemperatureUnitBtnElement = document.querySelector(
  "#SwitchTemperatureUnit"
);
const realFeelTemperatureElement = document.querySelector(
  "#RealFeelTemperature"
);
const realFeelTemperatureUnitElement = document.querySelector(
  "#RealFeelTemperatureUnit"
);
const windElement = document.querySelector("#Wind");

function setCityName(cityName) {
  cityInputElement.value = cityName;
  cityNameElement.innerHTML = cityName;
}

function convertCelsiusToFahrenheit(temperatureCelsius) {
  return temperatureCelsius * (9 / 5) + 32;
}

function convertFahrenheitToCelsius(temperatureFahrenheit) {
  return (temperatureFahrenheit - 32) / (9 / 5);
}

function setCurrentWeather(data) {
  currentWeatherElement.style.display = "block";

  let temp = data.main.temp;
  let realFeelTemp = data.main.feels_like;
  if (temperatureUnit == "celsius") {
    temperatureElement.innerHTML = Math.round(temp);
    realFeelTemperatureElement.innerHTML = Math.round(realFeelTemp);
  } else if (temperatureUnit == "fahrenheit") {
    let temperatureFahrenheit = convertCelsiusToFahrenheit(temp);
    temperatureElement.innerHTML = Math.round(temperatureFahrenheit);
    let realFeelTemperatureFahrenheit = convertCelsiusToFahrenheit(
      realFeelTemp
    );
    realFeelTemperatureElement.innerHTML = Math.round(
      realFeelTemperatureFahrenheit
    );
  }

  weatherIconElement.innerHTML = "";
  let img = document.createElement("img");
  let icon = data.weather[0].icon;
  img.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  weatherIconElement.appendChild(img);

  weatherDescriptionElement.innerHTML = data.weather[0].description;

  let dt = new Date((data.dt + data.timezone) * 1000);
  cityLocalTimeElement.innerHTML = `${dt.getHours()}:${dt.getMinutes()}`;

  let windDirection = "";
  let windDeg = data.wind.deg;
  if (windDeg >= 350 || windDeg <= 10) {
    windDirection = "N";
  } else if (windDeg > 10 && windDeg < 80) {
    windDirection = "NE";
  } else if (windDeg >= 80 && windDeg <= 100) {
    windDirection = "E";
  } else if (windDeg > 100 && windDeg < 170) {
    windDirection = "SE";
  } else if (windDeg >= 170 && windDeg <= 190) {
    windDirection = "S";
  } else if (windDeg > 190 && windDeg < 260) {
    windDirection = "SW";
  } else if (windDeg >= 260 && windDeg <= 280) {
    windDirection = "W";
  } else if (windDeg > 280 && windDeg < 350) {
    windDirection = "NW";
  }
  windElement.innerHTML =  `Wind ${windDirection} at ${data.wind.speed} m/s`;
}

switchTemperatureUnitBtnElement.addEventListener("click", () => {
  let newTemp;
  let currentTemp = temperatureElement.innerHTML;
  let currentRealFeelTemp = realFeelTemperatureElement.innerHTML;
  if (temperatureUnit == "celsius") {
    temperatureUnit = "fahrenheit";
    newTemp = convertCelsiusToFahrenheit(currentTemp);
    newRealFeelTemp = convertCelsiusToFahrenheit(currentRealFeelTemp);
    temperatureUnitElement.innerHTML = "°F";
    realFeelTemperatureUnitElement.innerHTML = "°F";
    switchTemperatureUnitBtnElement.innerHTML = "(use °C)";
  } else if (temperatureUnit == "fahrenheit") {
    temperatureUnit = "celsius";
    newTemp = convertFahrenheitToCelsius(currentTemp);
    newRealFeelTemp = convertFahrenheitToCelsius(currentRealFeelTemp);
    temperatureUnitElement.innerHTML = "°C";
    realFeelTemperatureUnitElement.innerHTML = "°C";
    switchTemperatureUnitBtnElement.innerHTML = "(use °C)";
  }
  temperatureElement.innerHTML = Math.round(newTemp);
  realFeelTemperatureElement.innerHTML = Math.round(newRealFeelTemp);
});

searchBtnElement.addEventListener("click", () => {
  let cityName = cityInputElement.value;
  if (cityName == "") {
    return;
  }

  loadWeatherFor(cityName);
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
      setCurrentWeather(response.data);
      setCityName(response.data.name);
    });
  });
});

function loadWeatherFor(cityName) {
  let url = `${apiURL}?q=${cityName}&appid=${apiKey}&units=metric`;
  console.log(url);
  axios.get(url).then(function (response) {
    console.log(response);
    setCurrentWeather(response.data);
    setCityName(response.data.name);
  });
}

setCityName("Cowes, UK");
loadWeatherFor("Cowes, UK");
