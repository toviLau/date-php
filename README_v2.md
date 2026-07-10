## JavaScript模仿类似于PHP的日期格式功能_v2.alpha

JavaScript implements date formatting functions similar to PHP (v2)



[![issues](https://img.shields.io/github/issues/toviLau/date-php)](https://github.com/toviLau/date-php/issues)
[![forks](https://img.shields.io/github/forks/toviLau/date-php)](https://github.com/toviLau/date-php)
[![github](https://img.shields.io/github/package-json/v/tovilau/date-php?logo=github)](https://github.com/toviLau/date-php)
[![stars](https://img.shields.io/github/stars/toviLau/date-php)](https://github.com/toviLau/date-php)
![license](https://img.shields.io/github/license/toviLau/date-php)
![github last commit](https://img.shields.io/github/last-commit/tovilau/date-php)
[![npm](https://img.shields.io/npm/v/date-php?label=version&logo=npm)](https://www.npmjs.com/package/date-php) 
[![npm](https://img.shields.io/npm/v/date-php/alpha?color=orange&logo=npm&label=alpha)](https://www.npmjs.com/package/date-php)  
[![downloads](https://img.shields.io/npm/dm/date-php?logo=npm)](https://www.npmjs.com/package/date-php)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/date-php)](https://www.npmjs.com/package/date-php)

> 这是一个Javascript模仿类似于PHP日期时间格式化函数，使用方法和PHP非常类似，有丰富的模板字符，并在原来的基础上增强了一些模板字符。例如：中国的农历日期、用汉字来表示日期、十二生肖与星座。让转换日期时间更自由。  
> This is a JavaScript library that imitates PHP's date and time formatting functions. It is very similar to PHP in usage, provides rich template characters, and extends them with additional features such as Chinese lunar dates, Chinese character date representation, Chinese zodiac signs, and constellations — giving you more flexibility in date and time conversion.
>
> 
>
> [如果你喜欢请 star 支持一下](https://www.npmjs.com/package/date-php)    
> [If you like this project, please star it.](https://www.npmjs.com/package/date-php)   
>
> 
>
> **您现在正在阅读的是 v2.0 文档 [v1文档在这里](https://github.com/toviLau/date-php/blob/master/README.md)**
>
> **You are viewing v2.0 docs. [v1 docs here.](https://github.com/toviLau/date-php/blob/master/README.md)**

### 2.0 重大更新

> 2.0 版本用 `TS` 重构，引入**插件系统**，实现**按需加载**，支持摇树, 大幅减小核心包体积。

* 插件架构: 核心功能与农历、节假日等功能解耦，通过 `date.use()` 按需注册插件
* Core 轻量版: 仅包含基础日期格式化，体积缩小约 60%
* 子包导入: 支持独立导入插件
  * lunar
  * ganzhi
  * zodiac
  * astro
  * shiKe
  * solarTerm
  * holiday

* 独立工具: 
  * duration
  * timezone
  * chineseUtils
  * getLunar
  * getGanZhi
  * 等可独立使用


### 快速开始

```ts
// 举个栗子(examples)
// 首先(First)
import date from 'date-php';
const d = new Date(); // 1783526400000 or 'Thu Jul 09 2026 00:00:00 GMT+0800 (中国标准时间)'

// 然后(Second)
date('Y-m-d', d); // "2019-07-15"
date('y-m-d', d); // "19-07-15"
date('y-m-d R', new Date() + 60 * 2000); // "2026-07-05 2分钟前" (1.7.22+)
date('m-d-Y H:i:s', d); // "07-15-2019 15:38:56"
date('y-m-d H:i:s[a] D', d); // "07-15-20 15:38:56[pm] Mon"
date('Y-m-d H:i:s', new Date()); // "2026-07-09 15:38:56"
date('C年f月k日 星期K', 1563176336000); // "二〇一九年七月十五日 星期一"
date('y-m-d R', new Date() - 60 * 2000); // "26-07-09 2分钟前"
date({template: 'Y-m-d', dateTime: d, isMs: false } ); // "2019-07-15"
date({template: 'Y-m-d', isMs: false } ); // "2019-07-15"
date({dateTime: d, isMs: false } ); // "2019-07-15"

// 或者这样 Date 原型链扩展(Or)
d.format('Y-m-d'); // "2019-07-15"
d.format({dateTime: d, isMs: false }); // "2019-07-15"
d.format('y-m-d'); // "2019-07-15"
d.format('y-m-d R', new Date() + 60 * 2000); // "2026-07-05 2分钟前"
d.format('m-d-Y H:i:s'); // "07-15-2019 15:38:56"
d.format('m-d-y H:i:s'); // "07-15-20 15:38:56"
```
> 格式化持续时间/剩余时间/倒计时(duration/countdown) -- **date.duration**
```ts
// 这里时间戳是代表的持续时间/剩余时间/倒计时(duration/countdown)
date.duration('倒计时：D天h小时',  13682958024 ) // 倒计时：158天08小时
date.duration('cou\\nt \\dow\\n：D \\d\\a\\y h \\hour\'\\s',  1591491612345 - 1577808654321 ) // "countdown：158 day 08 hour's"
date.duration('D天h小时i分钟s.v秒',  86400000 + 12345) // 1天00小时00分钟12.345秒
date.duration('H小时i分钟s.v秒',  86400000 + 7654321) // 26小时07分钟34.321秒
date.duration('D天h小时i分钟s.v秒',  86400000 - 12345) // 0天23小时59分钟47.655秒
```

### 安装(install)

```shell
# npm
npm i -S date-php

# yarn
yarn add date-php

# CDN
<script src="http://unpkg.com/date-php" />
```



### 使用(use)

  > 用法 / usage：
  >
  > date([字符模板:string='Y-m-d'[, 日期时间对象:dateTime|number=new Date() [,是否毫秒: boolean=true]]])
  >
  > date([tplChars:string='Y-m-d'[, dateTimeObj:dateTime|number=new Date() [,isMs: boolean=true]]])
  >
  > 
  >
  > 1、以下所有方式的入参都是可选参数。  
  > 　 Entry parameters in all of the following ways are optional.
  >
  > 2、以下`new Date()`或其它的日期时间的初始化的值，我们默许都是 `1563176336000` Unix时间戳对应的日期时间。  
  > 　 The following `new Date ()` or other date time initialization values, we acquiescence are `1563176336000` Unix timestamp corresponding Datetime.
  >
  > 3、[_**持续时间/剩余时间/倒计时** 点这里(**duration/countdown** clicked here)_](#use-duration)

```ts
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



### 导入方式

> 完整版（含农历 + 节假日插件）

```ts
// ES Module --> CDN方式跳过(CDN mode skip)
import date from 'date-php';

// CommonJS --> CDN方式跳过(CDN mode skip)
const date = require('date-php');
```

完整版默认内置 `lunarPlugin` 和 `holidayPlugin`，开箱即用所有模板字符。

> Core 轻量版（仅基础格式化）

```ts
// ES Module
import date from 'date-php/core';

// CommonJS
const date = require('date-php/core');
```

Core 版本不包含农历、节假日等扩展功能，适用于只需要基础日期格式化的场景。

### 按需导入插件

```javascript
import date from 'date-php/core'; // 核心基础格式化功能
// 以下插件导入并 use 才能解析 相印模板
import lunarPlugin from 'date-php/lunar'; // 农历
import ganzhiPlugin from 'date-php/ganzhi'; // 干支
import zodiacPlugin from 'date-php/zodiac'; // 生肖
import astroPlugin from 'date-php/astro'; // 星座
import shiKePlugin from 'date-php/shike'; // 时刻
import solarTermPlugin from 'date-php/solarterm'; // 24节气
import holidayPlugin from 'date-php/holiday'; // 节日

// 按需注册
date.use(lunarPlugin);
date.use([
    ganzhiPlugin, 
    zodiacPlugin
]);
date.use(astroPlugin);
```

### 独立工具库

```javascript
// 时区
import { TIMEZONE_MAP, getOffsetInfo } from 'date-php/timezone';

// 持续时间
import { duration, countTime } from 'date-php/duration';

// 中文工具
import { textReplace, textReplace2 } from 'date-php/utils';

// 农历转换
import getLunar from 'date-php/lunar'; // getLunar.solar2lunar() / getLunar.lunar2solar()

// 天干地支
import { toGanZhiYear, toGanZhi, Gan, Zhi } from 'date-php/lunar';

// 生肖
import { getAnimal, Animals } from 'date-php/lunar';

// 星座
import { toAstro } from 'date-php/lunar';

// 节气
import { solarTerm, getTerm } from 'date-php/lunar';

// 节假日
import { getFestival } from 'date-php/holiday';
```

---

### API 参考

> Date 签名

```ts
type tDateTime = Date | string | number;

interface iDateOptions {
  chartTpl?: string; // 默认 'Y-m-d H:i:s'
  dateTime?: tDateTime; // Date.now()
  isMs?: boolean; // 默认 true
}
date(options?: iDateOptions): string;
date(
    chartTpl?: iDateOptions['chartTpl'], 
    dateTime?: iDateOptions['dateTime'], 
    isMs?: iDateOptions['isMs']
): string|Record(string: string|boolean);

```



格式化日期时间。

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| templeate | `string` | `'Y-m-d'` | 格式化模板字符 |
| dateTime | `Date|string|number` | `new Date()` | 要格式化的日期时间 |
| isMs | `boolean` | `true` | 时间戳是否为毫秒。`false` 为秒级 |

**返回值：** `string` 格式化后的字符串，当 `templeate` 为 `'json'` | `'all'` | `'-1'` 时返回 `Record<string, string|boolean>`

```javascript
date('Y-m-d H:i:s', new Date()); // "2026-07-09 15:38:56"
date('Y-m-d', 1563148800000); // "2019-07-15"
date('Y-m-d', 1563148800, false); // 秒级时间戳
date('json', new Date()); // 返回所有模板字符的键值对对象
```

### Date.prototype.format(templeate, dateTime, isMs)

通过原型链扩展，所有 `Date` 实例均可使用。

```javascript
new Date().format('Y-m-d H:i:s'); // "2026-07-09 15:38:56"
new Date(1563148800000).format('Y-m-d'); // "2019-07-15"
```

### date.use(plugin)

注册插件，支持单个插件或插件数组。

| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| plugin | `DatePlugin | DatePlugin[]` | 插件对象或插件数组 |

```javascript
import date from 'date-php/core';
import lunarPlugin from 'date-php/lunar';
import ganzhiPlugin from 'date-php/ganzhi';

date.use(lunarPlugin); // 注册单个
date.use([ganzhiPlugin]); // 注册数组
```

### date.timeZone

全局时区设置，默认为系统当前时区。支持 IANA 时区标识（如 `'Asia/Shanghai'`）和 GMT/UTC 偏移格式（如 `'GMT-8'`、`'UTC+8'`）。

```javascript
date.timeZone = 'America/New_York';
date('Y-m-d H:i:s e', new Date()); // 纽约时间

date.timeZone = 'Asia/Tokyo';
date('Y-m-d H:i:s O', new Date()); // 东京时间，输出 +0900

date.timeZone = 'GMT-8';
date('Y-m-d H:i P', new Date()); // 支持GMT格式
```

### date.rowUnitConf

相对时间（`R` 模板字符）的配置项。

```javascript
date.rowUnitConf = {
  threshold: 30000,  // "刚刚"的阈值（毫秒），默认 30000（30秒）
  Year: '年',        // 年单位
  Month: '月',       // 月单位
  Week: '周',        // 周单位
  Day: '天',         // 天单位
  Hour: '小时',      // 小时单位
  Minute: '分钟',    // 分钟单位
  Second: '秒',      // 秒单位
  justNow: '刚刚',   // 阈值内的文案
  before: '前',      // 过去时后缀
  after: '后',       // 将来时后缀
};
```

**自定义英文相对时间：**

```javascript
// 示例 1: 完整修改/demo 1: Full customization.
date.rowUnitConf = {
    threshold: 10000, // 10秒算刚刚(阈值)/"just now" means within the last 10
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
date('Y-m-d R', new Date() - 60 * 2000); // "2026-07-09 2 minute ago"
```

### date.duration(templeate, timestamp, ms)

格式化持续时间 / 倒计时。

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| fmt | `string` | `'D天h:i:s'` | 格式化模板字符 |
| timestamp | `number` | `0` | 持续时间（取绝对值） |
| ms | `boolean` | `true` | 时间戳是否为毫秒 |

```javascript
date.duration('D天h小时i分钟s秒', 86400000 + 12345); // "1天00小时00分钟12秒"
date.duration('H小时i分钟s.v秒', 86400000 + 7654321); // "26小时07分钟34.321秒"
date.duration('高考倒计时：D天h小时i分钟s秒', 1591491612345 - 1577808654321);
```

### date.replaceHolidayConf / date.editHolidayConf

自定义节假日配置，详见 [自定义节假日](#自定义节假日-custom-holidays) 章节。

### date.version

当前版本号。

```javascript
date.version; // "2.0.0-beta.1"
```

---

## 模板字符参考

> 1、使用方法类似 [PHP date()](https://www.php.net/manual/en/function.date.php)  
> 2、加 <span style="color:#999">\*</span> 号的为 `date-php` 特有功能，PHP 中没有  
> 3、转义模板字符使用双反斜杠 `\\`（PHP 是单反斜杠）  
> 4、农历转换范围：1900 - 2100  
> 5、模板字符区分大小写  
> 6、带 🔌 标记的模板字符需要注册对应插件才能使用

### 日 (Day)

| chars | 插件 | Description |
| :--- | :--- | :--- |
| d | | 月份中的第几天，有前导零的2位数字。"01" 到 "31" <br/>Day of the month, 2 digits with leading zeros. 01 to 31 |
| j | | 月份中的第几天，没有前导零。"1" 到 "31" <br/>Day of the month without leading zeros. 1 to 31 |
| <span style="color:#999">\*</span>k | | 月份中的第几天，汉字表示。"一" 到 "卅一" <br/>Day of the month, Chinese character representation |
| D | | 星期中的第几天，3个字母。"Mon" 到 "Sun" <br/>Day of the week, three letters. Mon to Sun |
| l | | 星期几，完整文本。"Sunday" 到 "Saturday" <br/>A full textual representation of the day of the week |
| N | | ISO-8601 星期几。"1"(周一) 到 "7"(周日) <br/>ISO-8601 numeric representation. 1 (Mon) to 7 (Sun) |
| S | | 英文序数后缀。"st" / "nd" / "rd" / "th"，配合 j 使用 <br/>English ordinal suffix for the day of the month |
| w | | 星期几，数字。"0"(周日) 到 "6"(周六) <br/>Numeric representation of the day of the week. 0 (Sun) to 6 (Sat) |
| <span style="color:#999">\*</span>K | | 星期几，汉字。"日"(周日) 到 "六"(周六) <br/>Chinese character of the day of the week |
| z | | 年份中的第几天。"0" 到 "365" <br/>The day of the year. 0 to 365 |
| <span style="color:#999">\*</span>ld | 🔌 lunar | 农历日期。"初一" 到 "卅" <br/>Lunar day. "初一" to "卅" |
| <span style="color:#999">\*</span>lt | 🔌 lunar | 时辰。"子" 到 "亥"（2小时为一时辰） <br/>Chinese 'shi chen'. "子" to "亥" |
| <span style="color:#999">\*</span>lk | 🔌 lunar | 刻。"零" 到 "七"（一时辰八刻） <br/>Chinese 'ke'. "零" to "七" |
| <span style="color:#999">\*</span>lg | 🔌 lunar | 更时数字。"1" 到 "5"（一晚五更） <br/>Chinese 'geng' number. 1 to 5 |
| <span style="color:#999">\*</span>lG | 🔌 lunar | 更时汉字。"一更" 到 "五更" <br/>Chinese 'geng' character. "一更" to "五更" |
| <span style="color:#999">\*</span>fh | 🔌 holiday | 节假日中文。如 "元旦节" <br/>Holiday in Chinese. e.g. "元旦节" |
| <span style="color:#999">\*</span>lh | 🔌 holiday | 节假日英文。如 "New year" <br/>Holiday in English. e.g. "New year" |

### 星期 (Week)

| chars | 插件 | Description |
| :--- | :--- | :--- |
| W | | 年份中的第几周 <br/>The week number in year |

### 月 (Month)

| chars | 插件 | Description |
| :--- | :--- | :--- |
| F | | 月份，完整英文。"January" 到 "December" <br/>A full textual representation of a month |
| M | | 月份，3字母缩写。"Jan" 到 "Dec" <br/>A short textual representation of a month |
| m | | 月份，有前导零。"01" 到 "12" <br/>Numeric representation, with leading zeros |
| n | | 月份，无前导零。"1" 到 "12" <br/>Numeric representation, without leading zeros |
| t | | 给定月份的天数。"28" 到 "31" <br/>Number of days in the given month |
| <span style="color:#999">\*</span>f | | 月份，汉字。"一" 到 "十二" <br/>Month in Chinese characters |
| <span style="color:#999">\*</span>lf | 🔌 lunar | 月份天干地支。如 "甲子" <br/>Month in Heavenly Stems && Earthly Branches |
| <span style="color:#999">\*</span>lm | 🔌 lunar | 农历月份汉字。"一" 到 "十二" <br/>Lunar month in Chinese characters |
| <span style="color:#999">\*</span>lM | 🔌 lunar | 农历月份数字。"1" 到 "12" <br/>Lunar month number |
| <span style="color:#999">\*</span>lF | 🔌 lunar | 农历月份（含闰月前缀）。如 "闰正月" <br/>Lunar month with "leap" prefix |
| <span style="color:#999">\*</span>la | 🔌 lunar | 12星座。如 "狮子座" <br/>12 Constellation |
| <span style="color:#999">\*</span>ls | 🔌 lunar | 24节气中文。如 "小寒" <br/>24 solar terms in Chinese |
| <span style="color:#999">\*</span>lS | 🔌 lunar | 24节气英文。如 "Minor Cold" <br/>24 solar terms in English |
| <span style="color:#999">\*</span>lq | 🔌 lunar | 季度数字。"1" 到 "4" <br/>Quarter number |
| <span style="color:#999">\*</span>lQ | 🔌 lunar | 季度汉字。"一" 到 "四" <br/>Quarter in Chinese characters |

### 年 (Year)

| chars | 插件 | Description |
| :--- | :--- | :--- |
| L | | 是否为闰年。1: 是，0: 否 <br/>Whether it's a leap year. 1 or 0 |
| o | | ISO-8601 年份数字 <br/>ISO-8601 week-numbering year |
| Y | | 4位数字完整年份 <br/>A full numeric representation of a year, 4 digits |
| y | | 2位数字年份 <br/>A two digit representation of a year |
| <span style="color:#999">\*</span>C | | 公历年份汉字。如 "二〇一九" <br/>Gregorian year in Chinese characters |
| <span style="color:#999">\*</span>ly | 🔌 lunar | 农历干支纪年（60年一循环）。"甲子" 到 "癸亥" <br/>Lunar year in Heavenly Stems and Earthly Branches |
| <span style="color:#999">\*</span>lc | 🔌 lunar | 农历年数字。如 2019 <br/>Lunar year number |
| <span style="color:#999">\*</span>lC | 🔌 lunar | 农历年汉字。如 "二〇一九" <br/>Lunar year in Chinese characters |
| <span style="color:#999">\*</span>lz | 🔌 lunar | 生肖汉字。"鼠" 到 "猪" <br/>Chinese Zodiac in Chinese |
| <span style="color:#999">\*</span>lZ | 🔌 lunar | 生肖英文。"Rat" 到 "Pig" <br/>Chinese Zodiac in English |
| <span style="color:#999">\*</span>lj | 🔌 lunar | 日期天干地支。如 "甲子" <br/>Day in Heavenly Stems && Earthly Branches |

### 时间 (Time)

| chars | 插件 | Description |
| :--- | :--- | :--- |
| a | | 小写上午/下午。"am" 或 "pm" <br/>Lowercase Ante meridiem and Post meridiem |
| A | | 大写上午/下午。"AM" 或 "PM" <br/>Uppercase Ante meridiem and Post meridiem |
| B | | Swatch Internet 时间。"000" 到 "999" <br/>Swatch Internet time |
| g | | 12小时制，无前导零。"1" 到 "12" <br/>12-hour format without leading zeros |
| G | | 24小时制，无前导零。"0" 到 "23" <br/>24-hour format without leading zeros |
| h | | 12小时制，有前导零。"01" 到 "12" <br/>12-hour format with leading zeros |
| H | | 24小时制，有前导零。"00" 到 "23" <br/>24-hour format with leading zeros |
| i | | 分钟，有前导零。"00" 到 "59" <br/>Minutes with leading zeros |
| s | | 秒，有前导零。"00" 到 "59" <br/>Seconds with leading zeros |
| <span style="color:#999">\*</span>v | | 毫秒。"0" 到 "999" <br/>Milliseconds. 0 to 999 |
| <span style="color:#999">\*</span>u | | 微秒。"0" 到 "999999" <br/>Microseconds. 0 to 999999 |

### 时区 (Timezone)

| chars | 插件 | Description |
| :--- | :--- | :--- |
| e | | 时区标识符。如 "Asia/Shanghai" <br/>Timezone identifier |
| O | | 与 UTC 的时差。如 "+0800" <br/>Difference to UTC. e.g. +0800 |
| P | | 与 UTC 的时差（带冒号）。如 "+08:00" <br/>Difference to UTC with colon. e.g. +08:00 |
| T | | 时区缩写。如 "CST" <br/>Timezone abbreviation |
| Z | | 时区偏移秒数。如 "-28800" <br/>Timezone offset in seconds |
| I | | 是否为夏令时。1: 是，0: 否 <br/>Whether daylight saving time. 1 or 0 |

### 组合格式 (Composite)

| chars | 插件 | Description |
| :--- | :--- | :--- |
| c | | ISO 8601 格式。"2026-07-09T15:38:56.064+08:00" <br/>ISO 8601 formatted date |
| r | | RFC 格式。等价于 Date.toString() <br/>RFC formatted date |
| U | | Unix 时间戳（秒）。如 "1563176336" <br/>Unix timestamp (seconds) |
| <span style="color:#999">\*</span>R | | 相对时间。如 "2分钟前"、"5小时后"、"刚刚" <br/>Relative time. e.g. "2分钟前", "5小时后", "刚刚" |

### 独立插件模板字符

以下模板字符由独立插件提供，需通过 `date.use()` 注册后使用：

#### ganzhiPlugin（天干地支）

| chars | Description |
| :--- | :--- |
| gzY | 年柱天干地支。如 "己亥" <br/>Year pillar in Gan-Zhi |
| gzM | 月柱天干地支。如 "辛未" <br/>Month pillar in Gan-Zhi |
| gzD | 日柱天干地支。如 "甲子" <br/>Day pillar in Gan-Zhi |
| gzH | 时柱天干地支。如 "甲子" <br/>Hour pillar in Gan-Zhi |

#### zodiacPlugin（生肖）

| chars | Description |
| :--- | :--- |
| zz | 生肖汉字。"鼠" 到 "猪" <br/>Chinese Zodiac in Chinese |
| zzEn | 生肖英文。"Rat" 到 "Pig" <br/>Chinese Zodiac in English |

#### astroPlugin（星座）

| chars | Description |
| :--- | :--- |
| astro | 星座。如 "狮子座" <br/>Constellation. e.g. "狮子座" |

#### shiKePlugin（时辰刻）

| chars | Description |
| :--- | :--- |
| shi | 时辰地支。"子" 到 "亥" <br/>Shi-chen Earthly Branch |
| ke | 刻。如 "三更零刻" <br/>Ke. e.g. "三更零刻" |
| geng | 更序号。1 到 5 <br/>Geng number. 1 to 5 |

#### solarTermPlugin（节气）

| chars | Description |
| :--- | :--- |
| term | 当日节气中文。如 "小寒"，非节气日返回空 <br/>Solar term in Chinese. Empty if not a solar term day |
| termEn | 当日节气英文。如 "Minor Cold" <br/>Solar term in English |
| termDay | 节气详情对象 `{ term, day }` 或 `null` <br/>Solar term detail object or null |

---

## duration 模板字符

> `date.duration(fmt, timestamp, ms)` 使用以下模板字符

| chars | Description |
| :--- | :--- |
| y / Y | 年数。"0" 到 "273785" <br/>Numeric year |
| m | 月份，有前导零。"00" 到 "12" <br/>Months with leading zeros |
| n | 月份，无前导零。"0" 到 "12" <br/>Months without leading zeros |
| M | 总月数。"0" 到 "3285420" <br/>Total months |
| d | 天数，有前导零。"00" 到 "31" <br/>Days with leading zeros |
| j | 天数，无前导零。"0" 到 "31" <br/>Days without leading zeros |
| D | 总天数。"0" 到 "100000000" <br/>Total days |
| h | 小时，有前导零。"00" 到 "24" <br/>Hours with leading zeros |
| g | 小时，无前导零。"0" 到 "24" <br/>Hours without leading zeros |
| H | 总小时数。"0" 到 "2400000000" <br/>Total hours |
| i | 分钟，有前导零。"00" 到 "59" <br/>Minutes with leading zeros |
| I | 总分钟数。"0" 到 "144000000000" <br/>Total minutes |
| s | 秒，有前导零。"00" 到 "59" <br/>Seconds with leading zeros |
| S | 总秒数。"0" 到 "8640000000000" <br/>Total seconds |
| v | 毫秒，有前导零。"000" 到 "999" <br/>Milliseconds with leading zeros |
| V | 总毫秒数。"0" 到 "8640000000000000" <br/>Total milliseconds |

当 `fmt` 为 `'json'` / `'all'` / `'-1'` 时，返回所有模板字符的键值对对象。

---

## 插件系统

### 插件架构

2.0 采用插件架构，核心（core）仅包含基础日期时间格式化功能。农历、节假日等功能以插件形式提供，按需注册。

```
date-php (完整版)
├── core (基础格式化)
├── lunarPlugin (农历：日期/月份/干支/生肖/星座/节气/时辰/刻/更)
├── holidayPlugin (节假日)
└── 独立插件
    ├── ganzhiPlugin (天干地支四柱)
    ├── zodiacPlugin (生肖)
    ├── astroPlugin (星座)
    ├── shiKePlugin (时辰刻)
    └── solarTermPlugin (节气)
```

### 插件接口

```typescript
interface DatePlugin {
  name: string;
  install: (tChars: TChars, ctx: PluginContext) => void;
}
```

### 编写自定义插件

```javascript
const myPlugin = {
  name: 'myPlugin',
  install(tChars, ctx) {
    // tChars: 模板字符映射表，可添加自定义字符
    // ctx: { now, tChars, date, pad, _now, ms }
    tChars.xx = () => '自定义输出';
    tChars.xxCn = () => ctx.now.getFullYear() + '年';
  }
};

date.use(myPlugin);
date('今天是xxCn', new Date()); // "今天是2026年"
```

### 插件上下文 (PluginContext)

| 属性 | 类型 | 说明 |
| :--- | :--- | :--- |
| now | `Date` | 经过时区转换后的 Date 对象 |
| tChars | `TChars` | 模板字符映射表 |
| date | `DateFunction` | date 函数本身 |
| pad | `function` | 补零工具函数 `pad(str, len, placeholder)` |
| _now | `Date` | 原始 Date 对象（未经时区转换） |
| ms | `boolean` | 是否毫秒模式 |

---

## 独立工具库详解

### getLunar（农历转换）

```javascript
import getLunar from 'date-php/lunar';

// 阳历转农历
const lunarInfo = getLunar.solar2lunar(2026, 7, 9);
// 返回:
// {
//   lYear: 2026, lMonth: 6, lDay: 15,
//   IMonthCn: "六月", IDayCn: "十五",
//   cYear: 2026, cMonth: 7, cDay: 9,
//   isToday: true, isLeap: false,
//   nWeek: 3, ncWeek: "星期三", offset: ...
// }

// 农历转阳历
getLunar.lunar2solar(2026, 6, 15); // 同上
getLunar.lunar2solar(2026, 6, 15, true); // 闰月
```

**LunarInfo 字段说明：**

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| lYear | `number` | 农历年 |
| lMonth | `number` | 农历月 |
| lDay | `number` | 农历日 |
| IMonthCn | `string` | 农历月中文名（含闰月前缀） |
| IDayCn | `string` | 农历日中文名 |
| cYear | `number` | 阳历年 |
| cMonth | `number` | 阳历月 |
| cDay | `number` | 阳历日 |
| isToday | `boolean` | 是否为今天 |
| isLeap | `boolean` | 是否闰月 |
| nWeek | `number` | 星期几（1-7） |
| ncWeek | `string` | 星期几中文 |

> 农历转换范围：1900 - 2100

### toGanZhiYear / toGanZhi（天干地支）

```javascript
import { toGanZhiYear, toGanZhi, Gan, Zhi } from 'date-php/lunar';

toGanZhiYear(2026); // "丙午"
toGanZhi(0); // "甲子"
toGanZhi(59); // "癸亥"

// 天干: ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']
// 地支: ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']
```

### getAnimal（生肖）

```javascript
import { getAnimal, Animals } from 'date-php/lunar';

getAnimal(2026); // "马"
// Animals: ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']
```

### toAstro（星座）

```javascript
import { toAstro } from 'date-php/lunar';

toAstro(7, 9); // "巨蟹座"
toAstro(1, 15); // "摩羯座"
```

### solarTerm / getTerm（节气）

```javascript
import { solarTerm, getTerm } from 'date-php/lunar';

// 获取某年某节气的日期
getTerm(2026, 1); // 小寒的日期（1-24，1=小寒，2=大寒，...24=冬至）

// 24节气列表
solarTerm; // ['小寒','大寒','立春','雨水',...,'冬至']
```

### getFestival（节假日）

```javascript
import { getFestival } from 'date-php/holiday';

const result = getFestival('20260101', date);
// { cn: ['元旦节'], en: ['New year'] }
```

### timezone（时区）

```javascript
import { TIMEZONE_MAP, getOffsetInfo } from 'date-php/timezone';

// GMT/UTC 到 IANA 时区的映射表
TIMEZONE_MAP['GMT-8']; // "Asia/Shanghai"
TIMEZONE_MAP['UTC+9']; // "Asia/Shanghai" (映射到对应IANA时区)

// 获取时区偏移信息
const info = getOffsetInfo(new Date(), 'Asia/Shanghai');
// { sign: '+', hours: 8, minutes: 0, offsetStr: 'GMT+8:00', O: '+0800', P: '+08:00' }
```

### chineseUtils（中文工具）

```javascript
import { textReplace, textReplace2 } from 'date-php/utils';

textReplace(15); // "十五" (数字转中文日期格式)
textReplace2(2026); // "二〇二六" (逐位数字转汉字)
```

---

<div id="自定义节假日-custom-holidays"></div>

## 自定义节假日 (Custom Holidays)

### 默认配置

```javascript
{
    '0101': ['元旦节', 'New year'],
    '0214': ['情人节', "Valentine's day"],
    '0308': ['国际妇女节', "International women's day"],
    '0315': ['国际消费者权益日', "International consumer's rights day"],
    '0312': ['植树节', 'Arbor day'],
    '0422': ['世界地球日', 'Earth day'],
    '0501': ['国际劳动节', "International labour day"],
    '0504': ['青年节', 'Youth day'],
    '0512': ['国际护士节', "International nurses day"],
    '0518': ['国际博物馆日', "International museum day"],
    '0601': ['国际儿童节', "International children's day"],
    '0605': ['世界环境日', 'World environment day'],
    '0623': ['国际奥林匹克日', "International olympic day"],
    '0624': ['世界骨质疏松日', "World osteoporosis day"],
    '0701': ['建党节', "Party's building day"],
    '0801': ['建军节', "Army's day"],
    '0910': ['教师节', "Teacher's day"],
    '1001': ['国庆', 'National day'],
    '1024': ['中国程序员节', "Chinese programmer's day"],
    '1224': ['平安夜', 'Christmas Eve'],
    '1225': ['圣诞节', 'Christmas Day'],
    '1226': ['毛泽东诞辰', 'Zedong Mao birthday'],
    '1117': ['世界学生日', "World student's day"],
    '1201': ['世界艾滋病日', 'World AIDS day'],
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
    '*1229': lunarInfo.isLeap ? ['除夕', "Year's Eve"] : undefined,
    '*1230': lunarInfo.isLeap ? undefined : ['除夕', "Year's Eve"],
    '#0520': ['母亲节', "Mother's day"],
    '#0630': ['父亲节', "Father's day"],
    '@0256': ['俄罗斯程序员节', "Russian programmer's day"]
}
```

### 配置 API

| API | 说明 |
| :--- | :--- |
| `date.replaceHolidayConf` | 替换默认节假日配置（默认配置全部失效） <br/>Replace the default holiday configuration |
| `date.editHolidayConf` | 修改或新增节假日配置（未修改的默认配置仍有效） <br/>Modify or add holiday configuration |

### Key 格式说明

| Key 格式 | 说明 | 示例 |
| :--- | :--- | :--- |
| `MMDD` | 公历日期 | `0101` = 1月1日 |
| `*MMDD` | 农历日期（`*` 前缀） | `*0101` = 正月初一 |
| `#MMOW` | 公历某月第N个星期几（`#` 前缀）<br/>O: 第几个(1-5)<br/>W: 星期(0-6, 日-六) | `#0520` = 5月第2个星期日 |
| `@DDDD` | 公历一年中的第几天（`@` 前缀 + 4位数字） | `@0256` = 第256天 |

### 代码示例

```javascript
// 修改与新增（未被修改的默认节日依然有效）
date.editHolidayConf = {
  '0214': ['小三节', 'Mistress day'], // 修改
  '#0836': ['纪念日', 'Anniversary day'], // 新增
  '*1213': ['作者生日', "Author's birthday"] // 新增
}

// 替换（默认配置全部失效）
date.replaceHolidayConf = {
  '0214': ['小三节', 'Mistress day'],
  '#0836': ['纪念日', 'Anniversary day'],
  '*1213': ['作者生日', "Author's birthday"]
}

date('Y-m-d fh', new Date()); // "2026-07-09 示例节"
date('Y-m-d lh', new Date()); // "2026-07-09 Demo's day"
```

---

## 使用示例

### 基础格式化

```javascript
import date from 'date-php';

date('Y-m-d H:i:s', new Date()); // "2026-07-09 15:38:56"
date('y-m-d h:i[a]', new Date()); // "26-07-09 03:38[pm]"
date('Y年m月d日 H点i分s秒', new Date()); // "2026年07月09日 15点38分56秒"
date('y/m/d H:i', new Date()); // "26/07/09 15:38"
date('m-d-Y H:i:s.v', new Date()); // "07-09-2026 15:38:56.064"
```

### 相对时间

```javascript
date('y-m-d R', new Date() - 60 * 2000); // "26-07-09 2分钟前"
date('y-m-d R', new Date() - 60 * 60 * 5000); // "26-07-09 5小时前"
date('y-m-d R', new Date() + 60 * 60 * 5000); // "26-07-09 5小时后"
date('y-m-d R', new Date() - 60 * 60 * 24 * 365 * 1000); // "26-07-09 12个月前"
date('y-m-d R', new Date() - 60 * 60 * 24 * 365 * 1000 - 1000); // "26-07-09 1年前"
```

### 中文日期

```javascript
date('星期K', "2019-07-15 15:38:56"); // "星期一"
date('C年f月k日 星期K', 1563176336000); // "二〇一九年七月十五日 星期一"
```

### 农历日期

```javascript
date('ly年lm月ld日 lt时lk刻【lG】', 1563122222000); // "己亥年六月十三 子时六刻【三更】"
date('lz年lF月ld', new Date()); // "马年六月 十五"
date('la', new Date()); // "巨蟹座"
date('ls', new Date()); // "小寒"（如果是节气日）
```

### 时区

```javascript
date.timeZone = 'America/New_York';
date('Y-m-d H:i:s e', new Date()); // 纽约时间

date.timeZone = 'Asia/Tokyo';
date('Y-m-d H:i:s P', new Date()); // 东京时间 +09:00
```

### 持续时间 / 倒计时

```javascript
date.duration('D天h小时i分钟s秒', 86400000 + 12345); // "1天00小时00分钟12秒"
date.duration('H小时i分钟s.v秒', 86400000 + 7654321); // "26小时07分钟34.321秒"
date.duration('高考倒计时：D天h小时i分钟s秒', 1591491612345 - 1577808654321);
date.duration('1970年至今已有D天h小时i分钟s.v秒', new Date());
```

### 按需加载

```javascript
// 只需要基础格式化 + 生肖
import date from 'date-php/core';
import zodiacPlugin from 'date-php/zodiac';

date.use(zodiacPlugin);
date('Y年zz', new Date()); // "2026年马"
```

### 转义模板字符

```javascript
// 双反斜杠转义（注意：在JS字符串中 \ 需要写成 \\）
date('\\I \\l\\o\\v\\e \\y\\o\\u: y-m-d H:i', new Date()); // "I love you: 26-07-09 15:38"
```

---

## 包体积参考

| 包 | 说明 | 大小 (approx.) |
| :--- | :--- | :--- |
| `date-php/core` | 核心格式化 | ~9.4 KB (min) |
| `date-php/core/min` | 核心格式化（压缩版） | ~9.4 KB (min) |
| `date-php` | 完整版 (core + lunar + holiday) | ~23.6 KB (min) |
| `date-php/lunar` | 农历插件 | ~22 KB |
| `date-php/holiday` | 节假日插件 | ~13 KB |
| `date-php/ganzhi` | 天干地支插件 | ~2.8 KB |
| `date-php/zodiac` | 生肖插件 | ~2.3 KB |
| `date-php/astro` | 星座插件 | ~2.1 KB |
| `date-php/shike` | 时辰刻插件 | ~3.2 KB |
| `date-php/solarterm` | 节气插件 | ~12.5 KB |
| `date-php/timezone` | 时区工具 | ~6.5 KB |
| `date-php/duration` | 持续时间工具 | ~4.3 KB |

---

## 迁移指南：1.x → 2.0

### 默认导入不变

```javascript
// 1.x 和 2.0 完全兼容
import date from 'date-php';
date('Y-m-d', new Date()); // 用法不变
```

### 新增：Core 轻量版

如果只需要基础格式化，可以改用 core 版本减小体积：

```javascript
// 2.0 新增
import date from 'date-php/core';
// 注意：core 版本不支持农历/节假日模板字符
```

### 新增：插件按需加载

```javascript
// 2.0 新增 - 按需注册插件
import date from 'date-php/core';
import lunarPlugin from 'date-php/lunar';
date.use(lunarPlugin);
```

### 新增：独立工具库

```javascript
// 2.0 新增 - 工具库可独立使用
import { duration, countTime } from 'date-php/duration';
import { TIMEZONE_MAP } from 'date-php/timezone';
import getLunar from 'date-php/lunar';
```

### 新增模板字符

| chars | 说明 |
| :--- | :--- |
| lF | 农历月份（含闰月前缀），如 "闰正月" |
| gzY / gzM / gzD / gzH | 天干地支四柱（需 ganzhiPlugin） |
| zz / zzEn | 生肖（需 zodiacPlugin） |
| astro | 星座（需 astroPlugin） |
| shi / ke / geng | 时辰刻（需 shiKePlugin） |
| term / termEn / termDay | 节气（需 solarTermPlugin） |