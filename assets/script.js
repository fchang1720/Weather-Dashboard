// creating variables to capture html elements
var userInput = $("#userInput");
var srchBtn = $("#srchBtn");
var APIKey = "6d7bc9f4afbf01277e0e2187714f7bc1";
var fiveAPIKey = "3a59cab114cc2eada240a25fba948ae5";
var display = $("#display");
var city;
var cityList = []

function getURL(city) {

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var cityDisplay = $("#city");
            var temp = $("#temp");
            var wind = $("#wind");
            var humidity = $("#humidity");

            cityDisplay.text(data.name);
            display.append(cityDisplay);

            temp.text("Temp: " + Math.round((data.main.temp-273.15)*9/5+32) + " °F");
            display.append(temp);

            wind.text("Wind: " + data.wind.speed + " MPH");
            display.append(wind);
            
            humidity.text("Humidity: " + data.main.humidity+ "%");
            display.append(humidity);

        })
}

function get5Forecast(city) {
    var forecastURL = "api.openweathermap.org/data/2.5/forecast?lat=44.98&lon=-93.2638&appid=" + APIKey;
    console.log(forecastURL)
    fetch(forecastURL)
        .then(function(response2) {
            return response2.json();
        })
        .then(function(data2) {
            console.log(data2);
            
        })
}

// event listener for search button
srchBtn.on("click", function (event) {
    event.preventDefault();
    var city = userInput.val();
    // console.log(city);

    cityList.push(city);
    localStorage.setItem("City Name", JSON.stringify(cityList));
    getURL(city);
    get5Forecast(city);

});

