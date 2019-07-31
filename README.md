### JavaScript仿PHP时间格式化函数
---
![issues](https://img.shields.io/github/issues/toviLau/date-php)
![forks](https://img.shields.io/github/forks/toviLau/date-php)
![stars](https://img.shields.io/github/stars/toviLau/date-php)
![license](https://img.shields.io/github/license/toviLau/date-php)
![npm](https://img.shields.io/npm/v/date-php)
![downloads](https://img.shields.io/npm/dm/date-php.svg)

> 这是一个Javascript版的仿PHP日期时间格式化函数，使用方法和PHP语言一样，有丰富的模板字符串，转换日期时间更自由。

```javascript
// 举个栗子
var d = new Date('Mon Jul 15 2019 15:38:56 GMT+0800 (中国标准时间)'); // new Date(1563148800000) or new Date()

date('Y-m-d', d); // "2019-07-15
date('m-d-Y H:i:s', d); // "07-15-2019 15:38:56" 

// 或者这样
d.format('Y-m-d'); // "2019-07-15
d.format('m-d-Y H:i:s'); // "07-15-2019 15:38:56" 
```
### 安装(install)
```
// npm 方式
npm i -S date-php

// CDN
<script src="//unpkg.com/date-php"></script>

```

### 使用(use)
 > 1、以下所有方式的入参都是可选参数  
 > 2、以下`new Date()`或其它的日期时间的初始化的值，我们默许都是 `1563176336000` Unix时间戳对应的日期时间
 
```javascript
// npm -- CDN方式跳过
import date from 'date-php'; // 引入date-php

// demo1 - date('格式化字符串', 时间对象);
date('Y-m-d H:i:s', new Date()); // "2019-07-15 15:38:56" 
date('Y年m月d日 H点i分s秒', new Date()); // "2019年07月15日 15点38分56秒" 
date('m-d-Y H:i:s', new Date()); // "07-15-2019 15:38:56" 
date('y/m/d H:i', new Date()) + ' 星期'+['日', '一', '二', '三', '四','五','六'][date('w', new Date())]; // "19/07/15 15:38 星期三" 
date('y-m-d h:i[a]', 1563176336000); // "19-07-15 03:38[pm]"
date('Y-m-d H:i 第W周', 'Mon Jul 15 2019 15:38:56 GMT+0800 (中国标准时间)'); // "2019-07-15 15:38 第29周"

// demo2 - 时间对象.format('格式化字符串');
new Date('2019-07-15 15:38:56').format('Y-m-d H:i:s'); // "2019-07-15 15:38:56" 
new Date(1563176336000).format('Y-m-d H:ia'); // "2019-07-15 15:38pm"
new Date().format('Y-m-d H:i 第W周'); // "2019-07-15 15:38 第29周"
```


### 格式字符串(默认值：{string} 'Y-m-d')
> #### 也可以去[PHP官网](https://www.php.net/manual/zh/function.date.php)看看，使用方法一样
> ##### 也可以通过静态方法 `date.description` 在控制台打出所有格式字符串

```
日
  d: 月份中的第几天，有前导零的2位数字。从"01"到"31"
  D: 星期中的第几天，文本表示，3个字母。从"Mon"到"Sun"
  j: 月份中的第几天，没有前导零。"1"到"31"
  l: 星期几，完整的文本格式。"Sunday"到"Saturday"
  N: ISO-8601格式的星期中的第几天。"1"(表示星期一)到"7"(表示星期天)
  S: 每月天数后面的英文后缀，2 个字符 st/nd/rd/th。
  w: 星期中的第几天，数字表示。"0"(表示星期天)到"6"(表示星期六)
  z: 年份中的第几天。"0"到"365"

星期
  W: 年份中的第几周

月
  F: 月份，完整的文本格式。从"January"到"December"
  m: 数字表示的月份，有前导零。"01"到"12"
  M: 三个字母缩写表示的月份。从"Jan"到"Dec"
  n: 数字表示的月份，没有前导零。"1"到"12"
  t: 给定月份所应有的天数。 "28"到"31"

年
  L: 是否为闰年。1:是，0:否
  o: ISO-8601格式年份数字。这和 Y 的值类似，星期数（W）属于前一年或下一年，则用那一年。
  Y: 4 位数字完整表示的年份
  y: 2 位数字表示的年份

时间
  a: 小写的上午和下午值。"am"或"pm"
  A: 大写的上午和下午值。"AM"或"PM"
  B: Swatch Internet 标准时。"000"到"999"
  g: 12 小时格式，没有前导零。"1"到"12"
  G: 24 小时格式，没有前导零。"0"到"23"
  h: 12 小时格式，有前导零。"01"到"12"
  H: 24 小时格式，有前导零。"00"到"23"
  i: 有前导零的分钟数。"00"到"59"
  s: 有前导零的秒数。"00"到"59"
  u: 有前导零的毫秒。"000"到"999"

时区
  e: 时区标识。UTC，GMT，Atlantic/Azores
  I: 是否为夏令时。1:是，0:否
  O: 与格林威治时间相差的小时数。例如：+0200
  P: 与格林威治时间的差别，小时和分钟之间有冒号分隔。例如：+02:00
  T: 本机所在的时区。例如：EST，MDT。
  Z: 时差偏移量的秒数。UTC 西边的时区偏移量总是负的，UTC 东边的时区偏移量总是正的。-43200 到 43200

完整的日期／时间
  c: ISO 8601 格式的日期。例如：2004-02-12T15:19:21+00:00
  r: RFC 822 格式的日期。例如：Thu, 21 Dec 2000 16:01:07 +0200
  U: 从 Unix 纪元开始至今的秒数(Unix时间戳)。
```

### 时间对象(默认值：{Date} 当前本地机器时间)
> 可以是任意时间对象  
> 例如：

```javascript
    1563176336000 // 时间戳
    new Date() // 当前本机日期和时间
    “2019-07-15 15:38:56” // 字符串日期
    “2019/07/15 15:38:56” // 字符串日期  
```
### 关于鸣谢
  [**Github**](http://www.github.com)
  [**Npmjs**](http://www.npmjs.org)
  [**rollup**](http://www.rollupjs.com) 
  [**eslint**](https://eslint.org)
  [**flow**](https://flow.org)
  [**uglifyJs**](http://lisperator.net/uglifyjs/)
