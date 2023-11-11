var searchFormEl = document.querySelector("#search-form");
var WeatherAPIKey = "dd722ae2b0b3e5ffb448c9a00bf261d0";
var latitude;
var longitude;
var currentWind;
var currentHumidity;
var currentTemp;
var today = new Date().toLocaleDateString();
var searchCityEl;
var iconUrl;

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

      currentWeather(latitude, longitude);
      fiveDayWeather(latitude, longitude);
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
function currentWeather(latitude, longitude) {
  var currentWeatherUrlEl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    WeatherAPIKey +
    "&units=imperial";

  getCurrentWeather(currentWeatherUrlEl);
}

function fiveDayWeather(latitude, longitude) {
  var fiveDayWeatherUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    WeatherAPIKey +
    "&units=imperial";

  getFivedayWeather(fiveDayWeatherUrl);
}
function getCurrentWeather(currentWeatherUrl) {
  fetch(currentWeatherUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      console.log(response);
      return response.json();
    })
    .then(function (currentWeatherresponse) {
      console.log(currentWeatherresponse);
      currentWind = currentWeatherresponse.wind.speed;
      console.log(currentWind);
      currentHumidity = currentWeatherresponse.main.humidity;
      console.log(currentHumidity);
      currentTemp = currentWeatherresponse.main.temp;
      console.log(currentTemp);
    });
}
function getFivedayWeather(fiveDayWeatherUrl) {
  fetch(fiveDayWeatherUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (fivedayWeatherresponse) {
      console.log(fivedayWeatherresponse);
      for (var listIndex = 0; listIndex < 5; listIndex++) {
        console.log(
          fivedayWeatherresponse.list[4 + 8 * listIndex].main.humidity
        );
        console.log(fivedayWeatherresponse.list[4 + 8 * listIndex].wind.speed);
        console.log(fivedayWeatherresponse.list[4 + 8 * listIndex].main.temp);
        var weatherIcon =
          fivedayWeatherresponse.list[4 + 8 * listIndex].weather[0].icon;
        console.log(weatherIcon);
        iconUrl =
          "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      }
    });
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);
