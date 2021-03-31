$(document).foundation();
const formSubmitBtn = $("#form-submit");
const userInput = JSON.parse(localStorage.getItem("userInput"));

let searchArr = [];
    
formSubmitBtn.click( () => {
    saveUserForm();
  })
  
function saveUserForm(e) {
    if (($("#cityName").val() == "") && ($("#citySelect").val() == "")) {
        confirm("Error: Please make sure to choose a city!");
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

function renderWeather() {
    let wRequest = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput.cityName + "&appid=c571dcc28202f5c8d2b8377fd87551f0";
    let wLocal = document.getElementById("weather-today")
    let t = document.getElementById("temperature")
    let pic = document.getElementById("weather-pic")
    let f = document.getElementById("forecast")
    let img = document.createElement("img")
    
    fetch(wRequest)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log (data)
        wLocal.innerHTML = "Current Weather in " + data.name
        img.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
        // pic.append(img)
        t.innerHTML = "Temperature: " + data.main.temp.toFixed() + "&degF"
        t.append(img)
      })
  }

  $("h3").append(userInput.cityName);
  renderWeather();
