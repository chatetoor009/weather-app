const apiKey = "a9af072ce184378ebc19d3528d5cbc79";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherImg = document.querySelector(".weather-icon");
const themeSwitcher = document.getElementById("themeSwitcher");
const modeText = document.getElementById("modeText");


const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    modeText.innerText = "Dark Mode";
    themeSwitcher.checked = true;
} else {
    document.body.classList.add("light-mode");
}

themeSwitcher.addEventListener("change", () => {
    if (themeSwitcher.checked) {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        modeText.innerText = "Dark Mode";
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
        modeText.innerText = "Light Mode";
        localStorage.setItem("theme", "light");
    }
});


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        var data = await response.json();

        // console.log(data);
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
    
        if(data.weather[0].main== "Clouds"){
            weatherImg.src = "images/clouds.png";
        }
        else if(data.weather[0].main== "Clear"){
            weatherImg.src = "images/clear.png";
        }
        else if(data.weather[0].main== "Rain"){
            weatherImg.src = "images/rain.png";
        }
        else if(data.weather[0].main== "Drizzle"){
            weatherImg.src = "images/drizzle.png";
        }
        else if(data.weather[0].main== "Mist"){
            weatherImg.src = "images/mist.png";
        }
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
   
} 
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
}) 