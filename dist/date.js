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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.date = factory());
})(this, (function () { 'use strict';

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
    const lunarTime = ['\u5b50', '\u4e11', '\u5bc5', '\u536f', '\u8fb0', '\u5df3', '\u5348', '\u672a', '\u7533', '\u9149', '\u620c', '\u4ea5'];
    const zodiac = {
        '\u9f20': 'Rat',
        '\u725b': 'OX',
        '\u864e': 'Tiger',
        '\u5154': 'Rabbit',
        '\u9f99': 'Dragon',
        '\u86c7': 'Snake',
        '\u9a6c': 'Horse',
        '\u7f8a': 'Sheep',
        '\u7334': 'Monkey',
        '\u9e21': 'Rooster',
        '\u72d7': 'Dog',
        '\u732a': 'Pig',
    };
    const solar = {
        '\u5c0f\u5bd2': 'Minor Cold',
        '\u5927\u5bd2': 'Major Cold',
        '\u7acb\u6625': 'Start of Spring',
        '\u96e8\u6c34': 'Rain Water',
        '\u60ca\u86f0': 'Awakening of Insects',
        '\u6625\u5206': 'Spring Equinox',
        '\u6e05\u660e': 'Clear and Bright',
        '\u8c37\u96e8': 'Grain Rain',
        '\u7acb\u590f': 'Start of Summer',
        '\u5c0f\u6ee1': 'Grain Buds',
        '\u8292\u79cd': 'Grain in Ear',
        '\u590f\u81f3': 'Summer Solstice',
        '\u5c0f\u6691': 'Minor Heat',
        '\u5927\u6691': 'Major Heat',
        '\u7acb\u79cb': 'Start of Autumn',
        '\u5904\u6691': 'End of Heat',
        '\u767d\u9732': 'White Dew',
        '\u79cb\u5206': 'Autumn Equinox',
        '\u5bd2\u9732': 'Cold Dew',
        '\u971c\u964d': "Frost's Descent",
        '\u7acb\u51ac': 'Start of Winter',
        '\u5c0f\u96ea': 'Minor Snow',
        '\u5927\u96ea': 'Major Snow',
        '\u51ac\u81f3': 'Winter Solstice',
    };
    const lunarKe = Object.assign({
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
    const lMonth = Object.assign({
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

    const calendar = {
        lunarInfo: [
            0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
            0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
            0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
            0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
            0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
            0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
            0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
            0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
            0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
            0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
            0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
            0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
            0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
            0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
            0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
            0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
            0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
            0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
            0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
            0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
            0x0d520
        ],
        solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        nStr1: ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341'],
        nStr2: ['\u521d', '\u5341', '\u5eff', '\u5345'],
        nStr3: ['\u6b63', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341', '\u51ac', '\u814a'],
        lYearDays(Year) {
            let i, sum = 348;
            for (i = 0x8000; i > 0x8; i >>= 1) {
                sum += (this.lunarInfo[Year - 1900] & i) ? 1 : 0;
            }
            return (sum + this.leapDays(Year));
        },
        leapMonth(Year) {
            return (this.lunarInfo[Year - 1900] & 0xf);
        },
        leapDays(Year) {
            return this.leapMonth(Year) ? ((this.lunarInfo[Year - 1900] & 0x10000) ? 30 : 29) : 0;
        },
        monthDays(y, m) {
            if (m > 12 || m < 1) {
                return -1;
            }
            return ((this.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
        },
        solarDays(y, m) {
            if (m > 12 || m < 1) {
                return -1;
            }
            const ms = m - 1;
            return ms === 1 ? (((y % 4 === 0) && (y % 100 != 0) || (y % 400 === 0)) ? 29 : 28) : this.solarMonth[ms];
        },
        toChinaMonth(month) {
            if (month > 12 || month < 1) {
                return -1;
            }
            return `${this.nStr3[month - 1]}\u6708`;
        },
        toChinaDay(day) {
            let s;
            switch (day) {
                case 10:
                    s = '\u521d\u5341';
                    break;
                case 20:
                    s = '\u4e8c\u5341';
                    break;
                case 30:
                    s = '\u4e09\u5341';
                    break;
                default:
                    s = this.nStr2[Math.floor(day / 10)];
                    s += this.nStr1[day % 10];
            }
            return (s);
        },
        solar2lunar(y, m, d) {
            if (y < 1900 || y > 2100) {
                return -1;
            }
            if (y === 1900 && m === 1 && d < 31) {
                return -1;
            }
            const objDate = !y ? new Date() : new Date(y, parseInt(String(m)) - 1, d);
            let i, temp = 0;
            const y2 = objDate.getFullYear(), m2 = objDate.getMonth() + 1, d2 = objDate.getDate();
            let offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
            for (i = 1900; i < 2101 && offset > 0; i++) {
                temp = this.lYearDays(i);
                offset -= temp;
            }
            if (offset < 0) {
                offset += temp;
                i--;
            }
            const isTodayObj = new Date();
            const isToday = isTodayObj.getFullYear() === y2 && isTodayObj.getMonth() + 1 === m2 && isTodayObj.getDate() === d2;
            const cWeek = this.nStr1[objDate.getDay()];
            let nWeek = objDate.getDay() || 7;
            let year = i;
            const leap = this.leapMonth(i);
            let isLeap = false;
            for (i = 1; i < 13 && offset > 0; i++) {
                if (leap > 0 && i === (leap + 1) && isLeap === false) {
                    --i;
                    isLeap = true;
                    temp = this.leapDays(year);
                }
                else {
                    temp = this.monthDays(year, i);
                }
                if (isLeap === true && i === (leap + 1)) {
                    isLeap = false;
                }
                offset -= temp;
            }
            if (offset === 0 && leap > 0 && i === leap + 1) {
                if (isLeap) {
                    isLeap = false;
                }
                else {
                    isLeap = true;
                    --i;
                }
            }
            if (offset < 0) {
                offset += temp;
                --i;
            }
            const month = i;
            const day = offset + 1;
            return {
                'lYear': year,
                'lMonth': month,
                'lDay': day,
                'IMonthCn': (isLeap ? '\u95f0' : '') + this.toChinaMonth(month),
                'IDayCn': this.toChinaDay(day),
                'cYear': y2,
                'cMonth': m2,
                'cDay': d2,
                'isToday': isToday,
                'isLeap': isLeap,
                'nWeek': nWeek,
                'ncWeek': '\u661f\u671f' + cWeek,
                'offset': offset,
            };
        },
        lunar2solar(y, m, d, isLeapMonth) {
            const isLeap = !!isLeapMonth;
            const leapMonth = this.leapMonth(y);
            this.leapDays(y);
            if (isLeap && (leapMonth != m)) {
                return -1;
            }
            if (y === 2100 && m === 12 && d > 1 || y === 1900 && m === 1 && d < 31) {
                return -1;
            }
            const day = this.monthDays(y, m);
            const _day = isLeap ? this.leapDays(y) : day;
            if (y < 1900 || y > 2100 || d > _day) {
                return -1;
            }
            let offset = 0;
            for (let i = 1900; i < y; i++) {
                offset += this.lYearDays(i);
            }
            let leap2 = 0, isAdd = false;
            for (let j = 1; j < m; j++) {
                leap2 = this.leapMonth(y);
                if (!isAdd) {
                    if (leap2 <= j && leap2 > 0) {
                        offset += this.leapDays(y);
                        isAdd = true;
                    }
                }
                offset += this.monthDays(y, j);
            }
            if (isLeap) {
                offset += day;
            }
            const stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
            const calObj = new Date((offset + d - 31) * 86400000 + stmap);
            const cY = calObj.getUTCFullYear();
            const cM = calObj.getUTCMonth() + 1;
            const cD = calObj.getUTCDate();
            return this.solar2lunar(cY, cM, cD);
        },
    };

    /*
     * @Author       : ToviLau 46134256@qq.com
     * @Date         : 2026-07-09 07:45:57
     * @LastEditors  : ToviLau 46134256@qq.com
     * @LastEditTime : 2026-07-09 08:59:20
     */
    const Gan = ['\u7532', '\u4e59', '\u4e19', '\u4e01', '\u620a', '\u5df1', '\u5e9a', '\u8f9b', '\u58ec', '\u7678'];
    const Zhi = ['\u5b50', '\u4e11', '\u5bc5', '\u536f', '\u8fb0', '\u5df3', '\u5348', '\u672a', '\u7533', '\u9149', '\u620c', '\u4ea5'];
    const toGanZhiYear = (lYear) => {
        const ganKey = (lYear - 3) % 10 || 10;
        const zhiKey = (lYear - 3) % 12 || 12;
        return Gan[ganKey - 1] + Zhi[zhiKey - 1];
    };
    const toGanZhi = (offset) => Gan[offset % 10] + Zhi[offset % 12];

    /*
     * @Author       : ToviLau 46134256@qq.com
     * @Date         : 2026-07-09 07:45:41
     * @LastEditors  : ToviLau 46134256@qq.com
     * @LastEditTime : 2026-07-09 09:17:12
     */
    const Animals = ['\u9f20', '\u725b', '\u864e', '\u5154', '\u9f99', '\u86c7', '\u9a6c', '\u7f8a', '\u7334', '\u9e21', '\u72d7', '\u732a'];
    const getAnimal = (year) => Animals[(year - 4) % 12];

    /*
     * @Author       : ToviLau 46134256@qq.com
     * @Date         : 2026-07-09 07:45:41
     * @LastEditors  : ToviLau 46134256@qq.com
     * @LastEditTime : 2026-07-09 10:15:33
     * @Description  : 获取星座
     */
    const toAstro = (cMonth, cDay) => {
        const s = '\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf';
        const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
        // return s.slice(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0) + 2) + '\u5ea7';
        const start = cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0);
        return s.slice(start, start + 2) + '\u5ea7';
    };

    /*
     * @Author       : ToviLau 46134256@qq.com
     * @Date         : 2026-07-09 07:45:41
     * @LastEditors  : ToviLau 46134256@qq.com
     * @LastEditTime : 2026-07-09 09:45:22
     */
    const solarTerm = ['\u5c0f\u5bd2', '\u5927\u5bd2', '\u7acb\u6625', '\u96e8\u6c34', '\u60ca\u86f0', '\u6625\u5206', '\u6e05\u660e', '\u8c37\u96e8', '\u7acb\u590f', '\u5c0f\u6ee1', '\u8292\u79cd', '\u590f\u81f3', '\u5c0f\u6691', '\u5927\u6691', '\u7acb\u79cb', '\u5904\u6691', '\u767d\u9732', '\u79cb\u5206', '\u5bd2\u9732', '\u971c\u964d', '\u7acb\u51ac', '\u5c0f\u96ea', '\u5927\u96ea', '\u51ac\u81f3'];
    const sTermInfo = [
        '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
        '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
        'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
        '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
        '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
        '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
        '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
        '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
        '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
        '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
        '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
        '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
        '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
        '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
        '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
        '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
        '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    ];
    const getTerm = (y, n) => {
        if (y < 1900 || y > 2100) {
            return -1;
        }
        if (n < 1 || n > 24) {
            return -1;
        }
        const _table = sTermInfo[y - 1900];
        const _info = [
            parseInt('0x' + _table.slice(0, 5)).toString(),
            parseInt('0x' + _table.slice(5, 10)).toString(),
            parseInt('0x' + _table.slice(10, 15)).toString(),
            parseInt('0x' + _table.slice(15, 20)).toString(),
            parseInt('0x' + _table.slice(20, 25)).toString(),
            parseInt('0x' + _table.slice(25, 30)).toString(),
        ];
        const _calday = [
            _info[0].slice(0, 1),
            _info[0].slice(1, 3),
            _info[0].slice(3, 4),
            _info[0].slice(4, 6),
            _info[1].slice(0, 1),
            _info[1].slice(1, 3),
            _info[1].slice(3, 4),
            _info[1].slice(4, 6),
            _info[2].slice(0, 1),
            _info[2].slice(1, 3),
            _info[2].slice(3, 4),
            _info[2].slice(4, 6),
            _info[3].slice(0, 1),
            _info[3].slice(1, 3),
            _info[3].slice(3, 4),
            _info[3].slice(4, 6),
            _info[4].slice(0, 1),
            _info[4].slice(1, 3),
            _info[4].slice(3, 4),
            _info[4].slice(4, 6),
            _info[5].slice(0, 1),
            _info[5].slice(1, 3),
            _info[5].slice(3, 4),
            _info[5].slice(4, 6),
        ];
        return parseInt(_calday[n - 1]);
    };

    /*
     * @Author       : ToviLau 46134256@qq.com
     * @Date         : 2026-07-09 07:45:41
     * @LastEditors  : ToviLau 46134256@qq.com
     * @LastEditTime : 2026-07-09 23:25:47
     */
    const lunarPlugin = {
        name: "lunar",
        install: (tChars, ctx) => {
            const dateTime = ctx.dateTime;
            const EMPTY_LUNAR = { lYear: 0, lMonth: 0, IMonthCn: "", IDayCn: ""};
            const lunarResult = calendar.solar2lunar(tChars.Y(), tChars.n(), tChars.j());
            const lunarInfo = typeof lunarResult === "number" ? EMPTY_LUNAR : lunarResult;
            tChars.ly = () => toGanZhiYear(lunarInfo.lYear);
            tChars.lf = () => toGanZhi(lunarInfo.lMonth + 1);
            tChars.lj = () => {
                const base = new Date(1900, 0, 7);
                const diff = Math.floor((dateTime.getTime() - base.getTime()) / 86400000);
                return toGanZhi(diff);
            };
            tChars.lz = () => getAnimal(lunarInfo.lYear);
            tChars.lZ = () => zodiac[getAnimal(lunarInfo.lYear)];
            tChars.lc = () => lunarInfo.lYear;
            tChars.lC = () => textReplace2(lunarInfo.lYear);
            tChars.lm = () => lMonth[lunarInfo.lMonth];
            tChars.lM = () => lunarInfo.lMonth;
            tChars.ld = () => lunarInfo.IDayCn;
            tChars.lF = () => lunarInfo.IMonthCn;
            tChars.la = () => toAstro(tChars.n(), tChars.j());
            tChars.lt = () => lunarTime[Math.floor((tChars.G() >= 23 ? 0 : tChars.G() + 1) / 2)];
            tChars.lg = () => {
                const G = tChars.G();
                return G > 18 || G < 5
                    ? Math.ceil((G < 19 ? G + 24 : G) / 2) - 9
                    : "";
            };
            tChars.lG = () => tChars.lg() ? baseFigure[tChars.lg()] + "\u66f4" : "";
            tChars.lk = () => lunarKe[Math.floor(((tChars.U() + 60 * 60) % (60 * 60 * 2)) / 60 / 15)];
            tChars.ls = () => {
                const month = tChars.n();
                let termDay = getTerm(tChars.Y(), month * 2 - 1);
                if (tChars.j() === termDay)
                    return solarTerm[(month - 1) * 2];
                termDay = getTerm(tChars.Y(), month * 2);
                if (tChars.j() === termDay)
                    return solarTerm[(month - 1) * 2 + 1];
                return "";
            };
            tChars.lS = () => solar[tChars.ls()] || "";
            tChars.lq = () => Math.ceil((tChars.n() - 0) / 3);
            tChars.lQ = () => baseFigure[tChars.lq()];
        },
    };

    /*
     * @Author       : ToviLau 46134256@qq.com
     * @Date         : 2026-07-09 07:45:41
     * @LastEditors  : ToviLau 46134256@qq.com
     * @LastEditTime : 2026-07-09 10:09:38
     */
    const getFestival = (dateObj, date) => {
        const match = dateObj.match(/(\d{4})(\d{2})(\d{2})/);
        if (!match)
            return { cn: [], en: [] };
        const dateArr = match;
        const curDate = new Date(`${dateArr[1]}-${dateArr[2]}-${dateArr[3]}`);
        const getWeekInMonth = () => {
            const d = curDate.getDate();
            const w = curDate.getDay();
            return Math.ceil((d + 6 - w) / 7) - 1;
        };
        const lunarResult = calendar.solar2lunar(Number(dateArr[1]), Number(dateArr[2]), Number(dateArr[3]));
        if (typeof lunarResult === "number")
            return { cn: [], en: [] };
        const lunarInfo = lunarResult;
        lunarInfo.lcDay = pad(lunarInfo.lDay, 2);
        lunarInfo.lcMonth = pad(lunarInfo.lMonth, 2);
        const getDate = [
            dateArr[2] + dateArr[3],
            "*" + lunarInfo.lcMonth + lunarInfo.lcDay,
            "#" + dateArr[2] + getWeekInMonth() + curDate.getDay(),
            "@" +
                pad(Math.ceil((new Date(Number(dateArr[1]), Number(dateArr[2]) - 1, Number(dateArr[3])).getTime() -
                    new Date(Number(dateArr[1]), 0, 1).getTime()) /
                    (60 * 60 * 24 * 1e3)) + 1, 4),
        ];
        let holiday = {
            "0101": ["元旦节", "New year"],
            "0214": ["情人节", `Valentine's day`],
            "0308": ["国际妇女节", `International women's day`],
            "0315": ["国际消费者权益日", `International consumer rights day`],
            "0312": ["植树节", `Arbor day`],
            "0422": ["世界地球日", `Earth day`],
            "0501": ["国际劳动节", `International labour day`],
            "0504": ["青年节", `Youth day`],
            "0512": ["国际护士节", `International nurses day`],
            "0518": ["国际博物馆日", `International museum day`],
            "0601": ["国际儿童节", `International children's day`],
            "0605": ["世界环境日", `World environment day`],
            "0623": ["国际奥林匹克日", `International olympic day`],
            "0624": ["世界骨质疏松日", `World osteoporosis day`],
            "0701": ["建党节", `Party's building day`],
            "0801": ["建军节", `Army's day`],
            "0910": ["教师节", `Teacher's day`],
            "1001": ["国庆", "National day"],
            "1024": ["中国程序员节", `Chinese programmer's day`],
            "1224": ["平安夜", `Christmas Eve`],
            "1225": ["圣诞节", `Christmas Day`],
            "1226": ["毛泽东诞辰", `Zedong Mao birthday`],
            "1117": ["世界学生日", `World student's day`],
            "1201": ["世界艾滋病日", `World AIDS day`],
            "*0101": ["春节", "Chinese year"],
            "*0115": ["元宵节", "Lantern day"],
            "*0202": ["龙头节", "Dragon head day"],
            "*0505": ["端午节", "Dragon boat day"],
            "*0707": ["乞巧节", "Qi qiao day"],
            "*0715": ["中元节", "Ghost day"],
            "*0815": ["中秋节", "Moon day"],
            "*0909": ["重阳节", "Chongyang day"],
            "*1001": ["寒衣节", "Winter clothing day"],
            "*1015": ["下元节", "Xiayuan day"],
            "*1208": ["腊八节", "Laba day"],
            "*1223": ["祭灶节", "Stove day"],
            "*1229": lunarInfo.isLeap ? ["除夕", `Year's Eve`] : undefined, // 闰年除夕在12月29日
            "*1230": lunarInfo.isLeap ? undefined : ["除夕", `Year's Eve`], // 非闰年除夕在12月30日
            "#0520": ["母亲节", `Mother's day`],
            "#0630": ["父亲节", `Father's day`],
            "@0256": ["俄罗斯程序员节", `Russian programmer's day`],
        };
        if (date.replaceHolidayConf)
            holiday = date.replaceHolidayConf;
        if (date.editHolidayConf)
            Object.assign(holiday, date.editHolidayConf);
        const festivalList = {
            cn: [],
            en: [],
        };
        getDate.forEach((res) => {
            if (holiday && holiday[res]) {
                festivalList.cn.push(holiday[res][0]);
                festivalList.en.push(holiday[res][1]);
            }
        });
        return festivalList;
    };

    /*
     * @Author       : ToviLau 46134256@qq.com
     * @Date         : 2026-07-09 07:45:41
     * @LastEditors  : ToviLau 46134256@qq.com
     * @LastEditTime : 2026-07-09 09:15:55
     */
    const holidayPlugin = {
        name: "holiday",
        install: (tChars, ctx) => {
            const date = ctx.date;
            tChars.fh = () => (getFestival(tChars.Y() + tChars.m() + tChars.d(), date).cn || []).join();
            tChars.lh = () => (getFestival(tChars.Y() + tChars.m() + tChars.d(), date).en || []).join();
        },
    };

    /*
     * @Author       : ToviLau 46134256@qq.com
     * @Date         : 2026-07-09 07:45:41
     * @LastEditors  : ToviLau 46134256@qq.com
     * @LastEditTime : 2026-07-09 09:17:58
     */
    date.use([lunarPlugin, holidayPlugin]);

    return date;

}));
