//to get current date and time
function formatDate(date) {
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

  return `Last updated at: ${day}, ${hours}:${minutes}`;
}

let currentTime = new Date();

//to change the HTML to current date & time
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(currentTime);

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
  axios.get(apiUrl).then(retrieveWeatherData);
}

//to toggle the displayed temperature between Fahrenheit and Celsius
function tempF(event) {
  event.preventDefault();
  let tempF = document.querySelector(".temperature");
  tempF.innerHTML = "54";
}
let fahr = document.querySelector("#fahrenheit-link");
fahr.addEventListener("click", tempF);

function tempC(event) {
  event.preventDefault();
  let tempC = document.querySelector(".temperature");
  let temperature = tempC.innerHTML;
  tempC.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}
let cel = document.querySelector("#celsius-link");
cel.addEventListener("click", tempC);

//retrieves weather data (temp, description, etc.) from city entered & updates the HTML
function retrieveWeatherData(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  console.log(Math.round(response.data.main.temp));
  let searchCityTemperature = document.querySelector("#temperature");
  searchCityTemperature.innerHTML = temperature;

  let weatherDescription = response.data.weather[0].description;
  console.log(response.data.weather[0].description);
  let retrieveWeatherDescription = document.querySelector("#description");
  retrieveWeatherDescription.innerHTML = weatherDescription;

  let feelsLike = Math.round(response.data.main.feels_like);
  console.log(Math.round(response.data.main.feels_like));
  let retrieveFeelsLike = document.querySelector("#feels-like");
  retrieveFeelsLike.innerHTML = feelsLike;

  let humidity = response.data.main.humidity;
  console.log(response.data.main.humidity);
  let retrieveHumidity = document.querySelector("#humidity");
  retrieveHumidity.innerHTML = humidity;

  let windSpeed = Math.round(response.data.wind.speed);
  console.log(Math.round(response.data.wind.speed));
  let retrieveWindSpeed = document.querySelector("#wind");
  retrieveWindSpeed.innerHTML = windSpeed;
}

//uses geolocation to retrieve location of user from API
function showPosition(position) {
  let apiKey = "6dd5f17fed631783ad85c6476c8b5d40";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "imperial";
  let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(currentWeatherUrl).then(retrieveCurrentPosition);
}

//uses geolocation when user clicks on the current button
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

//retrieves weather data (temp, description, etc.) from CURRENT city & updates the HTML
function retrieveCurrentPosition(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  console.log(Math.round(response.data.main.temp));
  let searchCityTemperature = document.querySelector("#temperature");
  searchCityTemperature.innerHTML = temperature;

  let weatherDescription = response.data.weather[0].description;
  console.log(response.data.weather[0].description);
  let retrieveWeatherDescription = document.querySelector("#description");
  retrieveWeatherDescription.innerHTML = weatherDescription;

  let feelsLike = Math.round(response.data.main.feels_like);
  console.log(Math.round(response.data.main.feels_like));
  let retrieveFeelsLike = document.querySelector("#feels-like");
  retrieveFeelsLike.innerHTML = feelsLike;

  let humidity = response.data.main.humidity;
  console.log(response.data.main.humidity);
  let retrieveHumidity = document.querySelector("#humidity");
  retrieveHumidity.innerHTML = humidity;

  let windSpeed = Math.round(response.data.wind.speed);
  console.log(Math.round(response.data.wind.speed));
  let retrieveWindSpeed = document.querySelector("#wind");
  retrieveWindSpeed.innerHTML = windSpeed;
}

//event listener when user clicks current button
let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getLocation);
