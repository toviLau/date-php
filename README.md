### JavaScript模仿类似于PHP的日期格式功能JavaScript implements date formatting functions similar to PHP
---
[![issues](https://img.shields.io/github/issues/toviLau/date-php)](https://github.com/toviLau/date-php/issues)
[![forks](https://img.shields.io/github/forks/toviLau/date-php)](https://github.com/toviLau/date-php)
[![stars](https://img.shields.io/github/stars/toviLau/date-php)](https://github.com/toviLau/date-php)
[![npm](https://img.shields.io/npm/v/date-php)](https://www.npmjs.com/package/date-php)
[![downloads](https://img.shields.io/npm/dm/date-php.svg)](https://www.npmjs.com/package/date-php)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/date-php)](https://www.npmjs.com/package/date-php)
![github last commit](https://img.shields.io/github/last-commit/tovilau/date-php)
![license](https://img.shields.io/github/license/toviLau/date-php)

> 这是一个Javascript模仿类似于PHP日期时间格式化函数，使用方法和PHP非常类似，有丰富的模板字符，并在原来的基础上增强了一些模板字符。例如：中国的农历日期、用汉字来表示日期、十二生肖与星座。让转换日期时间更自由。  
> This is a JavaScript implements date formatting functions similar to PHP. It is very similar to PHP, has rich template characters, and enhances some template characters on the basis of the original. For example: Chinese Lunar Date, Chinese Character Date, Chinese Zodiac and Constellation. Make the conversion datetimes more free. 

```javascript
// 举个栗子(demo)
// 首先(First)
var d = new Date(); // 1563148800000 or 'Mon Jul 15 2019 15:38:56 GMT+0800 (中国标准时间)'

// 然后(Second)
date('Y-m-d', d); // "2019-07-15
date('m-d-Y H:i:s', d); // "07-15-2019 15:38:56"

// 或者这样(Or)
d.format('Y-m-d'); // "2019-07-15
d.format('m-d-Y H:i:s'); // "07-15-2019 15:38:56"
```
### 安装(install)
```
// npm
npm i -S date-php;

// CDN
<script src="//unpkg.com/date-php"></script>
```

### 使用(use)
 > 1、以下所有方式的入参都是可选参数。  
 > 　 Entry parameters in all of the following ways are optional.
 >
 > 2、以下`new Date()`或其它的日期时间的初始化的值，我们默许都是 `1563176336000` Unix时间戳对应的日期时间。  
 > 　 The following `new Date ()` or other date time initialization values, we acquiescence are `1563176336000` Unix timestamp corresponding Datetime.
 
```javascript
// npm -- CDN方式跳过(CDN mode skip)
import date from 'date-php'; // 引入date-php(import date-php)

// nodejs -- CDN方式跳过(CDN mode skip)
const date = require('date-php'); // 引入date-php(require date-php)

/**
 * 示例1 - date('模板字符', 日期时间对象)
 * demo1 - date ('Template character', Datetime object);
 **/
date('Y-m-d H:i:s', new Date()); // "2019-07-15 15:38:56"
date('Y年m月d日 H点i分s秒', new Date()); // "2019年07月15日 15点38分56秒" 
date('m-d-Y H:i:s', new Date()); // "07-15-2019 15:38:56"
date('m-d-Y H:i:s.v', new Date()); // "07-15-2019 15:38:56.064”
date('m-d-Y H:i:s.u', new Date()); // "07-15-2019 15:38:56.064019”
date('y/m/d H:i', new Date()); // "19/07/15 15:38" 
date('y.m.d H:i', new Date()); // "19.07.15 15:38" 
date('y-m-d h:i[a]', new Date()); // "19-07-15 03:38[pm]"
date('Y-m-d H:i 第W周', 'Mon Jul 15 2019 15:38:56 GMT+0800 (中国标准时间)'); // "2019-07-15 15:38 第29周"
date('y.m.d H:i', new Date()); // "19.07.15 15:38" 
date('C年f月k日 星期K', 1563176336000); // "二〇一九年七月十五日 星期一" (1.3.2+)
date('ly年lm月ld日lt时lk刻【lg】',1563122222000) // "己亥年六月十三日子时六刻【三更】"(1.5.0+)
// 更多请自由发挥...
// More please use your imagination...

/**
 * 示例2 - 日期时间对象.format('模板字符');
 * demo2 - datetimeObject.format('Template character');
 */
new Date('2019-07-15 15:38:56').format('Y-m-d H:i:s'); // "2019-07-15 15:38:56" 
new Date(1563176336000).format('Y-m-d H:ia'); // "2019-07-15 15:38pm"
new Date().format('Y-m-d H:i 第W周'); // "2019-07-15 15:38 第29周"
// 更多请自由发挥...
// More please use your imagination...
```

### 模板字符，默认值：{string} 'Y-m-d'(Template character, default: {string} 'Y-m-d')
> 1、你也可以去<u> [**PHP中文官网**](https://www.php.net/manual/zh/function.date.php) </u>看看，使用方法类似。  
> 　 You can also go to the <u> [**PHP english official website**](https://www.php.net/manual/en/function.date.php) </u>to see, the method is similar.  
> 
> 2、~~你也可以通过静态方法 `date.description` 在控制台打出所有模板字符。~~<sup>(1.3.2<sup> - </sup>)</sup>   
> 　 ~~You can also output all template character in the console via the static method `date.description`.~~<sup>(1.3.2<sup> - </sup>)</sup>   
>
> 3、关于转义模板字符，这里与PHP不同 **【敲黑板！！！】** <sup>(1.3.0<sup> + </sup>)</sup>  
> 　 About the escaped template character, here is different from PHP **[Note!!!]** <sup>(1.3.0<sup> + </sup>)</sup>  
>> **如果在date里想输出模板本来的字符，请用转义符--双反斜杠"\\\\”(PHP是一个单反斜杠"\\")。**   
>> **If you want to output the original character of the template on the date, use the escape character – double backslash "\\\\" (PHP is a single backslash "\\").**  
>>   举个栗子：date(“\\\\I(大写的i) \\\\l(小写的L)\\\\o\\\\v\\\\e \\\\y\\\\o\\\\u: y-m-d H:i", new Date()) // 输出 "I love you: 19-07-15 15:38"  
>>   Example: date(“\\\\I(Uppercase i) \\\\ l (lowercase L)\\\\o\\\\v\\\\e \\\\y\\\\o\\\\u: y-m-d H:i”, new Date()) // Output "I love you: 19-07-15 15:38"  
>>
>>   上面栗子中，'I'、'l'、'o'、'v'、'e'、'y'、'u' 都是模板字符，所以前面加双反斜杠(\\\\)转义，这样字符就会输出本来的值。  
>>   In the previous example, 'I', 'l', 'o', 'e', 'y', 'u' are all template character, so add an double backslash (\\\\\) in front of the template character to escape , Character will output the original value.
>
> 4、加"\*"号的为PHP语言中没有的功能，是`date-php.js`特有的功能。  
> 　 Add the "\*" in front is a function not available in the PHP language, and is a feature unique to `date-php.js`.
> 
> 5、转农历正常只能转1900-2100之间的200年份。  
> 　 The conversion to the lunar calendar can only be transferred to 200 years between 1900-2100.
> 
> 6、模板字条区分大小写。  
> 　 Template characters are case sensitive.

```
 日(Day)
    d: 月份中的第几天，有前导零的2位数字。从"01"到"31"
       Day of the month, 2 digits with leading zeros. 01 through 31
       
   *k: 月份中的第几天，汉字表示。从"一"到"卅一" 【1.3.2+】
       Day of the month, Chinese character representation. "一" through "卅一”[1.3.2+]
       
    D: 星期中的第几天，文本表示，3个字母。从"Mon"到"Sun"
       Day of the week, textual representation, three letters. Mon through Sun
       
    j: 月份中的第几天，没有前导零。从"1"到"31"
       Day of the month without leading zeros. 1 through 31

  *lj: 月份中的第几天(天干地支表示法) 例：'甲子' / '戊戌'【1.6.0+】
       Day of the month(Heavenly Stems && Earthly Branches  Representation) E.g：'甲子' / '戊戌'【1.6.0+】
       
  *ld: 农历月份中的第几天。从"初一"到"卅"【1.5.0+】
       Day of the month of the lunar month. "初一" through "卅"[1.5.0+]
  
  *lt: 中国古代计时单位中的时辰(类似小时，2小时1时辰)。从"子"到"亥"【1.5.0+】
       The 'shi chen' in the ancient Chinese timing unit(similar to hours, 2 hours of 1 "shi chen"). "子" through "亥"[1.5.0+]

  *lg: 中国古代夜里更时(打更点，一晚五更)。从"1”到”5”【1.5.0*】
       The "geng" in ancient Chinese night (tapping geng, one night five geng). "1” through "5”[1.5.0+]
    
  *lG: 中国古代夜里更时(打更点，一晚五更)。从"一更”到”五更”【1.6.0+】
       The "geng" in ancient Chinese night (tapping geng, one night five geng). "一更” through "五更”[1.5.0+]

  *lk: 中国古代计时单位中的刻(类似分钟，一时辰八刻钟)。从"零"到"七"【1.5.0+】
       The 'ke' in the ancient Chinese timing unit(similar to minutes, 1 "shi cheng" of 8 "ke"). "零" through "七"[1.5.0+]

   *fh: 节假日中文: 例如: 元旦节[1.6.0+]
        holiday in chinese. e.g.: 元旦节[1.6.0+]
        !需要自定义节假日请参考 “conf.replaceHolidayConf” “conf.editHolidayConf”
        !For custom holidays, please refer to “conf.replaceHolidayConf” “conf.editHolidayConf”
        
   *lh: 节假日英文 例如: new Year[1.6.0+]
        holiday in english. e.g.: new Year[1.6.0+]
        !需要自定义节假日请参考 “conf.replaceHolidayConf” “conf.editHolidayConf”
        !For custom holidays, please refer to “conf.replaceHolidayConf” “conf.editHolidayConf”

    l: 星期几，完整的文本格式。从"Sunday"到"Saturday"
       A full textual representation of the day of the week. "Sunday" through "Saturday"
       
    N: ISO-8601格式的星期中的第几天。从"1"(表示星期一)到"7"(表示星期天)
       ISO-8601 numeric representation of the day of the week. 1 (for Monday) through 7 (for Sunday)
       
    S: 每月天数后面的英文后缀，2 个字符 st/nd/rd/th。
       English ordinal suffix for the day of the month, 2 characters. st, nd, rd or th. Works well with j
       
    w: 星期中的第几天，数字表示。从"0"(表示星期天)到"6"(表示星期六)
       Numeric representation of the day of the week. 0 (for Sunday) through 6 (for Saturday)
       
    *K: 星期中的第几天，汉字表示。从"日"(表示星期天)到"六"(表示星期六)【1.3.2+】
        The Chinese characters of the day of the week indicate. "日"(for Sunday) through "六"(for Saturday)[1.3.2+]

    z: 年份中的第几天。从"0"到"365"
       The day of the year. "0" through "365"

  星期(Week)
    W: 年份中的第几周
       The week number in year.

  月(Month)
    F: 月份，完整的文本格式。从"January"到"December"
       A full textual representation of a month, such as January or March. "January" through "December"
       
   *f: 月份，汉字表示。从"一"到"十二"【1.3.2+】
       The Chinese characters of the month. "一" through "十二"

  *lf: 月份(天干地支表示法)。 例：'甲子' / '戊戌'【1.6.0+】
       The month(Heavenly Stems && Earthly Branches  Representation) E.g：'甲子' / '戊戌'【1.6.0+】
       
    m: 数字表示的月份，有前导零。"01"到"12"
       Numeric representation of a month, with leading zeros. "1" through "12"
    
    M: 三个字母缩写表示的月份。从"Jan"到"Dec"
       A short textual representation of a month, three letters. "Jan" through "Dec"
    
    n: 数字表示的月份，没有前导零。"1"到"12"
       Numeric representation of a month, without leading zeros. "1" through "12"
    
  *lM: 农历月份。从"1"到"12"【1.6.0+】
       Month of the lunar month. "1" through "12" [1.6.0+]
  
  *lm: 农历月份。从"一"到"十二"【1.5.0+】
       Month of the lunar month. "一" through "十二" [1.5.0+]
  
    t: 给定月份所应有的天数。 "28"到"31"
       Number of days in the given month

   *la: 星座(1.6.0+)
        Constellation (1.6.0+)
   
   *ls: 24节气汉字(1.6.0+)
        24 solar terms Chinese Characters(1.6.0+)

   *lS: 24节气英文(1.6.0+)
        24 solar terms English(1.6.0+)

   *lq: 季度数字(1.6.0+)
        Quarter Number(1.6.0+)

   *lQ: 季度汉字(1.6.0+)
        Quarter Number Chinese Characters(1.6.0+)

   *q: 季度英文缩写(1.6.0+)
       Quarter abbreviations(1.6.0+)

   *Q: 李度英文(1.6.0+)
       Quarter English(1.6.0+)

  年(Year)
    L: 是否为闰年。1:是，0:否
       Whether it's a leap year. 1 leap year, 0 otherwise.
       
    o: ISO-8601格式年份数字。这和 Y 的值类似，星期数（W）属于前一年或下一年，则用那一年。
       ISO-8601 week-numbering year. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead.
       
    Y: 4 位数字完整表示的年份
       A full numeric representation of a year, 4 digits
       
    y: 2 位数字表示的年份
       A two digit representation of a year
       
  *ly: 农历记年法(天干地支，60年一循环)。从"甲子"到"癸亥"【1.5.0+】
       The ancient Chinese lunar calendar year method (the tian gan and the di zhi, cycle of 60 years). [1.5.0+]
  
   *C: 4 个汉字表示的年份【1.3.2+】
       Year indicated by 4 Chinese characters[1.3.2+]

  *lc: 生肖 (12年一循环)。从"鼠"到"猪"(1.6.0+) 
       Chinese zodiac (12-year cycle). From "rat" to "pig" (1.6.0+)

  *lC: 农历年汉字(1.6.0+)
       Chinese character for the lunar calendar (1.6.0+)

  *lz: 生肖汉字(1.6.0+)
       Zodiac Chinese Characters (1.6.0+) 

  *lZ: 生肖英文(1.6.0+)
       Zodiac English (1.6.0+)
  
  时间(Time)
    a: 小写的上午和下午值。"am"或"pm"
       Lowercase Ante meridiem and Post meridiem. "am" or "pm"

    A: 大写的上午和下午值。"AM"或"PM"
       Uppercase Ante meridiem and Post meridiem. "AM" or "PM"

    B: Swatch Internet 标准时。"000"到"999"
       Swatch Internet time. 000 through 999
       
    g: 12 小时格式，没有前导零。"1"到"12"
       12-hour format of an hour without leading zeros. "1" through "12"
       
    G: 24 小时格式，没有前导零。"0"到"23"
       24-hour format of an hour without leading zeros. "0" through "23"

    h: 12 小时格式，有前导零。"01"到"12"
       12-hour format of an hour with leading zeros. "01" through "12"

    H: 24 小时格式，有前导零。"00"到"23"
       24-hour format of an hour with leading zeros. "00" through "23"

    i: 有前导零的分钟数。"00"到"59"
       Minutes with leading zeros. "00" to "59"

    s: 有前导零的秒数。"00"到"59"
       Seconds with leading zeros. "00" through "59"
       
    u: 有前导零的微秒。"000000"到"999999"。由于Javascript暂时不支持微秒，所以微秒只能模拟来实现。返回带前导0的3位随机数。(这个并不是真正的微秒，不精确，建议使用v--毫秒。)【1.5.2*】
       Microseconds with leading zeros. "000000" to "999999". Since Javascript does not support microseconds for a while, microseconds can only be implemented by simulation. Returns a 3 chars random number with leading 0.[1.5.2*]   
       
    v: 有前导零的毫秒。"000"到"999"【1.5.0+】
       Millisecond with leading zeros. "000" through "999”[1.5.0+]
 
  时区(Timezone)
    e: 时区标识。UTC，GMT，Atlantic/Azores
       Timezone identifier.Examples: UTC, GMT, Atlantic/Azores  
       
    I: 是否为夏令时。1:是，0:否
       Whether or not the date is in daylight saving time. 1 Daylight Saving Time, 0 otherwise.

    O: 与格林威治时间相差的小时数。例如：+0800
       Difference to Greenwich time (GMT) in hours. Example: +0800

    P: 与格林威治时间的差别，小时和分钟之间有冒号分隔。例如：+08:00
       Difference to Greenwich time (GMT) with colon between hours and minutes. Example: +08:00

    T: 本机所在的时区。例如：EST，MDT。
       Timezone abbreviation.  Examples: EST, MDT

    Z: 时差偏移量的秒数。UTC 西边的时区偏移量总是负的，UTC 东边的时区偏移量总是正的。-43200 到 43200
       Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. -43200 through 43200

  完整的日期／时间(Full Date/Time)
    c: ISO 8601 格式的日期。例如：2019-07-15T15:38:56+08:00
       ISO 8601 date. Example: 2004-02-12T15:19:21+00:00

    r: RFC 2822 格式的日期。例如：Thu, 15 Jul 2019 15:38:56 +0800
       RFC 2822 formatted date. Example: Thu, 15 Jul 2019 15:38:56 +0800

    U: 从 Unix 纪元1970-1-1开始至今的秒数(Unix时间戳)。
       Seconds since the Unix Epoch at 1970-1-1 (Unix timestamp).
```

### 时间对象，默认值：{Date} 当前本地机器时间(Datetime object, default: {Date} local Datetime)
> 可以是任意时间对象，例如：  
> It can be any datetime object, Example:

```javascript
    1563176336000 // 时间戳(Unix timestamp)
    new Date() // 当前本机日期和时间(Local datetime)
    '2019-07-15 15:38:56' // 字符串日期(String datetime)
    '2019/07/15 15:38:56' // 字符串日期(String datetime)  
```

### 自定义节假日(Custom holidays)1.6.0+
> **默认配置(default config)**

```javascript
{
    '0101': ['元旦节', 'New Year'],
    '0214': ['情人节', `Valentine's Day`],
    '0308': ['国际妇女节', `International Women's Day`],
    '0315': ['国际消费者权益日', `International Consumer Rights Day`],
    '0312': ['植树节', `Arbor Day`],
    '0422': ['世界地球日', `Earth Day`],
    '0501': ['国际劳动节', `International Labour Day`],
    '0504': ['青年节', `Youth day`],
    '0512': ['国际护士节', `International Nurses Day`],
    '0518': ['国际博物馆日', `International Museum Day`],
    '0601': ['国际儿童节', `International Children's Day`],
    '0605': ['世界环境日', `World Environment Day`],
    '0623': ['国际奥林匹克日', `International Olympic Day`],
    '0624': ['世界骨质疏松日', `World Osteoporosis Day`],
    '0701': ['建党节', `Founding day`],
    '0801': ['建军节', `Army Day`],
    '0910': ['教师节', `Teachers' Day`],
    '1224': ['平安夜', `Christmas Eve`],
    '1117': ['世界学生日', `World student day`],
    '1201': ['世界艾滋病日', `World AIDS Day`],
    '1001': ['国庆', 'National Day'],
    '*0101': ['春节', 'Chinese Year'],
    '*0115': ['元宵节', 'Lantern Festival'],
    '*0202': ['龙头节', 'Dragon head festival'],
    '*0505': ['端午节', 'Dragon Boat Festival'],
    '*0707': ['乞巧节', 'Qi Qiao Festival'],
    '*0715': ['中元节', 'Ghost Festival'],
    '*0815': ['中秋节', 'Moon Festival'],
    '*0909': ['重阳节', 'Chongyang Festival'],
    '*1001': ['寒衣节', 'Winter clothing festival'],
    '*1015': ['下元节', 'Xia Yuan Festival'],
    '*1208': ['腊八节', 'Laba Festival'],
    '*1223': ['祭灶节', 'Stove Festival'],
    '*1229': ['除夕', `Year's Eve`], // 农历闰年(leap year in lunar)
    '*1230': ['除夕', `Year's Eve`], // 农历非闰年(not leap year in lunar)
    '#0520': ['母亲节', `Mother's Day`],
    '#0630': ['父亲节', `Father's day`]
}
```

> **配置 Api(Configuration API)**

|  Api  |  说明(description)  |
| --- | --- |
| replaceHolidayConf | 替换默认节假日配置 |
| | Replace the default holiday preparation |
| editHolidayConf | 修改或新增节假日配置 |
| | Modify or add holiday preparation |

> **key值说明(Key description)**

|  Key  |  说明(description)  |
| --- | --- |
| 0101 | 4位数字表示公历日期，此key值表示：公历1月1日 |
| | 4 digits indicate the Gregorian date, this key value means: January 1st of the Gregorian calendar |
| *0101 | * + 4位数字表示农历日期，此key值表示：农历正月初一|
|  | * + 4 digits represent the date of the lunar calendar, This key value means: the first day of the first lunar month |
| #0520 | # + 4位数字表示公历某月第几个星期几，此key值表示：五月第2个星期日，(星期从0到6分别表示：日一二三四五六) |
|  | # + 4 digits indicate in the Gregorian calendar how many weeks at this month and How many day at this week. This key value means: 2nd Sunday in May (the weeks from 0 to 6:  Mon Tues Wed Thur Fri Sat Sun) |
 
> **代码示例(DEMO)**

```javascript
  // 修改与新增节日配置(未被修改的节日依然有效)
  // Modified and added holiday config (unmodified holidays are still valid)
  date.editHolidayConf = {
    '0214’: ['小三节’, 'Other woman day’], // 修改(edit)
    '0715’: ['示例节’, `Demo’s day`], // 修改(edit)
    '#0836’: ['纪念日’, 'Acommemoration day’], // 新增(add)
    '*1213': ['作者生日', 'Author's birthday'] // 新增(add)
  }
  
  // 替换节日配置(默认配置的节日全部失效)
  // Replace the holiday config (the default preparation of the holiday is all invalid)
  date.replaceHolidayConf = { // 替换(replace)
    '0214’: ['小三节’, 'Other woman day’],
    '0715’: ['示例节’, `Demo’s day`],
    '#0836’: ['纪念日’, 'Acommemoration day’],
    '*1213': ['作者生日', 'Author's birthday']
  }
  
  date('Y-m-d fh’, new Date()) // -> 2019-07-15 示例节
  date('Y-m-d lh’, new Date()) // -> 2019-07-15 demos day
```

### 黑科技的使用方式(Interesting to use)
> 可以非常简单的实现一个时钟，就象下面的一样。  
> Coded a clock is so easy, just like the following.
> 
> ![time clock](https://raw.githubusercontent.com/toviLau/date-php/master/src/img-md/clock.gif)  
>
> 咦！这个时间的毫秒是不是有点怪？这是[**setInterval**](https://blog.csdn.net/acm765152844/article/details/51298915)的问题。(虽然这只是一张图片^\_^，但目的是抛出Javascript确实存在的问题。)  
> What! Is the millisecond of this Datetime a bit strange? This is a problem with [**setInterval**](https://blog.csdn.net/acm765152844/article/details/51298915). (Although this is just a picture ^_^, the purpose is to throw the problem Javascript does exist.)

```html
示例代码(demo)

<div class="now">
    <div class="clock"><span>当前时间：</span> <span class="date-time">--:--</span></div>
    <div class="clock"><span>now time：</span> <span class="date-time">--:--</span></div>
</div>
<script src="//unpkg.com/date-php"></script>
<script type="text/javascript">
    var nowClock = document.getElementsByClassName('date-time')
    
    setInterval(function() {
        for(let i=0; i<nowClock.length; i+=1){
            nowClock[i].innerHTML=date('Y-m-d H:i:s.v')
        }
    }, 1000);
</script>
```

### 关于鸣谢(About)
  [**Github**](http://www.github.com)
  [**Npmjs**](http://www.npmjs.org)
  [**rollup**](http://www.rollupjs.com) 
  [**eslint**](https://eslint.org)
  [**flow**](https://flow.org)
  [**uglifyJs**](http://lisperator.net/uglifyjs/)  
