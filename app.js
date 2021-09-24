const button = document.querySelector("#submit-button");
const inputTextBox = document.querySelector("#placeholder-text-box");
const API_KEY = "Enter your key";
const countryDOM = document.querySelector("#country");
const cityDOM = document.querySelector("#city");
const temperatureDOM = document.querySelector("#temperature");
const descriptionDOM = document.querySelector("#description");
const flagDOM = document.querySelector("#flag-icon");
const iconDOM = document.querySelector("#weather-icon");
const bg = document.querySelector(".bg");

async function run(city) {
  const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const restCountriesURL = `https://restcountries.com/v3/alpha/`;
  const responseOpenWeather = await fetch(openWeatherURL);
  const weatherData = await responseOpenWeather.json();
  const responseCountries = await fetch(
    `${restCountriesURL}${weatherData.sys.country}`
  );
  const [country] = await responseCountries.json();
  console.log(country);
  let { icon, description } = weatherData.weather[0];
  temperatureDOM.innerText = weatherData.main.temp + "°C";
  countryDOM.innerText = country.name.common;
  cityDOM.innerText = weatherData.name;
  description = description.charAt(0).toUpperCase() + description.slice(1);
  descriptionDOM.innerText = description;
  flagDOM.src = country.flags[0];
  iconDOM.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  bg.style.backgroundImage = `url("https://source.unsplash.com/1600x1080/?/${
    weatherData.sys.country
  }+${description.replaceAll(" ", "+")}")`;
}

button.addEventListener("click", (event) => {
  event.preventDefault();
  if (inputTextBox.value === "") {
    alert("Search for a valid city");
    return;
  }
  run(inputTextBox.value);
});
