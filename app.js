const apiKey = 'b60c6ecaef7c6de8892a9adc090288b3';

document.getElementById('searchBtn').addEventListener('click', fetchWeather);

function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    const message = document.getElementById('message');
    const weatherContainer = document.getElementById('weatherContainer');

    if (!city) {
        message.innerText = 'Please enter a city name.';
        return;
    }

    // Clear previous data and show loading message
    message.innerText = 'Loading...';
    weatherContainer.innerHTML = '';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            message.innerText = '';
        })
        .catch(error => {
            message.innerText = `Error: ${error.message}`;
        });
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}