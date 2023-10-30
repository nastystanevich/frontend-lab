class OneMoment extends Date{
    format(formDate) {
        const year = this.getFullYear();
        let month = this.getMonth();
        let day = this.getDate();

        if(month < 10) month = '0' + month;
        if(day < 10) day = '0' + day;

        return formDate.replace(/YYYY/i, year).replace(/MM/i, month).replace(/DD/i, day);
    }

    fromNow() {
        const differenceDate = Date.now() - this;
        let days = Math.ceil(differenceDate / (24 * 3600 * 1000));
        let years = Math.ceil(differenceDate / (365 * 24 * 3600 * 1000));

        if (differenceDate < 0) {
            days = Math.abs(days);
            years = Math.abs(years);

            switch (true) {
                case days <= 1:
                    return `after ${days} day`;
                case days <= 364:
                    return `after ${days} days`;
                case +years === 1:
                    return 'in 1 year';
                default:
                    return `in ${years} years`;
            }
        }

        switch (true) {
            case days <= 1:
                return `in ${days} day`;
            case days <= 364:
                return `in ${days} days`;
            case years === 1:
                return '1 year ago';
            default:
                return `${years} years ago`;
        }
    }

    toDate() {
        return this;
    }

    static parse(data, formatDate) {
        const formYear = 'YYYY';
        const formMonth =  'MM';
        const formDay = 'DD';
        const year = data.slice(formatDate.indexOf(formYear), formatDate.indexOf(formYear) + 4);
        const month = +data.slice(formatDate.indexOf(formMonth), formatDate.indexOf(formMonth) + 2) - 1;
        const day = data.slice(formatDate.indexOf(formDay), formatDate.indexOf(formDay) + 2);

        return new OneMoment(new Date(year, month, day));
    }
}

const someDate = new OneMoment(new Date(2023,9,9));
const anotherDate = OneMoment.parse('01202019', 'MMDDYYYY');


let data = someDate.toDate();

console.log('format(): ', someDate.format('YYYY/MM/DD'));
console.log('fromNow(): ', someDate.fromNow());
console.log('is instance of Date: ', data instanceof Date);
console.log('parse(): ', anotherDate instanceof OneMoment, anotherDate);