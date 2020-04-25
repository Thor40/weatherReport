var userFormEl = document.querySelector("#user-form")
var cityInputEl = document.querySelector("#city-input")
var weatherContainerEl = document.querySelector("#weather-container");
var forecastContainerEl = document.querySelector("#forecast-container");
var weatherSearchTerm = document.querySelector("#weather-search-term");
var currentDate = moment().format("dddd, MMMM Do YYYY");
    // div holding weather report
    var weatherEl = document.createElement("div");
    weatherEl.classList = "flex-column list-group list-group-flush align-left";

var getCity = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e30b91e5b089d12b97f22fef450b5850";
    // make a request to the url
    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayCity(data, city);
            var latEl = data.coord.lat;
            var lonEl = data.coord.lon;
            return fetch("http://api.openweathermap.org/data/2.5/uvi?appid=e30b91e5b089d12b97f22fef450b5850&lat=" + latEl + "&lon=" + lonEl +"");
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayUV(data);
        });
    };

var getForecast = function(city) {
    var apiForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=e30b91e5b089d12b97f22fef450b5850";
            fetch(apiForecast)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayForecast(data);
            console.log(data);
        });

};


var displayCity = function(data) {
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
    var feelEl = document.createElement("span");
    feelEl.textContent = "Feels like: " + data.main.feels_like + "° F";
    feelEl.classList = "badge badge-secondary"
    tempEl.classList = "list-group-item w-25 d-flex justify-content-between"
    tempEl.textContent = "Temperature: " + data.main.temp + "° F ";
    // humidity info
    var humidEl = document.createElement("li");
    humidEl.classList = "list-group-item w-25"
    humidEl.textContent = "Humidity: " + data.main.humidity;
    // wind speed info
    var windEl = document.createElement("li");
    windEl.classList = "list-group-item w-25"
    windEl.textContent = "Wind Speed: " + data.wind.speed + " MPH";

    tempEl.appendChild(feelEl);
    weatherEl.appendChild(weatherIconCurrent);
    weatherEl.appendChild(tempEl);
    weatherEl.appendChild(humidEl);
    weatherEl.appendChild(windEl);
    weatherSearchTerm.appendChild(iconImg);

    weatherContainerEl.appendChild(weatherEl);    

};

var displayUV = (function(data) {
    // UV Index info
    var uvEl = document.createElement("li");
    uvEl.classList = "list-group-item w-25"
    var uvSpan = document.createElement("span");
    uvSpan.textContent = data.value

    if (data.value >= 8) {
        uvSpan.classList = "badge badge-danger" 
    } else if (data.value >= 6 || data.value <= 7) {
        uvSpan.classList = "badge badge-warning" 
    } else {
        uvSpan.classList= "badge badge-success"   
    };
    uvEl.textContent = "UV Index: ";
    uvEl.appendChild(uvSpan);
    weatherEl.appendChild(uvEl);
});

var displayForecast = function(data) {
    var currentDateEl = moment().format().split("T")[0];
    var datePlusOne = moment().add(1, 'days').format().split("T")[0];
    var datePlusTwo = moment().add(2, 'days').format().split("T")[0];
    var datePlusThree = moment().add(3, 'days').format().split("T")[0];
    var datePlusFour = moment().add(4, 'days').format().split("T")[0];

    for (var i = 0; i < data.list.length; i+=8) {
        var iconcode = data.list[i].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        var iconImg = document.createElement("img");
        iconImg.setAttribute("src", iconurl)

        var forecastDate = data.list[i].dt_txt.split(" ")[0]
        if (forecastDate === currentDateEl) {
            var forecastTitle = document.createElement("h3");
            forecastTitle.textContent = "5 Day Forecast: "
        
            var fcTitle = document.createElement("h5");
            fcTitle.classList = "card-title";
            fcTitle.textContent = data.list[i].dt_txt.split(" ")[0];
        
            var forecastCard = document.createElement("div");
            forecastCard.classList = "card border-0";
        
            var forecastCardBody = document.createElement("div");
            forecastCardBody.classList = "card-body list-group-flush"
        
            var tempEl = document.createElement("li");
            tempEl.classList = "list-group-item d-flex"
            tempEl.textContent = "Temperature: " + data.list[i].main.temp + "°";
        
            // humidity info
            var humidEl = document.createElement("li");
            humidEl.classList = "list-group-item"
            humidEl.textContent = "Humidity: " + data.list[i].main.humidity;
        
            forecastContainerEl.appendChild(forecastTitle);
            forecastCard.appendChild(forecastCardBody);
            forecastCardBody.appendChild(fcTitle)
         
            forecastContainerEl.appendChild(forecastCard);
            forecastCardBody.appendChild(iconImg);
            forecastCardBody.appendChild(tempEl);
            forecastCardBody.appendChild(humidEl);
        } else if (forecastDate === datePlusOne) {
            var fcTitle = document.createElement("h5");
            fcTitle.classList = "card-title";
            fcTitle.textContent = data.list[i].dt_txt.split(" ")[0];
        
            var forecastCard = document.createElement("div");
            forecastCard.classList = "card border-0";
        
            var forecastCardBody = document.createElement("div");
            forecastCardBody.classList = "card-body list-group-flush"
        
            var tempEl = document.createElement("li");
            tempEl.classList = "list-group-item d-flex"
            tempEl.textContent = "Temperature: " + data.list[i].main.temp + "°";
        
            // humidity info
            var humidEl = document.createElement("li");
            humidEl.classList = "list-group-item"
            humidEl.textContent = "Humidity: " + data.list[i].main.humidity;
            
        
            forecastCard.appendChild(forecastCardBody);
            forecastCardBody.appendChild(fcTitle)
         
            forecastContainerEl.appendChild(forecastCard);
            forecastCardBody.appendChild(iconImg);
            forecastCardBody.appendChild(tempEl);
            forecastCardBody.appendChild(humidEl);
        } else if (forecastDate === datePlusTwo) {
            var fcTitle = document.createElement("h5");
            fcTitle.classList = "card-title";
            fcTitle.textContent = data.list[i].dt_txt.split(" ")[0];
        
            var forecastCard = document.createElement("div");
            forecastCard.classList = "card border-0";
        
            var forecastCardBody = document.createElement("div");
            forecastCardBody.classList = "card-body list-group-flush"
        
            var tempEl = document.createElement("li");
            tempEl.classList = "list-group-item d-flex"
            tempEl.textContent = "Temperature: " + data.list[i].main.temp + "°";
        
            // humidity info
            var humidEl = document.createElement("li");
            humidEl.classList = "list-group-item"
            humidEl.textContent = "Humidity: " + data.list[i].main.humidity;
            
        
            forecastCard.appendChild(forecastCardBody);
            forecastCardBody.appendChild(fcTitle)
         
            forecastContainerEl.appendChild(forecastCard);
            forecastCardBody.appendChild(iconImg);
            forecastCardBody.appendChild(tempEl);
            forecastCardBody.appendChild(humidEl);
        } else if (forecastDate === datePlusThree) {
            var fcTitle = document.createElement("h5");
            fcTitle.classList = "card-title";
            fcTitle.textContent = data.list[i].dt_txt.split(" ")[0];
        
            var forecastCard = document.createElement("div");
            forecastCard.classList = "card border-0";
        
            var forecastCardBody = document.createElement("div");
            forecastCardBody.classList = "card-body list-group-flush"
        
            var tempEl = document.createElement("li");
            tempEl.classList = "list-group-item d-flex"
            tempEl.textContent = "Temperature: " + data.list[i].main.temp + "°";
        
            // humidity info
            var humidEl = document.createElement("li");
            humidEl.classList = "list-group-item"
            humidEl.textContent = "Humidity: " + data.list[i].main.humidity;
            
        
            forecastCard.appendChild(forecastCardBody);
            forecastCardBody.appendChild(fcTitle)
         
            forecastContainerEl.appendChild(forecastCard);
            forecastCardBody.appendChild(iconImg);
            forecastCardBody.appendChild(tempEl);
            forecastCardBody.appendChild(humidEl);
        } else if (forecastDate === datePlusFour) {
            var fcTitle = document.createElement("h5");
            fcTitle.classList = "card-title";
            fcTitle.textContent = data.list[i].dt_txt.split(" ")[0];
        
            var forecastCard = document.createElement("div");
            forecastCard.classList = "card border-0";
        
            var forecastCardBody = document.createElement("div");
            forecastCardBody.classList = "card-body list-group-flush"

            //temp info 
            var tempEl = document.createElement("li");
            tempEl.classList = "list-group-item d-flex"
            tempEl.textContent = "Temperature: " + data.list[i].main.temp + "°";
        
            // humidity info
            var humidEl = document.createElement("li");
            humidEl.classList = "list-group-item"
            humidEl.textContent = "Humidity: " + data.list[i].main.humidity;
            
        
            forecastCard.appendChild(forecastCardBody);
            forecastCardBody.appendChild(fcTitle)
         
            forecastContainerEl.appendChild(forecastCard);
            forecastCardBody.appendChild(iconImg);
            forecastCardBody.appendChild(tempEl);
            forecastCardBody.appendChild(humidEl);
        }
    };
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    //get value from input element
    var city = cityInputEl.value.trim();

    if(city) {
        getCity(city);
        getForecast(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a valid city name");
    }
};

var forecast = function(event) {

}

userFormEl.addEventListener("submit", formSubmitHandler);