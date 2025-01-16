const apiKey = "6865e557c520c1781ac5428d19970f63";
const fetchWeatherButton = document.getElementById("fetchWeather");
const cityInput = document.getElementById("cityInput");
const weatherDisplay = document.getElementById("weatherDisplay");

const fetchWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    );
    const data = await response.json();

    if (data.cod === 200) {
      return {
        name: data.name,
        country: data.sys.country,
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        feels_like: Math.round(data.main.feels_like),
      };
    }
    throw new Error(data.message);
  } catch (error) {
    throw error;
  }
};

const updateUI = (weatherData) => {
  weatherDisplay.innerHTML = `
        <div class="weather-data">
            <h2>${weatherData.name}, ${weatherData.country}</h2>
            <div class="weather-main">
                <img src="http://openweathermap.org/img/w/${weatherData.icon}.png" alt="Weather Icon" style="width: 100px;">
                <div class="temperature">${weatherData.temp}°C</div>
            </div>
            <p class="description">${weatherData.description}</p>
            <div class="weather-details">
                <div class="detail-item">
                    <i class="fas fa-temperature-high"></i>
                    <div class="detail-info">
                        <span>Feels Like</span>
                        <p>${weatherData.feels_like}°C</p>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-wind"></i>
                    <div class="detail-info">
                        <span>Wind Speed</span>
                        <p>${weatherData.wind} m/s</p>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-tint"></i>
                    <div class="detail-info">
                        <span>Humidity</span>
                        <p>${weatherData.humidity}%</p>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const showError = (message) => {
  weatherDisplay.innerHTML = `
        <div class="weather-default">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
};

fetchWeatherButton.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name");
    return;
  }

  try {
    const weatherData = await fetchWeather(city);
    updateUI(weatherData);
  } catch (error) {
    showError(error.message || "Failed to fetch weather data");
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchWeatherButton.click();
  }
});
