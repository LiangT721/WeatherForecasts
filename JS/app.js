let newCityName;
let inputDisplay = false;
let WeatherIconPath;
let seletCity = Cookies.get('city');
let infoToday;
let day1All;
let day2All;
let day3All;
let day4All;
let day5All;
let today;
/* Basic Api Class set */
class Api {
    content;
    ajax;
    type;
    location;
    successFunction;
    loadingFunction;
    failureFunction;
    constructor(httpType, url, success, loading, failure) {
        this.ajax = new XMLHttpRequest();
        this.type = httpType;
        this.location = url;
        this.successFunction = success;
        this.loadingFunction = loading;
        this.failureFunction = failure;
    }

    get() {
        let holder = this;
        this.ajax.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                holder.successFunction();
            } else if (this.readyState != 4) {
                holder.loadingFunction();
            } else {
                holder.failureFunction();
            }
        }
        this.ajax.open(this.type, this.location, true);
        this.ajax.send();
    }
}

function onLoading() {
    document.getElementById('city').innerHTML = "loading..."
}

function onFailure() {
    document.getElementById('city').innerHTML = "No Result!"
}



/*check cookies */
if (seletCity === undefined) {
    seletCity = "calgary";
} else {
    addCity(seletCity);
    document.getElementById('city-name').value = seletCity;
};

/*check the option selected */
document.getElementById('city-name').addEventListener('change', function() {
    seletCity = this.value;
    Cookies.set('city', seletCity);
    FiveDayWeather();
    todayWeather();
});
console.log(seletCity);
FiveDayWeather();
todayWeather();

/* get today date */
let date = new Date();
let nowMonth = date.getMonth() + 1;
let strDate = date.getDate();
let seperator = "-";
if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = "0" + nowMonth;
}
if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
}
let todayDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;


/* check the display of "today/tomorrow" */
function checkDays(day) {
    if (day === day1All) {
        return "Today";
    } else if (day === day2All) {
        return "tomorrow";
    } else {
        return GetDay(day.date);
    }
}

/*output the day of week */
function GetDay(Day) {
    var date = new Date(Day);
    var week = date.getDay() + 1;
    var w;
    switch (week) {
        case 7:
            w = 'SUN';
            break;
        case 1:
            w = 'MON';
            break;
        case 2:
            w = 'TUES';
            break;
        case 3:
            w = 'WED';
            break;
        case 4:
            w = 'THUR';
            break;
        case 5:
            w = 'FRI';
            break;
        case 6:
            w = 'SAT';
            break;
    }
    return w;
}
/* get today weather data */
function todayWeather() {
    function onSuccess() {
        infoToday = JSON.parse(this.ajax.responseText);
        day1All = {
            name: infoToday.name,
            date: todayDate,
            main: infoToday.weather[0].main,
            temp: Math.round((infoToday.main.temp - 273.15) * 10) / 10,
            feelsLike: Math.round((infoToday.main.feels_like - 273.15) * 10) / 10,
            tempMax: Math.round((infoToday.main.temp_max - 273.15) * 10) / 10,
            tempMin: Math.round((infoToday.main.temp_min - 273.15) * 10) / 10,
            wind: infoToday.wind.speed,
            pressure: infoToday.main.pressure,
            humidity: infoToday.main.humidity,
            visibility: infoToday.visibility / 1000,
        }
        WeatherBGImg(day1All.main)
        document.getElementById('city').innerHTML = day1All.name;
        document.getElementById('day').innerHTML = checkDays(day1All);
        document.getElementById('date').innerHTML = day1All.date;
        document.getElementById('main').innerHTML = day1All.main;
        document.getElementById('temp-num').innerHTML = day1All.temp;
        document.getElementById('feels-like').innerHTML = day1All.feelsLike;
    }
    let day1AllApiPath = "http://api.openweathermap.org/data/2.5/weather?q=" + seletCity + "&appid=9fe9c54185524ddf2a73eff1caf355a5";
    console.log(day1AllApiPath);
    let OneDayWeather = new Api("GET", day1AllApiPath, onSuccess, onLoading, onFailure);
    OneDayWeather.get();
    console.log(document.getElementById('city'));
}

/*five day weather check*/
function FiveDayWeather() {

    function onSuccess() {
        info = JSON.parse(this.ajax.responseText);
        /* get the weather information of five days */
        day2All = {
            name: info.city.name,
            date: info.list[5].dt_txt.slice(0, 10),
            main: info.list[5].weather[0].main,
            temp: Math.round((info.list[5].main.temp - 273.15) * 10) / 10,
            feelsLike: Math.round((info.list[5].main.feels_like - 273.15) * 10) / 10,
            tempMax: Math.round((info.list[5].main.temp_max - 273.15) * 10) / 10,
            tempMin: Math.round((info.list[5].main.temp_min - 273.15) * 10) / 10,
            wind: info.list[5].wind.speed,
            pressure: info.list[5].main.pressure,
            humidity: info.list[5].main.humidity,
            visibility: info.list[5].visibility / 1000,
        }
        day3All = {
            name: info.city.name,
            date: info.list[13].dt_txt.slice(0, 10),
            main: info.list[13].weather[0].main,
            temp: Math.round((info.list[13].main.temp - 273.15) * 10) / 10,
            feelsLike: Math.round((info.list[13].main.feels_like - 273.15) * 10) / 10,
            tempMax: Math.round((info.list[13].main.temp_max - 273.15) * 10) / 10,
            tempMin: Math.round((info.list[13].main.temp_min - 273.15) * 10) / 10,
            wind: info.list[13].wind.speed,
            pressure: info.list[13].main.pressure,
            humidity: info.list[13].main.humidity,
            visibility: info.list[13].visibility / 1000,
        }
        day4All = {
            name: info.city.name,
            date: info.list[21].dt_txt.slice(0, 10),
            main: info.list[21].weather[0].main,
            temp: Math.round((info.list[21].main.temp - 273.15) * 10) / 10,
            feelsLike: Math.round((info.list[21].main.feels_like - 273.15) * 10) / 10,
            tempMax: Math.round((info.list[21].main.temp_max - 273.15) * 10) / 10,
            tempMin: Math.round((info.list[21].main.temp_min - 273.15) * 10) / 10,
            wind: info.list[21].wind.speed,
            pressure: info.list[21].main.pressure,
            humidity: info.list[21].main.humidity,
            visibility: info.list[21].visibility / 1000,
        }
        day5All = {
            name: info.city.name,
            date: info.list[29].dt_txt.slice(0, 10),
            main: info.list[29].weather[0].main,
            temp: Math.round((info.list[29].main.temp - 273.15) * 10) / 10,
            feelsLike: Math.round((info.list[29].main.feels_like - 273.15) * 10) / 10,
            tempMax: Math.round((info.list[29].main.temp_max - 273.15) * 10) / 10,
            tempMin: Math.round((info.list[29].main.temp_min - 273.15) * 10) / 10,
            wind: info.list[29].wind.speed,
            pressure: info.list[29].main.pressure,
            humidity: info.list[29].main.humidity,
            visibility: info.list[29].visibility / 1000,
        }

        /*current weather information display */
        document.getElementById('Body').style.backgroundImage = "url(" + WeatherBGImg(day1All.main) + ")";

        document.getElementById("day1").innerHTML = GetDay(day1All.date);
        document.getElementById("day2").innerHTML = GetDay(day2All.date);
        document.getElementById("day3").innerHTML = GetDay(day3All.date);
        document.getElementById("day4").innerHTML = GetDay(day4All.date);
        document.getElementById("day5").innerHTML = GetDay(day5All.date);
        document.getElementById("dayOneImg").src = WeatherImg(day1All.main);
        document.getElementById("dayTwoImg").src = WeatherImg(day2All.main);
        document.getElementById("dayThreeImg").src = WeatherImg(day3All.main);
        document.getElementById("dayFourImg").src = WeatherImg(day4All.main);
        document.getElementById("dayFiveImg").src = WeatherImg(day5All.main);
        document.getElementById("dayOneTemp").innerHTML = day1All.temp;
        document.getElementById("dayTwoTemp").innerHTML = day2All.temp;
        document.getElementById("dayThreeTemp").innerHTML = day3All.temp;
        document.getElementById("dayFourTemp").innerHTML = day4All.temp;
        document.getElementById("dayFiveTemp").innerHTML = day5All.temp;
        document.getElementById('city').innerHTML = day1All.name;
    }
    let fiveDayApiPath = "http://api.openweathermap.org/data/2.5/forecast?q=" + seletCity + "&appid=21ef57559fd77955dacb8ed12fe0b3a3";
    console.log(seletCity);
    let fiveDayWeather = new Api("GET", fiveDayApiPath, onSuccess, onLoading, onFailure);
    fiveDayWeather.get();

}

/* the function to output the detail information of weather */
function DayChange(dayAll) {
    WeatherBGImg(dayAll.main)
    document.getElementById('city').innerHTML = dayAll.name;
    document.getElementById('day').innerHTML = checkDays(dayAll);
    document.getElementById('date').innerHTML = dayAll.date;
    document.getElementById('main').innerHTML = dayAll.main;
    document.getElementById('temp-num').innerHTML = dayAll.temp;
    document.getElementById('feels-like').innerHTML = dayAll.feelsLike;
    document.getElementById("Max-temp").innerHTML = dayAll.tempMax;
    document.getElementById("Min-temp").innerHTML = dayAll.tempMin;
    document.getElementById("Wind").innerHTML = dayAll.wind;
    document.getElementById("Pressure").innerHTML = dayAll.pressure;
    document.getElementById("Humidity").innerHTML = dayAll.humidity;
    document.getElementById("Visibility").innerHTML = dayAll.visibility;
    document.getElementById('detail').style.transform = "translateY(0)";
    document.getElementById('five-day-forecasts').style.transform = "translateY(0)";
    document.getElementById('current-info').style.transform = "translateY(0)";
    document.getElementById('option').style.transform = "translateY(0)";
}

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
    } else if (weather.toUpperCase() === "HAZE") {
        return "../images/haze.png"
    } else {
        return "../images/Sun.png"
    }
}

function WeatherBGImg(weather) {

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
    }
}

/* get the input city value */
function getName() {
    newCityName = document.getElementById("Input").value;
    seletCity = newCityName;
    let todayApiPath = "http://api.openweathermap.org/data/2.5/weather?q=" + seletCity + "&appid=9fe9c54185524ddf2a73eff1caf355a5"
    todayWeather(todayApiPath);
    apiPath = "http://api.openweathermap.org/data/2.5/forecast?q=" + seletCity + "&appid=21ef57559fd77955dacb8ed12fe0b3a3";
    FiveDayWeather(apiPath);
    Cookies.set('city', seletCity);
}

/* add the input city to option */
function addCity() {
    let newCityOption = document.createElement('option');
    let cityList = document.getElementById('city-name');
    cityList.appendChild(newCityOption);
    newCityOption.innerHTML = seletCity;
    newCityOption.value = seletCity;
    document.getElementById("addNew").style.transform = "translateY(-100%)";
    inputDisplay = false;
}

/*show/hide city-adding windows */
function addShow() {
    if (inputDisplay === false) {
        document.getElementById("addNew").style.transform = "translateY(0)";
        inputDisplay = true;
    } else if (inputDisplay === true) {
        document.getElementById("addNew").style.transform = "translateY(-100%)";
        inputDisplay = false;
    }
}

/* make the current weather full screen */
document.getElementById('current-info').addEventListener('click', () => {
    day1AllyApiPath = "http://api.openweathermap.org/data/2.5/weather?q=" + seletCity + "&appid=9fe9c54185524ddf2a73eff1caf355a5"
    todayWeather(day1AllyApiPath);
    document.getElementById('detail').style.transform = "translateY(100%)";
    document.getElementById('five-day-forecasts').style.transform = "translateY(120%)";
    document.getElementById('current-info').style.transform = "translateY(60%)";
    document.getElementById('option').style.transform = "translateY(240%)";
    document.getElementById('addNew').style.transform = "translateY(-100%)";
    inputDisplay = false;;
});