import {city,Temp,Description,Humidity,windSpeed,Icon} from"./Dom-module/domPage.js";

let weather = {
  apiKey: "a6830eb4fc6bc1e54c02233909a6fe50",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

  city.innerText= "Weather in " + name;
  Icon.src ="https://openweathermap.org/img/wn/" + icon + ".png";
  Temp.innerText = temp + "°C";
  Description.innerText = description;
  Humidity.innerText =
    "Humidity: " + humidity + "%";
  windSpeed.innerText = "Wind Speed: " + speed + "Kmph";
  document.body.style.backgroundImage= "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Delhi");
