// creating variables to capture html elements
var userInput = $("#userInput");
var srchBtn = $("#srchBtn");
var APIKey = "6d7bc9f4afbf01277e0e2187714f7bc1";
var fiveAPIKey = "3a59cab114cc2eada240a25fba948ae5";
var display = $("#display");
var forecast = document.querySelector("#forecast");
var searchList = document.querySelector("#search-list");
var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

var city;
var cityList = [];
var castList = [];

function getWeather(city) {

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            var cityDisplay = $("#city");
            var temp = $("#temp");
            var wind = $("#wind");
            var humidity = $("#humidity");

            cityDisplay.text(data.name +" "+ date);
            display.append(cityDisplay);

            temp.text("Temp: " + Math.round((data.main.temp-273.15)*9/5+32) + " °F");
            display.append(temp);

            wind.text("Wind: " + data.wind.speed + " MPH");
            display.append(wind);
            
            humidity.text("Humidity: " + data.main.humidity+ "%");
            display.append(humidity);

        })
     
}
// function getUV(city) {
//     var uURL = "https://api.openweathermap.org/data/2.5/onecall?q=" + city + "&appid=" + APIKey;
//     console.log(uURL);
// }

function get5Forecast(city) {
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    console.log(forecastURL)
    fetch(forecastURL)
        .then(function(response2) {
            return response2.json();
        })
        .then(function(response2) {
            console.log(response2.list[0]);
            forecast.innerHTML = "";
            for( let i=0; i<10; i+=2){
            var castContent = castList[i];
                
                var title = document.createElement("div");
                var body = document.createElement("div");
                var fTemp = document.createElement("h6");
                fTemp.textContent = response2.list[i].main.temp;

                // fTemp.text("Temp: " + data.list[0].main.temp);
                // console.log(fTemp);
            //     foreC.appendTo(fTemp);

            //     fore.appendTo(foreC);
               
            //     forecast.append(fore);
            //     console.log(forecast);

            }
            
        
        });
}

function renderCities(){
    searchList.innerHTML = "";

    for (var j = 0; j < cityList.length; j++) {
        var cityContent = cityList[j];

        var li = document.createElement("button");
        li.textContent = cityContent;
        li.style.width = '100%';
        li.style.marginBottom = '5px';
        searchList.appendChild(li);
    }
    searchList.addEventListener("click", function(event){
        var element= event.target;
        if(element.matches("button") === true){
            city = element.textContent;
            getURL(city);
        }

    });
}

function getCities(){
    var cities = JSON.parse(localStorage.getItem("City Name"));
  
    if (cities !== null) {
        cityList = cities;
      }
    renderCities();
}
// event listener for search button
srchBtn.on("click", function (event) {
    event.preventDefault();
    var city = userInput.val();
    // console.log(city);

    cityList.push(city);
    localStorage.setItem("City Name", JSON.stringify(cityList));
    getCities();
    // getUV(city);
    getWeather(city);
    get5Forecast(city);

});

