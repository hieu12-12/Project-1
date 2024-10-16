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
PValue = document.getElementById("PValue"),
Forecast = document.querySelector(".forecast");

WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=3b4270389f20c03b9af3d0d9bc2619ae&q=` ;
WEATHER_DATA_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=3b4270389f20c03b9af3d0d9bc2619ae&exclude=minutely&units=metric&` ;

findUserLocation(userLocation.value = localStorage.getItem("location") || "Orlando", converter.value = localStorage.getItem("tempType") || "°F");

function findUserLocation() {
  Forecast.innerHTML="";
  fetch(WEATHER_API_ENDPOINT + userLocation.value)
  .then((response) => response.json())
  .then((data) => {
    if(data.cod!='' && data.cod!=200){
         alert("Location not found");
         return;
    }
    console.log(data);

    localStorage.setItem("location", userLocation.value);
    localStorage.setItem("tempType", converter.value);

    city.innerHTML = data.name + ", " + data.sys.country;
    weatherIcon.style.background=`url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`
    fetch(WEATHER_DATA_ENDPOINT + `lon=${data.coord.lon}&lat=${data.coord.lat}`
    )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      temperature.innerHTML = TempConverter(data.main.temp);
      feelsLike.innerHTML=`Feels like ${TempConverter(data.main.feels_like)}`;
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

      date.innerHTML = getLongFormatDateTime(data.dt, data.timezone, options)

      HValue.innerHTML=Math.round(data.main.humidity)+"<span>%</span>";
      WValue.innerHTML=Math.round(data.wind.speed)+"<span>m/s</span>";

      const options1 = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }

      SRValue.innerHTML=getLongFormatDateTime(data.sys.sunrise, data.timezone, options1);
      SSValue.innerHTML=getLongFormatDateTime(data.sys.sunset, data.timezone, options1);

      CValue.innerHTML=data.clouds.all+"<span>%</span>";
      PValue.innerHTML=data.main.pressure+"<span>hPa</span>";
  });
});

function formatUnixTime(dtValue, offSet, options={}) {
  const date = new Date((dtValue + offSet) * 1000);
  return date.toLocaleTimeString([], {timeZone: "UTC", ...options });
};

function getLongFormatDateTime(dtValue, offSet, options) {
  return formatUnixTime(dtValue, offSet, options);
};

function TempConverter(temp) {
  let tempValue=Math.round(temp);
  let message="";
   if(converter.value=="°C"){
   message=tempValue+"<span>"+"\xB0C</span>";
   } else {
    let ctof=(tempValue * 9) / 5 + 32;
    message= ctof + "<span>" + "\xB0F</span>";
   }
   return message;
}}

function search(event) {
  if (event.key === 'Enter') {
    findUserLocation();
  };
}

userLocation.addEventListener('keydown', search)

timeOfDay = "day";
code = data.current.condition.code;

if(!data.current.is_day) {
  timeOfDay ="night";
}

if(code == 1000) {
  app.style.backgroundImage = `
  url(/assets/images/${timeOfDay}/sunset\ cloud.jpg)`
}

let timeOfDay = "day";

const code = data.current.condition.code;

if (!data.current.is_day) {
  timeOfDay = "night;"
}

if (code == 1000) {


  app.style.backgroundImage = 
  `url(../images/${timeOfDay}/clear.jpg);`


  BigInt.style.background = "#e5ba92";
  if(timeOfDay == "night") {
  BigInt.style.background = "#181e27";
  }
  } else if (
  code == 1003 || 
  code == 1006 || 
  code == 1009 || 
  code == 1030,
  code == 1069,
  code == 1087,
  code == 1135,
  code == 1273,
  code == 1276,
  code == 1282 
  ) {
  app.style.backgroundImage = `
  url(.images/${timeOfDay}/cloudy.jpg)`;
  btn.style.background = "#fa6d1b";
  if(timeOfDay == "night") {
    btn.style.background = "#181e27";
  }

  } else if (
  code == 1063,
  code == 1069,
  code == 1072,
  code == 1150,
  code == 1153,
  code == 1180,
  code == 1183,
  code == 1189,
  code == 1192,
  code == 1195,
  code == 1204,
  code == 1207,
  code == 1240,
  code == 1243,
  code == 1246,
  code == 1249,
  code == 1252
  ) {
  app.style.backgroundImage = `
  url(./images/${timeOfDay}/rainy.jpg)`;
  btn.style.background = "#647d75";
  if(timeOfDay == "night") {
    btn.style.background = "#325c80";
  }

  } else {
  app.style.backgroundImage = `
  url(./images/${timeOfDay}/snowy.jpg)`;
  btn.style.background = "#4D72aa";
  if(timeOfDay == "night") {
    btn.style.background = "#1b1b1b";
   }

  app.style.opacity = "1";
}

