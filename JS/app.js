function CurrentWeather() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let currentWeather = JSON.parse(this.responseText);
            console.log(currentWeather);
            document.getElementById("city").innerHTML = currentWeather.name;
            document.getElementById("weather").innerHTML = currentWeather.weather[0].main;
            document.getElementById("temperature").innerHTML = currentWeather.main.temp;
            document.getElementById("temperature-max").innerHTML = currentWeather.main.temp_max;
            document.getElementById("temperature-min").innerHTML = currentWeather.main.temp_min;
            document.getElementById("feels-like").innerHTML = currentWeather.main.feels_like;
            document.getElementById("pressure").innerHTML = currentWeather.main.pressure;

        }
    }
    ajax.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=calgary&appid=9fe9c54185524ddf2a73eff1caf355a5", true);
    ajax.send();
}