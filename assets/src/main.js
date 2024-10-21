const userLocation = document.getElementById("userLocation"),
  converter = document.getElementById("converter"),
  weatherIcon = document.querySelector(".weatherIcon"),
  temperature = document.querySelector(".temperature"),
  feelsLike = document.querySelector(".feelsLike"),
  description = document.querySelector(".description"),
  date = document.querySelector(".date"),
  city = document.querySelector(".city"),
  HValue = document.getElementById("HValue"),
  WValue = document.getElementById("WValue"),
  SRValue = document.getElementById("SRValue"),
  SSValue = document.getElementById("SSValue"),
  CValue = document.getElementById("CValue"),
  PValue = document.getElementById("PValue"),
  Forecast = document.querySelector(".forecast"),
  app = document.querySelector("body");

const WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=3b4270389f20c03b9af3d0d9bc2619ae&q=`,
  WEATHER_DATA_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=3b4270389f20c03b9af3d0d9bc2619ae&exclude=minutely&units=metric&`;

document.addEventListener("DOMContentLoaded", () => {
  userLocation.value = localStorage.getItem("location") || "Orlando";
  converter.value = localStorage.getItem("tempType") || "°F";
  findUserLocation();
});

// Function to find user location and fetch weather data
function findUserLocation() {
  Forecast.innerHTML = "";

  localStorage.setItem("location", userLocation.value);
  localStorage.setItem("tempType", converter.value);

  fetch(WEATHER_API_ENDPOINT + userLocation.value)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod != 200) {
        alert("Location not found");
        return;
      }
      displayWeatherData(data);
    });
}

// Function to display weather data
function displayWeatherData(data) {
  city.innerHTML = `${data.name}, ${data.sys.country}`;
  weatherIcon.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;

  fetch(WEATHER_DATA_ENDPOINT + `lon=${data.coord.lon}&lat=${data.coord.lat}`)
    .then((response) => response.json())
    .then((data) => {
      temperature.innerHTML = TempConverter(data.main.temp);
      feelsLike.innerHTML = `Feels like ${TempConverter(data.main.feels_like)}`;
      description.innerHTML = `<i class="fa-brands fa-cloudversify"></i> &nbsp;${data.weather[0].description}`;

      const dateOptions = { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: true };
      date.innerHTML = getLongFormatDateTime(data.dt, data.timezone, dateOptions);

      HValue.innerHTML = `${Math.round(data.main.humidity)}<span>%</span>`;
      WValue.innerHTML = `${Math.round(data.wind.speed)}<span>m/s</span>`;

      const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
      SRValue.innerHTML = getLongFormatDateTime(data.sys.sunrise, data.timezone, timeOptions);
      SSValue.innerHTML = getLongFormatDateTime(data.sys.sunset, data.timezone, timeOptions);

      CValue.innerHTML = `${data.clouds.all}<span>%</span>`;
      PValue.innerHTML = `${data.main.pressure}<span>hPa</span>`;

      updateBackground(data);
    });
}

// Convert temperature based on the chosen unit
function TempConverter(temp) {
  let tempValue = Math.round(temp);
  return converter.value === "°C" ? `${tempValue}<span>°C</span>` : `${(tempValue * 9) / 5 + 32}<span>°F</span>`;
}

// Function to format Unix time
function getLongFormatDateTime(dtValue, offSet, options) {
  return formatUnixTime(dtValue, offSet, options);
}

function formatUnixTime(dtValue, offSet, options = {}) {
  const date = new Date((dtValue + offSet) * 1000);
  return date.toLocaleTimeString([], { timeZone: "UTC", ...options });
}

// Event listener for location search
userLocation.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    findUserLocation();
  }
});
