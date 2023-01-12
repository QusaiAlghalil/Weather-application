/*create the main sections */
const dayWeatherSection = document.createElement("div");
dayWeatherSection.classList.add("day-weather");
const weekWeatherSection = document.createElement("div");
weekWeatherSection.classList.add("week-weather");
const hoursWeatherSection = document.createElement("div");
hoursWeatherSection.classList.add("hours-weather");
const header = document.getElementsByClassName("header")[0];
const input = document.getElementById("input");
/*declaring a function to fetch data*/
const getWeather = async (country) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=da68e88766cb4c29beb120051230801&q=${country}&days=5&aqi=no&alerts=no`
    );

    const result = await response.json();
    const city = document.getElementById("city");
    const date = document.getElementById("date");
    city.textContent = `${result.location.country}-${result.location.name}`;
    date.textContent = `${result.location.localtime}`;
    /* days section */
    dayWeatherSection.innerHTML = `
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
    document.body.appendChild(dayWeatherSection);

    result.forecast.forecastday.map((e) => {
      const day = document.createElement("div");
      /** set hours section and hide it */
      const hour = document.createElement("div");
      hour.classList.add("hour");
      hour.style.display = "none";
      hour.setAttribute("data-id", e.date_epoch);
      e.hour.forEach((h) => {
        const hDetailes = document.createElement("div");
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
      document.body.appendChild(weekWeatherSection);
      document.body.appendChild(hoursWeatherSection);

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

/** dark mode */
const toggle = document.getElementById("toggle");
toggle.addEventListener("click", () => {
  header.classList.toggle("dark");
  toggle.classList.toggle("dark");
  document.body.classList.toggle("dark");
  if (dayWeatherSection)
    //cuz it does't exist at the beginning
    dayWeatherSection.classList.toggle("dark");
  weekWeatherSection.childNodes.forEach((item) => {
    item.classList.toggle("dark");
  });
});

/* set a click event to the search icon */
const searchIocn = document.getElementById("search-icon");
searchIocn.addEventListener("click", () => {
  /*make sure to remove the previus results */
  weekWeatherSection.innerHTML = "";
  dayWeatherSection.innerHTML = "";
  hoursWeatherSection.innerHTML = "";
  /*fetch data*/
  getWeather(input.value);
});
