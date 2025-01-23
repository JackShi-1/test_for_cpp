function promiseAll(promises) {
    return new Promise(function (resolve, reject) {
        if (!Array.isArray(promises)) {
            throw new TypeError(`argument must be a array`)
        }
        var resolvedCounter = 0;
        var promiseNum = promises.length;
        var resolvedResult = [];
        for (let i = 0; i < promiseNum; i++) {
            Promise.resolve(promises[i]).then(
                value => {
                    resolvedCounter++;
                    resolvedResult[i] = value;
                    if (resolvedCounter == promiseNum) {
                        return resolve(resolvedResult)
                    }
                }, 
                error => {
                    return reject(error)
                }
            )
        }
    })
}

Promise.race = function (args) {
    return new Promise((resolve, reject) => {
        for (let i = 0, len = args.length; i < len; i++) {
            args[i].then(resolve, reject)
        }
    })
}