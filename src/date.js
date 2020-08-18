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
import count from './library/count';
import getLunar from './library/getLunar';
import getFestival from './library/getFestival';
import {
    pad,
    longDays,
    txt_ordin,
    txt_months,
    baseFigure,
    lunarTime,
    ordinal,
    zodiac,
    solar,
    lunarKe,
    weekDay,
    lMonth,
    textReplace,
    textReplace2,
    defP,
} from './library/module';

const isDate = function (d) {
    return new Date(d).toString() !== 'Invalid Date';
};
const date = function (fmt = 'Y-m-d', now = new Date, ms = true) {
    now = isDate(this)
      ? this
      : isDate(now)
        ? new Date(now)
        : new Date;
    if (ms === false) now = new Date(now * 1000);

    if (isDate(now)) throw Error((D => {
        return '' +
          '参数2不正确，须传入 “日期时间对象”，或 “Unix时间戳” 或 “时间戳字符串”。\n可以参考以下值：\n' +
          `  "${ D }"\n` +
          `  "${ D.toUTCString() }"\n` +
          `  ${ D.getTime() }  -- 推荐\n`;
    })(new Date()));

    // 获取农历
    const lunarInfo = () => getLunar.solar2lunar(tChars.Y(), tChars.n(), tChars.j());

    // 模板字串替换函数
    const tChars = {
        // 日
        d: () => pad(tChars.j(), 2),
        k: () => textReplace(tChars.j()), // 中文日(1.3.2+), PHP中无此功能
        D: () => tChars.l().substr(0, 3),
        j: () => now.getDate(),
        lj: () => lunarInfo().gzDay, // 干支日(1.6.0+)
        ld: () => lunarInfo().IDayCn,
        lt: () => lunarTime[Math.floor((tChars.G() >= 23 ? 0 : tChars.G() + 1) / 2)],
        lg: () => tChars.G() > 18 || tChars.G() < 5 ? Math.ceil((tChars.G() < 19 ? tChars.G() + 24 : tChars.G()) / 2) - 9 : '',
        lG: () => `${ tChars.lg() ? baseFigure[tChars.lg()] + '更' : '' }`,
        lk: () => lunarKe[Math.floor(((tChars.U() + 60 * 60) % (60 * 60 * 2)) / 60 / 15)],
        fh: () => (getFestival(tChars.Y() + tChars.m() + tChars.d()).cn || []).join(),
        lh: () => (getFestival(tChars.Y() + tChars.m() + tChars.d()).en || []).join(),
        l: () => longDays[tChars.w()],
        N: () => tChars.w() === 0 ? 7 : tChars.w(),
        S: () => txt_ordin[tChars.j()] ? txt_ordin[tChars.j()] : 'th',
        w: () => now.getDay(),
        K: () => weekDay[tChars.w()], // 中文周(1.3.2+)
        z: () => Math.ceil((now - new Date(tChars.Y() + '/1/1')) / (60 * 60 * 24 * 1e3)),

        // 周
        W: () => {
            const inYearDay = tChars.z(); // 当前年份中的第n天
            const yDay = new Date(tChars.Y() + '1/1').getDay(); // 第一天周几
            const diffDay = (yDay > 0) - 0;
            return Math.ceil((inYearDay - yDay) / 7) + diffDay;
        },

        // 月
        F: () => txt_months[tChars.n()],
        f: () => textReplace(tChars.n()), // 中文月(1.3.2+), PHP中无此功能
        lf: () => lunarInfo().gzMonth, // 干支月(1.6.0+)
        m: () => pad(tChars.n(), 2),
        M: () => tChars.F().substr(0, 3),
        n: () => now.getMonth() + 1,
        lM: () => lunarInfo().lMonth,
        lm: () => lMonth[lunarInfo().lMonth],
        t: () => {
            let year = tChars.Y();
            let nextMonth = tChars.n();
            if (nextMonth === 12) {
                year += 1;
                nextMonth = 0;
            }
            return new Date(year, nextMonth, 0).getDate();
        },
        la: () => lunarInfo().astro,
        ls: () => lunarInfo().Term || '', // 24节气汉字(1.6.0+)
        lS: () => solar[lunarInfo().Term] || '', // 24节气英文(1.6.0+)
        lq: () => Math.ceil((tChars.n() - 0) / 3), // 季度数字
        lQ: () => baseFigure[tChars.lq()], // 季度汉字(1.6.0+)
        q: () => txt_ordin[tChars.lq()] ? tChars.lq() + '' + txt_ordin[tChars.lq()] : tChars.lq() + 'th', // 季度英文缩写
        Q: () => ordinal[tChars.lq() - 1], // 李度英文(1.6.0+)

        // 年
        L: () => Number(tChars.Y() % 400 === 0 || (tChars.Y() % 100 !== 0 && tChars.Y() % 4 === 0)),
        o: () => {
            const yearWeek = new Date(tChars.Y(), 0, 1).getDay();
            const diffTime = 60 * 60 * 24 * 1000 * (7 - yearWeek);
            const timestramp = yearWeek > 3 ? now.getTime() - diffTime : now.getTime();
            return new Date(timestramp).getFullYear();

        },
        Y: () => now.getFullYear(),
        y: () => (tChars.Y() + '').slice(2),
        ly: () => lunarInfo().gzYear, // 干支年(1.6.0*)
        C: () => textReplace2(tChars.Y()), // 中文年(1.3.2+), PHP中无此功能
        lc: () => lunarInfo().lYear, // 农历年数字(1.6.0+)
        lC: () => textReplace2(lunarInfo().lYear), // 农历年汉字(1.6.0+)
        lz: () => lunarInfo().Animal, // 生肖汉字(1.6.0+)
        lZ: () => zodiac[lunarInfo().Animal], // 生肖英文(1.6.0+)

        // 时间
        a: () => tChars.G() > 11 ? 'pm' : 'am',
        A: () => tChars.a().toUpperCase(),
        B: () => {
            const off = (now.getTimezoneOffset() + 60) * 60;
            const theSeconds = (tChars.G() * 3600) + (now.getMinutes() * 60) + now.getSeconds() + off;
            let beat = Math.floor(theSeconds / 86.4);
            // beat > 1000 ? beat -= 1000 : beat += 1000
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;

            return pad(beat, 3);
        },
        g: () => tChars.G() % 12 || 12,
        G: () => now.getHours(),
        h: () => pad(tChars.g(), 2),
        H: () => pad(tChars.G(), 2),
        i: () => pad(now.getMinutes(), 2),
        s: () => pad(now.getSeconds(), 2),
        u: () => tChars.v() + pad(Math.floor(Math.random() * 1000), 3),
        v: () => (now.getTime() + '').substr(-3),

        // 时区
        e: () => Intl.DateTimeFormat().resolvedOptions().timeZone,
        I: () => {
            let DST = null;
            for (var i = 0; i < 12; ++i) {
                const d = new Date(tChars.Y(), i, 1);
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
        P: () => tChars.O().match(/[+-]?\d{2}/g).join(':'),
        T: () => {
            const tz = now.toLocaleTimeString(navigator.language, { timeZoneName: 'short' }).split(/\s/);
            return tz[tz.length - 1];
        },
        Z: () => -(now.getTimezoneOffset() * 60),

        // 完整日期时间
        c: () => tChars.Y() + '-' + tChars.m() + '-' + tChars.d() + 'T' + tChars.h() + ':' + tChars.i() + ':' + tChars.s() + tChars.P(),
        r: () => now.toString(),
        U: () => Math.round(now.getTime() / 1000),
    };

    if (fmt === 'json' || fmt === 'all' || fmt === -1 || fmt === '-1') {
        const json = {};
        Object.keys(tChars).forEach((res, idx) => json[res] = tChars[res]());
        return json;
    }
    return fmt.replace(/\\?(([lf][a-z])|([a-z]))/ig, (res, key) => {
        let result = '';
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

defP(Date.prototype, 'format', date);

defP(date, 'version', '__VERSION__');
defP(date, 'description', () => (console.info('%cdate-php使用说明:\n' +
  '已经废弃，查看使用说明请移步这里\nhttps://github.com/toviLau/date-php/blob/master/README.md'
  , 'color:#c63',
)));

Object.keys(count).forEach(res => {
    defP(date, res, count[res]);
});
export default date;
