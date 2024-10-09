const userLocation = document.getElementById(userLocation),;
converter = document.getElementById("converter"),
weatherIcon = document.querySelector(".weatherIcon"),
temperature = document.querySelector(".temperature"),
feelsLike = document.querySelector("feelsLike"),
description = document.querySelector(".description"),
date = document.querySelector(".date"),
city = document.querySelector(".city"),
HValue = document.getElementById("HValue"),
WValue = document.getElemenById("WValue"),
SRValue = document.getElementById("SRValue"),
SSValue = document.getElementById("SSvalue"),
CValue = document.getElementById("CValue"),
UVValue = document.getElementById("UVValue"),
PValue = document.getElementById("PValue"),
Forecast = document.querySelector(".Forecast");

WEATHER_API_ENDPOINT='https://api.openweathermap.org/data/2.5/weather?appid=';
WEATHER_DATA_ENDPOINT='';

function findUserLocation(){
  fetch(WEATHER_API_ENDPOINT + "London")
  .then((response)=> response.json())
  .then((data)=> {
    console.log(data);
  });
}