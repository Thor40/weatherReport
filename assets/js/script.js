var userFormEl = document.querySelector("#user-form")
var cityInputEl = document.querySelector("#city-input")
var weatherContainerEl = document.querySelector("#weather-container");
var weatherSearchTerm = document.querySelector("#weather-search-term");
var currentDate = moment().format("dddd, MMMM Do YYYY");

var getCity = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e30b91e5b089d12b97f22fef450b5850";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        if (response.ok) {
            displayCity(data, city);
        } else {
            alert("Error: City " + response.statusText);
        }
    })
    });
};


var displayCity = function(data, searchTerm) {
    console.log(data);
    console.log(searchTerm);
    var iconcode = data.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

    var setCurrentDate = currentDate;
    setCurrentDate.classList = "text-muted"
    
    weatherContainerEl.textContent = "";
    weatherSearchTerm.textContent = searchTerm + " - " + setCurrentDate;
    var iconImg = document.createElement("img");
    iconImg.setAttribute("src", iconurl)

    // div holding weather repot
    var weatherEl = document.createElement("div");
    weatherEl.classList = "flex-column list-group align-left";
    // title of city
    var titleEl = document.createElement("span");
    titleEl.classList = "flex-row";
    titleEl.textContent = name;
    // weather info
    var tempEl = document.createElement("li");
    tempEl.classList = "list-group-item w-25"
    tempEl.textContent = "Temperature: " + data.main.temp + "° F";
    // humidity info
    var humidEl = document.createElement("li");
    humidEl.classList = "list-group-item w-25 border-top"
    humidEl.textContent = "Humidity: " + data.main.humidity;

    weatherEl.appendChild(titleEl);
    weatherEl.appendChild(tempEl);
    weatherEl.appendChild(humidEl);
    weatherEl.appendChild(iconImg);

    weatherContainerEl.appendChild(weatherEl);    

};

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    //get value from input element
    var city = cityInputEl.value.trim();

    if(city) {
        getCity(city);
        cityInputEl = "";
    } else {
        alert("Please enter a valid city name");
    }
    console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler);