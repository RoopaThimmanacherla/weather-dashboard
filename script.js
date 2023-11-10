var searchFormEl = document.querySelector("#search-form");
var WeatherAPIKey = "dd722ae2b0b3e5ffb448c9a00bf261d0";
var latitude;
var longitude;
var currentWind;
var currentHumidity;
var currentTemp;
var today;
var searchCityEl;

function handleSearchFormSubmit(event) {
  event.preventDefault();
  searchCityEl = document.querySelector("#search-input").value;

  console.log(searchCityEl);
  if (!searchCityEl) {
    console.log("you need to enter a city to display weather!");
    return;
  }
  var geocodeUrl = geocode(searchCityEl);

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
      longitude = geocode[0].lon;
    });
  var currentWeatherUrl = currentWeather(latitude, longitude);

  fetch(currentWeatherUrl)
    .then(function () {
      if (!response.ok) {
        console.log(response.status);
        throw response.json();
      }
      return response.json();
    })
    .then(function (currentWeatherresponse) {
      console.log(currentWeatherresponse);
      currentWind = currentWeatherresponse.visibility.wind;
      console.log(currentWind);
      currentHumidity = currentWeatherresponse.main.humidity.unit;
      console.assertlog(currentHumidity);
      currentTemp = currentWeatherresponse.main.temp;
      today = new Date().toLocaleDateString();
    });
}
function geocode(city) {
  var geocodeUrlEl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    searchCityEl +
    "&limit=5&appid=" +
    WeatherAPIKey;
  return geocodeUrlEl;
}
function currentWeather(lati, long) {
  var currentWeatherUrlEl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    WeatherAPIKey;

  return currentWeatherUrlEl;
}
searchFormEl.addEventListener("submit", handleSearchFormSubmit);
