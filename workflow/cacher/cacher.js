class Cacher {
    withCache(methodProcessingData) {
        function cachingDecorator(methodProcessingData) {
            const cachedResults = new Map();
            return function(...args) {
                const key = args.toString();
                if (cachedResults.has(key)) {
                    return cachedResults.get(key);
                }

                const result = methodProcessingData.call(this, ...args);
                cachedResults.set(key, result);
                return result;
            };
        }
        return cachingDecorator(methodProcessingData);
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

const cacherFactorial = cacher.withCache(getFactorial);

const form = document.getElementById('form');

form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    let data = formData.get('data');
    form.result.value = cacherFactorial(data);
};
