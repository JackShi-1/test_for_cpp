// - urls的长度为0时，results就没有值，此时应该返回空数组
// - maxNum大于urls的长度时，应该取的是urls的长度，否则则是取maxNum
// - 需要定义一个count计数器来判断是否已全部请求完成
// - 因为没有考虑请求是否请求成功，所以请求成功或报错都应把结果保存在results集合中
// - results中的顺序需和urls中的保持一致

const concurrencyRequest = (urls, maxNum) => {
    return new Promise((resolve) => {
        if (urls.length === 0) {
            resolve([]);
            return;
        }
        const results = [];
        let index = 0; // 下一个请求的下标
        let count = 0; // 当前请求完成的数量

        // 发送请求
        async function request() {
            if (index === urls.length) return;
            const i = index; // 保存序号，使result和urls相对应
            const url = urls[index];
            index++;
            console.log(url);
            try {
                const resp = await fetch(url);
                // resp 加入到results
                results[i] = resp;
            } catch (err) {
                // err 加入到results
                results[i] = err;
            } finally {
                count++;
                // 判断是否所有的请求都已完成
                if (count === urls.length) {
                    console.log('完成了');
                    resolve(results);
                }
                request();
            }
        }

        // maxNum和urls.length取最小进行调用
        const times = Math.min(maxNum, urls.length);
        for(let i = 0; i < times; i++) {
            request();
        }
    })
}