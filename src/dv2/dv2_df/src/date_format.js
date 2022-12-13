import dateFormat from "dateformat";

// this class handles all the date related transformation and calculations
export default class {
    // generate each day in a range
    // TODO generate each period in a range
    getDaysArray(start, end, format = "mm/dd/yyyy") {
        start = new Date(start)
        end = new Date(end)
        for (var arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(dateFormat(new Date(dt), format));
        }
        return arr;
    }


}