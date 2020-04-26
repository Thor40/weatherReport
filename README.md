# weatherReport
#### Nicholas Kosik

## Project Criteria
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
```
I was unable to make the following features work:

```
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

### This project used the following:
#### - JavaSCript
#### - Bootstrap
#### - HTML
#### - CSS was added for future changes but not implemented
#### - jQuery was added for future changes but not implemented
### The API data was retrieved from https://openweathermap.org/

### Following Bugs:
```
WHEN I click on saved city button
THEN I am presented with current and future conditions for that city, but is displayed underneath previously displayed city data
WHEN I click on another saved city button
THEN I am presented with an error, pushing entire saved array of city names into the API fetch
```
#### I have been unable to fix this last feature bug.