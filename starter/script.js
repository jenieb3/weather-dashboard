//console.log('hello')
var APIkey = '379b0ba619900b8104142245c7037879';
var submitBtn = document.getElementById('search-button');
var searchInput = document.getElementById('search-input');

submitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var city = searchInput.value;
    var currWeatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIkey;

    $.ajax({
        url: currWeatherAPI,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        // code to display the current weather forecast for the provided city
    });
});
