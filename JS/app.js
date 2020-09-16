let selectCityLat, selectCityLng, date, infoWeather, currentWeatherData;
let dayFiveWeatherData = [];
let dayChangeData = [];
let WeatherIconPath;
let selectCity = Cookies.get('city');
let infoToday;
let optionList;
let current;
let day1All;
let day2All;
let day3All;
let day4All;
let day5All;
let today;
/* Basic Api Class set */


function onLoading() {
    document.getElementById('city').innerHTML = "loading..."
}

function onFailure() {
    document.getElementById('city').innerHTML = "No Result!"
}


function LoadingCitys() {

    console.log(Cookies.get("citylist"));
    if (Cookies.get("citylist") !== undefined) {
        optionList = JSON.parse(Cookies.get("citylist"));
    } else {
        optionList = cityList;
    }
    console.log(optionList);
    for (let i = 0; i < optionList.length; i++) {
        let newList = document.getElementById("city-name");
        let newOption = document.createElement("option");
        newList.append(newOption);
        newOption.innerHTML = optionList[i].cityName;
        newOption.setAttribute("value", optionList[i].cityName);
    }
}
LoadingCitys();



/*check cookies */
function defaultCityDisplay() {

    for (let i = 0; i < optionList.length; i++) {
        if (selectCity === optionList[i].cityName) {
            selectCityLat = optionList[i].lat;
            selectCityLng = optionList[i].lng
            console.log(selectCity);
            console.log(selectCityLat);
            console.log(selectCityLng);
            document.getElementById('city-name').value = selectCity;
            return true;
        }
    }
    selectCity = optionList[0].cityName;
    selectCityLat = optionList[0].lat;
    selectCityLng = optionList[0].lng;
    console.log(selectCity);
    console.log(selectCityLat);
    console.log(selectCityLng);
    document.getElementById('city-name').value = selectCity;
}
defaultCityDisplay();


/*check the option selected */
document.getElementById('city-name').addEventListener('change', function() {
    selectCity = this.value;
    Cookies.set('city', selectCity);
    getWeather(selectCityLat, selectCityLng, selectCity);
    // dayChangeData = JSON.parse(Cookies.get("fiveDayData"));
    // console.log(dayChangeData);
})


/*get weather data */
function getWeather(lat, lng, city) {
    function onSuccess() {
        infoWeather = JSON.parse(this.ajax.responseText);
        console.log(infoWeather);
        Cookies.set('fiveDayData', JSON.stringify(infoWeather));
        document.getElementById('city').innerHTML = selectCity;
        let currentDate = TimeConvert(infoWeather.current.dt).date;
        let currentDays = TimeConvert(infoWeather.current.dt).days;
        let currentDescription = infoWeather.current.weather[0].description;
        let currentmain = infoWeather.current.weather[0].main;
        let currentTemp = Math.round((infoWeather.current.temp - 273.15) * 10) / 10;
        let currentFeels = Math.round((infoWeather.current.feels_like - 273.15) * 10) / 10;
        let currentWeatherData = {
            city: selectCity,
            date: currentDate,
            days: currentDays,
            description: currentDescription,
            main: currentDescription,
            main: currentmain,
            temp: currentTemp,
            feels: currentFeels,
        }
        console.log(currentWeatherData);
        document.getElementById('day').innerHTML = DaysCheck(currentWeatherData.days, currentWeatherData.days);
        document.getElementById('date').innerHTML = currentWeatherData.date
        document.getElementById('description').innerHTML = currentWeatherData.description;
        document.getElementById('temp-num').innerHTML = currentWeatherData.temp;
        document.getElementById('feels-like').innerHTML = currentWeatherData.feels;
        document.getElementById('Body').style.backgroundImage = "url(" + WeatherBGImg(currentWeatherData.main) + ")";

        let dateFive, daysFive, timeFive, tempFive, tempMaxFive, tempMinFive, tempFeelsFive, pressureFive, UviFive, humidityFive, PopFive, WindFive, mainFive, DescriptionFive;

        for (let i = 0; i < infoWeather.daily.length - 3; i++) {
            dateFive = TimeConvert(infoWeather.daily[i].dt).date;
            daysFive = TimeConvert(infoWeather.daily[i].dt).days;
            timeFive = TimeConvert(infoWeather.daily[i].dt).time;
            tempFive = Math.round((infoWeather.daily[i].temp.day - 273.15) * 10) / 10;
            tempMaxFive = Math.round((infoWeather.daily[i].temp.max - 273.15) * 10) / 10;
            tempMinFive = Math.round((infoWeather.daily[i].temp.min - 273.15) * 10) / 10;
            tempFeelsFive = Math.round((infoWeather.daily[i].feels_like.day - 273.15) * 10) / 10;
            pressureFive = infoWeather.daily[i].pressure;
            UviFive = infoWeather.daily[i].uvi;
            humidityFive = infoWeather.daily[i].humidity;
            PopFive = infoWeather.daily[i].pop;
            WindFive = infoWeather.daily[i].wind_speed;
            mainFive = infoWeather.daily[i].weather[0].main;
            DescriptionFive = infoWeather.daily[i].weather[0].description;
            let dayData = {
                city: selectCity,
                date: dateFive,
                days: daysFive,
                time: timeFive,
                temp: tempFive,
                tempMax: tempMaxFive,
                tempMin: tempMinFive,
                tempFeels: tempFeelsFive,
                pressure: pressureFive,
                Uvi: UviFive,
                humidity: humidityFive,
                Pop: PopFive,
                Wind: WindFive,
                main: mainFive,
                description: DescriptionFive,
            }
            dayFiveWeatherData.push(dayData);
        }
        console.log(dayFiveWeatherData)
        document.getElementById("day1").innerHTML = DaysCheck(dayFiveWeatherData[0].days, dayFiveWeatherData[0].days);
        document.getElementById("dayOneTemp").innerHTML = dayFiveWeatherData[0].temp;
        document.getElementById("dayOneImg").src = WeatherImg(dayFiveWeatherData[0].main);
        document.getElementById("day2").innerHTML = dayFiveWeatherData[1].days;
        document.getElementById("dayTwoTemp").innerHTML = dayFiveWeatherData[1].temp;
        document.getElementById("dayTwoImg").src = WeatherImg(dayFiveWeatherData[1].main);
        document.getElementById("day3").innerHTML = dayFiveWeatherData[2].days;
        document.getElementById("dayThreeTemp").innerHTML = dayFiveWeatherData[2].temp;
        document.getElementById("dayThreeImg").src = WeatherImg(dayFiveWeatherData[2].main);
        document.getElementById("day4").innerHTML = dayFiveWeatherData[3].days;
        document.getElementById("dayFourTemp").innerHTML = dayFiveWeatherData[3].temp;
        document.getElementById("dayFourImg").src = WeatherImg(dayFiveWeatherData[3].main);
        document.getElementById("day5").innerHTML = dayFiveWeatherData[4].days;
        document.getElementById("dayFiveTemp").innerHTML = dayFiveWeatherData[4].temp;
        document.getElementById("dayFiveImg").src = WeatherImg(dayFiveWeatherData[4].main);

    }
    console.log(city);
    console.log(lat);
    console.log(lng);
    let weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&appid=21ef57559fd77955dacb8ed12fe0b3a3";
    let FiveDayWeather = new Api("GET", weatherApi, onSuccess, onLoading, onFailure);
    FiveDayWeather.get(city);
}


getWeather(selectCityLat, selectCityLng, selectCity);

function DayChange(day) {

    document.getElementById('Body').style.backgroundImage = "url(" + WeatherBGImg(day.main) + ")";
    document.getElementById('day').innerHTML = DaysCheck(day.days, dayFiveWeatherData[0].days);
    document.getElementById('date').innerHTML = day.date;
    document.getElementById('description').innerHTML = day.description;
    document.getElementById('temp-num').innerHTML = day.temp;
    document.getElementById('feels-like').innerHTML = day.tempFeels;
    document.getElementById("Max-temp").innerHTML = day.tempMax;
    document.getElementById("Min-temp").innerHTML = day.tempMin;
    document.getElementById("Wind").innerHTML = day.wind;
    document.getElementById("Pressure").innerHTML = day.pressure;
    document.getElementById("Humidity").innerHTML = day.humidity;
    document.getElementById("Uvi").innerHTML = day.Uvi;
    document.getElementById('detail').style.transform = "translateY(0)";
    document.getElementById('five-day-forecasts').style.transform = "translateY(0)";
    document.getElementById('current-info').style.transform = "translateY(0)";
    document.getElementById('option').style.transform = "translateY(0)";
}

console.log(dayChangeData);
// document.getElementById("dayOne").addEventListener('click', DayChange(dayChangeData[0]));
// document.getElementById("dayTwo").addEventListener('click', DayChange(dayChangeData[1]));
// document.getElementById("dayThree").addEventListener('click', DayChange(dayChangeData[2]));
// document.getElementById("dayFour").addEventListener('click', DayChange(dayChangeData[3]));
// document.getElementById("dayFive").addEventListener('click', DayChange(dayChangeData[4]));










// /* get today weather data */
// function todayWeather() {
//     function onSuccess() {
//         infoToday = JSON.parse(this.ajax.responseText);
//         day1All = {
//             name: infoToday.name,
//             date: todayDate,
//             main: infoToday.weather[0].main,
//             temp: Math.round((infoToday.main.temp - 273.15) * 10) / 10,
//             feelsLike: Math.round((infoToday.main.feels_like - 273.15) * 10) / 10,
//             tempMax: Math.round((infoToday.main.temp_max - 273.15) * 10) / 10,
//             tempMin: Math.round((infoToday.main.temp_min - 273.15) * 10) / 10,
//             wind: infoToday.wind.speed,
//             pressure: infoToday.main.pressure,
//             humidity: infoToday.main.humidity,
//             visibility: infoToday.visibility / 1000,
//         }
//         WeatherBGImg(day1All.main)
//         document.getElementById('city').innerHTML = day1All.name;
//         document.getElementById('day').innerHTML = checkDays(day1All);
//         document.getElementById('date').innerHTML = day1All.date;
//         document.getElementById('main').innerHTML = day1All.main;
//         document.getElementById('temp-num').innerHTML = day1All.temp;
//         document.getElementById('feels-like').innerHTML = day1All.feelsLike;
//     }
//     let day1AllApiPath = "http://api.openweathermap.org/data/2.5/weather?q=" + selectCity + "&appid=9fe9c54185524ddf2a73eff1caf355a5";
//     console.log(day1AllApiPath);
//     let OneDayWeather = new Api("GET", day1AllApiPath, onSuccess, onLoading, onFailure);
//     OneDayWeather.get();
//     console.log(document.getElementById('city'));
// }

// /*five day weather check*/
// function FiveDayWeather() {

//     function onSuccess() {
//         info = JSON.parse(this.ajax.responseText);
//         /* get the weather information of five days */
//         day2All = {
//             name: info.city.name,
//             date: info.list[5].dt_txt.slice(0, 10),
//             main: info.list[5].weather[0].main,
//             temp: Math.round((info.list[5].main.temp - 273.15) * 10) / 10,
//             feelsLike: Math.round((info.list[5].main.feels_like - 273.15) * 10) / 10,
//             tempMax: Math.round((info.list[5].main.temp_max - 273.15) * 10) / 10,
//             tempMin: Math.round((info.list[5].main.temp_min - 273.15) * 10) / 10,
//             wind: info.list[5].wind.speed,
//             pressure: info.list[5].main.pressure,
//             humidity: info.list[5].main.humidity,
//             visibility: info.list[5].visibility / 1000,
//         }
//         day3All = {
//             name: info.city.name,
//             date: info.list[13].dt_txt.slice(0, 10),
//             main: info.list[13].weather[0].main,
//             temp: Math.round((info.list[13].main.temp - 273.15) * 10) / 10,
//             feelsLike: Math.round((info.list[13].main.feels_like - 273.15) * 10) / 10,
//             tempMax: Math.round((info.list[13].main.temp_max - 273.15) * 10) / 10,
//             tempMin: Math.round((info.list[13].main.temp_min - 273.15) * 10) / 10,
//             wind: info.list[13].wind.speed,
//             pressure: info.list[13].main.pressure,
//             humidity: info.list[13].main.humidity,
//             visibility: info.list[13].visibility / 1000,
//         }
//         day4All = {
//             name: info.city.name,
//             date: info.list[21].dt_txt.slice(0, 10),
//             main: info.list[21].weather[0].main,
//             temp: Math.round((info.list[21].main.temp - 273.15) * 10) / 10,
//             feelsLike: Math.round((info.list[21].main.feels_like - 273.15) * 10) / 10,
//             tempMax: Math.round((info.list[21].main.temp_max - 273.15) * 10) / 10,
//             tempMin: Math.round((info.list[21].main.temp_min - 273.15) * 10) / 10,
//             wind: info.list[21].wind.speed,
//             pressure: info.list[21].main.pressure,
//             humidity: info.list[21].main.humidity,
//             visibility: info.list[21].visibility / 1000,
//         }
//         day5All = {
//             name: info.city.name,
//             date: info.list[29].dt_txt.slice(0, 10),
//             main: info.list[29].weather[0].main,
//             temp: Math.round((info.list[29].main.temp - 273.15) * 10) / 10,
//             feelsLike: Math.round((info.list[29].main.feels_like - 273.15) * 10) / 10,
//             tempMax: Math.round((info.list[29].main.temp_max - 273.15) * 10) / 10,
//             tempMin: Math.round((info.list[29].main.temp_min - 273.15) * 10) / 10,
//             wind: info.list[29].wind.speed,
//             pressure: info.list[29].main.pressure,
//             humidity: info.list[29].main.humidity,
//             visibility: info.list[29].visibility / 1000,
//         }

//         /*current weather information display */
//         document.getElementById('Body').style.backgroundImage = "url(" + WeatherBGImg(day1All.main) + ")";

//         document.getElementById("day1").innerHTML = GetDay(day1All.date);
//         document.getElementById("day2").innerHTML = GetDay(day2All.date);
//         document.getElementById("day3").innerHTML = GetDay(day3All.date);
//         document.getElementById("day4").innerHTML = GetDay(day4All.date);
//         document.getElementById("day5").innerHTML = GetDay(day5All.date);
//         document.getElementById("dayOneImg").src = WeatherImg(day1All.main);
//         document.getElementById("dayTwoImg").src = WeatherImg(day2All.main);
//         document.getElementById("dayThreeImg").src = WeatherImg(day3All.main);
//         document.getElementById("dayFourImg").src = WeatherImg(day4All.main);
//         document.getElementById("dayFiveImg").src = WeatherImg(day5All.main);
//         document.getElementById("dayOneTemp").innerHTML = day1All.temp;
//         document.getElementById("dayTwoTemp").innerHTML = day2All.temp;
//         document.getElementById("dayThreeTemp").innerHTML = day3All.temp;
//         document.getElementById("dayFourTemp").innerHTML = day4All.temp;
//         document.getElementById("dayFiveTemp").innerHTML = day5All.temp;
//         document.getElementById('city').innerHTML = day1All.name;
//     }
//     let fiveDayApiPath = "http://api.openweathermap.org/data/2.5/forecast?q=" + selectCity + "&appid=21ef57559fd77955dacb8ed12fe0b3a3";
//     console.log(selectCity);
//     let fiveDayWeather = new Api("GET", fiveDayApiPath, onSuccess, onLoading, onFailure);
//     fiveDayWeather.get();

// }

/* the function to output the detail information of weather */


/*check and change the icon and background of weather */
function WeatherImg(weather) {
    if (weather.toUpperCase() === "RAIN") {
        return "../images/rain.png"
    } else if (weather.toUpperCase() === "CLOUDS") {
        return "../images/Clouds.png"
    } else if (weather.toUpperCase() === "CLEAR") {
        return "../images/Clear.png"
    } else if (weather.toUpperCase() === "SNOW") {
        return "../images/Snow.png"
    } else if (weather.toUpperCase() === "HAZE" || weather.toUpperCase() === "SMOKE") {
        return "../images/haze.png"
    } else if (weather.toUpperCase() === "MIST") {
        return "../images/mist.png"
    } else {
        return "../images/Sun.png"
    }
}

function WeatherBGImg(weather) {
    console.log(weather);
    if (weather.toUpperCase() === "RAIN") {
        return "../images/BgRain.jpg";
    } else if (weather.toUpperCase() === "CLOUDS") {
        return "../images/BgCloud.jpg";
    } else if (weather.toUpperCase() === "CLEAR") {
        return "../images/BgSun.jpg";
    } else if (weather.toUpperCase() === "SNOW") {
        return "../images/BgSnow.jpg";
    } else if (weather.toUpperCase() === "HAZE" || weather.toUpperCase() === "SMOKE") {
        return "../images/BgHaze.jpg";
    } else if (weather.toUpperCase() === "MIST") {
        return "../images/BgMist.jpg"
    } else {
        return "../images/BgSun.jpg";
    }
}



/* make the current weather full screen */
document.getElementById('current-info').addEventListener('click', () => {
    document.getElementById('detail').style.transform = "translateY(100%)";
    document.getElementById('five-day-forecasts').style.transform = "translateY(120%)";
    document.getElementById('current-info').style.transform = "translateY(60%)";
    document.getElementById('option').style.transform = "translateY(240%)";
    getWeather(selectCityLat, selectCityLng, selectCity);
});

function addShow() {
    window.open("../pages/cityAdd.html", "_self");
}