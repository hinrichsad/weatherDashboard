

$(document).ready(function () {

    //creating an array of search history and saving to local storage 
    var searchArray = [];
    var search = JSON.parse(localStorage.getItem("search"))
    localStorage.setItem("search", JSON.stringify(searchArray));
    searchArray = search;

    $("#search").on("click", function () {
        var weatherApi = "2a67ff046d002d779dbfbbaea1bb9fcb";
        var myInput = $("#myInput").val();
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + myInput + "&appid=" + weatherApi;

        searchArray.push(myInput);

        console.log(search);

        clearPrev();
        renderResults();

        //clear function to change results each time it is clicked
        function clearPrev(){
            $("#myInput").empty();
            $("#currentWeather").empty();
            $("#searchHistory").empty();
            $("#myInput").val("");
            $("#upcomingWeather").empty();
        }

        function renderResults(){
            $.ajax({
                method: "GET",
                url: queryURL,
            }).then(function (response) {
                console.log(myInput);
                console.log(response);

                // grabbing info from db
                var cityName = response.city.name;
                var currentTempKel = response.list[0].main.temp;
                var currentFeelKel = response.list[0].main.feels_like;
                var currentMain = response.list[0].weather[0].main;
                var currentDisc = response.list[0].weather[0].description;

                //converting kelvin into F
                var currentTempF = Math.round(((currentTempKel-273.15) * 1.8) + 32);
                var currentFeelF = Math.round(((currentFeelKel-273.15) * 1.8) + 32);

                //getting and formatting date
                var d = new Date();
                var day = d.getDate();
                var month = d.getMonth()+1;
                var year = d.getFullYear();

                date = month + "/" + day + "/" + year

                //creating the 'current' content
                currentContainer = $("<div>");
                icon = $("<img>");
                span = $("<span>")

                var h1 = $("<h1>").text(cityName + " - " + date);
                var cTempF = $("<div>").text("Current Temp: " + currentTempF);
                var cFeelF = $("<div>").text("Real Feel: " + currentFeelF);
                var cMain = $("<div>").text("Weather: " + currentMain);
                var cDisc = $("<div>").text("Discription: " + currentDisc);

                //assigning icons based on conditions
                if (currentMain === "Clouds"){
                    icon.attr("src", "./cloudy.png");
                } else if(currentMain === "Snow"){
                    icon.attr("src", "./snow.png")
                } else if(currentMain === "Rain"){
                    icon.attr("src", "./rain.png")
                } else{
                    icon.attr("src", "./sunny.png")
                }

                icon.attr("class", "currentIcon");

                console.log(icon)

                //appending info to the container and then to the dom
                currentContainer.attr("class", "currentWeather");
                currentContainer.append(h1, cTempF, cFeelF, cMain, cDisc)

                $("#currentWeather").append(currentContainer, icon);   
                $("#currentWeather").attr("class", "currentWeather")
                
                //forloop to show previously searched cities
                for(i = 0; i < search.length; i++){
                    var prevSearches = $("<div>").text(search[i]);
        
                    prevSearches.attr("class", "container")
                    $("#searchHistory").append(prevSearches);
                }



                //Upcoming cards start here -------------------------

                for(var j = 1; j < 5; j++){
                var cityName = response.city.name;
                var oneTempKel = response.list[j].main.temp;
                var oneFeelKel = response.list[j].main.feels_like;
                var oneMain = response.list[j].weather[0].main;
                var oneDisc = response.list[j].weather[0].description;

                //converting kelvin into F
                var oneTempF = Math.round(((oneTempKel-273.15) * 1.8) + 32);
                var oneFeelF = Math.round(((oneFeelKel-273.15) * 1.8) + 32);

                var newD = new Date();
                var newDay = newD.getDate() +j;
                var month = newD.getMonth()+1;
                var year = newD.getFullYear();

                    if(newDay > 31){
                        newDay = newDay-31;
                        month ++;
                        if(month > 12){
                            month = month-12
                        }
                    }


                newDate = month + "/" + newDay + "/" + year
                

                Container = $("<div>");

                var h1 = $("<h6>").text(cityName + " - " + newDate);
                var oTempF = $("<div>").text("Current Temp: " + oneTempF);
                var oFeelF = $("<div>").text("Real Feel: " + oneFeelF);
                var oMain = $("<div>").text("Weather: " + oneMain);
                var oDisc = $("<div>").text("Discription: " + oneDisc);

                Container.attr("class", "upcomingCards");
                Container.append(h1, oTempF, oFeelF, oMain, oDisc)

                $("#upcomingWeather").append(Container); 
                }  
            });
        }
    });
});