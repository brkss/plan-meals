import { IDayDate } from "../types/IDayDate";


const GetDates = (startDate: Date, daysToAdd: number) => {
    let aryDates : IDayDate[] = [];

    for (var i = 0; i <= daysToAdd; i++) {
        let currentDate = new Date();
        currentDate.setDate(startDate.getDate() + i);
        let day_obj = {
            name: DayAsString(currentDate.getDay()),
            date: currentDate.getDate(),
            month: MonthAsString(currentDate.getMonth()),
            year: currentDate.getFullYear(),
            currentDate: currentDate
        }
        aryDates.push(day_obj);
    }

    return aryDates;
}

const MonthAsString = (monthIndex: number) => {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return month[monthIndex];
}

const DayAsString = (dayIndex: number) => {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    return weekdays[dayIndex];
}



export const Next30Days = () : IDayDate[] => {
    const startDate = new Date();
    const aryDates = GetDates(startDate, 30) as IDayDate[];
    return aryDates;
}