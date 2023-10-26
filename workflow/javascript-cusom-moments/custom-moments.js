class OneMoment {
    constructor(date) {
        if(date instanceof Date) {
            this.date = date;
        } else {
            this.date = new Date(date);
        }
    }

    format(formDate) {
        const year = this.date.getFullYear();
        const month = this.date.getMonth();
        const day = this.date.getDate();

        return formDate.replace(/YYYY/i, year).replace(/MM/i, month).replace(/DD/i, day);
    }

    formNow() {
        const differenceDate = Math.abs(Date.now() - this.date);
        const days = Math.ceil(differenceDate / (24 * 3600 * 1000));
        const years = Math.ceil(differenceDate / (365 * 24 * 3600 * 1000));

        if(days <= 1) {
            return `in ${days} day`;
        } else if (days <= 364) {
            return `in ${days} days`;
        } else {
            if(years === 1) {
                return '1 year ago';
            } else {
                return `${years} years ago`;
            }
        }
    }

    toDate() {
        return new Date(this.date);
    }

    static parse(data, formatDate) {
        const formYear = 'YYYY';
        const formMonth =  'MM';
        const formDay = 'DD';
        const year = data.slice(formatDate.indexOf(formYear), formatDate.indexOf(formYear) + 4);
        const month = +data.slice(formatDate.indexOf(formMonth), formatDate.indexOf(formMonth) + 2) - 1;
        const day = data.slice(formatDate.indexOf(formDay), formatDate.indexOf(formDay) + 2);

        return new Date(year, month, day);
    }
}

const someDate = new OneMoment(new Date(2023,10,10));
const anotherDate = OneMoment.parse('01202019', 'MMDDYYYY');


let data = someDate.toDate();

console.log('format(): ', someDate.format('YYYY/MM/DD'));
console.log('formNow(): ', someDate.formNow());
console.log('is instance of Date: ', data instanceof Date);
console.log('parse(): ', anotherDate instanceof Date, anotherDate);