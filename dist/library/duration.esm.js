/**
 * date-php.js v2.0.0-alpha.2
 *   :-) date('Y-m-d', 1563148800000) - 这是一个Javascript模仿PHP日期时间格式化函数，使用方法和PHP非常类似，有丰富的模板字符，并在原来的基础上增强了一些模板字符。例如：中国的农历日期、用汉字来表示日期、十二生肖与星座。让转换日期时间更自由。
 *   This is a Javascript mimicking PHP datetime formatting function. It is very similar to PHP, has rich template 
 *   characters, and enhances some template characters on the basis of the original. For example: Chinese Lunar Date,
 *   Chinese Character Date, Chinese Zodiac and Constellation. Make the conversion datetimes more free.
 *   
 *     -- repository https://github.com/toviLau/date-php.git
 *
 *   (c) 2019-2026 ToviLau. Released under the MIT License. 
 **/
/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-10 00:30:40
 */
const pad = (str, len, placeholder = '0') => {
    const s = String(str);
    return s.length < len ? new Array(++len - s.length).join(placeholder) + s : s;
};
const baseFigure = {
    1: '\u4e00',
    2: '\u4e8c',
    3: '\u4e09',
    4: '\u56db',
    5: '\u4e94',
    6: '\u516d',
};
Object.assign({
    0: '\u96f6',
    7: '\u4e03',
}, baseFigure);
Object.assign({
    0: '\u65e5',
}, baseFigure);
Object.assign({
    0: '\u3007', 7: '\u4e03', 8: '\u516b', 9: '\u4e5d', 10: '\u5341',
    20: '\u5eff', 30: '\u5345',
}, baseFigure);
Object.assign({
    7: '\u4e03', 8: '\u516b', 9: '\u4e5d', 10: '\u5341', 11: '\u51ac', 12: '\u814a',
}, baseFigure);

/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-09 23:38:55
 */
const duration = (template = "D天h:i:s", timestamp = 0, isMs = true) => {
    const conversion = {
        y: 12,
        m: 30.436875,
        d: 24,
        h: 60,
        i: 60,
        s: 1000,
        v: 1000,
    };
    const tChars = {
        y: () => tChars.Y(),
        Y: () => Math.floor(Number(tChars.M()) / conversion.y),
        m: () => pad(tChars.n(), 2),
        n: () => Number(tChars.M()) % conversion.y,
        M: () => Math.floor(Number(tChars.D()) / conversion.m),
        d: () => pad(tChars.j(), 2),
        j: () => Math.floor(Number(tChars.D()) % conversion.m),
        D: () => Math.floor(Number(tChars.H()) / conversion.d),
        h: () => pad(tChars.g(), 2),
        g: () => Math.floor(Number(tChars.H()) % conversion.d),
        H: () => Math.floor(Number(tChars.I()) / conversion.h),
        i: () => pad(Math.floor(Number(tChars.I()) % conversion.h), 2),
        I: () => Math.floor(Number(tChars.S()) / conversion.i),
        s: () => pad(Math.floor(Number(tChars.S()) % conversion.i), 2),
        S: () => Math.floor(Number(tChars.V()) / conversion.s),
        v: () => pad(Math.floor(Number(tChars.V()) % conversion.s), 3),
        V: () => {
            const time = Math.abs(timestamp);
            if (isMs)
                return time;
            const converted = time * conversion.v;
            return converted <= Number.MAX_SAFE_INTEGER ? converted : Number.MAX_SAFE_INTEGER;
        },
    };
    if (template === "json" || template === "all" || template === "-1") {
        const json = {};
        Object.keys(tChars).forEach((res) => (json[res] = tChars[res]()));
        return json;
    }
    return template.replace(/(\\?([a-z]))/gi, (res, key) => res !== key ? key : tChars[key] ? String(tChars[key]()) : key.replace("\\", ""));
};

export { duration };
