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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.date = {}));
})(this, (function (exports) { 'use strict';

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

    exports.toAstro = toAstro;

}));
