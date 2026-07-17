### JavaScript模仿类似于PHP的日期格式功能_v1

JavaScript implements date formatting functions similar to PHP

---
[![issues](https://img.shields.io/github/issues/toviLau/date-php)](https://github.com/toviLau/date-php/issues)
[![forks](https://img.shields.io/github/forks/toviLau/date-php)](https://github.com/toviLau/date-php)
[![github](https://img.shields.io/github/package-json/v/tovilau/date-php?logo=github)](https://github.com/toviLau/date-php)
[![stars](https://img.shields.io/github/stars/toviLau/date-php)](https://github.com/toviLau/date-php)
![license](https://img.shields.io/github/license/toviLau/date-php)
![github last commit](https://img.shields.io/github/last-commit/tovilau/date-php?logo=github)
[![npm](https://img.shields.io/npm/v/date-php?label=latest&logo=npm)](https://www.npmjs.com/package/date-php) 
[![npm](https://img.shields.io/npm/v/date-php/alpha?color=orange&logo=npm&label=alpha)](https://www.npmjs.com/package/date-php)  
[![downloads](https://img.shields.io/npm/dm/date-php?logo=npm)](https://www.npmjs.com/package/date-php)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/date-php?logo=npm)](https://www.npmjs.com/package/date-php)


> 这是一个Javascript模仿类似于PHP日期时间格式化函数，使用方法和PHP非常类似，有丰富的模板字符，并在原来的基础上增强了一些模板字符。例如：中国的农历日期、用汉字来表示日期、十二生肖与星座。让转换日期时间更自由。  
> This is a JavaScript library that imitates PHP's date and time formatting functions. It is very similar to PHP in usage, provides rich template characters, and extends them with additional features such as Chinese lunar dates, Chinese character date representation, Chinese zodiac signs, and constellations — giving you more flexibility in date and time conversion.  
>
> 
>
> 兼容 TypeScript(.ts)<sup style="color:#f33">(1.7.6+)</sup>  
> TypeScript(.ts) compatible <sup style="color:#f33">(1.7.6+)</sup> 
>
> 
>
> 支持[链式](#DateChain)操作<sup style="color:#f33">(1.8.0 + )</sup>
>
> 
>
> [点击这里查看更多示例/Click here for more examples](https://tovilau.github.io/date-php/)  
>
> 
>
> [如果你喜欢请 star 支持一下](https://www.npmjs.com/package/date-php)    
> [If you like this project, please star it.](https://www.npmjs.com/package/date-php)  
>
> 
>
> **您现在正在阅读的是 v1.0 文档 [v2文档在这里(TS重构)](https://github.com/toviLau/date-php/blob/next/README.md) 目前优先维护 1.x 系列 **
>
> **You are viewing v1.0 docs. [v2 docs here.(TS rewrite)](https://github.com/toviLau/date-php/blob/next/README.md) Currently focusing on 1.x.**


```javascript
// 举个栗子(examples)
// 首先(First)
import date from 'date-php';
const d = new Date(); // 1563148800000 or 'Mon Jul 15 2019 15:38:56 GMT+0800 (中国标准时间)'

// 然后(Second)
date('Y-m-d', d); // "2019-07-15"
date('y-m-d', d); // "19-07-15"
date('y-m-d R', new Date() + 60 * 2000); // "2026-07-05 2分钟前" (1.7.22+)
date('m-d-Y H:i:s', d); // "07-15-2019 15:38:56"
date('y-m-d H:i:s[a] D', d); // "07-15-20 15:38:56[pm] Mon"

// 或者这样(Or)
d.format('Y-m-d'); // "2019-07-15"
d.format('y-m-d'); // "2019-07-15"
d.format('y-m-d R', new Date() + 60 * 2000); // "2026-07-05 2分钟前"
d.format('m-d-Y H:i:s'); // "07-15-2019 15:38:56"
d.format('m-d-y H:i:s'); // "07-15-20 15:38:56"
```

> 格式化持续时间/剩余时间/倒计时(duration/countdown) -- **date.duration**

```javascript
// 举个栗子(examples)
// 这里时间戳是代表的持续时间/剩余时间/倒计时(duration/countdown)
date.duration('倒计时：D天h小时',  13682958024 ) // 倒计时：158天08小时
date.duration('cou\\nt \\dow\\n：D \\d\\a\\y h \\hour\'\\s',  1591491612345 - 1577808654321 ) // "countdown：158 day 08 hour's"
date.duration('D天h小时i分钟s.v秒',  86400000 + 12345) // 1天00小时00分钟12.345秒
date.duration('H小时i分钟s.v秒',  86400000 + 7654321) // 26小时07分钟34.321秒
date.duration('D天h小时i分钟s.v秒',  86400000 - 12345) // 0天23小时59分钟47.655秒
```
[_**更多date示例** 点这里(More date examples)_](#use-date) | [_**持续时间/剩余时间/倒计时示例** 点这里(duration & countdown clicked here)_](#use-duration)
<br/>

### 安装(install)
```shell
# npm
npm i -S date-php;

# yarn
yarn add date-php

# CDN
<script src="http://unpkg.com/date-php" />
```

<br />

<div id="use-date" name="use-date"></div>

### 使用(use)

  > 用法 / usage：
  >
  > date([字符模板:string='Y-m-d'[, 日期时间对象:dateTime|number=new Date() [,是否毫秒: boolean=true]]])
  >
  > date([tplChars:string='Y-m-d'[, dateTimeObj:dateTime|number=new Date() [,isMs: boolean=true]]])
  >
  > 
  >
  > 1. 以下所有方式的入参都是可选参数。  
  >    　 Entry parameters in all of the following ways are optional.
  >
  > 2. 以下`new Date()`或其它的日期时间的初始化的值，我们默许都是 `1563176336000` Unix时间戳对应的日期时间。  
  >    　 The following `new Date ()` or other date time initialization values, we acquiescence are `1563176336000` Unix timestamp corresponding Datetime.
  >
  > 3. [_**持续时间/剩余时间/倒计时** 点这里(**duration/countdown** clicked here)_](#use-duration)
  >
  > 4. 支持[链式](#DateChain)操作<sup style="color:#f33">(1.8.0 + )</sup>

```javascript
// ES6+ -- CDN方式跳过(CDN mode skip)
import date from 'date-php'; // 引入date-php(import date-php)

// CommonJS && AMD -- CDN方式跳过(CDN mode skip)
const date = require('date-php'); // 引入date-php(require date-php)

date('Y-m-d H:i:s', new Date()); // "2019-07-15 15:38:56"
date('y-m-d h:i[a]', new Date()); // "19-07-15 03:38[pm]"
date('y-m-d R', new Date() - 60 * 2000); // "2026-07-05 2分钟前" (1.7.22+)
date('y-m-d R', new Date() - 60 * 60 * 5000); // "2026-07-05 5小时前" (1.7.22+)
date('y-m-d R', new Date() + 60 * 60 * 5000); // "2026-07-05 5小时后" (1.7.22+)
date('y-m-d R', new Date() - 60 * 60 * 24 * 365 * 1000); // "2026-07-05 12个月前" (1.7.22+)
date('y-m-d R', new Date() - 60 * 60 * 24 * 365 * 1000 - 1000); // "2026-07-05 1年前" (1.7.22+)
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
 * demo 2 - datetimeObject.format('Template characters');
 */
new Date('2019-07-15 15:38:56').format('Y-m-d H:i:s'); // "2019-07-15 15:38:56" 
new Date(1563176336000).format('Y-m-d H:ia'); // "2019-07-15 15:38pm"
new Date().format('Y-m-d H:i 第W周'); // "2019-07-15 15:38 第29周"
// 更多请自由发挥...
// More please use your imagination...
```
[去演练场试一试(try)](https://codepen.io/editor/toviLau/pen/019f47ff-2005-7e2a-bb3d-410fca70ab64/) 
<br /><br /><br />


### 模板字符，默认值：{string} 'Y-m-d'(Template characters, default: {string} 'Y-m-d')
> 1. 你也可以去<u> [_**PHP中文官网**_](https://www.php.net/manual/zh/function.date.php) </u>看看，使用方法类似。  
>    You can also go to the <u> [_**PHP english official website**_](https://www.php.net/manual/en/function.date.php) </u>to see, the method is similar.  
>
> 2. ~~你也可以通过静态方法 `date.description` 在控制台打出所有模板字符。~~<sup style="color:#f33">(1.3.2 - )</sup>   
>    ~~You can also output all template characters in the console via the static method `date.description`.~~<sup style="color:#f33">(1.3.2 - )</sup>   
>
> 3. 关于转义模板字符，这里与PHP不同 **【敲黑板！！！】** <sup style="color:#f33">(1.3.0 + )</sup>  
>    　 About the escaped template characters, here is different from PHP **[Note!!!]** <sup style="color:#f33">(1.3.0 + )</sup>  
>
> > **如果在date里想输出模板本来的字符，请用转义符--双反斜杠"\\\\"(PHP是一个单反斜杠"\\")。**   
> > **If you want to output the original character of the template on the date, use the escape character – double backslash "\\\\" (PHP is a single backslash "\\").**  
> >   举个栗子：   date("\\\\I \\\\l\\\\o\\\\v\\\\e \\\\y\\\\o\\\\u: y-m-d H:i", new Date()) // 输出 "I love you: 19-07-15 15:38"    
> >    Example: date("\\\\I \\\\l\\\\o\\\\v\\\\e \\\\y\\\\o\\\\u: y-m-d H:i", new Date()) // Output "I love you: 19-07-15 15:38"  
>
> >   上面栗子中，'I'<sup>(大写的i)</sup>、'l'<sup>(小写的L)</sup>、'o'、'v'、'e'、'y'、'u' 都是模板字符，所以前面加双反斜杠(\\\\)转义，这样字符就会输出本来的值。  
> >   In the previous example, 'I'<sup>(Uppercase i)</sup>, 'l'<sup>(lowercase L)</sup>, 'o', 'e', 'y', 'u' are all template characters, so add a double backslash (\\) in front of the template characters to escape them, and the characters will output their literal value.
>
> 4. 加"\*"号的为PHP语言中没有的功能，是`date-php.js`特有的功能。  
>    　 Add the "\*" in front is a function not available in the PHP language, and is a feature unique to `date-php.js`.
>
> 5. 转农历正常只能转1900-2100之间的200年份。  
>    　 The conversion to the lunar calendar can only be transferred to 200 years between 1900-2100.
>
> 6. 模板字符区分大小写。  
>    　 Template characters are case sensitive.
>
> 7. 支持节假日输出  
>    　 Support festival output  
>    　 需要自定义节假日请参考 [_conf.replaceHolidayConf_](#custom) 与 [_conf.editHolidayConf_](#custom)  
>    　 For custom holidays, please refer to [_conf.replaceHolidayConf_](#custom)  & [_conf.editHolidayConf_](#custom)  
>
> 8. 支持[链式](#DateChain)操作<sup style="color:#f33">(1.8.0 + )</sup>

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
| | <span style="color:#999">\*</span>ly <sup style="color:#f33">1.5.0+</sup> | 农历记年法(天干地支，60年一循环)。从"甲子"到"癸亥" 。<br />Chinese lunar calendar dating system (Heavenly Stems and Earthly Branches, a 60-year cycle). From "Jia Zi" to "Gui Hai". |
| | <span style="color:#999">\*</span>C <sup style="color:#f33">1.3.2+</sup> | 4 个汉字表示的公历年份。 例: 公历1月1日前: 二〇一九 公历1月1日后: 二〇二〇 <br />Gregorian calendar year represented by 4 Chinese characters. Example: Before January 1st: 二〇一九 (2019); After January 1st: 二〇二〇 (2020).. |
| | <span style="color:#999">\*</span>lc <sup style="color:#f33">1.6.0+</sup> | 农历年数字 <br />Numeric representation of a lunar year (using 4 Chinese characters). |
| | <span style="color:#999">\*</span>lC <sup style="color:#f33">1.6.0+</sup> | 4 个汉字表示的农历年汉字。例: 春节前: 二〇一九 春节后: 二〇二〇 <br />Lunar year represented by 4 Chinese characters. Example: Before the Spring Festival: 二〇一九; After the Spring Festival: 二〇二〇. |
| | <span style="color:#999">\*</span>lz <sup style="color:#f33">1.6.0+</sup> | 生肖 (12年一循环)汉字。从"鼠"到"猪" <br />Chinese Zodiac characters (12-year cycle). From "鼠" to "猪" |
| | <span style="color:#999">\*</span>lZ <sup style="color:#f33">1.6.0+</sup> | 生肖 (12年一循环)英文。从"Rat"到"Pig" <br />Chinese Zodiac (12-year cycle) in English. From "Rat" to "Pig". |
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
| | <span style="color:#999">\*</span>u <sup style="color:#f33">1.7.19\*</sup> | 微秒。"0"到"999999"。 <br />Microsecond value range: "0" to "999999". |
| | <span style="color:#999">\*</span>v <sup style="color:#f33">1.5.0+</sup> | 毫秒。"0"到"999"。 <br />Millisecond value range: "0" to "999". |
| | <span style="color:#999">\*</span>R <sup style="color:#f33">1.7.22+</sup> <sup style="color:#f33">1.7.23*</sup> | 相对时间。如 "3分钟前"、"2小时后"、"刚刚"。<br />Relative time. E.g.: "3分钟前", "2小时后", "刚刚".<br /><br />默认是中文: 如果想换英文或其它国家地区文字, 修改配置项([rowUnitConf](#rowUnitConf))<br />Default: Chinese. Modify config for other languages.([rowUnitConf](#rowUnitConf))<br /><br /><sup style="color:#f33">1.7.23*</sup><br />"刚刚"的默认阈值是 `30` 秒(阈值可在配置项[rowUnitConf](#rowUnitConf)里配置)<br />"just now" threshold defaults to `30` seconds (configurable via [rowUnitConf](#rowUnitConf)). |
| | | |
| **时区(Timezone)** | | |
| | e | 时区名。Atlantic/Azores <br />Timezone identifier.Examples: Atlantic/Azores |
| | \*eU<br /><sup style="color:#f33">1.8.0</sup> | UTC时区名 例:UTC+8<br />UTC timezone name. e.g. UTC-8 |
| | \*eG<br /><sup style="color:#f33">1.8.0</sup> | GMT时区名 例:GMT-8<br />GMT timezone name. e.g. GMT-8 |
| | I | 是否为夏令时。1:是，0:否 。 <br />Whether or not the date is in daylight saving time. 1 Daylight Saving Time, 0 otherwise. |
| | O<br /><sup style="color:#f33">1.7.24*</sup> | 与格林威治时间相差的小时数。例如：+0800。 <br />Difference to Greenwich time (GMT) in hours. Example: +0800.<br />跟随 `date.timeZone` 配置。<sup style="color:#f33">1.7.24*</sup> |
| | P<br /><sup style="color:#f33">1.7.24*</sup> | 与格林威治时间的差别，小时和分钟之间有冒号分隔。例如：+08:00。<br />Difference to Greenwich time (GMT) with colon between hours and minutes. Example: +08:00.<br />跟随 `date.timeZone` 配置。<sup style="color:#f33">1.7.24*</sup><br />Follows the `date.timeZone` configuration.<br /> |
| | T | 本机所在的时区。例如：EST，MDT。 <br />Timezone abbreviation.  Examples: EST, MDT, |
| | Z<br /><sup style="color:#f33">1.7.24*</sup> | 时差偏移量的秒数。<br />Timezone offset in seconds.<br />跟随 `date.timeZone` 配置。<sup style="color:#f33">1.7.24*</sup><br />Follows the `date.timeZone` configuration.<br /> |
| | | |
| **完整的日期／时间<br />(Full Date/Time)** | | |
| | c | ISO 8601 格式的日期。例如：2019-07-15T15:38:56+08:00。 <br />ISO 8601 date. Example: 2004-02-12T15:19:21+00:00. |
| | r | RFC 2822 格式的日期。例如：Thu, 15 Jul 2019 15:38:56 +0800。 <br />RFC 2822 formatted date. Example: Thu, 15 Jul 2019 15:38:56 +0800. |
| | U | 从 Unix 纪元1970-1-1开始至今的秒数(Unix时间戳)。 <br />Seconds since the Unix Epoch at 1970-1-1 (Unix timestamp). |
| **其它** | | |
| | <span style="color:#999">\*</span>all <sup style="color:#f33">1.6.0+</sup> | **{Object}** <br />输出所有模板字符串与对应的值。 <br />Output all template strings and corresponding values. |

[去演练场试一试(try)](https://codepen.io/editor/toviLau/pen/019f47ff-2005-7e2a-bb3d-410fca70ab64/) 
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
[去演练场试一试(try)](https://codepen.io/editor/toviLau/pen/019f47ff-2005-7e2a-bb3d-410fca70ab64/) 
<br /><br />

###### DateChain

### 链式日期操作 (chain) <sup style="color:#f33">(1.8.0+)</sup>

> 用法 / usage：
>
> date.chain([dateTime: Date | string | number = Date.now()])

#### 新增 

1. `date.chain()` 链式日期操作入口

2. `DateChain.prototype.add()` 日期加减运算

   > 签名

   ```ts
   add(
     num: number, // 时间数量, 正值加时, 负值减时
     unit: 'year'|'month'|'week'|'day'|'hour'|'minute'|'second'|'millisecond' // 时间单位
   )
   ```

3. `DateChain.prototype.prev()` 日期向前推(`add` 的语法糖)

   > 签名

   ```ts
   prev(
     num: number, // 最终转为绝对值
     unit: 'year'|'month'|'week'|'day'|'hour'|'minute'|'second'|'millisecond' // 时间单位
   )
   ```

4. `DateChain.prototype.next()` 日期向后推(`add` 的语法糖)

   > 签名

   ```ts
   prev(
     num: number, // 最终转为绝对值
     unit: 'year'|'month'|'week'|'day'|'hour'|'minute'|'second'|'millisecond' // 时间单位
   )
   ```

5. `DateChain.prototype.format()` 链式格式化

6. `DateChain.prototype.toDate()` 返回原生 Date

#### 调用示例

```js
// 创建链式日期对象
const dc = date.chain();                    // 当前时间
const dc2 = date.chain('2026-07-17');       // 指定日期
const dc3 = date.chain(1752681600000);      // 时间戳
const dc4 = date.chain('Fri Jul 17 2026 09:57:05 GMT+0800 (中国标准时间)');


// 日期加减
dc.add(3, 'day')           // 加3天
dc.add(-1, 'month')        // 减1个月（负数表示减）
dc.add(2, 'year')          // 加2年
dc.add(-10, 'year')        // 减2年
dc.add(1, 'week')          // 加1周
dc.add(30, 'minute')       // 加30分钟
dc.add(500, 'millisecond') // 加500毫秒

// 语义化别名
dc.prev(2, 'day')         // 向前推2天（等同于 add(-2, 'day')）
dc.next(1, 'week')        // 向后推1周（等同于 add(1, 'week')）

// 格式化输出
dc.format('Y-m-d H:i:s')  // "2026-07-17 15:38:56"
dc.format('C年f月k日')     // "二〇二六年七月十七日"

// 转回原生 Date 对象
dc.toDate()               // Date 对象

// 链式调用示例1
date.chain()
  .add(3, 'day')
  .format('Y-m-d')        // 三天后的日期

// 链式调用示例2
date.chain('2026-07-17')
  .prev(1, 'month')
  .format('Y-m-d')  // '2026-06-17'


// 链式调用示例3
date.chain(1765432101234)
  .prev(1, 'year')
  .next(1, 'month')
  .prev(1, 'hour')
  .format('Y-m-d H:i:s.v') 
'2025-01-11 12:48:21.234'
```







### 时区配置/Timezone Configuration <sup style="color:#f33">1.7.23+</sup>

>默认为当前浏览/系统环境所在时区
>Defaults to the time zone of the current environment (browser or system).

你可以修改它/You can customize it.

```js
date.timeZone = 'America/New_York' // 纽约
date.timeZone = 'Asia/Shanghai' // 东8区(北京时间)

// ---------- 或/or ----------
date.timeZone = 'GMT-8' // 东8区(北京时间)
date.timeZone = 'UTC+8' // 东8区(北京时间)

date.timeZone = 'GMT+5' // 西8区 - 纽约
date.timeZone = 'UTC-5' // 西8区 - 纽约
```



[去演练场试一试(try)](https://codepen.io/editor/toviLau/pen/019f47ff-2005-7e2a-bb3d-410fca70ab64/) 

| GMT时区 / GMT timezone | UTC时区 / UTC timezone | IANA 时区名称/IANA time zone name |
|---| --- | --- |
|GMT-12 | UTC+12 | Etc/GMT+12|
|GMT-11 | UTC+11 | Pacific/Midway |
|GMT-10 | UTC+10 | Pacific/Honolulu |
|GMT-9 | UTC+9 | America/Anchorage |
|GMT-8 | UTC+8 | Asia/Shanghai |
|GMT-7 | UTC+7 | Asia/Bangkok |
|GMT-6 | UTC+6 | Asia/Dhaka |
|GMT-5 | UTC+5 | Asia/Karachi |
|GMT-4 | UTC+4 | Asia/Baku |
|GMT-3 | UTC+3 | Europe/Moscow |
|GMT-2 | UTC+2 | Europe/Kiev |
|GMT-1 | UTC+1 | Europe/Paris |
|GMT+0 | UTC+0 | Europe/London |
|GMT+1 | UTC-1 | Atlantic/Azores |
|GMT+2 | UTC-2 | Atlantic/South_Georgia |
|GMT+3 | UTC-3 | America/Montevideo |
|GMT+4 | UTC-4 | America/Halifax |
|GMT+5 | UTC-5 | America/New_York |
|GMT+6 | UTC-6 | America/Chicago |
|GMT+7 | UTC-7 | America/Denver |
|GMT+8 | UTC-8 | America/Los_Angeles |
|GMT+9 | UTC-9 | America/Anchorage |
|GMT+10 | UTC-10 | Pacific/Honolulu |
|GMT+11 | UTC-11 | Pacific/Midway |
|GMT+12 | UTC-12 | Etc/GMT+12 |
|GMT-3:30 | UTC+3:30 | Asia/Tehran |
|GMT-4:30 | UTC+4:30 | Asia/Kabul |
|GMT-5:30 | UTC+5:30 | Asia/Kolkata |
|GMT-5:45 | UTC+5:45 | Asia/Kathmandu |
|GMT-6:30 | UTC+6:30 | Asia/Rangoon |
|GMT-8:45 | UTC+8:45 | Australia/Eucla |
|GMT-9:30 | UTC+9:30 | Australia/Adelaide |
|GMT-10:30 | UTC+10:30 | Australia/Lord_Howe |
|GMT+3:30 | UTC-3:30 | Canada/Newfoundland |
|GMT+4:30 | UTC-4:30 | America/La_Paz |
|GMT+5:30 | UTC-5:30 | America/Indianapolis |
|GMT+9:30 | UTC-9:30 | Pacific/Marquesas |



###### rowUnitConf

### 配置模板字符 `R` (相对时间) 的单位名称 `rowUnitConf`<sup style="color:#f33">1.7.22+</sup>

> ps: 只有过去的历史时间会显示“刚刚”，未来时间精确显示到秒<sup style="color:#f33">1.7.23*</sup><br/>PS: "just now" for past times; future times show exact seconds.<br /><br />默认阈值(date.rowUnitConf.threshold)是 `30` 秒<br />
>
> > 5 秒前 → "刚刚" / 5 secs ago → "just now"<br />25 秒前 → "刚刚" / 25 secs ago → "just now"<br/>35 秒前 → "35秒前" / 35 secs ago → "35 secs ago"<br/>5 秒后 → "5秒后"（不会显示"刚刚"）/ 5 secs later → "5 secs later" (not "just now")<br/>25 秒后 → "25秒后"（不会显示"刚刚"）/ 25 secs later → "25 secs later" (not "just now")

> **默认配置/default config**

```js
date.rowUnitConf={
    threshold: 30000, // 30秒算刚刚(阈值)/"just now" means within the last 30 seconds. 1.7.23*
    Year: "年",
    Month: "月",
    Week: "周",
    Day: "天",
    Hour: "小时",
    Minute: "分钟",
    Second: "秒",
    justNow: "刚刚",
    before: "前",
    after: "后",
}
```

> 修改配置/Modify the configuration.

```js
// 示例 1: 完整修改/demo 1: Full customization.
date.rowUnitConf = {
    threshold: 10000, // 10秒算刚刚(阈值)/"just now" means within the last 10 seconds. 1.7.23*
    Year: "Years",
    Month: "Months",
    Week: "Weeks",
    Day: "Days",
    Hour: "Hours",
    Minute: "Minutes",
    justNow: "just now",
    before: "before",
    after: "after",
}

// 示例 2: 只修改部分单位，其他保持默认/demo 2: Modify only some units, keep others as default. 
date.rowUnitConf = {
    // threshold 未配置，保持默认 "30000"
    Year: "년",
    Month: "월",
    Week: "주",
    Day: "일",
    Hour: "시간",
    // Minute 未配置，保持默认 "分钟"
    // justNow 未配置，保持默认 "刚刚"
    before: "전",
    after: "후",
};
```



[去演练场试一试(try)](https://codepen.io/editor/toviLau/pen/019f47ff-2005-7e2a-bb3d-410fca70ab64/) 


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

> **配置 Api(Configuration )**

|  Api  |  说明(description)  |
| --- | --- |
| replaceHolidayConf | 替换默认节假日配置。 <br />Replace the default holiday **configuration** |
| editHolidayConf | 修改或新增节假日配置。 <br />Modify or add holiday **configuration**. |

> **key值说明(Key description)**

| Key 格式                                      | 说明(description)                                            | 示例(demo)                                             |
| :-------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------- |
| `MMDD`                                        | **公历**日期<br />**Gregorian** date                         | `0101` = 1月1日<br />`0101` = January 1                |
| `*MMDD`                                       | **农历**日期(`*` 前缀)<br />**Lunar** date (prefixed with *) | `*0101` = 正月初一<br />`*0101` = Lunar 1/1            |
| `#MMOW`                                       | **公历**某月第几个星期几(`#` 前缀)<br />Gregorian Nth weekday of a given month.(prefixed with `#`)<br /><br />第几个`O` 1~5 <br />Ordinal`O`: 1–5.<br /><br />星期`W`从0到6分别表示：(日一二三四五六)。 <br />Weekday: 0-6 (Sun Mon Tue Wed Thu Fri Sat)<br /> | `#0520` = 5月第2个星期日<br />`#0520` = 2nd Sun in May |
| `@DDDD`<sup style="color:#f33">(1.6.3+)</sup> | **公历一年中的第几天**(`@` 前缀 + 4 位天)<br />day of the **Gregorian** year (prefixed with `@`) | `@0256` = 第256天<br />`@0256` = day 256               |

> **代码示例(DEMO)**

```javascript
  /**
   * 示例3
   * demo 3
   **/
  // 修改与新增节日配置(未被修改的节日依然有效)
  // Modified and added holiday config (unmodified holidays are still valid)
  date.editHolidayConf = {
    '0214': ['小三节', 'Mistress day'], // 修改(edit)
    '0715': ['示例节', `Demo's day`], // 修改(edit)
    '#0836': ['纪念日', 'Anniversary day'], // 新增(add)
    '*1213': ['作者生日', `Author's birthday`] // 新增(add)
  }
  
  // 替换节日配置(默认配置的节日全部失效)
  // Replace the holiday config (the default holiday config is completely overridden).
  date.replaceHolidayConf = { // 替换(replace)
    '0214': ['小三节', 'Mistress day'],
    '0715': ['示例节', `Demo's day`],
    '#0836': ['纪念日', 'Anniversary day'],
    '*1213': ['作者生日', `Author's birthday`]
  }
  
  date('Y-m-d fh', new Date()) // -> 2019-07-15 示例节
  date('Y-m-d lh', new Date()) // -> 2019-07-15 demo's day
```

[去演练场试一试(try)](https://codepen.io/editor/toviLau/pen/019f47ff-2005-7e2a-bb3d-410fca70ab64/) 

<div id="use-duration" name="use-duration"></div>

### 格式化持续时间/剩余时间/倒计时(duration/countdown)<sup style="color:#f33">(1.7.0+)</sup>


 > 用法 / usage：
 > date.duration([tplChars:string='D天h:i:s'[, duration:number=0 [,isMs: boolean=true]]])
 > date.duration(['模板字符'[, 持续时间:时间戳 [,是否毫秒: true]]]) 
 >
 > 
 >
 > 参数/Param: duration<sup style="color:#f33">(1.7.23*)</sup>
 >
 > ​    更新为绝对值，以下输出结果是一样的
 >
 > ​    Updated to use absolute values. The following outputs are the same:
 >
 > 
 >
 > ​    date.duration('d天 h小时i分种s秒', 186400000):   // 02天 03小时46分种40秒
 >
 > ​    date.duration('d天 h小时i分种s秒', -186400000):  // 02天 03小时46分种40秒
 >
 > ​    date.duration('d天 h小时i分种s秒', +186400000):  // 02天 03小时46分种40秒

```javascript
  date.duration('n月j天 h小时i分钟s秒',  314159265 ) //" 0月3天 15小时15分钟59秒"
  date.duration('高考倒计时：D天h小时i分钟s秒',  1591491612345 - 1577808654321 ) //" 高考倒计时：158天08小时49分钟18秒"
  date.duration('倒计时：D天h小时i分钟s秒',  13682958024 ) // 倒计时：158天08小时49分钟18秒
  date.duration('cou\\nt \\d\\ow\\n：D \\d\\a\\y h:i:s',  1591491612345 - 1577808654321 ) // countdown：158 day 08:49:18
  date.duration('D天h小时i分钟s.v秒',  86400000 + 12345) // 1天00小时00分钟12.345秒
  date.duration('H小时i分钟s.v秒',  86400000 + 7654321) // 26小时07分钟34.321秒
  date.duration('D天h小时i分钟s.v秒',  86400000 - 12345) // 0天23小时59分钟47.655秒
  date.duration('1970年至今已有D天h小时i分钟s.v秒',  new Date()) // "从1970年至今已有18322天11小时20分钟15.092秒"
```

| chars | Description |
| :--- | :--- |
| y<br/>Y | 数字表示的年。”0”到”273785" <br />Numeric year (0 – 273785)  |
| m | 数字表示的月份，有前导零。"00"到"12" <br />Months with leading zeros. "00" to "12" |
| n | 数字表示的月份，无前导零。"0"到"12" <br /> Months without leading zeros. "0" to "12" |
| M | 总月数，”0”到”3285420" <br />Total months “0” to "3285420"|
| d | 数字表示的天数，有前导零。"00"到"31" <br />Days with leading zeros. "00" to "31" |
| j | 数字表示的天数，无前导零。"0"到"31" <br />Days without leading zeros. "0" to "31" |
| D | 总天数， "0"到"100000000" <br />Total days "0" to "100000000"|
| h | 数字表示的小时数，有前导零。"00"到"24" <br />Hours with leading zeros. "00" to "24" |
| g | 数字表示的小时数，无前导零。"0"到"24" <br />Hours without leading zeros. "0" to "24" |
| H | 总小时数，”0”到”2400000000" <br />Total hours “0” to "2400000000" |
| i | 数字表示的分钟数，有前导零。"00"到"59" <br />Minutes with leading zeros. "00" to "59" |
| I | 总分钟数，"0"到"144000000000" <br />Total minutes. "0" to "144000000000" |
| s | 数字表示的秒数，有前导零。"00"到"59" <br />Seconds with leading zeros. "00" to "59" |
| S | 总秒数，"0"到"8640000000000" <br />Total seconds "0" to "8640000000000" |
| v | 数字表示的毫秒数，有前导零。"000"到"999" <br />Milliseconds with leading zeros. "000" to "999" |
| V | 总毫秒数，"0"到"8640000000000000" <br />Total milliseconds "0" to "8640000000000000" |
| all | **{Object}** <br />输出所有模板字符串与对应的值。 <br />Output all template strings with their values. |

[去演练场试一试(try)](https://codepen.io/editor/toviLau/pen/019f47ff-2005-7e2a-bb3d-410fca70ab64/) 

### 黑科技的使用方式(Interesting to use)

> 可以非常简单的实现一个时钟，就象下面的一样。  
> Coding a clock is so easy, just like the following.
>
> ![time clock](https://tovilau.github.io/date-php/img.md/clock.gif)  
>
> 咦！这个时间的毫秒是不是有点怪？这是所有基于“事件循环”的定时器（包括 `setInterval` 和 `setTimeout`）共有的特性，并非代码有 BUG ([_**MDN**_](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout#reasons_for_longer_delays_than_specified) 上有说明)。(虽然这只是一张图片^\_^，但目的是抛出Javascript确实存在的问题。) 简单的讲这与`事件循环`或 `cpu 时间片`的执行有关
> Hmm, is the millisecond part of this time looking a bit off? That's a known quirk of [_**setInterval**_](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout#reasons_for_longer_delays_than_specified)  ([_**MDN**_](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout#reasons_for_longer_delays_than_specified) has a detailed explanation). Although this is just a static image ^_^, it highlights a real issue that exists in JavaScript. In simple terms, it all comes down to the `event loop` and `CPU time slice` scheduling.


```html
<!doctype html>
<html>
<head>
	<title>test</title>
</head>
<body>
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
</body>
</html>
```

<br>

### 关于鸣谢(About)

  [_**GitHub**_](https://www.github.com)
  [_**npm**_](https://www.npmjs.org)
  [_**rollup**_](https://www.rollupjs.com) 
  [_**eslint**_](https://eslint.org)
  [_**flow**_](https://flow.org)
  [_**uglifyJs**_](http://lisperator.net/uglifyjs/)  
