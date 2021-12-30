### JavaScript模仿类似于PHP的日期格式功能JavaScript implements date formatting functions similar to PHP
---
[![issues](https://img.shields.io/github/issues/toviLau/date-php)](https://github.com/toviLau/date-php/issues)
[![forks](https://img.shields.io/github/forks/toviLau/date-php)](https://github.com/toviLau/date-php)
[![github](https://img.shields.io/github/package-json/v/tovilau/date-php?logo=github)](https://github.com/toviLau/date-php)
[![npm](https://img.shields.io/npm/v/date-php?label=versoin&logo=npm)](https://www.npmjs.com/package/date-php)
[![downloads](https://img.shields.io/npm/dm/date-php?logo=npm)](https://www.npmjs.com/package/date-php)
[![stars](https://img.shields.io/github/stars/toviLau/date-php)](https://github.com/toviLau/date-php)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/date-php)](https://www.npmjs.com/package/date-php)
![license](https://img.shields.io/github/license/toviLau/date-php)
![github last commit](https://img.shields.io/github/last-commit/tovilau/date-php)


> 这是一个Javascript模仿类似于PHP日期时间格式化函数，使用方法和PHP非常类似，有丰富的模板字符，并在原来的基础上增强了一些模板字符。例如：中国的农历日期、用汉字来表示日期、十二生肖与星座。让转换日期时间更自由。  
> This is a JavaScript implements date formatting functions similar to PHP. It is very similar to PHP, has rich template characters, and enhances some template characters on the basis of the original. For example: Chinese Lunar Date, Chinese Character Date, Chinese Zodiac and Constellation. Make the conversion datetimes more free.   
>  
> 兼容 TypeScript(.ts)<sup style="color:#f33">(1.7.6+)</sup>  
> TypeScript(.ts) compatible <sup style="color:#f33">(1.7.6+)</sup> 
>  
> [点击这里查看更多例/ want see more examples clicked here](https://tovilau.github.io/date-php/)  
>  
> [如果你喜欢请 star 支持一下](https://www.npmjs.com/package/date-php)    
> [Please star support if you like](https://www.npmjs.com/package/date-php)  


```javascript
// 举个栗子(examples)
// 首先(First)
import date from 'date-php';
var d = new Date(); // 1563148800000 or 'Mon Jul 15 2019 15:38:56 GMT+0800 (中国标准时间)'

// 然后(Second)
date('Y-m-d', d); // "2019-07-15
date('y-m-d', d); // "19-07-15
date('m-d-Y H:i:s', d); // "07-15-2019 15:38:56"
date('y-m-d H:i:s[a] D', d); // "07-15-20 15:38:56[pm] Mon"

// 或者这样(Or)
d.format('Y-m-d'); // "2019-07-15
d.format('y-m-d'); // "2019-07-15
d.format('m-d-Y H:i:s'); // "07-15-2019 15:38:56"
d.format('m-d-y H:i:s'); // "07-15-20 15:38:56"
```

> 格式化持续时间/剩余时间/倒计时(duration/count down) -- **date.duration**

```javascript
// 举个栗子(examples)
// 这里时间戳是代表的持续时间/剩余时间/倒计时(duration/count down)
date.duration('倒计时：D天h小时',  13682958024 ) // 倒计时：158天08小时
date.duration('cou\\nt \\dow\\n：D \\d\\a\\y h \\hour\'\\s',  1591491612345 - 1577808654321 ) // "count down：158 day 08 hour's"
date.duration('D天h小时i分钟s.v秒',  86400000 + 12345) // 1天00小时00分钟12.345秒
date.duration('H小时i分钟s.v秒',  86400000 + 7654321) // 26小时07分钟34.321秒
date.duration('D天h小时i分钟s.v秒',  86400000 - 12345) // 0天23小时59分钟47.655秒
```
[_**更多date示例** 点这里(More date examples)_](#use-date) | [_**持续时间/剩余时间/倒计时示例** 点这里(duration & count down clicked here)_](#use-duration)
<br/>

### 安装(install)
```
// npm
npm i -S date-php;

// CDN
<script src=“http://unpkg.com/date-php"></script>
```

<br />

<div id="use-date" name="use-date"></div>

### 使用(use)
 ```
  > 用法 / usage：

  date([tplChars:string='Y-m-d'[, dateTimeObj:dateTime|number=new Date() [,isMs: boolean=true]]])
  date([字符模板[, 日期时间对象 [,是否毫秒]]])
 ```

 > 1、以下所有方式的入参都是可选参数。  
 > 　 Entry parameters in all of the following ways are optional.
 >
 > 2、以下`new Date()`或其它的日期时间的初始化的值，我们默许都是 `1563176336000` Unix时间戳对应的日期时间。  
 > 　 The following `new Date ()` or other date time initialization values, we acquiescence are `1563176336000` Unix timestamp corresponding Datetime.
 >
 > 3、[_**持续时间/剩余时间/倒计时** 点这里(**duration/count down** clicked here)_](#use-duration)
 
```javascript
// ES6+ -- CDN方式跳过(CDN mode skip)
import date from 'date-php'; // 引入date-php(import date-php)

// CommonJS && AMD -- CDN方式跳过(CDN mode skip)
const date = require('date-php'); // 引入date-php(require date-php)

date('Y-m-d H:i:s', new Date()); // "2019-07-15 15:38:56"
date('y-m-d h:i[a]', new Date()); // "19-07-15 03:38[pm]"
date('星期K', "2019-07-15 15:38:56"); // "星期一" (1.3.2+)
date('C年f月k日 星期K', 1563176336000); // "二〇一九年七月十五日 星期一" (1.3.2+)
date('Y-m-d H:i 第W周', 'Mon Jul 15 2019 15:38:56 GMT+0800 (中国标准时间)'); // "2019-07-15 15:38 第29周"
date('Y年m月d日 H点i分s秒', new Date()); // "2019年07月15日 15点38分56秒" 
date('ly年lm月ld日lt时lk刻【lg】',1563122222000) // "己亥年六月十三日子时六刻【三更】"(1.5.0+)
date('m-d-Y H:i:s', new Date()); // "07-15-2019 15:38:56"
date('m-d-Y H:i:s.v', new Date()); // "07-15-2019 15:38:56.064"
date('m-d-Y H:i:s.u', new Date()); // "07-15-2019 15:38:56.064019"
date('y/m/d H:i', new Date()); // "19/07/15 15:38" 
date('y.m.d H:i', new Date()); // "19.07.15 15:38" 
date('y.m.d H:i', new Date()); // "19.07.15 15:38" 
// 更多请自由发挥...
// More please use your imagination...

/**
 * 示例2 - 日期时间对象.format('模板字符');
 * demo 2 - datetimeObject.format('Template character');
 */
new Date('2019-07-15 15:38:56').format('Y-m-d H:i:s'); // "2019-07-15 15:38:56" 
new Date(1563176336000).format('Y-m-d H:ia'); // "2019-07-15 15:38pm"
new Date().format('Y-m-d H:i 第W周'); // "2019-07-15 15:38 第29周"
// 更多请自由发挥...
// More please use your imagination...
```
[试一试(try)](https://tovilau.github.io/date-php/) 
<br /><br /><br />


### 模板字符，默认值：{string} 'Y-m-d'(Template character, default: {string} 'Y-m-d')
> 1、你也可以去<u> [_**PHP中文官网**_](https://www.php.net/manual/zh/function.date.php) </u>看看，使用方法类似。  
> 　 You can also go to the <u> [_**PHP english official website**_](https://www.php.net/manual/en/function.date.php) </u>to see, the method is similar.  
> 
> 2、~~你也可以通过静态方法 `date.description` 在控制台打出所有模板字符。~~<sup style="color:#f33">(1.3.2 - )</sup>   
> 　 ~~You can also output all template character in the console via the static method `date.description`.~~<sup style="color:#f33">(1.3.2 - )</sup>   
>
> 3、关于转义模板字符，这里与PHP不同 **【敲黑板！！！】** <sup style="color:#f33">(1.3.0 + )</sup>  
> 　 About the escaped template character, here is different from PHP **[Note!!!]** <sup style="color:#f33">(1.3.0 + )</sup>  
>> **如果在date里想输出模板本来的字符，请用转义符--双反斜杠"\\\\"(PHP是一个单反斜杠"\\")。**   
>> **If you want to output the original character of the template on the date, use the escape character – double backslash "\\\\" (PHP is a single backslash "\\").**  
>>   举个栗子：   date("\\\\I \\\\l\\\\o\\\\v\\\\e \\\\y\\\\o\\\\u: y-m-d H:i", new Date()) // 输出 "I love you: 19-07-15 15:38"    
>>    Example: date("\\\\I \\\\l\\\\o\\\\v\\\\e \\\\y\\\\o\\\\u: y-m-d H:i", new Date()) // Output "I love you: 19-07-15 15:38"  
>>
>>   上面栗子中，'I'<sup>(大写的i)</sup>、'l'<sup>(小写的L)</sup>、'o'、'v'、'e'、'y'、'u' 都是模板字符，所以前面加双反斜杠(\\\\)转义，这样字符就会输出本来的值。  
>>   In the previous example, 'I'<sup>(Uppercase i)</sup>, 'l'<sup>(lowercase L)</sup>, 'o', 'e', 'y', 'u' are all template character, so add an double backslash (\\\\\) in front of the template character to escape , Character will output the original value.
>
> 4、加"\*"号的为PHP语言中没有的功能，是`date-php.js`特有的功能。  
> 　 Add the "\*" in front is a function not available in the PHP language, and is a feature unique to `date-php.js`.
> 
> 5、转农历正常只能转1900-2100之间的200年份。  
> 　 The conversion to the lunar calendar can only be transferred to 200 years between 1900-2100.
> 
> 6、模板字符区分大小写。  
> 　 Template characters are case sensitive.
> 
> 7、支持节假日输出  
> 　 Support festival output  
> 　 需要自定义节假日请参考 [_conf.replaceHolidayConf_](#custom) 与 [_conf.editHolidayConf_](#custom)  
> 　 For custom holidays, please refer to [_conf.replaceHolidayConf_](#custom)  & [_conf.editHolidayConf_](#custom)  

| \# | chars | Description |
| :--- | :--- | :--- |
| **日(Day)** |　| |
| | d | 月份中的第几天，有前导零的2位数字。从"01"到"31"。 <br />Day of the month, 2 digits with leading zeros. 01 to 31. |
| | <span style="color:#999">\*</span>k <sup style="color:#f33">1.3.2+</sup> | 月份中的第几天，汉字表示。从"一"到"卅一"。 <br />Day of the month, Chinese character representation. "一" to "卅一". |
| | D | 星期中的第几天，文本表示，3个字母。从"Mon"到"Sun"。<br />Day of the week, textual representation, three letters. Mon to Sun. |
| | j | 月份中的第几天，没有前导零。从"1"到"31"。 <br />Day of the month without leading zeros. 1 to 31. |
| | <span style="color:#999">\*</span>lj <sup style="color:#f33">1.6.0+</sup> | 月份中的第几天(天干地支表示法) 例：'甲子' / '戊戌'。 <br />Day of the month(Heavenly Stems && Earthly Branches  Representation) E.g：'甲子' / '戊戌’. |
| | <span style="color:#999">\*</span>ld <sup style="color:#f33">1.5.0+</sup>| 农历月份中的第几天。从"初一"到"卅"。  <br />Day of the month of the lunar month. "初一" to "卅" |
| | <span style="color:#999">\*</span>lt <sup style="color:#f33">1.5.0+</sup> | 中国古代计时单位中的时辰(类似小时，2小时1时辰)。从"子"到"亥"。  <br />The 'shi chen' in the ancient Chinese timing unit(similar to hours, 2 hours of 1 "shi chen"). "子" to "亥" |
| | <span style="color:#999">\*</span>lg <sup style="color:#f33">1.5.0\*</sup> | 中国古代夜里更时(打更点，一晚五更)。从"1"到"5"。  <br />The "geng" in ancient Chinese night (tapping geng, one night five geng). "1" to "5" |
| | <span style="color:#999">\*</span>lG <sup style="color:#f33">1.5.0+</sup> | 中国古代夜里更时(打更点，一晚五更)。从"一更"到"五更"。  <br />The "geng" in ancient Chinese night (tapping geng, one night five geng). "一更" to "五更" |
| | <span style="color:#999">\*</span>lk  <sup style="color:#f33">1.5.0+</sup> | 中国古代计时单位中的刻(类似分钟，一时辰八刻钟)。从"零"到"七"。  <br />The 'ke' in the ancient Chinese timing unit(similar to minutes, 1 "shi cheng" of 8 "ke"). "零" to "七" |
| | <span style="color:#999">\*</span>fh <sup style="color:#f33">1.6.0+</sup> | 节假日中文: 例如: 元旦节。  <br />holiday in chinese. e.g.: 元旦节  <br /> <br /> !需要自定义节假日请参考  [_`conf.replaceHolidayConf`_](#custom) 与 [_`conf.editHolidayConf`_](#custom) <br />!For custom holidays, please refer to  [_`conf.replaceHolidayConf`_](#custom) & [_`conf.editHolidayConf`_](#custom)|
| | <span style="color:#999">\*</span>lh <sup style="color:#f33">1.6.0+</sup> | 节假日英文 例如: new Year  <br />holiday in english. e.g.: new Year  <br /> <br />!需要自定义节假日请参考 [_`conf.replaceHolidayConf`_](#custom) 与 [_`conf.editHolidayConf`_](#custom) <br />!For custom holidays, please refer to [_`conf.replaceHolidayConf`_](#custom) & [_`conf.editHolidayConf`_](#custom) |
| | l | 星期几，完整的文本格式。从"Sunday"到"Saturday"。 <br />A full textual representation of the day of the week. "Sunday" to "Saturday". |
| | N | ISO-8601格式的星期中的第几天。从"1"(表示星期一)到"7"(表示星期天)。  <br />ISO-8601 numeric representation of the day of the week. 1 (for Monday) to 7 (for Sunday). |
| | S | 每月天数后面的英文后缀，2 个字符 st/nd/rd/th。可以与 j 很好的配合使用。 <br />English ordinal suffix for the day of the month, 2 characters. st, nd, rd or th. Works well with j. |
| | w | 星期中的第几天，数字表示。从"0"(表示星期天)到"6"(表示星期六)。 <br />Numeric representation of the day of the week. 0 (for Sunday) to 6 (for Saturday). |
| | <span style="color:#999">\*</span>K <sup style="color:#f33">1.3.2+</sup> | 星期中的第几天，汉字表示。从"日"(表示星期天)到"六"(表示星期六)。 <br />The Chinese characters of the day of the week indicate. "日"(for Sunday) to "六"(for Saturday). |
| | z | 年份中的第几天。从"0"到"365"。 <br />The day of the year. "0" to "365". |
| | | |
| **星期(Week)** |  |  |
| | W | 年份中的第几周。 <br />The week number in year. |
| | | |
| **月(Month)** | | |
| | F | 月份，完整的文本格式。从"January"到"December"。 <br />A full textual representation of a month, such as January or March. "January" to "December". |
| | <span style="color:#999">\*</span>f <sup style="color:#f33">1.3.2+</sup> | 月份，汉字表示。从"一"到"十二"。 <br />The Chinese characters of the month. "一" to "十二". |
| | <span style="color:#999">\*</span>lf <sup style="color:#f33">1.6.0+</sup> | 月份(天干地支表示法)。 例：'甲子' / '戊戌'。 <br />The month(Heavenly Stems && Earthly Branches  Representation) E.g：'甲子' / '戊戌’. |
| | m | 数字表示的月份，有前导零。"01"到"12" <br />Numeric representation of a month, with leading zeros. "1" to "12" |
| | M | 三个字母缩写表示的月份。从"Jan"到"Dec" <br />A short textual representation of a month, three letters. "Jan" to "Dec" |
| | n | 数字表示的月份，没有前导零。"1"到"12" <br />Numeric representation of a month, without leading zeros. "1" to "12" |
| | <span style="color:#999">\*</span>lM <sup style="color:#f33">1.6.0+</sup> | 农历月份。从"1"到"12" <br />Month of the lunar month. "1" to "12" |
| | <span style="color:#999">\*</span>lm <sup style="color:#f33">1.5.0+</sup> | 农历月份。从"一"到"十二" <br />Month of the lunar month. "一" to "十二" |
| | t | 给定月份所应有的天数。 "28"到"31" <br />Number of days in the given month |
| | <span style="color:#999">\*</span>la <sup style="color:#f33">1.6.0+</sup> | 12星座 <br />12 Constellation |
| | <span style="color:#999">\*</span>ls <sup style="color:#f33">1.6.0+</sup> | 24节气汉字 <br />24 solar terms Chinese Characters |
| | <span style="color:#999">\*</span>lS <sup style="color:#f33">1.6.0+</sup> | 24节气英文 <br />24 solar terms English |
| | <span style="color:#999">\*</span>lq <sup style="color:#f33">1.6.0+</sup> | 季度数字 <br />Quarter Number |
| | <span style="color:#999">\*</span>lQ <sup style="color:#f33">1.6.0+</sup> | 季度汉字 <br />Quarter Number Chinese Characters |
| | <span style="color:#999">\*</span>q <sup style="color:#f33">1.6.0+</sup> | 季度英文缩写<br />Quarter abbreviations |
| | <span style="color:#999">\*</span>Q <sup style="color:#f33">1.6.0+</sup> | 季度英文 <br />Quarter English |
| | | |
| **年(Year)** | | |
| | L | 是否为闰年。1:是，0:否。 <br />Whether it's a leap year. 1 leap year, 0 otherwise. |
| | o | ISO-8601格式年份数字。这和 Y 的值类似，星期数（W）属于前一年或下一年，则用那一年。 <br />ISO-8601 week-numbering year. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead. |
| | Y | 4 位数字完整表示的年份。 <br />A full numeric representation of a year, 4 digits. |
| | y | 2 位数字表示的年份。 <br />A two digit representation of a year. |
| | <span style="color:#999">\*</span>ly <sup style="color:#f33">1.5.0+</sup> | 农历记年法(天干地支，60年一循环)。从"甲子"到"癸亥" 。<br />The ancient Chinese lunar calendar year method (the tian gan and the di zhi, cycle of 60 years). |
| | <span style="color:#999">\*</span>C <sup style="color:#f33">1.3.2+</sup> | 4 个汉字表示的年份。 <br />Year indicated by 4 Chinese characters. |
| | <span style="color:#999">\*</span>lc <sup style="color:#f33">1.6.0+</sup> | 生肖 (12年一循环)。从"鼠"到"猪" <br />Chinese zodiac (12-year cycle). From "rat" to "pig" |
| | <span style="color:#999">\*</span>lC <sup style="color:#f33">1.6.0+</sup> | 农历年汉字。 <br />Chinese character for the lunar calendar. |
| | <span style="color:#999">\*</span>lz <sup style="color:#f33">1.6.0+</sup> | 生肖汉字 。<br />Zodiac Chinese Characters. |
| | <span style="color:#999">\*</span>lZ <sup style="color:#f33">1.6.0+</sup> | 生肖英文。 <br />Zodiac English. |
| | | |
| **时间(Time)** | | |
| | a | 小写的上午和下午值。"am"或"pm" 。 <br />Lowercase Ante meridiem and Post meridiem. "am" or "pm". |
| | A | 大写的上午和下午值。"AM"或"PM"。 <br />Uppercase Ante meridiem and Post meridiem. "AM" or "PM". |
| | B | Swatch Internet 标准时。"000"到"999"。 <br />Swatch Internet time. 000 to 999. |
| | g | 12 小时格式，没有前导零。"1"到"12"。 <br />12-hour format of an hour without leading zeros. "1" to "12". |
| | G | 24 小时格式，没有前导零。"0"到"23"。 <br />24-hour format of an hour without leading zeros. "0" to "23". |
| | h | 12 小时格式，有前导零。"01"到"12"。 <br />12-hour format of an hour with leading zeros. "01" to "12". |
| | H | 24 小时格式，有前导零。"00"到"23"。 <br />24-hour format of an hour with leading zeros. "00" to "23" . |
| | i | 有前导零的分钟数。"00"到"59"。 <br />Minutes with leading zeros. "00" to "59". |
| | s | 有前导零的秒数。"00"到"59"。 <br />Seconds with leading zeros. "00" to "59". |
| | <span style="color:#999">\*</span>u <sup style="color:#f33">1.5.2\*</sup> | 有前导零的微秒。"000000"到"999999"。由于Javascript暂时不支持微秒，所以微秒只能模拟来实现。返回带前导0的3位随机数。(这个并不是真正的微秒，不精确，建议使用v--毫秒。)。 <br />Microseconds with leading zeros. "000000" to "999999". Since Javascript does not support microseconds for a while, microseconds can only be implemented by simulation. Returns a 3 chars random number with leading 0. |
| | <span style="color:#999">\*</span>v <sup style="color:#f33">1.5.0+</sup> | 有前导零的毫秒。"000"到"999"。 <br />Millisecond with leading zeros. "000" to "999". |
| | | |
| **时区(Timezone)** | | |
| | e | 时区标识。UTC，GMT，Atlantic/Azores。 <br />Timezone identifier.Examples: UTC, GMT, Atlantic/Azores |
| | I | 是否为夏令时。1:是，0:否 。 <br />Whether or not the date is in daylight saving time. 1 Daylight Saving Time, 0 otherwise. |
| | O | 与格林威治时间相差的小时数。例如：+0800。 <br />Difference to Greenwich time (GMT) in hours. Example: +0800. |
| | P | 与格林威治时间的差别，小时和分钟之间有冒号分隔。例如：+08:00。 <br />Difference to Greenwich time (GMT) with colon between hours and minutes. Example: +08:00. |
| | T | 本机所在的时区。例如：EST，MDT。 <br />Timezone abbreviation.  Examples: EST, MDT, |
| | Z | 时差偏移量的秒数。UTC 西边的时区偏移量总是负的，UTC 东边的时区偏移量总是正的。-43200 到 43200。 <br />Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. -43200 to 43200. |
| | | |
| **完整的日期／时间<br />(Full Date/Time)** | | |
| | c | ISO 8601 格式的日期。例如：2019-07-15T15:38:56+08:00。 <br />ISO 8601 date. Example: 2004-02-12T15:19:21+00:00. |
| | r | RFC 2822 格式的日期。例如：Thu, 15 Jul 2019 15:38:56 +0800。 <br />RFC 2822 formatted date. Example: Thu, 15 Jul 2019 15:38:56 +0800. |
| | U | 从 Unix 纪元1970-1-1开始至今的秒数(Unix时间戳)。 <br />Seconds since the Unix Epoch at 1970-1-1 (Unix timestamp). |
| **其它** | | |
| | <span style="color:#999">\*</span>all <sup style="color:#f33">1.6.0+</sup> | **{Object}** <br />输出所有模板字符串与对应的值。 <br />Output all template strings and corresponding values. |

[试一试(try)](https://tovilau.github.io/date-php/) 
<br /><br /><br />


### 时间对象，默认值：{Date} 当前本地机器时间(Datetime object, default: {Date} local Datetime)
> 可以是任意时间对象，例如：  
> It can be any datetime object, Example:


```javascript
    1563176336000 // 时间戳(Unix timestamp)
    new Date() // 当前本机日期和时间(Local datetime)
    '2019-07-15 15:38:56' // 字符串日期(String datetime)
    '2019/07/15 15:38:56' // 字符串日期(String datetime)  
```
[试一试(try)](https://tovilau.github.io/date-php/) 
<br /><br /><br />


<div id="custom" name="custom"></div>

### 自定义节假日(Custom holidays)<sup style="color:#f33">1.6.0+</sup>
> **默认配置(default config)**

```javascript

{
    '0101': ['元旦节', 'New year'],
    '0214': ['情人节', `Valentine's day`],
    '0308': ['国际妇女节', `International women's day`],
    '0315': ['国际消费者权益日', `International consumer rights day`],
    '0312': ['植树节', `Arbor day`],
    '0422': ['世界地球日', `Earth day`],
    '0501': ['国际劳动节', `International labour day`],
    '0504': ['青年节', `Youth day`],
    '0512': ['国际护士节', `International nurses day`],
    '0518': ['国际博物馆日', `International museum day`],
    '0601': ['国际儿童节', `International children's day`],
    '0605': ['世界环境日', `World environment day`],
    '0623': ['国际奥林匹克日', `International olympic day`],
    '0624': ['世界骨质疏松日', `World osteoporosis day`],
    '0701': ['建党节', `Party's building day`],
    '0801': ['建军节', `Army's day`],
    '0910': ['教师节', `Teacher's day`],
    '1001': ['国庆', 'National day'],
    '1024': ['中国程序员节', `Chinese programmer's day`],
    '1224': ['平安夜', `Christmas Eve`],
    '1225': ['圣诞节', `Christmas Day`],
    '1226': ['毛泽东诞辰', `Zedong Mao birthday`],
    '1117': ['世界学生日', `World student's day`],
    '1201': ['世界艾滋病日', `World AIDS day`],
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
    '*1229': lunarInfo.isLeap ? ['除夕', `Year's Eve`] : '',
    '*1230': lunarInfo.isLeap ? '' : ['除夕', `Year's Eve`],
    '#0520': ['母亲节', `Mother's day`],
    '#0630': ['父亲节', `Father's day`],
    '@0256': ['俄罗斯程序员节', `Russian programmer's day`]
}
```

> **配置 Api(Configuration API)**

|  Api  |  说明(description)  |
| --- | --- |
| replaceHolidayConf | 替换默认节假日配置。 <br />Replace the default holiday preparation. |
| editHolidayConf | 修改或新增节假日配置。 <br />Modify or add holiday preparation |

> **key值说明(Key description)**

|  Key  |  说明(description)  |
| --- | --- |
| 0101 | 4位数字表示公历日期，此key值表示：公历1月1日。 <br />4 digits indicate the Gregorian date, this key value means: January 1st of the Gregorian calendar. |
| *0101 | * + 4位数字表示农历日期，此key值表示：农历正月初一。 <br />* + 4 digits represent the date of the lunar calendar, This key value means: the first day of the first lunar month |
| #0520 | # + 4位数字表示公历某月第几个星期几，此key值表示：五月第2个星期日，(星期从0到6分别表示：日一二三四五六)。 <br /># + 4 digits indicate in the Gregorian calendar how many weeks at this month and How many day at this week. This key value means: 2nd Sunday in May (the weeks from 0 to 6:  Mon Tues Wed Thur Fri Sat Sun) |
| @0256 <sup style="color:#f33">(1.6.3+)</sup> | @ + 4位数字表示公历年份中的第几天，此key值表示：一年中的第256天。 <br />@ + 4 digits indicate the day of the year in the Gregorian calendar, This key value means: 256th day of the year. |

> **代码示例(DEMO)**

```javascript
  /**
   * 示例3
   * demo 3
   **/
  // 修改与新增节日配置(未被修改的节日依然有效)
  // Modified and added holiday config (unmodified holidays are still valid)
  date.editHolidayConf = {
    '0214': ['小三节', 'Other woman day'], // 修改(edit)
    '0715': ['示例节', `Demo's day`], // 修改(edit)
    '#0836': ['纪念日', 'Acommemoration day'], // 新增(add)
    '*1213': ['作者生日', `Author's birthday`] // 新增(add)
  }
  
  // 替换节日配置(默认配置的节日全部失效)
  // Replace the holiday config (the default preparation of the holiday is all invalid)
  date.replaceHolidayConf = { // 替换(replace)
    '0214': ['小三节', 'Other woman day'],
    '0715': ['示例节', `Demo's day`],
    '#0836': ['纪念日', 'Acommemoration day'],
    '*1213': ['作者生日', `Author's birthday`]
  }
  
  date('Y-m-d fh', new Date()) // -> 2019-07-15 示例节
  date('Y-m-d lh', new Date()) // -> 2019-07-15 demos day
```

[试一试(try)](https://tovilau.github.io/date-php/) 
<br /><br /><br />

<div id="use-duration" name="use-duration"></div>

### 格式化持续时间/剩余时间/倒计时(duration/count down)<sup style="color:#f33">(1.7.0+)</sup>  
 ```
 > 用法 / usage：
 date.duration([tplChars:string='D天h:i:s'[, duration:number=0 [,isMs: boolean=true]]])
 date.duration([‘模板字符’[, 持续时间:时间戳 [,是否毫秒: true]]])  
 ```

```javascript
  date.duration('n月j天 h小时i分钟s秒',  314159265 ) //" 0月3天 15小时15分钟59秒"
  date.duration('高考倒计时：D天h小时i分钟s秒',  1591491612345 - 1577808654321 ) //" 高考倒计时：158天08小时49分钟18秒"
  date.duration('倒计时：D天h小时i分钟s秒',  13682958024 ) // 倒计时：158天08小时49分钟18秒
  date.duration('cou\\nt \\d\\ow\\n：D \\d\\a\\y h:i:s',  1591491612345 - 1577808654321 ) // count down：158 day 08:49:18  date.duration('D天h小时i分钟s.v秒',  86400000 + 12345) // 1天00小时00分钟12.345秒
  date.duration('H小时i分钟s.v秒',  86400000 + 7654321) // 26小时07分钟34.321秒
  date.duration('D天h小时i分钟s.v秒',  86400000 - 12345) // 0天23小时59分钟47.655秒
  date.duration('1970年至今已有D天h小时i分钟s.v秒',  new Date()) // "从1970年至今已有18322天11小时20分钟15.092秒"
```

| chars | Description |
| :--- | :--- |
| y<br/>Y | 数字表示的年。”0”到”273785" <br />Numeric representation of a years. “0” to "273785" |
| m | 数字表示的月份，有前导零。"00"到"12" <br />Numeric representation of a months, with leading zeros. "00" to "12"|
| n | 数字表示的月份，无前导零。"0"到"12" <br />Numeric representation of a months, without leading zeros. "0" to "12" |
| M | 总月数，”0”到”3285420" <br />Total months “0” to "3285420"|
| d | 数字表示的天数，有前导零。"00"到"12" <br />Numeric representation of a days, with leading zeros. "0" to "31" |
| j | 数字表示的天数，无前导零。"0"到"12" <br />Numeric representation of a days, without leading zeros. "0" to "31" |
| D | 总天数， "0"到"100000000" <br />Total days "0" to "100000000"|
| h | 数字表示的小时数，有前导零。"00"到"24" <br />Numeric representation of a hours, with leading zeros. "00" to "24" |
| g | 数字表示的小时数，无前导零。"0"到"24" <br />Numeric representation of a hours, without leading zeros. "0" to "24" |
| H | 总小时数，”0”到”2400000000" <br />Total hours “0” to "2400000000" |
| i | 数字表示的分钟数，有前导零。"00"到"59" <br />Numeric representation of a minutes, with leading zeros. "00" to "59" |
| I | 总分钟数，"0"到"144000000000" <br />Total minutes "0" to "144000000000" |
| s | 数字表示的秒数，有前导零。"00"到"59" <br />Numeric representation of a seconds, with leading zeros. "00" to "59" |
| S | 总秒数，"0"到"8640000000000" <br />Total minutes "0" to "8640000000000" |
| v | 数字表示的毫秒数，有前导零。"000"到"999" <br />Numeric representation of a millisecond, with leading zeros. "000" to "999" |
| V | 总毫秒数，"0"到"8640000000000000" <br />Total millisecond "0" to "8640000000000000" |
| all | **{Object}** <br />输出所有模板字符串与对应的值。 <br />Output all template strings and corresponding values. |

[试一试(try)](https://tovilau.github.io/date-php/) 
<br /><br /><br />

### 黑科技的使用方式(Interesting to use)
> 可以非常简单的实现一个时钟，就象下面的一样。  
> Coded a clock is so easy, just like the following.
> 
> ![time clock](https://tovilau.github.io/date-php/img.md/clock.gif)  
>
> 咦！这个时间的毫秒是不是有点怪？这是[_**setInterval**_](https://blog.csdn.net/acm765152844/article/details/51298915)的问题。(虽然这只是一张图片\^\_\^，但目的是抛出Javascript确实存在的问题。)  
> What! Is the millisecond of this Datetime a bit strange? This is a problem with [_**setInterval**_](https://blog.csdn.net/acm765152844/article/details/51298915). (Although this is just a picture ^_^, the purpose is to throw the problem Javascript does exist.)


```html
<!doctype html>
<html>
<head>
	<title>test</title>
</head>
<body>
	<div class=“now”>
	    <div class=“clock”><span>当前时间：</span> <span class=“date-time”>--:--</span></div>
	    <div class=“clock”><span>now time：</span> <span class=“date-time”>--:--</span></div>
	</div>
	<script src="//unpkg.com/date-php"></script>
	<script type=“text/javascript”>
	    var nowClock = document.getElementsByClassName(‘date-time’)
	    
	    setInterval(function() {
	        for(let i=0; i<nowClock.length; i+=1){
	            nowClock[i].innerHTML=date(‘Y-m-d H:i:s.v’)
	        }
	    }, 1000);
	</script>
</body>
</html>
```

<br>

### 关于鸣谢(About)
  [_**Github**_](http://www.github.com)
  [_**Npmjs**_](http://www.npmjs.org)
  [_**rollup**_](http://www.rollupjs.com) 
  [_**eslint**_](https://eslint.org)
  [_**flow**_](https://flow.org)
  [_**uglifyJs**_](http://lisperator.net/uglifyjs/)  
