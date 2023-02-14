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
    history = history.slice(0, 5);
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