const API_KEY = "3802fc9f7e89669d438abefffbc45678"; 
async function fetchWeatherData() {
    const city = document.getElementById("City").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        displayWeather(weatherData);
        displayForecast(forecastData);
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("City not found or API error!");
    }
}
function displayWeather(data) {
    const weatherResult = document.getElementById("weatherResult");
    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
function displayForecast(data) {
    const forecastResult = document.getElementById("forecastResult");
    let forecastHTML = "<h3>5-Day Forecast</h3>";
    for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        forecastHTML += `
            <div>
                <p>${new Date(day.dt_txt).toDateString()}</p>
                <p>Temp: ${day.main.temp}°C</p>
                <p>${day.weather[0].description}</p>
            </div>
        `;
    }   
    forecastResult.innerHTML = forecastHTML;
}
