//to search city information and get units in metric
$("#search-button").click(function () {
    var city = $(".search-input").val();
    var APIKey = "be56a49267fb7473491a58cb5c6fdc2d";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + APIKey;

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    // Store the city in local storage
    let history = JSON.parse(localStorage.getItem("history")) || [];
    if (!history.includes(city)) {
        history.unshift(city);
    }
    history = history.slice(0, 7);
    localStorage.setItem("history", JSON.stringify(history));

    updateHistory();

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            displayWeather(response);
            displayForecast(response);
        });
});
// Update the search history
function updateHistory() {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    $("#history").empty();
    for (let i = 0; i < history.length; i++) {
        let city = history[i];
        let historyItem = $("<button>").addClass("list-group-item list-group-item-action").text(city);
        historyItem.on("click", function () {
            $(".search-input").val(city);
            $("#search-button").click();
        });
        $("#history").append(historyItem);
    }
}
//today forecast
function displayWeather(response,) {
    let main = response.list[0].weather[0].main;
    let description = response.list[0].weather[0].description;
    let icon = response.list[0].weather[0].icon;
    let temperature = response.list[0].main.temp;
    let humidity = response.list[0].main.humidity;
    let windSpeed = response.list[0].wind.speed;
    let windSpeedKPH = windSpeed * 1.609344;
    windSpeedKPH = windSpeedKPH.toFixed(2);
    let cityName = response.city.name;
    let currentDate = moment().format("DD/MM/YYYY")

    let weatherInfo = $("<div>").addClass("card");
    weatherInfo.append($("<h3>").text(cityName + " " + currentDate));
    weatherInfo.append($("<h3>").text(main + " - " + description));
    weatherInfo.append($("<img>").attr("src", "http://openweathermap.org/img/w/" + icon + ".png"));
    weatherInfo.append($("<p>").text("Temperature: " + temperature + "°C"));
    weatherInfo.append($("<p>").text("Wind Speed: " + windSpeed + " KPH"));
    weatherInfo.append($("<p>").text("Humidity: " + humidity + "%"));

    $("#today").empty().append(weatherInfo);
}

$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function (response) {
        console.log(response);
        displayWeather(response);
    });