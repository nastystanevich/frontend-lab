const input = document.querySelector('input');
const calcBtn = document.querySelector('button');
const resultBlock = document.querySelector('.result');
class Cacher {
    constructor() {
        this.cacheResult = Object.create(null);
    }
    withCache(fn) {
        return number => {
            const key = number.toString();
            const value = this.cacheResult[key];
            if (value) {
                return `${value} (from cache)`;
            } else {
                const result = fn(number);
                this.cacheResult[key] = result;
                return result;
            }
        }
    }
}

const showResult = () => {
    const inputValue = +input.value;
    if (!inputValue) {
        resultBlock.textContent = 'Enter number';
        return false
    }
    const resultText = cachedFactorial(inputValue);
    resultBlock.textContent = resultText;
    input.value = '';
}

const cacher = new Cacher();
const cachedFactorial = cacher.withCache(math.factorial);
calcBtn.addEventListener('click', showResult);