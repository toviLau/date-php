/**
 * date-php.js v1.3.3
 *   这是一个Javascript版的仿PHP日期时间格式化函数，使用方法和PHP语言一样，有丰富的模板字符串，转换日期时间更自由。 repository https://github.com/toviLau/date-php.git
 *   (c) 2019 ToviLau. Released under the MIT License. 
 **/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.date = factory());
}(this, function () { 'use strict';

    /**
     * 和PHP一样的时间戳格式化函数
     * @param  {string} fmt    格式 [默认值: 'Y-m-d']
     *    日
     *      d: 月份中的第几天，有前导零的2位数字。从"01"到"31"
     *      k: 月份中的第几天，汉字表示。从"一"到"卅一"(1.3.2+)
     *      D: 星期中的第几天，文本表示，3个字母。从"Mon"到"Sun"
     *      j: 月份中的第几天，没有前导零。"1"到"31"
     *      l: 星期几，完整的文本格式。"Sunday"到"Saturday"
     *      N: ISO-8601格式的星期中的第几天。"1"(表示星期一)到"7"(表示星期天)
     *      S: 每月天数后面的英文后缀，2 个字符 st/nd/rd/th。
     *      w: 星期中的第几天，数字表示。"0"(表示星期天)到"6"(表示星期六)
     *      K: 星期中的第几天，汉字表示。"日"(表示星期天)到"六"(表示星期六)(1.3.2+)
     *      z: 年份中的第几天。"0"到"365"
     *
     *    星期
     *      W: 年份中的第几周
     *
     *    月
     *      F: 月份，完整的文本格式。从"January"到"December"
     *      f: 月份，汉字表示。从"一"到"十二"(1.3.2+)
     *      m: 数字表示的月份，有前导零。"01"到"12"
     *      M: 三个字母缩写表示的月份。从"Jan"到"Dec"
     *      n: 数字表示的月份，没有前导零。"1"到"12"
     *      t: 给定月份所应有的天数。 "28"到"31"
     *
     *    年
     *      L: 是否为闰年。1:是，0:否
     *      o: ISO-8601格式年份数字。这和 Y 的值类似，星期数（W）属于前一年或下一年，则用那一年。
     *      Y: 4 位数字完整表示的年份
     *      y: 2 位数字表示的年份
     *      C: 4 个汉字表示的年份(1.3.2+)
     *
     *    时间
     *      a: 小写的上午和下午值。"am"或"pm"
     *      A: 大写的上午和下午值。"AM"或"PM"
     *      B: Swatch Internet 标准时。"000"到"999"
     *      g: 12 小时格式，没有前导零。"1"到"12"
     *      G: 24 小时格式，没有前导零。"0"到"23"
     *      h: 12 小时格式，有前导零。"01"到"12"
     *      H: 24 小时格式，有前导零。"00"到"23"
     *      i: 有前导零的分钟数。"00"到"59"
     *      s: 有前导零的秒数。"00"到"59"
     *      u: 有前导零的毫秒。"000"到"999"
     *
     *    时区
     *      e: 时区标识。UTC，GMT，Atlantic/Azores
     *      I: 是否为夏令时。1:是，0:否
     *      O: 与格林威治时间相差的小时数。例如：+0800
     *      P: 与格林威治时间的差别，小时和分钟之间有冒号分隔。例如：+08:00
     *      T: 本机所在的时区。例如：EST，MDT。
     *      Z: 时差偏移量的秒数。UTC 西边的时区偏移量总是负的，UTC 东边的时区偏移量总是正的。-43200 到 43200
     *
     *    完整的日期／时间
     *      c: ISO 8601 格式的日期。例如：2019-07-15T15:38:56+08:00
     *      r: RFC 822 格式的日期。例如：Thu, 15 Jul 2019 15:38:56 +0800
     *      U: 从 Unix 纪元开始至今的秒数(Unix时间戳)。
     *
     * @param  {date}       now  要格式化的时间 [默认值: 默认为当前本地机器时间]
     * @return {string}     格式化的时间字符串
     */

    var date = function (fmt, now) {
        if ( fmt === void 0 ) fmt = 'Y-m-d';
        if ( now === void 0 ) now = new Date();

        fmt = fmt ? fmt : 'Y-m-d';
        if (!(new Date(now - 0).getTime() || new Date(now).getTime())) { throw Error((function (D) {
            return '' +
                '参数2不正确，须传入 “日期时间对象”，或 “Unix时间戳” 或 “时间戳字符串”。\n可以参考以下值：\n' +
                "  \"" + D + "\"\n" +
                "  \"" + (D.toUTCString()) + "\"\n" +
                "  " + (D.getTime()) + "  -- 推荐\n";
        })(new Date())); }

        now = this || (!isNaN(now - 0) ? new Date(now - 0) : new Date(now));

        /**
         * 补前导零(0)
         * @param {number} str 字符
         * @param {number} len 长度
         * @param {string} placeholder 前导占位符
         * @returns {string}
         */
        var pad = function (str, len, placeholder) {
            if ( placeholder === void 0 ) placeholder = '0';

            str += '';
            if (str.length < len) {
                return new Array(++len - str.length).join(placeholder) + str;
            } else {
                return str;
            }
        };
        var longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var txt_ordin = { 1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd', 31: 'st' };
        var txt_months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var baseFigure = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六' };
        var weekDay = Object.assign.apply(
            Object, [ {},
            {
                0: '日',
            } ].concat( baseFigure )
        );
        var dateFigure = Object.assign.apply(
            Object, [ {},
            {
                0: '〇', 7: '七', 8: '八', 9: '九', 10: '十',
                20: '廿', 30: '卅',
            } ].concat( baseFigure )
        );

        // 取中文日期
        var textReplace = function (res) {
            return res.toString()
                .split('')
                .reverse()
                .map(function (val, key) {
                    var v = Math.pow(10, key) * val;
                    return v ? dateFigure[v] : null
                })
                .reverse()
                .join('');
        };

        // 模板字串替换函数
        var replaceChars = {
            // 日
            d: function () { return pad(replaceChars.j(), 2); },
            k: function () { return textReplace(replaceChars.j()); }, // 中文日(1.3.2+), PHP中无此功能
            D: function () { return replaceChars.l().substr(0, 3); },
            j: function () { return now.getDate(); },
            l: function () { return longDays[replaceChars.w()]; },
            N: function () { return replaceChars.w() === 0 ? 7 : replaceChars.w(); },
            S: function () { return txt_ordin[replaceChars.j()] ? txt_ordin[replaceChars.j()] : 'th'; },
            w: function () { return now.getDay(); },
            K: function () { return weekDay[replaceChars.w()]; }, // 中文周(1.3.2+), PHP中无此功能
            z: function () { return Math.ceil((now - new Date(replaceChars.Y() + '/1/1')) / (60 * 60 * 24 * 1e3)); },

            // 周
            W: function () {
                var dayNr = (replaceChars.w() + 6) % 7;
                now.setDate(replaceChars.j() - dayNr + 3);
                var firstThursday = now.valueOf();
                now.setMonth(0, 1);
                if (replaceChars.w() !== 4) {
                    now.setMonth(0, 1 + ((4 - replaceChars.w()) + 7) % 7);
                }
                var retVal = 1 + Math.ceil((firstThursday - now) / (60 * 60 * 24 * 7 * 1e3));

                return pad(retVal, 2);
            },

            // 月
            F: function () { return txt_months[replaceChars.n()]; },
            f: function () { return textReplace(replaceChars.n()); }, // 中文月(1.3.2+), PHP中无此功能
            m: function () { return pad(replaceChars.n(), 2); },
            M: function () { return replaceChars.F().substr(0, 3); },
            n: function () { return now.getMonth() + 1; },
            t: function () {
                var year = replaceChars.Y();
                var nextMonth = replaceChars.n();
                if (nextMonth === 12) {
                    year += 1;
                    nextMonth = 0;
                }
                return new Date(year, nextMonth, 0).getDate();
            },

            // 年
            L: function () { return Number(replaceChars.Y() % 400 === 0 || (replaceChars.Y() % 100 !== 0 && replaceChars.Y() % 4 === 0)); },
            o: function () {
                now.setDate(replaceChars.j() - ((replaceChars.w() + 6) % 7) + 3);
                return replaceChars.Y();
            },
            Y: function () { return now.getFullYear(); },
            y: function () { return (replaceChars.Y() + '').slice(2); },
            C: function () { return (replaceChars.Y()+'').split('').map(function (res){ return dateFigure[res]; }).join(''); }, // 中文年(1.3.2+), PHP中无此功能

            // 时间
            a: function () { return replaceChars.G() > 11 ? 'pm' : 'am'; },
            A: function () { return replaceChars.a().toUpperCase(); },
            B: function () {
                var off = (now.getTimezoneOffset() + 60) * 60;
                var theSeconds = (replaceChars.G() * 3600) + (now.getMinutes() * 60) + now.getSeconds() + off;
                var beat = Math.floor(theSeconds / 86.4);
                if (beat > 1000) { beat -= 1000; }
                if (beat < 0) { beat += 1000; }
                if ((String(beat)).length === 1) { beat = '00' + beat; }
                if ((String(beat)).length === 2) { beat = '0' + beat; }
                return beat;
            },
            g: function () { return replaceChars.G() % 12 || 12; },
            G: function () { return now.getHours(); },
            h: function () { return pad(replaceChars.g(), 2); },
            H: function () { return pad(replaceChars.G(), 2); },
            i: function () { return pad(now.getMinutes(), 2); },
            s: function () { return pad(now.getSeconds(), 2); },
            u: function () { return (now.getTime() + '').substr(-3); },

            // 时区
            e: function () { return Intl.DateTimeFormat().resolvedOptions().timeZone; },
            I: function () {
                var DST = null;
                for (var i = 0; i < 12; ++i) {
                    var d = new Date(replaceChars.Y(), i, 1);
                    var offset = d.getTimezoneOffset();

                    if (DST === null) { DST = offset; }
                    else if (offset < DST) {
                        DST = offset;
                        break;
                    } else if (offset > DST) { break; }
                }
                return (now.getTimezoneOffset() === DST) | 0;
            },
            O: function () { return (now.getTimezoneOffset() > 0 ? '-' : '+') + pad(Math.abs(now.getTimezoneOffset() / 60 * 100), 4); },
            P: function () { return replaceChars.O().match(/[+-]?\d{2}/g).join(':'); },
            T: function () {
                var tz = now.toLocaleTimeString(navigator.language, { timeZoneName: 'short' }).split(/\s/);
                return tz[tz.length - 1];
            },
            Z: function () { return -(now.getTimezoneOffset() * 60); },

            // 完整日期时间
            c: function () { return replaceChars.Y() + '-' + replaceChars.m() + '-' + replaceChars.d() + 'T' + replaceChars.h() + ':' + replaceChars.i() + ':' + replaceChars.s() + replaceChars.P(); },
            r: function () { return now.toString(); },
            U: function () { return Math.round(now.getTime() / 1000); },
        };
        return fmt.replace(/(\\?[a-z])/ig, function (res, key) {
            var result = '';
            if (res !== key) {
                result = key;
            } else {
                if (replaceChars[key]) {
                    result = replaceChars[key]();
                } else {
                    result = key.replace('\\', '');
                }
            }
            return result;
        });
    };

    defP(Date.prototype, 'format', date);
    defP(date, 'version', '1.3.3');
    defP(date, 'description', function () { return (console.info('%cdate-php使用说明:\n' +
        '为了减少包的体积此方法已经废弃，查看使用说明请移步这里\nhttps://github.com/toviLau/date-php/blob/master/README.md'
        , 'color:#c63'
    )); });

    function defP(obj, key, val) {
        Object.defineProperty(obj, key, {
            get: function () { return val; },
        });
    }

    return date;

}));
