
export class DateString {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
    date: Date;
    constructor(date: Date | undefined = undefined) {
        if (date === undefined) {
            this.date = new Date();
        } else {
            this.date = date;
        }
        this.year = this.date.getFullYear().toString();
        this.month = '' + (this.date.getMonth() + 1);
        this.day = '' + this.date.getDate();
        const hms = this.date.toTimeString().split(" ")[0].split(":");
        this.hour = hms[0];
        this.minute = hms[1];
        this.second = hms[2];

        if (this.month.length < 2) {
            this.month = "0" + this.month;
        }
        if (this.day.length < 2) {
            this.day = "0" + this.day;
        }
        if (this.hour.length < 2) {
            this.hour = "0" + this.hour;
        }
        if (this.minute.length < 2) {
            this.minute = "0" + this.minute;
        }
        if (this.second.length < 2) {
            this.second = "0" + this.second;
        }

    }

    getList() {
        return [
            this.year,
            this.month,
            this.day,
            this.hour,
            this.minute,
            this.second
        ];
    }

    formatSlash() {
        return "" +
            this.year + "/" +
            this.month + "/" +
            this.day + " " +
            this.hour + ":" +
            this.minute + ":" +
            this.second + "";
    }

    formatDash() {
        return "" +
            this.year + "-" +
            this.month + "-" +
            this.day + "-" +
            this.hour + "" +
            this.minute + "" +
            this.second + "";
    }

    formatDateDash() {
        return "" +
            this.year + "-" +
            this.month + "-" +
            this.day;
    }

    formatTimeDash() {
        return "" +
            this.hour + "" +
            this.minute + "" +
            this.second + "";
    }
}
