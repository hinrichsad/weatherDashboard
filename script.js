$(document).ready(function () {

    $("#search").on("click", function () {
        var weatherApi = "2a67ff046d002d779dbfbbaea1bb9fcb";
        var myInput = $("#myInput").val();
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + myInput + "&appid=" + weatherApi;

        var searchArray = [];
        searchArray.push(myInput);
        localStorage.setItem("search", JSON.stringify(searchArray));
        var search = JSON.parse(localStorage.getItem("search"))

        console.log(search);

        clearPrev();
        renderResults();

        function clearPrev(){
            $("#myInput").empty();
            $("#currentWeather").empty();
        }

        function renderResults(){
            $.ajax({
                method: "GET",
                url: queryURL,
            }).then(function (response) {
                console.log(myInput);
                console.log(response);
    
                var cityName = response.city.name;
                var currentTempKel = response.list[0].main.temp;
                var currentFeelKel = response.list[0].main.feels_like;
                var currentMain = response.list[0].weather[0].main;
                var currentDisc = response.list[0].weather[0].description;

                var currentTempF = Math.round(((currentTempKel-273.15) * 1.8) + 32);
                var currentFeelF = Math.round(((currentFeelKel-273.15) * 1.8) + 32);


                
                currentContainer = $("<div>")
                var h1 = $("<h1>").text(cityName);
                var cTempF = $("<div>").text("Current Temp: " + currentTempF);
                var cFeelF = $("<div>").text("Real Feel: " + currentFeelF);
                var cMain = $("<div>").text("Weather: " + currentMain);
                var cDisc = $("<div>").text("Discription: " + currentDisc);

                currentContainer.attr("class", "currentWeather");
                currentContainer.append(h1, cTempF, cFeelF, cMain, cDisc)

                $("#currentWeather").append(currentContainer);

                for(i = 0; i > searchArray.length; i++){
                    var prevSearches = $("<div>").text(searchArray[i]);

                    prevSearches.attr("class", "container")
                    $("#searchHistory").append(prevSearches);
                }
   
    
    
            });
        }
    });
});