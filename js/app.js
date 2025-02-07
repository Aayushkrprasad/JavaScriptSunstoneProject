document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "446cab05347ec8dfe54230c7f7897cfc";

    window.analyzeWeather = async function () {
        const city = document.getElementById("cityInput").value.trim();
        const output = document.getElementById("weatherOutput");

        if (!city) {
            output.innerText = "Please enter a city name.";
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.cod !== 200) {
                output.innerText = `Error: ${data.message}`;
                return;
            }

            const { temp, humidity, pressure } = data.main;
            const windSpeed = data.wind.speed;
            const weatherDescription = data.weather[0].description;

            output.innerHTML = `
                <h2>${city.toUpperCase()}</h2>
                <div class="weather-detail"><i class="fas fa-thermometer-half"></i> Temperature <strong>${temp}°C</strong></div>
                <div class="weather-detail"><i class="fas fa-tint"></i> Humidity <strong>${humidity}%</strong></div>
                <div class="weather-detail"><i class="fas fa-gauge-high"></i> Pressure <strong>${pressure} hPa</strong></div>
                <div class="weather-detail"><i class="fas fa-wind"></i> Wind Speed <strong>${windSpeed} m/s</strong></div>
                <div class="weather-detail"><i class="fas fa-cloud"></i> Weather <strong>${weatherDescription}</strong></div>
            `;
        } catch (error) {
            output.innerText = "Failed to fetch data.";
        }
    };
});
