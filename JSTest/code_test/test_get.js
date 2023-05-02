// function get(source, path, defaultValue = undefined) {
//     // a[3].b -> a.3.b -> [a, 3, b]
//     const paths =
//         path.replace(/\[(\w+)\]/g, '.$1')
//             .replace(/\["(\w+)"\]/g, '.$1')
//             .replace(/\['(\w+)'\]/g, '.$1')
//             .split('.')
//     let result = source
//     for (const p of paths) {
//         result = result?.[p]
//     }
//     return result === undefined || defaultValue ? defaultValue : result
// }

// const object = { a: [{ b: { c: 3 } }] };
// const result = get(object, 'a[0].b.c',);
// console.log(result);

async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start');
async1();
console.log('script end')