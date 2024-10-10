const userLocation = document.getElementById('userLocation'),
converter = document.getElementById("converter"),
weatherIcon = document.querySelector(".weatherIcon"),
temperature = document.querySelector(".temperature"),
feelsLike = document.querySelector("feelsLike"),
description = document.querySelector(".description"),
date = document.querySelector(".date"),
city = document.querySelector(".city"),
HValue = document.getElementById("HValue"),
WValue = document.getElementById("WValue"),
SRValue = document.getElementById("SRValue"),
SSValue = document.getElementById("SSvalue"),
CValue = document.getElementById("CValue"),
UVValue = document.getElementById("UVValue"),
PValue = document.getElementById("PValue"),
Forecast = document.querySelector(".Forecast");

WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=3b4270389f20c03b9af3d0d9bc2619ae&q=` ;
WEATHER_DATA_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=3b4270389f20c03b9af3d0d9bc2619ae&exclude=minutely&units=metric&` ;

function findUserLocation() {
  fetch(WEATHER_API_ENDPOINT + userLocation.value)
  .then((response) => response.json())
  .then((data) => {
    if(data.cod!='' && data.cod!=200){
         alert(data.message);
         return;
    }
    console.log(data);

    city.innerHTML = data.name + ", " + data.sys.country;
    weatherIcon.style.background=`url(https://openweathermap.org/img/wn/10d@2x.png)`
    fetch(
      WEATHER_DATA_ENDPOINT + `lon=${data.coord.lon}&lat=${data.coord.lat}`)
    
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      temperature.innerHTML=data.current.temp;
      feelsLike.innerHTML="Feels like" + data.current.feels_like;
      description.innerHTML= 
      '<i class="fa-bands fa-cloudversify"></i> &nbsp;' +
      data.current.weather[0].description;

      const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }

      date.innerHTML = getLongFormatDateTime(date.current.dt, date.timezone_offset, options)

      HValue.innerHTML=Math.round(data.current.humidity)+"<span>%</span>";
      WValue.innerHTML=Math.round(data.current.wind_speed)+"<span>m/s</span>";
      const options1 = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }
      SRValue.innerHTML=getLongFormatDateTime(data.current.sunrise, data.timezone_offset, options1);
      SSValue.innerHTML=getLongFormatDateTime(data.current.sunset, data.timezone_offset, options1);

      CValue.innerHTML=data.current.clouds+"<span>%</span>";
      UVValue.innerHTML=data.current.uvi;
      PValue.innerHTML=data.current.pressure+"<span>hPa</span>";

    });
  });
}

function formatUtixTime(dtValue, offSet, options={}) {
  const date = new Date((dtValue + offSet) * 1000);
  return date.toLocaleTimeString([], {timeZone: "UTC", ...options });
};

function getLongFormatDateTime(dtValue, offSet, options) {
  return formatUtixTime(dtValue, offSet, options);
};