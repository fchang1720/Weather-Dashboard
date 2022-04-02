// creating variables to capture html elements
var userInput = $("#userInput");
var srchBtn = $("#srchBtn");
var APIKey = "6d7bc9f4afbf01277e0e2187714f7bc1";

var display = $("#display");
var city;
var cityList = []

function getURL(city) {

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    // console.log(queryURL);
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

            temp.text("Temp: " + data.main.temp + " K");
            display.append(temp);

            wind.text("Wind: " + data.wind.speed + " MPH");
            display.append(wind);
            
            humidity.text("Humidity: " + data.main.humidity+ "%");
            display.append(humidity);

            // var articleEl = $("<article class='p-10'>");
            // var titleEl = $("<h2>");
            // var pEl = $("<p>");
            // var descriptionEl = $("<p>");
            // var moreBtn = $("<button>");

            // titleEl.text(data.results[i].title);
            // articleEl.append(titleEl);

            // descriptionEl.text(data.results[i].description[0]);
            // articleEl.append(descriptionEl);

            // mainEl.append(articleEl);
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

});

