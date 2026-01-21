document.getElementById("getWeather").addEventListener("click", function () {
  let city = document.getElementById("city").value;
  if (city) {
    fetchWeather(city);
  }
});

function fetchWeather(city) {
  const apiKey = "PUTYOURAPIKEY"; // Replace with your own API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
    .catch((error) => console.error("Error:", error));
}

function displayWeather(data) {
  if (data.cod === 200) {
    const weatherDiv = document.getElementById("weatherResult");
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const name = data.name;
    weatherDiv.innerHTML = `Weather in ${name}: ${temp}°C, ${description}`;
  } else {
    alert("City not found");
  }
}
