let newCityLat, newCityLng, newCity, newCityCounty, newCityCountyCode, newCityState, newCityStateCode;
let deleteList = [];
let listArea = document.getElementById('cityList');


function defaultDisplay() {
    listArea.innerHTML = "";
    for (let i = 0; i < cityListDisplay.length; i++) {
        let cityLine = document.createElement('div');
        listArea.append(cityLine);
        cityLine.setAttribute("class", "city-line");
        let selectCheck = document.createElement('input');
        let cityName = document.createElement('p');
        let state = document.createElement('p');
        let country = document.createElement('p');
        let temp = document.createElement('p');
        let city = cityName.innerHTML = cityListDisplay[i].cityName;
        let cityCheck = city + "Check";
        cityLine.append(selectCheck);
        cityLine.append(cityName);
        cityLine.append(state);
        cityLine.append(country);
        cityLine.append(temp);
        selectCheck.style.visibility = "hidden";
        selectCheck.setAttribute("type", "checkbox");
        selectCheck.setAttribute("class", "checks");
        selectCheck.setAttribute("id", cityCheck);
        selectCheck.setAttribute("value", city);
        selectCheck.setAttribute("onclick", "SelectCity(" + cityCheck + ")");
        state.innerHTML = cityListDisplay[i].stateCode;
        country.innerHTML = cityListDisplay[i].countryCode;
        temp.innerHTML = "15c"
        temp.setAttribute("id", city + "Temp")
        temp.setAttribute("class", "temp");
        let lat = cityListDisplay[i].lat;
        let lng = cityListDisplay[i].lng;
        CallWeather(lat, lng, city + "Temp");
    }
}

function CallWeather(lat, lng, city) {

    function onSuccess() {
        infoToday = JSON.parse(this.ajax.responseText);
        document.getElementById(city).innerHTML = Math.round((infoToday.current.temp - 273.15) * 10) / 10 + "&#176C";

    }
    let weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=daily&appid=21ef57559fd77955dacb8ed12fe0b3a3";
    let OneDayWeather = new Api("GET", weatherApi, onSuccess, onLoading, onFailure);
    OneDayWeather.get(city);
}

function SearchCity() {
    newCity = document.getElementById("new-city").value;
    console.log(newCity);
    Cookies.set('newCity', newCity);
    CallCity(newCity);
}


function CallCity(city) {
    function onSuccess() {
        let city = JSON.parse(this.ajax.responseText);
        console.log(city);
        newCityLat = city.results[0].geometry.lat;
        newCityLng = city.results[0].geometry.lng;
        newCityCounty = city.results[0].components.country;
        newCityCountyCode = city.results[0].components.country_code;
        if (city.results[0].components.state_code === undefined) {
            newCityState = city.results[0].components.town;
            newCityStateCode = city.results[0].components.town;
        } else {
            newCityState = city.results[0].components.state;
            newCityStateCode = city.results[0].components.state_code;
        }
        Cookies.set('newCityLat', newCityLat)
        Cookies.set('newCityLng', newCityLng)
        Cookies.set('newCityCounty', newCityCounty)
        Cookies.set('newCityCountyCode', newCityCountyCode)
        Cookies.set('newCityState', newCityState)
        Cookies.set('newCityStateCode', newCityStateCode)
        let cityLine = document.createElement('div');
        listArea.append(cityLine);
        cityLine.setAttribute("class", "city-line");
        let selectCheck = document.createElement('input');
        let cityName = document.createElement('p');
        let state = document.createElement('p');
        let country = document.createElement('p');
        let temp = document.createElement('p');
        let cityCheck = newCity + "Check";
        cityLine.append(selectCheck);
        cityLine.append(cityName);
        cityLine.append(state);
        cityLine.append(country);
        cityLine.append(temp);
        selectCheck.style.visibility = "hidden";
        selectCheck.setAttribute("type", "checkbox");
        selectCheck.setAttribute("class", "checks");
        selectCheck.setAttribute("id", cityCheck);
        selectCheck.setAttribute("value", newCity);
        selectCheck.setAttribute("onclick", "SelectCity(" + cityCheck + ")");
        cityName.innerHTML = newCity;
        state.innerHTML = newCityStateCode;
        country.innerHTML = newCityCountyCode;
        temp.setAttribute("id", newCity + "Temp")
        temp.setAttribute("class", "temp");
        CallWeather(newCityLat, newCityLng, newCity + "Temp");
    }
    let cityApi = "https://api.opencagedata.com/geocode/v1/json?q=Rua+Cafel%C3%A2ndia%2C+Carapicu%C3%ADba%2C+" + city + "&key=73bb9025ce93477e984d47732d9edeea&pretty=1&language=en"

    let cityList = new Api("GET", cityApi, onSuccess, onLoading, onFailure);
    cityList.get();
}



function AddCityList() {
    let newCityData = {
        cityName: newCity,
        country: newCityCounty,
        countryCode: newCityCountyCode,
        state: newCityState,
        stateCode: newCityStateCode,
        lat: newCityLat,
        lng: newCityLng,
    }
    if (cityListCheck() === true) {
        console.log(cityListDisplay);
        cityListDisplay.push(newCityData);
        console.log(cityListDisplay);
        let josnList = JSON.stringify(cityListDisplay);
        console.log(josnList);
        Cookies.set('citylist', josnList);
        Cookies.set('city', newCity);
        defaultDisplay();
    }
}

function cityListCheck() {
    for (let i = 0; i < cityListDisplay.length; i++) {
        if (newCity === cityListDisplay[i].cityName) {
            return false;
        }
    }
    return true;
}


function MutiSelect() {
    let checkCitys = document.getElementsByClassName("checks");

    for (let i = 0; i < checkCitys.length; i++) {
        if (checkCitys[i].style.visibility === "hidden") {
            checkCitys[i].style.visibility = "visible";
        } else if (checkCitys[i].style.visibility === "visible") {
            checkCitys[i].style.visibility = "hidden";
        }
    }

}



function SelectCity(selectCity) {
    console.log(selectCity);
    let deleteCity = selectCity.value;
    if (selectCity.checked === true) {
        deleteList.push(deleteCity);
        console.log(deleteList);
    } else if (selectCity.checked !== true) {
        for (let i = 0; i < deleteList.length; i++) {
            if (deleteCity === deleteList[i]) {
                deleteList.splice(i, 1);
                console.log(deleteList);
            }

        }
    }
}

function DeleteCitys() {
    console.log(cityListDisplay);
    console.log(deleteList);
    for (let i = 0; i < cityListDisplay.length; i++) {
        console.log(cityListDisplay[i].cityName);
        for (let j = 0; j < deleteList.length; j++) {
            console.log(deleteList[j]);
            if (cityListDisplay[i].cityName === deleteList[j]) {
                cityListDisplay.splice(i, 1);
                console.log(cityListDisplay);
            }
        }
    }
    let josnList = JSON.stringify(cityListDisplay);
    // console.log(josnList);
    Cookies.set('citylist', josnList);
    defaultDisplay();
}


function onLoading() {}

function onFailure() {}

function back() {
    window.open("../index.html", "_self");
}





if (Cookies.get("citylist") !== undefined) {
    cityListDisplay = JSON.parse(Cookies.get("citylist"));
} else {
    cityListDisplay = cityList;
}
console.log(cityListDisplay);
defaultDisplay();
document.getElementById('select').addEventListener('click', MutiSelect);
document.getElementById("delete").addEventListener('click', DeleteCitys);
document.getElementById("search-btn").addEventListener("click", SearchCity);
document.getElementById("add-btn").addEventListener('click', AddCityList);