let city = $(".city");
let wind = $(".wind");
let humidity = $(".humidity");
let temp = $(".temp");

let searchArr = [];
let APIKey = "&appid=853047de1547a2ec23c2f40353e444e0";

$(document).ready(function () {
    renderSearchList();

    $("#searchBtn").click(function (event) {
        event.preventDefault();
        //grab search term from input search field
        let searchTerm = $("#cityname").val().trim();
        triggerSearch(searchTerm);
    })

    function triggerSearch(citySearch) {
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
            citySearch + APIKey;
    }
