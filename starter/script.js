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
