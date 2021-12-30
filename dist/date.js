/**
 * date-php.js v1.7.17
 *   :-) date('Y-m-d', 1563148800000) - 这是一个Javascript模仿PHP日期时间格式化函数，使用方法和PHP非常类似，有丰富的模板字符，并在原来的基础上增强了一些模板字符。例如：中国的农历日期、用汉字来表示日期、十二生肖与星座。让转换日期时间更自由。
 *   This is a Javascript mimicking PHP datetime formatting function. It is very similar to PHP, has rich template 
 *   characters, and enhances some template characters on the basis of the original. For example: Chinese Lunar Date,
 *   Chinese Character Date, Chinese Zodiac and Constellation. Make the conversion datetimes more free.
 *   
 *     -- repository https://github.com/toviLau/date-php.git
 *
 *   (c) 2019-2021 ToviLau. Released under the MIT License. 
 **/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.date = factory());
}(this, function () { 'use strict';

    /**
     * 1900-2100区间内的公历、农历互转
     * @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
     * @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
     */
    var calendar = {

        /**
         * 农历1900-2100的润大小信息表
         * @Array Of Property
         * @return Hex
         */
        lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,//1900-1909
            0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,//1910-1919
            0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,//1920-1929
            0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,//1930-1939
            0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,//1940-1949
            0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,//1950-1959
            0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,//1960-1969
            0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,//1970-1979
            0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,//1980-1989
            0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,//1990-1999
            0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,//2000-2009
            0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,//2010-2019
            0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,//2020-2029
            0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,//2030-2039
            0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,//2040-2049
            0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,//2050-2059
            0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,//2060-2069
            0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,//2070-2079
            0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,//2080-2089
            0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,//2090-2099
            0x0d520],//2100

        /**
         * 公历每个月份的天数普通表
         * @Array Of Property
         * @return Number
         */
        solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

        /**
         * 天干地支之天干速查表
         * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
         * @return Cn string
         */
        Gan: ['\u7532', '\u4e59', '\u4e19', '\u4e01', '\u620a', '\u5df1', '\u5e9a', '\u8f9b', '\u58ec', '\u7678'],

        /**
         * 天干地支之地支速查表
         * @Array Of Property
         * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
         * @return Cn string
         */
        Zhi: ['\u5b50', '\u4e11', '\u5bc5', '\u536f', '\u8fb0', '\u5df3', '\u5348', '\u672a', '\u7533', '\u9149', '\u620c', '\u4ea5'],

        /**
         * 天干地支之地支速查表<=>生肖
         * @Array Of Property
         * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
         * @return Cn string
         */
        Animals: ['\u9f20', '\u725b', '\u864e', '\u5154', '\u9f99', '\u86c7', '\u9a6c', '\u7f8a', '\u7334', '\u9e21', '\u72d7', '\u732a'],

        /**
         * 24节气速查表
         * @Array Of Property
         * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
         * @return Cn string
         */
        solarTerm: ['\u5c0f\u5bd2', '\u5927\u5bd2', '\u7acb\u6625', '\u96e8\u6c34', '\u60ca\u86f0', '\u6625\u5206', '\u6e05\u660e', '\u8c37\u96e8', '\u7acb\u590f', '\u5c0f\u6ee1', '\u8292\u79cd', '\u590f\u81f3', '\u5c0f\u6691', '\u5927\u6691', '\u7acb\u79cb', '\u5904\u6691', '\u767d\u9732', '\u79cb\u5206', '\u5bd2\u9732', '\u971c\u964d', '\u7acb\u51ac', '\u5c0f\u96ea', '\u5927\u96ea', '\u51ac\u81f3'],

        /**
         * 1900-2100各年的24节气日期速查表
         * @Array Of Property
         * @return 0x string For splice
         */
        sTermInfo: [
            '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
            '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
            '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
            'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
            '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
            '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
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
            '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
            '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
            '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
            '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
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
            '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722' ],

        /**
         * 数字转中文速查表
         * @Array Of Property
         * @trans ['日','一','二','三','四','五','六','七','八','九','十']
         * @return Cn string
         */
        nStr1: ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341'],

        /**
         * 日期转农历称呼速查表
         * @Array Of Property
         * @trans ['初','十','廿','卅']
         * @return Cn string
         */
        nStr2: ['\u521d', '\u5341', '\u5eff', '\u5345'],

        /**
         * 月份转农历称呼速查表
         * @Array Of Property
         * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
         * @return Cn string
         */
        nStr3: ['\u6b63', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341', '\u51ac', '\u814a'],

        /**
         * 返回农历y年一整年的总天数
         * @param Year
         * @return Number
         * @eg:var count = calendar.lYearDays(1987) ;//count=387
         */
        lYearDays: function (Year) {
            var i, sum = 348;
            for (i = 0x8000; i > 0x8; i >>= 1) {
                sum += (this.lunarInfo[Year - 1900] & i) ? 1 : 0;
            }
            return (sum + this.leapDays(Year));
        },

        /**
         * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
         * @param Year
         * @return Number (0-12)
         * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
         */
        leapMonth: function (Year) { //闰字编码 \u95f0
            return (this.lunarInfo[Year - 1900] & 0xf);
        },

        /**
         * 返回农历y年闰月的天数 若该年没有闰月则返回0
         * @param Year
         * @return Number (0、29、30)
         * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
         */
        leapDays: function (Year) {
            if (this.leapMonth(Year)) {
                return ((this.lunarInfo[Year - 1900] & 0x10000) ? 30 : 29);
            }
            return (0);
        },

        /**
         * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
         * @param lunar Year
         * @return Number (-1、29、30)
         * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
         */
        monthDays: function (y, m) {
            if (m > 12 || m < 1) {
                return -1;
            }//月份参数从1至12，参数错误返回-1
            return ((this.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
        },

        /**
         * 返回公历(!)y年m月的天数
         * @param solar Year
         * @return Number (-1、28、29、30、31)
         * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
         */
        solarDays: function (y, m) {
            if (m > 12 || m < 1) {
                return -1;
            } //若参数错误 返回-1
            var ms = m - 1;
            if (ms === 1) { //2月份的闰平规律测算后确认返回28或29
                return (((y % 4 === 0) && (y % 100 != 0) || (y % 400 === 0)) ? 29 : 28);
            } else {
                return (this.solarMonth[ms]);
            }
        },

        /**
         * 农历年份转换为干支纪年
         * @param  lYear 农历年的年份数
         * @return Cn string
         */
        toGanZhiYear: function (lYear) {
            var ganKey = (lYear - 3) % 10;
            var zhiKey = (lYear - 3) % 12;
            if (ganKey === 0) { ganKey = 10; }//如果余数为0则为最后一个天干
            if (zhiKey === 0) { zhiKey = 12; }//如果余数为0则为最后一个地支
            return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];

        },

        /**
         * 公历月、日判断所属星座
         * @param  cMonth [description]
         * @param  cDay [description]
         * @return Cn string
         */
        toAstro: function (cMonth, cDay) {
            var s = '\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf';
            var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
            return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + '\u5ea7';//座
        },

        /**
         * 传入offset偏移量返回干支
         * @param offset 相对甲子的偏移量
         * @return Cn string
         */
        toGanZhi: function (offset) {
            return this.Gan[offset % 10] + this.Zhi[offset % 12];
        },

        /**
         * 传入公历(!)y年获得该年第n个节气的公历日期
         * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
         * @return day Number
         * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
         */
        getTerm: function (y, n) {
            if (y < 1900 || y > 2100) {
                return -1;
            }
            if (n < 1 || n > 24) {
                return -1;
            }
            var _table = this.sTermInfo[y - 1900];
            var _info = [
                parseInt('0x' + _table.substr(0, 5)).toString(),
                parseInt('0x' + _table.substr(5, 5)).toString(),
                parseInt('0x' + _table.substr(10, 5)).toString(),
                parseInt('0x' + _table.substr(15, 5)).toString(),
                parseInt('0x' + _table.substr(20, 5)).toString(),
                parseInt('0x' + _table.substr(25, 5)).toString() ];
            var _calday = [
                _info[0].substr(0, 1),
                _info[0].substr(1, 2),
                _info[0].substr(3, 1),
                _info[0].substr(4, 2),

                _info[1].substr(0, 1),
                _info[1].substr(1, 2),
                _info[1].substr(3, 1),
                _info[1].substr(4, 2),

                _info[2].substr(0, 1),
                _info[2].substr(1, 2),
                _info[2].substr(3, 1),
                _info[2].substr(4, 2),

                _info[3].substr(0, 1),
                _info[3].substr(1, 2),
                _info[3].substr(3, 1),
                _info[3].substr(4, 2),

                _info[4].substr(0, 1),
                _info[4].substr(1, 2),
                _info[4].substr(3, 1),
                _info[4].substr(4, 2),

                _info[5].substr(0, 1),
                _info[5].substr(1, 2),
                _info[5].substr(3, 1),
                _info[5].substr(4, 2) ];
            return parseInt(_calday[n - 1]);
        },

        /**
         * 传入农历数字月份返回汉语通俗表示法
         * @param month
         * @return Cn string
         * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
         */
        toChinaMonth: function (month) { // 月 => \u6708
            if (month > 12 || month < 1) {
                return -1;
            } //若参数错误 返回-1
            return ((this.nStr3[month - 1]) + "月");
        },

        /**
         * 传入农历日期数字返回汉字表示法
         * @param day
         * @return Cn string
         * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
         */
        toChinaDay: function (day) { //日 => \u65e5
            var s;
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
                default :
                    s = this.nStr2[Math.floor(day / 10)];
                    s += this.nStr1[day % 10];
            }
            return (s);
        },

        /**
         * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
         * @param year
         * @return Cn string
         * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
         */
        getAnimal: function (year) {
            return this.Animals[(year - 4) % 12];
        },

        /**
         * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
         * @param y  solar year
         * @param m  solar month
         * @param d  solar day
         * @return JSON object
         * @eg:console.log(calendar.solar2lunar(1987,11,01));
         */
        solar2lunar: function (y, m, d) { //参数区间1900.1.31~2100.12.31
            //年份限定、上限
            if (y < 1900 || y > 2100) {
                return -1;// undefined转换为数字变为NaN
            }
            //公历传参最下限
            if (y === 1900 && m === 1 && d < 31) {
                return -1;
            }
            //未传参  获得当天
            if (!y) {
                var objDate = new Date();
            } else {
                var objDate = new Date(y, parseInt(m) - 1, d);
            }
            var i, leap = 0, temp = 0;
            //修正ymd参数
            var y = objDate.getFullYear(),
                m = objDate.getMonth() + 1,
                d = objDate.getDate();
            var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
            for (i = 1900; i < 2101 && offset > 0; i++) {
                temp = this.lYearDays(i);
                offset -= temp;
            }
            if (offset < 0) {
                offset += temp;
                i--;
            }

            //是否今天
            var isTodayObj = new Date(),
                isToday = false;
            if (isTodayObj.getFullYear() === y && isTodayObj.getMonth() + 1 === m && isTodayObj.getDate() === d) {
                isToday = true;
            }
            //星期几
            var nWeek = objDate.getDay(),
                cWeek = this.nStr1[nWeek];
            //数字表示周几顺应天朝周一开始的惯例
            if (nWeek === 0) {
                nWeek = 7;
            }
            //农历年
            var year = i;
            var leap = this.leapMonth(i); //闰哪个月
            var isLeap = false;

            //效验闰月
            for (i = 1; i < 13 && offset > 0; i++) {
                //闰月
                if (leap > 0 && i === (leap + 1) && isLeap === false) {
                    --i;
                    isLeap = true;
                    temp = this.leapDays(year); //计算农历闰月天数
                } else {
                    temp = this.monthDays(year, i);//计算农历普通月天数
                }
                //解除闰月
                if (isLeap === true && i === (leap + 1)) {
                    isLeap = false;
                }
                offset -= temp;
            }
            // 闰月导致数组下标重叠取反
            if (offset === 0 && leap > 0 && i === leap + 1) {
                if (isLeap) {
                    isLeap = false;
                } else {
                    isLeap = true;
                    --i;
                }
            }
            if (offset < 0) {
                offset += temp;
                --i;
            }
            //农历月
            var month = i;
            //农历日
            var day = offset + 1;
            //天干地支处理
            var sm = m - 1;
            var gzY = this.toGanZhiYear(year);

            // 当月的两个节气
            // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
            var firstNode = this.getTerm(y, (m * 2 - 1));//返回当月「节」为几日开始
            var secondNode = this.getTerm(y, (m * 2));//返回当月「节」为几日开始

            // 依据12节气修正干支月
            var gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
            if (d >= firstNode) {
                gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
            }

            //传入的日期的节气与否
            var isTerm = false;
            var Term = null;
            if (firstNode === d) {
                isTerm = true;
                Term = this.solarTerm[m * 2 - 2];
            }
            if (secondNode === d) {
                isTerm = true;
                Term = this.solarTerm[m * 2 - 1];
            }
            //日柱 当月一日与 1900/1/1 相差天数
            var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
            var gzD = this.toGanZhi(dayCyclical + d - 1);
            //该日期所属的星座
            var astro = this.toAstro(m, d);

            return {
                'lYear': year,  // 农历年(数字)
                'lMonth': month, // 农历月(数字)
                'lDay': day, // 农历天(数字)
                'Animal': this.getAnimal(year), // 生肖
                'IMonthCn': (isLeap ? '\u95f0' : '') + this.toChinaMonth(month), // 农历月(汉字)
                'IDayCn': this.toChinaDay(day), // 农历天(汉字)
                'cYear': y, // 公历年
                'cMonth': m, // 公历月
                'cDay': d,  // 公历日
                'gzYear': gzY, // 干支年
                'gzMonth': gzM, // 干支月
                'gzDay': gzD, // 干支日
                'isToday': isToday,
                'isLeap': isLeap, // 是否润年
                'nWeek': nWeek,
                'ncWeek': '\u661f\u671f' + cWeek,
                'isTerm': isTerm, // 是否是节所
                'Term': Term,  // 节气
                'astro': astro,  // 星座
            };
        },

        /**
         * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
         * @param y  lunar year
         * @param m  lunar month
         * @param d  lunar day
         * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
         * @return JSON object
         * @eg:console.log(calendar.lunar2solar(1987,9,10));
         */
        lunar2solar: function (y, m, d, isLeapMonth) {   //参数区间1900.1.31~2100.12.1
            var isLeapMonth = !!isLeapMonth;
            var leapMonth = this.leapMonth(y);
            var leapDay = this.leapDays(y);
            if (isLeapMonth && (leapMonth != m)) {
                return -1;
            }//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
            if (y === 2100 && m === 12 && d > 1 || y === 1900 && m === 1 && d < 31) {
                return -1;
            }//超出了最大极限值
            var day = this.monthDays(y, m);
            var _day = day;
            //bugFix 2016-9-25
            //if month is leap, _day use leapDays method
            if (isLeapMonth) {
                _day = this.leapDays(y, m);
            }
            if (y < 1900 || y > 2100 || d > _day) {
                return -1;
            }//参数合法性效验

            //计算农历的时间差
            var offset = 0;
            for (var i = 1900; i < y; i++) {
                offset += this.lYearDays(i);
            }
            var leap = 0, isAdd = false;
            for (var i = 1; i < m; i++) {
                leap = this.leapMonth(y);
                if (!isAdd) {//处理闰月
                    if (leap <= i && leap > 0) {
                        offset += this.leapDays(y);
                        isAdd = true;
                    }
                }
                offset += this.monthDays(y, i);
            }
            //转换闰月农历 需补充该年闰月的前一个月的时差
            if (isLeapMonth) {
                offset += day;
            }
            //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
            var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
            var calObj = new Date((offset + d - 31) * 86400000 + stmap);
            var cY = calObj.getUTCFullYear();
            var cM = calObj.getUTCMonth() + 1;
            var cD = calObj.getUTCDate();

            return this.solar2lunar(cY, cM, cD);
        },
    };

    /**
     * 补前导零(0)
     * @param {number} str 字符
     * @param {number} len 长度
     * @param {string} placeholder 前导占位符
     * @returns {string}
     */
    function pad(str, len, placeholder) {
      if ( placeholder === void 0 ) placeholder = '0';

      str += '';
      if (str.length < len) {
        return new Array(++len - str.length).join(placeholder) + str;
      } else {
        return str;
      }
    }var longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var txt_ordin = {
      1: 'st',
      2: 'nd',
      3: 'rd',
      21: 'st',
      22: 'nd',
      23: 'rd',
      31: 'st',
    };
    var txt_months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var baseFigure = {
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六',
    };
    var lunarTime = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    var ordinal = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
    var zodiac = { // 生宵英文速查表
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
    var solar = {
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
      '\u971c\u964d': 'Frost\'s Descent',
      '\u7acb\u51ac': 'Start of Winter',
      '\u5c0f\u96ea': 'Minor Snow',
      '\u5927\u96ea': 'Major Snow',
      '\u51ac\u81f3': 'Winter Solstice',
    };
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
    var lMonth = Object.assign.apply(
      Object, [ {},
      {
        7: '七', 8: '八', 9: '九', 10: '十', 11: '冬', 12: '腊',
      } ].concat( baseFigure )
    );

    // 取中文日期(廿七)
    var textReplace = function (res) { return res.toString()
        .split('')
        .reverse()
        .map(function (val, key) {
          var v = Math.pow(10, key) * val;
          return v ? dateFigure[v] : null;
        })
        .reverse()
        .join(''); };

    // 取中文日期2(例：一九八七)
    var textReplace2 = function (succ) { return (succ + '').split('').map(function (res) { return dateFigure[res]; }).join(''); };

    function defP(obj, key, val) {
      Object.defineProperty(obj, key, {
        get: function () { return val; },
      });
    }

    /**
     *
     * 计算持续时长
     * @param  {String} fmt 模板字符串
     * @param {Number} timestamp 时间戳
     * @param {Boolean} ms 是否是 含有毫秒
     * @return 相印时间
     */
    function duration(fmt, timestamp, ms) {
        if ( fmt === void 0 ) fmt = 'D天h:i:s';
        if ( timestamp === void 0 ) timestamp = 0;
        if ( ms === void 0 ) ms = true;

        var conversion = {
            y: 12,
            m: 30.4375,
            d: 24,
            h: 60,
            i: 60,
            s: 1000,
            v: 1000,
        };
        var tChars = {
            y: function () { return tChars.Y(); }, // 当前剩余年数,
            Y: function () { return Math.floor(tChars.M() / conversion.y); }, // 总剩余年数,
            
            m: function () { return pad(tChars.n(), 2); }, // 当前剩余月数(有前导零)
            n: function () { return tChars.M() % conversion.y; }, // 当前剩余月数(无前导零)
            M: function () { return Math.floor(tChars.D() / conversion.m); }, // 总剩余月数
            
            d: function () { return pad(tChars.j(), 2); }, // 当前剩余天数(有前导零)
            j: function () { return Math.floor(tChars.D() % conversion.m); }, // 当前剩余天数(无前导零)。
            D: function () { return Math.floor(tChars.H() / conversion.d); }, // 总剩余天数
            
            h: function () { return pad(tChars.g(), 2); }, // 当前小时剩余数(有前导零)
            g: function () { return Math.floor(tChars.H() % conversion.d); }, // 当前小时剩余数(无前导零)
            H: function () { return Math.floor(tChars.I() / conversion.h); }, // 总剩余小时数
            
            i: function () { return pad(Math.floor(tChars.I() % conversion.h), 2); }, // 当前分钟剩余点数
            I: function () { return Math.floor(tChars.S() / conversion.i); }, // 总剩余分钟数
            
            s: function () { return pad(Math.floor(tChars.S() % conversion.i), 2); }, // 当前秒钟剩余点数
            S: function () { return Math.floor(tChars.V() / conversion.s); }, // 总剩余秒数
            
            v: function () { return pad(Math.floor(tChars.V() % conversion.s), 3); }, // 当前毫秒剩余数
            V: function () { return ms ? new Date(timestamp) - 0 : new Date(timestamp) * conversion.v; }, // 总剩余毫秒数
        };
        
        if (fmt === 'json' || fmt === 'all' || fmt === -1 || fmt === '-1') {
            var json = {};
            Object.keys(tChars).forEach(function (res, idx) { return json[res] = tChars[res](); });
            return json;
        }
        return fmt.replace(/(\\?([a-z]))/ig, function (res, key) {
            var result = '';
            if (res !== key) {
                result = key;
            } else {
                if (tChars[key]) {
                    result = tChars[key]();
                } else {
                    result = key.replace('\\', '');
                }
            }
            return result;
        });
    }

    /**
     * 计算持续时间
     * @param fmt
     * @param timestamp1
     * @param timestamp2
     * @param ms
     * @return 相印时间
     */
    function countTime(fmt, timestamp1, timestamp2, ms) {
        if ( fmt === void 0 ) fmt = 'D天h:i:s';
        if ( timestamp1 === void 0 ) timestamp1 = 0;
        if ( timestamp2 === void 0 ) timestamp2 = 0;
        if ( ms === void 0 ) ms = true;

        var count = new Date(timestamp1) - new Date(timestamp2) || 0;
        return duration(fmt, Math.abs(count), ms);
    }
    var count = {
        duration: duration,
        countTime: countTime,
    };

    function getFestival(dateObj) {
      var dateArr = dateObj.match(/(\d{4})(\d{2})(\d{2})/);
      var curDate = new Date(((dateArr[1]) + "-" + (dateArr[2]) + "-" + (dateArr[3])));

      /**
       * 当前月中第几周
       * @return {number}
       */
      function getWeekInMonth() {
        var d = curDate.getDate();
        var w = curDate.getDay();
        return Math.ceil((d + 6 - w) / 7) - 1;
      }

      // 获取农历
      var lunarInfoFn = function () { return calendar.solar2lunar(dateArr[1], dateArr[2], dateArr[3]); };
      var lunarInfo = lunarInfoFn();
      lunarInfo.lcDay = pad(lunarInfo.lDay, 2);
      lunarInfo.lcMonth = pad(lunarInfo.lMonth, 2);

      var getDate = [
        dateArr[2] + dateArr[3],
        '*' + lunarInfo.lcMonth + lunarInfo.lcDay,
        '#' + dateArr[2] + getWeekInMonth() + curDate.getDay(),
        '@' + pad(Math.ceil((new Date(dateArr[1], dateArr[2]-1, dateArr[3]) - new Date(dateArr[1] + '/1/1')) / (60 * 60 * 24 * 1e3)) + 1, 4) ];

      var holiday = {
        '0101': ['元旦节', 'New year'],
        '0214': ['情人节', "Valentine's day"],
        '0308': ['国际妇女节', "International women's day"],
        '0315': ['国际消费者权益日', "International consumer rights day"],
        '0312': ['植树节', "Arbor day"],
        '0422': ['世界地球日', "Earth day"],
        '0501': ['国际劳动节', "International labour day"],
        '0504': ['青年节', "Youth day"],
        '0512': ['国际护士节', "International nurses day"],
        '0518': ['国际博物馆日', "International museum day"],
        '0601': ['国际儿童节', "International children's day"],
        '0605': ['世界环境日', "World environment day"],
        '0623': ['国际奥林匹克日', "International olympic day"],
        '0624': ['世界骨质疏松日', "World osteoporosis day"],
        '0701': ['建党节', "Party's building day"],
        '0801': ['建军节', "Army's day"],
        '0910': ['教师节', "Teacher's day"],
        '1001': ['国庆', 'National day'],
        '1024': ['中国程序员节', "Chinese programmer's day"],
        '1224': ['平安夜', "Christmas Eve"],
        '1225': ['圣诞节', "Christmas Day"],
        '1226': ['毛泽东诞辰', "Zedong Mao birthday"],
        '1117': ['世界学生日', "World student's day"],
        '1201': ['世界艾滋病日', "World AIDS day"],
        '*0101': ['春节', 'Chinese year'],
        '*0115': ['元宵节', 'Lantern day'],
        '*0202': ['龙头节', 'Dragon head day'],
        '*0505': ['端午节', 'Dragon boat day'],
        '*0707': ['乞巧节', 'Qi qiao day'],
        '*0715': ['中元节', 'Ghost day'],
        '*0815': ['中秋节', 'Moon day'],
        '*0909': ['重阳节', 'Chongyang day'],
        '*1001': ['寒衣节', 'Winter clothing day'],
        '*1015': ['下元节', 'Xiayuan day'],
        '*1208': ['腊八节', 'Laba day'],
        '*1223': ['祭灶节', 'Stove day'],
        '*1229': lunarInfo.isLeap ? ['除夕', "Year's Eve"] : '',
        '*1230': lunarInfo.isLeap ? '' : ['除夕', "Year's Eve"],
        '#0520': ['母亲节', "Mother's day"],
        '#0630': ['父亲节', "Father's day"],
        '@0256': ['俄罗斯程序员节', "Russian programmer's day"]
      };
      if (date.replaceHolidayConf) { holiday = date.replaceHolidayConf; }
      if (date.editHolidayConf) { Object.assign(holiday, date.editHolidayConf); }

      var festivalList = {
        cn: [],
        en: [],
      };
      getDate.forEach(function (res) {
        // debugger
        if (holiday && holiday[res]) {
          festivalList.cn.push(holiday[res][0]);
          festivalList.en.push(holiday[res][1]);
        }
      });
      return festivalList;
    }

    /**
     * 和PHP一样的时间戳格式化函数
     * @param  {string} fmt    格式 [默认值: 'Y-m-d']
     *      all: 以JSON对象方式返回所有解析后的模板字符(1.6.0+)
     *      -1: 以JSON对象方式返回所有解析后的模板字符(1.6.0+)
     *      json: 以JSON对象方式返回所有解析后的模板字符(1.6.0+)
     *   日
     *      d: 月份中的第几天，有前导零的2位数字。从"01"到"31"
     *      *k: 月份中的第几天，汉字表示。从"一"到"卅一" (1.3.2+)
     *      D: 星期中的第几天，文本表示，3个字母。从"Mon"到"Sun"
     *      j: 月份中的第几天，没有前导零。从"1"到"31"
     *      *lj 干支日(1.6.0+)
     *      *ld: 农历月份中的第几天。从"初一"到"卅"(1.5.0+)
     *      *lt: 中国古代时晨计时中的时(类似小时)。从"子"到"亥"(1.5.0+)
     *      *lg: 中国古代夜里更时(打更点，一晚五更)。从"一"到"五"(1.5.0+)
     *      *lk: 中国古代时晨计时中的刻(类似分钟，一时晨八刻钟)。从"零"到"七"(1.5.0+)
     *      *fh: 节假日中文: 例如: 元旦节[1.6.0+]
     *      lh: 节假日英文 例如: new Year[1.6.0+]
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
     *      *lf: 干支月(1.6.0+)
     *      m: 数字表示的月份，有前导零。"01"到"12"
     *      M: 三个字母缩写表示的月份。从"Jan"到"Dec"
     *      n: 数字表示的月份，没有前导零。"1"到"12"
     *      *lm: 农历月份。从"正"到"腊"(1.5.0+)(1.6.0*)
     *      *lM: 农历月份。从"1"到"12"(1.6.0+)
     *      t: 给定月份所应有的天数。 "28"到"31"
     *      *la: 星座(1.6.0+)
     *      *ls: 24节气汉字(1.6.0+)
     *      *lS: 24节气英文(1.6.0+)
     *
     *   年
     *     L: 是否为闰年。1:是，0:否
     *     o: ISO-8601格式年份数字。这和 Y 的值类似，星期数（W）属于前一年或下一年，则用那一年。
     *     Y: 4 位数字完整表示的年份
     *     y: 2 位数字表示的年份
     *     *ly: 天干地支记年法(60年一循环)。从"甲子"到"癸亥"(1.6.0*)
     *     *C: 4 个汉字表示的年份(1.3.2+)
     *     *lc: 农历年数字(1.6.0+)
     *     *lC: 农历年汉字(1.6.0+)
     *     *lz: 生肖汉字 (12年一循环)。从"鼠"到"猪"(1.6.0+)
     *     *lZ: 生肖英文 (12年一循环)。从"鼠"到"猪"(1.6.0+)
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

    var isDate = function (d) {
        return new Date(d).toString() !== 'Invalid Date';
    };
    var date$1 = function (fmt, now, ms) {
        if ( fmt === void 0 ) fmt = 'Y-m-d';
        if ( now === void 0 ) now = new Date;
        if ( ms === void 0 ) ms = true;

        now = isDate(this)
          ? this
          : isDate(now)
            ? new Date(now)
            : new Date;
        if (ms === false) { now = new Date(now * 1000); }

        if (!isDate(now)) { throw Error((function (D) {
            return '' +
              '参数2不正确，须传入 “日期时间对象”，或 “Unix时间戳” 或 “时间戳字符串”。\n可以参考以下值：\n' +
              "  \"" + D + "\"\n" +
              "  \"" + (D.toUTCString()) + "\"\n" +
              "  " + (D.getTime()) + "  -- 推荐\n";
        })(new Date())); }

        // 获取农历
        var lunarInfo = function () { return calendar.solar2lunar(tChars.Y(), tChars.n(), tChars.j()); };

        // 模板字串替换函数
        var tChars = {
            // 日
            d: function () { return pad(tChars.j(), 2); },
            k: function () { return textReplace(tChars.j()); }, // 中文日(1.3.2+), PHP中无此功能
            D: function () { return tChars.l().substr(0, 3); },
            j: function () { return now.getDate(); },
            lj: function () { return lunarInfo().gzDay; }, // 干支日(1.6.0+)
            ld: function () { return lunarInfo().IDayCn; },
            lt: function () { return lunarTime[Math.floor((tChars.G() >= 23 ? 0 : tChars.G() + 1) / 2)]; },
            lg: function () { return tChars.G() > 18 || tChars.G() < 5 ? Math.ceil((tChars.G() < 19 ? tChars.G() + 24 : tChars.G()) / 2) - 9 : ''; },
            lG: function () { return ("" + (tChars.lg() ? baseFigure[tChars.lg()] + '更' : '')); },
            lk: function () { return lunarKe[Math.floor(((tChars.U() + 60 * 60) % (60 * 60 * 2)) / 60 / 15)]; },
            fh: function () { return (getFestival(tChars.Y() + tChars.m() + tChars.d()).cn || []).join(); },
            lh: function () { return (getFestival(tChars.Y() + tChars.m() + tChars.d()).en || []).join(); },
            l: function () { return longDays[tChars.w()]; },
            N: function () { return tChars.w() === 0 ? 7 : tChars.w(); },
            S: function () { return txt_ordin[tChars.j()] ? txt_ordin[tChars.j()] : 'th'; },
            w: function () { return now.getDay(); },
            K: function () { return weekDay[tChars.w()]; }, // 中文周(1.3.2+)
            z: function () { return Math.ceil((now - new Date(tChars.Y() + '/1/1')) / (60 * 60 * 24 * 1e3)); },

            // 周
            W: function () {
                var inYearDay = tChars.z(); // 当前年份中的第n天
                var yDay = new Date(tChars.Y() + '1/1').getDay(); // 第一天周几
                var diffDay = (yDay > 0) - 0;
                return Math.ceil((inYearDay - yDay) / 7) + diffDay;
            },

            // 月
            F: function () { return txt_months[tChars.n()]; },
            f: function () { return textReplace(tChars.n()); }, // 中文月(1.3.2+), PHP中无此功能
            lf: function () { return lunarInfo().gzMonth; }, // 干支月(1.6.0+)
            m: function () { return pad(tChars.n(), 2); },
            M: function () { return tChars.F().substr(0, 3); },
            n: function () { return now.getMonth() + 1; },
            lM: function () { return lunarInfo().lMonth; },
            lm: function () { return lMonth[lunarInfo().lMonth]; },
            t: function () {
                var year = tChars.Y();
                var nextMonth = tChars.n();
                if (nextMonth === 12) {
                    year += 1;
                    nextMonth = 0;
                }
                return new Date(year, nextMonth, 0).getDate();
            },
            la: function () { return lunarInfo().astro; },
            ls: function () { return lunarInfo().Term || ''; }, // 24节气汉字(1.6.0+)
            lS: function () { return solar[lunarInfo().Term] || ''; }, // 24节气英文(1.6.0+)
            lq: function () { return Math.ceil((tChars.n() - 0) / 3); }, // 季度数字
            lQ: function () { return baseFigure[tChars.lq()]; }, // 季度汉字(1.6.0+)
            q: function () { return txt_ordin[tChars.lq()] ? tChars.lq() + '' + txt_ordin[tChars.lq()] : tChars.lq() + 'th'; }, // 季度英文缩写
            Q: function () { return ordinal[tChars.lq() - 1]; }, // 李度英文(1.6.0+)

            // 年
            L: function () { return Number(tChars.Y() % 400 === 0 || (tChars.Y() % 100 !== 0 && tChars.Y() % 4 === 0)); },
            o: function () {
                var yearWeek = new Date(tChars.Y(), 0, 1).getDay();
                var diffTime = 60 * 60 * 24 * 1000 * (7 - yearWeek);
                var timestramp = yearWeek > 3 ? now.getTime() - diffTime : now.getTime();
                return new Date(timestramp).getFullYear();

            },
            Y: function () { return now.getFullYear(); },
            y: function () { return (tChars.Y() + '').slice(2); },
            ly: function () { return lunarInfo().gzYear; }, // 干支年(1.6.0*)
            C: function () { return textReplace2(tChars.Y()); }, // 中文年(1.3.2+), PHP中无此功能
            lc: function () { return lunarInfo().lYear; }, // 农历年数字(1.6.0+)
            lC: function () { return textReplace2(lunarInfo().lYear); }, // 农历年汉字(1.6.0+)
            lz: function () { return lunarInfo().Animal; }, // 生肖汉字(1.6.0+)
            lZ: function () { return zodiac[lunarInfo().Animal]; }, // 生肖英文(1.6.0+)

            // 时间
            a: function () { return tChars.G() > 11 ? 'pm' : 'am'; },
            A: function () { return tChars.a().toUpperCase(); },
            B: function () {
                var off = (now.getTimezoneOffset() + 60) * 60;
                var theSeconds = (tChars.G() * 3600) + (now.getMinutes() * 60) + now.getSeconds() + off;
                var beat = Math.floor(theSeconds / 86.4);
                // beat > 1000 ? beat -= 1000 : beat += 1000
                if (beat > 1000) { beat -= 1000; }
                if (beat < 0) { beat += 1000; }

                return pad(beat, 3);
            },
            g: function () { return tChars.G() % 12 || 12; },
            G: function () { return now.getHours(); },
            h: function () { return pad(tChars.g(), 2); },
            H: function () { return pad(tChars.G(), 2); },
            i: function () { return pad(now.getMinutes(), 2); },
            s: function () { return pad(now.getSeconds(), 2); },
            u: function () { return tChars.v() + pad(Math.floor(Math.random() * 1000), 3); },
            v: function () { return (now.getTime() + '').substr(-3); },

            // 时区
            e: function () { return Intl.DateTimeFormat().resolvedOptions().timeZone; },
            I: function () {
                var DST = null;
                for (var i = 0; i < 12; ++i) {
                    var d = new Date(tChars.Y(), i, 1);
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
            P: function () { return tChars.O().match(/[+-]?\d{2}/g).join(':'); },
            T: function () {
                var tz = now.toLocaleTimeString(navigator.language, { timeZoneName: 'short' }).split(/\s/);
                return tz[tz.length - 1];
            },
            Z: function () { return -(now.getTimezoneOffset() * 60); },

            // 完整日期时间
            c: function () { return tChars.Y() + '-' + tChars.m() + '-' + tChars.d() + 'T' + tChars.h() + ':' + tChars.i() + ':' + tChars.s() + tChars.P(); },
            r: function () { return now.toString(); },
            U: function () { return Math.round(now.getTime() / 1000); },
        };

        if (fmt === 'json' || fmt === 'all' || fmt === -1 || fmt === '-1') {
            var json = {};
            Object.keys(tChars).forEach(function (res, idx) { return json[res] = tChars[res](); });
            return json;
        }
        return fmt.replace(/\\?(([lf][a-z])|([a-z]))/ig, function (res, key) {
            var result = '';
            if (res !== key) {
                result = key;
            } else {
                if (tChars[key]) {
                    result = tChars[key]();
                } else {
                    result = key.replace('\\', '');
                }
            }
            return result;
        });
    };

    defP(Date.prototype, 'format', date$1);

    defP(date$1, 'version', '1.7.17');
    defP(date$1, 'description', function () { return (console.info('%cdate-php使用说明:\n' +
      '已经废弃，查看使用说明请移步这里\nhttps://github.com/toviLau/date-php/blob/master/README.md'
      , 'color:#c63'
    )); });

    Object.keys(count).forEach(function (res) {
        defP(date$1, res, count[res]);
    });

    return date$1;

}));
