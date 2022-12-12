import {
  City,
  Temp,
  Description,
  Humidity,
  windSpeed,
  Icon,
  searchBar,
  searchButton,
} from "./Dom-module/domPage.js";

const weather = {
  apiKey: "a6830eb4fc6bc1e54c02233909a6fe50",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        this.displayWeather(data);
      });
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { lon, lat } = data.coord;

    City.innerText = "Weather in " + name;
    Icon.src = `https://openweathermap.org/img/wn/${icon}.png`;
    Temp.innerText = `${temp}°C`;
    Description.innerText = description;
    Humidity.innerText = `Humidity: ${humidity}"%`;
    windSpeed.innerText = `Wind Speed: ${speed}Kmph`;
    document.body.style.backgroundImage =
      `url('https://source.unsplash.com/1600x900/?"${name}"')`;

    L.marker([lat, lon]).addTo(map);
  },

  search: function () {
    this.fetchWeather(searchBar.value);
  },
};

searchButton.addEventListener("click", function () {
  weather.search();
});

searchBar.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Delhi");

const tiles = L.tileLayer(tileUrl, { attribution });

tiles.addTo(map);
