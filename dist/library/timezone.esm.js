/**
 * date-php.js v2.0.0-alpha.3
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

export { TIMEZONE_MAP, getOffsetInfo };
