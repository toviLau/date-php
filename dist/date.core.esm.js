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
const typeOf = (val) => {
    var _a, _b, _c;
    if (val === null)
        return "null";
    if (val === undefined)
        return "undefined";
    const t = typeof val;
    if (t !== "object" && t !== "function")
        return t;
    return (_c = (_b = (_a = Object.prototype.toString.call(val).match(/(\w*)\S$/)) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : "object";
};
const pad = (str, len, placeholder = '0') => {
    const s = String(str);
    return s.length < len ? new Array(++len - s.length).join(placeholder) + s : s;
};
const longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const txt_ordin = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    21: 'st',
    22: 'nd',
    23: 'rd',
    31: 'st',
};
const txt_months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const defP = (obj, key, val) => {
    Object.defineProperty(obj, key, {
        get: () => val,
        configurable: true,
    });
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
const weekDay = Object.assign({
    0: '\u65e5',
}, baseFigure);
const dateFigure = Object.assign({
    0: '\u3007', 7: '\u4e03', 8: '\u516b', 9: '\u4e5d', 10: '\u5341',
    20: '\u5eff', 30: '\u5345',
}, baseFigure);
Object.assign({
    7: '\u4e03', 8: '\u516b', 9: '\u4e5d', 10: '\u5341', 11: '\u51ac', 12: '\u814a',
}, baseFigure);
const textReplace = (res) => res.toString()
    .split('')
    .reverse()
    .map((val, key) => {
    const v = Math.pow(10, key) * Number(val);
    return v ? dateFigure[v] : '';
})
    .reverse()
    .join('');
const textReplace2 = (succ) => (succ + '').split('').map((res) => dateFigure[Number(res)]).join('');

/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:19
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-09 10:41:33
 */
const TIMEZONE_MAP = {
    "GMT-12": "Etc/GMT+12",
    "GMT-11": "Pacific/Midway",
    "GMT-10": "Asia/Vladivostok",
    "GMT-9": "Asia/Tokyo",
    "GMT-8": "Asia/Shanghai",
    "GMT-7": "Asia/Bangkok",
    "GMT-6": "Asia/Dhaka",
    "GMT-5": "Asia/Karachi",
    "GMT-4": "Asia/Baku",
    "GMT-3": "Europe/Moscow",
    "GMT-2": "Europe/Kiev",
    "GMT-1": "Europe/Paris",
    "GMT+0": "Europe/London",
    "GMT+1": "Atlantic/Azores",
    "GMT+2": "Atlantic/South_Georgia",
    "GMT+3": "America/Montevideo",
    "GMT+4": "America/Halifax",
    "GMT+5": "America/New_York",
    "GMT+6": "America/Chicago",
    "GMT+7": "America/Denver",
    "GMT+8": "America/Los_Angeles",
    "GMT+9": "America/Anchorage",
    "GMT+10": "Pacific/Honolulu",
    "GMT+11": "Pacific/Midway",
    "GMT+12": "Etc/GMT+12",
    "GMT-3:30": "Asia/Tehran",
    "GMT-4:30": "Asia/Kabul",
    "GMT-5:30": "Asia/Kolkata",
    "GMT-5:45": "Asia/Kathmandu",
    "GMT-6:30": "Asia/Rangoon",
    "GMT-8:45": "Australia/Eucla",
    "GMT-9:30": "Australia/Adelaide",
    "GMT-10:30": "Australia/Lord_Howe",
    "GMT+3:30": "Canada/Newfoundland",
    "GMT+4:30": "America/La_Paz",
    "GMT+5:30": "America/Indianapolis",
    "GMT+9:30": "Pacific/Marquesas",
    "UTC+12": "Etc/GMT+12",
    "UTC+11": "Pacific/Midway",
    "UTC+10": "Asia/Vladivostok",
    "UTC+9": "America/Anchorage",
    "UTC+8": "Asia/Shanghai",
    "UTC+7": "Asia/Bangkok",
    "UTC+6": "Asia/Dhaka",
    "UTC+5": "Asia/Karachi",
    "UTC+4": "Asia/Baku",
    "UTC+3": "Europe/Moscow",
    "UTC+2": "Europe/Kiev",
    "UTC+1": "Europe/Paris",
    "UTC+0": "Europe/London",
    "UTC-1": "Atlantic/Azores",
    "UTC-2": "Atlantic/South_Georgia",
    "UTC-3": "America/Montevideo",
    "UTC-4": "America/Halifax",
    "UTC-5": "America/New_York",
    "UTC-6": "America/Chicago",
    "UTC-7": "America/Denver",
    "UTC-8": "America/Los_Angeles",
    "UTC-9": "America/Anchorage",
    "UTC-10": "Pacific/Honolulu",
    "UTC-11": "Pacific/Midway",
    "UTC-12": "Etc/GMT+12",
    "UTC+3:30": "Asia/Tehran",
    "UTC+4:30": "Asia/Kabul",
    "UTC+5:30": "Asia/Kolkata",
    "UTC+5:45": "Asia/Kathmandu",
    "UTC+6:30": "Asia/Rangoon",
    "UTC+8:45": "Australia/Eucla",
    "UTC+9:30": "Australia/Adelaide",
    "UTC+10:30": "Australia/Lord_Howe",
    "UTC-3:30": "Canada/Newfoundland",
    "UTC-4:30": "America/La_Paz",
    "UTC-5:30": "America/Indianapolis",
    "UTC-9:30": "Pacific/Marquesas",
};
const getOffsetInfo = (d, tz) => {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZoneName: "longOffset",
    }).formatToParts(d);
    const offsetPart = parts.find((p) => p.type === "timeZoneName");
    const offsetStr = offsetPart ? offsetPart.value : "";
    const match = offsetStr.match(/([+-])(\d{2}):?(\d{2})/);
    if (match) {
        const sign = match[1];
        const hours = parseInt(match[2], 10);
        const minutes = parseInt(match[3], 10);
        return {
            sign: sign,
            hours: hours,
            minutes: minutes,
            offsetStr: offsetStr,
            O: sign + pad(hours, 2) + pad(minutes, 2),
            P: sign + pad(hours, 2) + ":" + pad(minutes, 2),
        };
    }
    const fallbackOffset = -d.getTimezoneOffset();
    const fallbackSign = fallbackOffset >= 0 ? "+" : "-";
    const fallbackHours = Math.floor(Math.abs(fallbackOffset) / 60);
    const fallbackMinutes = Math.abs(fallbackOffset) % 60;
    return {
        sign: fallbackSign,
        hours: fallbackHours,
        minutes: fallbackMinutes,
        offsetStr: fallbackSign + pad(fallbackHours, 2) + ":" + pad(fallbackMinutes, 2),
        O: fallbackSign + pad(fallbackHours, 2) + pad(fallbackMinutes, 2),
        P: fallbackSign + pad(fallbackHours, 2) + ":" + pad(fallbackMinutes, 2),
    };
};

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

const VALID_UNITS = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"];
const _throwError = (msg) => {
    throw new Error("[date-php] " + msg);
};
const _hasUnit = (unit) => VALID_UNITS.includes(unit);
class DateChain {
    constructor(dateTime) {
        this._date = new Date(dateTime === undefined ? Date.now() : dateTime);
        const _dateString = this._date.toLocaleString();
        Object.defineProperty(this, "valueOf", {
            get: () => {
                return () => (_dateString === "Invalid Date" ? new Date() : this._date);
            },
            set: (val) => new Date(val),
        });
    }
    add(numOrObj, unit) {
        if (numOrObj !== null && typeof numOrObj === "object") {
            Object.entries(numOrObj).forEach(([key, value]) => {
                if (_hasUnit(key))
                    this.add(value, key);
            });
            return this;
        }
        let num;
        let resolvedUnit = unit;
        if (typeof numOrObj === "string" && _hasUnit(numOrObj)) {
            resolvedUnit = numOrObj;
            num = 1;
        }
        else {
            num = numOrObj;
        }
        if (num === null || num === undefined || isNaN(num)) {
            _throwError("add 方法参数错误: num 必须是有效数字");
        }
        const d = this._date;
        const Y = d.getFullYear();
        const n = d.getMonth();
        const j = d.getDate();
        switch (resolvedUnit) {
            case "year": {
                const targetY = Y + num;
                const maxDay = new Date(targetY, n + 1, 0).getDate();
                d.setFullYear(targetY, n, Math.min(j, maxDay));
                break;
            }
            case "month": {
                const targetN = n + num;
                const maxDay = new Date(Y, targetN + 1, 0).getDate();
                d.setFullYear(Y, targetN, Math.min(j, maxDay));
                break;
            }
            case "week":
                d.setDate(j + num * 7);
                break;
            case "day":
                d.setDate(j + num);
                break;
            case "hour":
                d.setHours(d.getHours() + num);
                break;
            case "minute":
                d.setMinutes(d.getMinutes() + num);
                break;
            case "second":
                d.setSeconds(d.getSeconds() + num);
                break;
            case "millisecond":
                d.setMilliseconds(d.getMilliseconds() + num);
                break;
        }
        return this;
    }
    sub(num, unit) {
        return this.add(-num, unit);
    }
    prev(num, unit) {
        if (typeof num !== "number")
            _throwError("prev 方法参数 num 必须为数字");
        if (typeof unit === "string" && !_hasUnit(unit))
            _throwError("prev 方法参数 unit 必须为有效的时间单位");
        return this.add(-Math.abs(num), unit);
    }
    next(num, unit) {
        if (typeof num !== "number")
            _throwError("next 方法参数 num 必须为数字");
        if (typeof unit === "string" && !_hasUnit(unit))
            _throwError("next 方法参数 unit 必须为有效的时间单位");
        return this.add(Math.abs(num), unit);
    }
    startOfDay() {
        const d = this._date;
        d.setHours(0, 0, 0, 0);
        return this;
    }
    endOfDay() {
        const d = this._date;
        d.setHours(23, 59, 59, 999);
        return this;
    }
    startOfWeek() {
        const d = this._date;
        const day = d.getDay();
        d.setDate(d.getDate() - day);
        d.setHours(0, 0, 0, 0);
        return this;
    }
    endOfWeek() {
        const d = this._date;
        const day = d.getDay();
        d.setDate(d.getDate() + (6 - day));
        d.setHours(23, 59, 59, 999);
        return this;
    }
    startOfMonth() {
        const d = this._date;
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        return this;
    }
    endOfMonth() {
        const d = this._date;
        d.setMonth(d.getMonth() + 1, 0);
        d.setHours(23, 59, 59, 999);
        return this;
    }
    startOfYear() {
        const d = this._date;
        d.setMonth(0, 1);
        d.setHours(0, 0, 0, 0);
        return this;
    }
    endOfYear() {
        const d = this._date;
        d.setMonth(11, 31);
        d.setHours(23, 59, 59, 999);
        return this;
    }
    isBefore(dateTime) {
        return this._date.getTime() < new Date(dateTime).getTime();
    }
    isAfter(dateTime) {
        return this._date.getTime() > new Date(dateTime).getTime();
    }
    isSame(dateTime, unit = "day") {
        const date = this.constructor._dateFn;
        const a = date("all", this._date);
        const b = date("all", new Date(dateTime));
        switch (unit) {
            case "year":
                return a.Y === b.Y;
            case "month":
                return a.Y === b.Y && a.n === b.n;
            case "week": {
                const aStart = new Date(this._date);
                aStart.setDate(aStart.getDate() - aStart.getDay());
                aStart.setHours(0, 0, 0, 0);
                const bStart = new Date(dateTime);
                bStart.setDate(bStart.getDate() - bStart.getDay());
                bStart.setHours(0, 0, 0, 0);
                return aStart.getTime() === bStart.getTime();
            }
            case "day":
                return a.Y === b.Y && a.n === b.n && a.j === b.j;
            case "hour":
                return a.Y === b.Y && a.n === b.n && a.j === b.j && a.G === b.G;
            case "minute":
                return a.Y === b.Y && a.n === b.n && a.j === b.j && a.G === b.G && a.i === b.i;
            case "second":
                return a.Y === b.Y && a.n === b.n && a.j === b.j && a.G === b.G && a.i === b.i && a.s === b.s;
            default:
                return this._date.getTime() === new Date(dateTime).getTime();
        }
    }
    isSameMonth(dateTime) {
        return this.isSame(dateTime, "month");
    }
    isSameYear(dateTime) {
        return this.isSame(dateTime, "year");
    }
    format(tplChars = "Y-m-d") {
        const date = this.constructor._dateFn;
        return date(tplChars, this._date);
    }
    toDate() {
        return new Date(this._date);
    }
    toString() {
        return this.valueOf().toString();
    }
}

/**
 * date-php.js v__VERSION__
 */
const isDate = (d) => {
    if (d === null || d === undefined)
        return false;
    // if (d instanceof Date) return !isNaN(d.getTime());
    return new Date(d).toString() !== "Invalid Date";
};
const getLang = () => {
    if (typeof navigator !== "undefined" && navigator.language)
        return navigator.language;
    const g = globalThis;
    if (typeof g.process !== "undefined" && g.process && typeof g.process === "object") {
        const env = g.process.env;
        const locale = (env === null || env === void 0 ? void 0 : env.LANG) || (env === null || env === void 0 ? void 0 : env.LC_ALL);
        if (locale)
            return locale.split(".")[0].replace("_", "-");
    }
    return "zh-CN";
};
const lang = getLang();
const log = (msg, type = "warn", color) => typeof console === "undefined"
    ? undefined
    : color
        ? console[type]("%c[date-php] " + msg, color)
        : console[type]("[date-php] " + msg);
const date = function (templateOrOptions, dateTime = new Date(), isMs = true) {
    var _a, _b, _c, _d;
    let template = "Y-m-d";
    if (templateOrOptions !== undefined && typeof templateOrOptions === "object") {
        template = (_a = templateOrOptions.template) !== null && _a !== void 0 ? _a : "Y-m-d";
        dateTime = (_b = templateOrOptions.dateTime) !== null && _b !== void 0 ? _b : new Date();
        isMs = (_c = templateOrOptions.isMs) !== null && _c !== void 0 ? _c : true;
    }
    else {
        template = (_d = templateOrOptions) !== null && _d !== void 0 ? _d : "Y-m-d";
    }
    if (typeof template !== "string") {
        log("参数1必须为字符串类型/Param 1 must be string.");
        template = "Y-m-d H:i:s";
    }
    const currentTimeZone = TIMEZONE_MAP[date.timeZone] || date.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!isDate(dateTime)) {
        let receivedType = typeOf(dateTime);
        dateTime = new Date();
        log(((D, type) => "" +
            "参数2有误请传入/Invalid parameter 2.\n" +
            "预期类型/Expected: Date | string | number (timestamp)\n" +
            `接到类型/Received: ${type}\n` +
            "参考值/Examples:\n" +
            `  1. "${D}"\n` +
            `  2. "${D.toUTCString()}"\n` +
            `  3. "${date("Y-m-d H:i", Date.now())}"\n` +
            `  3. "${date("Y-m-d", Date.now())}"\n` +
            `  4. "new Date()"\n` +
            `  5. ${D.getTime()}\n`)(new Date(), receivedType));
    }
    if ([false, 0].includes(isMs) && typeof dateTime === "number")
        dateTime = dateTime * 1000;
    const _now = isDate(this) ? this : isDate(dateTime) ? new Date(dateTime) : new Date();
    dateTime = new Date(new Date(_now).toLocaleString(lang, {
        timeZone: TIMEZONE_MAP[date.timeZone] || date.timeZone,
    }));
    const _nowDate = dateTime;
    const _year = _nowDate.getFullYear();
    const _month = _nowDate.getMonth() + 1;
    const _yearStart = new Date(_year, 0, 1);
    const _janOffset = getOffsetInfo(new Date(_year, 0, 1), currentTimeZone);
    const _julOffset = getOffsetInfo(new Date(_year, 6, 1), currentTimeZone);
    const tChars = {
        d: () => pad(tChars.j(), 2),
        k: () => textReplace(tChars.j()),
        D: () => tChars.l().slice(0, 3),
        j: () => dateTime.getDate(),
        l: () => longDays[tChars.w()],
        N: () => (tChars.w() === 0 ? 7 : tChars.w()),
        S: () => (txt_ordin[tChars.j()] ? txt_ordin[tChars.j()] : "th"),
        w: () => dateTime.getDay(),
        K: () => weekDay[tChars.w()],
        z: () => Math.ceil((_nowDate.getTime() - _yearStart.getTime()) / (60 * 60 * 24 * 1e3)),
        W: () => {
            const d = new Date(_nowDate);
            d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
            const jan4 = new Date(d.getFullYear(), 0, 4);
            return 1 + Math.round(((d.getTime() - jan4.getTime()) / 864e5 - 3 + ((jan4.getDay() + 6) % 7)) / 7);
        },
        F: () => txt_months[tChars.n()],
        f: () => textReplace(tChars.n()),
        M: () => tChars.F().slice(0, 3),
        m: () => pad(tChars.n(), 2),
        n: () => _month,
        t: () => {
            const date = new Date(_year, _month, 0);
            return date.getDate();
        },
        L: () => Number(tChars.Y() % 400 === 0 || (tChars.Y() % 100 !== 0 && tChars.Y() % 4 === 0)),
        o: () => {
            const d = new Date(_nowDate);
            d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
            return d.getFullYear();
        },
        Y: () => _year,
        y: () => (tChars.Y() + "").slice(2),
        C: () => textReplace2(tChars.Y()),
        a: () => (tChars.G() > 11 ? "pm" : "am"),
        A: () => tChars.a().toUpperCase(),
        B: () => {
            const SECONDS_PER_BEAT = 86.4;
            const BEATS_PER_DAY = 1000;
            const bmtOffsetMinutes = dateTime.getTimezoneOffset() + 60;
            const totalSeconds = tChars.G() * 3600 +
                dateTime.getMinutes() * 60 +
                dateTime.getSeconds() +
                bmtOffsetMinutes * 60;
            let beat = Math.floor(totalSeconds / SECONDS_PER_BEAT);
            beat = ((beat % BEATS_PER_DAY) + BEATS_PER_DAY) % BEATS_PER_DAY;
            return pad(beat, 3);
        },
        g: () => tChars.G() % 12 || 12,
        G: () => dateTime.getHours(),
        h: () => pad(tChars.g(), 2),
        H: () => pad(tChars.G(), 2),
        i: () => pad(dateTime.getMinutes(), 2),
        s: () => pad(dateTime.getSeconds(), 2),
        u: () => tChars.v() * 1e3 + ~~(((typeof performance !== "undefined" ? performance.now() : Date.now()) % 1) * 1e3),
        v: () => Number((_now.getTime() + "").slice(-3)) - 0,
        e: () => TIMEZONE_MAP[date.timeZone] || date.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        O: () => getOffsetInfo(dateTime, currentTimeZone).O,
        P: () => getOffsetInfo(dateTime, currentTimeZone).P,
        I: () => {
            if (_janOffset.O !== _julOffset.O) {
                const infoNow = getOffsetInfo(_nowDate, currentTimeZone);
                return infoNow.O === _julOffset.O ? 1 : 0;
            }
            return 0;
        },
        T: () => {
            const parts = new Intl.DateTimeFormat(lang, {
                timeZoneName: "short",
                timeZone: TIMEZONE_MAP[date.timeZone] || date.timeZone,
            })
                .formatToParts(dateTime)
                .find((part) => part.type === "timeZoneName");
            return parts ? parts.value : "";
        },
        Z: () => {
            const info = getOffsetInfo(dateTime, currentTimeZone);
            const totalMinutes = info.hours * 60 + info.minutes;
            return (info.sign === "+" ? 1 : -1) * totalMinutes * 60;
        },
        c: () => tChars.Y() +
            "-" +
            tChars.m() +
            "-" +
            tChars.d() +
            "T" +
            tChars.h() +
            ":" +
            tChars.i() +
            ":" +
            tChars.s() +
            "." +
            tChars.v() +
            tChars.P(),
        r: () => dateTime.toString(),
        U: () => Math.round(dateTime.getTime() / 1e3),
        R: () => {
            const nowTs = Date.now();
            const baseTs = tChars.U() * 1e3;
            const diff = isMs ? nowTs - baseTs : ~~((nowTs - baseTs) / 1e3);
            const absDiff = Math.abs(diff);
            const intervals = {
                [date.rowUnitConf.Year]: 31536e6,
                [date.rowUnitConf.Month]: 2592e6,
                [date.rowUnitConf.Week]: 6048e5,
                [date.rowUnitConf.Day]: 864e5,
                [date.rowUnitConf.Hour]: 36e5,
                [date.rowUnitConf.Minute]: 6e4,
                [date.rowUnitConf.Second]: 1e3,
            };
            if (diff > 0 && absDiff <= (isMs ? date.rowUnitConf.threshold : date.rowUnitConf.threshold / 1e3))
                return date.rowUnitConf.justNow;
            const suffix = diff > 0 ? date.rowUnitConf.before : date.rowUnitConf.after;
            for (const unit in intervals) {
                const _ms = isMs ? intervals[unit] : ~~(intervals[unit] / 1e3);
                if (absDiff >= _ms) {
                    return Math.floor(absDiff / _ms) + unit + suffix;
                }
            }
            return "";
        },
    };
    const ctx = { dateTime: dateTime, tChars, date, pad, _now, isMs };
    date._plugins.forEach((plugin) => {
        plugin.install(tChars, ctx);
    });
    if (template === "json" || template === "all" || template === "-1") {
        const json = {};
        Object.keys(tChars).forEach((res) => (json[res] = tChars[res]()));
        return json;
    }
    return template.replace(/\\?(([lf][a-z])|([a-z]))/gi, (res, key) => res !== key ? key : tChars[key] ? String(tChars[key]()) : key.replace("\\", ""));
};
date._plugins = [];
date.use = (plugin) => {
    if (Array.isArray(plugin)) {
        plugin.forEach((p) => {
            date._plugins.push(p);
        });
    }
    else {
        date._plugins.push(plugin);
    }
    return date;
};
date.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
date.rowUnitConf = Object.assign({
    threshold: 3e4,
    Year: "\u5e74",
    Month: "\u6708",
    Week: "\u5468",
    Day: "\u5929",
    Hour: "\u5c0f\u65f6",
    Minute: "\u5206\u949f",
    Second: "\u79d2",
    justNow: "\u521a\u521a",
    before: "\u524d",
    after: "\u540e",
}, date.rowUnitConf || {});
defP(Date.prototype, "format", date);
defP(date, "version", "2.0.0-alpha.2");
defP(date, "description", () => log("\u6b64 API \u5df2\u7ecf\u5e9f\u5f03\uff0c\u67e5\u770b\u4f7f\u7528\u8bf4\u660e\u8bf7\u79fb\u6b65\u8fd9\u91cc\nhttps://github.com/toviLau/date-php/blob/master/README.md", "warn", "color:#c30"));
const _apiMap = { duration };
Object.keys(_apiMap).forEach((res) => {
    defP(date, res, _apiMap[res]);
});
DateChain._dateFn = date;
date.chain = (dateTime) => new DateChain(dateTime);

export { date as default };
