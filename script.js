$(document).foundation();
const formSubmitBtn = $("#form-submit");
let submit = document.getElementById("form-submit");
let input = document.getElementById("cityName");
const userInput = JSON.parse(localStorage.getItem("userInput"));
let ul = document.querySelector("ul")


let searchArr = [];
    
formSubmitBtn.click( () => {
    saveUserForm();
  })
  
function saveUserForm(e) {
    // e.preventDefault();
    if ($("#cityName").val() == "") {
        confirm("Error: Please make sure to enter a zipcode!");
    } 
    else if ($("#cityName").val() == "") {
        const userInput = {
            cityName: $("#citySelect").val()
        };
        localStorage.setItem('userInput', JSON.stringify(userInput));
    }
    else {
        const userInput = {
            cityName: $("#cityName").val()
        };
        localStorage.setItem('userInput', JSON.stringify(userInput));
    }
};
  
  const zipCode = JSON.parse(localStorage.getItem("userInput"))

function renderCurrentWeather() {
    let wRequest = "https://api.openweathermap.org/data/2.5/forecast?q=" + String(userInput.cityName) + ",US&units=imperial&appid=c571dcc28202f5c8d2b8377fd87551f0";
    let wLocal = document.getElementById("current-forecast")
    let img = document.getElementById("img")

    // wLocal.innerHTML = "The current weather in " + userInput.cityName;

    fetch(wRequest)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // wLocal.append(" is " + data.list[0].main.temp.toFixed() + " degrees F.");
        wLocal.children[0].innerHTML = data.list[0].dt_txt;
        img.src = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png"
        wLocal.children[1].innerHTML = '<img src="' + img.src + '"/>'
        wLocal.children[2].innerHTML = "Temperature: " + data.list[0].main.temp.toFixed()
        wLocal.children[3].innerHTML = "Humidity: " + data.list[0].main.humidity


      })
  }

  renderCurrentWeather();

// five day forecast 
function renderForecast() {
    let day1 = document.getElementById("day1")
    let day2 = document.getElementById("day2")
    let day3 = document.getElementById("day3")
    let day4 = document.getElementById("day4")
    let day5 = document.getElementById("day5")
    let img1 = document.getElementById("img1")
    let img2 = document.getElementById("img2")
    let img3 = document.getElementById("img3")
    let img4 = document.getElementById("img4")
    let img5 = document.getElementById("img5")

    // let wRequest = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=c571dcc28202f5c8d2b8377fd87551f0";
    let wRequest = "https://api.openweathermap.org/data/2.5/forecast?q=" + String(userInput.cityName) + ",US&units=imperial&appid=c571dcc28202f5c8d2b8377fd87551f0";

    fetch(wRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data)
        day1.children[0].innerHTML = data.list[0].dt_txt;
        day2.children[0].innerHTML = data.list[8].dt_txt;
        day3.children[0].innerHTML = data.list[16].dt_txt;
        day4.children[0].innerHTML = data.list[24].dt_txt;
        day5.children[0].innerHTML = data.list[32].dt_txt;

        img1.src = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png"
        day1.children[1].innerHTML = '<img src="' + img1.src + '"/>'
        img2.src = "https://openweathermap.org/img/w/" + data.list[8].weather[0].icon + ".png"
        day2.children[1].innerHTML = '<img src="' + img2.src + '"/>'
        img3.src = "https://openweathermap.org/img/w/" + data.list[16].weather[0].icon + ".png"
        day3.children[1].innerHTML = '<img src="' + img3.src + '"/>'
        img4.src = "https://openweathermap.org/img/w/" + data.list[24].weather[0].icon + ".png"
        day4.children[1].innerHTML = '<img src="' + img4.src + '"/>'
        img5.src = "https://openweathermap.org/img/w/" + data.list[32].weather[0].icon + ".png"
        day5.children[1].innerHTML = '<img src="' + img5.src + '"/>'

        day1.children[2].innerHTML = "Temperature: " + data.list[0].main.temp.toFixed()
        day2.children[2].innerHTML = "Temperature: " + data.list[8].main.temp.toFixed()
        day3.children[2].innerHTML = "Temperature: " + data.list[16].main.temp.toFixed()
        day4.children[2].innerHTML = "Temperature: " + data.list[24].main.temp.toFixed()
        day5.children[2].innerHTML = "Temperature: " + data.list[32].main.temp.toFixed()

        day1.children[3].innerHTML = "Humidity: " + data.list[0].main.humidity
        day2.children[3].innerHTML = "Humidity: " + data.list[8].main.humidity
        day3.children[3].innerHTML = "Humidity: " + data.list[16].main.humidity
        day4.children[3].innerHTML = "Humidity: " + data.list[24].main.humidity
        day5.children[3].innerHTML = "Humidity: " + data.list[32].main.humidity
    })
}

renderForecast();

const searchList = (text) => {
    const li = document.createElement("li")
    li.textContent = text
    ul.appendChild(li)
  }

  submit.addEventListener("click", function (e) {
    e.preventDefault()
    const calls = document.getElementById("cityName").value
    let requestURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + calls + ",US&units=imperial&appid=59948208350e6af8ced51673faaaf707"
    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
    if (input.value == "") {
      searchList("")
    } else {
    searchList(input.value + " - " + data.name)
    input.value=""
    }
  })
  });