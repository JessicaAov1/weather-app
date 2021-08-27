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

function showWeather(response) {
  console.log(response);
  let resultCity = document.querySelector("#current-city");
  let currentCity = response.data.name;
  resultCity.innerHTML = currentCity;

  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${temperature}`;

  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity : ${currentHumidity}%`;

  let currentDescription = response.data.weather[0].main;
  let description = document.querySelector("#description");
  description.innerHTML = `${currentDescription}`;

  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind speed: ${currentWind}km/h`;

  let sunsetTime = response.data.sys.sunset;
  let sunset = document.querySelector("#sunset");
  sunset.innerHTML = `Sunset: ${sunsetTime} `;
}

function showFahrenheit(event) {
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = currentTemperature.innerHTML;
  temperature = Number(temperature);
  currentTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheit = document.querySelector("#temp-fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let resultCity = document.querySelector("#current-city");
  resultCity.innerHTML = `${searchInput.value}`;
  let apiKey = "9ca6c562062d122440b16668ce916487";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", search);

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
