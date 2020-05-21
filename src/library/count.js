import { pad } from './module';

/**
 *
 * 计算持续时长
 * @param  {String} fmt 模板字符串
 * @param {Number} timestamp 时间戳
 * @param {Boolean} ms 是否是 含有毫秒
 * @return 相印时间
 */
function duration(fmt = 'D天h:i:s', timestamp = 0, ms = true) {
  const conversion = {
    y: 12,
    m: 30.4375,
    d: 24,
    h: 60,
    i: 60,
    s: 1000,
    v: 1000,
  };
  const tChars = {
    y: () => tChars.Y(), // 当前剩余年数,
    Y: () => Math.floor(tChars.M() / conversion.y), // 总剩余年数,

    m: () => pad(tChars.n(), 2), // 当前剩余月数(有前导零)
    n: () => tChars.M() % conversion.y, // 当前剩余月数(无前导零)
    M: () => Math.floor(tChars.D() / conversion.m), // 总剩余月数

    d: () => pad(tChars.j(), 2), // 当前剩余天数(有前导零)
    j: () => Math.floor(tChars.D() % conversion.m), // 当前剩余天数(无前导零)。
    D: () => Math.floor(tChars.H() / conversion.d), // 总剩余天数

    h: () => pad(tChars.g(), 2), // 当前小时剩余数(有前导零)
    g: () => Math.floor(tChars.H() % conversion.d), // 当前小时剩余数(无前导零)
    H: () => Math.floor(tChars.I() / conversion.h), // 总剩余小时数

    i: () => pad(Math.floor(tChars.I() % conversion.h),2), // 当前分钟剩余点数
    I: () => Math.floor(tChars.S() / conversion.i), // 总剩余分钟数

    s: () => pad(Math.floor((tChars.S() % conversion.i), 2)), // 当前秒钟剩余点数
    S: () => Math.floor(tChars.V() / conversion.s), // 总剩余秒数

    v: () => pad(Math.floor(tChars.V() % conversion.s), 3), // 当前毫秒剩余数
    V: () => ms ? new Date(timestamp)-0 : new Date(timestamp) * conversion.v, // 总剩余毫秒数
  };

  return fmt.replace(/(\\?([a-z]))/ig, (res, key) => {
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
}

/**
 * 计算持续时间
 * @param fmt
 * @param timestamp1
 * @param timestamp2
 * @param ms
 * @return 相印时间
 */
function countTime(fmt = 'D天h:i:s', timestamp1 = 0, timestamp2 = 0, ms = true) {
  let count = new Date(timestamp1) - new Date(timestamp2) || 0;
  return duration(fmt, Math.abs(count), ms);
}

export {
  duration,
  countTime
};
export default {
  duration,
  countTime
};
