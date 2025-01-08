// Replace with your own API key from OpenWeatherMap
const apiKey = '6865e557c520c1781ac5428d19970f63';

const fetchWeatherButton = document.getElementById('fetchWeather');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');

fetchWeatherButton.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) {
        weatherDisplay.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === 200) {
            const weatherInfo = `
                <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Description: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
             weatherDisplay.innerHTML = weatherInfo;
        } else {
             weatherDisplay.innerHTML = `<p>Error: City not found</p>`;
        }

    } catch (error) {
        console.error('Error fetching weather:', error);
         weatherDisplay.innerHTML = `<p>Error: Unable to fetch weather data</p>`;
    }
});
