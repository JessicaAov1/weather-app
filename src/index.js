let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];

let resultDay = document.querySelector("#current-day");
resultDay.innerHTML = `${day}, ${month} ${date}`;
let resultTime = document.querySelector("#current-time");
resultTime.innerHTML = `${hour}:${minutes}`;

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `Sunset: ${hours}h${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-3">
  <div class="card first-day" style="width: 7rem">
  <div class="card-body">
    <span class="clearfix weather-icon">
                    <img
                    src=" http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    class="float-left"
                    id="icon2"
                    width="45%"
                    />
                 
  <span class="card-title day1">${formatDay(forecastDay.dt)}</h5>
      </span>
          </span>
                <div class="card-text temp-max2">
          
                    
                   ${Math.round(forecastDay.temp.max)}° - 
                    <span class="card-text temp-min2"> 
                      ${Math.round(forecastDay.temp.min)}°</span>
                    </span>
                    </div>
                    </div>
                    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(displayForecast);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "9ca6c562062d122440b16668ce916487";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  console.log(response);

  let resultCity = document.querySelector("#current-city");
  let currentCity = response.data.name;
  resultCity.innerHTML = currentCity;

  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${temperature}`;
  celsiusTemperature = response.data.main.temp;

  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;

  let currentDescription = response.data.weather[0].description;
  let description = document.querySelector("#description");
  description.innerHTML = `${currentDescription}`;

  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind speed: ${currentWind}km/h`;

  let sunsetTime = response.data.sys.sunset;
  let sunset = document.querySelector("#sunset");
  sunset.innerHTML = formatDate(sunsetTime * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function showFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let fahreneitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahreneitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let resultCity = document.querySelector("#current-city");
  resultCity.innerHTML = `${searchInput.value}`;
  let apiKey = "9ca6c562062d122440b16668ce916487";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9ca6c562062d122440b16668ce916487";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndPoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
function currentData(position) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", currentData);

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);
