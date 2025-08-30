    function search(event){
      event.preventDefault();
      let cityElement = document.querySelector("#current-city");
      let searchInputElement = document.querySelector("#input-search");
      let city = searchInputElement.value;
      let apiKey = "b99t41fb7bao38b2a301ca5200fbfdb3";
      let apiUrl = "https://api.shecodes.io/weather/v1/current?query=Lisbon&key=b99t41fb7bao38b2a301ca5200fbfdb3&units=metric";

      axios.get(apiUrl).then(displayCurrentWeather);
      cityElement.innerHTML = city;
    }

    function displayCurrentWeather(response){
      //console.log(response.data.temperature.current);

      let temperatureElement = document.querySelector(".value");
      temperatureElement.innerHTML = `${response.data.temperature.current}`;
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
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);




