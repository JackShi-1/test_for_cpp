function get(source, path, defaultValue = undefined) {
    // a[3].b -> a.3.b -> [a, 3, b]
    const paths =
        path.replace(/\[(\w+)\]/g, '.$1')
            .replace(/\["(\w+)"\]/g, '.$1')
            .replace(/\['(\w+)'\]/g, '.$1')
            .split('.')
    let result = source
    for (const p of paths) {
        result = result?.[p]
    }
    return result === undefined || defaultValue ? defaultValue : result
}

const object = { a: [{ b: { c: 3 } }] };
const result = get(object, 'a[0].b.c',);
console.log(result);