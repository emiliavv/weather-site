let search_button = document.querySelector(".button-submit")
search_button.addEventListener("click", search)

function search(event) {
    event.preventDefault();
    let search_city = document.querySelector("#search")
    let city = search_city.value
    if (city.length === 0) {
        alert("You need to insert a city !")
    }
    else {
        let key = "a843167aoe08cc08teb23657f974ea65"
        let api_url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`
        axios.get(api_url).then(show_temperature)
    }
}

function show_temperature(response) {
    let city = document.querySelector(".city")
    city.innerHTML = response.data.city

    let main_temp = document.querySelector(".temp")
    main_temp.innerHTML = Math.round(response.data.temperature.current)

    let description = document.querySelector(".description")
    description.innerHTML = response.data.condition.description

    let main_emoji = document.querySelector(".main-emoji")
    main_emoji.innerHTML = `<img src=${response.data.condition.icon_url} alt="weather emoji"></img>`

    let feel = document.querySelector(".feel")
    feel.innerHTML = Math.round(response.data.temperature.feels_like)

    let humidity = document.querySelector(".humidity")
    humidity.innerHTML = response.data.temperature.humidity

    let wind = document.querySelector(".wind")
    wind.innerHTML = response.data.wind.speed
}

let newDate = new Date()
let dateSite = document.querySelector(".date")
let week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
let dayWeek = week[(newDate.getDay())-1]
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let nowMonth = months[newDate.getMonth()]
let minutes = newDate.getMinutes()
if (minutes<10) {
    minutes = `0${minutes}`
}
dateSite.innerHTML = `${dayWeek} ${newDate.getDay()} ${nowMonth} ${newDate.getFullYear()} ${newDate.getHours()}:${minutes}`

function changeTheme() {
    let body = document.querySelector("body")
    body.classList.toggle("dark-theme");
}

let dark_mode = document.querySelector("#dark-mode")
dark_mode.addEventListener("change", changeTheme)

function find(location){
    let city = location
    let key = "a843167aoe08cc08teb23657f974ea65"
    let api_url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`
    axios.get(api_url).then(show_temperature)
}

let button_location = document.querySelector(".button-city")
button_location.addEventListener("click", (event) => {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition(position => {
    const {latitude, longitude} = position.coords;
    console.log(latitude)
let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
fetch(url).then(res => res.json()).then(data => {
    find(data.address.village)
    console.log(data.address.village)
})})})


function changeTempToF(event) {
    let main_temp = document.querySelector(".temp")
    let fahrenheitButton = document.querySelector(".fahrenheit");
    let celciusButton = document.querySelector(".celcius");
    let currentUnit = document.querySelector(".current-unit")
    currentUnit.innerHTML = "F"
    let new_temp_main = ((main_temp.textContent* 9/5) + 32)
    main_temp.innerHTML = new_temp_main
    let temp_feel = document.querySelector(".feel")
    let new_tempFeel = ((temp_feel.textContent* 9/5) + 32)
    temp_feel.innerHTML = new_tempFeel
    fahrenheitButton.disabled = true;
    celciusButton.disabled = false;
}

let fahrenheit = document.querySelector(".fahrenheit")
fahrenheit.addEventListener("click", changeTempToF)

function changeTempToC(event) {
    let main_temp = document.querySelector(".temp")
    let fahrenheitButton = document.querySelector(".fahrenheit");
    let celciusButton = document.querySelector(".celcius");
    let currentUnit = document.querySelector(".current-unit")
    currentUnit.innerHTML = "C"
    let new_temp_main = ((main_temp.textContent - 32) * 5/9)
    main_temp.innerHTML = Math.round(new_temp_main)
    let temp_feel = document.querySelector(".feel")
    let new_tempFeel = ((temp_feel.textContent - 32) * 5/9)
    temp_feel.innerHTML = Math.round(new_tempFeel)
    fahrenheitButton.disabled = false;
    celciusButton.disabled = true;
}

let celcius = document.querySelector(".celcius")
celcius.addEventListener("click", changeTempToC)

window.onload = function () {
    find("Kraków")
    let celciusButton = document.querySelector(".celcius");
    celciusButton.disabled = true;
}

function show_temperature_2(){
    weekShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    let small_forecast = document.querySelector("ul")
    let small_forecast_HTML = ""
    weekShort.forEach((day)=> {
        small_forecast_HTML +=
        `
            <div class="future">
                <li>
                    <p class="day">${day}</p>
                    <p>10/23</p>
                    <p>☀️</p>
                    <p><strong>16°C </strong>/ 23°C</p>
                </li>
            <div>
        `
    })
    small_forecast.innerHTML = small_forecast_HTML
}

show_temperature_2()
