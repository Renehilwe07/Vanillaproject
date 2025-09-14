    function search(event){
      event.preventDefault();
      let cityElement = document.querySelector("#current-city");
      let searchInputElement = document.querySelector("#input-search");
      let city = searchInputElement.value;
      let apiKey = "b99t41fb7bao38b2a301ca5200fbfdb3"
      let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

      axios.get(apiUrl).then(displayCurrentWeather);
      cityElement.innerHTML = city;
    }

    function displayCurrentWeather(response){
      //console.log(response.data.temperature.current);

      let temperatureElement = document.querySelector(".value");
      temperatureElement.innerHTML = `${response.data.temperature.current}`;

      fetchForecast(response.data.city)
    }

  
    function formatDate(date) {
      let minutes = date.getMinutes();
      let hours = date.getHours();
      let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);

//weather forecast

function fetchForecast(city){
  let apiKey = "b99t41fb7bao38b2a301ca5200fbfdb3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  
  axios(apiUrl).then(displayForecast);

}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue","Wed", "Thu", "Fri", "Sat"]

  return days[date.getDay()]
}

function displayForecast(response){
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
    forecastHtml =
     forecastHtml + 
     `
     <div class="forecast-day">
  <div class="forecast-date">${formatDay(day.time)}</div>
  <div class="forecast-icon"><img src="${day.condition.icon_url}" width=50px/></div>
  <div class="forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong>&nbsp;${Math.round(day.temperature.minimum)}°</div>
</div>`;

    }
  });

  let forecastElement = document.querySelector("#forecast")
  forecastElement.innerHTML = forecastHtml;

}

search("Paris")
displayForecast();




