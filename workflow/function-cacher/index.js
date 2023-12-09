class Cacher {
    constructor() {
        this.arguments = [];
        this.results = [];
    }

    withCache(fun) {
        const that = this;

        return function() {
            let i = -1;
            for(let args of that.arguments) {
                i ++;
                if(JSON.stringify(Array.from(arguments)) === args) {
                    return that.results[i];
                }
            }

            const argumentsArray = Array.from(arguments);
            that.arguments.push(JSON.stringify(argumentsArray));
            const result = fun(...argumentsArray);
            that.results.push(result);
            return result;
        }
    }
}

window.Cacher = Cacher;
