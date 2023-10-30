class Cacher {
    withCache(func) {
        function cachingDecorator(func) {
            let cache = new Map();
            return function(...args) {
                const key = args.toString();
                if (cache.has(key)) {
                    console.log ('вернул из кэша');
                    return cache.get(key);
                }

                const result = func.call(this, ...args);
                console.log(result);
                console.log ('создал новый');
                cache.set(key, result);
                return result;
            };
        }
        return cachingDecorator(func);
    }
}

const cacher = new Cacher();

function getFactorial (number) {
    let answer = 1n;
    if (number === "0" || number === "1"){
        return answer;
    }
    else if(number > 1){
        for(let i = number; i >= 1; i--){
            answer = answer * BigInt(i);
        }
        return answer;
    }
}
// function getPow(a,b) {
//     return a ** b;
// }

const cacherFactorial = cacher.withCache(getFactorial);
// const cacherPow = cacher.withCache(getPow);

// console.log('Factorial of a number "130": ', cacherFactorial(130));
// console.log('Factorial of a number "140": ', cacherFactorial(140));
// console.log('Factorial of a number "130": ', cacherFactorial(130));
// console.log('Factorial of a number "140": ', cacherFactorial(140));
// console.log('2 to the power of 4: ',cacherPow(2, 4));
// console.log('2 to the power of 4: ',cacherPow(2, 4));
// console.log('2 to the power of 3: ',cacherPow(2, 3));
// console.log('2 to the power of 3: ',cacherPow(2, 3));
const form = document.getElementById('form');

form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    let data = formData.get('data');
    form.result.value = cacherFactorial(data);
};
