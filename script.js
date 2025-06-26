document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const addCityInput = document.getElementById("addCityInput");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("display-city-name");
  const cityTemp = document.getElementById("display-city-temp");
  const cityWeatherDescription = document.getElementById(
    "display-city-weather"
  );
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "41066e7cbece349d245bf735a1cc9a2e";

  addCityInput.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    console.log(city);

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //get the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(response);

    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    //display the data
    console.log(data);
    const { name, main, weather } = data;
    cityName.textContent = name;
    cityTemp.textContent = `Temperature: ${(main.temp - 273.15).toFixed(1)}°C`;
    cityWeatherDescription.textContent = `Weather: ${weather[0].description}`

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
