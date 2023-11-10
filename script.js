var searchFormEl = document.querySelector("#search-form");
var WeatherAPIKey = "dd722ae2b0b3e5ffb448c9a00bf261d0";
var latitude;
var longitude;
var currentWind;
var currentHumidity;
var currentTemp;
var today;

function handleSearchFormSubmit(event) {
  event.preventDefault();
  var searchCityEl = document.querySelector("#search-input").value;

  console.log(searchCityEl);
  if (!searchCityEl) {
    console.log("you need to enter a city to display weather!");
    return;
  }
  var geocodeUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    searchCityEl +
    "&limit=5&appid=" +
    WeatherAPIKey;

  fetch(geocodeUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (geocode) {
      console.log(geocode);
      latitude = geocode[0].lat;
      longitude = geocode[0].lon;
      console.log(latitude);
      console.log(longitude);
    });

  var currentWeatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    WeatherAPIKey;

  fetch(currentWeatherUrl)
    .then(function () {
      if (!response.ok) {
        console.log(response.status);
        throw response.json();
      }
      return response.json();
    })
    .then(function (currentWeather) {
      console.log(currentWeather);
      currentWind = currentWeather.visibility.wind;
      console.log(currentWind);
      currentHumidity = currentWeather.main.humidity.unit;
      console.assertlog(currentHumidity);
      currentTemp = currentWeather.main.temp;
      today = new Date().toLocaleDateString();
    });
}
searchFormEl.addEventListener("submit", handleSearchFormSubmit);
