/**
 * date-php.js v1.2.3
 *   这是一个Javascript版的时间日期格式化函数，使用方法和PHP语言一样 repository https://github.com/toviLau/date-php.git
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
     *      D: 星期中的第几天，文本表示，3个字母。从"Mon"到"Sun"
     *      j: 月份中的第几天，没有前导零。"1"到"31"
     *      l: 星期几，完整的文本格式。"Sunday"到"Saturday"
     *      N: ISO-8601格式的星期中的第几天。"1"(表示星期一)到"7"(表示星期天)
     *      S: 每月天数后面的英文后缀，2 个字符 st/nd/rd/th。
     *      w: 星期中的第几天，数字表示。"0"(表示星期天)到"6"(表示星期六)
     *      z: 年份中的第几天。"0"到"365"
     *
     *    星期
     *      W: 年份中的第几周
     *
     *    月
     *      F: 月份，完整的文本格式。从"January"到"December"
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
     *      O: 与格林威治时间相差的小时数。例如：+0200
     *      P: 与格林威治时间的差别，小时和分钟之间有冒号分隔。例如：+02:00
     *      T: 本机所在的时区。例如：EST，MDT。
     *      Z: 时差偏移量的秒数。UTC 西边的时区偏移量总是负的，UTC 东边的时区偏移量总是正的。-43200 到 43200
     *
     *    完整的日期／时间
     *      c: ISO 8601 格式的日期。例如：2004-02-12T15:19:21+00:00
     *      r: RFC 822 格式的日期。例如：Thu, 21 Dec 2000 16:01:07 +0200
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
                '参数2不正确，须传入 “日期时间对象”。\n可以参考以下值：\n' +
                "    \"" + D + "\"\n" +
                "    \"" + (D.toUTCString()) + "\"\n" +
                "    " + (D.getTime()) + "\n";
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

        var replaceChars = {
            // Day
            d: function () { return pad(replaceChars.j(), 2); },
            D: function () { return replaceChars.l().substr(0, 3); },
            j: function () { return now.getDate(); },
            l: function () { return longDays[replaceChars.w()]; },
            N: function () { return replaceChars.w() === 0 ? 7 : replaceChars.w(); },
            S: function () { return txt_ordin[replaceChars.j()] ? txt_ordin[replaceChars.j()] : 'th'; },
            w: function () { return now.getDay(); },
            z: function () { return Math.ceil((now - new Date(replaceChars.Y() + '/1/1')) / (60*60*24*1e3)); },

            // Week
            W: function () {
                var dayNr = (replaceChars.w() + 6) % 7;
                now.setDate(replaceChars.j() - dayNr + 3);
                var firstThursday = now.valueOf();
                now.setMonth(0, 1);
                if (replaceChars.w() !== 4) {
                    now.setMonth(0, 1 + ((4 - replaceChars.w()) + 7) % 7);
                }
                var retVal = 1 + Math.ceil((firstThursday - now) / (60*60*24*7*1e3));

                return pad(retVal,2);
            },
            // Month
            F: function () { return txt_months[replaceChars.n()]; },
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
            // Year
            L: function () { return Number(replaceChars.Y() % 400 === 0 || (replaceChars.Y() % 100 !== 0 && replaceChars.Y() % 4 === 0)); },
            o: function () {
                now.setDate(replaceChars.j() - ((replaceChars.w() + 6) % 7) + 3);
                return replaceChars.Y();
            },
            Y: function () { return now.getFullYear(); },
            y: function () { return (replaceChars.Y() + '').slice(2); },
            // Time
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
            // Timezone
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
            // Full Date/Time
            c: function () { return replaceChars.Y() + '-' + replaceChars.m() + '-' + replaceChars.d() + 'T' + replaceChars.h() + ':' + replaceChars.i() + ':' + replaceChars.s() + replaceChars.P(); },
            r: function () { return now.toString(); },
            U: function () { return Math.round(now.getTime() / 1000); },
        };
        return fmt.replace(/([a-z])/ig, function (res, key) { return res !== key ? key : (replaceChars[key] ? replaceChars[key]() : key); });
    };

    date.version = '1.2.3';

    Date.prototype.format = date;
    Object.defineProperty(date, 'description', {
        get: function get() {
            console.info('%cdate-php使用说明\n' +
                '方式1：date(["格式化字符串"[, 时间对象]])\n' +
                '方式2：时间对象.format(["格式化字符串"])\n' +
                '  所有方式的入参都是可选参数' +
                '  格式化字符串：\n' +
                '    日\n' +
                '      d: 月份中的第几天，有前导零的2位数字。从"01"到"31"\n' +
                '      D: 星期中的第几天，文本表示，3个字母。从"Mon"到"Sun"\n' +
                '      j: 月份中的第几天，没有前导零。"1"到"31"\n' +
                '      l: 星期几，完整的文本格式。"Sunday"到"Saturday"\n' +
                '      N: ISO-8601格式的星期中的第几天。"1"(表示星期一)到"7"(表示星期天)\n' +
                '      S: 每月天数后面的英文后缀，2 个字符 st/nd/rd/th。\n' +
                '      w: 星期中的第几天，数字表示。"0"(表示星期天)到"6"(表示星期六)\n' +
                '      z: 年份中的第几天。"0"到"365"\n' +
                '    星期\n' +
                '      W: 年份中的第几周\n' +
                '    月\n' +
                '      F: 月份，完整的文本格式。从"January"到"December"\n' +
                '      m: 数字表示的月份，有前导零。"01"到"12"\n' +
                '      M: 三个字母缩写表示的月份。从"Jan"到"Dec"\n' +
                '      n: 数字表示的月份，没有前导零。"1"到"12"\n' +
                '      t: 给定月份所应有的天数。 "28"到"31"\n' +
                '    年\n' +
                '      L: 是否为闰年。1:是，0:否\n' +
                '      o: ISO-8601格式年份数字。这和 Y 的值类似，星期数（W）属于前一年或下一年，则用那一年。\n' +
                '      Y: 4 位数字完整表示的年份\n' +
                '      y: 2 位数字表示的年份\n' +
                '    时间\n' +
                '      a: 小写的上午和下午值。"am"或"pm"\n' +
                '      A: 大写的上午和下午值。"AM"或"PM"\n' +
                '      B: Swatch Internet 标准时。"000"到"999"\n' +
                '      g: 12 小时格式，没有前导零。"1"到"12"\n' +
                '      G: 24 小时格式，没有前导零。"0"到"23"\n' +
                '      h: 12 小时格式，有前导零。"01"到"12"\n' +
                '      H: 24 小时格式，有前导零。"00"到"23"\n' +
                '      i: 有前导零的分钟数。"00"到"59"\n' +
                '      s: 有前导零的秒数。"00"到"59"\n' +
                '      u: 有前导零的毫秒。"000"到"999"\n' +
                '    时区\n' +
                '      e: 时区标识。UTC，GMT，Atlantic/Azores\n' +
                '      I: 是否为夏令时。1:是，0:否\n' +
                '      O: 与格林威治时间相差的小时数。例如：+0200\n' +
                '      P: 与格林威治时间的差别，小时和分钟之间有冒号分隔。例如：+02:00\n' +
                '      T: 本机所在的时区。例如：EST，MDT。\n' +
                '      Z: 时差偏移量的秒数。UTC 西边的时区偏移量总是负的，UTC 东边的时区偏移量总是正的。-43200 到 43200\n' +
                '    完整的日期／时间\n' +
                '      c: ISO 8601 格式的日期。例如：2004-02-12T15:19:21+00:00\n' +
                '      r: RFC 822 格式的日期。例如：Thu, 21 Dec 2000 16:01:07 +0200\n' +
                '      U: 从 Unix 纪元开始至今的秒数(Unix时间戳)。\n\n' +
                'Demo:\n' +
                '    date(\'Y-m-d H:i:s.u A w\', new Date())\n' +
                "    输出：" + (date('Y-m-d H:i:s.u A D', new Date())) + "\n\n" +
                "    date('Y-m-d H:i:s', " + (new Date().getTime()) + ")\n" +
                "    输出：" + (date('Y-m-d H:i:s', new Date().getTime())) + "\n"
                , 'background:#cff;color:#36f'
            );
        },
    });

    return date;

}));
