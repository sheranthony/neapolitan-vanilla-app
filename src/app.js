//to get current date and time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

//form listens for city input
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//allows user to submit city, changes the HTML, and uses the city entered to call the API
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = "Paris";
  let cityInput = document.querySelector("#city-search");
  cityElement.innerHTML = `${cityInput.value}`;
  let searchCity = `${cityInput.value}`;
  let apiKey = "6dd5f17fed631783ad85c6476c8b5d40";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

//to toggle the displayed temperature between Fahrenheit and Celsius
function tempF(event) {
  event.preventDefault();
  fahr.classList.add("active");
  cel.classList.remove("active");
  let tempF = document.querySelector("#temperature");
  tempF.innerHTML = Math.round(fahrenheitTemperature);
}

function tempC(event) {
  event.preventDefault();
  let tempC = document.querySelector("#temperature");
  fahr.classList.remove("active");
  cel.classList.add("active");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  tempC.innerHTML = Math.round(celsiusTemperature);
}
let fahrenheitTemperature = null;

let fahr = document.querySelector("#fahrenheit-link");
fahr.addEventListener("click", tempF);

let cel = document.querySelector("#celsius-link");
cel.addEventListener("click", tempC);

//displays the weather forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="forecast-date">${day}</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt width="40" />
                <div class="forecast-temperature">
                  <span class="weather-forecast-max-temp">42° </span>
                  <span class="weather-forecast-min-temp">31° </span>
                </div>
              </div>
            `;
  });
  forecastHTML = forecastHTML + `<div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "6dd5f17fed631783ad85c6476c8b5d40";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

//retrieves weather data (temp, description, etc.) from city entered & updates the HTML
function displayTemperature(response) {
  fahrenheitTemperature = response.data.main.temp;

  let temperature = Math.round(fahrenheitTemperature);
  let searchCityTemperature = document.querySelector("#temperature");
  searchCityTemperature.innerHTML = temperature;

  let weatherDescription = response.data.weather[0].description;
  let retrieveWeatherDescription = document.querySelector("#description");
  retrieveWeatherDescription.innerHTML = weatherDescription;

  let feelsLike = Math.round(response.data.main.feels_like);
  let retrieveFeelsLike = document.querySelector("#feels-like");
  retrieveFeelsLike.innerHTML = feelsLike;

  let humidity = response.data.main.humidity;
  let retrieveHumidity = document.querySelector("#humidity");
  retrieveHumidity.innerHTML = humidity;

  let windSpeed = Math.round(response.data.wind.speed);
  let retrieveWindSpeed = document.querySelector("#wind");
  retrieveWindSpeed.innerHTML = windSpeed;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
