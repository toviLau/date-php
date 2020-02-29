import getLunar from './getLunar';

/**
 * 补前导零(0)
 * @param {number} str 字符
 * @param {number} len 长度
 * @param {string} placeholder 前导占位符
 * @returns {string}
 */
function pad(str, len, placeholder = '0') {
  str += '';
  if (str.length < len) {
    return new Array(++len - str.length).join(placeholder) + str;
  } else {
    return str;
  }
};
const longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const txt_ordin = {
  1: 'st',
  2: 'nd',
  3: 'rd',
  21: 'st',
  22: 'nd',
  23: 'rd',
  31: 'st',
};
const txt_months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const baseFigure = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
};
const lunarTime = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ordinal = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
const zodiac = { // 生宵英文速查表
  '\u9f20': 'Rat',
  '\u725b': 'OX',
  '\u864e': 'Tiger',
  '\u5154': 'Rabbit',
  '\u9f99': 'Dragon',
  '\u86c7': 'Snake',
  '\u9a6c': 'Horse',
  '\u7f8a': 'Sheep',
  '\u7334': 'Monkey',
  '\u9e21': 'Rooster',
  '\u72d7': 'Dog',
  '\u732a': 'Pig',
};
const solar = {
  '\u5c0f\u5bd2': 'Minor Cold',
  '\u5927\u5bd2': 'Major Cold',
  '\u7acb\u6625': 'Start of Spring',
  '\u96e8\u6c34': 'Rain Water',
  '\u60ca\u86f0': 'Awakening of Insects',
  '\u6625\u5206': 'Spring Equinox',
  '\u6e05\u660e': 'Clear and Bright',
  '\u8c37\u96e8': 'Grain Rain',
  '\u7acb\u590f': 'Start of Summer',
  '\u5c0f\u6ee1': 'Grain Buds',
  '\u8292\u79cd': 'Grain in Ear',
  '\u590f\u81f3': 'Summer Solstice',
  '\u5c0f\u6691': 'Minor Heat',
  '\u5927\u6691': 'Major Heat',
  '\u7acb\u79cb': 'Start of Autumn',
  '\u5904\u6691': 'End of Heat',
  '\u767d\u9732': 'White Dew',
  '\u79cb\u5206': 'Autumn Equinox',
  '\u5bd2\u9732': 'Cold Dew',
  '\u971c\u964d': 'Frost\'s Descent',
  '\u7acb\u51ac': 'Start of Winter',
  '\u5c0f\u96ea': 'Minor Snow',
  '\u5927\u96ea': 'Major Snow',
  '\u51ac\u81f3': 'Winter Solstice',
};
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
const lMonth = Object.assign(
  {},
  {
    7: '七', 8: '八', 9: '九', 10: '十', 11: '冬', 12: '腊',
  },
  ...baseFigure,
);

// 取中文日期(廿七)
const textReplace = res => res.toString()
    .split('')
    .reverse()
    .map((val, key) => {
      const v = Math.pow(10, key) * val;
      return v ? dateFigure[v] : null;
    })
    .reverse()
    .join('');

// 取中文日期2(例：一九八七)
const textReplace2 = succ => (succ + '').split('').map(res => dateFigure[res]).join('');

function defP(obj, key, val) {
  Object.defineProperty(obj, key, {
    get: () => val,
  });
}
export {
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
  defP
}
