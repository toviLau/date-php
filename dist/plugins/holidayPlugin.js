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
     * @LastEditTime : 2026-07-09 09:15:43
     */
    const holidayPlugin = {
        name: "holiday",
        install: (tChars, ctx) => {
            const date = ctx.date;
            tChars.fh = () => (getFestival(tChars.Y() + tChars.m() + tChars.d(), date).cn || []).join();
            tChars.lh = () => (getFestival(tChars.Y() + tChars.m() + tChars.d(), date).en || []).join();
        },
    };

    return holidayPlugin;

}));
