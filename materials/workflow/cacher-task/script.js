class Cacher {
    constructor() {
        this.cacheResult = Object.create(null);
    }
    withCache(fn) {
        return number => {
            const key = number.toString();
            const value = this.cacheResult[key];
            if (value) {
                console.log('cache');
                return value;
            } else {
                const result = fn(number);
                this.cacheResult[key] = result;
                console.log('new result');
                return result;
            }
        }
    }
}

const cacher = new Cacher();
const cachedFactorial = cacher.withCache(math.factorial);
console.log(cachedFactorial(7));
console.log(cachedFactorial(7));
console.log(cachedFactorial(5));