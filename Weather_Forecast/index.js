document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const locationName = document.getElementById('locationName');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const windSpeed = document.getElementById('windSpeed');
    const forecast = document.getElementById('forecast');
    const apiKey = '38c164dc23c7e6515987ba1264e9e2df'; // Replace with your OpenWeatherMap API key

    const getWeather = async (location) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return data;
    };

    const getForecast = async (location) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        console.log(data)
        return data;
    };

    const displayWeather = (data) => {
        locationName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        description.textContent = `Condition: ${data.weather[0].description}`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        weatherInfo.style.display = 'block';
    };

    const displayForecast = (data) => {
        forecast.innerHTML = '';
        const dailyData = data.list.filter(entry => entry.dt_txt.includes('12:00:00'));
        dailyData.forEach(day => {
            const date = new Date(day.dt_txt);
            const forecastDay = document.createElement('div');
            forecastDay.classList.add('forecast-day');
            forecastDay.innerHTML = `
                <h4>${date.toDateString()}</h4>
                <p>Temperature: ${day.main.temp}°C</p>
                <p>Condition: ${day.weather[0].description}</p>
            `;
            forecast.appendChild(forecastDay);
        });
    };

    searchButton.addEventListener('click', async () => {
        const location = locationInput.value;
        if (location) {
            const weatherData = await getWeather(location);
            const forecastData = await getForecast(location);
            displayWeather(weatherData);
            displayForecast(forecastData);
        }
    });
});
