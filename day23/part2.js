module.exports = function() {
    var a = 1,
        b = 0,
        c = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0;
    var b = 84;
    var c = b;
    if (a !== 0) {
        b = b * 100;
        b = b + 100000;
        c = b + 17000;
    }
    do {
        f = true;
        d = 2;
        do {
            if (b / d % 1 === 0) {
                f = false;
                break;
            }
            d++;
        } while (d !== b)
        if (!f) {
            h = h + 1;
        }
        g = b - c;
        if (b === c) {
            return h;
        }
        b = b + 17;
    } while (g !== 0)
}