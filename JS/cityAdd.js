console.log(1)

let listArea = document.getElementById('cityList');
for (let i = 0; i < cityList.length; i++) {
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
    cityName.innerHTML = cityList[i].cityName;
    state.innerHTML = cityList[i].stateCode;
    country.innerHTML = cityList[i].countryCode;
    temp.innerHTML = "15c"
    temp.setAttribute("class", "temp");
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
        cityLine.append(cityName);
        cityLine.append(state);
        cityLine.append(country);
        cityName.innerHTML = newCity;
        state.innerHTML = newCityStateCode;
        country.innerHTML = newCityCountyCode;
    }
    let cityApi = "https://api.opencagedata.com/geocode/v1/json?q=Rua+Cafel%C3%A2ndia%2C+Carapicu%C3%ADba%2C+" + city + "&key=73bb9025ce93477e984d47732d9edeea&pretty=1&language=en"

    let cityList = new Api("GET", cityApi, onSuccess, onLoading, onFailure);
    cityList.get();
}

cityLat = Cookies.get("lat");
cityLng = Cookies.get("lng");
CallWeather(cityLat, cityLng)

function CallWeather(lat, lng) {

    function onSuccess() {
        infoToday = JSON.parse(this.ajax.responseText);

    }
    let weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=daily&appid=21ef57559fd77955dacb8ed12fe0b3a3";
    let OneDayWeather = new Api("GET", weatherApi, onSuccess, onLoading, onFailure);
    OneDayWeather.get();
}