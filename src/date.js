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
import toLunar from './library/toLunar';

const date = function (fmt = 'Y-m-d', now = new Date()) {
    fmt = fmt ? fmt : 'Y-m-d';
    if (!(new Date(now - 0).getTime() || new Date(now).getTime())) throw Error((D => {
        return '' +
            '参数2不正确，须传入 “日期时间对象”，或 “Unix时间戳” 或 “时间戳字符串”。\n可以参考以下值：\n' +
            `  "${ D }"\n` +
            `  "${ D.toUTCString() }"\n` +
            `  ${ D.getTime() }  -- 推荐\n`;
    })(new Date()));

    now = this || (!isNaN(now - 0) ? new Date(now - 0) : new Date(now));

    /**
     * 补前导零(0)
     * @param {number} str 字符
     * @param {number} len 长度
     * @param {string} placeholder 前导占位符
     * @returns {string}
     */
    const pad = function (str, len, placeholder = '0') {
        str += '';
        if (str.length < len) {
            return new Array(++len - str.length).join(placeholder) + str;
        } else {
            return str;
        }
    };
    const longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const txt_ordin = { 1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd', 31: 'st' };
    const txt_months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const baseFigure = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六' };
    const lunarTime = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    const lunarKe = Object.assign(
        {},
        {
            0: '零',
            7: '七',
        },
        ...baseFigure,
    );
    const weekDay = Object.assign(
        {},
        {
            0: '日',
        },
        ...baseFigure,
    );
    const dateFigure = Object.assign(
        {},
        {
            0: '〇', 7: '七', 8: '八', 9: '九', 10: '十',
            20: '廿', 30: '卅',
        },
        ...baseFigure,
    );

    // 取中文日期
    const textReplace = res => {
        return res.toString()
            .split('')
            .reverse()
            .map((val, key) => {
                const v = Math.pow(10, key) * val;
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
    const replaceChars = {
        // 日
        d: () => pad(replaceChars.j(), 2),
        k: () => textReplace(replaceChars.j()), // 中文日(1.3.2+), PHP中无此功能
        D: () => replaceChars.l().substr(0, 3),
        j: () => now.getDate(),
        ld: () => getLunar().ld,
        lt: () => lunarTime[Math.floor((replaceChars.G() >= 23 ? 0 : replaceChars.G() + 1) / 2)],
        lg: () => {
            const nowTime = replaceChars.G();
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
                    return `${baseFigure[Math.ceil((nowTime < 19 ? nowTime + 24 : nowTime) / 2) - 9]}更`;
                default:
                    return '';

            }
        },
        lk:()=>lunarKe[Math.floor(((replaceChars.U()+60*60) % (60*60*2))/60 / 15)],
        l: () => longDays[replaceChars.w()],
        N: () => replaceChars.w() === 0 ? 7 : replaceChars.w(),
        S: () => txt_ordin[replaceChars.j()] ? txt_ordin[replaceChars.j()] : 'th',
        w: () => now.getDay(),
        K: () => weekDay[replaceChars.w()], // 中文周(1.3.2+), PHP中无此功能
        z: () => Math.ceil((now - new Date(replaceChars.Y() + '/1/1')) / (60 * 60 * 24 * 1e3)),

        // 周
        W: () => {
            const dayNr = (replaceChars.w() + 6) % 7;
            now.setDate(replaceChars.j() - dayNr + 3);
            const firstThursday = now.valueOf();
            now.setMonth(0, 1);
            if (replaceChars.w() !== 4) {
                now.setMonth(0, 1 + ((4 - replaceChars.w()) + 7) % 7);
            }
            const retVal = 1 + Math.ceil((firstThursday - now) / (60 * 60 * 24 * 7 * 1e3));

            return pad(retVal, 2);
        },

        // 月
        F: () => txt_months[replaceChars.n()],
        f: () => textReplace(replaceChars.n()), // 中文月(1.3.2+), PHP中无此功能
        m: () => pad(replaceChars.n(), 2),
        M: () => replaceChars.F().substr(0, 3),
        n: () => now.getMonth() + 1,
        lm: () => getLunar().lm,
        t: () => {
            let year = replaceChars.Y();
            let nextMonth = replaceChars.n();
            if (nextMonth === 12) {
                year += 1;
                nextMonth = 0;
            }
            return new Date(year, nextMonth, 0).getDate();
        },

        // 年
        L: () => Number(replaceChars.Y() % 400 === 0 || (replaceChars.Y() % 100 !== 0 && replaceChars.Y() % 4 === 0)),
        o: () => {
            now.setDate(replaceChars.j() - ((replaceChars.w() + 6) % 7) + 3);
            return replaceChars.Y();
        },
        Y: () => now.getFullYear(),
        y: () => (replaceChars.Y() + '').slice(2),
        ly: () => getLunar().ly,
        C: () => (replaceChars.Y() + '').split('').map(res => dateFigure[res]).join(''), // 中文年(1.3.2+), PHP中无此功能

        // 时间
        a: () => replaceChars.G() > 11 ? 'pm' : 'am',
        A: () => replaceChars.a().toUpperCase(),
        B: () => {
            const off = (now.getTimezoneOffset() + 60) * 60;
            const theSeconds = (replaceChars.G() * 3600) + (now.getMinutes() * 60) + now.getSeconds() + off;
            let beat = Math.floor(theSeconds / 86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if ((String(beat)).length === 1) beat = '00' + beat;
            if ((String(beat)).length === 2) beat = '0' + beat;
            return beat;
        },
        g: () => replaceChars.G() % 12 || 12,
        G: () => now.getHours(),
        h: () => pad(replaceChars.g(), 2),
        H: () => pad(replaceChars.G(), 2),
        i: () => pad(now.getMinutes(), 2),
        s: () => pad(now.getSeconds(), 2),
        u: () => (now.getTime() + '').substr(-3),

        // 时区
        e: () => Intl.DateTimeFormat().resolvedOptions().timeZone,
        I: () => {
            let DST = null;
            for (var i = 0; i < 12; ++i) {
                const d = new Date(replaceChars.Y(), i, 1);
                const offset = d.getTimezoneOffset();

                if (DST === null) DST = offset;
                else if (offset < DST) {
                    DST = offset;
                    break;
                } else if (offset > DST) break;
            }
            return (now.getTimezoneOffset() === DST) | 0;
        },
        O: () => (now.getTimezoneOffset() > 0 ? '-' : '+') + pad(Math.abs(now.getTimezoneOffset() / 60 * 100), 4),
        P: () => replaceChars.O().match(/[+-]?\d{2}/g).join(':'),
        T: () => {
            const tz = now.toLocaleTimeString(navigator.language, { timeZoneName: 'short' }).split(/\s/);
            return tz[tz.length - 1];
        },
        Z: () => -(now.getTimezoneOffset() * 60),

        // 完整日期时间
        c: () => replaceChars.Y() + '-' + replaceChars.m() + '-' + replaceChars.d() + 'T' + replaceChars.h() + ':' + replaceChars.i() + ':' + replaceChars.s() + replaceChars.P(),
        r: () => now.toString(),
        U: () => Math.round(now.getTime() / 1000),
    };
    return fmt.replace(/(\\?(l[ymdtgk])|([a-z]))/ig, (res, key) => {
        let result = '';
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
defP(date, 'version', '__VERSION__');
defP(date, 'description', () => (console.info('%cdate-php使用说明:\n' +
    '为了减少包的体积此方法已经废弃，查看使用说明请移步这里\nhttps://github.com/toviLau/date-php/blob/master/README.md'
    , 'color:#c63',
)));

function defP(obj, key, val) {
    Object.defineProperty(obj, key, {
        get: () => val,
    });
}

export default date;
