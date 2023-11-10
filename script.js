var searchFormEl = document.querySelector("#search-form");
var WeatherAPIKey = "dd722ae2b0b3e5ffb448c9a00bf261d0";
var latitude;
var longitude;
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
      console.log(geocode[0].lat);
      console.log(geocode[0].lon);
      latitude = geocode[0].lat;
      longitude = geocode[0].lon;
    });
}
searchFormEl.addEventListener("submit", handleSearchFormSubmit);
