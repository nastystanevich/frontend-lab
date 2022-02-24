// Custom moment.js

/**
 * @callback specifierCallback
 * @param {Date} date
 * @return {string} - specifier value
 */

class OneMoment {
    static specifiers = [];

    /**
     * @param {Date | number} options
     */
    constructor(options) {
        this.date = typeof options === 'number' ? new Date(options) : options;
    }

    /**
     * @return {Date} - Javascript Date object
     */
    toDate() {
        return this.date;
    }

    static humanizeInterval(intervalObject, isInFuture = false) {
        let accuracyWord = '';

        if((intervalObject.unit === 'month' || intervalObject.unit === 'year') && intervalObject.amount > Math.trunc(intervalObject.amount)) {
            accuracyWord = 'more than ';
        }

        if(isInFuture) {
            return 'after '+accuracyWord+Math.floor(intervalObject.amount)+' '+OneMoment.getWordEnding(intervalObject.unit, intervalObject.amount);
        } else {
            return accuracyWord+Math.floor(intervalObject.amount)+' '+OneMoment.getWordEnding(intervalObject.unit, intervalObject.amount) + ' ago';
        }
    }

    /**
     * @return {string} - human-readable relative date
     */
    fromNow() {
        const now = Date.now() / 1000;
        const once = +this.date / 1000;

        const interval = Math.abs(now - once);
        let intervalObject = {};
        const isInFuture = once > now;

        if(interval < 604800) {
            intervalObject = {
                unit: 'day',
                amount: interval / 86400
            }
        } else if(interval >= 604800 && interval < 2419200) {
            intervalObject = {
                unit: 'week',
                amount: parseInt(interval / 604800)
            }
        } else if(interval >= 2419200 && interval < 29030400) {
            intervalObject = {
                unit: 'month',
                amount: interval / 2419200
            }
        } else if(interval >= 29030400) {
            intervalObject = {
                unit: 'year',
                amount: interval / 29030400
            }
        }

        return OneMoment.humanizeInterval(intervalObject, isInFuture);
    }

    /**
     * @param {string} specifier
     * @param {specifierCallback} fun
     */
    static addFormatSpecifier(specifier, fun) {
        this.specifiers.push([specifier, fun]);
    }

    /**
     * @param {'day' | 'year' | 'month'} word
     * @param {number} number
     */
    static getWordEnding(word, number) {
        return Math.floor(number) > 1 ? word+'s' : word;
    }

    /**
     * @param {string} format - for example DD-MM-YYYY
     */
    format(format) {
        for(let specifier of OneMoment.specifiers) {
            if(format.indexOf(specifier[0]) !== -1) {
                format = format.replaceAll(specifier[0], specifier[1](this.date));
            }
        }
        return format;
    }

    /**
     * @param {string} date
     * @param {string} format - for example DD-MM-YYYY
     */
    static parse(date, format) {
        const dayPos = format.indexOf('DD');
        const monthPos = format.indexOf('MM');
        const yearPos = format.indexOf('YYYY');

        const day = Number(date.slice(dayPos, dayPos+2));
        const month = Number(date.slice(monthPos, monthPos+2));
        const year = Number(date.slice(yearPos, yearPos+4));

        if(isNaN(day) || isNaN(month) || isNaN(year)) throw new Error('Invalid param \'format\'');

        return new OneMoment(new Date(year, month-1, day));
    }
}

OneMoment.addFormatSpecifier('YYYY', date => {
    return date.getFullYear().toString();
});

OneMoment.addFormatSpecifier('MM', date => {
    const month = date.getMonth();
    return month < 10 ? '0'+(month+1) : (month+1).toString();
});

OneMoment.addFormatSpecifier('DD', date => {
    const day = date.getDate();
    return day < 10 ? '0'+day : day.toString();
});

// AMD support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = OneMoment;
}
else {
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return OneMoment;
        });
    }
    else {
        window.OneMoment = OneMoment;
    }
}
