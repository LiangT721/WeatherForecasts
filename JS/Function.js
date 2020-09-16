function TimeConvert(dt) {
    dates = String(new Date(dt * 1000));
    let days = dates.slice(0, 4);
    let date = new Date(dt * 1000).toLocaleDateString("en-US");
    let time = new Date(dt * 1000).toLocaleTimeString();
    let timeZone = dates.slice(25, 33);
    let times = {
        days: days,
        date: date,
        time: time,
        timeZone: timeZone
    }
    return times;
}

function DaysCheck(date1, date2) {
    if (date1 === date2) {
        return "today";
    } else {
        return date1;
    }
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
    } else if (weather.toUpperCase() === "HAZE" || weather.toUpperCase() === "SMOKE") {
        return "../images/haze.png"
    } else if (weather.toUpperCase() === "MIST") {
        return "../images/mist.png"
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
    } else if (weather.toUpperCase() === "MIST") {
        return "../images/BgMist.jpg"
    } else {
        return "../images/BgSun.jpg";
    }
}