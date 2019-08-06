/**
 * date-php.js v1.5.1
 *   这是一个Javascript版的仿PHP日期时间格式化函数，使用方法和PHP语言一样，有丰富的模板字符串，转换日期时间更自由。 repository https://github.com/toviLau/date-php.git
 *   (c) 2019 ToviLau. Released under the MIT License. 
 **/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.date = factory());
}(this, function () { 'use strict';

    /* 公历转农历代码思路：
    1、建立农历年份查询表
    2、计算输入公历日期与公历基准的相差天数
    3、从农历基准开始遍历农历查询表，计算自农历基准之后每一年的天数，并用相差天数依次相减，确定农历年份
    4、利用剩余相差天数以及农历每个月的天数确定农历月份
    5、利用剩余相差天数确定农历哪一天 */

    // 农历1949-2100年查询表
    var lunarYearArr = [
            0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
            0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
            0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
            0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
            0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
            0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
            0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
            0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
            0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
            0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
            0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
            0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
            0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
            0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
            0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
            0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
            0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
            0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
            0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
            0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099
            0x0d520 ],
        lunarMonth = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'],
        lunarDay = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '初', '廿'],
        tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
        diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

    // 公历转农历函数
    function toLunar(sy, sm, sd) {
        // 输入的月份减1处理
        sm -= 1;

        // 计算与公历基准的相差天数
        // Date.UTC()返回的是距离公历1970年1月1日的毫秒数,传入的月份需要减1
        var daySpan = (Date.UTC(sy, sm, sd) - Date.UTC(1949, 0, 29)) / (24 * 60 * 60 * 1000) + 1;
        var ly, lm, ld;
        // 确定输出的农历年份
        for (var j = 0; j < lunarYearArr.length; j++) {
            daySpan -= lunarYearDays(lunarYearArr[j]);
            if (daySpan <= 0) {
                ly = 1949 + j;
                // 获取农历年份确定后的剩余天数
                daySpan += lunarYearDays(lunarYearArr[j]);
                break;
            }
        }

        // 确定输出的农历月份
        for (var k = 0; k < lunarYearMonths(lunarYearArr[ly - 1949]).length; k++) {
            daySpan -= lunarYearMonths(lunarYearArr[ly - 1949])[k];
            if (daySpan <= 0) {
                // 有闰月时，月份的数组长度会变成13，因此，当闰月月份小于等于k时，lm不需要加1
                if (hasLeapMonth(lunarYearArr[ly - 1949]) && hasLeapMonth(lunarYearArr[ly - 1949]) <= k) {
                    if (hasLeapMonth(lunarYearArr[ly - 1949]) < k) {
                        lm = k;
                    } else if (hasLeapMonth(lunarYearArr[ly - 1949]) === k) {
                        lm = '闰' + k;
                    } else {
                        lm = k + 1;
                    }
                } else {
                    lm = k + 1;
                }
                // 获取农历月份确定后的剩余天数
                daySpan += lunarYearMonths(lunarYearArr[ly - 1949])[k];
                break;
            }
        }

        // 确定输出农历哪一天
        ld = daySpan;

        // 将计算出来的农历月份转换成汉字月份，闰月需要在前面加上闰字
        if (hasLeapMonth(lunarYearArr[ly - 1949]) && (typeof (lm) === 'string' && lm.indexOf('闰') > -1)) {
            lm = "闰" + (lunarMonth[/\d/.exec(lm) - 1]);
        } else {
            lm = lunarMonth[lm - 1];
        }

        // 将计算出来的农历年份转换为天干地支年
        ly = getTianGan(ly) + getDiZhi(ly);

        // 将计算出来的农历天数转换成汉字
        if (ld < 11) {
            ld = "" + (lunarDay[10]) + (lunarDay[ld - 1]);
        } else if (ld > 10 && ld < 20) {
            ld = "" + (lunarDay[9]) + (lunarDay[ld - 11]);
        } else if (ld === 20) {
            ld = "" + (lunarDay[1]) + (lunarDay[9]);
        } else if (ld > 20 && ld < 30) {
            ld = "" + (lunarDay[11]) + (lunarDay[ld - 21]);
        } else if (ld === 30) {
            ld = "" + (lunarDay[2]) + (lunarDay[9]);
        }

        // console.log(ly, lm, ld);

        return {
            ly: ly,
            lm: lm,
            ld: ld,
        };
    }

    // 计算农历年是否有闰月，参数为存储农历年的16进制
    // 农历年份信息用16进制存储，其中16进制的最后1位可以用于判断是否有闰月
    function hasLeapMonth(ly) {
        // 获取16进制的最后1位，需要用到&与运算符
        if (ly & 0xf) {
            return ly & 0xf;
        } else {
            return false;
        }
    }

    // 如果有闰月，计算农历闰月天数，参数为存储农历年的16进制
    // 农历年份信息用16进制存储，其中16进制的第1位（0x除外）可以用于表示闰月是大月还是小月
    function leapMonthDays(ly) {
        if (hasLeapMonth(ly)) {
            // 获取16进制的第1位（0x除外）
            return (ly & 0xf0000) ? 30 : 29;
        } else {
            return 0;
        }
    }

    // 计算农历一年的总天数，参数为存储农历年的16进制
    // 农历年份信息用16进制存储，其中16进制的第2-4位（0x除外）可以用于表示正常月是大月还是小月
    function lunarYearDays(ly) {
        var totalDays = 0;

        // 获取正常月的天数，并累加
        // 获取16进制的第2-4位，需要用到>>移位运算符
        for (var i = 0x8000; i > 0x8; i >>= 1) {
            var monthDays = (ly & i) ? 30 : 29;
            totalDays += monthDays;
        }
        // 如果有闰月，需要把闰月的天数加上
        if (hasLeapMonth(ly)) {
            totalDays += leapMonthDays(ly);
        }

        return totalDays;
    }

    // 获取农历每个月的天数
    // 参数需传入16进制数值
    function lunarYearMonths(ly) {
        var monthArr = [];

        // 获取正常月的天数，并添加到monthArr数组中
        // 获取16进制的第2-4位，需要用到>>移位运算符
        for (var i = 0x8000; i > 0x8; i >>= 1) {
            monthArr.push((ly & i) ? 30 : 29);
        }
        // 如果有闰月，需要把闰月的天数加上
        if (hasLeapMonth(ly)) {
            monthArr.splice(hasLeapMonth(ly), 0, leapMonthDays(ly));
        }

        return monthArr;
    }

    // 将农历年转换为天干，参数为农历年
    function getTianGan(ly) {
        var tianGanKey = (ly - 3) % 10;
        if (tianGanKey === 0) { tianGanKey = 10; }
        return tianGan[tianGanKey - 1];
    }

    // 将农历年转换为地支，参数为农历年
    function getDiZhi(ly) {
        var diZhiKey = (ly - 3) % 12;
        if (diZhiKey === 0) { diZhiKey = 12; }
        return diZhi[diZhiKey - 1];
    }

    /**
     * 和PHP一样的时间戳格式化函数
     * @param  {string} fmt    格式 [默认值: 'Y-m-d']
     *   日
     *      d: 月份中的第几天，有前导零的2位数字。从"01"到"31"
     *      *k: 月份中的第几天，汉字表示。从"一"到"卅一" (1.3.2+)
     *      D: 星期中的第几天，文本表示，3个字母。从"Mon"到"Sun"
     *      j: 月份中的第几天，没有前导零。从"1"到"31"
     *      *ld: 农历月份中的第几天。从"初一"到"卅"(1.5.0+)
     *      *lt: 中国古代时晨计时中的时(类似小时)。从"子"到"亥"(1.5.0+)
     *      *lk: 中国古代时晨计时中的刻(类似分钟，一时晨八刻钟)。从"零"到"七"(1.5.0+)
     *      *lg: 中国古代夜里更时(打更点，一晚五更)。从"一"到"五"(1.5.0+)
     *      l: 星期几，完整的文本格式。从"Sunday"到"Saturday"
     *      N: ISO-8601格式的星期中的第几天。从"1"(表示星期一)到"7"(表示星期天)
     *      S: 每月天数后面的英文后缀，2 个字符 st/nd/rd/th。
     *      w: 星期中的第几天，数字表示。从"0"(表示星期天)到"6"(表示星期六)
     *      K: 星期中的第几天，汉字表示。从"日"(表示星期天)到"六"(表示星期六)(1.3.2+)
     *      z: 年份中的第几天。"0"到"365"
     *
     *   星期
     *      W: 年份中的第几周
     *
     *   月
     *      F: 月份，完整的文本格式。从"January"到"December"
     *      f: 月份，汉字表示。从"一"到"十二"(1.3.2+)
     *      m: 数字表示的月份，有前导零。"01"到"12"
     *      M: 三个字母缩写表示的月份。从"Jan"到"Dec"
     *      n: 数字表示的月份，没有前导零。"1"到"12"
     *      *lm:农历月份。从"一"到"十二"(1.5.0+)
     *      t: 给定月份所应有的天数。 "28"到"31"
     *
     *   年
     *     L: 是否为闰年。1:是，0:否
     *     o: ISO-8601格式年份数字。这和 Y 的值类似，星期数（W）属于前一年或下一年，则用那一年。
     *     Y: 4 位数字完整表示的年份
     *     y: 2 位数字表示的年份
     *     *ly: 农历记年法(天干地支，60年一循环)。从"甲子"到"癸亥"(1.5.0+)
     *     *C: 4 个汉字表示的年份(1.3.2+)
     *
     *   时间
     *     a: 小写的上午和下午值。"am"或"pm"
     *     A: 大写的上午和下午值。"AM"或"PM"
     *     B: Swatch Internet 标准时。"000"到"999"
     *     g: 12 小时格式，没有前导零。"1"到"12"
     *     G: 24 小时格式，没有前导零。"0"到"23"
     *     h: 12 小时格式，有前导零。"01"到"12"
     *     H: 24 小时格式，有前导零。"00"到"23"
     *     i: 有前导零的分钟数。"00"到"59"
     *     s: 有前导零的秒数。"00"到"59"
     *     u: 有前导零的毫秒。"000"到"999"
     *
     *   时区
     *     e: 时区标识。UTC，GMT，Atlantic/Azores
     *     I: 是否为夏令时。1:是，0:否
     *     O: 与格林威治时间相差的小时数。例如：+0800
     *     P: 与格林威治时间的差别，小时和分钟之间有冒号分隔。例如：+08:00
     *     T: 本机所在的时区。例如：EST，MDT。
     *     Z: 时差偏移量的秒数。UTC 西边的时区偏移量总是负的，UTC 东边的时区偏移量总是正的。-43200 到 43200
     *
     *   完整的日期／时间
     *     c: ISO 8601 格式的日期。例如：2019-07-15T15:38:56+08:00
     *     r: RFC 822 格式的日期。例如：Thu, 15 Jul 2019 15:38:56 +0800
     *     U: 从 Unix 纪元开始至今的秒数(Unix时间戳)。
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
        var lunarTime = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        var lunarKe = Object.assign.apply(
            Object, [ {},
            {
                0: '零',
                7: '七',
            } ].concat( baseFigure )
        );
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
                    return v ? dateFigure[v] : null;
                })
                .reverse()
                .join('');
        };

        // 获取农历
        function getLunar() {
            return toLunar(replaceChars.Y(), replaceChars.n(), replaceChars.j());
        }

        // 模板字串替换函数
        var replaceChars = {
            // 日
            d: function () { return pad(replaceChars.j(), 2); },
            k: function () { return textReplace(replaceChars.j()); }, // 中文日(1.3.2+), PHP中无此功能
            D: function () { return replaceChars.l().substr(0, 3); },
            j: function () { return now.getDate(); },
            ld: function () { return getLunar().ld; },
            lt: function () { return lunarTime[Math.floor((replaceChars.G() >= 23 ? 0 : replaceChars.G() + 1) / 2)]; },
            lg: function () {
                var nowTime = replaceChars.G();
                switch (nowTime) {
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        return ((baseFigure[Math.ceil((nowTime < 19 ? nowTime + 24 : nowTime) / 2) - 9]) + "更");
                    default:
                        return '';

                }
            },
            lk:function (){ return lunarKe[Math.floor(((replaceChars.U()+60*60) % (60*60*2))/60 / 15)]; },
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
            lm: function () { return getLunar().lm; },
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
            ly: function () { return getLunar().ly; },
            C: function () { return (replaceChars.Y() + '').split('').map(function (res) { return dateFigure[res]; }).join(''); }, // 中文年(1.3.2+), PHP中无此功能

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
            u: function () { return replaceChars.v() + '000'; },
            v: function () { return (now.getTime() + '').substr(-3); },

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
        return fmt.replace(/(\\?(l[ymdtgk])|([a-z]))/ig, function (res, key) {
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
    defP(date, 'version', '1.5.1');
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
