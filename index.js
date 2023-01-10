/*declaring a function to fetch data*/
const getWeather = async (country) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=da68e88766cb4c29beb120051230801&q=${country}&days=5&aqi=no&alerts=no`
    );

    const result = await response.json();

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
    /* mapping on results.forecast array  */

    result.forecast.forecastday.map((e) => {
      var day = document.createElement("div");
      /** hold hours and hide it */
      var hour = document.createElement("div");
      hour.classList.add("hour");
      hour.style.display = "none";
      hour.setAttribute("data-id", e.date_epoch);
      e.hour.forEach((h) => {
        var hDetailes = document.createElement("div");
        hDetailes.classList.add("hour-info");
        hDetailes.innerHTML = `
    <p>${h.time}</p>
    <img src="${h.condition.icon}">
    <span>${h.condition.text}</span>
    <span>${h.temp_c} <sup>&#9900</sup> c</span>
  `;
        hour.appendChild(hDetailes);
        hoursWeatherSection.appendChild(hour);
      });

      day.classList.add("week-day");
      day.setAttribute("data-id", e.date_epoch);
      day.innerHTML = `
    <p>${e.date}</p>
    <img src="${e.day.condition.icon}"  />
    <p>${e.day.condition.text}</p>
    <p>Sunrise: ${e.astro.sunrise}</p>
    <p>Sunset: ${e.astro.sunset}</p>
    <p>AVG Temp: ${e.day.avgtemp_c} <sup>&#9900</sup> c</p>
    `;

      weekWeatherSection.appendChild(day);
      /*set click event to every day to display hours weather */
      day.addEventListener("click", () => {
        hoursWeatherSection.childNodes.forEach((item) => {
          item.style.display = "none";
        });

        hoursWeatherSection.childNodes.forEach((child) => {
          if (child.dataset.id === day.dataset.id) {
            child.style.display = "block";
          }
        });
      });
    });
  } catch {
    prompt("please enter a correct country name");
  }
};

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
const weekWeatherSection = document.getElementById("week-weather");
const hoursWeatherSection = document.getElementById("hours-weather");
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
  /*make sure to clean the previus results */
  weekWeatherSection.innerHTML = "";
  hoursWeatherSection.childNodes.forEach((item) => {
    item.style.display = "none";
  });
  getWeather(input.value);
});
