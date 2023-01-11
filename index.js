/*declaring a function to fetch data*/
const getWeather = async (country) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=da68e88766cb4c29beb120051230801&q=${country}&days=5&aqi=no&alerts=no`
    );

    const result = await response.json();

    city.textContent = `${result.location.country}-${result.location.name}`;
    date.textContent = `${result.location.localtime}`;
    var dayWeather = document.createElement("div");
    dayWeather.classList.add("day-weather");
    dayWeather.innerHTML = `
        <div class='day-status'>
        <img id='day-weather-icon' src='${result.current.condition.icon}'/>
        <span id='weather-status'>
        ${result.current.condition.text}
        </span>
        </div>
        <div class='day-temprature'>
        <i id="day-temp-icon" class="fa-solid fa-sun show"></i>
        <span id='day-high'>${result.current.temp_c} <sup>&#9900</sup> c</span>
        </div>
        <div class='day-winds'>
        <i id="day-wind-icon" class="fa-solid fa-wind show"></i>
        <span id='day-winds'>${result.current.wind_kph} kph</span>
        </div>
      `;
    dayWeatherSection.appendChild(dayWeather);

    result.forecast.forecastday.map((e) => {
      var day = document.createElement("div");
      /** set hours section and hide it */
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
const dayWeatherSection = document.getElementById("day-weather");
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
  if (dayWeatherSection.firstChild)
    //cuz it does't exist at the beginning
    dayWeatherSection.firstChild.classList.toggle("dark");
  weekWeatherSection.childNodes.forEach((item) => {
    item.classList.toggle("dark");
  });
});

/* set a click event to the search icon */
searchIocn.addEventListener("click", () => {
  /*make sure to clean the previus results */
  weekWeatherSection.innerHTML = "";
  dayWeatherSection.innerHTML = "";
  hoursWeatherSection.childNodes.forEach((item) => {
    item.style.display = "none";
  });
  getWeather(input.value);
});
