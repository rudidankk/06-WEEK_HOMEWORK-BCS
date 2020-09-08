let userCity = "cincinnati";
const cityToStore = userCity;

function weatherForecast() {

    function getUserCity() {
        const searchButtonEl = document.getElementById('search');
        const cityInputEl = document.getElementById('city');
        searchButtonEl.addEventListener('click', function () {
            event.preventDefault();
            userCity = document.getElementById('city').value;

            console.log('You searched for this city: ', userCity);
            storeInLocalStorage(userCity);
            searchForCityWeather(userCity);
            searchForForecast(userCity);
            searchForCityCoord(userCity);
            displayLocalStorage(userCity);
        });

    }
    getUserCity();

    function storeInLocalStorage(userCity) {
    
        console.log("Stored: "+localStorage.getItem("cities"));
        console.log("Selection: "+userCity);
        var cities= new Array();
        if (window.localStorage.getItem("cities") != null)
        {
            var cities= JSON.parse(localStorage.getItem("cities"));
        }
        if(userCity!= null && cities.indexOf(userCity) === -1)
        {
            
            cities.push(userCity);
            localStorage.setItem("cities",JSON.stringify(cities));
            console.log("Stored: "+cities);
        }
    
    }
    storeInLocalStorage();

    function displayLocalStorage() {

        console.log("displaying local storage");
        var history = JSON.parse(localStorage.getItem("cities"));;

        var tbody = $('#stored').children('tbody');
        var table = tbody.length ? tbody : $('#stored');
        table.empty();

        jQuery.each( history, function( i, item ) {

            console.log(item);
            table.append("<tr><td><a href='#'>"+item+"</a></td></tr>");
            //"+item+"
        });

        
    };

    function searchForCityWeather(userCity) {
        var apiKey = "2eda1c8b380df8646a68cedf93a6d3b5";
        var cityName = userCity;
        var units = "imperial";
    

        var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + units + "&appid=" + apiKey,
        "method": "GET",
        } 
        $.ajax(settings).done(function (response) {
                console.log(response.name)
                document.getElementById("name").innerHTML = response.name;
                document.getElementById("temp").innerHTML = "Temperature: " + response.main.temp + " °F";
                document.getElementById("humidity").innerHTML = "Humidity: " + response.main.humidity + "%";
                document.getElementById("wind").innerHTML = "Wind Speed: " + response.wind.speed + " mph";
            })
    };


    function searchForCityCoord(userCity) {

        var apiKey = "2eda1c8b380df8646a68cedf93a6d3b5";
        var cityName = userCity;
        var units = "imperial";

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=" + units + "&appid=" + apiKey,
            "method": "GET",
        } 
        var cords= $.ajax(settings).then(function (response) {
                console.log(response)
                document.getElementById("lat").innerHTML = "Latitude: " + response.city.coord.lat;
                document.getElementById("lon").innerHTML = "Longitude: " + response.city.coord.lon;
                
                var settings2 = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + "&appid=" + apiKey,
                    "method": "GET",
                } 

                return $.ajax(settings2);

        });
        cords.done(function (response2)
        {
            console.log(response2)
            document.getElementById("uv").innerHTML = "UV: " + response2.value;

        });
    };




    function searchForForecast(userCity) {

        var apiKey = "2eda1c8b380df8646a68cedf93a6d3b5";
        var cityName = userCity;
        var units = "imperial";
    

        var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=" + units + "&appid=" + apiKey,
        "method": "GET",
        } 
        $.ajax(settings).done(function (response) {
                console.log(response.list);
                document.getElementById("date0").innerHTML = "Date: " + response.list[0].dt_txt;
                document.getElementById("temp0").innerHTML = "Temperature: " + response.list[0].main.temp + " °F";
                document.getElementById("humidity0").innerHTML = "Humidity: " + response.list[0].main.humidity + "%";
                

                document.getElementById("date1").innerHTML = "Date: " + response.list[10].dt_txt;
                document.getElementById("temp1").innerHTML = "Temperature: " + response.list[10].main.temp + " °F";
                document.getElementById("humidity1").innerHTML = "Humidity: " + response.list[10].main.humidity + "%";

                document.getElementById("temp2").innerHTML = "Temperature: " + response.list[18].main.temp + " °F";
                document.getElementById("date2").innerHTML = "Date: " + response.list[18].dt_txt;
                document.getElementById("humidity2").innerHTML = "Humidity: " + response.list[18].main.humidity + "%";

                document.getElementById("date3").innerHTML = "Date: " + response.list[26].dt_txt;
                document.getElementById("temp3").innerHTML = "Temperature: " + response.list[26].main.temp + " °F";
                document.getElementById("humidity3").innerHTML = "Humidity: " + response.list[26].main.humidity + "%";

                document.getElementById("temp4").innerHTML = "Temperature: " + response.list[34].main.temp + " °F";
                document.getElementById("date4").innerHTML = "Date: " + response.list[34].dt_txt;
                document.getElementById("humidity4").innerHTML = "Humidity: " + response.list[34].main.humidity + "%";
        })
    };
};



weatherForecast()