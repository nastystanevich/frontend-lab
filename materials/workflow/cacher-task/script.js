const input = document.querySelector('input');
const calcBtn = document.querySelector('button');
const resultBlock = document.querySelector('.result');
class Cacher {
    constructor() {
        this.cacheResult = Object.create(null);
    }
    withCache(fn) {
        return number => {
            const value = this.cacheResult[number];
            if (value) {
                return `${value} (from cache)`;
            } else {
                let result = fn(math.bignumber(number));
                this.cacheResult[number] = result;
                return result;
            }
        }
    }
}

const showResult = () => {
    const inputValue = input.value;
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