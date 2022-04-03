// creating variables to capture html elements
var userInput = $("#userInput");
var srchBtn = $("#srchBtn");
var APIKey = "6d7bc9f4afbf01277e0e2187714f7bc1";
var display = $("#display");
var searchList = document.querySelector("#search-list");
var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
var uv = $("#uv");
var para = $("#para");
var city;
var cityList = [];

// function to fetch today's weather for a city
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

            var lat = data.coord.lat;
            var lon = data.coord.lon;

            uvURL = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + lat + "&lon=" + lon +"&exclude=minutely,hourly,alerts" +"&appid=" + APIKey + "&units=imperial";

            fetch(uvURL)
            .then(function(response) {
                return response.json();
            })
            .then(function (data2) {

                para.text(" " + data2.current.uvi)
                display.append(uv);
                var color = data2.current.uvi;
                
                if (0 <= color <3){
                    document.getElementById("para").style.backgroundColor = "green";
                }
                else if(3 <= color <6){
                    document.getElementById("para").style.backgroundColor = "yellow";
                }
                else if (6 <= color <8){
                    document.getElementById("para").style.backgroundColor = "orange";
                }
                else if (8 <= color < 11){
                    $("#para").css("background-color", "orange");
                }
                else if (11 <= color){
                    $("#para").css("background-color", "orange");
                }
            })

        })
     
}


// Function to get 5 day forecast for a city
function get5Forecast(city) {
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

    fetch(forecastURL)
        .then(function(response2) {
            return response2.json();
        })
        .then(function(response2) {

            var fDate1 = document.getElementById("fDate1");
            var fDate2 = document.getElementById("fDate2");
            var fDate3 = document.getElementById("fDate3");
            var fDate4 = document.getElementById("fDate4");
            var fDate5 = document.getElementById("fDate5");
            fDate1.textContent = (today.getMonth()+1)+'/'+(today.getDate()+1)+'/'+today.getFullYear();
            fDate2.textContent = (today.getMonth()+1)+'/'+(today.getDate()+2)+'/'+today.getFullYear();
            fDate3.textContent = (today.getMonth()+1)+'/'+(today.getDate()+3)+'/'+today.getFullYear();
            fDate4.textContent = (today.getMonth()+1)+'/'+(today.getDate()+4)+'/'+today.getFullYear();
            fDate5.textContent = (today.getMonth()+1)+'/'+(today.getDate()+5)+'/'+today.getFullYear();

            var ftemp1 = document.getElementById("fTemp1");
            var ftemp2 = document.getElementById("fTemp2");
            var ftemp3 = document.getElementById("fTemp3");
            var ftemp4 = document.getElementById("fTemp4");
            var ftemp5 = document.getElementById("fTemp5");
            ftemp1.textContent = "Temp: " + Math.round((response2.list[5].main.temp-273.15)*9/5+32) + " °F";
            ftemp2.textContent = "Temp: " + Math.round((response2.list[13].main.temp-273.15)*9/5+32) + " °F";
            ftemp3.textContent = "Temp: " + Math.round((response2.list[21].main.temp-273.15)*9/5+32) + " °F";
            ftemp4.textContent = "Temp: " + Math.round((response2.list[29].main.temp-273.15)*9/5+32) + " °F";
            ftemp5.textContent = "Temp: " + Math.round((response2.list[37].main.temp-273.15)*9/5+32) + " °F";
            
            var fWind1 = document.getElementById("fWind1");
            var fWind2 = document.getElementById("fWind2");
            var fWind3 = document.getElementById("fWind3");
            var fWind4 = document.getElementById("fWind4");
            var fWind5 = document.getElementById("fWind5");
            fWind1.textContent = "Wind: " + response2.list[5].wind.speed + " MPH";
            fWind2.textContent = "Wind: " + response2.list[13].wind.speed + " MPH";
            fWind3.textContent = "Wind: " + response2.list[21].wind.speed + " MPH";
            fWind4.textContent = "Wind: " + response2.list[29].wind.speed + " MPH";
            fWind5.textContent = "Wind: " + response2.list[37].wind.speed + " MPH";

            var humid1 = document.getElementById("fHumid1");
            var humid2 = document.getElementById("fHumid2");
            var humid3 = document.getElementById("fHumid3");
            var humid4 = document.getElementById("fHumid4");
            var humid5 = document.getElementById("fHumid5");
            humid1.textContent = "Humidity: " + response2.list[5].main.humidity + " %";
            humid2.textContent = "Humidity: " + response2.list[13].main.humidity + " %";
            humid3.textContent = "Humidity: " + response2.list[21].main.humidity + " %";
            humid4.textContent = "Humidity: " + response2.list[29].main.humidity + " %";
            humid5.textContent = "Humidity: " + response2.list[37].main.humidity + " %";
            
            var iCon1 = response2.list[5].weather[0].icon
            var iCon2 = response2.list[13].weather[0].icon;
            var iCon3 = response2.list[21].weather[0].icon;
            var iCon4 = response2.list[29].weather[0].icon;
            var iCon5 = response2.list[37].weather[0].icon;
            $("#fImage1").html("<img src='http://openweathermap.org/img/wn/" + iCon1  + "@2x.png' alt='Icon depicting current weather.'>");
            $("#fImage2").html("<img src='http://openweathermap.org/img/wn/" + iCon2  + "@2x.png' alt='Icon depicting current weather.'>");
            $("#fImage3").html("<img src='http://openweathermap.org/img/wn/" + iCon3  + "@2x.png' alt='Icon depicting current weather.'>");
            $("#fImage4").html("<img src='http://openweathermap.org/img/wn/" + iCon4  + "@2x.png' alt='Icon depicting current weather.'>");
            $("#fImage5").html("<img src='http://openweathermap.org/img/wn/" + iCon5  + "@2x.png' alt='Icon depicting current weather.'>");
            
        });
}

// Function that fetches weather information from past searches
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
        event.preventDefault();
        var element= event.target;
        if(element.matches("button") === true){
            city = element.textContent;
        
 
            getWeather(city);
            get5Forecast(city);
            
        }

    });
}

// Function to save searched cities and display them
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

    cityList.push(city);
    localStorage.setItem("City Name", JSON.stringify(cityList));
    getCities();
    getWeather(city);
    get5Forecast(city);

});

