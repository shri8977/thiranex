const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");

const API_KEY = "a7f26659104d4a208bd92158260706";

async function getWeather(city) {

    weatherCard.innerHTML = "<p>Loading...</p>";

    try {

        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        weatherCard.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>

            <img
                src="https:${data.current.condition.icon}"
                alt="${data.current.condition.text}"
            >

            <p><strong>Condition:</strong>
                ${data.current.condition.text}
            </p>

            <p><strong>Temperature:</strong>
                ${data.current.temp_c}°C
            </p>

            <p><strong>Humidity:</strong>
                ${data.current.humidity}%
            </p>

            <p><strong>Wind Speed:</strong>
                ${data.current.wind_kph} km/h
            </p>
        `;

    } catch (error) {

        weatherCard.innerHTML = `
            <p class="error">
                ${error.message}
            </p>
        `;
    }
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if(city){
        getWeather(city);
    }
});

cityInput.addEventListener("keypress", (e) => {

    if(e.key === "Enter"){

        const city = cityInput.value.trim();

        if(city){
            getWeather(city);
        }
    }
});
