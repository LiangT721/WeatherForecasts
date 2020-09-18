class Api {
    content
    ajax
    type
    location
    successFunction
    loadingFunction
    failureFunction
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

let selectCityLat, selectCityLng, date, infoWeather, currentWeatherData;
let dayFiveWeatherData = [];
let dayChangeData = [];
let selectCity = Cookies.get('city');
let optionList;


function onLoading() {
    document.getElementById('city').innerHTML = "loading..."
}

function onFailure() {
    document.getElementById('city').innerHTML = "No Result!"
}

/*check cookies of city list */
function LoadingCitys() {
    if (Cookies.get("citylist") !== undefined) {
        optionList = JSON.parse(Cookies.get("citylist"));
    } else {
        optionList = cityList;
    }
    for (let i = 0; i < optionList.length; i++) {
        let newList = document.getElementById("city-name");
        let newOption = document.createElement("option");
        newList.append(newOption);
        newOption.innerHTML = optionList[i].cityName;
        newOption.setAttribute("value", optionList[i].cityName);
    }
}

/*check cookies of default city */
function defaultCityDisplay() {
    for (let i = 0; i < optionList.length; i++) {
        if (selectCity === optionList[i].cityName) {
            selectCityLat = optionList[i].lat;
            selectCityLng = optionList[i].lng
            document.getElementById('city-name').value = selectCity;
            return true;
        }
    }
    selectCity = optionList[0].cityName;
    selectCityLat = optionList[0].lat;
    selectCityLng = optionList[0].lng;
    document.getElementById('city-name').value = selectCity;
}

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
            // console.log(currentWeatherData);
        document.getElementById('day').innerHTML = DaysCheck(currentWeatherData.days, currentWeatherData.days);
        document.getElementById('date').innerHTML = currentWeatherData.date
        document.getElementById('description').innerHTML = currentWeatherData.description;
        document.getElementById('temp-num').innerHTML = currentWeatherData.temp;
        document.getElementById('feels-like').innerHTML = currentWeatherData.feels;
        document.getElementById('Body').style.backgroundImage = "url(" + WeatherBGImg(currentWeatherData.main) + ")";

        let dateFive, daysFive, timeFive, tempFive, tempMaxFive, tempMinFive, tempFeelsFive, pressureFive, UviFive, humidityFive, PopFive, WindFive, mainFive, DescriptionFive;
        dayFiveWeatherData = [];
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
                wind: WindFive,
                main: mainFive,
                description: DescriptionFive,
            }
            console.log(dayData);
            dayFiveWeatherData.push(dayData);
        }
        console.log(dayFiveWeatherData);
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
    let weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&appid=21ef57559fd77955dacb8ed12fe0b3a3";
    let FiveDayWeather = new Api("GET", weatherApi, onSuccess, onLoading, onFailure);
    FiveDayWeather.get(city);
}
/* Change the detail information of different days*/
function DayChange(day) {
    document.getElementById('city').innerHTML = day.city;
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
/* to adding page */
function addShow() {
    window.open("../pages/cityAdd.html", "_self");
}

/*check the option selected */
document.getElementById('city-name').addEventListener('change', function() {
        selectCity = this.value;
        Cookies.set('city', selectCity);
        defaultCityDisplay();
        getWeather(selectCityLat, selectCityLng, selectCity);

    })
    /* make the current weather full screen */
document.getElementById('current-info').addEventListener('click', () => {
    document.getElementById('detail').style.transform = "translateY(100%)";
    document.getElementById('five-day-forecasts').style.transform = "translateY(120%)";
    document.getElementById('current-info').style.transform = "translateY(60%)";
    document.getElementById('option').style.transform = "translateY(240%)";

    getWeather(selectCityLat, selectCityLng, selectCity);
});


LoadingCitys();
defaultCityDisplay();
getWeather(selectCityLat, selectCityLng, selectCity);