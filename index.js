/*declaring a function to fetch data*/
const getWeather = async (country) => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=da68e88766cb4c29beb120051230801&q=${country}&days=3&aqi=no&alerts=no`
  );

  const result = await response.json();
  console.log(result);
  /*assign results to the variables */
  city.textContent = `${result.location.country} ${result.location.name}`;
  date.textContent = result.location.localtime;
  weatherStatus.textContent = result.current.condition.text;
  dayWeatherIcon.src = result.current.condition.icon;
  dayHigh.innerHTML = `${result.current.temp_c} <sup>&#9900</sup> c`;
  dayTempIcon.classList.add("show");
  dayWinds.textContent = `${result.current.wind_kph} kph`;
  dayWindIcon.classList.add("show");
  dayWeather.classList.add("show-shadow");
};

// console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

const city = document.getElementById("city");
const date = document.getElementById("date");
const weatherStatus = document.getElementById("weather-status");
const dayHigh = document.getElementById("day-high");
const header = document.getElementsByClassName("header")[0];
const input = document.getElementById("input");
const searchIocn = document.getElementById("search-icon");
const dayWeather = document.getElementById("day-weather");
const dayWeatherIcon = document.getElementById("day-weather-icon");
const dayWinds = document.getElementById("day-winds");
const dayTempIcon = document.getElementById("day-temp-icon");
const dayWindIcon = document.getElementById("day-wind-icon");
/** dark mode */
const toggle = document.getElementById("toggle");
toggle.addEventListener("click", () => {
  header.classList.toggle("dark");
  toggle.classList.toggle("dark");
  document.body.classList.toggle("dark");
  dayWeather.classList.toggle("dark");
});
/* set a click event to the search icon */
searchIocn.addEventListener("click", () => {
  getWeather(input.value);
});
