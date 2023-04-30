function flatMap(arr) {
    let list = []
    arr.forEach(item => {
        if (Array.isArray(item)) {
            const l = flatMap(item)
            list.push(...l)
        } else {
            list.push(item)
        }
    })
    return list
}