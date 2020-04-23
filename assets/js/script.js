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
            displayCity(data, city);
        });
    //     if (response.ok) {

    //     } else {
    //         alert("Error: " + response.statusText);
    //     }
    // })
    });
};

var displayCity = function(data, searchTerm) {
    console.log(data);
    console.log(searchTerm);

    var setCurrentDate = currentDate;
    setCurrentDate.classList = "text-muted"
    
    weatherContainerEl.textContent = "";
    weatherSearchTerm.textContent = searchTerm + setCurrentDate;

    // div holding weather repot
    var weatherEl = document.createElement("div");
    weatherEl.classList = "flex-row list-group align-left";
    // title of city
    var titleEl = document.createElement("span");
    titleEl.classList = "flex-row";
    titleEl.textContent = name;
    // weather info
    var tempEl = document.createElement("li");
    tempEl.classList = "list-group-item"
    tempEl.textContent = "Temperature: " + data.main.temp + "°";

    weatherEl.appendChild(titleEl);
    weatherEl.appendChild(tempEl);

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