/*
 * @Author       : ToviLau 46134256@qq.com
 * @Date         : 2026-07-09 07:45:41
 * @LastEditors  : ToviLau 46134256@qq.com
 * @LastEditTime : 2026-07-10 00:30:40
 */
const typeOf = (val: unknown): string => {
  if (val === null) return "null";
  if (val === undefined) return "undefined";
  const t = typeof val;
  if (t !== "object" && t !== "function") return t;
  return Object.prototype.toString.call(val).match(/(\w*)\S$/)?.[1]?.toLowerCase() ?? "object";
};

const pad = (str: string | number, len: number, placeholder: string = '0'): string => {
  const s = String(str);
  return s.length < len ? new Array(++len - s.length).join(placeholder) + s : s;
};

const longDays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const txt_ordin: Record<number, string> = {
  1: 'st',
  2: 'nd',
  3: 'rd',
  21: 'st',
  22: 'nd',
  23: 'rd',
  31: 'st',
};

const txt_months: string[] = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const ordinal: string[] = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];

const defP = (obj: object, key: string | symbol, val: any): void => {
  Object.defineProperty(obj, key, {
    get: () => val,
    configurable: true,
  });
};

const baseFigure: Record<number, string> = {
  1: '\u4e00',
  2: '\u4e8c',
  3: '\u4e09',
  4: '\u56db',
  5: '\u4e94',
  6: '\u516d',
};

const lunarTime: string[] = ['\u5b50', '\u4e11', '\u5bc5', '\u536f', '\u8fb0', '\u5df3', '\u5348', '\u672a', '\u7533', '\u9149', '\u620c', '\u4ea5'];

const zodiac: Record<string, string> = {
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

const solar: Record<string, string> = {
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
  '\u971c\u964d': "Frost's Descent",
  '\u7acb\u51ac': 'Start of Winter',
  '\u5c0f\u96ea': 'Minor Snow',
  '\u5927\u96ea': 'Major Snow',
  '\u51ac\u81f3': 'Winter Solstice',
};

const lunarKe: Record<number, string | number> = Object.assign(
  {
    0: '\u96f6',
    7: '\u4e03',
  },
  baseFigure,
);

const weekDay: Record<number, string | number> = Object.assign(
  {
    0: '\u65e5',
  },
  baseFigure,
);

const dateFigure: Record<number, string | number> = Object.assign(
  {
    0: '\u3007', 7: '\u4e03', 8: '\u516b', 9: '\u4e5d', 10: '\u5341',
    20: '\u5eff', 30: '\u5345',
  },
  baseFigure,
);

const lMonth: Record<number, string | number> = Object.assign(
  {
    7: '\u4e03', 8: '\u516b', 9: '\u4e5d', 10: '\u5341', 11: '\u51ac', 12: '\u814a',
  },
  baseFigure,
);

const textReplace = (res: string | number): string => res.toString()
  .split('')
  .reverse()
  .map((val: string, key: number) => {
    const v = Math.pow(10, key) * Number(val);
    return v ? (dateFigure as Record<number, string>)[v] : '';
  })
  .reverse()
  .join('');

const textReplace2 = (succ: string | number): string => (succ + '').split('').map((res: string) => (dateFigure as Record<number, string>)[Number(res)]).join('');

export {
  typeOf,
  pad,
  longDays,
  txt_ordin,
  txt_months,
  ordinal,
  defP,
  baseFigure,
  lunarTime,
  zodiac,
  solar,
  lunarKe,
  weekDay,
  dateFigure,
  lMonth,
  textReplace,
  textReplace2,
};
