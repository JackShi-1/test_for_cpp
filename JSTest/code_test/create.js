function create(obj, properties) {
    function F() { }
    F.prototype = obj
    if (properties) {
        Object.defineProperties(F, properties);
    }
    return new F()
}