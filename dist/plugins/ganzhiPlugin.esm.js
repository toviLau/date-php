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
 * @Date         : 2026-07-09 07:49:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-09 23:26:00
 */
const ganzhiPlugin = {
    name: "ganzhi",
    install: (tChars, ctx) => {
        const dateTime = ctx.dateTime;
        tChars.gzY = () => toGanZhiYear(dateTime.getFullYear());
        tChars.gzM = () => {
            const m = dateTime.getMonth() + 1;
            return toGanZhi(m + 1);
        };
        tChars.gzD = () => {
            const base = new Date(1900, 0, 7);
            const diff = Math.floor((dateTime.getTime() - base.getTime()) / 86400000);
            return toGanZhi(diff);
        };
        tChars.gzH = () => {
            const h = dateTime.getHours();
            const zhiIdx = Math.floor((h + 1) / 2) % 12;
            const dayBase = new Date(1900, 0, 7);
            const dayDiff = Math.floor((dateTime.getTime() - dayBase.getTime()) / 86400000);
            const ganIdx = (dayDiff % 10 * 2 + zhiIdx) % 10;
            return Gan[ganIdx] + Zhi[zhiIdx];
        };
    },
};

export { ganzhiPlugin as default };
