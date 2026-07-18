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
Object.assign({
    0: '\u65e5',
}, baseFigure);
const dateFigure = Object.assign({
    0: '\u3007', 7: '\u4e03', 8: '\u516b', 9: '\u4e5d', 10: '\u5341',
    20: '\u5eff', 30: '\u5345',
}, baseFigure);
const lMonth = Object.assign({
    7: '\u4e03', 8: '\u516b', 9: '\u4e5d', 10: '\u5341', 11: '\u51ac', 12: '\u814a',
}, baseFigure);
const textReplace2 = (succ) => (succ + '').split('').map((res) => dateFigure[Number(res)]).join('');

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
 * @LastEditTime : 2026-07-09 09:18:08
 */

export { lunarPlugin as default };
