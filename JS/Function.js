function TimeConvert(dt) {
    dates = String(new Date(dt * 1000));
    // console.log(dates);
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
        // console.log(days);
        // console.log(time);
        // console.log(date);
        // console.log(timeZone);
    return times;
}

function DaysCheck(date1, date2) {
    if (date1 === date2) {
        return "today";
    } else {
        return date1;
    }
}



// /* get today date */
// let date = new Date();
// let nowMonth = date.getMonth() + 1;
// let strDate = date.getDate();
// let seperator = "-";
// if (nowMonth >= 1 && nowMonth <= 9) {
//     nowMonth = "0" + nowMonth;
// }
// if (strDate >= 0 && strDate <= 9) {
//     strDate = "0" + strDate;
// }
// let todayDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;





// /*output the day of week */
// function GetDay(Day) {
//     var date = new Date(Day);
//     var week = date.getDay() + 1;
//     var w;
//     switch (week) {
//         case 7:
//             w = 'SUN';
//             break;
//         case 1:
//             w = 'MON';
//             break;
//         case 2:
//             w = 'TUES';
//             break;
//         case 3:
//             w = 'WED';
//             break;
//         case 4:
//             w = 'THUR';
//             break;
//         case 5:
//             w = 'FRI';
//             break;
//         case 6:
//             w = 'SAT';
//             break;
//     }
//     return w;
// }

// /* check the display of "today/tomorrow" */
// function checkDays(day) {
//     if (day === day1All) {
//         return "Today";
//     } else if (day === day2All) {
//         return "tomorrow";
//     } else {
//         return GetDay(day.date);
//     }
// }