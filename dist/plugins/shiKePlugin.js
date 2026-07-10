/**
 * date-php.js v2.0.0-alpha.1
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
    const baseFigure = {
        1: '\u4e00',
        2: '\u4e8c',
        3: '\u4e09',
        4: '\u56db',
        5: '\u4e94',
        6: '\u516d',
    };
    const lunarTime = ['\u5b50', '\u4e11', '\u5bc5', '\u536f', '\u8fb0', '\u5df3', '\u5348', '\u672a', '\u7533', '\u9149', '\u620c', '\u4ea5'];
    const lunarKe = Object.assign({
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
     * @LastEditTime : 2026-07-09 23:36:02
     */
    const shiKePlugin = {
        name: "shike",
        install: (tChars, ctx) => {
            const dateTime = ctx.dateTime;
            tChars.shi = () => {
                let hour = dateTime.getHours();
                let idx = Math.floor((hour + 1) / 2);
                idx = idx >= 12 ? 0 : idx;
                return lunarTime[idx];
            };
            tChars.ke = () => {
                var _a, _b;
                const hour = dateTime.getHours();
                const ke = Math.floor(dateTime.getMinutes() / 15);
                let geng = Math.floor((hour + 1) / 2);
                if (hour === 23)
                    geng = 0;
                const safeGeng = geng % 8;
                return ((_a = lunarKe[safeGeng]) !== null && _a !== void 0 ? _a : safeGeng) + "\u66f4" + ((_b = lunarKe[ke]) !== null && _b !== void 0 ? _b : ke) + "\u523b";
            };
            tChars.geng = () => {
                const hour = dateTime.getHours();
                let geng = Math.floor((hour + 1) / 2);
                if (hour === 23)
                    geng = 0;
                return geng + 1;
            };
        },
    };

    return shiKePlugin;

}));
