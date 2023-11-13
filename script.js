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
var cityArr;

function handleSearchFormSubmit(event) {
  event.preventDefault();
  searchCityEl = document.querySelector("#search-input").value;

  console.log(searchCityEl);
  if (!searchCityEl) {
    console.log("you need to enter a city to display weather!");
    return;
  }
  geocode(searchCityEl);
}

function cityList(city) {
  var cityListItem = $(
    '<li class="flex-row  p-2 list-group-item-dark  text-dark" style="list-style-type: none;margin-top:10px;text-align: center">'
  );
  cityListItem.text(city);
  $(".list-group").append(cityListItem);
}

function geocode(city) {
  var geocodeUrlEl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=" +
    WeatherAPIKey;

  fetch(geocodeUrlEl)
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
function currentInitialCity() {
  cityArr = JSON.parse(localStorage.getItem("CityName"));
  if (cityArr) {
    for (var i = 0; i < cityArr.length; i++) {
      cityList(cityArr[i]);
    }
  }
}
function getCurrentWeather(currentWeatherUrl) {
  fetch(currentWeatherUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      } else if (response.status == 200) {
        console.log(response);
        cityArr = JSON.parse(localStorage.getItem("CityName"));
        if (cityArr == null) {
          cityArr = [];
          cityArr.push(searchCityEl);
          localStorage.setItem("CityName", JSON.stringify(cityArr));
        } else {
          if (cityArr.includes(searchCityEl) === false) {
            cityList(searchCityEl);

            console.log("cityArr");
            cityArr.push(searchCityEl);
            localStorage.setItem("CityName", JSON.stringify(cityArr));
          }
        }
      }
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
      var currentWeatherIcon = currentWeatherresponse.weather[0].icon;
      var currentWeatherIconUrl =
        "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png";
      $("#currentDateWeather").html(
        searchCityEl +
          "(" +
          today +
          ")" +
          "<img src=" +
          currentWeatherIconUrl +
          ">"
      );
      $("#currentTemp").html("Temperature:" + currentTemp + "F");
      $("#currentWind").html("wind:" + currentWind + "MPH");
      $("#currentHumidity").html("Humidity:" + currentHumidity + "%");
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
        var fiveDayHumidity =
          fivedayWeatherresponse.list[4 + 8 * listIndex].main.humidity;

        console.log(fivedayWeatherresponse.list[4 + 8 * listIndex].wind.speed);

        var fiveDayWind =
          fivedayWeatherresponse.list[4 + 8 * listIndex].wind.speed;

        console.log(fivedayWeatherresponse.list[4 + 8 * listIndex].main.temp);
        var fiveDayTemp =
          fivedayWeatherresponse.list[4 + 8 * listIndex].main.temp;
        var weatherIcon =
          fivedayWeatherresponse.list[4 + 8 * listIndex].weather[0].icon;
        console.log(weatherIcon);
        var forecastDate = dayjs()
          .add(listIndex + 1, "day")
          .format("MM/DD/YYYY");
        iconUrl =
          "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

        $("#day" + listIndex).html(
          searchCityEl + "(" + forecastDate + ")" + "<img src=" + iconUrl + ">"
        );
        $("#forecastTemp" + listIndex).html("Temperature:" + fiveDayTemp + "F");
        $("#forecastWind" + listIndex).html("Wind:" + fiveDayWind + "MPH");
        $("#forecastHumidity" + listIndex).html(
          "Humidity:" + fiveDayHumidity + "%"
        );
      }
    });
}
function displayweatherInfo(event) {
  var listClicked = $(event.target);
  var listValue = listClicked.text();
  console.log("listvalue:" + listValue);
  searchCityEl = listValue;
  geocode(listValue);
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);
$(".list-group").on("click", "li", displayweatherInfo);

currentInitialCity();
