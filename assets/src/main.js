userLocation = document.getElementById("userLocation")
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
UVValue = document.getElementById("UVValue"),
PValue = document.getElementById("PValue"),
Forecast = document.querySelector(".Forecast");

WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=3b4270389f20c03b9af3d0d9bc2619ae&q=` ;
WEATHER_DATA_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=3b4270389f20c03b9af3d0d9bc2619ae&exclude=minutely&units=metric&` ;

function findUserLocation() {
  Forecast.innerHTML="";
  fetch(WEATHER_API_ENDPOINT + userLocation.value)
  .then((response) => response.json())
  .then((data) => {
    if(data.cod!='' && data.cod!=200){
         alert(data.message);
         return;
    }
    console.log(data);

    city.innerHTML = data.name + ", " + data.sys.country;
    weatherIcon.style.background=`url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`
    fetch(WEATHER_DATA_ENDPOINT + `lon=${data.coord.lon}&lat=${data.coord.lat}`
    )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      temperature.innerHTML=data.main.temp;
      feelsLike.innerHTML=`Feels like ${data.main.feels_like}`;
      description.innerHTML= 
      '<i class="fa-brands fa-cloudversify"></i> &nbsp;' +
      data.weather[0].description;

      const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }

      date.innerHTML = getLongFormatDateTime(date.dt, date.timezone_offset, options)

      HValue.innerHTML=Math.round(data.main.humidity)+"<span>%</span>";
      WValue.innerHTML=Math.round(data.main.wind_speed)+"<span>m/s</span>";
      const options1 = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }
      SRValue.innerHTML=getLongFormatDateTime(data.main.sunrise, data.timezone_offset, options1);
      SSValue.innerHTML=getLongFormatDateTime(data.main.sunset, data.timezone_offset, options1);

      CValue.innerHTML=data.main.clouds+"<span>%</span>";
      UVValue.innerHTML=data.main.uvi;
      PValue.innerHTML=data.main.pressure+"<span>hPa</span>";

      data.daily.forEach((weather)=> {
        let div =document.createElement("div");

        const options={
          weather:'long',
          month:'long',
          day:"numberic"
        };
        let daily = getLongFormatDateTime(weather.dt, 0, options).split(
          " at "
        );

       div.innerHTML= daily[0];
       div.innerHTML+= `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />`
       div.innerHTML+= `<p class="forecast-desc>${weather.weather[0].description}>"`

        Forecast.append(div);
      })

    });
  });
}

function formatUnixTime(dtValue, offSet, options={}) {
  const date = new Date((dtValue + offSet) * 1000);
  return date.toLocaleTimeString([], {timeZone: "UTC", ...options });
};

function getLongFormatDateTime(dtValue, offSet, options) {
  return formatUnixTime(dtValue, offSet, options);
};