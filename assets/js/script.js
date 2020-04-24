var userFormEl = document.querySelector("#user-form")
var cityInputEl = document.querySelector("#city-input")
var weatherContainerEl = document.querySelector("#weather-container");
var weatherSearchTerm = document.querySelector("#weather-search-term");
var currentDate = moment().format("dddd, MMMM Do YYYY");
    // div holding weather report
    var weatherEl = document.createElement("div");
    weatherEl.classList = "flex-column list-group align-left";

var getCity = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e30b91e5b089d12b97f22fef450b5850";
    // make a request to the url
    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            displayCity(data, city);
            var latEl = data.coord.lat;
            var lonEl = data.coord.lon;
            console.log(latEl);
            console.log(lonEl);
            return fetch("http://api.openweathermap.org/data/2.5/uvi?appid=e30b91e5b089d12b97f22fef450b5850&lat=" + latEl + "&lon=" + lonEl +"");
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayUV(data);
    });
};


var displayCity = function(data, searchTerm) {
    console.log(data);
    console.log(searchTerm);
    var iconcode = data.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

    var setCurrentDate = currentDate;
    setCurrentDate.classList = "text-muted"
    

    var iconImg = document.createElement("img");
    iconImg.setAttribute("src", iconurl)
    
    weatherContainerEl.textContent = "";
    weatherSearchTerm.textContent = data.name + " - " + setCurrentDate;
    // current weather
    var weatherIconCurrent = document.createElement("span");
    weatherIconCurrent.classList = "flex-row";
    weatherIconCurrent.textContent = data.weather.description;
    // weather info
    var tempEl = document.createElement("li");
    tempEl.classList = "list-group-item w-25"
    tempEl.textContent = "Temperature: " + data.main.temp + "° F";
    // humidity info
    var humidEl = document.createElement("li");
    humidEl.classList = "list-group-item w-25 border-top"
    humidEl.textContent = "Humidity: " + data.main.humidity;
    // wind speed info
    var windEl = document.createElement("li");
    windEl.classList = "list-group-item w-25 border-top"
    windEl.textContent = "Wind Speed: " + data.wind.speed + " MPH";

    weatherEl.appendChild(weatherIconCurrent);
    weatherEl.appendChild(tempEl);
    weatherEl.appendChild(humidEl);
    weatherEl.appendChild(windEl);
    weatherSearchTerm.appendChild(iconImg);

    weatherContainerEl.appendChild(weatherEl);    

};

var displayUV = (function(data) {
    console.log(data);
    // UV Index info
    var uvEl = document.createElement("li");
    uvEl.classList = "list-group-item w-25"
    uvEl.textContent = "UV Index: " + data.value + "";
    weatherEl.appendChild(uvEl);
});

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    //get value from input element
    var city = cityInputEl.value.trim();

    if(city) {
        getCity(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a valid city name");
    }
    console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler);