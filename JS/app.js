function CurrentWeather() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let currentWeather = JSON.parse(this.responseText);
            console.log(currentWeather);

            //     document.getElementById("city").innerHTML = currentWeather.name;
            // document.getElementById("weather").innerHTML = currentWeather.weather[0].main;
            // document.getElementById("temperature").innerHTML = currentWeather.main.temp - 273.15;
            // document.getElementById("temperature-max").innerHTML = currentWeather.main.temp_max - 273.15;
            // document.getElementById("temperature-min").innerHTML = currentWeather.main.temp_min - 273.15;
            // document.getElementById("feels-like").innerHTML = currentWeather.main.feels_like - 273.15;
            // document.getElementById("pressure").innerHTML = currentWeather.main.pressure;

        }
    }
    ajax.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=calgary&appid=9fe9c54185524ddf2a73eff1caf355a5", true);
    ajax.send();


}

function FiveDayWeather() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let currentWeather = JSON.parse(this.responseText);
            console.log(currentWeather);

            //     document.getElementById("city").innerHTML = currentWeather.name;
            // document.getElementById("weather").innerHTML = currentWeather.weather[0].main;
            // document.getElementById("temperature").innerHTML = currentWeather.main.temp - 273.15;
            // document.getElementById("temperature-max").innerHTML = currentWeather.main.temp_max - 273.15;
            // document.getElementById("temperature-min").innerHTML = currentWeather.main.temp_min - 273.15;
            // document.getElementById("feels-like").innerHTML = currentWeather.main.feels_like - 273.15;
            // document.getElementById("pressure").innerHTML = currentWeather.main.pressure;

        }
    }
    ajax.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=calgary&appid=21ef57559fd77955dacb8ed12fe0b3a3", true);
    ajax.send();


}


// document.converter.celsius.value = document.converter.kelvin.value - 273.15;
//     document.converter.fahrenheit.value = ((document.converter.kelvin.value - 273.15) * 9 / 5) + 32;