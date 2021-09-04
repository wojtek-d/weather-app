const button = document.querySelector("#submit-button");
const inputTextBox = document.querySelector("#placeholder-text-box");

const API_KEY = "1bdeb98a1a03ba728af543c82ca9cf9e";
async function run(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const weatherData = await response.json();
  console.log(weatherData);
}

button.addEventListener("click", (event) => {
  event.preventDefault();
  if (inputTextBox.value === "") {
    console.log("Search for a valid city");
    return;
  }
  const city = inputTextBox.value;
  run(city);
});
