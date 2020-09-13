console.log(1)

let listArea = document.getElementById('cityList');
let newCityList = Cookies.get("citylist");
if (newCityList === undefined) {
    newCityList = cityList;
}
console.log(newCityList);
let optionList = JSON.parse(newCityList);
console.log(optionList);
for (let i = 0; i < optionList.length; i++) {
    let cityLine = document.createElement('div');
    listArea.append(cityLine);
    let cityName = document.createElement('p');
    let state = document.createElement('p');
    let country = document.createElement('p');
    let temp = document.createElement('p');
    cityLine.append(cityName);
    cityLine.append(state);
    cityLine.append(country);
    cityLine.append(temp);
    let city = cityName.innerHTML = optionList[i].cityName;
    state.innerHTML = optionList[i].stateCode;
    country.innerHTML = optionList[i].countryCode;
    temp.innerHTML = "15c"
    temp.setAttribute("id", optionList[i].cityName)
    temp.setAttribute("class", "temp");
    let lat = optionList[i].lat;
    let lng = optionList[i].lng;
    CallWeather(lat, lng, city);
}

function onLoading() {}

function onFailure() {}

let newCityLat, newCityLng, newCity, newCityCounty, newCityCountyCode, newCityState, newCityStateCode;

function SearchCity() {
    newCity = document.getElementById("new-city").value;
    console.log(newCity);
    Cookies.set('newCity', newCity);
    CallCity(newCity);
}

document.getElementById("search-btn").addEventListener("click", SearchCity);

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
        let cityName = document.createElement('p');
        let state = document.createElement('p');
        let country = document.createElement('p');
        let temp = document.createElement('p');
        cityLine.append(cityName);
        cityLine.append(state);
        cityLine.append(country);
        cityLine.append(temp);
        cityName.innerHTML = newCity;
        state.innerHTML = newCityStateCode;
        country.innerHTML = newCityCountyCode;
        temp.setAttribute("id", newCity)
        temp.setAttribute("class", "temp");
        CallWeather(newCityLat, newCityLng, newCity);
    }
    let cityApi = "https://api.opencagedata.com/geocode/v1/json?q=Rua+Cafel%C3%A2ndia%2C+Carapicu%C3%ADba%2C+" + city + "&key=73bb9025ce93477e984d47732d9edeea&pretty=1&language=en"

    let cityList = new Api("GET", cityApi, onSuccess, onLoading, onFailure);
    cityList.get();
}

function CallWeather(lat, lng, city) {

    function onSuccess() {
        infoToday = JSON.parse(this.ajax.responseText);
        console.log(infoToday);
        console.log(document.getElementById(city));
        document.getElementById(city).innerHTML = Math.round((infoToday.current.temp - 273.15) * 10) / 10 + "&#176C";

    }
    let weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=daily&appid=21ef57559fd77955dacb8ed12fe0b3a3";
    let OneDayWeather = new Api("GET", weatherApi, onSuccess, onLoading, onFailure);
    OneDayWeather.get(city);
}

function AddCityList() {
    let newCityData = {
        cityName: newCity,
        country: newCityCounty,
        countryCode: newCityCounty,
        state: newCityState,
        stateCode: newCityStateCode,
        lat: newCityLat,
        lng: newCityLng,
    }
    console.log(optionList);
    optionList.push(newCityData);
    console.log(optionList);
    let josnList = JSON.stringify(optionList);
    console.log(josnList);
    Cookies.set('citylist', josnList);
}

document.getElementById("add-btn").addEventListener('click', AddCityList);

function back() {
    window.open("../index.html", "_self");
}