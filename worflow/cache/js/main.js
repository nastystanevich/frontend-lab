'use strict'

const inputValue = document.querySelector('.inputValue');
const calcBtn = document.querySelector('.calcBtn');
const result = document.querySelector('.result');

class Cacher {
    constructor() {
        this.cache = {};
    };
    withCache(inputFunction) {
        for (const key in this.cache) {
            if (this.cache[key]) {
                return this.cache[key];
            } else {
                return this.cache[key] = inputFunction(...args);
            };
        };  
    };
};

const cacher = new Cacher();
const cachedCalculation = cacher.withCache(calculation);

function calculation(arg) {
    return Math.pow(arg, 3);
};

calcBtn.addEventListener('click', () => result.textContent = `Результат: ${cachedCalculation(inputValue.value)}`);

