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
     * @LastEditTime : 2026-07-09 09:16:15
     */
    const solarTermPlugin = {
        name: "solarterm",
        install: (tChars, ctx) => {
            tChars.term = () => {
                const month = tChars.n();
                let termDay = getTerm(tChars.Y(), month * 2 - 1);
                if (tChars.j() === termDay)
                    return solarTerm[(month - 1) * 2];
                termDay = getTerm(tChars.Y(), month * 2);
                if (tChars.j() === termDay)
                    return solarTerm[(month - 1) * 2 + 1];
                return "";
            };
            tChars.termEn = () => solar[tChars.term()] || "";
            tChars.termDay = () => {
                const month = tChars.n();
                const idx = month * 2 - 1;
                const day1 = getTerm(tChars.Y(), idx);
                const day2 = getTerm(tChars.Y(), idx + 1);
                if (tChars.j() === day1)
                    return { term: solarTerm[(month - 1) * 2], day: day1 };
                if (tChars.j() === day2)
                    return { term: solarTerm[(month - 1) * 2 + 1], day: day2 };
                return null;
            };
        },
    };

    return solarTermPlugin;

}));
