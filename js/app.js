document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "446cab05347ec8dfe54230c7f7897cfc";

    window.analyzeWeather = async function() {
        const city = document.getElementById("cityInput").value;
        if (!city) {
            document.getElementById("weatherOutput").innerText = "Please enter a city name.";
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.cod !== 200) {
                document.getElementById("weatherOutput").innerText = `Error: ${data.message}`;
                return;
            }

            const { temp, humidity, pressure } = data.main;
            const windSpeed = data.wind.speed;
            const weatherDescription = data.weather[0].description;

            document.getElementById("weatherOutput").innerHTML = `
                Temperature: ${temp}°C<br>
                Humidity: ${humidity}%<br>
                Pressure: ${pressure} hPa<br>
                Wind Speed: ${windSpeed} m/s<br>
                Weather: ${weatherDescription}
            `;

            visualizeData(temp, humidity, pressure, windSpeed);
        } catch (error) {
            document.getElementById("weatherOutput").innerText = "Failed to fetch data.";
        }
    }

    function visualizeData(temp, humidity, pressure, windSpeed) {
        const ctx = document.getElementById("weatherChart").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Temperature", "Humidity", "Pressure", "Wind Speed"],
                datasets: [{
                    label: "Weather Data",
                    data: [temp, humidity, pressure, windSpeed],
                    backgroundColor: ["red", "blue", "green", "purple"],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
});
