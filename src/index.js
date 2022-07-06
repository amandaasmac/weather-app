// current day
function displayCurrentDay(date) {
  let weekDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  let weekDay = weekDays[date.getDay()];
  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = `${weekDay}`;
}

// current time
function displayCurrentTime(date) {
  let hour = date.getHours();
  if (hour < 10) hour = `0${hour}`;

  let minute = date.getMinutes();
  if (minute < 10) minute = `0${minute}`;

  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${hour}:${minute}`;
}

displayCurrentDay(new Date());
displayCurrentTime(new Date());

// show weather
function showWeather(response) {
  console.log(response.data);
  let city = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let description = response.data.weather[0].description;

  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = currentTemp;
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = city;
  let maxTempElement = document.querySelector("#today-max-temp");
  maxTempElement.innerHTML = `${maxTemp}˚`;
  let minTempElement = document.querySelector("#today-min-temp");
  minTempElement.innerHTML = `${minTemp}˚`;
  let windElement = document.querySelector("#windspeed");
  windElement.innerHTML = windSpeed;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = description;
}

// default city on page load
function searchCity(city) {
  // API
  let apiKey = "f2a962d48c46d7fc23aca5910b2db6af";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios.get(`${apiUrl}${city}&appid=${apiKey}&units=metric`).then(showWeather);
}

// Search city functionality
function searchNewCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-input");
  let newCity = inputCity.value;

  searchCity(newCity);
}

let searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", searchNewCity);

searchCity("Rome");

// use device location
function usePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  let apiKey = "f2a962d48c46d7fc23aca5910b2db6af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getDevicePosition() {
  navigator.geolocation.getCurrentPosition(usePosition);
}

let locationButton = document.querySelector("#use-device");
locationButton.addEventListener("click", getDevicePosition);
