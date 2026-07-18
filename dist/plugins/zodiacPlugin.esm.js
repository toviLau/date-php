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
 * @LastEditTime : 2026-07-09 23:26:15
 */
const zodiacPlugin = {
    name: "zodiac",
    install: (tChars, ctx) => {
        const dateTime = ctx.dateTime;
        tChars.zz = () => getAnimal(dateTime.getFullYear());
        tChars.zzEn = () => {
            const animal = getAnimal(dateTime.getFullYear());
            const zodiacMap = {
                '\u9f20': 'Rat', '\u725b': 'Ox', '\u864e': 'Tiger', '\u5154': 'Rabbit',
                '\u9f99': 'Dragon', '\u86c7': 'Snake', '\u9a6c': 'Horse', '\u7f8a': 'Sheep',
                '\u7334': 'Monkey', '\u9e21': 'Rooster', '\u72d7': 'Dog', '\u732a': 'Pig',
            };
            return zodiacMap[animal] || animal;
        };
    },
};

export { zodiacPlugin as default };
